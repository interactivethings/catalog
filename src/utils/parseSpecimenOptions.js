import filter from "ramda/src/filter";
import compose from "ramda/src/compose";
import split from "ramda/src/split";
import complement from "ramda/src/complement";
import isEmpty from "ramda/src/isEmpty";
import mergeAll from "ramda/src/mergeAll";
import mapSpecimenOption from "./mapSpecimenOption";

const removeEmpty = filter(complement(isEmpty));
const splitType = compose(removeEmpty, split("|"));
const splitOptions = compose(removeEmpty, split(","));

const camelize = str => str.replace(/-(\w)/g, (_, c) => c.toUpperCase());

const nothing = () => null;
const mapSpanToProp = mapSpecimenOption(/^span-(\d)$/, v => ({ span: +v }));
const camelizeOption = option => ({ [camelize(option)]: true });

const optionToKeyValue = mapOptionsToProps => option => {
  for (let mapper of [mapOptionsToProps, mapSpanToProp]) {
    if (typeof mapper === "function") {
      const prop = mapper(option);
      if (prop !== null) {
        return prop;
      }
    }
  }
  return camelizeOption(option);
};

const parseSpecimenOptions = (mapOptionsToProps = nothing) => (
  options = ""
) => {
  const [, restOptions = ""] = splitType(options);
  return mergeAll(
    splitOptions(restOptions).map(optionToKeyValue(mapOptionsToProps))
  );
};

export default parseSpecimenOptions;
