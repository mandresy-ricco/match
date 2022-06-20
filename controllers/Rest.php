<?php

class Rest{
    private $_ctrl;

    public function __construct()
    {
        $requestMethod = $_SERVER['REQUEST_METHOD'];
        $request = substr($_SERVER['PATH_INFO'], 1);
        $request = explode('/', $request);

        $requestRessource = array_shift($request);

        try {
            $controller = ucfirst(strtolower($requestRessource));

            $controllerClass = "Controller" . $controller;
            $controllerFile = "../controllers/".$controllerClass.".php";


            if (file_exists($controllerFile )) {

                require_once ($controllerFile);
                $this->_ctrl = new $controllerClass($requestMethod, $request);

            } else {
                throw new Exception('Page introuvable');
            }
        }catch (Exception $e){
            print_r($e->getMessage());
        }

    }

}

$Router_Rest = new Rest();