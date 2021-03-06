$(document).ready(function () {
    'use strict';
    if (!localStorage.getItem('adesha-user-email') || !localStorage.getItem('adesha-user-username')) {
        window.location.replace("login.html");
    }
    $('.the-user-name').html(localStorage.getItem('adesha-user-username'));
    $('.the-user-email').html(localStorage.getItem('adesha-user-email'));

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
                        $('#company').append('<option id="' + result[i]._id + '" value="' + result[i]._id + '">' + result[i].name + '</option>');
                    }

                }
            }
        });
    }
 
    getCompanies();
  

    $('#createchequebtn').on('click', function (e) {
        var numb = $('#chequenumber').val();
        var ban = $('#ammount').val();
        var comp = $('#company').find(":selected").attr('id');

        var chequeObj = {};
        if(numb) chequeObj.number = numb;
        if(ban) chequeObj.ammount = ban;
        if(comp) chequeObj.company = comp;


        $.ajax({
            url: "/bill",
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
                $('#notificationdiv').html('<div class="alert alert-info alert-dismissible fade show" role="alert"> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>  Cheque with the number '+result.number+' has been created succesfully</div> ');
                $('#chequenumber').val('');
                $('#ammount').val('');
                
                setTimeout(() => {
                    $('#notificationdiv').html('');
                }, 4000);
            }
        });

    });
});