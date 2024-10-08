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
  },

  async getCardsByLevel(level) {
    const query = {
      // select all the fields of the cards with the given level
      text: 'SELECT * FROM card WHERE level = $1',
      // array with the values to be used in the query (instead of $1)
      values: [level],
    }

    // execute the previous query, using the client
    const result = await client.query(query);

    // return the result
    return result.rows;
  },

  async getCardsByValue(direction, value) {
    // select all the cards with the given direction AND with at least the indicated value
    const query = {
      text: `SELECT * FROM card 
      WHERE $1 = 'north' AND value_north >= $2 
      OR $1 = 'east' AND value_east >= $2 
      OR $1 = 'south' AND value_south >= $2 
      OR $1 = 'west' AND value_west >= $2`,
      values: [direction, value],
    };

    const result = await client.query(query);
    return result.rows;
  },

  async getCardsByName(name) {
    const query = {
      // select all the cards with a given part of the name
      // we use ILIKE to make sure the search is not case-sensitive
      text: 'SELECT * FROM card WHERE name ILIKE $1',
      // array with the values to be used in the query (instead of $1)
      // we need to add % at the beginning and the end of the value so that we can look for cards which name includes the given name
      values: [`%${name}%`],
    }

    const result = await client.query(query);
    return result.rows;
  }
};


module.exports = dataMapper;
