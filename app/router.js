const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const cardController = require('./controllers/cardController');
const searchController = require('./controllers/searchController');
const deckController = require('./controllers/deckController');


router.get('/', mainController.homePage);
router.get('/card/:id', cardController.cardPage);

router.get('/search', searchController.searchPage);
router.get('/search/element', searchController.searchByElement);
router.get('/search/level', searchController.searchByLevel);
router.get('/search/values', searchController.searchByValue);

router.get('/deck/add/:id', deckController.addCard);
router.get('/deck', deckController.deckPage);
router.get('/deck/remove/:id', deckController.removeCard);


module.exports = router;