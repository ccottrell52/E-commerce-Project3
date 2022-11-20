import { useStoreContext } from '../../utils/GlobalState';
import React from 'react';
import WishlistItem from '../WishlistItem';

const Wishlist = () => {

  const [state] = useStoreContext();


    function calculateTotal() {
        let sum = 0;
        state.wishlist.forEach((item) => {
          sum += item.price;
        });
        return sum.toFixed(2);
      }

      console.log(state)
    return (
        <div className="">
        
        <h2>Wishlist</h2>
        {state.wishlist.length ? (
          <div>
            {state.wishlist.map((item) => (
              <WishlistItem key={item._id} item={item} />
            ))}
  
            <div className="flex-row space-between">
              <strong>Total: ${calculateTotal()}</strong>
            </div>
          </div>
        ) : (
          <h3>
            <span role="img" aria-label="shocked">
              😱
            </span>
            You haven't added anything to your wishlist yet!
          </h3>
        )}
      </div>
    )

}

export default Wishlist;