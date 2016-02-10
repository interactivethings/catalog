import test from 'tape';
import parseSpecimenType from '../parseSpecimenType';

test('Default specimen type is `raw-code`', (t) => {
  t.equal(parseSpecimenType(), 'raw-code');
  t.end();
});

test('String without options', (t) => {
  t.equal(parseSpecimenType('html'), 'html');
  t.end();
});

test('String before | is specimen type', (t) => {
  t.equal(parseSpecimenType('html|no-source'), 'html');
  t.end();
});

test('Specimen type is always lower-cased', (t) => {
  t.equal(parseSpecimenType('HtmL'), 'html');
  t.end();
});

