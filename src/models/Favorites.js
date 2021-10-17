const { model, Schema, ObjectId } = require('mongoose');

const favoriteSchema = new Schema({
  product: Object,
  userId: ObjectId,
});
module.exports = model('Favorite', favoriteSchema);
