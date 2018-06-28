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


//CREATE
export const userCreate = (req, res, next) => {
  const user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password;
  user.birthday = req.body.birthday;
  user.save((err) =>  {
    if (err)
     res.send(err);
    res.json({message: "happy times!"})
  });
}

export const preferencesCreate = (req, res, next) => {
  console.log(req.body);
  User.findById(req.params.users_id, (err, user) => {
    if(err)
     res.send(err);
     let preferences = new Preferences();
     preferences.holidays = req.body.holidays;
     preferences.pictures = req.body.pictures;
     preferences.exercise = req.body.exercise;
     preferences.eating = req.body.eating;
     preferences.wakingUp = req.body.wakingUp;
     preferences.personalHygeine = req.body.personalHygeine;
     preferences.sleep = req.body.sleep;
     preferences.none = req.body.none;
     console.log(preferences._id);
     preferences.save((error, pref) => {
       if (err)
        res.send(err);
        user.userPreferences = pref;
        user.save((error) => {
            if (err)
             res.send(err);
               res.json(user);
            });
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
} //Add preferences stuff here to attach to user?



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
export const preferencesUpdate = (req, res) => {
    User.findById(req.params.users_id, function(err, user) {
      if (err)
        res.send(err);
      user.save((err) => {
        if (err)
          res.send(err);
        res.json({
          message: "Preferences Updated!"
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
