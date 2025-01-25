import type { Config } from '@jest/types';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const config: Config.InitialOptions = {
    preset: 'ts-jest',
    collectCoverage: true,
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'],
    coverageReporters: ['json', 'lcov', 'text', 'clover', 'html', 'text', 'text-summary', 'cobertura'],
    testPathIgnorePatterns: ['/node_modules/', '/.next/', '/.out/', '/public/'],
    testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@/src/components/(.*)$': '<rootDir>/src/components/$1',
    },
}


// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
