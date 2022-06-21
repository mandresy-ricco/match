<?php
session_start();
require_once('DataBase.php');

class Get extends DataBase{

    public function getAllMatch(){

        $request = 'SELECT * FROM match';
        $statement = $this->_bdd->prepare($request);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function getSortMatch($city,$full,$sport,$period){

        $request = 'SELECT * FROM match';
        $statement = $this->_bdd->prepare($request);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);
    }

    public function checkLogin($mail, $password){

        $request = 'SELECT mdp,id_personne FROM personne WHERE mail = :mail';
        $statement = $this->_bdd->prepare($request);
        $statement->bindParam(':mail', $mail);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);


        if($result['mdp'] === null)
            echo json_encode(0); // no mail
        else
        {
            if ($result['mdp'] != $password)
                echo json_encode(1);  // mistake password
            else {
                $_SESSION['id_personne'] = $result['id_personne'];
                echo json_encode(2); // fine
            }
        }

    }

    public function checkMail($mail,$passwordOne,$passwordTwo)
    {
        $request = 'SELECT id_personne FROM personne WHERE mail = :mail';
        $statement = $this->_bdd->prepare($request);
        $statement->bindParam(':mail', $mail);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);


        if($result['id_personne'] === null)
        {
            if ($passwordOne != $passwordTwo)
                echo json_encode(1);
            else
                echo json_encode(2); // Ok
        }else
            echo json_encode(0);



    }

}