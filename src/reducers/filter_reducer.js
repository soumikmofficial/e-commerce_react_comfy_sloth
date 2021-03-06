import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  const { sort, filtered_products } = state;
  switch (action.type) {
    // load all the products
    case LOAD_PRODUCTS:
      const prices = action.payload.map((p) => p.price);
      const maxPrice = Math.max(...prices);

      return {
        ...state,
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
        all_products: [...action.payload],
        filtered_products: [...action.payload],
      };

    // set the grid view
    case SET_GRIDVIEW:
      return { ...state, grid_view: true };

    // set the list view
    case SET_LISTVIEW:
      return { ...state, grid_view: false };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS:
      let tempProducts = [...filtered_products];
      // lowest first
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return { ...state, filtered_products: tempProducts };

    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };

    // filter according to choice

    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, company, category, color, price, shipping } = state.filters;
      let filtered = [...all_products];

      // search
      if (text) {
        filtered = filtered.filter((product) => product.name.startsWith(text));
      }
      //  Category
      if (category !== "all") {
        filtered = filtered.filter((product) => product.category === category);
      }

      // company
      if (company !== "all") {
        filtered = filtered.filter((product) => product.company === company);
      }

      // color
      if (color !== "all") {
        filtered = filtered.filter((product) => product.colors.includes(color));
      }

      //price
      filtered = filtered.filter((product) => product.price <= price);

      // shipping
      if (shipping) {
        filtered = filtered.filter((product) => product.shipping === true);
      }
      return { ...state, filtered_products: filtered };

    // clear all filters
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
