

import { getLoggerLevel, getLoggerTransport } from '@easyflow/logger';
import { AppLoggerOptions } from '@easyflow/server';

export default {
  request: {
    transports: getLoggerTransport(),
    level: getLoggerLevel(),
  },
  system: {
    transports: getLoggerTransport(),
    level: getLoggerLevel(),
  },
} as AppLoggerOptions;
