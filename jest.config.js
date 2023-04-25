/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    projects: [
        {
            displayName: 'browser env',
            preset: 'ts-jest',
            testEnvironment: 'jsdom',
            roots: ['<rootDir>/'],
        },
    ],
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/__mocks__/fileMock.js',
        "\\.(css|scss)$": '<rootDir>/__mocks__/style-mock.js'
      }
};
