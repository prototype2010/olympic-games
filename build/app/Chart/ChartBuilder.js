'use strict';
var __rest =
  (this && this.__rest) ||
  function(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
class ChartBuilder {
  static build(chartData) {
    const { dbSet, headers } = chartData;
    const readyToDisplayRows = ChartBuilder.prepareRowsToDisplay(dbSet);
    const remappedToBars = ChartBuilder.remapAmountBars(readyToDisplayRows);
    ChartBuilder.displayChart([headers, ...remappedToBars]);
    /* for testing purposes */
    return [headers, ...remappedToBars];
  }
  static prepareRowsToDisplay(dbSet) {
    const maximumMedalAmount = Math.max(...dbSet.map(({ amount }) => amount));
    return ChartBuilder.setProportionalAmount(dbSet, maximumMedalAmount);
  }
  static setProportionalAmount(dbSet, maximumValue) {
    return dbSet.map(_a => {
      var { amount } = _a,
        rest = __rest(_a, ['amount']);
      return Object.assign({ amount: Math.ceil((amount / maximumValue) * ChartBuilder.MAX_BARS) }, rest);
    });
  }
  static remapAmountBars(dbSet) {
    return dbSet.map(_a => {
      var { amount } = _a,
        rest = __rest(_a, ['amount']);
      const otherParams = Object.values(Object.assign({}, rest));
      return [
        ...otherParams,
        new Array(amount)
          .fill('')
          .map(() => ChartBuilder.MEDAL_SYMBOL)
          .join(''),
      ];
    });
  }
  static displayChart(rows) {
    if (!process.env.test) {
      /* do not display charts during tests */
      rows.forEach(row => console.log(`${'\t'}${row.join('\t')}`));
    }
    /* for testing purposes */
    return rows;
  }
}
exports.ChartBuilder = ChartBuilder;
ChartBuilder.MAX_BARS = 200;
ChartBuilder.MEDAL_SYMBOL = '█';
//# sourceMappingURL=ChartBuilder.js.map
