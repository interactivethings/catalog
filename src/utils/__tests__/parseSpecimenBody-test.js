import test from 'tape';
import {parseSpecimenBody, parseSpecimenYamlBody} from '../parseSpecimenBody';

test('Default String body', (t) => {
  t.deepEqual(parseSpecimenBody()('foo'), {children: 'foo'});
  t.end();
});

test('Default JSON body', (t) => {
  t.deepEqual(parseSpecimenYamlBody()('{"foo": "bar", "baz": 12.3, "nothing": null, "really": true}'), {foo: 'bar', baz: 12.3, nothing: null, really: true});
  t.end();
});

test('Default YAML body', (t) => {
  t.deepEqual(parseSpecimenYamlBody()('foo: bar\nbaz: 12.3\nnothing: null\nreally: true'), {foo: 'bar', baz: 12.3, nothing: null, really: true});
  t.end();
});

test('Mapped raw YAML body', (t) => {
  t.deepEqual(parseSpecimenYamlBody((_, raw) => raw)('foo: bar\nbaz: 12.3\nnothing: null\nreally: true'), 'foo: bar\nbaz: 12.3\nnothing: null\nreally: true');
  t.end();
});

test('Mapped YAML body', (t) => {
  t.deepEqual(parseSpecimenYamlBody((props) => props.foo)('foo: bar\nbaz: 12.3\nnothing: null\nreally: true'), 'bar');
  t.end();
});

test('YAML body with imports', (t) => {
  t.deepEqual(parseSpecimenYamlBody()('foo: !import bar', {bar: 'bar'}), {foo: 'bar'});
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
  t.deepEqual(parseSpecimenBody()('foo\n---\nbar'), {children: 'bar'});
  t.end();
});

test('body with multiple separators', (t) => {
  t.deepEqual(parseSpecimenBody()('foo: true\n---\nbar\n---\nbaz'), {foo: true, children: 'bar\n---\nbaz'});
  t.end();
});

test('body with trailing separator', (t) => {
  t.deepEqual(parseSpecimenBody()('foo---\nbar'), {children: 'foo---\nbar'});
  t.end();
});

test('body with children but valid yaml', (t) => {
  t.deepEqual(parseSpecimenBody()('foo: true'), {children: 'foo: true'});
  t.end();
});

test('body with imports in props', (t) => {
  t.deepEqual(parseSpecimenBody()('foo: !import bar\n---\nbaz', {bar: 'bar'}), {foo: 'bar', children: 'baz'});
  t.end();
});
