function connection(data)
{

    if(data === 0)
    {
        $("#mail-field").attr('class', "shadow-none form-control is-invalid");
        $("#error-one").attr('class', "invalid-feedback");
    }
    else if(data === 1)
    {
        window.onload = () =>
        {
            location.href = "/APACHE_monsite/projet_match2/html/welcome.html";
        }
    }
    else if(data === 2)
    {
        $("#password-field").attr('class', "shadow-none form-control is-invalid");
        $("#error-two").attr('class', "invalid-feedback");
    }

}

$('#LogIn').on('click',  () =>
    {

        event.preventDefault();
        let password = $( "#password-field" ).val();
        let mail =  $( "#mail-field" ).val();
        ajaxRequest('GET', '../controllers/Rest.php/Personne/'+"?mail="+mail+"&password="+password ,connection);

    }
);