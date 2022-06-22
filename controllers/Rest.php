<?php
session_start();

class Rest{
    private $_ctrl;

    public function __construct()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $request = substr($_SERVER['PATH_INFO'], 1);
        $request = explode('/', $request);

        $requestRessourceOne = array_shift($request);
        $requestRessourceTwo = array_shift($request);
        $requestRessourceTree = array_shift($request);


        try {
            $controller = ucfirst(strtolower($requestRessourceOne));

            $controllerClass = "Controller" . $controller;
            $controllerFile = "../controllers/".$controllerClass.".php";


            if (file_exists($controllerFile )) {

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

$Router_Rest = new Rest();