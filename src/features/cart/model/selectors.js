const EMPTY_CART_ITEMS = [];

export const selectCartItems = (state) => state.cart?.items ?? EMPTY_CART_ITEMS;

export const selectCartError = (state) => state.cart?.error ?? null;

export const selectCartStatus = (state) => state.cart?.status ?? "idle";

export const selectCartTotal = (state) =>
  selectCartItems(state).reduce((total, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;

    return total + price * qty;
  }, 0);

export const selectCartCount = (state) =>
  selectCartItems(state).reduce((total, item) => {
    const qty = Number(item.qty) || 0;

    return total + qty;
  }, 0);
