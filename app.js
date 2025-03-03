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
const Book = require('./models/book');


// // // Proposition Copilot: 
mongoose.connect('mongodb+srv://nicoletaesanu:Galina_53@cluster.zsfg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster')

    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
     process.on('warning', (warning) => {
    console.warn(warning.stack);
});



 // Proposition MongoDB:    
// const mongoose = require('mongoose');
// const uri = "mongodb+srv://nicoletaesanu:Galina_53@cluster.zsfg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster";

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);

// process.on('warning', (warning) => {
//     console.warn(warning.stack);
// });

// Option cours 7 exos: 
// mongoose.connect('mongodb+srv://nicoletaesanu:galina53@cluster.zsfg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster',
//     { useNewUrlParser: true,
//       useUnifiedTopology: true })
//     .then(() => console.log('Connexion à MongoDB réussie !'))
//     .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();

app.use(express.json());

app.use((req, res, next) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
  
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
    next();
  
  });

  // app.post('/api/book', (req, res, next) => {

  //   console.log(req.body);
  
  //   res.status(201).json({
  
  //     message: 'Objet créé !'
  
  //   });
  
  // });


  app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const Book = new Book({
      ...req.body
    });

    Book.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  });

  app.put('/api/stuff/:id', (req, res, next) => {

    Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
  
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
  
      .catch(error => res.status(400).json({ error }));
  
  });

  app.delete('/api/stuff/:id', (req, res, next) => {
    Book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });


  app.get('/api/stuff/:id', (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(book => res.status(200).json(book))
      .catch(error => res.status(404).json({ error }));
  });


// app.get('/api/book', (req, res, next) => {

//     const book = [
  
//       {
//         _id: 'oeihfzeoi',
//         title: 'Le Seigneur des Anneaux', 
//       }
  
//     ];
  
//     res.status(200).json(book);
  
//   });

app.use('/api/stuff', (req, res, next) => {

  book.find()

    .then(books => res.status(200).json(books))

    .catch(error => res.status(400).json({ error }));

});
  module.exports = app;

 
