import { httpClient } from "./httpClient";

export const productApi = {
  getProduct(params = {}) {
    const query = new URLSearchParams(params).toString();
    return httpClient.get(`/products${query ? `?${query}` : ""}`);
  },

  getProductById(productId) {
    return httpClient.get(`/products/${productId}`);
  },
};
