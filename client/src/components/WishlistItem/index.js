import React from 'react';
// import { useStoreContext } from "../../utils/GlobalState";

const WishlistItem = ({ item })=>{

//   const [, dispatch] = useStoreContext();

// REMOVE_FROM_WISHLIST

// UPDATE_WISHLIST_QUANTITY

// 



  return (
    <div className="flex-row">
      <div>
        <img
          src={`/images/${item.image}`}
          alt=""
        />
      </div>
      <div>
        <div>{item.name}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <input
            type="number"
            placeholder="1"
            // onChange={onChange}
          />
          <span
            role="img"
            aria-label="trash"
            // onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </div>
    </div>
  );
}

export default WishlistItem;
