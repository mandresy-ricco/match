// Creator : Alexandre GIROLT and Victor RICCO
// Mail : alexandre.girolt@isen-ouest.yncrea.fr,victor.ricco@isen-ouest.yncrea.fr
// Date end : 23/06/2022
// Topic : match management site
/**
 *  Redirection to another page
 */
function redirection(){

    window.location.replace("../html/connection.html");
}


/**
 * Responsible for creating a user in the database
 * @param data
 */
function register(data)
{

    // action based on index return

    if(data === 2) // everything went well
    {

        // retrieve value
        let passwordOne = $( "#password-one-field" ).val();
        let firstName = $( "#first-name-field" ).val();
        let lastName = $( "#last-name-field" ).val();
        let mail = $("#mail-field").val();
        let profilePicture =  $("#profiles-field option:selected" ).val();
        let city = $( "#city-field" ).val();

        // add new user to database
        ajaxRequest('POST', '../controllers/Rest.php/User/register' , () => {console.log('insertion ok')},
            "firstName="+firstName+"&lastName="+lastName+"&passwordOne="+passwordOne
            +"&mail="+mail+"&profilePicture="+profilePicture+ "&city="+city);

        // redirect after one second
        setTimeout(redirection, 1000);


    }
    else if(data === 1) // password do not match
    {
        // retrieve value
        $("#password-one-field").attr('class', "shadow-none form-control is-invalid");
        $("#error-password-one").attr('class', "invalid-feedback");
        $("#password-two-field").attr('class', "shadow-none form-control is-invalid");
        $("#error-password-two").attr('class', "invalid-feedback");

    }
    else if (data === 0) // email already used
    {
        $("#mail-field").attr('class', "shadow-none form-control is-invalid");
        $("#error-mail").attr('class', "invalid-feedback");
    }

}


/**
 * updated error
 */
function drop()
{
    $("#mail-field").attr('class', "shadow-none form-control");
    $("#error-mail").attr('class', "invalid-feedback d-none");
    $("#password-one-field").attr('class', "shadow-none form-control");
    $("#error-password-one").attr('class', "invalid-feedback d-none");
    $("#password-two-field").attr('class', "shadow-none form-control");
    $("#error-password-two").attr('class', "invalid-feedback d-none");
}


/**
 * Event type click in order to send the request and process it (register)
 */
$('#register').on('click',  ()  =>
    {
        // updated error
        drop();

        // prevent send form
        event.preventDefault();

        // retrieve information in order to compare them with those of the user
        ajaxRequest('GET', '../controllers/Rest.php/User/register'+"?mail="+$( "#mail-field" ).val()
            + "&mdpOne="+$("#password-one-field" ).val()+ "&mdpTwo="+ $("#password-two-field" ).val(),register);
    }
);
