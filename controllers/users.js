import User from '../server/models/user';
import Preferences from '../server/models/preferences';

//INDEX
export const index = (req, res, next) => {
  // Find all movies and return json response
  User.find().lean().exec((err, users) => res.json(
    // Iterate through each movie
    { users: users.map(user => ({
      ...user,

    }))}
  ));
};

export const prefIndex = (req, res, next) => {
  // Find all movies and return json response
  Preferences.find().lean().exec((err, preferences) => res.json(
    // Iterate through each movie
    { preferences: preferences.map(preference => ({
      ...preference,

    }))}
  ));
};

//UPDATE
export const preferencesUpdate = (req, res, next) => {
  Preferences.findByIdAndUpdate(req.params.pref_id, {$set: req.body}, {upsert: true},(err, preferences) => {
    if (err)
      res.send(err);
    res.json({
      message: 'preferences saved',
      preferences: preferences
    })
  })
}

//CREATE
export const userCreate = (req, res) => {
  const preferences = new Preferences();
  const user = new User();
  console.log("req.body", req.body);
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.birthday = req.body.birthday;
  user.userPreferences = preferences;
  console.log("user", user);
  user.save((err, user) =>  {
    if (err)
     res.send(err);
    res.json({
      message: "happy times!",
      user: user
    })
  });
}

// GET
export const userId = (req, res) => {
  User.findById(req.params.users_id, (err, user) => {
    if(err)
     res.send(err);
    res.json(user);
  })
}

export const prefId = (req, res) => {
  Preferences.findById(req.params.pref_id, (err, pref) => {
    if(err)
     res.send(err);
    res.json(pref);
  })
}



// UPDATE
export const userUpdate = (req, res) => {
    User.findById(req.params.users_id, function(err, user) {
      if (err)
        res.send(err);

        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.birthday = req.body.birthday;

      user.save((err) => {
        if (err)
          res.send(err);
        res.json({
          message: "User Updated!"
        })
      })
    })
  }

// DELETE
  export const userDelete = (req, res) => {
    User.remove({
      _id : req.params.users_id
    }, function(err, user) {
        if (err)
          res.send(err);
        res.json({
            message: "User Obliterated!"
          })
        })
      }
