module.exports = {
  testEnvironment: 'jsdom',
  // These dependencies publish ESM; transform them for the CommonJS tests.
  transformIgnorePatterns: [
    '/node_modules/(?!jsx-dom/|@sindresorhus/|escape-string-regexp/)',
  ],
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: { module: 'CommonJS' } }],
  },
};
