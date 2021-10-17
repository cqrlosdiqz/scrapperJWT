const mongoose = require('mongoose');

const URI = process.env.MONGO_URI;
mongoose
  .connect(URI)
  .then(() => console.log('DB is connected'))
  .catch((err) => console.log(err));
