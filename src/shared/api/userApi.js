import { httpClient } from "./httpClient";

export const userApi = {
  getProfile() {
    return httpClient.get("/user/profile");
  },

  updateProfile(payload) {
    return httpClient.put("/user/profile", payload);
  },
};
