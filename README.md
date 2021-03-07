# Projet de gestion des devoirs MBDS2 ESATIC

réalisé par :
## - Karimou yannick kader wesley
## - Kouadio Kouakou Abel Ulrich


# Accès

cas 1 : il a été hébergé sur Heroku dc disponible à l'adresse suivante: https://assignmentang.herokuapp.com/
Pour se connecter il faudra saisir les données suivantes:
### Nom de l'utilisateur: admindevoir
### Mot de passe : admin

cas 2: il faudra cloner le projet et par la suite lancer la commande "ng serve"
Il sera accessible sur l'addresse suivante : http://localhost:4200/
Pour se connecter il faudra saisir les données suivantes:
### Nom de l'utilisateur: admindevoir
### Mot de passe : admin

# Détails du travail réalisé

Dans notre travail , nous avons eu à :
# 1. ajouter la gestion login/password (cas mieux)
Nous avons créer la collection connections .
C'est à travers cette collection qu'on verifie si les données saisies par l'utilisateur . Lorsue les données concorcent , on peut avoir accès à l'ensemble du projet 
l'api pour la connection est disponible sur l'adresse: https://angularassig.herokuapp.com/api/connections

# 2. Ajouter de nouvelles propriétés au modèle des Assignments
A ce niveau nous avons suivi ce qui avait éte demandé.
L'api des assignments est disponible sur l'addresse:https://angularassig.herokuapp.com/api/assignments

# 3.Améliorer l'affichage des Assignments

Nous avons eu à générer 500 assignments avec https://mockaroo.com/ et nous les avons presenter ds les material card d'angular material. L'affichage des assignments a nécessité également bootstrap

# 4.utiliser des Formulaires de type Stepper

Ces formulaires ont étes utiliser dans le cas de l'ajout et la modification des devoirs

# 5 rendre le tout joli 

On a utilisé Bootstrap et angular material

# 6. utiliser le poginator d'angular material

Du fait du nombre important de données, nous avons eu à utiliser la pagination
Nous affichons 12 assignments par page

# 7.ajouter une fonctionnalité de recapitulatif

Il s'agit de donner pour chaque matière :
### - le nombre de devoirs rendus
### - le nombre de devoirs non rendus
### - le nombre de personnes ayant eu la moyenne dans la matière
### - le nombre de personnes n'ayant pas eu la moyenne dans la matière

# 8. mettre en place un loader pour le chargement des données

