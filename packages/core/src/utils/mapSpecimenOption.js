const mapSpecimenOption = (test, map) => option => {
  const match = test.exec(option);
  if (match) {
    const [, value] = match;
    return map(value);
  }
  return null;
};

export default mapSpecimenOption;
