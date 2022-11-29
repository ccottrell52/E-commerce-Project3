import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_TO_WISHLIST } from "../../utils/mutations";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();
  const [addItem] = useMutation(ADD_TO_WISHLIST);
  const {
    _id,
    name,
    description,
    price,
    image,
    category
  } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  };

  const addToWishList = async () => {
    try {
      await addItem({
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

  return (
    <article className="product">

      <Link className="noUnderline" to={`/products/${_id}`}>
        <picture>
          <img alt={name} src={`/images/${image}`} />
        </picture>
      </Link>

      <div className="product__content">
        <h2 className="product__title">{name}</h2>
        <p className='product__description'>{description}</p>

        <div className="flex-group">
          <p className="product__price"><span className="visually-hidden">Current price:</span>${price * .8 + ".99"}</p>
          <p className="product__original-price"><span className="visually-hidden">Original price:</span><s>${price}.99</s></p>
        </div>
        <button className="button" onClick={addToWishList}>Add to Wish List</button>
        <button className="button" onClick={addToCart}>Add to Cart</button>
      </div>
    </article>
  );
}

export default ProductItem;
