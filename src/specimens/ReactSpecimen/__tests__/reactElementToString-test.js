import test from 'tape';
import React from 'react';
import reactElementToString from '../reactElementToString';

test('Children', (t) => {
  t.deepEqual(reactElementToString(<div>foo</div>), '<div>\n  foo\n</div>');
  t.end();
});

test('Nested Children', (t) => {
  t.deepEqual(reactElementToString(<div><div>foo</div></div>), '<div>\n  <div>\n    foo\n  </div>\n</div>');
  t.end();
});

test('No Children', (t) => {
  t.deepEqual(reactElementToString(<div />), '<div />');
  t.end();
});

test('Prop formatting', (t) => {
  t.deepEqual(reactElementToString(<div foo='bar' />), '<div foo=\'bar\' />');
  t.deepEqual(reactElementToString(<div foo />), '<div foo />');
  t.deepEqual(reactElementToString(<div foo bar={1} />), '<div\n  bar={1}\n  foo\n />');
  t.end();
});
