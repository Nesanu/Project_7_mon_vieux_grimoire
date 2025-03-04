
// Code avec remplacement des middlewares pour le spinner du frontend: 

const express = require('express');
const mongoose = require('mongoose');
// const Book = require('./models/book');
const bookRoutes = require('./routes/book');
// const stuffRoutes = require('./routes/stuff'); code cours 1

const userRoutes = require('./routes/user');
app.use('/api/book', bookRoutesRoutes);
app.use('/api/auth', userRoutes);

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

app.use(bodyParser.json());

// app.use('/api/stuff', stuffRoutes); code cours 1
app.use('/api/books', bookRoutes);

  module.exports = app;

 
