import csv from 'csv-parser';
import { createReadStream } from 'fs';
import { RawCSVRecord } from '../types/index';

export class CSVParser {
  static async parse(filePath: string): Promise<Array<RawCSVRecord>> {
    const parsedCsv = await new Promise(resolve => {
      const results: Array<string> = [];

      createReadStream(filePath)
        .pipe(
          csv({
            separator: ',',
            mapHeaders: ({ header }) => header.toLowerCase(),
          }),
        )
        .on('data', data => results.push(data))
        .on('end', () => resolve(results));
    }).catch(error => {
      console.error(error);

      return [];
    });

    return parsedCsv as Array<RawCSVRecord>;
  }
}
