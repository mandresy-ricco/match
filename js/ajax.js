// Creator : Alexandre GIROLT and Victor RICCO
// Mail : alexandre.girolt@isen-ouest.yncrea.fr,victor.ricco@isen-ouest.yncrea.fr
// Date end : 23/06/2022
// Topic : match management site

'use strict';

/**
 * Function responsible for sending the ajax request
 * @param type
 * @param url
 * @param callback
 * @param data
 */
function ajaxRequest(type, url, callback, data = null)
{
    let xhr;

    // Create XML HTTP request.
    xhr = new XMLHttpRequest();
    if (type === 'GET' && data != null)
        url += '?' + data;
    xhr.open(type, url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Add the onload function.
    xhr.onload = () =>
    {
        switch (xhr.status)
        {
            case 200:
            case 201:
                callback(JSON.parse(xhr.responseText));
                break;
            default:
                httpErrors(xhr.status);
        }
    };

    // send request
    xhr.send(data);
}


/**
 * Function responsible for sending error handling
 * @param errorCode
 */
function httpErrors(errorCode)
{
    let messages =
        {
            400: 'Requête incorrecte',
            401: 'Authentifiez vous',
            403: 'Accès refusé',
            404: 'Page non trouvée',
            500: 'Erreur interne du serveur',
            503: 'Service indisponible'
        };

    if (errorCode in messages)
    {
        console.log(messages[errorCode])
    }
}
