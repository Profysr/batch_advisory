export const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r}, ${g}, ${b}, 0.25)`;
};

export const extractSpecificColumns = (row, cols) => {
  return cols.reduce((result, col) => {
    if (row[col] !== undefined) {
      result[col] = row[col];
    }
    return result;
  }, {});
};
