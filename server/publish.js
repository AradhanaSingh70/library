import { Meteor } from 'meteor/meteor';
Meteor.publish('students_by_id', function (currentList) {
  return Meteor.users.find({ '_id': currentList }, { roles: "normal-user" });
});
Meteor.publish('allstudents', function () {
  return Meteor.users.find({ roles: "normal-user" }, { fields: { profile: 1, roles: 1, book_details: 1 } });
});
Meteor.publish('searchStudent', function () {
  if (Meteor.userId() === Meteor.users.findOne({ roles: "admin" })._id) {
    return Meteor.users.find({ roles: "normal-user" }, { fields: { profile: 1, roles: 1, book_details: 1 } });
  }
});