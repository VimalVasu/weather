import { describe, it, expect } from 'vitest';
import { formatTemperature } from './utils';

describe('formatTemperature', () => {
  it('rounds and appends °F', () => {
    expect(formatTemperature(72.4)).toBe('72°F');
    expect(formatTemperature(72.6)).toBe('73°F');
  });
});
