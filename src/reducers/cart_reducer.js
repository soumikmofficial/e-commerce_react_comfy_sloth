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
    } else {
      console.log(product);

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
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
