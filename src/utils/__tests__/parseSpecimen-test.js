import test from 'tape';
import parseSpecimen from '../parseSpecimen';

test('Defaults', (t) => {
  t.deepEqual(parseSpecimen(), {specimen: 'code', options: {}, body: ''});
  t.end();
});

test('String body', (t) => {
  t.deepEqual(parseSpecimen('foo'), {specimen: 'code', options: {}, body: 'foo'});
  t.end();
});

test('JSON body', (t) => {
  t.deepEqual(parseSpecimen('{"foo": "bar", "baz": 12.3, "nothing": null, "really": true}'), {specimen: 'code', options: {}, body: {foo: 'bar', baz: 12.3, nothing: null, really: true}});
  t.end();
});

test('YAML body', (t) => {
  t.deepEqual(parseSpecimen('foo: bar\nbaz: 12.3\nnothing: null\nreally: true'), {specimen: 'code', options: {}, body: {foo: 'bar', baz: 12.3, nothing: null, really: true}});
  t.end();
});

test('Specimen without options', (t) => {
  t.deepEqual(parseSpecimen('', 'html'), {specimen: 'html', options: {}, body: ''});
  t.end();
});

test('Specimen with only boolean options', (t) => {
  t.deepEqual(parseSpecimen('', 'html|foo'), {specimen: 'html', options: {foo: true}, body: ''});
  t.deepEqual(parseSpecimen('', 'html|foo,bar'), {specimen: 'html', options: {foo: true, bar: true}, body: ''});
  t.end();
});

test('Camelize options', (t) => {
  t.deepEqual(parseSpecimen('', 'html|foo-bar'), {specimen: 'html', options: {fooBar: true}, body: ''});
  t.end();
});

test('Specimen with span option', (t) => {
  t.deepEqual(parseSpecimen('', 'html|span-1'), {specimen: 'html', options: {span: 1}, body: ''});
  t.end();
});

test('Code specimen with lang option', (t) => {
  t.deepEqual(parseSpecimen('', 'code|lang-javascript'), {specimen: 'code', options: {lang: 'javascript'}, body: ''});
  t.end();
});
