import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_TO_WISHLIST = gql `
  mutation addToWishList ($name: String!, $description: String, $price: Float!, $image: String, $category: String!) {
    addToWishList(name: $name, description: $description, price: $price, image: $image category: $category) {
      _id
      firstName
      lastName
      email
      wishlist {
        name
        description
        price
        image
        category {
          _id
        }
      }
    }
  }
`;

export const REMOVE_FROM_WISHLIST = gql `
  mutation removeFromWishList ($name: String!){
    removeFromWishList(name: $name){
      _id
      firstName
      lastName
      email
      wishlist {
        name
      }
    }
  }
`;