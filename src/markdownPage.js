import {createElement} from 'react';
import Page from './components/Page/Page';

// This function simply intersperses the values between the strings, and
// passes the result as children to the Page component. No further
// transformation is done, the Page component itself processes strings
// as markdown.
//
// The most we could do at this point is to parse strings into MDAST (or
// a similar abstract form). We can't convert the markdown text into React
// elements because that requires the Catalog context.
//
// Values SHOULD only be React Elements. The primary use case is to allow
// developers to easily instantiate React components in plain JavaScript,
// so that type checkers (flow, typescript) can verify that the correct
// props are pased to the component.
//
// > import {HintSpecimen, markdownPage} from 'catalog';
// > export const catalogPage = markdownPage`
// > # This is a page
// >
// > With a paragraph.
// >
// > ${<HintSpecimen>And a hint</HintSpecimen>}
// >
// > ${<MyComponent isCustomComponent={'AWESOME'} />}
// > `;

const markdownPage = (strings, ...values) =>
  createElement(Page, {},
    ...values.reduce((a, v, i) => a.concat([v, strings[i + 1]]), [strings[0]]));

export default markdownPage;
