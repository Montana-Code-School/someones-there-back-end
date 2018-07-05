import express, { Router } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import
{ index,
  prefIndex,
  userCreate,
  userId,
  userUpdate,
  userDelete,
  preferencesCreate,
  prefId,
  preferencesUpdate} from './controllers/users';
const db = process.env.MONGODB_URI || 'mongodb://localhost/users';
const port = process.env.PORT || 3000;
// Initialize the router
const router = Router();

const app = express();
mongoose.connect(db);

// Logger that outputs all requests into the console
app.use(morgan('combined'));

// Pass the authenication middleware
// const authCheckMiddleware = require('./server/middleware/auth_check');
// app.use('/api', authCheckMiddleware);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle /movies.json route with index action from movies controller
router.route('/users')
  .get(index)
  .post(userCreate)

router.route('/users/:users_id')
  .get(userId)
  .put(userUpdate)
  .delete(userDelete)

router.route('/preferences/:pref_id')
  .post(preferencesUpdate)
  .get(prefId)



// Initialize http server
app.use('/api', router);

const server = app.listen(port, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
