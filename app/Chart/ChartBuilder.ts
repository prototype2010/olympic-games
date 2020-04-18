import { DBSet } from '../types';

interface ChartData {
  headers: Array<string>;
  dbSet: DBSet;
}

export class ChartBuilder {
  private static readonly MAX_BARS = 200;
  private static VALUE_SYMBOL = '█';

  public static build(chartData: ChartData, symbol?: string) {
    const { dbSet, headers } = chartData;

    const readyToDisplayRows = ChartBuilder.prepareRowsToDisplay(dbSet);

    const remappedToBars = ChartBuilder.remapAmountBars(readyToDisplayRows);

    /* if symbol exists - use different symbol */
    ChartBuilder.VALUE_SYMBOL = symbol || ChartBuilder.VALUE_SYMBOL;

    ChartBuilder.displayChart([headers, ...remappedToBars]);
  }

  static prepareRowsToDisplay(dbSet: DBSet) {
    const maximumMedalAmount = Math.max(...dbSet.map(({ amount }) => amount));
    return ChartBuilder.setProportionalAmount(dbSet, maximumMedalAmount);
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
          .map(() => ChartBuilder.VALUE_SYMBOL)
          .join(''),
      ];
    });
  }

  static displayChart(rows: Array<Array<any>>) {
    rows.forEach(row => console.log(`${'\t'}${row.join('\t')}`));
  }
}
