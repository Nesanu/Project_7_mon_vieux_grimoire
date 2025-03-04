// in routes/stuff.js


// const stuffCtrl = require('../controllers/stuff');

// router.post('/', stuffCtrl.createThing);


// Exemple cours 1/
// const express = require('express');
// const router = express.Router();

// const stuffCtrl = require('../controllers/stuff');

// router.get('/', stuffCtrl.getAllStuff);
// router.post('/', stuffCtrl.createThing);
// router.get('/:id', stuffCtrl.getOneThing);
// router.put('/:id', stuffCtrl.modifyThing);
// router.delete('/:id', stuffCtrl.deleteThing);

// module.exports = router;

const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/book');//nous devons importer notre contrôleur puis enregistrer createThing comme middleware pour la route POST.

router.get('/', bookCtrl.getAllBooks);
router.post('/', bookCtrl.createBook);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', bookCtrl.modifyBook);
router.delete('/:id', bookCtrl.deleteBook);

module.exports = router;


// Précédent code dans routes/book.js
// const bookCtrl = require('../controllers/book');//nous devons importer notre contrôleur puis enregistrer createThing comme middleware pour la route POST.
// router.post('/', bookCtrl.createThing);


// const express = require('express');
// const router = express.Router();

// const Book = require('../models/book');


// router.post('/', (req, res, next) => {
//   const book = new Book({
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     price: req.body.price,
//     userId: req.body.userId
//   });
//   thing.save().then(
//     () => {
//       res.status(201).json({
//         message: 'Post saved successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });

// router.get('/:id', (req, res, next) => {
//   Book.findOne({
//     _id: req.params.id
//   }).then(
//     (thing) => {
//       res.status(200).json(thing);
//     }
//   ).catch(
//     (error) => {
//       res.status(404).json({
//         error: error
//       });
//     }
//   );
// });

// router.put('/:id', (req, res, next) => {
//   const book = new Book({
//     _id: req.params.id,
//     title: req.body.title,
//     description: req.body.description,
//     imageUrl: req.body.imageUrl,
//     price: req.body.price,
//     userId: req.body.userId
//   });
//   Book.updateOne({_id: req.params.id}, thing).then(
//     () => {
//       res.status(201).json({
//         message: 'Thing updated successfully!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });

// router.delete('/:id', (req, res, next) => {
//   Book.deleteOne({_id: req.params.id}).then(
//     () => {
//       res.status(200).json({
//         message: 'Deleted!'
//       });
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });

// router.get('/' +
//   '', (req, res, next) => {
//   Book.find().then(
//     (bookSchema) => {
//       res.status(200).json(things);
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// });

// module.exports = router;


