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
    $('#company').on('change', function () {
        getEmployee($(this).find(":selected").attr('id'));
    });

    $('#createchequebtn').on('click', function (e) {
        var numb = $('#chequenumber').val();
        var ammou = $('#ammount').val();
        var dued = moment($('#duedate').data("DateTimePicker").date().toDate()).format("DD/MM/YYYY");
        var creat =moment($('#creationdate').data("DateTimePicker").date().toDate()).format("DD/MM/YYYY");
        var ban = $('#bank').find(":selected").attr('id');
        var comp = $('#company').find(":selected").attr('id');
        var empl = $('#employee').find(":selected").attr('id');
        var comm = $('#comment').val();
        var chequeObj = {};
        if(numb) chequeObj.number = numb;
        if(ammou) chequeObj.amount = ammou;
        if(dued) chequeObj.dueDate = dued;
        if(creat) chequeObj.creationDate = creat;
        if(ban) chequeObj.bank = ban;
        if(comp) chequeObj.company = comp;
        if(empl) chequeObj.employee = empl;
        if(comm) chequeObj.comment = comm;
        chequeObj.received = true;
        chequeObj.status = "todo";
        chequeObj.chequeplaceOfCreation = "Tunis";

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
                
                setTimeout(() => {
                    $('#notificationdiv').html('');
                }, 4000);
            }
        });

    });
});