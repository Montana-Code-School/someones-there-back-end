import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const PreferencesSchema = new Schema({
  birthday: String,
  holidays: Boolean,
  pictures: String,
  exercise: Boolean,
  eating: Boolean,
  wakingUp: Boolean,
  personalHygiene: Boolean,
  sleep: Boolean,
  none: Boolean
});


module.exports = mongoose.model('Preferences', PreferencesSchema);
