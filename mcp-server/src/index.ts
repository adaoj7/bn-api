#!/usr/bin/env node
import { startServer } from './server';
import { getUnitCount } from './utils/dataLoader';

// Pre-load unit data
const unitCount = getUnitCount();
console.error(`Loaded ${unitCount} units`);

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
