function cardReplace(element)
{
    let card = card_template.replace("--sport--", element.denomination);
    card = card.replace("--city--", element.ville);
    card = card.replace("--max--", element.nombre_joueur_max);
    card = card.replace("--maxTwo--", element.nombre_joueur_max);
    card = card.replace("--DateOne--", element.debut);
    card = card.replace("--DateTwo--", element.fin);
    card = card.replace("--id--", element.id_match);
    card = card.replace("--link--", element.chemin_image);
    card = card.replace("--linkTwo--", element.chemin);
    card = card.replace("--title--", element.titre);
    card = card.replace("--count--", element.count);

    let nameOne = element.prenom[0].toUpperCase() + element.prenom.slice(1);
    let nameTwo = element.nom[0].toUpperCase() + element.nom.slice(1);
    card = card.replace("--Organisateur--", nameOne + ' ' + nameTwo);

    return card;
}


function createCard(data)
{
    console.log(data);
    $('#all-card').html('');

    if(data === false)
    {
        $('#unless').attr('class', "d-none");
        $('#information').attr('class', "text-center mt-4");

    }
    else if(data !== false && data.length === undefined )
    {
        let card = cardReplace(data);
        $('#all-card').append(card);
    }
    else
    {
        data.forEach(element => {

            let card = cardReplace(element);
            $('#all-card').append(card);
        }

    );
    }

}

$( "#search-field" ).on('click',  () =>
    {
        $('#information').attr('class', "d-none");
        $('#unless').attr('class', "col-3 mt-5 border border-3  d-none d-lg-block");
        event.preventDefault()

        let city = $( "#city-field" ).val();
        let sport = $( "#sport-field option:selected" ).text();
        let period =  $( "#period-field option:selected" ).val();
        let full = $('input[name=full]').is(':checked');



        ajaxRequest('GET', '../controllers/Rest.php/Match'+'?period='+period+
            "&city="+city+"&full="+full+"&sport="+sport,createCard);
    }
);



ajaxRequest('GET', '../controllers/Rest.php/Match',createCard)
