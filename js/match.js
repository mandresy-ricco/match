// Creator : Alexandre GIROLT and Victor RICCO
// Mail : alexandre.girolt@isen-ouest.yncrea.fr,victor.ricco@isen-ouest.yncrea.fr
// Date end : 23/06/2022
// Topic : match management site

/**
 * Get id match from url
 * @param idMatch
 * @returns {string}
 */
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


/**
 * Registers and returns information
 * the template with the replaced information
 * @param data
 * @returns {string}
 */
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


/**
 * Registers and returns information
 * the template with the replaced information
 * @param data
 * @returns {string}
 */
function replaceCardPlayer(data)
{

    let statut;
    console.log(data)
    if(data.stat === true)
        statut = "Inscrit"
    else if (data.stat === undefined || data.stat === null)
        statut = "Non inscrit"

    let nameOne = data.prenom[0].toUpperCase() +data.prenom.slice(1);
    let nameTwo = data.nom[0].toUpperCase() + data.nom.slice(1);
    let infoDisplayPlayer = cardPlayer.replace("--nameOne--", nameOne);
    infoDisplayPlayer = infoDisplayPlayer.replace("--nameTwo--", nameTwo);
    infoDisplayPlayer = infoDisplayPlayer.replace("--link--", data.chemin);
    infoDisplayPlayer = infoDisplayPlayer.replace("--fs--", data.fs);
    infoDisplayPlayer = infoDisplayPlayer.replace("--number--","Statut: "+ statut);

    return infoDisplayPlayer;
}


/**
 * Responsible for initializing information in the page
 * @param data
 */
function pageInfoRetrieval(data)
{
    $('#available-space-fill').text(data.nombre_joueur_max);
    // load maps
    let address = data.adresse.replace(" ","+")+ "+" + data.ville ;
    $('#maps-field').attr('src','https://maps.google.com/maps?q='+address+"&output=embed");

    let availability =  $('#availability-fill');
    if(data.nombre_joueur_max-data.count === 0){

        $('#book-fill').prop('disabled', true);
        availability.text('Indisponible');
        availability.attr('class', "text-white bg-danger mt-2 py-2 px-3 h-75 rounded");
    }else{
        $('#book-fill').prop('disabled', false);
        availability.text('Libre');
        availability.attr('class', "text-white bg-green-500 mt-2 py-2 px-3 h-75 rounded");
    }


    $('#date-fill').text(data.debut+' → '+data.fin);
    $('#sport-and-city-fill').text("Match de "+data.nom_s+" à "+data.ville);

    $('#description-fill').text(data.description);
    $('#book-fill').text("Réserver ("+data.prix + "€)");


    $('#info-match').append(replaceInfo(data));

}


/**
 * Responsible for initializing information in the page
 * @param data
 */
function pagePlayerRetrieval(data)
{

    if(data.length === null || data.length === undefined ){
        $('#number-player-fill').text("0");

    }else{
        $('#number-player-fill').text(data.length);
    }


    let player = $('#player');
    player.html('');

    if(data === false)
    {
        $('#information').attr('class', "text-center py-5 ");
    }
    else if(data !== false && data.length === undefined )
    {
        player.append(replaceCardPlayer(data));
    }
    else
    {
        data.forEach(element => {

                player.append(replaceCardPlayer(element));
            }

        );
    }

}


/**
 * Main function
 */
function main(){

    // retrieve match id from url
    let id = getParameter('id_match');

    // retrieve match information
    ajaxRequest('GET', '../controllers/Rest.php/Match/'+id,pageInfoRetrieval);

    // retrieve information on the players of the match
    ajaxRequest('GET', '../controllers/Rest.php/Match/'+id+'/Player',pagePlayerRetrieval);


}main();

/**
 * Event type click in order to send the request and process it (reservation)
 */
$('#book-fill').on('click',  () =>
    {
        // prevent form submission
        event.preventDefault();

        // game booking
        ajaxRequest('POST', '../controllers/Rest.php/Match',
            () =>{
            // url redirect
            window.location.href = "../html/search.html";
        },"id_match="+getParameter('id_match'));

    }
);

