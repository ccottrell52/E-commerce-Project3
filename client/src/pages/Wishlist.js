import React from "react";
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../utils/GlobalState';

import { Link } from 'react-router-dom';

import { QUERY_WISHLIST } from "../utils/queries";

const Wishlist = () => {
    const { loading, data } = useQuery(QUERY_WISHLIST);
    const user = data?.wishlist || [];

    console.log(data?.wishlist?.wishlist);

    const [state] = useStoreContext();

    function calculateTotal() {
        let sum = 0;
        state.wishlist.forEach((item) => {
            sum += item.price;
        });
        return sum.toFixed(2);
    }

    return (
        <div className="container my-1">
            <Link to="/">← Back to Products</Link>

            <h2>Wishlist</h2>
            {loading ? (
            <div>Loading...</div>
          ) : (
            <div>Done loading</div>
          )}
            {user.wishlist?.length ? (
                <div>
                    {user.wishlist.map((item) => (
                        < div className="flex-row" >
                            <div>
                                <img
                                    src={`/images/${item.image}`}
                                    alt=""
                                />
                            </div>
                            <div>
                                <div>{item.name}, ${item.price}</div>
                                <div>
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