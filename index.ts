import { DatabaseConnection } from './app/Database/Database';
import { CSV_FILE_PATH } from './config';
import { CSVParser } from './app/CSVProcessors/CSVParser';
import { resolve } from 'path';
import { SanitizedCSVRecord } from './app/types';
import { CSVSanitizer } from './app/CSVProcessors/CSVSanitizer';
import { CHUNK_SIZE, dropTables, resolveAllAsChunks } from './app/Database/utils';
import { Model } from './app/Database/utils/Model';
import { mapToValidDBObjects } from './app/CSVProcessors/CSVRowsMapper';
import { sanitizeConfig } from './app/CSVProcessors/SanitizerConfig';
import { chunk } from 'lodash';

async function init() {
  const DB = DatabaseConnection.getInstance();

  console.time('Parsing document');

  const readDocument = await CSVParser.parse(resolve(__dirname, CSV_FILE_PATH));

  const sanitizedCSV = CSVSanitizer.sanitizeArray<SanitizedCSVRecord>(readDocument, sanitizeConfig);
  const { rows, uniqueEntries } = mapToValidDBObjects(sanitizedCSV);

  console.timeEnd('Parsing document');

  const { teams, sports, games, events, athletes } = uniqueEntries;

  console.time('No dependency entries document');

  // drop tables
  await dropTables();

  await resolveAllAsChunks([...sports, ...events, ...games, ...teams] as Model[]);

  console.timeEnd('No dependency entries document');

  console.time('Inserting results');

  rows.forEach(({ athlete, team }, index) => {
    athlete.teamId = team.id;
    athlete.id = index;
  });

  for await (const athletesChunk of chunk(athletes, CHUNK_SIZE)) {
    await DB('athletes').insert(
      athletesChunk.map(({ teamId, birthYear, fullName, sex, params, id }) => ({
        id,
        full_name: fullName,
        sex,
        team_id: teamId,
        params: JSON.stringify(params),
        year_of_birth: birthYear,
      })),
    );
  }

  for await (const rowsChunk of chunk(rows, CHUNK_SIZE)) {
    await DB('results').insert(
      rowsChunk.map(row => {
        const { result, event, sport, athlete, game } = row;

        result.gameId = game.id;
        result.athleteId = athlete.id;
        result.eventId = event.id;
        result.sportId = sport.id;

        return {
          athlete_id: result.athleteId,
          game_id: result.gameId,
          sport_id: result.sportId,
          event_id: result.eventId,
          medal: result.medal,
        };
      }),
    );
  }
  console.timeEnd('Inserting results');

  DB.destroy(function() {
    console.log('Connection destroyed...');
  });
}

init().catch(e => console.log(e));
