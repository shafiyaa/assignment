import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './Pages/Home';
import Product from './Pages/ProductPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/productpage/:barcode" element={<Product />}></Route>
      </Routes>
    </>
  );
}

export default App;
