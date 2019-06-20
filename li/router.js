import '../imports/ui/header.js';
import '../imports/ui/login.js';
import '../imports/ui/home.js';
import '../imports/ui/student_list.js';
import '../imports/ui/viewStDetails.js';
Router.configure({
  layoutTemplate: 'header'
});
Router.route('/', {
  name: 'home',
});
Router.route('/add_student', {
  name: 'addStudent',
  template: 'student_list'
});
Router.route('/student_details/:_id', {
  name: 'viewStDetails',
  template: 'viewStDetails',
});