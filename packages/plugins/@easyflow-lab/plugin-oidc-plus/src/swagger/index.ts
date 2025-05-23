const user = {
  type: 'object',
  description: 'user',
  properties: {
    id: {
      type: 'integer',
      description: 'ID',
    },
    nickname: {
      type: 'string',
      description: 'Nickname',
    },
    email: {
      type: 'string',
      description: 'email',
    },
    phone: {
      type: 'string',
      description: 'Mobile number',
    },
    appLang: {
      type: 'string',
      description: 'User language',
    },
    systemSettings: {
      type: 'object',
      description: 'System Settings',
      properties: {
        theme: {
          type: 'string',
          description: 'User using topic',
        },
      },
    },
    createdAt: {
      type: 'string',
      format: 'date-time',
      description: 'Create time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
      description: 'Update time',
    },
    createdById: {
      type: 'integer',
      description: 'creator',
    },
    updatedById: {
      type: 'integer',
      description: 'Update person',
    },
  },
};

export default {
  info: {
    title: 'EasyFlow API - OIDC plugin',
  },
  paths: {
    '/oidc:getAuthUrl': {
      security: [],
      get: {
        description: 'Get OIDC authorization url',
        tags: ['OIDC'],
        parameters: [
          {
            name: 'X-Authenticator',
            description: 'Login method identification',
            in: 'header',
            schema: {
              type: 'string',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'ok',
            content: {
              'application/json': {
                schema: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
    '/auth:signIn': {
      security: [],
      post: {
        description: 'OIDC sign in',
        tags: ['OIDC'],
        parameters: [
          {
            name: 'X-Authenticator',
            description: 'Login method identification',
            in: 'header',
            schema: {
              type: 'string',
            },
            required: true,
          },
          {
            name: 'easyflow_oidc',
            description: 'state check value',
            in: 'cookie',
            schema: {
              type: 'string',
            },
            required: true,
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  code: {
                    type: 'string',
                  },
                  state: {
                    type: 'string',
                  },
                  iss: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'ok',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string',
                    },
                    user,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
