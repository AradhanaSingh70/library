import { Template } from "meteor/templating";
import { Meteor } from 'meteor/meteor';
import './login.html';
Template.login.events({
  'submit form': function (event) {
    event.preventDefault();
    const target = event.target;
    var email = event.target.email.value;
    var password = event.target.password.value;
    Meteor.loginWithPassword(email, password, function (error, result) {
      if (error) {
        Bert.alert(error.reason, 'danger', 'growl-top-right', 'fa fa-times');
      }
      else if (email === 'admin@gmail.com') {
        Router.go('/add_student');
        Bert.alert('sucessfully login', 'success', 'growl-top-right', 'fa fa-check');
        target.email.value = '';
        target.password.value = '';
        $('#exampleModal').modal('hide');
        return false;
      }
      else {
        Router.go('/');
        Bert.alert('sucessfully login', 'success', 'growl-top-right', 'fa fa-check');
        target.email.value = '';
        target.password.value = '';
        $('#exampleModal').modal('hide');
        return false;

      }
    });

  },

})