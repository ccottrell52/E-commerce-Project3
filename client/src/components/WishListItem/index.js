import React from "react";
import { useMutation } from '@apollo/client';
import { REMOVE_FROM_WISHLIST } from "../../utils/mutations";
import { Link } from "react-router-dom";

import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const WishListItem = (item) => {
    const [state, dispatch] = useStoreContext();
    const [removeItem] = useMutation(REMOVE_FROM_WISHLIST);

    const {
        _id,
        name,
        description,
        price,
        image,
    } = item

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

    const removeFromWistList = async () => {
        try {
            const { data } = await removeItem({
                variables: {
                    name
                },
            })
        } catch (errors) {
            console.error(errors)
        }
    };

    return (
        <div className="card px-1 py-1">
        {console.log("is it there?")}
            <Link to={`/products/${_id}`}>
                <img
                    alt={name}
                    src={`/images/${image}`}
                />
                <p>{name}</p>
            </Link>
            <div>
                <p>{description}</p>
                <span>${price}</span>
            </div>
            <button onClick={addToCart}>Add to Cart</button>
            <button onClick={removeFromWistList}>Remove From Wishlist</button>
        </div>
            )
}

export default WishListItem;