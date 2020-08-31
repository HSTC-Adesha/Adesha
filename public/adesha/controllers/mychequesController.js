$(document).ready(function () {
  'use strict';
  if (!localStorage.getItem('adesha-user-email') || !localStorage.getItem('adesha-user-username')) {
    window.location.replace("login.html");
  }
  $('.the-user-name').html(localStorage.getItem('adesha-user-username'));
  $('.the-user-email').html(localStorage.getItem('adesha-user-email'));

  var todayIs = moment(new Date()).format("DD/MM/YYYY");
  var tomorrowIs = moment(todayIs, "DD/MM/YYYY").add(1, 'days').format("DD/MM/YYYY");


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

  $("#duedate").datetimepicker({
    useCurrent: false,
    format: 'DD/MM/YYYY',
    showTodayButton: false,
    icons: {
      next: "fa fa-chevron-right",
      previous: "fa fa-chevron-left",
      today: 'todayText',
    }
  });
  $("#creationdate").datetimepicker({
    useCurrent: false,
    format: 'DD/MM/YYYY',
    showTodayButton: false,
    icons: {
      next: "fa fa-chevron-right",
      previous: "fa fa-chevron-left",
      today: 'todayText',
    }
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
              getEmployee(result[i]._id);

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
  var getEmployee = function (compnayId) {
    $('#employee').html('');

    $.ajax({
      url: "/employee/company/" + compnayId,
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

            $('#employee').append('<option id="' + result[i]._id + '" value="' + result[i]._id + '">' + result[i].firstName + ' ' + result[i].lastName + '</option>');
          }

        }
      }
    });
  }
  var getTheCheque = function (chequeId) {
    $.ajax({
      url: "/cheque/id/" + chequeId,
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
          $('#ammount').val(result.amount);
          if (result.photo) {
            $('#imageCheque').attr("src", result.photo);
          }
          if (result.bill) {
            $("#bill option[id=" + result.bill + "]").attr("selected", "selected");
          }

          $('#creationdate').data("DateTimePicker").date(moment(result.creationDate, 'DD/MM/YYYY').format('DD/MM/YYYY'));
          $('#duedate').data("DateTimePicker").date(moment(result.dueDate, 'DD/MM/YYYY').format('DD/MM/YYYY'));
          $("#bank option[id=" + result.bank + "]").attr("selected", "selected");
          $("#company option[id=" + result.company + "]").attr("selected", "selected");
          $('#employee').html('');
          $('.actionsbtn').attr('attr-id', chequeId);
          $.ajax({
            url: "/employee/company/" + result.company,
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
                $('#employee').append('<option id="" value=""></option>');

                for (var i = 0; i < result.length; i++) {

                  $('#employee').append('<option id="' + result[i]._id + '" value="' + result[i]._id + '">' + result[i].firstName + ' ' + result[i].lastName + '</option>');
                }
                if (result.employee) {
                  $("#employee option[id=" + result.employee + "]").attr("selected", "selected");
                }
              }
            }
          });
          $('#comment').val(result.comment);

        }
      }
    });
  }
  var getTheCheque = function (chequeId) {
    $.ajax({
      url: "/cheque/id/" + chequeId,
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
          $('#ammount').val(result.amount);
          if (result.photo) {
            $('#imageCheque').attr("src", result.photo);
          }
          if (result.bill) {
            $("#bill option[id=" + result.bill + "]").attr("selected", "selected");
          }
          $('#creationdate').data("DateTimePicker").date(moment(result.creationDate, 'DD/MM/YYYY').format('DD/MM/YYYY'));
          $('#duedate').data("DateTimePicker").date(moment(result.dueDate, 'DD/MM/YYYY').format('DD/MM/YYYY'));
          $("#bank option[id=" + result.bank + "]").attr("selected", "selected");
          $("#company option[id=" + result.company + "]").attr("selected", "selected");
          $('#employee').html('');
          $('.actionsbtn').attr('attr-id', chequeId);
          $.ajax({
            url: "/employee/company/" + result.company,
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

                  $('#employee').append('<option id="' + result[i]._id + '" value="' + result[i]._id + '">' + result[i].firstName + ' ' + result[i].lastName + '</option>');
                }
                $("#employee option[id=" + result.employee + "]").attr("selected", "selected");

              }
            }
          });
          $('#comment').val(result.comment);

        }
      }
    });
  };
  getCompanies();
  getBanks();
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
      if (data[i].received !== true) {
        var obj = [data[i]._id, data[i].number, data[i].chequeBook.number, data[i].bank.name, data[i].dueDate, data[i].status, data[i].amount]
        theDataIn.push(obj);
      }
      data[i].companyname = data[i].company.name;
      data[i].companyid = data[i].company._id;
    }
    var table = $('#tableIn').DataTable({
      data: theDataIn,
      dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
      ],
      "columnDefs": [{
        "targets": [0],
        "visible": false,
        "searchable": false
      }],
      rowGroup: {
        // Uses the 'row group' plugin
        dataSrc: 2,
        startRender: function (rows, group) {
          var collapsed = !!collapsedGroups[group];

          rows.nodes().each(function (r) {
            r.style.display = collapsed ? 'none' : '';
          });

          // Add category name to the <tr>. NOTE: Hardcoded colspan
          return $('<tr/>')
            .append('<td colspan="8">' + group + ' (' + rows.count() + ')</td>')
            .attr('data-name', group)
            .toggleClass('collapsed', collapsed);
        }
      }
    })
 
    $('#tableIn tbody').on('click', 'tr', function () {
      var table = $('#tableIn').DataTable();
      var data = table.row(this).data();
      getTheCheque(data[0]);
    });

  }


  $('#company').on('change', function () {
    getEmployee($(this).find(":selected").attr('id'));
  });

  getStats();
  $('.todaydate').html(todayIs);
  $('#tomorrowdate').html(tomorrowIs);
  $('#monthdate').html(moment(tomorrowIs, "DD/MM/YYYY").format("MMMM-YYYY"));
  $('#updatechequebtn').on('click', function (e) {
    var theId = $(this).attr('attr-id');
    var numb = $('#chequenumber').val();
    var ammou = $('#ammount').val();
    var dued = moment($('#duedate').data("DateTimePicker").date().toDate()).format("DD/MM/YYYY");
    var creat = moment($('#creationdate').data("DateTimePicker").date().toDate()).format("DD/MM/YYYY");
    var ban = $('#bank').find(":selected").attr('id');
    var comp = $('#company').find(":selected").attr('id');
    var empl = $('#employee').find(":selected").attr('id');
    var comm = $('#comment').val();
    var chequeObj = {};
    if (numb) chequeObj.number = numb;
    if (ammou) chequeObj.amount = ammou;
    if (dued) chequeObj.dueDate = dued;
    if (creat) chequeObj.creationDate = creat;
    if (ban) chequeObj.bank = ban;
    if (comp) chequeObj.company = comp;
    if (empl) chequeObj.employee = empl;
    if (comm) chequeObj.comment = comm;
    chequeObj.received = false;
    chequeObj.status = "todo";
    chequeObj.chequeplaceOfCreation = "Tunis";

    $.ajax({
      url: "/cheque/" + theId,
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
          $('#ammount').val('');
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
      url: "/cheque/delete/" + theId,
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
          $('#ammount').val('');
          $('#comment').val('');

          setTimeout(() => {
            $('#notificationdiv').html('');
          }, 4000);
          getStats();
        }
      }
    });

  });
});