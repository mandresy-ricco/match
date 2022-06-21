function connection(data)
{

    if(data === 0)
    {
        $("#mail-field").attr('class', "shadow-none form-control is-invalid");
        $("#error-one").attr('class', "invalid-feedback");
    }
    else if(data === 2)
    {
            window.location.href = "../html/search.html";
    }
    else if(data === 1)
    {
        console.log('error');
        $("#password-field").attr('class', "shadow-none form-control is-invalid");
        $("#error-two").attr('class', "invalid-feedback");
    }

}

function drop()
{
    $("#password-field").attr('class', "shadow-none form-control");
    $("#error-two").attr('class', "invalid-feedback d-none");
    $("#mail-field").attr('class', "shadow-none form-control");
    $("#error-one").attr('class', "invalid-feedback d-none");

}

$('#LogIn').on('click',  () =>
    {
        drop();
        event.preventDefault();

        let password = $( "#password-field" ).val();
        let mail =  $( "#mail-field" ).val();

        ajaxRequest('GET', '../controllers/Rest.php/User/connection/'+"?mail="+mail+"&password="+password ,connection);

    }
);

