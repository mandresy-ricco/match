$('#organize').on('click',  () =>
    {
        event.preventDefault();

        let title = $( "#title-field" ).val();
        let textArea =  $( "#text-area-field" ).val();
        let city = $( "#city-field" ).val();
        let address =  $( "#address-field" ).val();
        let timeOne = $( "#time-one-field" ).val();
        let timeTwo =  $( "#time-two-field" ).val();
        let date = $( "#date-field" ).val();
        let price =  $( "#price-field" ).val();
        let min = $( "#min-field" ).val();
        let max =  $( "#max-field" ).val();
        let typeSport =  $( "#type-sport-field option:selected" ).val();

        ajaxRequest('POST', '../controllers/Rest.php/Match/', ()=>{
            console.log('Déposer ok')
        }
        , "title="+title+"&textArea="+textArea+"&city="+city+"&address="+address+"&timeOne="+timeOne
            +"&timeTwo="+timeTwo+"&date="+date+"&price="+price+"&min="+min+"&max="+max+"&typeSport="+typeSport
            );

    }
);