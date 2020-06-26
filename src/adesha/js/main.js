var theData = [];

$.ajax({
    url: 'https://gravitee-gateway-hrlab.apps.ocp4.innershift.sodigital.io/k-data/allLinks?appName=k-find',
    contentType: "application/json",
    dataType: 'json',
    type: 'GET',
    beforeSend: function (xhr) {
        $('.containerskelaton').removeClass('hidden');

        if (xhr && xhr.overrideMimeType) {
            xhr.overrideMimeType('application/json;charset=utf-8');
        }
        xhr.setRequestHeader("Accept", "application/json, text/javascript, */*");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
    },
    complete: function name(params) {},
    error: function (xhr, ajaxOptions, thrownError) {
        console.log(xhr.status);
        console.log(thrownError);
        new PNotify({
            title: "Error",
            text: "Something went wrong",
            type: 'error',
            styling: 'bootstrap3'
        });
    },
    success: function (result) {
        $('.containerskelaton').addClass('hidden');
        theData = [];
        for (var i = 0; i < result.length; i++) {
            var elem = result[i];
            var obj = {};
            obj.name = elem.tag.name;
            obj.content = elem.tag.content.data;
            obj.tags = elem.classes;

            theData.push(obj);
        }
        display(theData);
    }
});
var display = function (listOfPersonas) {
    $('.profiles').html('');
    for (let i = 0; i < listOfPersonas.length; i++) {

        var theHtml = '';

        var style = '';
        var color = 'white';

        if (i % 2 == 0) {
            style = 'green';
            color = '#325C46';
        }
        var company = 'Nuxy SA',
            anciennete = '10 years',
            caracteristiques = 'Board of Directors',
            contrat = 'Perm contract',
            poste = 'Software engineer',
            datePoste = '22/03/2003',
            departement = 'HR',
            job = 'Manager',
            email = 'kdata@soprahr.com',
            equipe = "0",
            tel = '+33423334493',
            etablissement = 'Office',
            picture = 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRa9NQl0OadsMFUDS-0ycSNaU7OJiBvgefKvC8m7SLkAph1V7ya&usqp=CAU';
        var perso = listOfPersonas[i];
        if(typeof(perso.content)=="string")
        {
            perso.content = JSON.parse(perso.content);
        }else{
            perso.content = perso.content;
        }
        var details = perso.content.data.details;
        var name = perso.name;
        // var job = perso.content.data.job;

        //var company = details.societe;
        // var salary = details.salary;
        // var age = details.age;
        // var email = details.email;
        //var tel = details.tel;
        if (perso.content.data.job)
            job = perso.content.data.job;
        if (perso.content.data.details) {
            if (perso.content.children)
                equipe = perso.content.children;

            if (perso.content.data.picture)
                picture = 'https://lip.hr4youlive.com' + perso.content.data.picture;
            if (details.email)
                email = details.email;
            if (details.tel)
                tel = details.tel;
            if (details.societe)
                company = details.societe;
            if (details.anciennete)
                anciennete = details.anciennete;
            if (details.caracteristiques)
                caracteristiques = details.caracteristiques;
            if (details.contrat)
                contrat = details.contrat;
            if (details.poste)
                poste = details.poste;
            if (details.datePoste)
                datePoste = details.datePoste;
            if (details.departement)
                departement = details.departement;
            if (details.etablissement)
                etablissement = details.etablissement;
        }
        var tags = perso.tags;
        var httmm = '';
        for (var j = 0; j < tags.length; j++) {
            httmm += '<div class="level">' + tags[j] + '</div>';
        }
        theHtml += ' <div  class="card ' + style + ' col-md-12 col-xs-12 col-sm-12" >' +
            '<div class="additional col-md-4 col-xs-4 col-sm-4 ">' +
            ' <div class="user-card">' +
            '   <div class="level center">' +
            job + ' </div>' +
            '   <div class="points center">' +
            '     ' + company + ' </div>' +
            '   <div class="center">' +
            '   <div class="imgdiv col-12 col-sm-12 col-md-12 px-0"><img  src="' + picture + '"/> </div>' +
            ' </div> <div class="more-info">' +
            '   <h1>' + name + '</h1>' +
            '   <div class="coords col-md-12 col-xs-12 col-sm-12">' +
            '     <span style="float:left">' + poste + '</span>' +
            '   </div>      ' +
            '   <div class="coords col-md-12 col-xs-12 col-sm-12">' +
            '     <span style="float:right">' + datePoste + '</span>' +
            '   </div>      ' +
            '   <div class="coords col-md-12 col-xs-12 col-sm-12">' +
            '     <span style="float:left">' + caracteristiques + '</span>' +
            '   </div>' +
            '   <div class="coords col-md-12 col-xs-12 col-sm-12">' +
            '   <span style="float:right">' + etablissement + '</span>' +
            '   </div>' +
            '  <div class="coords col-md-12 col-xs-12 col-sm-12">' +
            '    <span style="float:left">' + contrat + '</span>' +
            '   </div>' +
            '  <div class="coords col-md-12 col-xs-12 col-sm-12">' +
            '     <span style="float:right">' + departement + '</span>' +
            '   </div>' +
            '   <div class="stats"><div>' +
            '       <div class="title">Team</div>' +
            '       <div class="value">' + equipe + '</div>' +
            '     </div>          <div>            <div class="title">Anciennete</div>' +
            '       ' +
            '       <div class="value" style="font-size:0.8rem">' + anciennete + '</div>' +
            '     </div>         ' +
            ' <div>            <div class="title">Email</div>' +
            '<div class="value"> <a href="mailto:' + email + '"><i class="fa fa-envelope" style="font-size: 20px;color:' + color + '"></i></a></div>' +
            '</div>' +
            '<div>   <div class="title">Tel</div>' +
            '<div class="value infinity"><a href="tel:' + tel + '"><i class="fa fa-phone" style="font-size: 20px;color:' + color + '"></i></a></div>' +
            '</div>' +
            ' </div> </div></div></div>' +
            '<div class="general col-md-8 col-xs-8 col-sm-8">' +
            '  <h1>' + name + '</h1>' +
            ' <div class="tagslist">' + httmm + '</div>' +
            ' <span class="more"></span>' +
            '</div>' +
            '</div>';
        $('.profiles').append(theHtml);

    }
};


