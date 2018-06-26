import User from '../server/models/user';


export const index = (req, res, next) => {
  // Find all movies and return json response
  User.find().lean().exec((err, users) => res.json(
    // Iterate through each movie
    { users: users.map(user => ({
      ...user,

    }))}
  ));
};


export const userCreate = (req, res, next) => {
  console.log(req.body);
  console.log("HELLLO");
  const user = new User();
  user.name = "";
  user.email = "";
  user.password = "";
  // user.save((err) =>  {
  //   if (err)
  //    res.send(err);
    res.json({message: "happy times!"})
  // });
};


// this is our id get
export const userid = (req, res) => {
  User.findById(req.params.users_id, (err, user) => {
    if(err)
     res.send(err);
    res.json(user);
  })
}

// this is our id put

export const userupdate = (req, res) => {
    User.findById(req.params.users_id, function(err, user) {
      if (err)
        res.send(err);

      user.name ="Emmie"
      user.email ="Emmie@email.com"
      user.password ="87654321"

      user.save((err) => {
        if (err)
          res.send(err);
        res.json({
          message: "User Updated!"
        })
      })
    })
  }

  export const userdelete = (req, res) => {
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
