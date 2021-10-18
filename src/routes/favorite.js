const router = require('express').Router();
const FavoriteModel = require('../models/Favorites');
const authenticateJWT = require('../utils/authenticateJWT');

router.post('/', [authenticateJWT], async (req, res) => {
  const newFavorite = new FavoriteModel({
    ...req.body,
    userId: req.user.payload.userId,
  });

  newFavorite.save((err, favorite) => {
    if (err) {
      res.status(500).json({
        message: 'Error saving favorite',
        error: err,
      });
    } else {
      res.status(201).json(favorite);
    }
  });
});

module.exports = router;
