export const selectCartItems = (state) => state.cart.items;
export const selectCartError = (state) => state.cart.error;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => {
    const price = item.price || 0;
    return total + price * item.qty;
  }, 0);

export const selectCartCount = (state) =>
  state.cart.items.reduce((total, item) => total + item.qty, 0);
