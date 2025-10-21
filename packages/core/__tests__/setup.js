/**
 * Vitest setup file
 * Initializes the runtime before all tests
 */

import { beforeAll } from 'vitest';
import { initTestRuntime } from './helpers/mock.js';

// Initialize runtime once before all tests
// Uses production-like Node.js APIs (no mocks) by default
beforeAll(() => {
  initTestRuntime();
});
