import { httpClient } from "./httpClient";

export const authApi = {
  login(credentials) {
    return httpClient.post("/auth/login", credentials);
  },

  register(payload) {
    return httpClient.post("/auth/register", payload);
  },

  logout() {
    return httpClient.post("/auth/logout");
  },
};
