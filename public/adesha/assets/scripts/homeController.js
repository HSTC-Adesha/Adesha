$(document).ready(function () {
  'use strict';
  if (!localStorage.getItem('adesha-user-email') || !localStorage.getItem('adesha-user-username')) {
    window.location.replace("login.html");
  }
  $('.the-user-name').html(localStorage.getItem('adesha-user-username'));
  $('.the-user-email').html(localStorage.getItem('adesha-user-email'));

  const socket = io('http://localhost:3000');
  socket.on('connect', function () {
    console.log('Connected');
    socket.on('dbcheck', function (data) {
      console.log('dbcheck', data);
      getStats();
    });
    // socket.emit('events', {
    //   test: 'test'
    // });
    // socket.emit('identity', 0, response =>
    //   console.log('Identity:', response)
    // );
  });
  socket.on('events', function (data) {
    console.log('event', data);
  });
  socket.on('dbcheck', function (data) {
    console.log('dbcheck', data);
    getStats();
  });
  socket.on('exception', function (data) {
    console.log('event', data);
  });
  socket.on('disconnect', function () {
    console.log('Disconnected');
  });
  var getStats = function (params) {
    $.ajax({
      url: "/cheque",
      type: 'GET',
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
        console.log(result);
        if (result.length) {
          $('.cheques-total-number').html(result.length);
          var amm = 0;
          var received = 0;
          var emmitted = 0;
          var todayRecAmmount = 0;
          var todayRecNum = 0;
          var todayAmmount = 0;
          var todayNum = 0;
          var notRecNum = 0;
          var notRecAmmount =0;
          var notNum = 0;
          var notAmmount =0;
          for (var i = 0; i < result.length; i++) {
            var cheq = result[i];
            if (cheq.received == true) {
              received += 1;
              if (moment(new Date()).format("DD/MM/YYYY") == cheq.dueDate) {
                todayRecNum += 1;
                todayRecAmmount += parseInt(cheq.amount);
  
              }
              if (cheq.status != "done") {
                notRecNum += 1;
                notRecAmmount += parseInt(cheq.amount);
              }
            } else {
              emmitted += 1;
              if (moment(new Date()).format("DD/MM/YYYY") == cheq.dueDate) {
                todayNum += 1;
                todayAmmount += parseInt(cheq.amount);
  
              }
              if (cheq.status != "done") {
                notNum += 1;
                notAmmount += parseInt(cheq.amount);
              }
            }
            amm = amm + parseInt(result[i].amount);
          }
          $('.today-due-received').html(todayRecNum);
          $('.today-due-ammount-received').html(todayRecAmmount);
          $('.received-nottreated-number').html(notRecNum);
          $('.received-nottreated-ammount').html(notRecAmmount);
  
  
  
  
          $('.today-due').html(todayNum);
          $('.today-due-ammount').html(todayAmmount);
          $('.nottreated-number').html(notNum);
          $('.nottreated-ammount').html(notAmmount);
  
  
          $('.cheques-total-ammount').html(amm + "$");
          $('.cheques-total-received').html(received);
          $('.cheques-total-emmitted').html(emmitted);
  
        } else {
  
        }
      }
    });
  }
  getStats();

});