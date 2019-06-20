import { Meteor } from 'meteor/meteor';
import './method.js';
import './publish.js';
Meteor.startup(() => {
  // code to run on server at startup
  let usererole = Meteor.users.find({}).count();
  if (usererole == 0) {
    var users = [
      { email: "admin@gmail.com", first_name: "admin", last_name: "user", roles: [] }
    ];
    _.each(users, function (user) {
      var id = Accounts.createUser({
        email: user.email,
        password: "admin",
        profile: {
          first_name: user.first_name,
          last_name: user.last_name,
        },
        createdAt: new Date(),
      });
      Roles.addUsersToRoles(id, 'admin')
    });
  }

});
