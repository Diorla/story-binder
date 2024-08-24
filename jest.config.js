module.exports = {
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/story-binder.d.ts",
    "!**/*.config.ts",
    "!**/*.config.js",
    "!**/.vite/**",
    "!**/*.d.ts",
    "!**/src/main.ts",
    "!**/src/preload.ts",
    "!**/src/renderer.ts",
  ],
  setupFilesAfterEnv: ["jest-extended/all"],
};
