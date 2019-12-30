import { IndexedObject, Medal } from '../types';

export function getMedalsSummaryFromDBSet(
  summaryKey: string,
  DBRows: Array<IndexedObject>,
): Array<[string | number, Array<Medal>]> {
  const consolidatedData = DBRows.reduce((summary, currentRow) => {
    const consolidationKey = currentRow[summaryKey];
    const { medal } = currentRow;

    if (!summary.has(consolidationKey)) {
      summary.set(consolidationKey, []);
    }

    if (medal !== Medal.NA) {
      summary.set(consolidationKey, [...summary.get(consolidationKey), medal]);
    }

    return summary;
  }, new Map<string, Array<Medal>>());

  return [...consolidatedData.entries()];
}
