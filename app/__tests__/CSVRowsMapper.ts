import 'jest';
import { Athlete } from '../Database/entities';
import { SanitizedCSVRecord, Sex } from '../types';
import { mapToValidDBObjects } from '../CSVProcessors/CSVRowsMapper';
import { sanitizeConfig } from '../CSVProcessors/SanitizerConfig';
import { CSVSanitizer } from '../CSVProcessors/CSVSanitizer';
import parsedCSVForMapper from '../testUtils/testData/csv/parsedCSVForMapper';
import correctlyMappedCSV from '../testUtils/testData/csv/correctlyMappedCSV';
import { HashCollection } from '../Database/utils/HashCollection';

describe('Verify parsed csv correctly maps to unique objects', () => {
  test('Hash map function should keep original objects', () => {
    const athletes = new HashCollection<Athlete>();

    athletes.addOrGetExisting(new Athlete({ height: 199, name: 'Boris', sex: Sex.M, weight: 99, year: 35 }));
    athletes.addOrGetExisting(new Athlete({ height: 199, name: 'Boris', sex: Sex.M, weight: 99, year: 35 }));

    expect(athletes.getArray().length).toEqual(1);
  });

  test('Hash map adds original objects', () => {
    const athletes = new HashCollection<Athlete>();

    athletes.addOrGetExisting(new Athlete({ height: 199, name: 'Boris', sex: Sex.M, year: 35, weight: 99 }));
    athletes.addOrGetExisting(new Athlete({ height: 199, name: 'Arkady', sex: Sex.M, year: 35, weight: 99 }));

    expect(athletes.getArray().length).toEqual(2);
  });

  test('HashMap contains all objects', () => {
    const athletes = new HashCollection<Athlete>();

    const athleteParams1 = { name: 'Boris', sex: Sex.M, year: 35, weight: 99, height: 35 };
    const athleteParams2 = { name: 'Georgiy', sex: Sex.M, year: 35, weight: 99, height: 35 };

    athletes.addOrGetExisting(new Athlete(athleteParams1));
    athletes.addOrGetExisting(new Athlete(athleteParams2));

    expect(athletes.getArray()).toEqual([new Athlete(athleteParams1), new Athlete(athleteParams2)]);
  });

  test('Verify rows mapper creates correct unique objects', () => {
    const sanitizer = new CSVSanitizer<SanitizedCSVRecord>(sanitizeConfig);
    const sanitizedArray = sanitizer.sanitizeArray(parsedCSVForMapper);

    const { uniqueEntries } = mapToValidDBObjects(sanitizedArray);

    expect(uniqueEntries).toEqual(correctlyMappedCSV);
  });
});
