/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/'],
  "setupFilesAfterEnv": [
    "<rootDir>/src/setupTests.ts"
  ],
  moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
        '<rootDir>/__mocks__/file-mock.js',
      "\\.(css|scss)$": '<rootDir>/__mocks__/style-mock.js'
    }
};