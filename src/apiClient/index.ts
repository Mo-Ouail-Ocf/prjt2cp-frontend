import { V1 } from './V1';
import { ApiConfig } from './http-client';

// Function to retrieve the JWT token
const getSecurityData = (): string | null => {
  return localStorage.getItem('jwtToken');
};

// API client configuration
const apiConfig: ApiConfig = {
  baseUrl: 'http://127.0.0.1:8000', // The base URL for your API
  securityWorker: async () => {
    const token = getSecurityData();
    if (token) {
      return {
        headers: { Authorization: `Bearer ${token}` },
      };
    }
    return {};
  },
};

// Instantiate V1 with the apiConfig
const v1Client = new V1(apiConfig);
// Now you can use v1Client to make authenticated requests
export default v1Client;

