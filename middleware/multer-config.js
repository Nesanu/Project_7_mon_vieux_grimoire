import multer from "multer";// import de multer pour la gestion des fichiers

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (MIME_TYPES[file.mimetype]) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"), false);
    }
  },
});

export default upload;// Ce middleware est exporté pour être utilisé dans d'autres fichiers.

// Commentaire:
// Ce middleware permet de configurer multer pour gérer les fichiers envoyés par l'utilisateur.
// Il vérifie si le fichier est une image en fonction de son type MIME.
// Il stocke les fichiers en mémoire pour les traiter plus tard.
// Si le fichier n'est pas une image, il renvoie une erreur 400.
// Si tout se passe bien, le middleware appelle la fonction next() pour passer au middleware suivant.
// Ce middleware est utilisé pour les routes POST et PUT qui nécessitent des images.
// Il est important de noter que ce middleware doit être utilisé avant le middleware sharp-config pour fonctionner correctement.

