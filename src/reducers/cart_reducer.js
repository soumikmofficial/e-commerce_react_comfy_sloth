import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, amount, color, product } = action.payload;
    const tempProduct = state.cart.find((p) => p.id === id + color);
    if (tempProduct) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newProduct = {
        color,
        amount,
        price: product.price,
        id: id + color,
        name: product.name,
        max: product.stock,
        image: product.images[0].url,
      };
      return { ...state, cart: [...state.cart, newProduct] };
    }
  }
  // remove cart item
  if (action.type === REMOVE_CART_ITEM) {
    const newCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: newCart };
  }

  // clear cart
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  // toggle item amount
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    const tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value === "increase") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value === "decrease") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      } else {
        return item;
      }
    });

    return { ...state, cart: tempCart };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
