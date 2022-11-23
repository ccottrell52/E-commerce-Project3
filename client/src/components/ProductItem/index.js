import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_TO_WISHLIST } from "../../utils/mutations";
import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
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
    quantity,
    category
  } = item;

  const { cart } = state;

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    console.log(itemInCart)
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

  const addToWishList = async ()=>{
    try {
      const { data } = await addItem({
        variables: {
          name,
          description,
          price,
          image,
          category
        },
      })
    } catch ( error ){
      console.error(error);
    }
  };

  return (
    <div className="card px-1 py-1">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <div>{quantity} {pluralize("item", quantity)} in stock</div>
        <span>${price}</span>
      </div>
      <button onClick={addToWishList}>Add to Wish List</button>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductItem;
