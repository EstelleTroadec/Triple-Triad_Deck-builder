const client = require('./client');

const dataMapper = {

  // get all the cards from the database
  async getAllCards() {
    const query = 'SELECT * FROM card';
    const result = await client.query(query);
    return result.rows;
  },


  // get the card with the given id
  async getCard(cardId) {
    const query = {
      // select all the fields of the card with the given id
      text: `SELECT * FROM card WHERE id = $1`,
      // array with the values to be used in the query (instead of $1)
      values: [cardId],
    }

    // execute the previous query, using the client
    const result = await client.query(query);

    //return the unique result
    return result.rows[0];
  },

  // get all the cards with the given element
  async getCardsByElement(element) {

    let query;

    // to deal with the 'null' fields, we need a specific query
    if (element === 'null') {
      query = 'SELECT * FROM card WHERE element IS NULL';

    } else {
      query = {
        // select all the fields of the cards with the given element
        text: `SELECT * FROM card WHERE element = $1`,
        // array with the values to be used in the query (instead of $1)
        values: [element],
      };
    }

    // execute the previous query, using the client
    const result = await client.query(query);

    // return the result
    return result.rows;
  }
};


module.exports = dataMapper;
