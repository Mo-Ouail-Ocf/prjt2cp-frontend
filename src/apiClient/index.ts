import { V1 } from "./V1";
import { ApiConfig, RequestParams } from "./http-client";

const url = "http://localhost:8000";

const authApiConfig: ApiConfig = {
  baseUrl: url,
};

export const v1AuthClient = new V1(authApiConfig);

const tokenExpired = (token: string) => {
  if (token == null) {
    return true;
  }

  const payload = atob(token.split(".")[1]);
  const expiration = new Date(JSON.parse(payload).exp);
  const now = new Date();

  return expiration.getTime() <= now.getTime() / 1000;
};

// Function to retrieve the JWT token
export const getAccessToken = async (): Promise<string> => {
  const access_token = localStorage.getItem("access_token");

  if (!tokenExpired(access_token as string)) {
    return access_token as string;
  }

  const refresh_token = localStorage.getItem("refresh_token");

  if (tokenExpired(refresh_token as string)) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    throw new Error("Please Login");
  }

  const params: RequestParams = {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  };

  try {
    const res = await v1AuthClient.refreshV1AuthRefreshPost(params);
    localStorage.setItem("access_token", res.data.access_token);
    localStorage.setItem("refresh_token", res.data.refresh_token);
  } catch (error) {
    throw new Error("Couldn't refresh tokens");
  }

  return localStorage.getItem("access_token") as string;
};

// API client configuration
const apiConfig: ApiConfig = {
  baseUrl: url,
  securityWorker: async () => {
    const token = await getAccessToken();
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
