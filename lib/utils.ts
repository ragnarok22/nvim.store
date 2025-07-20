/**
 * Converts a number info format k, m, b, t
 * @param {number} count
 * @returns {string}
 **/
export const formatNumber = (count: number): string => {
  if (count < 1000) {
    return count.toString();
  }
  if (count < 1000000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  if (count < 1000000000) {
    return `${(count / 1000000).toFixed(1)}m`;
  }
  return `${(count / 1000000000).toFixed(1)}b`;
};
