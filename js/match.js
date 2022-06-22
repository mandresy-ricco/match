function getParameter(idMatch)
{
    let url = window.location.search.substring(1);
    let varUrl = url.split('&');
    for (let i = 0; i < varUrl.length; i++)
    {
        let parameter = varUrl[i].split('=');
        if (parameter[0] === idMatch)
        {
            return parameter[1];
        }
    }
}

function replaceInfo(data)
{

    let infoDisplay = infoMatch.replace("--linkOne--", data.chemin_image);
    infoDisplay = infoDisplay.replace("--linkTwo--", data.chemin);
    infoDisplay = infoDisplay.replace("--sport--", data.nom_s);
    infoDisplay = infoDisplay.replace("--city--", data.ville);
    infoDisplay = infoDisplay.replace("--dateOne--", data.debut);
    infoDisplay = infoDisplay.replace("--dateTwo--", data.fin);
    infoDisplay = infoDisplay.replace("--address--", data.adresse);

    let nameOne = data.prenom[0].toUpperCase() +data.prenom.slice(1);
    let nameTwo = data.nom[0].toUpperCase() + data.nom.slice(1);
    infoDisplay = infoDisplay.replace("--nameOne--",nameOne);
    infoDisplay = infoDisplay.replace("--nameTwo--", nameTwo);
    return infoDisplay;
}

function replaceCardPlayer(data,number)
{

    console.log(data);

    let nameOne = data.prenom[0].toUpperCase() +data.prenom.slice(1);
    let nameTwo = data.nom[0].toUpperCase() + data.nom.slice(1);
    let infoDisplayPlayer = cardPlayer.replace("--nameOne--", nameOne);
    infoDisplayPlayer = infoDisplayPlayer.replace("--nameTwo--", nameTwo);
    infoDisplayPlayer = infoDisplayPlayer.replace("--link--", data.chemin);
    infoDisplayPlayer = infoDisplayPlayer.replace("--fs--", data.fs);
    infoDisplayPlayer = infoDisplayPlayer.replace("--number--", number);

    return infoDisplayPlayer;
}

function pageInfoRetrieval(data)
{
    console.log(data);

    $('#date-fill').text(data.debut+' → '+data.fin);
    $('#sport-and-city-fill').text("Match de "+data.nom_s+" à "+data.ville);
    $('#number-player-fill').text(data.count);
    $('#available-space-fill').text(data.nombre_joueur_max-data.count);
    $('#description-fill').text(data.description);
    $('#book-fill').text("Réserver ("+data.prix + "€)");


    $('#info-match').append(replaceInfo(data));

}

function pagePlayerRetrieval(data)
{
    let player = $('#player');
    player.html('');
    let counter = 1;

    if(data === false)
    {
        $('#information').attr('class', "text-center py-5 ");
    }
    else if(data !== false && data.length === undefined )
    {
        player.append(replaceCardPlayer(data,counter++));
    }
    else
    {
        data.forEach(element => {

                player.append(replaceCardPlayer(element,counter++));
            }

        );
    }

}

function main(){

    let id = getParameter('id_match');

    ajaxRequest('GET', '../controllers/Rest.php/Match/'+id,pageInfoRetrieval);
    ajaxRequest('GET', '../controllers/Rest.php/Match/'+id+'/Player',pagePlayerRetrieval);


}main();

$('#book-fill').on('click',  () =>
    {
        event.preventDefault();

        ajaxRequest('POST', '../controllers/Rest.php/Match',
            () =>{
            window.location.href = "../html/search.html";
        },"id_match="+getParameter('id_match'));

    }
);

