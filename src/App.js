import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";

import {
  About,
  Cart,
  Checkout,
  Error,
  Products,
  SingleProduct,
  Home,
} from "./pages";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/products" exact>
          <Products />
        </Route>
        <Route path="/products/:id" exact>
          <SingleProduct />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path="/checkout" exact>
          <Checkout />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
