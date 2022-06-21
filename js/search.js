function createCard(data)
{
    $('#all-card').html('');

    data.forEach((element) => {

        let card = card_template.replace("--Football--",element.denomination);
        card = card.replace("--city--",element.ville);
        card = card.replace("--max--",element.nombre_joueur_max);
        card = card.replace("--maxTwo--",element.nombre_joueur_max);
        card = card.replace("--DateOne--",element.debut);
        card = card.replace("--DateTwo--",element.fin);
        card = card.replace("--id--",element.id_match);
        card = card.replace("--link--",element.chemin_image);
        let nameOne = element.prenom[0].toUpperCase()+ element.prenom.slice(1);
        let nameTwo = element.nom[0].toUpperCase()+ element.nom.slice(1);
        card = card.replace("--Organisateur--", nameOne +' ' +nameTwo );

        $('#all-card').append(card);

    });
}

$( "#search-field" ).on('click',  () =>
    {

        let city = $( "#city-field" ).val();
        let sport = $( "#sport-field option:selected" ).val();
        let periode =  $( "#period-field option:selected" ).val();
        let full = $('input[name=full]').is(':checked');


        console.log("full",full);
        console.log("sport",sport);
        console.log("city",city);
        console.log("periodisen", periode);

        ajaxRequest('GET', '../controllers/Rest.php/Match'+'&period='+period+
            "&city="+city+"&full="+full+"&sport="+sport,createCard);
    }
);



ajaxRequest('GET', '../controllers/Rest.php/Match',createCard)
