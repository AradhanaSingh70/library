import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './home.html';
Template.home.onCreated(function () {
  this.subscribe('searchStudent');
})
Template.home.helpers({
  issue_book: function () {
    let stu = Students.findOne();
    if (stu && stu.book_details)
      return stu.book_details;
  },
})
Template.home.events({
  'submit .search-stu': function (e, template) {
    e.preventDefault();
    const target = event.target;
    const student_id = target.student_id.value;
    let currentUser = Meteor.userId()
    if (Meteor.users.find({ 'profile.student_Id': student_id }).count() > 0) {
      let currentId = Meteor.users.findOne({ 'profile.student_Id': student_id })._id
      Meteor.users.findOne({ 'profile.student_Id': student_id })
      Router.go('/student_details/' + currentId);
      target.student_id.value = '';
    }
    else {
      Bert.alert('incorrect student id', 'danger', 'growl-top-right', 'fa fa-times')
    }
  }
})