const format = (num, unit, rounding = 1, decimals = 0) => {
  let rounded = parseFloat(num) / parseFloat(rounding);
  rounded = rounded.toFixed(parseInt(decimals, 10));
  if (unit) {
    return unit.replace(/;?#;?/, rounded);
  }
  return rounded;
};

export default format;
