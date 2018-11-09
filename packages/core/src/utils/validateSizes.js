/**
 * Checks if the delivered props are valid, returns false if not, otherwise a filtered Array
 */

const validateSizes = (input, catalogSizes) => {
  const isArray = Array.isArray(input);
  if (input === true) {
    return catalogSizes;
  } else if (typeof input === "string") {
    const foundInList = catalogSizes.find(val => input === val.name);
    return foundInList ? [].concat(foundInList) : false;
  } else if (
    isArray &&
    input.length === input.filter(item => typeof item === "string").length
  ) {
    const filtered = input
      .map(name => catalogSizes.find(size => size.name === name))
      .filter(Boolean);
    return filtered.length === input.length ? filtered : false;
  }
  return false;
};

export default validateSizes;
