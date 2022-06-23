<?php
session_start();
require_once('DataBase.php');

class Get extends DataBase{

    public function getAllMatch(){

        $request = '
           select count(*), m.id_match,m.ville,
               m.nombre_joueur_min,
               m.nombre_joueur_max,
               m.denomination titre,m.debut,
               m.fin,m.id_match,
               m.chemin_image,m.denomination,p2.nom,
               p2.prenom,a.chemin,a.chemin,s.denomination
            from match m
             JOIN participation p on m.id_match = p.id_match
             JOIN sport s on s.id_sport = m.id_sport
             JOIN personne p2 on p2.id_personne = m.id_personne
             JOIN avatar a on a.id_avatar = p2.id_avatar
             where m.statut = false
            group by  m.id_match,m.denomination,m.ville,
              m.nombre_joueur_min,m.nombre_joueur_max,
              m.denomination,m.debut,m.fin,m.id_match,
              m.chemin_image,p2.nom,p2.prenom,m.denomination,
              a.chemin,s.denomination;';


        $statement = $this->_bdd->prepare($request);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
    }

    public function getOneMatch($id)
    {
        $request = " 
       select count(*),  m.id_match,m.ville,
        m.nombre_joueur_min,m.nombre_joueur_max,
        m.denomination titre,m.debut, m.prix,
        m.fin,m.chemin_image,m.denomination,p2.nom,
        p2.prenom,a.chemin,a.chemin,s.denomination,
        m.adresse,s.denomination nom_s,m.description
        
        from match m
         JOIN participation p on m.id_match = p.id_match
         JOIN sport s on s.id_sport = m.id_sport
         JOIN personne p2 on p2.id_personne = m.id_personne
         JOIN avatar a on a.id_avatar = p2.id_avatar
        where p.id_match = :id 
        group by m.id_match,m.ville,
         m.nombre_joueur_min,
         m.nombre_joueur_max,
         m.denomination,m.debut,
         m.fin,
         m.chemin_image,m.denomination,p2.nom,
         p2.prenom,a.chemin,a.chemin,s.denomination,
         m.adresse
        ";


        $statement = $this->_bdd->prepare($request);
        $statement->bindParam(':id', $id,PDO::PARAM_INT);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);

