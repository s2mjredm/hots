export default (index, total, invert) => {
  if (invert) {
    return (index - total) * -1;
  }
  return index + 1;
};
