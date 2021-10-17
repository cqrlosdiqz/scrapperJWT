const { model, Schema } = require('mongoose');

const productSchema = new Schema({
  name: String,
  price: String,
  url: String,
});
module.exports = model('Product', productSchema);
