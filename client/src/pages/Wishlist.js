import React from "react";
import { Link } from 'react-router-dom';

import WishlistList from "../components/WishlistList";

const Wishlist = () => {
    return (
        <>
            <div className="container my-1">
                <Link to="/">← Back to Products</Link>
           
                <div>
                    <WishlistList />
                </div>
            </div>
        </>
    )
}

export default Wishlist;