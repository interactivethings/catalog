import compose from "ramda/src/compose";
import toLower from "ramda/src/toLower";
import head from "ramda/src/head";
import split from "ramda/src/split";
import or from "ramda/src/or";

const getType = compose(toLower, head, split("|"));

const parseSpecimenType = (options = "") => or(getType(options), "raw-code");

export default parseSpecimenType;
