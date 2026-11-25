import {defineConfig} from 'vitest/config';
import path from 'path';

export default defineConfig({
  resolve: {alias: {'@': path.resolve(__dirname, 'src')}},
  test: {
    include: ['src/**/*.test.{ts,tsx}', 'tests/unit/**/*.test.{ts,tsx}'],
    environment: 'node',
    coverage: {provider: 'v8', include: ['src/model/**', 'src/data/**'], reporter: ['text-summary']},
  },
});
