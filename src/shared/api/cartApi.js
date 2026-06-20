import { httpClient } from "./httpClient";

export const cartApi = {
  getCart() {
    return httpClient.get("/cart");
  },

  addToCart(productId, qty = 1) {
    return httpClient.post("/cart/items", {
      productId,
      qty,
    });
  },

  updateCartItem(itemId, qty) {
    return httpClient.put(`/cart/items/${itemId}`, {
      qty,
    });
  },

  removeCartItem(itemId) {
    return httpClient.delete(`cart/items/${itemId}`);
  },
};
