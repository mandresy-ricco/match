function redirection(){

    window.location.replace("../html/connection.html");
}

function register(data)
{

    if(data === 2)
    {
        let passwordOne = $( "#password-one-field" ).val();
        let firstName = $( "#first-name-field" ).val();
        let lastName = $( "#last-name-field" ).val();
        let mail = $("#mail-field").val();
        let profilePicture =  $("#profiles-field option:selected" ).val();
        let city = $( "#city-field" ).val();

        ajaxRequest('POST', '../controllers/Rest.php/User/register' , () => {console.log('insertion ok')},
            "firstName="+firstName+"&lastName="+lastName+"&passwordOne="+passwordOne
            +"&mail="+mail+"&profilePicture="+profilePicture+ "&city="+city);

        setTimeout(redirection, 1000);



    }
    else if(data === 1)
    {
        $("#password-one-field").attr('class', "shadow-none form-control is-invalid");
        $("#error-password-one").attr('class', "invalid-feedback");
        $("#password-two-field").attr('class', "shadow-none form-control is-invalid");
        $("#error-password-two").attr('class', "invalid-feedback");

    }
    else if (data === 0)
    {
        $("#mail-field").attr('class', "shadow-none form-control is-invalid");
        $("#error-mail").attr('class', "invalid-feedback");
    }

}

function drop()
{
    $("#mail-field").attr('class', "shadow-none form-control");
    $("#error-mail").attr('class', "invalid-feedback d-none");
    $("#password-one-field").attr('class', "shadow-none form-control");
    $("#error-password-one").attr('class', "invalid-feedback d-none");
    $("#password-two-field").attr('class', "shadow-none form-control");
    $("#error-password-two").attr('class', "invalid-feedback d-none");
}

$('#register').on('click',  ()  =>
    {
        drop();
        event.preventDefault();
        ajaxRequest('GET', '../controllers/Rest.php/User/register'+"?mail="+$( "#mail-field" ).val()
            + "&mdpOne="+$("#password-one-field" ).val()+ "&mdpTwo="+ $("#password-two-field" ).val(),register);
    }
);
