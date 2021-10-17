const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const keygen = require('keygenerator');

const userSchema = new Schema({
  email: String,
  password: String,
  secret_key: {
    type: String,
    default: keygen._(),
    inmutable: true
  },
},{
  timestamps: true,
  // Borrar la contraseña y el googleId al convertir a JSON para que no lleguen a front
  toJSON: {
    transform: (doc, ret) => {
      delete ret.password
      delete ret.googleId
    }
  }
});

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = model('User', userSchema);
