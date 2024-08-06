const client = require('./database');

const dataMapper = {
  async getAllCards() {
    const query = 'SELECT * FROM card';
    const result = await client.query(query);
    return result.rows;
  },


  async getCard(cardId) {
    const query = {
      // select all the fields of the card with the given id
      text: `SELECT * FROM card WHERE id = $1`,
      // array with the values to be used in the query (instead of $1)
      values: [cardId],
    }

    // execute the previous query, using the database
    const result = await client.query(query);

    //return the result
    return result.rows[0];
  }
};


module.exports = dataMapper;
