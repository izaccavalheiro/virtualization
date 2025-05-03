const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/example/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/example/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
