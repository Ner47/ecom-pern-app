import { httpClient } from "./httpClient";

export const orderApi = {
  getOrders() {
    return httpClient.get("/orders");
  },

  getOrderById(orderId) {
    return httpClient.get(`/orders/${orderId}`);
  },

  createOrder(cartId, paymentInfo) {
    return httpClient.post("/cart/checkout", {
      cartId,
      paymentInfo,
    });
  },
};
