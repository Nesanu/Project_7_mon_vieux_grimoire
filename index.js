import express from "express"; // express pour gérer mon serveur
import dotenv from "dotenv"; // mes variables d'environnement 
import routes from "./routes/index.js"; // mes routes
import bodyParser from "body-parser"; // les middleware
import { connectDB } from "./db/config.js"; // connect to mongoDB
import cors from "cors"; // middleware dépendance externe pour travailler hors local
import path from "path"; // gestion des chemins dans mon backend
import { fileURLToPath } from "url"; // dépendance

dotenv.config(); // gère et configure mes variables d'environnement 

const app = express(); // mon serveur // Creates an Express application. The express() function is a top-level function exported by the express module.
const port = process.env.PORT | 4000;// sur le port 4000 par défault 

const __filename = fileURLToPath(import.meta.url); // gestion des chemins/url des fichiers que j'aurai à manipuler
const __dirname = path.dirname(__filename); // gestion des chemins/url des fichiers que j'aurai à manipuler 

app.use(cors()); // première intéraction avec un middleWare 

// Tout les middlewares 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api", routes);


/* Utilisation d'une méthode ASYNCHRONE, fonction anonyme, pour gérer les erreurs de connexion à la base de données
- On lance une fonction asynchrone avec 'try', qui attend la connexion à la base de données. 
- Si ça marche on lance le serveur, sinon on attrape l'erreur avec 'catch' et on sort du processus avec un message d'erreur 
de connexion à la base de données et on affiche un message d'erreur dans la console et on sort du processus avec un code d'erreur.
*/


(async () => {
    try {
      await connectDB();
      app.listen(port, () => {
        console.log(`Server est lancé sur http://localhost:${port}`);
      });
    } catch (error) {
      console.error("Database connection failed", error);
      process.exit(1);
    }
  })();