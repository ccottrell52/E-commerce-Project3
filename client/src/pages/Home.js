import React from "react";
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import Cart from "../components/Cart";

const Home = () => {
  return (
    
    <div className="container">
      <div className="d-flex justify-content-end my-2">
      <Cart />
      </div>
      <div className="d-flex text-center justify-content-center my-2">
      <CategoryMenu />
      </div>
      
      <div className="my-2">
      <ProductList />
      </div>
      
    </div>
  );
};

export default Home;
