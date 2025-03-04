import { Book } from "../models/book.js";// on importe le model Book
// Commentaire: Ce middleware vérifie si l'utilisateur est l'auteur du livre qu'il souhaite modifier. 
// Si ce n'est pas le cas, il renvoie une erreur 401. Sinon, il appelle la fonction next() pour passer 
// au middleware suivant.

const hasAuthor = (req, res, next) => {
  const id = req.params.id;
  Book.findOne({ _id: id })
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: "Vous n'êtes pas autorisé à modifier ce livre !" });
      } else {
        next();
      }
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};

export default hasAuthor;