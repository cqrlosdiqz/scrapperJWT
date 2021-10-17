const router = require('express').Router();
const webscraper = require('../utils/scrapping');
const authenticateJWT = require('../utils/authenticateJWT');
const FavoriteModel = require('../models/Favorites');

const urlScapeer =
  'https://www.worten.es/productos/consolas-juegos/playstation/consola';

router.get('/', [authenticateJWT], (req, res, next) => {
  res.render('dashboard', { user: req.user.email });
});

router.get('/scrapper', [authenticateJWT], async (req, res, next) => {
  const result = await webscraper(urlScapeer);
  return res.render('dashboard', { result: result });
});
router.get('/favorites', [authenticateJWT], async (req, res, next) => {
  try {
    FavoriteModel.find(
      { userId: req.user.payload.userId },
      (err, favorites) => {
        if (err) {
          return res.status(500).send(err);
        }
        console.log(favorites);
        return res.render('favorites', { favorites: favorites });
      }
    );
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/logout', (req, res) => {
  console.log('logout');
  //clear the cookie and redirect back to login
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
