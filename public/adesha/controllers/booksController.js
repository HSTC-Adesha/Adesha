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

 
  var getCompanies = function (params) {
    $('#company').html('');
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
          for (var i = 0; i < result.length; i++) {
            if (i == 0) {
            }
            $('#company').append('<option id="' + result[i]._id + '" value="' + result[i]._id + '">' + result[i].name + '</option>');
          }

        }
      }
    });
  }
  var getBanks = function (params) {
    $('#bank').html('');

    $.ajax({
      url: "/bank",
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
          for (var i = 0; i < result.length; i++) {

            $('#bank').append('<option id="' + result[i].id + '" value="' + result[i].id + '">' + result[i].name + '</option>');
          }

        }
      }
    });
  }

  var getTheChequeBook = function (chequeId) {
    $.ajax({
      url: "/chequeBook/id/" + chequeId,
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
          $('#chequenumber').val(result.number);
          $("#bank option[id=" + result.bank + "]").attr("selected", "selected");
          $("#company option[id=" + result.company + "]").attr("selected", "selected");
          $('.actionsbtn').attr('attr-id', chequeId);
        }
      }
    });
  }
  getCompanies();
  getBanks();
  var getStats = function (params) {
    $.ajax({
      url: "/chequeBook",
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
          setChequeBookTables(result);
        } else {

        }
      }
    });
  };
  var getTheChequesListByBook = function (id) {
    $.ajax({
      url: "/cheque/chequeBook/"+id,
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
          setChequeTable(result);
        } else {

        }
      }
    });
  };
  var setChequeBookTables = function (data) {
    var tab = $('#tableIn').DataTable();
    tab.destroy();


    var theDataIn = [];

    for (var i = 0; i < data.length; i++) {
        var obj = [data[i]._id, data[i].number, data[i].company.name, data[i].bank.name]
        theDataIn.push(obj);
      data[i].companyname = data[i].company.name;
      data[i].companyid = data[i].company._id;
      
      
    }
    var table = $('#tableIn').DataTable({
      data: theDataIn,
      "columnDefs": [{
        "targets": [0],
        "visible": false,
        "searchable": false
      }]
    })
    $('#tableIn tbody').on('click', 'tr', function () {
     var table = $('#tableIn').DataTable();
      var data = table.row(this).data();
      getTheChequeBook(data[0]);
      getTheChequesListByBook(data[0]);
    });

  }
  var setChequeTable = function (data) {
    var tab = $('#tableCheque').DataTable();
    tab.destroy();


    var theDataIn = [];

    for (var i = 0; i < data.length; i++) {
      if(!data[i].received)
    {    var obj = [data[i]._id, data[i].number, data[i].company.name, data[i].status, data[i].amount]
        theDataIn.push(obj); }    
    }
    var table = $('#tableCheque').DataTable({
      data: theDataIn,
      "columnDefs": [{
        "targets": [0],
        "visible": false,
        "searchable": false
      }]
    })
  }
  getStats();
  $('#updatechequebtn').on('click', function (e) {
    var theId = $(this).attr('attr-id');
    var numb = $('#chequenumber').val();
    var ban = $('#bank').find(":selected").attr('id');
    var comp = $('#company').find(":selected").attr('id');
    var chequeObj = {};
    if (numb) chequeObj.number = numb;
    if (ban) chequeObj.bank = ban;
    if (comp) chequeObj.company = comp;
    $.ajax({
      url: "/chequeBook/" + theId,
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
          $('#notificationdiv').html('<div class="alert alert-info alert-dismissible fade show" role="alert"> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>  Cheque has been created succesfully</div> ');
          $('#chequenumber').val('');
          setTimeout(() => {
            $('#notificationdiv').html('');
          }, 4000);
          getStats();
        }
      }
    });

  });
  var deleteBook = function (theId) {
    $.ajax({
      url: "/chequeBook/delete/" + theId,
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
          $('#notificationdiv').html('<div class="alert alert-info alert-dismissible fade show" role="alert"> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>  Cheque has been deleted succesfully</div> ');
          $('#chequenumber').val('');
          setTimeout(() => {
            $('#notificationdiv').html('');
          }, 4000);
          getStats();
        }
      }
    });
  }
  $('#deletechequebtn').on('click', function (e) {
    var theId = $(this).attr('attr-id');
    deleteBook(theId);
  });
});