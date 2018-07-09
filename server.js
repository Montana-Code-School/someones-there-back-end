import express, { Router } from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import
{ index,
  prefIndex,
  userCreate,
  userId,
  userEmail,
  userUpdate,
  userDelete,
  preferencesCreate,
  prefId,
  preferencesUpdate } from './controllers/users';

const db = process.env.MONGODB_URI || 'mongodb://localhost/users';
const port = process.env.PORT || 3000;
// Initialize the router
const router = Router();

const app = express();
mongoose.connect(db);

// Logger that outputs all requests into the console
app.use(morgan('combined'));

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

router.route('/userFindByEmail/:email')
  .get(userEmail)

// Initialize http server
app.use('/api', router);

const server = app.listen(port, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
