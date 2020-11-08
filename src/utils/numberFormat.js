const format = (num, unit, rounding = 1, decimals = 0, factor = 1) => {
  let rounded =
    (Math.round(parseFloat(num) * parseFloat(factor)) / parseFloat(rounding)) *
    parseFloat(rounding);
  rounded = rounded.toFixed(parseInt(decimals, 10));
  if (unit) {
    return unit.replace(/;?#;?/, rounded);
  }
  return rounded;
};

export default format;
