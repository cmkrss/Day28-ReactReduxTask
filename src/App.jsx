// src/App.jsx
import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  return (
    <div className="App">
      <Cart />
      <ProductList />
    </div>
  );
}

export default App;
