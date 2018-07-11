import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import Preferences from './preferences';

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    index: {unique: true}
  },
  password: String,
  birthday: String,
  userPreferences: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Preferences',
  }
});


UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, callback);
};

UserSchema.pre('save', function saveHook(next) {
  const user = this;
    if (!user.isModified('password')) return next();
    return bcrypt.genSalt((saltError, salt) => {
    if (saltError) { return next(saltError); }
    return bcrypt.hash(user.password, salt, (hashError, hash) => {
        if (hashError) { return next(hashError); }
      user.password = hash;
      return next();
      });
   });
});

module.exports = mongoose.model('User', UserSchema);
