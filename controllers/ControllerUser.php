<?php
session_start();
require_once('../models/Get.php');
require_once('../models/Put.php');
require_once('../models/Delete.php');
require_once('../models/Post.php');

/**
 *  Match user class
 */
class ControllerUser{

    private $_get;
    private $_post;
    private $_put;
    private $_delete;

    function __construct($rqMethod,$rqRessource= null,$rqRessourceTwo=null)
    {
        switch ($rqMethod) {
            case "GET":
                $this->typeGet($rqRessource,$rqRessourceTwo);
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

    public function typeGet($rqRessource,$rqRessourceTwo)
    {
        $this->_get = new Get();

        if(!isset($rqRessource) && !isset($rqRessourceTwo)){
            $this->_get->getOnePlayer();
        }

        if(isset($_GET['mail']) && $_GET['password'] && $rqRessource == 'connection')
            $this->_get->checkLogin($_GET['mail'],$_GET['password']);

        if(isset($_GET['mail']) && isset($_GET['mdpOne']) && isset($_GET['mdpTwo']) && $rqRessource == 'register')
            $this->_get->checkMail($_GET['mail'],$_GET['mdpOne'], $_GET['mdpTwo']);

        if($rqRessource == 'historical' && isset($_GET['type']))
            $this->_get->getHistorical($_GET['type']);

        if($rqRessource == 'notification' && isset($_GET['type']))
            $this->_get->getNotification($_GET['type']);
    }


    public function typePost($rqRessource)
    {
        $this->_post = new Post();

        if(isset($_POST['firstName']) && $_POST['lastName'] && isset($_POST['passwordOne'])
            && isset($_POST['mail'])&&isset($_POST['profilePicture']) &&isset($_POST['city'])
            && $rqRessource == 'register')
        {
            $this->_post->createUser(
                array(
                    $_POST['firstName'],$_POST['lastName'], $_POST['mail'],$_POST['passwordOne']
                ,$_POST['city'],$_POST['profilePicture']
                )
            );
        }


    }


    public function typePut($rqRessource)
    {

        $this->_put = new Put();
        parse_str(file_get_contents('php://input'), $data);

        if(isset($data['age']) || isset($data['city']) || isset($data['newPassword']) || isset($data['grade'])) {
            $this->_put->modifyProfile(
                array($data['age'], $data['city'], $data['newPassword'], $data['grade'])
            );
        }

    }


    public function typeDelete($rqRessource)
    {
        $this->_delete = new Delete();

    }

}