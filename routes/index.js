import { Router } from "express";// import de la méthode Router() d'express
import { login, signup } from "../controllers/auth/authenticate.js";// import des controllers
import { createBook, deleteBook, getBestRatingBooks, getBook, getBooks, setBookRating, updateBook } from "../controllers/books/books.js";// import des controllers

/* middleware */
import auth from "../middleware/auth.js";
import upload from "../middleware/multer-config.js";
import sharpImages from "../middleware/sharp-config.js";
import hasAuthor from "../middleware/hasAuthor.js";

const routes = Router();

// public routes
routes.post("/auth/signup", signup);
routes.post("/auth/login", login);
routes.get("/books", getBooks);
routes.get("/books/bestrating", getBestRatingBooks);
routes.get("/books/:id", getBook);


// middleware auth, hasAuthor, upload, sharpImages
routes.post("/books", auth, upload.single("image"), sharpImages, createBook);
routes.put("/books/:id", auth, hasAuthor, upload.single("image"), sharpImages, updateBook);
routes.delete("/books/:id", auth, hasAuthor, deleteBook);
routes.post("/books/:id/rating", auth, setBookRating);

export default routes;