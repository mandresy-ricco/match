function addMatch(data)
{


}



//ajaxRequest('GET', '../controllers/Rest.php/Match/recent',addMatch);



$( "#search-field" ).on('click',  () =>
    {
        let city = $( "#city-field" ).val();
        let sport = $( "#sport-field" ).val();
        let period =  $( "#period-field option:selected" ).val()
        let full = $('input[name=full]').is(':checked')

        console.log("period",period);
        console.log("full",full);
        console.log("sport",sport);
        console.log("city",city);
    }
);