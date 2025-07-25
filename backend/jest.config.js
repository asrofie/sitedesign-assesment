const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  transformIgnorePatterns: [
    '/node_modules/(?!franc)/', // This will transform 'franc' but ignore other node_modules
  ],
  // Add these new configurations:
  testMatch: [
    "**/tests/**/*.test.[jt]s?(x)",
    "**/tests/**/*.spec.[jt]s?(x)",
    "**/__tests__/**/*.[jt]s?(x)"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  roots: ["<rootDir>/tests", "<rootDir>/src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"  // Optional but helpful for path aliases
  }
};