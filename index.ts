import { DatabaseConnection } from './app/Database/Database';
import { CSV_FILE_PATH, sanitizeConfig } from './config';
import { CSVParser } from './app/utils/CSVParser';
import { mapToValidDBObjects } from './app/utils';
import { resolve } from 'path';
import { Table } from './app/types';
import { SanitizeExecutor } from './app/utils/SanitizeExecutor';
import { resolveAllAsChunks } from './app/Database/utils';
import { chunk } from 'lodash';

const DB = DatabaseConnection.getInstance();

async function init() {
  console.time('Parsing document');

  const readDocument = await CSVParser.parse(resolve(__dirname, CSV_FILE_PATH));

  const sanitizedCSV = SanitizeExecutor.sanitizeArray(readDocument, sanitizeConfig);
  const { rows, uniqueEntries } = mapToValidDBObjects(sanitizedCSV);

  console.timeEnd('Parsing document');

  const { teams, sports, games, events } = uniqueEntries;

  console.time('No dependency entries document');
  // drop tables
  for await (const tableName of Object.values(Table)) {
    await DB.raw(`DELETE FROM ${tableName}`);
  }

  await resolveAllAsChunks([...teams, ...sports, ...events, ...games]);

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

              resolve();
            }).then(() => {
              result.gameId = game.id;
              result.athleteId = athlete.id;
              result.eventId = event.id;
              result.sportId = sport.id;

              return result.write();
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
