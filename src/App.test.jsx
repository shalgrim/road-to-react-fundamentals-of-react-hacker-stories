import { describe, it, expect } from 'vitest';

describe('something truthy and falsy', () => {  // test suite
  it('true to be true', () => {  // test case
    expect(true).toBeTruthy();
  });

  it('false to be false', () => {  // test case
    expect(false).toBeFalsy();
  });
});
