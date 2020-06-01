module.exports = {
  "roots": [
    "<rootDir>/src"
  ],
  // Module file extensions for importing
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js"
  ],
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  "transform": {
    "\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js"
  },
  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename, should contain `test` or `spec`.
  "testRegex": "/__tests__/.*\\.(ts|tsx|js)$",
  // Setup Enzyme
  "setupTestFrameworkScriptFile": "<rootDir>src/setupTests.ts",
  "snapshotSerializers": ["enzyme-to-json/serializer"]
};
