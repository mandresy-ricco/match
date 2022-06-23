<?php
session_start();
require_once('../models/Get.php');
require_once('../models/Put.php');
require_once('../models/Delete.php');
require_once('../models/Post.php');

/**
 * Match management class
 */
class ControllerMatch{

    private $_get;
    private $_post;
    private $_put;
    private $_delete;

    /** Calls the corresponding method according to the type of the resource
     * @param $rqMethod
     * @param $rqRessource
     * @param $requestRessourceTwo
     */
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

    /** Method dealing with the get resource
     * @param $rqRessource
     * @param $requestRessourceTwo
     * @return void
     */
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

    /** Method dealing with the post resource
     * @param $rqRessource
     * @return void
     */
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


    /** Method dealing with the put resource
     * @param $rqRessource
     * @return void
     */
    public function typePut($rqRessource)
    {

        $this->_put = new Put();
        parse_str(file_get_contents('php://input'), $data);

        if(isset($rqRessource) && !empty($data['score']) &&!empty($data['best'])) {
            $this->_put->updateMatch($data['score'],$data['best'],$rqRessource);
        }

    }


    /** Method dealing with the delete resource
     * @param $rqRessource
     * @return void
     */
    public function typeDelete($rqRessource)
    {
        $this->_delete = new Delete();

    }


}