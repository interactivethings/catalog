import test from 'tape';
import parseSpecimenBody from '../parseSpecimenBody';

test('Default String body', (t) => {
  t.deepEqual(parseSpecimenBody()('foo'), {children: 'foo'});
  t.end();
});

test('Default JSON body', (t) => {
  t.deepEqual(parseSpecimenBody()('{"foo": "bar", "baz": 12.3, "nothing": null, "really": true}'), {foo: 'bar', baz: 12.3, nothing: null, really: true});
  t.end();
});

test('Default YAML body', (t) => {
  t.deepEqual(parseSpecimenBody()('foo: bar\nbaz: 12.3\nnothing: null\nreally: true'), {foo: 'bar', baz: 12.3, nothing: null, really: true});
  t.end();
});

test('Mapped raw YAML body', (t) => {
  t.deepEqual(parseSpecimenBody((_, raw) => raw)('foo: bar\nbaz: 12.3\nnothing: null\nreally: true'), 'foo: bar\nbaz: 12.3\nnothing: null\nreally: true');
  t.end();
});

test('Mapped YAML body', (t) => {
  t.deepEqual(parseSpecimenBody((props) => props.foo)('foo: bar\nbaz: 12.3\nnothing: null\nreally: true'), 'bar');
  t.end();
});

test('body with props and children', (t) => {
  t.deepEqual(parseSpecimenBody()('foo: bar\nbaz: 12.3\n---\nfoo'), {foo: 'bar', baz: 12.3, children: 'foo'});
  t.end();
});

test('body with props and empty children', (t) => {
  t.deepEqual(parseSpecimenBody()('foo: bar\nbaz: 12.3\n---\n'), {foo: 'bar', baz: 12.3, children: ''});
  t.end();
});

test('body with separator but only children', (t) => {
  t.deepEqual(parseSpecimenBody()('---\nfoo'), {children: 'foo'});
  t.end();
});

test('body with separator and empty props', (t) => {
  t.deepEqual(parseSpecimenBody()('\n\n---\nfoo'), {children: 'foo'});
  t.end();
});

test('body with separator and invalid props', (t) => {
  t.deepEqual(parseSpecimenBody()('foo\n---\nbar'), {children: 'foo\n---\nbar'});
  t.end();
});

test('body with multiple separators', (t) => {
  t.deepEqual(parseSpecimenBody()('foo: true\n---\nbar\n---\nbaz'), {foo: true, children: 'bar\n---\nbaz'});
  t.end();
});

