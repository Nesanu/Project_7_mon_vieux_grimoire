import { Router } from "express";// import de la méthode Router() d'express
import { login, signup } from "../controllers/auth/authenticate.js";// import des controllers
import { createBook, deleteBook, getBestRatingBooks, getBook, getBooks, setBookRating, updateBook } from "../controllers/books/books.js";// import des controllers

/* middleware */
import auth from "../middleware/auth.js";
import upload from "../middleware/multer-config.js";
import sharpImages from "../middleware/sharp-config.js";
import hasAuthor from "../middleware/hasAuthor.js";

/**
 * @description: routes du package de express génère un gestionnaire de routes
 * Cela définit not endpoint (nos addresses url) pour notre application
 * cela prend donc en considération l'adress écouter sur notre serveur (via app.listen(port) en question)
 */
const routes = Router(); // on crée un objet routes qui contient toutes les routes de notre application

// public routes
routes.post("/auth/signup", signup);
routes.post("/auth/login", login);
routes.get("/books", getBooks);
routes.get("/books/bestrating", getBestRatingBooks);
routes.get("/books/:id", getBook);

// route avec middlesware (agent de contrôle = douanier)
// middleware auth, hasAuthor, upload, sharpImages
routes.post("/books", auth, upload.single("image"), sharpImages, createBook);
routes.put("/books/:id", auth, hasAuthor, upload.single("image"), sharpImages, updateBook);
routes.delete("/books/:id", auth, hasAuthor, deleteBook);
routes.post("/books/:id/rating", auth, setBookRating);

export default routes;

/* User demande requetes au serveur => 
    roles d'un middleware (DOUANIER) => 
        auth controle l'identité si oui suivant si non retour d'erreur fin =>
             si oui controle si upload.singleFiles correspond au type de fichier attendu =>
                 si oui suivant si non erreur => 
                    etc.. jusqu'a la fin du traitement de la requête
 */
