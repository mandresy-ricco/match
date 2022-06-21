<?php
require_once('DataBase.php');
session_start();

class Post extends DataBase
{

    public function createUser($data)
    {
        $request = "INSERT INTO personne (prenom, nom,mail,mdp,ville,id_avatar) VALUES (?,?,?,?,?,?)";

        //recovery of the password to encrypt it
        $password = $data[3];
        $encryptPassword = hash('md5', $password);

        //new array with the encrypted password
        $array = array(
            $data[0], $data[1], $data[2], $encryptPassword, $data[4], $data[5]
        );

        $stmt = $this->_bdd->prepare ($request);
        $stmt->execute($array);
        echo json_encode(1);
    }

    public function createMatch($data)
    {

        $array = array(
            $data[0], $data[1], $data[2],
            $data[3], false, $data[4],
            "../images/test.jpg", $data[5],
            $data[6], $data[7],1,$_SESSION['id_personne']

        );

        $request = "INSERT INTO match (denomination, nombre_joueur_min, 
                   nombre_joueur_max, prix, statut, description, chemin_image, 
                   debut, fin, id_sport, id_lieu, id_personne) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
        $stmt = $this->_bdd->prepare ($request);
        $stmt->execute($array);
        echo json_encode(1);
    }


}
