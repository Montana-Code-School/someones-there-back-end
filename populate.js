import mongoose from 'mongoose';
import User from './models/user.js'


//Hard data. Login info of birthday,name, password,
//email, holidays, search queries, preferences and
// areas in life you want to improve on.
const users =  [
  {
  name: 'Fred',
  email: 'Fred@email.com',
  password: 12345678
  },
  {
  name: 'fish',
  email: 'fish@email.com',
  password: 12345678
  },
  {
  name: 'ted',
  email: 'ted@email.com',
  password: 12345678
  },
  {
  name: 'cat',
  email: 'cat@email.com',
  password: 12345678
  },
  {
  name: 'dog',
  email: 'dog@email.com',
  password: 12345678
  },
  {
  name: 'goat',
  email: 'goat@email.com',
  password: 12345678
  },

];


mongoose.connect('mongodb://localhost/users');


users.map(data => {

  const user = new User(data);
  // and save it into the database
  user.save();
});
