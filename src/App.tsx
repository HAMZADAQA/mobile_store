import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Detail from "./pages/Detail/Detail";
import Cart from "./pages/Cart/Cart";
import Navbar from "./components/Navbar/Navbar";
import { StoreProvider } from "./context/CartContext";

const App: React.FC = () => {
  return (
    <StoreProvider>
      <Router>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </Router>
    </StoreProvider>
  );
};

export default App;
