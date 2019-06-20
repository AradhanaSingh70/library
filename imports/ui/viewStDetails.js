import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './viewStDetails.html';
Template.viewStDetails.onCreated(function () {
  var currentList = Router.current().params._id;
  this.subscribe('students_by_id', currentList);
})
Template.viewStDetails.rendered = function () {
  Meteor.setTimeout(() => {
    $('#issue_date').datepicker({
      format: 'dd/mm/yyyy',
      autoclose: true,
      minDate: 0,
      startDate: new Date(),
    }).on('changeDate', function () {
      var temp = $(this).datepicker('getDate');
      var d = new Date(temp);
      d.setDate(d.getDate() + 15);
      var dateObj = new Date(d);
      var momentObj = moment(dateObj);
      var momentString = momentObj.format('DD/MM/YYYY');
      $('#expiry_date').val(momentString)
    });
  }, 400)
}
Template.viewStDetails.helpers({
  issue_book: function (d) {
    let stu = Meteor.users.findOne({ roles: "normal-user" });
    if (stu && stu.book_details)
      return stu.book_details;
  },
  calfine: function () {
    let expdate = this.expiry_date
    let dateParts = expdate.split("/");
    let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    let today = new Date();
    let days = (today - dateObject) / (1000 * 60 * 60 * 24);
    let duedays = Math.trunc(days)
    let fine = duedays * 2;
    if (fine > 0)
      return fine
  },
  student_details_table: function () {
    return Meteor.users.findOne({ roles: "normal-user" });
  },
  userEmail: function (e) {
    if (this.emails !== undefined)
      return this.emails[0].address;
  },
})
Template.viewStDetails.events({
  'click .addStuBook'(e, template) {
    var addBookModal = $("#add_book")
    addBookModal.find('.modal-title').text('Add Book');
    addBookModal.modal('show');
  },
  'click .addStu'(e, template) {
    var addModal = $("#add_Song")
    addModal.find('.modal-title').text(' Add Student Record');
    addModal.modal('show');
  },
  'click .book_delete'(e) {
    e.preventDefault();
    let bookId = this.book_Id;
    var currentList = Router.current().params.student_Id;
    var confirm = window.confirm("Delete this book?");
    if (confirm) {
      Meteor.call('book.remove', bookId, currentList);
    }
  },
  'submit .add-book': function (e, template) {
    e.preventDefault();
    const target = event.target;
    const book_Id = target.book_Id.value;
    const book_name = target.book_name.value;
    const author_name = target.author_name.value;
    const issue_date = target.issue_date.value;
    const expiry_date = target.expiry_date.value;
    var currentList = Router.current().params._id;
    Meteor.call('book.update', book_Id, book_name, author_name, issue_date, expiry_date, currentList, function (error) {
      if (error) {
        Bert.alert(error.reason, 'danger', 'growl-top-right', 'fa fa-times');
      } else {
        Bert.alert('sucessfully added', 'success', 'growl-top-right', 'fa fa-check');
        target.book_Id.value = '';
        target.book_name.value = '';
        target.author_name.value = '';
        target.issue_date.value = '';
        target.expiry_date.value = '';
        $('.bd-example-modal-lg').modal('hide');
        return false;
      }
    })
  },
  'click .returnBook': function (e, template) {
    e.preventDefault();
    let bookId = this.book_Id;
    var currentList = Router.current().params._id;
    var confirm = window.confirm("Return this book?");
    if (confirm) {
      Meteor.call('book.remove', bookId, currentList);
      Bert.alert('sucessfully returned', 'success', 'growl-top-right', 'fa fa-check');
    }
  },
  'click .editStu': function (e, template) {
    $(".update").show();
    $(".new-student input[type=text]").removeAttr("disabled")
  },
  'submit .new-student': function (e, template) {
    e.preventDefault();
    const target = event.target;
    const student_Id = target.student_Id.value;
    const student_name = target.student_name.value;
    const address = target.address.value;
    const email = target.email.value;
    const phone = target.phone.value;
    var currentList = Router.current().params._id;
    Meteor.call('students.update', student_Id, student_name, email, address, phone, currentList, function (error) {
      if (error) {
        Bert.alert(error.reason, 'danger', 'growl-top-right', 'fa fa-times');
      } else {
        $(".new-student input[type=text]").prop("disabled", true);
        $(".update").hide();
        Bert.alert('sucessfully updated', 'success', 'growl-top-right', 'fa fa-check');
      }
    })
  }
})
