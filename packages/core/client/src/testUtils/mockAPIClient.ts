

import { APIClient } from '../api-client';
import { Application } from '../application';

class MockAPIClient extends APIClient {
  mockAdapter() {
    const MockAdapter = require('axios-mock-adapter');
    return new MockAdapter(this.axios);
  }
}

export const mockAPIClient = () => {
  const apiClient = new MockAPIClient();
  const app = new Application();
  apiClient.app = app;

  const mockRequest = apiClient.mockAdapter();
  return { apiClient, mockRequest };
};
