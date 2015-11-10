import test from 'tape';
import parseSpecimen from '../src/utils/parseSpecimen';

test('Defaults', (t) => {
  t.plan(1);
  t.deepEqual(parseSpecimen(), {specimen: 'code', options: {}, body: ''});
});

test('String body', (t) => {
  t.plan(1);
  t.deepEqual(parseSpecimen('foo'), {specimen: 'code', options: {}, body: 'foo'});
});

test('JSON body', (t) => {
  t.plan(1);
  t.deepEqual(parseSpecimen('{"foo": "bar"}'), {specimen: 'code', options: {}, body: {foo: 'bar'}});
});

test('Specimen without options', (t) => {
  t.plan(1);
  t.deepEqual(parseSpecimen('', 'html'), {specimen: 'html', options: {}, body: ''});
});

test('Specimen with only boolean options', (t) => {
  t.plan(2);
  t.deepEqual(parseSpecimen('', 'html|foo'), {specimen: 'html', options: {foo: true}, body: ''});
  t.deepEqual(parseSpecimen('', 'html|foo,bar'), {specimen: 'html', options: {foo: true, bar: true}, body: ''});
});

test('Camelize options', (t) => {
  t.plan(1);
  t.deepEqual(parseSpecimen('', 'html|foo-bar'), {specimen: 'html', options: {fooBar: true}, body: ''});
});

test('Specimen with span option', (t) => {
  t.plan(1);
  t.deepEqual(parseSpecimen('', 'html|span-1'), {specimen: 'html', options: {span: 1}, body: ''});
});
