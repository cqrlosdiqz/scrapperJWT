const { model, Schema, ObjectId } = require('mongoose');

const favoriteSchema = new Schema({
  url: String,
  name: String,
  price: String,
  userId: ObjectId,
});
module.exports = model('Favorite', favoriteSchema);
