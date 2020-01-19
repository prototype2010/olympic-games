import { DatabaseConnection } from './app/Database/Database';
import { CSV_FILE_PATH } from './config';
import { CSVParser } from './app/CSVProcessors/CSVParser';
import { resolve } from 'path';
import { SanitizedOlympiadEventRecord, Table } from './app/types';
import { CSVSanitizer } from './app/CSVProcessors/CSVSanitizer';
import { dropTables, insertValues, resolveAllAsChunks } from './app/Database/utils';
import { Model } from './app/Database/utils/Model';
import { mapToValidDBObjects } from './app/CSVProcessors/CSVRowsMapper';
import { sanitizeConfig } from './app/CSVProcessors/SanitizerConfig';
import { OlympicEvent } from './app/Database/utils/OlympicEvent';
import { Athlete } from './app/Database/entities';

async function init() {
  const DB = DatabaseConnection.getInstance();

  console.time('Parsing document');

  const readDocument = await CSVParser.parse(resolve(__dirname, CSV_FILE_PATH));

  const csvSanitizer = new CSVSanitizer<SanitizedOlympiadEventRecord>(sanitizeConfig);

  const sanitizedCSV = csvSanitizer.sanitizeArray(readDocument);

  const { olympicEvents, uniqueEntries } = mapToValidDBObjects(sanitizedCSV);

  console.timeEnd('Parsing document');

  const { teams, sports, games, events, athletes } = uniqueEntries;

  console.time('No dependency entries document');

  // drop tables
  await dropTables();

  await resolveAllAsChunks([...sports, ...events, ...games, ...teams] as Model[]);

  console.timeEnd('No dependency entries document');

  console.time('Inserting results');

  olympicEvents.forEach(({ athlete, team }, index) => {
    athlete.teamId = team.id;
    athlete.id = index;
  });

  await insertValues<Athlete>(Table.ATHLETES, athletes, athlete => athlete.getInsertParams());

  olympicEvents.forEach(({ result, event, sport, athlete, game }) => {
    result.gameId = game.id;
    result.athleteId = athlete.id;
    result.eventId = event.id;
    result.sportId = sport.id;
  });

  await insertValues<OlympicEvent>(Table.RESULTS, olympicEvents, ({ result }) => result.getInsertParams());

  console.timeEnd('Inserting results');

  DB.destroy(function() {
    console.log('Connection destroyed...');
  });
}

init().catch(e => console.log(e));
