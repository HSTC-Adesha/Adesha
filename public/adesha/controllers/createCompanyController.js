$(document).ready(function () {
    'use strict';
    if (!localStorage.getItem('adesha-user-email') || !localStorage.getItem('adesha-user-username')) {
        window.location.replace("login.html");
    }
    $('.the-user-name').html(localStorage.getItem('adesha-user-username'));
    $('.the-user-email').html(localStorage.getItem('adesha-user-email'));

  
    $('#createchequebtn').on('click', function (e) {
        var name = $('#name').val();
        var address = $('#address').val();
        var country = $('#country').val();
        var comment = $('#comment').val();
        var type = $('#type').find(":selected").attr('id');

        var companyObj = {};
        if(name) companyObj.name = name;
        if(address) companyObj.address = address;
        if(country) companyObj.city = country;
        if(comment) companyObj.comment = comment;
        if(type) companyObj.type = type;


        $.ajax({
            url: "/company",
            type: 'POST',
            data:companyObj,
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
                $('#notificationdiv').html('<div class="alert alert-info alert-dismissible fade show" role="alert"> <button type="button" class="close" aria-label="Close"><span aria-hidden="true">×</span></button>  Company with the name '+result.name+' has been created succesfully</div> ');
                $('#name').val('');
                $('#address').val('');
                $('#country').val('');
                $('#comment').val('');
                
                setTimeout(() => {
                    $('#notificationdiv').html('');
                }, 4000);
            }
        });

    });
});