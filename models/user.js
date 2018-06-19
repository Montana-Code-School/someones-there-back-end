import Mongoose from 'mongoose';

var userSchema = new User ({
  name: String,
  email: {
    type: String,
    index: {unique: true}
  },
  password: String
});

export default mongoose.model('user', userSchema);
// db.someones-there.insert({name: String, email: {type: String, index: {unique: true}}, password: String)})