        echo json_encode($result);

    }

    public function getSortMatch($city,$full,$sport,$period){

        $request = "
                select count(*), m.id_match,m.ville,
                m.nombre_joueur_min,
                m.nombre_joueur_max,
                m.denomination titre,m.debut,
                m.fin,m.id_match,
                m.chemin_image,m.denomination,p2.nom,
                p2.prenom,a.chemin,a.chemin,s.denomination
                from match m
                JOIN participation p on m.id_match = p.id_match
                JOIN sport s on s.id_sport = m.id_sport
                JOIN personne p2 on p2.id_personne = m.id_personne
                JOIN avatar a on a.id_avatar = p2.id_avatar
                WHERE m.ville = :city
                AND m.statut  = :statut
                AND EXTRACT(days FROM  m.debut - now()) <= :period
                AND lower(s.denomination) = lower(:name) 
                group by  m.id_match,m.denomination,m.ville,
                m.nombre_joueur_min,m.nombre_joueur_max,
                m.denomination,m.debut,m.fin,m.id_match,
                m.chemin_image,p2.nom,p2.prenom,m.denomination,
                a.chemin,s.denomination;";

        $statement = $this->_bdd->prepare($request);
        $statement->bindParam(':city', $city,PDO::PARAM_STR,50);
        $statement->bindParam(':statut', $full,PDO::PARAM_BOOL);
        $statement->bindParam(':period', $period);
        $statement->bindParam(':name', $sport,PDO::PARAM_STR,50);
        $statement->execute();

        $result = $statement->fetch(PDO::FETCH_ASSOC);
        echo json_encode($result);
    }

    public function getAllPlayer($id_match){

        $request = '
        select nom,prenom,fs.denomination fs,p.statut stat,a.chemin
        from participation p
        JOIN personne p2 on p2.id_personne = p.id_personne
        JOIN forme_sportive fs on fs.id_forme = p2.id_forme
        JOIN avatar a on a.id_avatar = p2.id_avatar
        JOIN match m on m.id_match = p.id_match
        where p.id_match = :id ;
         ';

        $statement = $this->_bdd->prepare($request);
        $statement->bindParam(':id', $id_match,PDO::PARAM_INT);
        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        if(empty($result))
            echo json_encode(false);
        else
            echo json_encode($result);
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
            if ($result['mdp'] != hash('md5', $password))
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

    public function getHistorical($type){

        if($type == 1){
            $request = '
              SELECT m.id_personne, m.denomination titre,m.debut,
                     m.fin,m.score,m.meilleur_joueur,s.denomination nom_s,
                     m.ville,m.adresse,m.id_match
                from match m
                JOIN personne p2 on p2.id_personne = m.id_personne
                JOIN sport s on s.id_sport = m.id_sport
                where m.id_personne = :id';
                $statement = $this->_bdd->prepare($request);
                $statement->bindParam(":id",$_SESSION['id_personne']);
        }
        elseif ($type == 2){

            $request = '
               SELECT m.id_personne, m.denomination titre,
                      m.debut,m.fin,m.score,m.meilleur_joueur,
                      m.ville,m.adresse,s.denomination nom_s,
                      m.id_match

                from match m
                JOIN personne p2 on p2.id_personne = m.id_personne
                JOIN participation p on m.id_match = p.id_match
                JOIN sport s on s.id_sport = m.id_sport
                where m.id_personne != :idOne and p.id_personne = :idTwo
';
                $statement = $this->_bdd->prepare($request);
                $statement->bindParam(":idOne",$_SESSION['id_personne']);
                $statement->bindParam(":idTwo",$_SESSION['id_personne']);

        }
        elseif ($type == 3){
            $request = '
               SELECT m.id_personne, m.denomination titre,
                      m.debut,m.fin,m.score,m.meilleur_joueur,
                      m.ville,m.adresse,m.id_match,s.denomination nom_s

                from match m
                JOIN personne p2 on p2.id_personne = m.id_personne
                JOIN participation p on m.id_match = p.id_match
                JOIN sport s on s.id_sport = m.id_sport
                where m.id_personne = :idOne and p.id_personne = :idTwo
';
            $statement = $this->_bdd->prepare($request);
            $statement->bindParam(":idOne",$_SESSION['id_personne']);
            $statement->bindParam(":idTwo",$_SESSION['id_personne']);
        }


        $statement->execute();
        $result = $statement->fetchAll(PDO::FETCH_ASSOC);
        for($i = 0 ; $i< count($result) ; $i++){
            $result[$i][] = (int)$_SESSION['id_personne'];
            $resultTwo[] = $result[$i];
        }

        echo json_encode($resultTwo);
    }

    public function getNotification($type){


        if($type != 3) {
            if ($type == 1) {

                $request = '
                select p2.prenom, p2.nom,m.ville,
                       m.debut,a.chemin,m.id_match,
                       p.id_reservation resa
                       
                from participation p
                JOIN match m on m.id_match = p.id_match
                JOIN personne p2 on p2.id_personne = p.id_personne
                JOIN avatar a on a.id_avatar = p2.id_avatar
            
                where m.id_personne = :id and p.statut is null and p.id_personne != :idTwo;';
                $statement = $this->_bdd->prepare($request);
                $statement->bindParam(':id', $_SESSION['id_personne'], PDO::PARAM_INT);
                $statement->bindParam(':idTwo', $_SESSION['id_personne'], PDO::PARAM_INT);
                $statement->execute();

            } else if ($type == 2) {
                $request = '
                select m.denomination,p.statut ,m.debut,m.ville,
                s.denomination nom_s
                from participation p
                join personne p2 on p2.id_personne = p.id_personne
                join match m on m.id_match = p.id_match
                join sport s on s.id_sport = m.id_sport
                where p.id_personne = :id and p.statut is not null ;';
                $statement = $this->_bdd->prepare($request);
                $statement->bindParam(':id', $_SESSION['id_personne'], PDO::PARAM_INT);
                $statement->execute();
            }

            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            for($i = 0 ; $i< count($result) ; $i++){
                $result[$i][] = (int) $type;
                $resultTwo[] = $result[$i];
            }
            echo json_encode($result);
        }else
            echo json_encode(false);


    }

    public function getOnePlayer(){
        $request = '
        select nom,prenom,fs.denomination fs,a.chemin,p2.ville
        from participation p
        JOIN personne p2 on p2.id_personne = p.id_personne
        LEFT JOIN forme_sportive fs on fs.id_forme = p2.id_forme
        JOIN avatar a on a.id_avatar = p2.id_avatar
        where p.id_personne = :id
         ';

        $statement = $this->_bdd->prepare($request);
        $statement->bindParam(':id', $_SESSION['id_personne'],PDO::PARAM_INT);
        $statement->execute();
        $result = $statement->fetch(PDO::FETCH_ASSOC);
        echo json_encode($result);
    }



}