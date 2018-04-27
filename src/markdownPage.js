import { createElement, isValidElement } from "react";
import Page from "./components/Page/Page";

// This function simply intersperses the values between the strings, and
// passes the result as children to the Page component. No further
// transformation is done, the Page component itself processes strings
// as markdown.
//
// The most we could do at this point is to parse strings into MDAST (or
// a similar abstract form). We can't convert the markdown text into React
// elements because that requires the Catalog context.
//
// Values SHOULD be React Elements, strings, numbers, or anything
// stringifiable. The primary use case is to allow
// developers to easily instantiate React components in plain JavaScript,
// so that type checkers (flow, typescript) can verify that the correct
// props are pased to the component.
//
// > import {HintSpecimen, markdown} from 'catalog';
// > export const catalogPage = markdown`
// > # This is a page
// >
// > With a paragraph. And a number ${123}
// >
// > ${<HintSpecimen>And a hint</HintSpecimen>}
// >
// > ${<MyComponent isCustomComponent={'AWESOME'} />}
// > `;

const replaceLast = (f, arr) => {
  arr[arr.length - 1] = f(arr[arr.length - 1]);
  return arr;
};

const markdownPage = (strings, ...values) =>
  createElement(
    Page,
    {},
    ...values.reduce(
      (a, v, i) => {
        // If it's a valid React element or array, just concat to the end of the array
        if (isValidElement(v) || Array.isArray(v)) {
          return a.concat(v, strings[i + 1]);
        }

        // String-concat v to last and next string part
        if (typeof v === "string" || typeof v === "number") {
          return replaceLast(last => last + v + strings[i + 1], a);
        }

        // Finally, try to stringify v
        return replaceLast(
          last => last + JSON.stringify(v) + strings[i + 1],
          a
        );
      },
      [strings[0]]
    )
  );

export default markdownPage;
