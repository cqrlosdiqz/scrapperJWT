const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('index');
});
router.get('/login', (req, res) => {
  res.render('login');
});
router.get('/register', (req, res) => {
  res.render('register');
});


router.use('/favorite', require('./favorite'));
router.use('/auth', require('./auth'));
router.use('/dashboard', require('./dashboard'));

module.exports = router;
