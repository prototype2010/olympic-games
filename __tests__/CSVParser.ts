import 'jest';
import path from 'path';
import { CSVParser } from '../app/CSVProcessors/CSVParser';
import parsedCSV from '../app/testUtils/testData/csv/parsedCSV';

describe('CSV parser tests', () => {
  test('CSVParser.parse (positive)', async () => {
    const parsedFile = await CSVParser.parse(path.resolve(__dirname, '../app/testUtils/testData/csv/test.csv'));

    expect(parsedFile).toEqual(parsedCSV);
  });
});
