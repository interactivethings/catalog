import test from 'tape';
import parseSpecimenOptions from '../parseSpecimenOptions';
import mapSpecimenOption from '../mapSpecimenOption';

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
  t.deepEqual(parseSpecimenOptions(
    mapSpecimenOption(/^foo-(\d)$/, (v) => ({foo: +v}))
  )('html|foo-1'), {foo: 1});
  t.end();
});

test('Custom specimen option mapper', (t) => {
  t.deepEqual(parseSpecimenOptions(
    (option) => ({[option.split('-')[0]]: +option.split('-')[1]})
  )('html|foo-1,bar-3'), {foo: 1, bar: 3});
  t.end();
});

test('Mixed specimen options', (t) => {
  t.deepEqual(
    parseSpecimenOptions(
     mapSpecimenOption(/^lang-(\w+)$/, (lang) => ({lang}))
    )('code|lang-javascript,collapsed,'),
    {lang: 'javascript', collapsed: true}
  );
  t.end();
});
