module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['node_modules/?!(jsx-dom)/'],
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
};
