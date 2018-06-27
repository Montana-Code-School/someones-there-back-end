import express, { Router } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
// Import index action from movies controller
import { index, userCreate, userid, userupdate, userdelete } from './controllers/users';

// Initialize the router
const router = Router();

const app = express();
mongoose.connect('mongodb://localhost/users');

// Logger that outputs all requests into the console
app.use(morgan('combined'));

// Pass the authenication middleware
// const authCheckMiddleware = require('./server/middleware/auth_check');
// app.use('/api', authCheckMiddleware);

// Use v1 as prefix for all API endpoints

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle /movies.json route with index action from movies controller
router.route('/users')
  .get(index)
  .post(userCreate)

router.route('/users/:users_id')
  .get(userid)
  .put(userupdate)
  .delete(userdelete)

// Initialize http server
app.use('/api', router);

const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
