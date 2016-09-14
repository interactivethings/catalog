import {parseSpecimenBody, parseSpecimenYamlBody} from './parseSpecimenBody';

test('Default String body', () => {
  expect(parseSpecimenBody()('foo')).toEqual({children: 'foo'});
});

test('Default JSON body', () => {
  expect(parseSpecimenYamlBody()('{"foo": "bar", "baz": 12.3, "nothing": null, "really": true}')).toEqual({foo: 'bar', baz: 12.3, nothing: null, really: true});
});

test('Default YAML body', () => {
  expect(parseSpecimenYamlBody()('foo: bar\nbaz: 12.3\nnothing: null\nreally: true')).toEqual({foo: 'bar', baz: 12.3, nothing: null, really: true});
});

test('Mapped raw YAML body', () => {
  expect(parseSpecimenYamlBody((_, raw) => raw)('foo: bar\nbaz: 12.3\nnothing: null\nreally: true'), 'foo: bar\nbaz: 12.3\nnothing: null\nreally: true');
});

test('Mapped YAML body', () => {
  expect(parseSpecimenYamlBody((props) => props.foo)('foo: bar\nbaz: 12.3\nnothing: null\nreally: true'), 'bar');
});

test('body with props and children', () => {
  expect(parseSpecimenBody()('foo: bar\nbaz: 12.3\n---\nfoo')).toEqual({foo: 'bar', baz: 12.3, children: 'foo'});
});

test('body with props and empty children', () => {
  expect(parseSpecimenBody()('foo: bar\nbaz: 12.3\n---\n')).toEqual({foo: 'bar', baz: 12.3, children: ''});
});

test('body with separator but only children', () => {
  expect(parseSpecimenBody()('---\nfoo')).toEqual({children: 'foo'});
});

test('body with separator and empty props', () => {
  expect(parseSpecimenBody()('\n\n---\nfoo')).toEqual({children: 'foo'});
});

test('body with separator and invalid props', () => {
  expect(parseSpecimenBody()('foo\n---\nbar')).toEqual({children: 'bar'});
});

test('body with multiple separators', () => {
  expect(parseSpecimenBody()('foo: true\n---\nbar\n---\nbaz')).toEqual({foo: true, children: 'bar\n---\nbaz'});
});

test('body with trailing separator', () => {
  expect(parseSpecimenBody()('foo---\nbar')).toEqual({children: 'foo---\nbar'});
});

test('body with children but valid yaml', () => {
  expect(parseSpecimenBody()('foo: true')).toEqual({children: 'foo: true'});
});
