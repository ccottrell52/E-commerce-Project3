import React from "react";
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_WISHLIST } from "../utils/queries";
import WishListItem from '../components/WishListItem/index'

const Wishlist = () => {
    const { data } = useQuery(QUERY_WISHLIST);
    const user = data?.wishlist?.wishlist || [];

    return (
        <div className="container my-1">
            <Link to="/" className="buttton">
                <button className="button"> ← Back to Products</button>
            </Link>

            <h2>Wishlist</h2>
            {user.length ? (
                <>
                    {user.map((product) =>
                        <WishListItem
                            key={product._id}
                            _id={product._id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            description={product.description}
                        />
                    )}
                </>
            ) : (
                <h3>You haven't added anything to wishlist yet!</h3>
            )}
        </div>
    )
}

export default Wishlist;