import 'jest';
import { ChartBuilder } from '../app/Chart/ChartBuilder';
import { resolve } from 'path';
import { getSTDOUTFromChildProcess } from '../app/testUtils';

describe('Chartbuilder', () => {
  describe('ChartBuilder.prepareRowsToDisplay', () => {
    test('Amount decreases properly', () => {
      const optimizedToDisplay = ChartBuilder.prepareRowsToDisplay([
        { amount: 2000, NOC: 'X' },
        { amount: 1000, NOC: 'Y' },
        { amount: 0, NOC: 'Z' },
      ]);

      expect(optimizedToDisplay).toEqual([
        { amount: 200, NOC: 'X' },
        { amount: 100, NOC: 'Y' },
        { amount: 0, NOC: 'Z' },
      ]);
    });
  });

  describe('ChartBuilder.setProportionalAmount', () => {
    test('Proportional amount decreases properly', () => {
      const decreased = ChartBuilder.setProportionalAmount(
        [
          { amount: 2000, NOC: 'X' },
          { amount: 1000, NOC: 'Y' },
          { amount: 0, NOC: 'Z' },
        ],
        2000,
      );

      expect(decreased).toEqual([
        { amount: 200, NOC: 'X' },
        { amount: 100, NOC: 'Y' },
        { amount: 0, NOC: 'Z' },
      ]);
    });

    test('Proportional amount decreases properly', () => {
      const decreased = ChartBuilder.setProportionalAmount(
        [
          { amount: 2000, NOC: 'X' },
          { amount: 1000, NOC: 'Y' },
          { amount: 0, NOC: 'Z' },
        ],
        2000,
      );

      expect(decreased).toEqual([
        { amount: 200, NOC: 'X' },
        { amount: 100, NOC: 'Y' },
        { amount: 0, NOC: 'Z' },
      ]);
    });
  });

  describe('ChartBuilder.remapAmountBars', () => {
    test('Remap to medals works well', () => {
      const remapped = ChartBuilder.remapAmountBars([
        { amount: 2, NOC: 'X' },
        { amount: 1, NOC: 'Y' },
        { amount: 0, NOC: 'Z' },
      ]);

      expect(remapped).toEqual([
        ['X', '██'],
        ['Y', '█'],
        ['Z', ''],
      ]);
    });

    describe('ChartBuilder.build', () => {
      test('Builds chart properly', async () => {
        const resolvedFilePath = resolve(__dirname, '../app/testUtils/chartBuilderTopTeams.ts');
        const result = await getSTDOUTFromChildProcess(resolvedFilePath);

        expect(result).toMatchSnapshot();
      });
    });
  });
});
