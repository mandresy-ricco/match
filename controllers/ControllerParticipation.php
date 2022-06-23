<?php
session_start();
require_once('../models/Get.php');
require_once('../models/Put.php');
require_once('../models/Delete.php');
require_once('../models/Post.php');

/**
 * Participation management class
 */
class ControllerParticipation{

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
                $this->typePost($rqRessource,$requestRessourceTwo);
                break;
            case "PUT":
                $this->typePut($rqRessource,$requestRessourceTwo);
                break;
            case "DELETE":
                $this->typeDelete($rqRessource,$requestRessourceTwo);
                break;
        }
    }


    /** Method dealing with the get resource
     * @param $rqRessource
     * @param $requestRessourceTwo
     * @return void
     */
    function typeGet($rqRessource,$requestRessourceTwo){

    }


    /** Method dealing with the post resource
     * @param $rqRessource
     * @param $requestRessourceTwo
     * @return void
     */
    function typePost($rqRessource,$requestRessourceTwo){

    }


    /** Method dealing with the delete resource
     * @param $rqRessource
     * @param $requestRessourceTwo
     * @return void
     */
    function typeDelete($rqRessource,$requestRessourceTwo){

    }


    /** Method dealing with the put resource
     * @param $rqRessource
     * @param $requestRessourceTwo
     * @return void
     */
    function typePut($rqRessource,$requestRessourceTwo){
        $this->_put = new Put();
        parse_str(file_get_contents('php://input'), $data);

        if(!empty($rqRessource) and empty($requestRessourceTwo) &&  !empty($data['choice'])){
            $this->_put->updateParticipation($data['choice'],$rqRessource);
        }

    }


}