import { DatabaseConnection } from './app/Database/Database';
import { CSV_FILE_PATH } from './config';
import { CSVParser } from './app/CSVProcessors/CSVParser';
import { resolve } from 'path';
import { SanitizedCSVRecord } from './app/types';
import { CSVSanitizer } from './app/CSVProcessors/CSVSanitizer';
import { dropTables, resolveAllAsChunks } from './app/Database/utils';
import { chunk } from 'lodash';
import { Model } from './app/Database/utils/Model';
import { mapToValidDBObjects } from './app/CSVProcessors/CSVRowsMapper';
import { sanitizeConfig } from './app/CSVProcessors/SanitizerConfig';

const DB = DatabaseConnection.getInstance();

async function init() {
  console.time('Parsing document');

  const readDocument = await CSVParser.parse(resolve(__dirname, CSV_FILE_PATH));

  const sanitizedCSV = CSVSanitizer.sanitizeArray<SanitizedCSVRecord>(readDocument, sanitizeConfig);
  const { rows, uniqueEntries } = mapToValidDBObjects(sanitizedCSV);

  console.timeEnd('Parsing document');

  const { teams, sports, games, events } = uniqueEntries;

  console.time('No dependency entries document');
  // drop tables
  await dropTables();

  await resolveAllAsChunks([...teams, ...sports, ...events, ...games] as Model[]);

  console.timeEnd('No dependency entries document');

  console.time('Inserting results');

  const chunkedResults = chunk(rows, 1000);

  for await (const rowsChunk of chunkedResults) {
    await resolveAllAsChunks(
      rowsChunk.map(({ sport, result, game, athlete, event, team }) => {
        return {
          write: () => {
            return new Promise(async resolve => {
              if (!athlete.id) {
                athlete.teamId = team.id;

                resolve(athlete.write());
              }

              resolve(athlete);
            }).then(() => {
              result.gameId = game.id;
              result.athleteId = athlete.id;
              result.eventId = event.id;
              result.sportId = sport.id;

              return result.write() as Promise<Model>;
            });
          },
        };
      }),
    );
  }

  console.timeEnd('Inserting results');

  DatabaseConnection.getInstance().destroy(function() {
    console.log('Connection destroyed...');
  });
}

init().catch(e => console.log(e));
