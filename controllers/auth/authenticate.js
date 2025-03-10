import bcrypt from "bcrypt"; // Pour crypter les infos utilisateurs
import jwt from "jsonwebtoken"; // jwt pour gérée les token de notre application
import { User } from "../../models/user.js";// on importe le model User pour les utilisateurs de notre application 

export const signup = async (req, res) => {
  // console.log("[POST] - /auth/signup", req.body);
  bcrypt
    .hash(req.body.password, 10) // on hash le mot de passe en entrée
    .then((hash) => {
        const user = new User({ // on génère un nouvelle utilisateur selon le model USER
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur crée !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

export const login = async (req, res) => {
  // console.log("[POST] - /auth/login  =>", req.body);
  User.findOne({
    email: req.body.email,
  }).then((user) => {
    if (!user) {
        return res.status(401).json({ // 401 pas d'utilisateur trouvé
        error: new Error("Utilisateur non trouvé !"),
      });
    }
    bcrypt // on compare le mot de passe entré avec celui de la base de données
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
            return res.status(401).json({ // mot de passe incorrect
            error: new Error("Mot de passe incorrect !"),
          });
        }
          res.status(200).json({ // Si auth ok
          userId: user._id,
            token: jwt.sign( // répondre avec le NOUVEAU Jeton
            {
              userId: user._id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "24h",
            }
          ),
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
};
