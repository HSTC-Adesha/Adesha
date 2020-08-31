$(document).ready(function () {
    'use strict';
    if (!localStorage.getItem('adesha-user-email') || !localStorage.getItem('adesha-user-username')) {
        window.location.replace("login.html");
    }
    $('.the-user-name').html(localStorage.getItem('adesha-user-username'));
    $('.the-user-email').html(localStorage.getItem('adesha-user-email'));

    $("#duedate").datetimepicker({
        useCurrent: false,
        format: "L",
        showTodayButton: false,
        icons: {
            next: "fa fa-chevron-right",
            previous: "fa fa-chevron-left",
            today: 'todayText',
        }
    });
    $("#creationdate").datetimepicker({
        useCurrent: false,
        format: "L",
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
                    $('#company').append('<option id="" value=""></option>');

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
    var setBankTables = function (data) {
        var tab = $('#tableBank').DataTable();
        tab.destroy();   
        var theDataIn = [];
    
        for (var i = 0; i < data.length; i++) {
            var obj = [data[i].id, data[i].name]
            theDataIn.push(obj);
        }
        var table = $('#tableBank').DataTable({
          data: theDataIn,
          "columnDefs": [{
            "targets": [0],
            "visible": false,
            "searchable": false
          }]
        })
        $('#tableBank tbody').on('click', 'tr', function () {
         var table = $('#tableBank').DataTable();
          var data = table.row(this).data();
          getTheBankDetails(data[0]);
        });
    
      }
      var getTheBankDetails = function (bankId) {
        $.ajax({
          url: "/bank/id/" + bankId,
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
              $('#banknamemodal2').val(result.name);
              $('#bankcomment2').val(result.comment);
              $('.bankactions').attr('attr-id', bankId);
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
                    setBankTables(result)

                    $('#bank').append('<option id="" value=""></option>');

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
                    $('#employee').append('<option id="" value=""></option>');

                    for (var i = 0; i < result.length; i++) {

                        $('#employee').append('<option id="' + result[i]._id + '" value="' + result[i]._id + '">' + result[i].firstName + ' ' + result[i].lastName + '</option>');
                    }

                }
            }
        });
    }
    var getBills = function (params) {
        $('#bill').html('');
    
        $.ajax({
          url: "/bill",
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
            var listOfBills = [];
            if (result.length) {
               // $('#bill').append('<option id="" value=""></option>');

              for (var i = 0; i < result.length; i++) {
    
              //  $('#bill').append('<option id="' + result[i]._id + '" value="' + result[i]._id + '">' + result[i].number + '</option>');
              listOfBills.push({id:result[i]._id,number:result[i].number,company:result[i].company.name})
            }
              $('#bill').selectize({
                plugins: ['remove_button'],
                persist: false,
                maxItems: null,
                valueField: 'id',
                labelField: 'number',
                searchField: ['number','company'],
                options:listOfBills,
                render: {
                    item: function(item, escape) {
                        return '<div>' +
                            (item.number ? '<span class="name">Bill :'+ escape(item.number)+ ' |company :' + escape(item.company) + '</span>' : '') +
                        '</div>';
                    },
                    option: function(item, escape) {
                        var label = item.number || item.id;
                        return '<div>' +
                            '<span class="label "'+label+'">Bill :'+ escape(item.number)+ ' |company :' + escape(item.company) + '</span>' +
                        '</div>';
                    }
                },
                createFilter: function(input) {
                    var match, regex;
            
                    // email@address.com
                    regex = new RegExp('^' + REGEX_EMAIL + '$', 'i');
                    match = input.match(regex);
                    if (match) return !this.options.hasOwnProperty(match[0]);
            
                    // name <email@address.com>
                    regex = new RegExp('^([^<]*)\<' + REGEX_EMAIL + '\>$', 'i');
                    match = input.match(regex);
                    if (match) return !this.options.hasOwnProperty(match[2]);
            
                    return false;
                },
            });
            
            }
          }
        });
      }
    getCompanies();
    getBanks();
    getBills();

    $('#company').on('change', function () {
        getEmployee($(this).find(":selected").attr('id'));
    });

    $('#createchequebtn').on('click', function (e) {
        var numb = $('#chequenumber').val();
        var ammou = $('#ammount').val();
        var dued = moment($('#duedate').data("DateTimePicker").date().toDate()).format("DD/MM/YYYY");
        var creat =moment($('#creationdate').data("DateTimePicker").date().toDate()).format("DD/MM/YYYY");
        var ban = $('#bank').find(":selected").attr('id');
        var bill = $('#bill').val();
        var status = $('#status').find(":selected").attr('id');
        var comp = $('#company').find(":selected").attr('id');
        var empl = $('#employee').find(":selected").attr('id');
        var comm = $('#comment').val();
        var phot =  $('#imageCheque').attr('src');
        var chequeObj = {};
        if(numb) chequeObj.number = numb;
        if(ammou) chequeObj.amount = ammou;
        if(dued) chequeObj.dueDate = dued;
        if(creat) {chequeObj.creationDate = creat;}
        else{
            chequeObj.creationDate = moment(new Date()).format('DD/MM/YYYY');
        }
        if(ban) chequeObj.bank = ban;
        if(bill && bill.length) chequeObj.bill = bill;
        if(comp) chequeObj.company = comp;
        if(empl) chequeObj.employee = empl;
        if(comm) chequeObj.comment = comm;
        if(phot) chequeObj.photo = phot;
        if(status) chequeObj.status = status;
        chequeObj.received = true;
        if(numb && ammou && dued && ban && comp && status)
        {
          $.ajax({
            url: "/cheque",
            type: 'POST',
            data:chequeObj,
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
                $('#notificationdiv').html('<div class="alert alert-info alert-dismissible fade show" role="alert"> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>  Cheque with the number '+result.number+' and ammount '+result.amount+'dt has been created succesfully</div> ');
                    $('#chequenumber').val('');
                    $('#ammount').val('');
                    $('#comment').val('');
                    $('#imageCheque').attr('src',"")
              
            }
        });}
        else{
            $('#notificationdiv').html('<div class="alert alert-error alert-dismissible fade show" role="alert"> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button> Please fill all form fields succesfully</div> ');
            setTimeout(() => {
                $('#notificationdiv').html('');
            }, 4000);
        }
    });
    $('#photo').on('change',function (e) {
        readURL(this);
    })
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#imageCheque')
                    .attr('src', e.target.result);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }
    $('.createbank').on('click', function (e) {
        var name = $('#banknamemodal').val();
        var comment = $('#bankcomment').val();
        
        var chequeObj = {};
        chequeObj.name = name;
        chequeObj.comment = comment;
        $.ajax({
          url: "/bank/",
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
              $('#banknamemodal').val('');
              $('#bankcomment').val('');
              getBanks();
            }
          }
        });
    
      });
    $('.updatebank').on('click', function (e) {
        var theId = $(this).attr('attr-id');
        var name = $('#banknamemodal2').val();
        var comment = $('#bankcomment2').val();
        
        var chequeObj = {};
        chequeObj.name = name;
        chequeObj.comment = comment;
        $.ajax({
          url: "/bank/" + theId,
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
              $('#banknamemodal2').val('');
              $('#bankcomment2').val('');
              getBanks();
            }
          }
        });
    
      });
      $('.deletebank').on('click', function (e) {
        var theId = $(this).attr('attr-id');
    
        $.ajax({
          url: "/bank/delete/" + theId,
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
            getBanks();
              $('#banknamemodal2').val('');
              $('#bankcomment2').val('');
          }
        });
    
      });
});