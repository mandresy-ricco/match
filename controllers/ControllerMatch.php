<?php
session_start();
require_once('../models/Get.php');
require_once('../models/Put.php');
require_once('../models/Delete.php');
require_once('../models/Post.php');

class ControllerMatch{

    private $_get;
    private $_post;
    private $_put;
    private $_delete;

    function __construct($rqMethod,$rqRessource=null,$requestRessourceTwo=null)
    {
        switch ($rqMethod) {
            case "GET":
                $this->typeGet($rqRessource,$requestRessourceTwo);
                break;
            case "POST":
                $this->typePost($rqRessource);
                break;
            case "PUT":
                $this->typePut($rqRessource);
                break;
            case "DELETE":
                $this->typeDelete($rqRessource);
                break;
        }
    }

    public function typeGet($rqRessource,$requestRessourceTwo)
    {
        $this->_get = new Get();

        if (!isset($_GET['city']) && !isset($_GET['full']) && !isset($rqRessource) && !isset($requestRessourceTwo)){
            $this->_get->getAllMatch();
        }

        if(isset($rqRessource) && !isset($_GET['city']) && !isset($_GET['full']) && !isset($requestRessourceTwo)){

            $this->_get->getOneMatch($rqRessource);

        }

        if($requestRessourceTwo == "Player" && isset($rqRessource)){

           $this->_get->getAllPlayer($rqRessource);
        }

        if ( isset($_GET['city']) && isset($_GET['full']) && $_GET['sport'] != ""  && $_GET['period'] != "" ) {
            $this->_get->getSortMatch($_GET['city'], $_GET['full'], $_GET['sport'], $_GET['period']);
        }


    }


    public function typePost($rqRessource)
    {
        $this->_post = new Post();


        if(isset($_POST['title']) && $_POST['min'] && isset($_POST['max'])
            && isset($_POST['price'])&&isset($_POST['textArea']) &&isset($_POST['timeOne'])
            && isset($_POST['timeTwo']))
        {
            $this->_post->createMatch(
                array(
                    $_POST['title'],$_POST['min'], $_POST['max'],$_POST['price']
                ,$_POST['textArea'],$_POST['timeOne'],$_POST['timeTwo'],$_POST['address'],$_POST['city']
                ,$_POST['typeSport'],$_POST['date']
                )
            );
        }

        if(isset($_POST['id_match'])){
            $this->_post->createReservation($_POST['id_match']);
        }


    }


    public function typePut($rqRessource)
    {
        $this->_put = new Put();

    }


    public function typeDelete($rqRessource)
    {
        $this->_delete = new Delete();

    }


}