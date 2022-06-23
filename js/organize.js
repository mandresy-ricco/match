// Creator : Alexandre GIROLT and Victor RICCO
// Mail : alexandre.girolt@isen-ouest.yncrea.fr,victor.ricco@isen-ouest.yncrea.fr
// Date end : 23/06/2022
// Topic : match management site

/**
 * Event type click in order to send the request and process it (drop a match)
 */
$('#organize').on('click',  () => {

        // prevent form submission
        event.preventDefault();

        // retrieve the value of the ids
        let title = $("#title-field").val();
        let textArea = $("#text-area-field").val();
        let city = $("#city-field").val();
        let address = $("#address-field").val();
        let timeOne = $("#time-one-field").val();
        let timeTwo = $("#time-two-field").val();
        let date = $("#date-field").val();
        let price = $("#price-field").val();
        let min = $("#min-field").val();
        let max = $("#max-field").val();
        let typeSport = $("#type-sport-field option:selected").val();

        // request to propose a new match
    ajaxRequest('POST', '../controllers/Rest.php/Match/', ()=>{

            // url redirect
            window.location.href = "../html/search.html";

        }
        , "title="+title+"&textArea="+textArea+"&city="+city+"&address="+address+"&timeOne="+timeOne
        +"&timeTwo="+timeTwo+"&date="+date+"&price="+price+"&min="+min+"&max="+max+"&typeSport="+typeSport
    );


    }
);