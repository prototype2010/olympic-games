import 'jest';
import { Athlete } from '../app/Database/entities';
import { SanitizedOlympiadEventRecord, Sex } from '../app/types';
import { mapToValidDBObjects } from '../app/CSVProcessors/CSVRowsMapper';
import { sanitizeConfig } from '../app/CSVProcessors/SanitizerConfig';
import { CSVSanitizer } from '../app/CSVProcessors/CSVSanitizer';
import parsedCSVForMapper from '../app/testUtils/testData/csv/parsedCSVForMapper';
import correctlyMappedCSV from '../app/testUtils/testData/csv/correctlyMappedCSV';
import { HashCollection } from '../app/Database/utils/HashCollection';

describe('Verify parsed csv correctly maps to unique objects', () => {
  describe('HashCollection.addOrGetExisting', () => {
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
  });

  describe('mapToValidDBObjects excracts data correctly', () => {
    test('Verify rows mapper creates correct unique objects', () => {
      const sanitizer = new CSVSanitizer<SanitizedOlympiadEventRecord>(sanitizeConfig);
      const sanitizedArray = sanitizer.sanitizeArray(parsedCSVForMapper);

      const { uniqueEntries } = mapToValidDBObjects(sanitizedArray);

      expect(uniqueEntries).toEqual(correctlyMappedCSV);
    });
  });
});
