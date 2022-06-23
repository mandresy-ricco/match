
<!-- Creator : Alexandre GIROLT and Victor RICCO -->
<!-- Mail : alexandre.girolt@isen-ouest.yncrea.fr,victor.ricco@isen-ouest.yncrea.fr -->
<!-- Date end : 23/06/2022  -->
<!-- Topic : match management site -->

<?php

require_once('../config/constant.php');

/**
 * Database initializing class
 */
class DataBase
{

    protected $_bdd;

     public function __construct()
    {
        if (!isset($this->_bdd)) {
            try {

                $this->_bdd = new PDO('pgsql:host=' . DB_SERVER . ';port=' . DB_PORT . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD);
                $this->_bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            } catch (PDOException $exception) {

                error_log('Connection error: ' . $exception->getMessage());
                return false;
            }
        }
        return $this->_bdd;
    }
}