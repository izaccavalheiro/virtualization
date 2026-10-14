const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/example/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/example/'],
  // Measure every source file, not only the ones a test happens to import.
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.types.ts', '!src/**/__tests__/**'],
  coverageReporters: ['text', 'lcov', 'json-summary'],
  // Floor, not target: raise these as coverage improves, never lower them.
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 80,
      functions: 90,
      lines: 90
    }
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
