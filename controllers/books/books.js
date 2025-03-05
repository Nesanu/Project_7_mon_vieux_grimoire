import fs from "fs";// on importe le module fs pour la gestion des fichiers
import { Book } from "../../models/book.js";// on importe le model Book

// fonction pour récupérer tous les livres
export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.send(books);
};


// fonction pour récupérer un livre
export const getBook = async (req, res) => {
  const id = req.params.id;
  await Book.findOne({ _id: id })
    .then((book) => {
      res.send(book);
    })
    .catch((error) => {
      res.status(404).json({ error });
    });
};
// fonction pour récupérer les 3 meilleurs livres, triés par note moyenne
export const getBestRatingBooks = async (req, res) => {
  await Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books) => {
      res.send(books);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
// fonction pour créer un livre
export const createBook = async (req, res) => {
  const bodyBook = JSON.parse(req.body.book);// on parse le body de la requête.
  delete bodyBook._id;// on supprime l'id du body
  delete bodyBook._userId;// on supprime l'id de l'utilisateur

  const ref = req.book.name;// on récupère le nom de l'image convertie
  const book = new Book({
    ...bodyBook,// on récupère les données du body
    userId: req.auth.userId,// on récupère l'id de l'utilisateur
    imageUrl: `${req.protocol}://${req.get("host")}/images/${ref}.webp`,// on génère l'url de l'image convertie 
  });
  book // on crée un nouveau livre
    .save()// on sauvegarde le livre
    .then(() => res.status(201).json({ message: "Book crée !", book }))// on renvoie une réponse positive si le livre est créé avec succès 
    .catch((error) => res.status(400).json({ error }));// on renvoie une erreur, s'il y a un problème lors de la sauvegarde du livre    
};
// fonction pour modifier un livre
export const updateBook = async (req, res) => {
  const id = req.params.id;// on récupère l'id du livre
  const link = req.book;// on récupère le nom de l'image convertie
  const { body } = req;// on récupère le body de la requête

  const hasFiles = !!req.file;// on vérifie si un fichier est présent dans la requête
// si un fichier est présent, on supprime l'ancienne image et on met à jour le livre avec la nouvelle image
  if (hasFiles) {
    Book.findOne({ _id: id })// on recherche le livre à modifier 
      .then((book) => {
        const filename = book.imageUrl.split("/images/")[1];// on récupère le nom de l'ancienne image pour la supprimer du dossier images 
        fs.unlink(`images/${filename}`, (err) => {
          if (err) {
            console.log(err);// on affiche l'erreur s'il y en a une 
          }
        });
      })
      .catch((error) => {
        res.status(400).json({ error });// on renvoie une erreur, s'il y a un problème lors de la suppression de l'ancienne image 
      });
// on met à jour le livre avec la nouvelle image
    await Book.updateOne({ _id: id }, { ...body, imageUrl: `${req.protocol}://${req.get("host")}/images/${link.name}.webp` })
      .then(() => {
        res.status(200).json({ message: "Book modifié ! et image également !" });// on renvoie une réponse positive si le livre est modifié avec succès 
      })
      .catch((error) => {
        res.status(400).json({ error }); // on renvoie une erreur, s'il y a un problème lors de la modification du livre
      });
  } else {
    await Book.updateOne(
      { _id: id },
      {
        ...body,
        _id: id,
      }
    )
      .then(() => {
        res.status(200).json({ message: "Book modifié !" });// on renvoie une réponse positive si le livre est modifié avec succès
      })
      .catch((error) => {
        res.status(400).json({ error, message: "Une erreur est survenu" });// on renvoie une erreur, s'il y a un problème lors de la modification du livre 
      });
  }
};
// fonction pour supprimer un livre
export const deleteBook = async (req, res) => {
  const id = req.params.id;
  await Book.findOne({ _id: id })// on recherche le livre à supprimer
    .then((book) => {
      if (book.userId !== req.auth.userId) {
        res.status(401).json({ message: "Vous n'êtes pas autorisé à supprimer ce livre !" });// on renvoie une erreur si l'utilisateur n'est pas l'auteur du livre à supprimer
      } else {
        const filename = book.imageUrl.split("/images/")[1];// on récupère le nom de l'image pour la supprimer du dossier images 
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: id })
            .then(() => res.status(200).json({ message: "Book supprimé !" }))// on renvoie une réponse positive si le livre est supprimé avec succès 
            .catch((error) => res.status(400).json({ error }));// on renvoie une erreur, s'il y a un problème lors de la suppression du livre
        });
      }
    })
    .catch((error) => {
      res.status(404).json({ error });// on renvoie une erreur si le livre n'est pas trouvé
    });
};
// fonction pour noter un livre 
export const setBookRating = async (req, res) => {
  const id = req.params.id;// on récupère l'id du livre
  const rating = req.body.rating;// on récupère la note du livre
  const userId = req.auth.userId;// on récupère l'id de l'utilisateur
await Book.findOne({ _id: id })// on recherche le livre. 'Book.findOne' - méthode de mongoose pour trouver un livre par son id // Proposition Copilot: on peut utiliser findById. 

    .then((book) => {
      const index = book.ratings.findIndex((rating) => rating.userId === userId);// on vérifie si l'utilisateur a déjà noté le livre 
      if (index === -1) {
        book.ratings.push({ userId, grade: rating });// si l'utilisateur n'a pas encore noté le livre, on ajoute sa note
      } else {
        book.ratings[index].grade = rating;// si l'utilisateur a déjà noté le livre, on met à jour sa note
      }
      book
        .save()
        .then((bookSaved) => {
          res.send(bookSaved);// on renvoie le livre avec la note mise à jour
        })
        .catch((error) => res.status(400).json({ error }));// on renvoie une erreur, s'il y a un problème lors de la sauvegarde du livre 
    })
    .catch((error) => {
      res.status(404).json({ error });// on renvoie une erreur si le livre n'est pas trouvé 
    });
};

