<?php
session_start();
require_once('../models/Get.php');
require_once('../models/Put.php');
require_once('../models/Delete.php');
require_once('../models/Post.php');

class ControllerUser{

    private $_get;
    private $_post;
    private $_put;
    private $_delete;

    function __construct($rqMethod,$rqRessource= null)
    {
        if($rqRessource == null)
            $rqRessource = '';

        switch ($rqMethod) {
            case "GET":
                $this->typeGet($rqRessource);
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

    public function typeGet($rqRessource)
    {
        $this->_get = new Get();

        if(isset($_GET['mail']) && $_GET['password'] && $rqRessource == 'connection')
            $this->_get->checkLogin($_GET['mail'],$_GET['password']);

        if(isset($_GET['mail']) && isset($_GET['mdpOne']) && isset($_GET['mdpTwo']) && $rqRessource == 'register')
            $this->_get->checkMail($_GET['mail'],$_GET['mdpOne'], $_GET['mdpTwo']);


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

    }


    public function typeDelete($rqRessource)
    {
        $this->_delete = new Delete();

    }

}