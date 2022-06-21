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

    function __construct($rqMethod,$rqRessource=null)
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
                ,$_POST['textArea'],$_POST['timeOne'],$_POST['timeTwo'],$_POST['typeSport'],$_POST['']
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