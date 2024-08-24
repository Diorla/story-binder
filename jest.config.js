module.exports = {
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1",
  },
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
  ],
};
