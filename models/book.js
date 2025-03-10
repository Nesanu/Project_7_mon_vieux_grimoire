import mongoose from "mongoose";

const { Schema } = mongoose;// on importe la classe Schema de mongoose pour définir la structure des documents Book. 

const bookSchema = new Schema({
  userId: {
    type: String,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: false,
  },
  genre: {
    type: String,
    required: false,
  },
  ratings: [ // 'ratings' est un tableau d'objets, chacun contenant un champ grade qui est un nombre entre 1 et 5.
    {
      userId: {
        type: String,
        required: true,
      },
      grade: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    },
  ],
  averageRating: {
    type: Number,
    required: false,// 'averageRating' est un champ numérique non obligatoire.
  },
});
//*Documentation:
// Le bookSchema définit la structure des documents Book stockés dans la collection books de la base de données.
// Cette méthode permet de s'assurer que la 'averageRating' (note moyenne) est toujours à jour lorsqu'un document Book est enregistré.

// Avant d'enregistrer un document Book, le hook pre(« save ») est exécuté avant la méthode save() de Mongoose.
// Il vérifie s'il y a des ratings (évaluations).
// Si c'est le cas, il calcule la somme de toutes les ratings, puis la note moyenne.
// La note moyenne calculée est attribuée au champ 'averageRating' du document.
// Cette méthode permet de s'assurer que la averageRating (note moyenne) est toujours à jour lorsqu'un document Book est enregistré.
//*

// Pre-save hook to calculate the average rating before saving the document
bookSchema.pre("save", async function () {
  if (this.ratings.length > 0) {
    const sumOfRatings = this.ratings.reduce((sum, rating) => sum + rating.grade, 0); // Calculate the sum of all ratings
    this.averageRating = Math.round((sumOfRatings / this.ratings.length) * 100) / 100; // Calculate the average rating and round to 2 decimal places
  }
});

export const Book = mongoose.model("Book", bookSchema);
//Il permet de manipuler les documents de la collection books de la base de données.
// On exporte le modèle Book pour l'utiliser dans d'autres fichiers. 