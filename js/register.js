function register(data)
{

    if(data === true)
    {
        let firstName = $( "#first-name-field" ).val();
        let lastName = $( "#last-name-field" ).val();
        let passwordOne = $( "#password-one-field" ).val();
        let passwordTwo = $( "#password-two-field" ).val();
        let mail = $("#mail-field").val();

        ajaxRequest('POST', 'controllers/Rest.php/Personne/' ,register,
            "firstName="+firstName+"&lastName="+lastName+"&passwordOne="+passwordOne
            +"&passwordTwo="+passwordTwo +"&mail="+mail);

    }

}

$('#register').on('click',  ()  =>
    {
        event.preventDefault();
        ajaxRequest('GET', 'controllers/Rest.php/Personne/'+"?mail="+$( "#mail-field" ).val() ,register);
    }
);