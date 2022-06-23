<?php
require_once('DataBase.php');
session_start();

/**
 *  class handling post
 */
class Put extends DataBase{


    /** Update the game
     * @param $score
     * @param $best
     * @param $id
     * @return void
     */
    public function updateMatch ($score,$best,$id){

        $request = 'UPDATE match set meilleur_joueur = :best,score = :score  WHERE id_match = :id_match';
        $statement = $this->_bdd->prepare($request);
        $statement->bindParam(':best', $best);
        $statement->bindParam(':score',$score );
        $statement->bindParam(':id_match', $id);
        $statement->execute();

        echo json_encode(1);
    }


    /** Changed the status (accepted, denied) of the user in a match
     * @param $choice
     * @param $rqRessource
     * @return void
     */
    public function updateParticipation ($choice,$rqRessource){
        $request = 'UPDATE participation set statut = :choice  WHERE id_reservation = :id_r';
        $statement = $this->_bdd->prepare($request);
        $statement->bindParam(':choice', $choice);
        $statement->bindParam(':id_r', $rqRessource);
        $statement->execute();

        echo json_encode(1);
    }


    /** Change profile (age...)
     * @param $data
     * @return void
     */
    public function modifyProfile($data){
        if (!empty($data[0])){
            $request = 'UPDATE personne set age = :age WHERE id_personne = :id_personne';
            $statement = $this->_bdd->prepare($request);
            $statement->bindParam(':age', $data[0]);
            $statement->bindParam(':id_personne', $_SESSION['id_personne']);
            $statement->execute();
        }
        if (!empty($data[1])){
            $request = 'UPDATE personne set ville = :ville WHERE id_personne = :id_personne';
            $statement = $this->_bdd->prepare($request);
            $statement->bindParam(':ville', $data[1]);
            $statement->bindParam(':id_personne', $_SESSION['id_personne']);
            $statement->execute();
        }
        if (!empty($data[2])){
            $encryptedPassword = hash("md5", $data[2]);
            $request = 'UPDATE personne set mdp = :password WHERE id_personne = :id_personne';
            $statement = $this->_bdd->prepare($request);
            $statement->bindParam(':password', $encryptedPassword);
            $statement->bindParam(':id_personne', $_SESSION['id_personne']);
            $statement->execute();
        }
        if (!empty($data[3])){
            $request = 'UPDATE personne set note_site = :note WHERE id_personne = :id_personne';
            $statement = $this->_bdd->prepare($request);
            $statement->bindParam(':note', $data[3]);
            $statement->bindParam(':id_personne', $_SESSION['id_personne']);
            $statement->execute();
        }
        echo json_encode(1);


}



}