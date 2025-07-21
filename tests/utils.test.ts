import { describe, it, expect } from 'vitest';
import { formatNumber } from '../lib/utils.ts';

describe('formatNumber', () => {
  it('formats numbers less than 1000', () => {
    expect(formatNumber(999)).toBe('999');
  });

  it('formats numbers in thousands', () => {
    expect(formatNumber(1234)).toBe('1.2k');
  });

  it('formats numbers in millions', () => {
    expect(formatNumber(2000000)).toBe('2.0m');
  });

  it('formats numbers in billions', () => {
    expect(formatNumber(3000000000)).toBe('3.0b');
  });
});
