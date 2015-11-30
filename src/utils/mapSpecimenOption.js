const mapSpecimenOption = (test: RegExp, map: Function) => (option: String) => {
  const match = test.exec(option);
  if (match) {
    const [, value] = match;
    return map(value);
  }
  return null;
};

export default mapSpecimenOption;
