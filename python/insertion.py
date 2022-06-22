import random

villes = list({'Nantes', 'Caen', 'Brest', 'Rennes'})
forme = {'athlète', 'bonne', 'correcte', 'mauvaise'}
sport = {'football', 'basketball', 'handball', 'rugby'}
adresse = list({'Route de Saint-Joseph', '11 Boulevard Clovis Constant', '24 Route de Vannes', '52 Avenue de la Victoire',
           '34 Rue des Vignes', '26 Boulevard Jules Verne', '56 Route de Paris', '13 Rue de la Plage',
           '6 Rue Alphonse Dutertre', '15 Rue des Roses', '28 Allée Racine', '8 Boulevard Ampère'})
prenom = list({'victor', 'alexandre', 'paul', 'vincent', 'arthur', 'camille', 'emma', 'clarisse', 'enora', 'elsa'})
nom = list({'plessier', 'dupont', 'dutertre', 'douillard', 'gorin', 'arnould', 'dalifard', 'barbier', 'belleil',
            'poiron'})
chemin = "images/image.png"
mail = {}
string = {}

def removeSpaces(string):
    return string.replace(" ", "")

for i in range(10) :
    mail[i] = " ".join([prenom[i], ".", nom[i], "@gmail.com"])

for i in forme :
    print("INSERT INTO forme_sportive (denomination) values ('", i, "');", sep='')

for i in range(4) :
    print("INSERT INTO avatar (chemin) values ('../image/", i+1 ,".png');", sep='')

for i in sport :
    print("INSERT INTO sport (denomination) values ('", i, "');", sep='')

for i in range(10) :
    x = random.randint(1, 4)
    a = random.randint(1,4)
    b = random.randint(16,40)
    print("INSERT INTO personne (prenom, nom, age, mail, mdp, ville, id_forme, id_avatar) values ('", prenom[i],
          "', '", nom[i], "', ", b, ", '", removeSpaces(mail[i]), "', 'password', '", villes[a-1], "', ", a, ", ", x, ");", sep='')

for i in range(4) :
    for j in range(10) :
        x = random.randint(1,4)
        y = random.randint(1,10)
        heure = random.randint(13, 21)
        date = random.randint(1, 30)
        print("INSERT INTO match (denomination, nombre_joueur_min, nombre_joueur_max, prix, statut, description, "
              "chemin_image, debut, fin, adresse, ville, id_sport, id_personne) values ('match', 4, 10, 5, false,"
              " 'Ceci est un match', '../image/test.jpg', '", date, "-jul-2022 ", heure, ":00', '", date, "-jul-2022 ",
              heure+1, ":00', '", adresse[y], "', '", villes[x-1], "', ", i+1, ", ", y, ");", sep='')


for i in range(10) :
    for j in range(3) :
        x = random.randint(1, 39)
        y = random.randint(1,10)
        print("INSERT INTO participation (demandeur, id_match, id_personne) values (false, ", x,", ", y,");", sep='')