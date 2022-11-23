const db = require('./connection');
const { User, Product, Category } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();
  
  const categories = await Category.insertMany([
    { name: 'T-Shirt' },
    { name: 'Sweat Shirt' },
    { name: 'Socks' },
    { name: 'Shoes' },
    {name: 'Miscelaneous'},
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'Jonathan Bejarano T-Shirt',
      description:
        'T-Shirt with a picture of Jonathan Bejaranos face on it.',
      image: 'Jonathan.png',
      category: categories[0]._id,
      price: 20.00,
      quantity: 5
    },
    {
      name: 'Eric Sayer T-shirt',
      description:
        'T-Shirt with a picture of Eric Sayers face on it.',
      image: '',
      category: categories[0]._id,
      price: 20.00,
      quantity: 5
    },
    {
      name: 'Sarah Rohr T-Shirt',
      category: categories[0]._id,
      description:
        'T-Shirt with a picture of Sarah Rohrs face on it.',
      image: 'Sarah.png',
      price: 20.00,
      quantity: 5
    },
    {
      name: 'Jacob Dolph T-Shirt',
      category: categories[0]._id,
      description:
        'T-Shirt with a picture of Jacob Dolphs face on it',
      image: 'Jacob.png',
      price: 20.00,
      quantity: 5
    },
    {
      name: 'Taylor T-Shirt',
      category: categories[0]._id,
      description:
        'T-Shirt with a picture of Taylors face on it',
      image: '',
      price: 20.00,
      quantity: 5
    },
    {
      name: 'Sean King T-Shirt',
      category: categories[0]._id,
      description:
        'T-Shirt with Sean Kings face on it',
      image: 'Sean.png',
      price: 20.00,
      quantity: 5
    },
    {
      name: 'I Heart Coding Hoodie',
      category: categories[1]._id,
      description:
        'Black Hoodie With an I followed by a heart emoji followed by the word coding',
      image: '',
      price: 20.00,
      quantity: 5
    },
    {
      name: 'I am Your Coder Hoodie',
      category: categories[1]._id,
      description:
        'I am your Coder Vader style hoodie',
      image: '',
      price: 40.00,
      quantity: 5
    },
    {
      name: 'Eric Sayers Backround Dog',
      category: categories[4]._id,
      description: 'The dog in the backround of Eric Sayers zoom.',
      image: '',
      price: 80.00,
      quantity: 1
    },
    {
      name: 'Autographed Eric Sayer Shoes',
      category: categories[3]._id,
      description:
        'Autographed pair of Eric Sayers least favorite game worn shoes',
      image: '',
      price: 20.00,
      quantity: 1
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'Elijah',
    lastName: 'Holt',
    email: 'eholt@testmail.com',
    password: 'password12345'
  });

  console.log('users seeded');

  process.exit();
});
