<?php

class Get{
    /**
     *
     * @param $conn
     * @param $mail
     * @param $password
     * @return int
     * function logIn that returns 0 if mail does not exist, 1 if the password matches
     * (connection approved) and 2 if the password does not match to the mail.
     */
    public function logIn($conn, $mail, $password){
        $request = 'SELECT mdp FROM personne WHERE mail = :mail';
        $statement = $conn->prepare($request);
        $statement->bindParam(':mail', $mail);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);

        if ($result == NULL){
            return 0;
        }
        elseif ($result == $password){
            return 1;
        }
        return 2;
    }

}