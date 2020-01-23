import { DatabaseConnection } from './app/Database/Database';
import { CSV_FILE_PATH } from './config';
import { CSVParser } from './app/CSVProcessors/CSVParser';
import { resolve } from 'path';
import { SanitizedOlympiadEventRecord, Table } from './app/types';
import { CSVSanitizer } from './app/CSVProcessors/CSVSanitizer';
import { dropTables, insertValues, resolveAllAsChunks } from './app/Database/utils';
import { sanitizeConfig } from './app/CSVProcessors/SanitizerConfig';
import { OlympicEvent, OlympicEventInitParams } from './app/Database/utils/OlympicEvent';
import { Athlete } from './app/Database/entities';
import { BulkObjectExtractor } from './app/CSVProcessors/BulkObjectExtractor';
import { athletesDuplicateManager } from './app/Database/entities/Athlete/AthleteDuplicateMaganer';
import { eventsDuplicateManager } from './app/Database/entities/Event/EventDuplicateManager';
import { resultDuplicateManager } from './app/Database/entities/Result/ResultDuplicateMaganer';
import { sportDuplicateManager } from './app/Database/entities/Sport/SportDuplicateManager';
import { teamDuplicateManager } from './app/Database/entities/Team/TeamDuplicateManager';
import { gameDuplicateManager } from './app/Database/entities/Game/GameDuplicateManager';
import { ExtractionDescriptor } from './app/CSVProcessors/ExtractionDescriptor';

async function init() {
  const DB = DatabaseConnection.getInstance();

  console.time('Parsing document');

  const readDocument = await CSVParser.parse(resolve(__dirname, CSV_FILE_PATH));

  const csvSanitizer = new CSVSanitizer<SanitizedOlympiadEventRecord>(sanitizeConfig);

  const sanitizedCSV = csvSanitizer.sanitizeArray(readDocument);

  const olympiadEventRows = BulkObjectExtractor.extract<OlympicEventInitParams>(
    [
      new ExtractionDescriptor(athletesDuplicateManager.register.bind(athletesDuplicateManager), 'athlete'),
      new ExtractionDescriptor(eventsDuplicateManager.register.bind(eventsDuplicateManager), 'event'),
      new ExtractionDescriptor(resultDuplicateManager.register.bind(resultDuplicateManager), 'result'),
      new ExtractionDescriptor(sportDuplicateManager.register.bind(sportDuplicateManager), 'sport'),
      new ExtractionDescriptor(teamDuplicateManager.register.bind(teamDuplicateManager), 'team'),
      new ExtractionDescriptor(gameDuplicateManager.register.bind(gameDuplicateManager), 'game'),
    ],
    sanitizedCSV,
  );

  const olympiadEvents: Array<OlympicEvent> = olympiadEventRows.map(OEInitParams => new OlympicEvent(OEInitParams));

  console.timeEnd('Parsing document');

  console.time('No dependency entries document');

  // drop tables
  await dropTables();

  await resolveAllAsChunks([
    ...sportDuplicateManager.getUnique(),
    ...eventsDuplicateManager.getUnique(),
    ...gameDuplicateManager.getUnique(),
    ...teamDuplicateManager.getUnique(),
  ]);

  console.timeEnd('No dependency entries document');

  console.time('Inserting results');

  olympiadEvents.forEach(({ athlete, team }, index) => {
    athlete.teamId = team.id;
    athlete.id = index;
  });

  await insertValues<Athlete>(Table.ATHLETES, athletesDuplicateManager.getUnique(), athlete =>
    athlete.getInsertParams(),
  );

  olympiadEvents.forEach(({ result, event, sport, athlete, game }) => {
    result.gameId = game.id;
    result.athleteId = athlete.id;
    result.eventId = event.id;
    result.sportId = sport.id;
  });

  await insertValues<OlympicEvent>(Table.RESULTS, olympiadEvents, ({ result }) => result.getInsertParams());

  console.timeEnd('Inserting results');

  DB.destroy(function() {
    console.log('Connection destroyed...');
  });
}

init().catch(e => console.log(e));
