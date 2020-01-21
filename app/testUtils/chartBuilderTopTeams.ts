import { ChartBuilder } from '../Chart/ChartBuilder';

ChartBuilder.build({
  headers: ['Team name', 'Medals'],
  dbSet: [
    { amount: 2, NOC: 'X' },
    { amount: 1, NOC: 'Y' },
    { amount: 0, NOC: 'Z' },
  ],
});
