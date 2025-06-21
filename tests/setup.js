export default async () => {
  const { expect, afterEach } = await import('vitest');
  const { cleanup } = await import('@testing-library/react');
  const matchersModule = await import('@testing-library/jest-dom/matchers');

  // Extend Vitest's expect with DOM matchers
  expect.extend(matchersModule.default);

  // Clean up after each test
  afterEach(() => {
    cleanup();
  });
};
