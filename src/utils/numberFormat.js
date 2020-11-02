const format = (num, unit, rounding = 1, decimals = 0, factor = 1) => {
  console.log(factor);
  console.log(unit);
  let rounded =
    Math.round(parseFloat(num) / parseFloat(rounding)) * parseFloat(rounding) * parseFloat(factor);
  rounded = rounded.toFixed(parseInt(decimals, 10));
  if (unit) {
    return unit.replace(/;?#;?/, rounded);
  }
  return rounded;
};

export default format;
