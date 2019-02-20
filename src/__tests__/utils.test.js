import { numericMap, round } from '../utils';

test('rounding numbers should be to 3 decimal places', () => {
  expect(round(3.12222)).toBe(3.122);
});

test('it should convert number ranges correctly', () => {
  expect(numericMap(5, 0, 10, 0, 100)).toBe(50);
});

test('it should convert number ranges correctly even if input is over maximum', () => {
  expect(numericMap(11, 0, 10, 0, 100)).toBe(100);
});

test('it should convert number ranges correctly even if input is under minimum', () => {
  expect(numericMap(-1, 0, 10, 0, 100)).toBe(0);
});
