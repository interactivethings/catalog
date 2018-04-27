import { compose, toLower, head, split, or } from "ramda";

const getType = compose(toLower, head, split("|"));

const parseSpecimenType = (options = "") => or(getType(options), "raw-code");

export default parseSpecimenType;
