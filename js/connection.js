// Creator : Alexandre GIROLT and Victor RICCO
// Mail : alexandre.girolt@isen-ouest.yncrea.fr,victor.ricco@isen-ouest.yncrea.fr
// Date end : 23/06/2022
// Topic : match management site

/**
 * user login manager
 * @param data
 */
function connection(data)
{

    // action based on index return

    if(data === 0) // wrong mail
    {
        console.log('ttt');
        $("#mail-field").attr('class', "shadow-none form-control is-invalid");
        $("#error-one").attr('class', "invalid-feedback");
    }
    else if(data === 2) // ok without errors
    {
            window.location.href = "../html/search.html";
    }
    else if(data === 1) // wrong password
    {
        $("#password-field").attr('class', "shadow-none form-control is-invalid");
        $("#error-two").attr('class', "invalid-feedback");
    }

}


/**
 * Update field
 */
function drop()
{
    $("#password-field").attr('class', "shadow-none form-control");
    $("#error-two").attr('class', "invalid-feedback d-none");
    $("#mail-field").attr('class', "shadow-none form-control");
    $("#error-one").attr('class', "invalid-feedback d-none");

}


/**
 * Event type click in order to send the request and process it
 */
$('#LogIn').on('click',  () =>
    {
        // Update field
        drop();

        // prevent form submission
        event.preventDefault();

        let password = $( "#password-field" ).val();
        let mail =  $( "#mail-field" ).val();

        // ajax request
        ajaxRequest('GET', '../controllers/Rest.php/User/connection/'+"?mail="+mail+"&password="+password ,connection);

    }
);

