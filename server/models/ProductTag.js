const mongoose = require('mongoose');

const { Schema } = mongoose;

const productTagSchema = new Schema({
   tagName: {
    type: String,
    required: false,
   }
  });
  

const ProductTag = mongoose.model('ProductTag', productTagSchema);

module.exports = ProductTag;