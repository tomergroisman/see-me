// 1-->2 or -2-->-1 round
//0-1 ciel
// -1-->0 floor

/**
 * map a float value to an integer for the report purposes
 * @param {number} value
 * @returns {mappedValue}
 */
export function mapValues(value) {
  //-1 to 0 should be -1 --> floor
  if (value < 0 && value > -1) {
    return Math.floor(value);
  }
  //1 to 0 should be 1 --> ciel
  if (value > 0 && value < 1) {
    return Math.ceil(value);
  }
  return Math.round(value);
}

export function mapColor(value) {
  return value > 0 ? "green" : value < 0 ? "red" : "blue";
}
