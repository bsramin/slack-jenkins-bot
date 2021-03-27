export const error = {
  GENERIC: {
    code: 'generic',
    description: 'Generic error',
  },
  NOT_FOUND: {
    code: 'not_found',
    description: 'Not found error',
  },
  DATABASE: {
    code: 'database',
    description: 'Database error',
  },
  SLACK: {
    GENERIC: {
      description: 'Generic error',
      code: 900,
    },
    JOB: {
      description: 'Job not found',
      code: 901,
    },
    PARAMS: {
      description: 'Incomplete parameters',
      code: 902,
    },
    SAVE: {
      description: 'Unable to save request',
      code: 903,
    },
    UNAUTHORIZED: {
      description: 'Unauthorized',
      code: 904,
    },
  },
};
