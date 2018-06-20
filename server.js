import express, { Router } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
// Import index action from movies controller
import { index, userCreate, userid, userupdate, userdelete } from './controllers/users';

// Initialize the router
const router = Router();

// Handle /movies.json route with index action from movies controller
router.route('/users')
  .get(index)
  .post(userCreate)


router.route('/users/:users_id')
  .get(userid)
  .put(userupdate)
  .delete(userdelete)



// Connect to MongoDB
mongoose.connect('mongodb://localhost/users');

// Initialize http server
const app = express();

// Logger that outputs all requests into the console
app.use(morgan('combined'));
// Use v1 as prefix for all API endpoints
app.use('/api', router);

const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
