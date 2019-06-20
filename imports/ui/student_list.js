import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './student_list.html';
Template.student_list.onCreated(function () {
  this.subscribe('allstudents');
})

Template.student_list.helpers({
  student_details_table: function () {
    if (Meteor.users.find({ roles: "normal-user" }).count() == 0)
      return false
    else
      return Meteor.users.find({ roles: "normal-user" });
  }
})
Template.student_list.events({
  'click .addStu'(e, template) {
    var addModal = $("#add_Song")
    addModal.find('.modal-title').text(' Add Student Record');
    addModal.modal('show');
  },
  'submit .new-student'(e, template) {
    event.preventDefault();
    const target = event.target;
    const student_Id = target.student_Id.value;
    const student_name = target.student_name.value;
    const email = target.email.value;
    const password = target.password.value;
    const address = target.address.value;
    const phone = target.phone.value;
    Meteor.call('userlist.insert', student_Id, student_name, email, password, address, phone, function (error) {
      if (error) {
        Bert.alert(error.reason, 'danger', 'growl-top-right', 'fa fa-times')
      }
      else {
        Bert.alert('sucessfully submitted', 'success', 'growl-top-right', 'fa fa-check');
        target.student_Id.value = '';
        target.student_name.value = '';
        target.address.value = '';
        target.email.value = '';
        target.password.value = '';
        target.phone.value = '';
        $('.bd-example-modal-lg').modal('hide');
        return false;
      }
    })
  },
  'click .stu_delete'(e) {
    e.preventDefault();
    var stId = this._id;
    var confirm = window.confirm("Delete this student record?");
    if (confirm) {
      Meteor.call('students.remove', stId);
    }
  },
})