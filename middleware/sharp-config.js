import sharp from "sharp";// import de sharp pour la conversion des images
import fs from "fs";// import de fs pour la gestion des fichiers
import path from "path";// import de path pour la gestion des chemins

// Commentaire: 
// Ce middleware permet de convertir les images en format webp et de les compresser à 20% de leur qualité d'origine.
// Il stocke le nom de l'image convertie dans la requête pour l'utiliser plus tard.
// Il vérifie si le dossier images existe, s'il n'existe pas, il le crée, puis enregistre l'image convertie dans ce dossier.
// Si une erreur se produit, elle est capturée et renvoyée au client avec un code d'erreur 400.
// Si tout se passe bien, le middleware appelle la fonction next() pour passer au middleware suivant.
// Ce middleware est utilisé pour les routes POST et PUT qui nécessitent des images. 
// Il est important de noter que ce middleware doit être utilisé après le middleware multer pour fonctionner correctement.

const sharpImages = async (req, res, next) => {
  try {
    fs.access("./images", (error) => {
      if (error) {
        fs.mkdirSync("./images");
      }
    });

    if (req.file) {
      const timestamp = new Date().getTime();
      const filenameWithoutExtension = path.basename(req.file.originalname, path.extname(req.file.originalname));
      const ref = `${timestamp}_${filenameWithoutExtension.split(" ").join("_")}`;
      req.book = {
        name: ref,
      };
      await sharp(req.file.buffer).toFormat("webp").webp({ quality: 20 }).toFile(`images/${ref}.webp`); // convertisseur en webp. 
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

export default sharpImages;// Ce middleware est exporté pour être utilisé dans d'autres fichiers.