const dataMapper = require('../dataMapper');

const deckController = {

    addCard: async (req, res) => {

        // get the id from the url
        // parseInt = convert a string to an integer
        // 10 = make sure it's in a decimal base
        const cardId = parseInt(req.params.id, 10);

        // use the .find() method to check if the card is already in the deck
        // make sure it's an integer
        const cardFound = req.session.deck.find(card => card.id === parseInt(cardId, 10));

        if (cardFound) {
            // if a card is found in the deck, redirect to the deck page
            res.redirect('/deck');
        } else {
            // if not found (= undefined), it means the card has not been added yet
            // in that case, check if the deck has less than 5 cards
            if (req.session.deck.length < 5) {
                
                // if the deck has less than 5 cards, get the card from the database
                try {
                    const card = await dataMapper.getCard(cardId);
                
                    if (card) {
                        req.session.deck.push(card);
                        res.redirect('/deck');
                    } else {
                        res.status(404).send(`Card with id ${cardId} has not been found`);

                    }
                } catch(error) {
                    console.error(error);
                    res.status(500).render('error');
                }
            } else {
                // if the deck already has 5 cards, redirect to the deck page
                res.redirect('/deck');
            }
        }
    },

    deckPage: (req, res) => {
        res.render('cardList', 
            {
                cards: req.session.deck, 
                title: 'Mon deck'
            }
        );
    }
}

module.exports = deckController;