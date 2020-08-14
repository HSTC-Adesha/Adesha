$(document).ready(function () {
  'use strict';

  var loginAction = function loginAction(varusername, varpassword) {
    $.ajax({
      url: "/app/login",
      data: {
        email: varusername,
        password: varpassword,
      },
      type: 'POST',
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader("Accept", "application/json, text/javascript,  */*");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        $('.login_content').removeClass('bad');
      },
      complete: function complete(params) {},
      error: function error(xhr, ajaxOptions, thrownError) {
        $('.login_content').addClass('bad');
        console.log(xhr.status);
        console.log(thrownError);
      },
      success: function success(result) {
        if (result) {
          localStorage.setItem('adesha-auth-token', result.accessToken);
          localStorage.setItem('adesha-user-username', result.fullName);
          localStorage.setItem('adesha-user-email', result.email);
          window.location.replace("index.html");
        } else {
          $('.login_content').addClass('bad');
        }
      }
    });
  };

  $('#loginBtn').on('click', function (params) {
    loginAction($('#username').val(), $('#userid').val());
  });
  $('#signupaction').on('click', function (params) {
    $.ajax({
      url: "/app/register",
      data: {
        fullName: $('#createUsername').val(),
        email: $('#createEmail').val(),
        password: $('#createPassword').val()
        
      },
      type: 'POST',
      beforeSend: function beforeSend(xhr) {
        xhr.setRequestHeader("Accept", "application/json, text/javascript,  */*");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
      },
      complete: function complete(params) {},
      error: function error(xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
      },
      success: function success(result) {
        if (result) {
          //auto redirect to login form
          window.location.hash = '#signin';
          //use the email of created user
          $('#username').val(result.email);
       }else{
        $('.login_content').addClass('bad');

       } 
      }
    });
  });
});