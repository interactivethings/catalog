import validateSizes from './validateSizes';
import {DefaultDevices} from './../DefaultTheme';

test('Value is string that is not contained in the list', () => {
  expect(validateSizes( 'Palm Pre', DefaultDevices )).toBeFalsy();
});

test('Value is boolean true, should return DefaultDevices Array', () => {
  expect(validateSizes( true, DefaultDevices )).toEqual(DefaultDevices);
});

test('Value is Array, consisting of defined sizes', () => {
  const values = ['small', 'medium', 'large', 'xlarge'];
  expect(DefaultDevices).toEqual(validateSizes( values, DefaultDevices ));
});

test('Value is Array, not containing at least one of the defined sizes', () => {
  const values = ['camera obscura', 'That weird giant sony rear projection TV'];
  expect(validateSizes( values, DefaultDevices )).toBeFalsy();
});
