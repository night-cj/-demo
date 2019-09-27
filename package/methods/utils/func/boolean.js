/**
 * 变量转boolean
 * @param value
 * @returns {boolean}
 */
function coerceBoolean(value) {
  return value !== null && value !== undefined && `${value}` !== 'false' && `${value}` !== 'NaN' && `${value}` !== '';
}

export {
  coerceBoolean
}
