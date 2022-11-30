import React from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data.user;
  }

  return (
    <>
      <div className="container my-1">
        <Link to="/" className="buttton">
          <button className="button"> ← Back to Products</button>
        </Link>

        {user ? (
          <>
            <h2>
              Order History for {user.firstName} {user.lastName}
            </h2>
            {user.orders.map((order) => (
              <div key={order._id}>
                <h3>
                  {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
                </h3>
                <div>
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <div key={index} >
                      <Link to={`/products/${_id}`}>
                        <img alt={name} src={`/images/${image}`} />
                      </Link>
                        <p className='product__title'>{name}</p>
                        <p className="product__price"><span className="visually-hidden">Current price:</span>${price * .8 + ".99"}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </>
  );
}

export default OrderHistory;
