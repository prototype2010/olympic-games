import { getFromHashMap } from '../utils';
import { Athlete } from '../Database/entities';
import { SanitizedCSVRecord, Sex } from '../types';
import { mapToValidDBObjects } from '../CSVProcessors/CSVRowsMapper';
import parsedCSV from '../testUtils/testData/csv/parsedCSV';

describe('Verify parsed csv correctly maps to unique objects', () => {
  test('Hash map function should keep original objects', () => {
    const athletes = getFromHashMap<Athlete>(new Map(), Athlete);

    athletes([1], { height: 199, name: 'Boris', sex: Sex.M, weight: 99, year: 35 });
    athletes([1], { height: 199, name: 'Boris', sex: Sex.M, weight: 99, year: 35 });

    expect(athletes.getArray().length).toEqual(1);
  });

  test('Hash map adds original objects', () => {
    const athletes = getFromHashMap<Athlete>(new Map(), Athlete);

    athletes([1], { height: 199, name: 'Boris', sex: Sex.M, year: 35, weight: 99 });
    athletes([2], { height: 199, name: 'Arkady', sex: Sex.M, year: 35, weight: 99 });

    expect(athletes.getArray().length).toEqual(2);
  });

  test('HashMap contains all objects', () => {
    const athletes = getFromHashMap<Athlete>(new Map(), Athlete);

    const athleteParams1 = { name: 'Boris', sex: Sex.M, year: 35, weight: 99, height: 35 };
    const athleteParams2 = { name: 'Georgiy', sex: Sex.M, year: 35, weight: 99, height: 35 };

    athletes([1], athleteParams1);
    athletes([2], athleteParams2);

    expect(athletes.getArray()).toEqual([new Athlete(athleteParams1), new Athlete(athleteParams2)]);
  });

  test('Verify rows mapper creates correct unique objects', () => {
    // todo
  });
});
