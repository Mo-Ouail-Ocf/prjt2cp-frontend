import { V1 } from './V1';
import { ApiConfig, RequestParams } from './http-client';


const authApiConfig: ApiConfig = {
  baseUrl: 'http://127.0.0.1:8000',
};

export const v1AuthClient = new V1(authApiConfig);

const tokenExpired = (token: str) => {
  if (token == null) {
    return false;
  }

  const payload = atob(token.split(".")[1])
  const expiration = new Date(JSON.parse(payload).exp);
  const now = new Date();

  return expiration.getTime() <= (now.getTime() / 1000)
} 

// Function to retrieve the JWT token
export const getAccessToken = (): string | null => {
  const access_token = localStorage.getItem('access_token');

  if (! tokenExpired(access_token)) {
    return access_token;
  }

  const refresh_token = localStorage.getItem("refresh_token");

  if (tokenExpired(refresh_token)) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    return null;
  }

  const params: RequestParams = {
    headers: {
      Authorization: `Bearer ${refresh_token}`
    }
  }

  v1AuthClient.refreshV1AuthRefreshPost(params).then(response => {
    localStorage.setItem("access_token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
  }).catch(error => {
    console.log("Couldn't refresh tokens", error);
  })

  return localStorage.getItem("access_token")
};

// API client configuration
const apiConfig: ApiConfig = {
  baseUrl: 'http://127.0.0.1:8000', // The base URL for your API
  securityWorker: async () => {
    const token = getAccessToken();
    if (token) {
      return {
        headers: { Authorization: `Bearer ${token}` },
      };
    }
    throw "Login first!";
  },
};

// Instantiate V1 with the apiConfig
const v1Client = new V1(apiConfig);
// Now you can use v1Client to make authenticated requests
export default v1Client;
