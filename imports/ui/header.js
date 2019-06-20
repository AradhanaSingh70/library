import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './header.html';
Template.header.helpers({
  userEmail: function () {
    return Meteor.user().emails[0].address
  },
})
Template.header.events({
  'click .logout': function (event) {
    event.preventDefault();
    Meteor.logout();
    Router.go('/');
    Bert.alert('sucessfully logout', 'success', 'growl-top-right', 'fa fa-check');
  },
})