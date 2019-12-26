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
              if (!athlete.dbID) {
                athlete.teamId = team.dbID;

                resolve(athlete.write());
              }

              resolve();
            }).then(() => {
              result.gameId = game.dbID;
              result.athleteId = athlete.dbID;
              result.eventId = event.dbID;
              result.sportId = sport.dbID;

              return result.write();
            });
          },
        };
      }),
    );
  }

  console.timeEnd('Inserting results');

  //Show bar chart with amount of medals for the certain team specified by
  // NOC name (case insensitive), season and certain medal name (gold, silver, bronze).
  // NOC name and season are required. If medal name is not present, all medals should be counted.
  // Sort result by year in chronological order.
  // If there is no medals for this year - show 0 (blank bar), but all years must be present.

  //Show amount of medals per team for the certain year, season and medal type ordered by amount.
  // Most awarded teams must be on the top. Season is required.
  //
  // If year is not specified take results for all time.
  // If medal type is not specified take results for all types.
  // Show resulting chart only for those teams, that have more than average result: if average amount for all teams is 200 - show only teams with more than 200 medals.

  const athletesInTeam = await DatabaseConnection.getInstance()('teams')
    .where({ noc_name: 'FIN' })
    .join('athletes', 'teams.id', 'athletes.team_id')
    .join('results', 'athletes.id', 'results.athlete_id')
    .join('games', 'results.game_id', 'games.id')
    .join('sports', 'results.sport_id', 'sports.id')
    .where({
      season: 'Summer',
    })
    // .whereIn('medal',['Bronze','Gold', 'Silver'] )
    .orderBy('year', 'asc');

  console.log(athletesInTeam);

  DatabaseConnection.getInstance().destroy(function() {
    console.log('Connection destroyed...');
  });
}

init().catch(e => console.log(e));
