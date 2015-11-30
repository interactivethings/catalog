import test from 'tape';
import parseSpecimenBody from '../parseSpecimenBody';

test('Default String body', (t) => {
  t.deepEqual(parseSpecimenBody()('foo'), 'foo');
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
  t.deepEqual(parseSpecimenBody((body) => body.foo)('foo: bar\nbaz: 12.3\nnothing: null\nreally: true'), 'bar');
  t.end();
});
