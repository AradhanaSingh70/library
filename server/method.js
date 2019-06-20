import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles'
Meteor.methods({
  /* sign up  */
  'userlist.insert': function (student_Id, student_name, email, password, address, phone, ) {
    var users = [
      { roles: [] }
    ];
    if (Meteor.users.find({ 'profile.student_Id': student_Id }).count() != 0)
      throw new Meteor.Error(500, 'Student id already exist');
    else {
      _.each(users, function (user) {
        var id;
        id = Accounts.createUser({
          email: email,
          password: password,
          profile: {
            student_Id: student_Id,
            student_name: student_name,
            address: address,
            phone: phone,
          },
          createdAt: new Date(),
        });
        Roles.addUsersToRoles(id, 'normal-user')
      });
    }
  },
  'students.insert': function (student_Id, student_name, email, password, address, phone) {
    var currentUser = Meteor.userId();
    if (!currentUser) {
      throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    }
    else if (Students.find({ student_Id: student_Id }).count() != 0)
      throw new Meteor.Error(500, 'Student id already exist');
    else if (Students.find({ email: email }).count() != 0)
      throw new Meteor.Error(500, 'this email already exist');
    else {
      Students.insert({
        student_Id, student_name, email, password, address, phone,
        createdAt: new Date(),
        owner: currentUser,
      })
    }
  },
  'students.update': function (student_Id, student_name, email, address, phone, currentList) {
    var currentUser = Meteor.userId();
    if (!currentUser) {
      throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    }
    Meteor.users.update({ _id: currentList }, { $set: { 'emails.0.address': email, profile: { student_Id, student_name, address, phone } } });
  },
  'students.remove'(stId) {
    var currentUser = Meteor.userId();
    if (!currentUser) {
      throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    }
    Meteor.users.remove({ _id: stId });
  },
  'book.update': function (book_Id, book_name, author_name, issue_date, expiry_date, currentList) {
    var currentUser = Meteor.userId();
    if (!currentUser) {
      throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    }
    else if (Meteor.users.find({ 'book_details.book_Id': book_Id }).count() == 0) {
      let book = {
        book_Id, book_name, author_name, issue_date, expiry_date,
      }
      Meteor.users.update({ '_id': currentList }, { $push: { 'book_details': book } })
    }
    else {
      throw new Meteor.Error(500, 'book id already exist');
    }
  },
  'book.remove'(bookId, currentList) {
    var currentUser = Meteor.userId();
    if (!currentUser) {
      throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    }
    Meteor.users.update({ _id: currentList }, { $pull: { book_details: { book_Id: bookId } } });
  },
})