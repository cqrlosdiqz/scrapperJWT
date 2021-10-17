const router = require('express').Router();
const UserModel = require('../models/User');
const jwt = require('jsonwebtoken');


router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
 
    const compare = await user.comparePassword(password);

    if (compare) {
      const token = jwt.sign({ userId: user._id }, user.secret_key, {
        expiresIn: '24h',
      });

      res.cookie('token', token);
      res.render('dashboard');
    } else {
      res.status(401).json({
        success: true,
        message: 'Password is Incorrect !',
      });
    }
  } catch (error) {
    const errorMessage = 'Error to login user';
    console.error(`${errorMessage}: `, error.message);
    next(new Error(errorMessage));
  }
});

router.post('/resgiter', (req, res) => {
  const { email, password } = req.body;
  try {
    if (email === '' || password === '') {
      res.status(400).send({ message: 'Please fill all the fields' });
    } else {
      UserModel.findOne({ email }, (err, user) => {
        if (err) res.status(500).send({ message: 'Error on the server' });
        else if (user)
          res.status(400).render('register', { msg: 'Email already exists' });
        else {
          const newUser = new UserModel({ email, password });
          newUser.save((err) => {
            if (err) res.status(500).send({ message: 'Error on the server' });
            else
              res
                .status(201)
                .render('login', { msg: 'User created successfully' });
          });
        }
      });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error on the server' });
  }
});



module.exports = router;
