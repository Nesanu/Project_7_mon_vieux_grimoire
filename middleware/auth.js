import jwt from "jsonwebtoken";// on importe jwt pour gérer les tokens de notre application
// import { User } from "../../models/user.js";// on importe le model User
// import bcrypt from "bcrypt";// on importe bcrypt pour hasher le mot de passe
// import { Book } from "../models/book.js";// on importe le model Book
// import fs from "fs";// on importe le module fs
// import { Book } from "../models/book.js";// on importe le model Book pour vérifier si l'utilisateur est l'auteur du livre

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};

export default auth;