module.exports = {
  preset: 'ts-jest',
  roots: [
    '<rootDir>/tests'
  ],
  testEnvironment: 'node',
  testRegex: 'tests/(.+)\\.test\\.(jsx?|tsx?)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};