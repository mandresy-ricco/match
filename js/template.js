let card_template = "<div class=\"ms-5  mt-4 \">\n" +
    "                <div class=\"row mt-sm-5 bg-white  rounded box-shadow-md\">\n" +
    "                <div class=\" col-4 mt-3 my-xl-auto \" >\n" +
    "                    <img alt=\"\" src=\"--link--\" class=\"rounded-sm img-thumbnail\" >\n" +
    "                </div>\n" +
    "                <div class=\" col-sm-8 \">\n" +
    "                    <div class=\" \">\n" +
    "                        <div class=\"card-body pt-1 px-0\">\n" +
    "                            <div class=\"d-flex flex-row justify-content-between mb-0 px-3\">\n" +
    "                                <small class=\"text-muted mt-1\"></small>\n" +
    "                                <span>--sport--</span>\n" +
    "                            </div>\n" +
    "                            <h6 class=\"d-flex flex-row justify-content-between px-3 pb-1\">\n" +
    "                                --title-- à --city--\n" +
    "                            </h6>\n" +
    "                            <div class=\"d-flex flex-row justify-content-between p-3 bg-gray-50 font-size-1\">\n" +
    "                                Bonjour, aujourd'hui nous mettons en place un match dans lequel les membres des deux équipes vont pouvoir\n" +
    "              s'affronter. Afin que tout se déroule pour le mieux, nous vous demandons d'être respectueux sur le terrain.\n" +
    "              Bon match et amusez-vous.\n" +
    "" +
    "                      </div>\n" +
    "\n" +
    "                            <div class=\"d-flex col ms-3 pt-2\">\n" +
    "                                <div>\n" +
    "                                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"bi bi-person\" viewBox=\"0 0 16 16\">\n" +
    "                                        <path d=\"M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z\"/>\n" +
    "                                    </svg>\n" +
    "                                </div>\n" +
    "                                <div class=\"\">X--max--</div>\n" +
    "                                <div class=\"bg-principal rounded-sm text-white font-size-2 ms-2 mt-1\">--count--/--maxTwo--</div>\n" +
    "\n" +
    "                            </div>\n" +
    "\n" +
    "                            <hr class=\"mt-2 mx-3 \">\n" +
    "                            <div class=\"text-gray-400 font-size-1 ps-3 pt-0\">Du --DateOne-- à --DateTwo--</div>\n" +
    "\n" +
    "                            <div class=\"d-flex col justify-content-between text-principal mt-3\">\n" +
    "                                <div>\n" +
    "                                    <div class=\"d-flex col font-size-1 ms-2 \">\n" +
    "                                        <div class=\"pt-1\"><img height=\"15\" width=\"15\" alt=\"\" class=\"rounded-full\" src=\"--linkTwo--\"></div>\n" +
    "                                        <div class=\"ms-1 pt-1 pb-2\">--Organisateur--</div>\n" +
    "                                    </div>\n" +
    "\n" +
    "                                </div>\n" +
    "                                <div>\n" +
    "                                    <div class=\"d-flex col\">\n" +
    "                                        <a style='text-principal' href='../html/match.html?id_match=--id--'><div class=\"font-size-1 pt-1\">En savoir plus</div></a>\n" +
    "                                        <div class=\"ps-1 pe-1\">\n" +
    "                                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-arrow-right\" viewBox=\"0 0 16 16\">\n" +
    "                                                <path fill-rule=\"evenodd\" d=\"M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z\"/>\n" +
    "                                            </svg>\n" +
    "                                        </div>\n" +
    "                                    </div>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            </div>";


let infoMatch = "<div class=\"row blur box-shadow-sm\">\n" +
    "        <div class=\"col-2 col-lg-4\"></div>\n" +
    "        <div class=\"col\">\n" +
    "            <div class=\"d-flex row py-4 \">\n" +
    "                <div class=\"\">\n" +
    "                    <img src=\"--linkOne--\" class=\"rounded-xl\" height=\"170\" width=\"260\"/>\n" +
    "                </div>\n" +
    "                <div class=\"text-white mt-3\">\n" +
    "                    <h1 >Match de --sport-- --city--</h1>\n" +
    "                    <div class=\"font-size-4\">De --dateOne-- à --dateTwo--</div>\n" +
    "                    <div class=\"font-size-4\">--address--</div>\n" +
    "                </div>\n" +
    "                <div class=\"d-flex col\">\n" +
    "                    <div><img alt=\"\" class=\"rounded-xl\" src=\"--linkTwo--\" height=\"20\" width=\"20\"/></div>\n" +
    "                    <div class=\"text-principal ps-2 mt-1\">--nameOne-- --nameTwo--</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            </div>\n" +
    "\n" +
    "    </div>";

let cardPlayer = "<div class=\"col-7 col-sm-5 col-md-4 col-xl-4 col-xxl-3 \">\n" +
    "                    <div class=\" row  mt-4 bg-principal box-shadow-sm rounded-sm de \">\n" +
    "                        <div class=\"col-12 mt-4\" >\n" +
    "                            <img alt=\"\" src=\"--link--\" height='100' width='100'  class=\" ms-4 w-75 h-75 box-shadow-md rounded-circle\"/>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-12\">\n" +
    "                            <div class=\"text-center  text-white\">\n" +
    "                                <span class=\"font-size-4 \">--nameOne-- --nameTwo--</span><br/>\n" +
    "                                <span class=\"font-size-3 overflow-auto \">FS : --fs--</span>\n" +
    "                                <hr/>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "                        <div class=\"col-12 bg-white fs-6 jr  text-center pt-4\" >Joueur --number--</div>\n" +
    "                    </div>\n" +
    "                </div>";