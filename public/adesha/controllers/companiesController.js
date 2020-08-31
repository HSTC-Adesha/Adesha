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
  var getTheChequeBook = function (companyId) {
    $.ajax({
      url: "/company/id/" + companyId,
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
        if (result) {
          $('#name').val(result.name);
          $('#country').val(result.cityOrCountry);
          $('#address').val(result.address);
          $('#comment').val(result.comment);
         $("#type option[id=" + result.type + "]").attr("selected", "selected");
           $('.actionsbtn').attr('attr-id', companyId);
        }
      }
    });
  }
  var getTheEmployee = function (employeeId) {
    $.ajax({
      url: "/employee/id/" + employeeId,
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
        if (result) {
          $('#firstname').val(result.firstName);
          $('#lastname').val(result.lastName);
          $('#roleemployee').val(result.role);
          $('#employeecomment').val(result.comment);
          $("#companyList option[id=" + result.company + "]").attr("selected", "selected");
          $('.eactionsbtn').attr('attr-id', employeeId);
        }
      }
    });
  }
  var getTheEmployees = function (companyId) {
    $.ajax({
      url: "/employee/company/" + companyId,
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
        setEmpTables(result);
      }
    });
  }
  var getStats = function (params) {
    $.ajax({
      url: "/company",
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
          var txxt = '';
          for (let index = 0; index < result.length; index++) {
            const element = result[index];
            txxt += '<option id="' + element._id + '" value="' + element._id + '">' +element.name + '</option>';
          }
          $('#companyList').html(txxt);

          setChequeTables(result);
        } else {
        }
      }
    });
  };

  var setChequeTables = function (data) {
    var tab = $('#tableIn').DataTable();
    tab.destroy();
    var theDataIn = [];
    for (var i = 0; i < data.length; i++) {
        var obj = [data[i]._id, data[i].name, data[i].type, data[i].address];
        theDataIn.push(obj);
    }
    var table = $('#tableIn').DataTable({
      data: theDataIn,
      "columnDefs": [{
        "targets": [0],
        "visible": false,
        "searchable": false
      }]
    })
    $('#tableIn tbody').on('click', 'tr', function (e) {
      e.preventDefault();
     var table = $('#tableIn').DataTable();
      var data = table.row(this).data();
      getTheChequeBook(data[0]);
      getTheEmployees(data[0]);
    });

  }
  var setEmpTables = function (data) {
    var tab = $('#tableEmp').DataTable();
    tab.destroy();
    var theDataIn = [];
    for (var i = 0; i < data.length; i++) {
        var obj = [data[i]._id, data[i].firstName+' '+ data[i].lastName, data[i].role];
        theDataIn.push(obj);
    }
    var table = $('#tableEmp').DataTable({
      data: theDataIn,
      "columnDefs": [{
        "targets": [0],
        "visible": false,
        "searchable": false
      }]
    })
    $('#tableEmp tbody').on('click', 'tr', function (e) {
      e.preventDefault();
      var table = $('#tableEmp').DataTable();
      var data = table.row(this).data();
      getTheEmployee(data[0]);
    });

  }
  getStats();
  $('#updatechequebtn').on('click', function (e) {
    var theId = $(this).attr('attr-id');
    var name = $('#name').val();
    var country = $('#country').val();
    var address = $('#address').val();
    var comment = $('#comment').val();
    
    var type = $('#type').find(":selected").attr('id');
    var chequeObj = {};
    if (name) chequeObj.name = name;
    if (country) chequeObj.city = country;
    if (address) chequeObj.address = address;
    if (comment) chequeObj.comment = comment;
    if (type) chequeObj.type = type;
    $.ajax({
      url: "/company/" + theId,
      type: 'PATCH',
      data: chequeObj,
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
          console.log(result);
          $('#notificationdiv').html('<div class="alert alert-info alert-dismissible fade show" role="alert"> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>  bill has been created succesfully</div> ');
          $('#name').val('');
          $('#country').val('');
          $('#address').val('');
          $('#comment').val('');
          setTimeout(() => {
            $('#notificationdiv').html('');
          }, 4000);
          getStats();
        }
      }
    });

  });
  $('#deletechequebtn').on('click', function (e) {
    var theId = $(this).attr('attr-id');

    $.ajax({
      url: "/company/delete/" + theId,
      type: 'PATCH',
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
          console.log(result);
          $('#notificationdiv').html('<div class="alert alert-info alert-dismissible fade show" role="alert"> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>  Company has been deleted succesfully</div> ');
          $('#name').val('');
          $('#country').val('');
          $('#address').val('');
          $('#comment').val('');
          setTimeout(() => {
            $('#notificationdiv').html('');
          }, 4000);
          getStats();
        }
      }
    });

  });
  
  $('#ecreate').on('click', function (e) {
    var firstName = $('#firstname').val();
    var lastName = $('#lastname').val();
    var role = $('#roleemployee').val();
    var comment = $('#employeecomment').val();
    var company = $('#companyList').find(":selected").attr('id');

    var chequeObj = {};
    if (firstName) chequeObj.firstName = firstName;
    if (lastName) chequeObj.lastName = lastName;
    if (role) chequeObj.role = role;
    if (comment) chequeObj.comment = comment;
    if (company) chequeObj.company = company;
    $.ajax({
      url: "/employee",
      type: 'POST',
      data: chequeObj,
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
          console.log(result);
          $('#enotificationdiv').html('<div class="alert alert-info alert-dismissible fade show" role="alert"> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>  Employee has been created succesfully</div> ');
          $('#firstname').val('');
          $('#lastname').val('');
          $('#roleemployee').val('');
          $('#employeecomment').val('');
          setTimeout(() => {
            $('#enotificationdiv').html('');
          }, 4000);
          getStats();
        }
      }
    });

  });
  $('#eupdatechequebtn').on('click', function (e) {
    var theId = $(this).attr('attr-id');
    var firstName = $('#firstname').val();
    var lastName = $('#lastname').val();
    var role = $('#roleemployee').val();
    var comment = $('#employeecomment').val();
    var company = $('#companyList').find(":selected").attr('id');

    var chequeObj = {};
    if (firstName) chequeObj.firstName = firstName;
    if (lastName) chequeObj.lastName = lastName;
    if (role) chequeObj.role = role;
    if (comment) chequeObj.comment = comment;
    if (company) chequeObj.company = company;
    $.ajax({
      url: "/employee/" + theId,
      type: 'PATCH',
      data: chequeObj,
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
          console.log(result);
          $('#enotificationdiv').html('<div class="alert alert-info alert-dismissible fade show" role="alert"> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>  Employee has been created succesfully</div> ');
          $('#firstname').val('');
          $('#lastname').val('');
          $('#roleemployee').val('');
          $('#employeecomment').val('');
          setTimeout(() => {
            $('#enotificationdiv').html('');
          }, 4000);
          getStats();
        }
      }
    });

  });
  $('#edeletechequebtn').on('click', function (e) {
    var theId = $(this).attr('attr-id');

    $.ajax({
      url: "/employee/delete/" + theId,
      type: 'PATCH',
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
          console.log(result);
          $('#enotificationdiv').html('<div class="alert alert-info alert-dismissible fade show" role="alert"> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>  Employee has been deleted succesfully</div> ');
          $('#firstname').val('');
          $('#lastname').val('');
          $('#roleemployee').val('');
          $('#employeecomment').val('');
          setTimeout(() => {
            $('#notificationdiv').html('');
          }, 4000);
          getStats();
        }
      }
    });

  });
});