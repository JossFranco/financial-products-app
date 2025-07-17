module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testMatch: ['**/+(*.)+(spec).+(ts)'],
transform: {
  '^.+\\.(ts|js|html)$': [
    'ts-jest',
    {
      tsconfig: 'tsconfig.spec.json',
    },
  ],
},
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary'],
  globals: {
  'ts-jest': {
    tsconfig: 'tsconfig.spec.json',
  },
},
};
