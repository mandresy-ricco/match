function replaceColumn(element){

    let d = new Date();
    let date = d.getFullYear()+'-0'+(d.getMonth()+1)+'-'+d.getDate() + " "+d.getHours()+":"+ d.getMinutes()+":00" ;

    let card = ColumnTable.replace("--title--", element.titre);
    card = card.replace("--sport--", element.nom_s);
    card = card.replace("--address--", element.adresse+" ");
    card = card.replace("--city--", element.ville+" ");
    card = card.replace("--date--", element.fin);


    if(date < element.debut){

        card = card.replace("--info--", "Prochainement");
        card = card.replace("--color--", "text-success");
        card = card.replace("--score-match--", "");
        card = card.replace("--best-player--", "");
        card = card.replace("--sub--", "");

    }
    else if(date > element.debut){

        if((element.meilleur_joueur) == null || (element.score) === null){

            card = card.replace("--info--", 'Terminé (non maj)');
            card = card.replace("--color--", 'text-warning');

            if( element[0] === element.id_personne) {

                card = card.replace("--score-match--",
                    "<input class='shadow-none form-control border-0' id='--idMatchOne--' type='text' placeholder='Score...'>");
                console.log(element.id_match)
                card = card.replace("--idMatchOne--","score-field-"+element.id_match);

                card = card.replace("--best-player--",
                    "<input class='shadow-none form-control border-0' id='--idMatchTwo--' type='text' placeholder='Meilleur joueur...'>");
                card = card.replace("--idMatchTwo--","best-field-"+element.id_match);

                card = card.replace("--sub--", '' +
                    '<input type="submit" onclick="modifyData(\'--id--\')" class="shadow-none form-control bg-principal text-white"  value="ok">');
                card = card.replace("--id--",element.id_match)
            }else{
                card = card.replace("--score-match--",
                    '');
                card = card.replace("--best-player--",
                    '');
                card = card.replace("--sub--", '');

            }
        }
        else{
            card = card.replace("--info--", 'Terminé (maj)');
            card = card.replace("--color--", 'text-primary');
            card = card.replace("--score-match--", element.score);
            card = card.replace("--best-player--",  element.meilleur_joueur);
            card = card.replace("--sub--", "");
        }
    }
    else{
        card = card.replace("--score-match--", "");
        card = card.replace("--best-player--", "");
        card = card.replace("--sub--", "");
    }

    return card;

}

function createCard(data){

    console.log(data)
    if(data.length=== undefined)
        $('#number-match-field').text("0");
    else
        $('#number-match-field').text(data.length);
    $('#statistic-field').removeClass("d-none" )



    $('#information').attr('class', "d-none");

    let table =  $('#table-historical-field');
    table.html('');

    if(data === false)
    {
        $('#information').attr('class', "");
    }
    else if(data !== false && data.length === undefined )
    {
        let card = replaceColumn(data);
        table.append(card);
    }
    else
    {
        data.forEach(element => {

                let card = replaceColumn(element);
            table.append(card);
            }

        );
    }


}

function replaceCardNotificationTwo(element){
    console.log(element);
    let card;

    if(element.statut === true)
    {
        card =  cardAccept;
    }else if (element.statut === false)
    {
        card =  cardRefuse;
    }
    card = card.replace('--city--',element.ville);
    card = card.replace('--title--',element.denomination);
    card = card.replace('--sport--',element.nom_s);
    card = card.replace('--date--',element.debut);

    return card;
}

function replaceCardNotificationOne(element){

    let card = CardAsk.replace("--nameOne--", element.prenom);
    card = card.replace("--nameTwo--", element.nom);
    card = card.replace("--city--", element.ville);
    card = card.replace("--date--", element.debut);
    card = card.replace("--link--", element.chemin);
    card = card.replace("--id-accept--","accept-"+element.resa);
    card = card.replace("--id-deny--","deny-"+element.resa);
    return card;
}

function createCardNotification(data){


    let notif = $("#notification-field" )
    notif.html('');

    if(data === false)
    {
        $("#informationTwo" ).attr('class','mt-4');
    }
    else if(data !== false && data.length === undefined )
    {
        if(data[0] === 1){
            notif.append(replaceCardNotificationOne(data));
        }
        else if (data[0] === 2){
            notif.append(replaceCardNotificationTwo(data));
        }

    }
    else
    {
        data.forEach(element => {

            if(element[0] === 1) {
                notif.append(replaceCardNotificationOne(element));
            }
            else if (element[0] === 2){
                notif.append(replaceCardNotificationTwo(element));
            }
        }

        );
    }




}

$("#type-person").change(() => {

    $("#informationTwo" ).attr('class','mt-4 d-none');
    let typePerson = $("#type-person option:selected" ).val();

    ajaxRequest('GET', '../controllers/Rest.php/User/notification?type='+typePerson,createCardNotification);
    ajaxRequest('GET', '../controllers/Rest.php/User/historical?type='+typePerson,createCard);

});

function fillProfile(data){
    $('#img-fill').attr('src',data.chemin);
    $('#name-fill').text(data.prenom+' '+data.nom);
    $('#fs-fill').text('Forme : '+data.fs);
    $('#city-fill').text(data.ville);
}

function modifyData(id){
    event.preventDefault()
    let score =$("#score-field-"+id).val()
    let best =$("#best-field-"+id).val()
    let typePerson = $("#type-person option:selected" ).val();
    ajaxRequest('PUT', '../controllers/Rest.php/Match/'+id,(data) =>{
        ajaxRequest('GET', '../controllers/Rest.php/User/historical?type='+typePerson,createCard);
    },"score="+score + "&best="+best );


}

function manageReservation(id){

    let typePerson = $("#type-person option:selected" ).val();
    let data;
    let information = id.split('-');
    if(information[0] === "deny")
        data = false
    else
        data = true

    ajaxRequest('PUT', '../controllers/Rest.php/Participation/'+information[1],() =>{
        ajaxRequest('GET', '../controllers/Rest.php/User/notification?type='+typePerson,createCardNotification);

    },"choice="+data);


console.log(id)
}

$('#modify-profile').on('click',  ()  =>
    {
        event.preventDefault();
        let age = $( "#old-field" ).val();
        let city = $( "#city-field" ).val();
        let newPassword = $( "#password-field" ).val();
        let grade = $( "#grade-field" ).val();

        let array = {age, city, newPassword, grade};

        ajaxRequest('PUT', '../controllers/Rest.php/User', () => {

                ajaxRequest('GET', '../controllers/Rest.php/User',fillProfile);
            },
            "age="+age+"&city="+city
            + "&newPassword="+newPassword+"&grade="+grade);
    }
);

ajaxRequest('GET', '../controllers/Rest.php/User',fillProfile);

