const mongoose = require('mongoose');

const { Schema } = mongoose;

const wishlistSchema = new Schema({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