function searchToggle(obj, evt) {
    var container = $(obj).closest('.search-wrapper');
    if (!container.hasClass('active')) {
        container.addClass('active');
        evt.preventDefault();
    } else {
        if (container.hasClass('active') && $(obj).closest('.input-holder').length > 0) {
            var search = $('.search-input').val();
            $.ajax({
                url: 'https://gravitee-gateway-hrlab.apps.ocp4.innershift.sodigital.io/k-data/search?appName=k-find&mySearch=' + encodeURIComponent(search) + 't&mother=persons',
                contentType: "application/json",
                dataType: 'json',
                type: 'GET',
                beforeSend: function (xhr) {
                    $('.containerskelaton').removeClass('hidden');

                    if (xhr && xhr.overrideMimeType) {
                        xhr.overrideMimeType('application/json;charset=utf-8');
                    }
                    xhr.setRequestHeader("Accept", "application/json, text/javascript, */*");
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                },
                complete: function name(params) {},
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log(xhr.status);
                    console.log(thrownError);
                    new PNotify({
                        title: "Error",
                        text: "Something went wrong",
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                },
                success: function (result) {
                    $('.containerskelaton').addClass('hidden');

                    var thata = [];
                    if(result.tags.length>0)
                    {
                    for (var i = 0; i < result.tags.length; i++) {
                        var elem = result.tags[i];
                        var obj = {};
                        obj.name = elem.tag.name;
                        obj.content = elem.tag.content.data;
                        obj.tags = elem.classes;

                        thata.push(obj);
                    }}
                    else{
                        $('.profiles').html('<H2>Aucune personne correspondantes trouvées</H2>');
                        ;
                    }
                    display(thata);
                }
            });
        }
        if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
            display(theData);

        }
    }
}

function searchToggle2(obj, evt) {
    var container = $(obj).closest('.search-wrapper');

    if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
        container.removeClass('active');
        // clear input
        container.find('.search-input').val('');
        display(theData);
    }
}