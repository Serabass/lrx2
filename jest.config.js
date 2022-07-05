module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/.jest/__mocks__/styleMock.js"
  },
  modulePathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/example/",
  ]
};
