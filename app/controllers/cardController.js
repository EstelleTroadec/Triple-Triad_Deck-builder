const dataMapper = require('../dataMapper.js');

const cardController = {

    cardPage: async (req, res) => {

        // get the id from the url
        // parseInt = convert a string to an integer
        // 10 = make sure it's in a decimal base
        const cardId = parseInt(req.params.id, 10);

        try {
            const card = await dataMapper.getCard(cardId);

            if (card) {
                // if card found, render the card page
                res.render('cardPage', {card});
            } else {
                // if card not found, return a 404 error
                res.status(404).send(`Card with the id ${cardId} not found`);
            }
        } catch (error) {
            console.error(error);
            res.status(500).send(`An error occured with the database :${error}`);
        }
    }
}

module.exports = cardController;