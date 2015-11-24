import test from 'tape';
import parseSpecimenOptions from '../parseSpecimenOptions';

test('Default specimen options', (t) => {
  t.deepEqual(parseSpecimenOptions()(), {});
  t.end();
});

test('Boolean specimen options', (t) => {
  t.deepEqual(parseSpecimenOptions()('html|foo'), {foo: true});
  t.deepEqual(parseSpecimenOptions()('html|foo,bar'), {foo: true, bar: true});
  t.end();
});

test('Specimen options are camelized', (t) => {
  t.deepEqual(parseSpecimenOptions()('html|foo-bar'), {fooBar: true});
  t.end();
});

test('Specimen span option is mapped by default', (t) => {
  t.deepEqual(parseSpecimenOptions()('html|span-1'), {span: 1});
  t.end();
});


test('Mapped specimen option', (t) => {
  t.deepEqual(parseSpecimenOptions([{test: /^foo-(\d)$/, map: (v) => ({foo: +v})}])('html|foo-1'), {foo: 1});
  t.end();
});

test('Mixed specimen options', (t) => {
  t.deepEqual(parseSpecimenOptions([{test: /^lang-(\w+)$/, map: (lang) => ({lang})}])('code|lang-javascript,collapsed,'), {lang: 'javascript', collapsed: true});
  t.end();
});
