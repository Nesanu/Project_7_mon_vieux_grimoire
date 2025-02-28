// Code initial du fichier app.js:


// const express = require('express');


// const app = express();


// module.exports = app;

// Code avant ajout des middlewares:

// const express = require('express');

// const app = express();

// app.use((req, res) => {
//    res.json({ message: 'Votre requête a bien été reçue !' }); 
// });

// module.exports = app;

// // ---------------------------------------------

// // Code avec ajout des middlewares: 

// const express = require('express');


// const app = express();


// app.use((req, res, next) => {

//   console.log('Requête reçue !');

//   next();

// });


// app.use((req, res, next) => {

//   res.status(201);

//   next();

// });


// app.use((req, res, next) => {

//   res.json({ message: 'Votre requête a bien été reçue !' });

//   next();

// });


// app.use((req, res, next) => {

//   console.log('Réponse envoyée avec succès !');

// });


// module.exports = app;

// // ---------------------------------------------

// Code avec remplacement des middlewares pour le spinner du frontend: 

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// // Proposition Copilot: 
// mongoose.connect('mongodb+srv://nicoletaesanu:<db_password>@cluster.zsfg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster')
//     .then(() => console.log('Connexion à MongoDB réussie !'))
//     .catch(() => console.log('Connexion à MongoDB échouée !'));
// process.on('warning', (warning) => {
//     console.warn(warning.stack);
// });

// Option cours 7 exos: 
mongoose.connect('mongodb+srv://nicoletaesanu:galina53@cluster.zsfg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
  
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
    next();
  
  });

  app.post('/api/stuff', (req, res, next) => {

    console.log(req.body);
  
    res.status(201).json({
  
      message: 'Objet créé !'
  
    });
  
  });

app.get('/api/stuff', (req, res, next) => {

    const stuff = [
  
      {
  
        _id: 'oeihfzeoi',
  
        title: 'Mon premier objet',
  
        description: 'Les infos de mon premier objet',
  
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
  
        price: 4900,
  
        userId: 'qsomihvqios',
  
      },
  
      {
  
        _id: 'oeihfzeomoihi',
  
        title: 'Mon deuxième objet',
  
        description: 'Les infos de mon deuxième objet',
  
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
  
        price: 2900,
  
        userId: 'qsomihvqios',
  
      },
  
    ];
  
    res.status(200).json(stuff);
  
  });

  module.exports = app;

 
