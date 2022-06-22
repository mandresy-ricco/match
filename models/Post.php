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

        $timestamp = strtotime($data[10]);
        $newDate = date("m-d-Y", $timestamp );

        $array = array(
            $data[0], $data[1], $data[2],
            $data[3],0, $data[4],
            "../image/test.jpg", $newDate ." ".$data[5],
            $newDate ." ".$data[6],$data[7],$data[8],
            $data[9],$_SESSION['id_personne']
        );

        $request = "INSERT INTO match (denomination, nombre_joueur_min, nombre_joueur_max, 
                   prix, statut, description, chemin_image, debut, 
                   fin, adresse, ville, id_sport, id_personne) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)";

        $stmt = $this->_bdd->prepare ($request);
        $stmt->execute($array);
        echo json_encode(1);
    }

    function createReservation($id_match){
        // false si c le client qui fais la demande
        $request = "INSERT INTO participation (demandeur, id_match, id_personne) VALUES (?,?,?)";
        $stmt = $this->_bdd->prepare ($request);
        $stmt->execute(array(
            0,
            $id_match,
            $_SESSION['id_personne']
        ));
        echo json_encode(1);

    }


}
