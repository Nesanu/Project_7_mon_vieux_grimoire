URL: http://localhost:3000/

# **Mon Vieux Grimoire - API REST** *(Projet OpenClassrooms)*  

## **Introduction**  
Bienvenue dans ce projet OpenClassrooms, où l’objectif est de concevoir une **API REST sécurisée** pour le site **MonVieuxGrimoire.com**. Cette API permettra aux utilisateurs d’accéder, d’ajouter et de gérer des contenus de manière sécurisée.  

Ce développement a nécessité de maîtriser plusieurs concepts clés :  
✅ L’authentification et la sécurisation des données  
✅ La gestion des requêtes avec des **middlewares**  
✅ La structuration du projet via des **contrôleurs maison**  
✅ L’interaction avec une base de données **MongoDB**  

Après avoir affronté des bugs imprévisibles et traversé des océans de commits douteux, l’API est enfin prête à l’emploi !  

## **Installation**  
Avant de plonger dans le code, assurez-vous d’avoir :  

- 📌 **MongoDB** : Un compte et une base de données configurée  
- 📌 **Node.js** : La version la plus récente installée  
- 📌 **npm** : Pour gérer les dépendances  
- 📌 **GitHub** *(optionnel)* : Pratique pour forker et suggérer des améliorations  

### **Étapes d’installation**  
1️⃣ **Clonez le projet** :  

```bash
git clone https://github.com/utilisateur/monvieuxgrimoire.git
cd monvieuxgrimoire
```  
2️⃣ **Installez les dépendances** :  

```bash
npm install
```  
3️⃣ **Créez un fichier `.env`** et configurez-y vos variables (MongoDB, JWT, etc.).  

4️⃣ **Lancez le serveur** :  
```bash
npm start
```  
L’API est maintenant opérationnelle !  

## **Endpoints principaux**  
L’API propose plusieurs routes essentielles pour la gestion du contenu :  
- **Authentification** : Inscription, connexion avec JWT  
- **Livres** : Ajout, modification, suppression et consultation  
- **Utilisateurs** : Gestion des profils  

### Authentification

| Point d'accès           | Authentification | Corps de la requête (cas échéant)               | Type de réponse attendu            | Fonction                                                                                                 |
|-------------------------|------------------|-------------------------------------------------|------------------------------------|----------------------------------------------------------------------------------------------------------|
| **POST /api/auth/signup** | Non requis       | `{ email: string, password: string }`            | `{ message: string }`              | Hachage du mot de passe de l'utilisateur, ajout de l'utilisateur à la base de données.                   |
| **POST /api/auth/login**  | Non requis       | `{ email: string, password: string }`            | `{ userId: string, token: string }`| Vérification des informations d'identification de l'utilisateur ; renvoie l’_id de l'utilisateur et un token web JSON signé. |

### Livres

| Point d'accès                   | Authentification | Corps de la requête (cas échéant)               | Type de réponse attendu            | Fonction                                                                                                 |
|---------------------------------|------------------|-------------------------------------------------|------------------------------------|----------------------------------------------------------------------------------------------------------|
| **GET /api/books**              | Non requis       | -                                               | `Array of books`                   | Renvoie un tableau de tous les livres de la base de données.                                             |
| **GET /api/books/:id**          | Non requis       | -                                               | `Single book`                      | Renvoie le livre avec l’_id fourni.                                                                      |
| **GET /api/books/bestrating**   | Non requis       | -                                               | `Array of books`                   | Renvoie un tableau des 3 livres de la base de données ayant la meilleure note moyenne.                   |
| **POST /api/books**             | Requis           | `{ book: string, image: file }`                 | `{ message: String }`              | Capture et enregistre l'image, analyse le livre transformé en chaîne de caractères, et l'enregistre dans la base de données en définissant correctement son ImageUrl. Initialise la note moyenne du livre à 0 et le rating avec un tableau vide. |
| **PUT /api/books/:id**          | Requis           | `Book as JSON` OU `{ book: string, image: file }`| `{ message: string }`              | Met à jour le livre avec l'_id fourni. Si une image est téléchargée, elle est capturée, et l’ImageUrl du livre est mise à jour. Si aucun fichier n'est fourni, les informations sur le livre se trouvent directement dans le corps de la requête (`req.body.title`, `req.body.author`, etc.). Si un fichier est fourni, le livre transformé en chaîne de caractères se trouve dans `req.body.book`. |
| **DELETE /api/books/:id**       | Requis           | -                                               | `{ message: string }`              | Supprime le livre avec l'_id fourni ainsi que l’image associée.                                           |
| **POST /api/books/:id/rating**  | Requis           | `{ userId: String, rating: Number }`            | `Single book`                      | Définit la note pour le user ID fourni. La note doit être comprise entre 0 et 5. L'ID de l'utilisateur et la note doivent être ajoutés au tableau "rating" afin de ne pas laisser un utilisateur noter deux fois le même livre. Il n’est pas possible de modifier une note. La note moyenne "averageRating" doit être tenue à jour, et le livre renvoyé en réponse de la requête. |
---


## **Conclusion**  

Voilà, vous avez tout ce qu'il vous faut pour naviguer dans l'univers de "MonVieuxGrimoire.com". 
Avec cette API, "MonVieuxGrimoire.com" dispose d’une base robuste et sécurisée. Il ne reste plus qu’à l’explorer et l’enrichir. Bonne aventure et n’oubliez pas : **une API bien conçue, c’est un projet bien maîtrisé !** 🚀  
