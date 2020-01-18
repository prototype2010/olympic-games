import 'jest';
import { ChartBuilder } from '../app/Chart/ChartBuilder';

describe('Chart builder', () => {
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

  test('Builds chart properly', () => {
    const builtChart = ChartBuilder.build({
      headers: ['Team name', 'Medals'],
      dbSet: [
        { amount: 2, NOC: 'X' },
        { amount: 1, NOC: 'Y' },
        { amount: 0, NOC: 'Z' },
      ],
    });

    expect(builtChart).toEqual([
      ['Team name', 'Medals'],
      [
        'X',
        '████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████',
      ],
      ['Y', '████████████████████████████████████████████████████████████████████████████████████████████████████'],
      ['Z', ''],
    ]);
  });
});
