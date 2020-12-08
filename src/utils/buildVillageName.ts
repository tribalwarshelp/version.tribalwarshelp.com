const buildVillageName = (name = '', x = 0, y = 0) => {
  return `${name} (${x}|${y}) K${y.toString()[0] + x.toString()[0]}`;
};

export default buildVillageName;
