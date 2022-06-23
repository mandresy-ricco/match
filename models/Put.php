<?php
require_once('DataBase.php');
session_start();

class Put extends DataBase{


    public function updateMatch ($score,$best,$id){

        $request = 'UPDATE match set meilleur_joueur = :best,score = :score  WHERE id_match = :id_match';
        $statement = $this->_bdd->prepare($request);
        $statement->bindParam(':best', $best);
        $statement->bindParam(':score',$score );
        $statement->bindParam(':id_match', $id);
        $statement->execute();

        echo json_encode(1);
    }



}