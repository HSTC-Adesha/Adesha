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
    var getChequeBooks = function (params) {
        $('#company').html('');
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
                    for (var i = 0; i < result.length; i++) {
                        if (i == 0) {
                        }
                        $('#book').append('<option id="' + result[i]._id + '" value="' + result[i]._id + '">' + result[i].number + '</option>');
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
    getCompanies();
    getBanks();
    getChequeBooks();
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
              for (var i = 0; i < result.length; i++) {
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
      getBills();
    $('#company').on('change', function () {
        getEmployee($(this).find(":selected").attr('id'));
    });
    $('#photo').on('change',function (e) {
        readURL(this);
    });
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
    $('#createchequebtn').on('click', function (e) {
        var numb = $('#chequenumber').val();
        var ammou = $('#ammount').val();
        var dued = moment($('#duedate').data("DateTimePicker").date().toDate()).format("DD/MM/YYYY");
        var creat =moment($('#creationdate').data("DateTimePicker").date().toDate()).format("DD/MM/YYYY");
        var ban = $('#bank').find(":selected").attr('id');
        var book = $('#book').find(":selected").attr('id');
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
        if(bill.length) chequeObj.bill = bill;
        if(comp) chequeObj.company = comp;
        if(empl) chequeObj.employee = empl;
        if(comm) chequeObj.comment = comm;
        if(phot) chequeObj.photo = phot;
        if(book) chequeObj.chequeBook = book;
        if(status) chequeObj.status = status;
        chequeObj.received = false;
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

                setTimeout(() => {
                    $('#notificationdiv').html('');
                }, 4000);
            }
        });
        }

    });
});