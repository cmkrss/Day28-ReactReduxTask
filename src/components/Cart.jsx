// src/components/Cart.jsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeFromCart } from '../store/store';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const products = useSelector((state) => state.products.products);

  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cartItems.reduce(
    (total, item) => total + (products.find((prod) => prod.id === item.id)?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="Cart">
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            const product = products.find((prod) => prod.id === item.id);
            return (
              <tr key={item.id}>
                <td>{product?.title}</td>
                <td>${product?.price}</td>
                <td>{item.quantity}</td>
                <td>${(product?.price || 0) * item.quantity}</td>
                <td>
                  <button onClick={() => handleIncrease(item.id)}>+</button>
                  <button onClick={() => handleDecrease(item.id)}>-</button>
                  <button onClick={() => handleRemove(item.id)} style={{ backgroundColor: 'red' }}>Remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="total">
        <h2>Total Quantity: {totalQuantity}</h2>
        <h2>Total Amount: ${totalAmount.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;
