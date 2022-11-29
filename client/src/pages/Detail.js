import React, { useEffect, useState } from 'react';
import { useMutation } from "@apollo/client";
import { ADD_TO_WISHLIST } from "../utils/mutations";
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { pluralize } from "../utils/helpers"


import Cart from '../components/Cart';
import { useStoreContext } from '../utils/GlobalState';
import {
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';

function Detail() {
  const [state, dispatch] = useStoreContext();
  const [addItem] = useMutation(ADD_TO_WISHLIST);

  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const addToWishList = async () => {
    try {
      const {
        name,
        description,
        price,
        image,
      } = currentProduct;
      const category = currentProduct.category._id;
      const { data } = await addItem({
        variables: {
          name,
          description,
          price,
          image,
          category
        },
      })
    } catch (error) {
      console.error(error);
    }
  };
  console.log(currentProduct)

  return (
    <>
      <Link to="/">← Back to Products</Link>
      {currentProduct && cart ? (
        <div className="product">

          <picture>
            <img
              src={`/images/${currentProduct.image}`}
              alt={currentProduct.name}
            />
          </picture>

          <div className="product__content">
            <h2 className='product__title'>{currentProduct.name}</h2>

            <p className='product__description'>{currentProduct.description}</p>

            <div className="flex-group">
              <p className="product__price"><span className="visually-hidden">Current price:</span>${currentProduct.price * .8 + ".99"}</p>
              <p className="product__original-price"><span className="visually-hidden">Original price:</span><s>${currentProduct.price}.99</s></p>
            </div>

            <button className='button' onClick={addToCart}>Add to Cart</button>
            <br></br>
            <button className="button" onClick={addToWishList}>Add to Wish List</button>
          </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
