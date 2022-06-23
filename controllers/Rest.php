<?php
session_start();

/**
 * Router class to retrieve the appropriate class
 */
class Rest{

    private $_ctrl;

    public function __construct()
    {
        // retrieve resource type
        $requestMethod = $_SERVER['REQUEST_METHOD'];

        // retrieve the url in order to cut it and retrieve the information
        $request = substr($_SERVER['PATH_INFO'], 1);
        $request = explode('/', $request);
        $requestRessourceOne = array_shift($request);
        $requestRessourceTwo = array_shift($request);
        $requestRessourceTree = array_shift($request);


        try {
            $controller = ucfirst(strtolower($requestRessourceOne));

            // create the controller and its location based on the resource
            $controllerClass = "Controller" . $controller;
            $controllerFile = "../controllers/".$controllerClass.".php";


            if (file_exists($controllerFile )) {

                // include and initialize this controller
                require_once ($controllerFile);
                $this->_ctrl = new $controllerClass($requestMethod,$requestRessourceTwo,$requestRessourceTree);

            } else {
                throw new Exception('Page introuvable');
            }
        }catch (Exception $e){
            print_r($e->getMessage());
        }

    }

}
// instantiate the class
$Router_Rest = new Rest();