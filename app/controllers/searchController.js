const dataMapper = require('../dataMapper');

const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },

  searchByElement: async (req, res) => {

    // get the element from the queryString
    const element = req.query.element;

    try {

      const cards = await dataMapper.getCardsByElement(element);

      // render the cardList view with a different title accordingly to the search
      const title = 'Liste des cartes ' + (element === 'null' ? 'sans élément' : `de type ${element}`);
      res.render('cardList', {cards, title});

    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database : ${error}`);
    }

  },

  searchByLevel: async (req,res) => {

    // get the level from the queryString
    // make sure it's an integer with a decimal base
    const level = parseInt(req.query.level, 10);

    try {
      const cards = await dataMapper.getCardsByLevel(level);
      // render the cardList view with a different title accordingly to the search
      const title = 'Liste des cartes de niveau ' + level;
      res.render('cardList', {cards, title});
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database : ${error}`);
    }
  },

  searchByValue: async (req,res) => {

    // get the direction and value from the queryString
    const direction = req.query.direction;
    const value = parseInt(req.query.value, 10);

    try {
      const cards = await dataMapper.getCardsByValue(direction,value);
      // render the cardList view with a different title accordingly to the search
      const title = `Liste des cartes avec la direction ${direction} d'une valeur supérieure ou égale à ${value}`;
      res.render('cardList', {cards, title});
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database : ${error}`);
    }
  },

  searchByName: async (req,res) => {

    // get the name from the queryString
    const name = req.query.name;
    try {
      const cards = await dataMapper.getCardsByName(name);

      // render the cardList view with a different title accordingly to the search
      const title = 'Liste des cartes contenant ' + name;
      res.render('cardList', {cards, title});
    } catch (error) {
      console.error(error);
      res.status(500).send(`An error occured with the database : ${error}`);
    }
  },

};

module.exports = searchController;