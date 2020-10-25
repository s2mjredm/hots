const format = (num, unit, rounding) => {
  const rounded = Math.round(num / rounding) * rounding;
  return unit.replace(/;?#;?/, rounded);
};

export default format;
