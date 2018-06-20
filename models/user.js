import mongoose, { Schema } from 'mongoose';

var userSchema = new Schema({
  name: String,
  email: {
    type: String,
    index: {unique: true}
  },
  password: String
});

export default mongoose.model('user', userSchema);
// db.someones-there.insert({name: String, email: {type: String, index: {unique: true}}, password: String)})
