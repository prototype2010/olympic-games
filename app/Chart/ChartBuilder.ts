import { DBSet } from '../types';

interface ChartData {
  headers: Array<string>;
  dbSet: DBSet;
}

export class ChartBuilder {
  private static readonly MAX_BARS = 200;
  private static readonly MEDAL_SYMBOL = '█';

  static build(chartData: ChartData) {
    const { dbSet, headers } = chartData;

    const readyToDisplayRows = ChartBuilder.prepareRowsToDisplay(dbSet);

    ChartBuilder.displayChart([headers, ...readyToDisplayRows]);
  }

  static prepareRowsToDisplay(dbSet: DBSet) {
    const maximumMedalAmount = Math.max(...dbSet.map(({ amount }) => amount));
    const withProportionalAmount = ChartBuilder.setProportionalAmount(dbSet, maximumMedalAmount);

    return ChartBuilder.remapAmountBars(withProportionalAmount);
  }

  static setProportionalAmount(dbSet: DBSet, maximumValue: number): DBSet {
    return dbSet.map(({ amount, ...rest }) => {
      return { amount: Math.ceil((amount / maximumValue) * ChartBuilder.MAX_BARS), ...rest };
    });
  }

  static remapAmountBars(dbSet: DBSet): Array<any> {
    return dbSet.map(({ amount, ...rest }) => {
      const otherParams = Object.values({ ...rest });

      return [
        ...otherParams,
        new Array(amount)
          .fill('')
          .map(() => ChartBuilder.MEDAL_SYMBOL)
          .join(''),
      ];
    });
  }

  static displayChart(rows: Array<Array<any>>) {
    rows.forEach(row => console.log(`${'\t'}${row.join('\t')}`));

    return rows;
  }
}
