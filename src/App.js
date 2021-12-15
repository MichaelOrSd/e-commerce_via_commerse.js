import React, { useState, useEffect } from "react";
import { commerce } from "./lib/commerce";
import { Products, Navbar, Cart, Checkout } from "./components";
// Switch was changed to Routes in 2021
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// App component
function App() {
  const [products, setProducts] = useState([]);

  // Shopping cart is equal to an empty obj.
  const [cart, setCart] = useState({});

  // Checkout is equal to an empty obj.
  const fetchProducts = async () => {
    const { data } = await commerce.products.list(); // returns a promise

    setProducts(data);
  };

  // Fecthes the items form the cart.
  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve()); // may need to change
  };

  // function that adds an item to the cart.
  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);

    setCart(item.cart);
  };

  // function that removes an item from the cart.
  const handleUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });

    setCart(cart);
  };

  // function that removes an item from the cart.
  const handleRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  };

  // function that empties the cart.
  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  };

  // After we fetch the products we fetch the cart
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log(cart);

  return (
    <Router>
      <Navbar totalItems={cart.total_items} />
      <Routes>
        <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
      </Routes>
    </Router>
  );
}

export default App;
