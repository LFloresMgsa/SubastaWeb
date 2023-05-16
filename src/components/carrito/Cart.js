import React, { useState } from "react";

const Cart = ( {products} ) => {
  const [cartItems, setCartItems] = useState(products);

  const handleAddToCart = (product) => {
    const index = cartItems.findIndex(
      (item) => item.code === product.code && item.name === product.name && item.price === product.price
    );
    if (index === -1) {
      setCartItems([...cartItems, product]);
    } else {
      const newCartItems = [...cartItems];
      newCartItems[index].quantity += product.quantity;
      setCartItems(newCartItems);
    }
  };

  const handleRemoveFromCart = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleIncreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);
  };

  const handleDecreaseQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity -= 1;
    if (newCartItems[index].quantity === 0) {
      newCartItems.splice(index, 1);
    }
    setCartItems(newCartItems);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <h2>Carrito de compras</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <span>{item.code}</span>
            <span>{item.name}</span>
            <span>{item.price} PEN</span>
            <span>
              <button onClick={() => handleDecreaseQuantity(index)}>-</button>
              {item.quantity}
              <button onClick={() => handleIncreaseQuantity(index)}>+</button>
            </span>
            <span>{item.price * item.quantity} PEN</span>
            <button onClick={() => handleRemoveFromCart(index)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {cartItems.length > 0 ? (
        <>
          <p>Total: {getTotalPrice()} PEN</p>
          <button onClick={() => handleClearCart()}>Vaciar carrito</button>
        </>
      ) : (
        <p>No hay productos en el carrito</p>
      )}
    </div>
  );
};

export default Cart;
