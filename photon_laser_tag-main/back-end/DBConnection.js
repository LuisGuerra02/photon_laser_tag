const { Pool } = require('pg')
 
const pool = new Pool({
  user: 'omioatcpfzgphg',
  host: 'ec2-34-224-217-239.compute-1.amazonaws.com',
  database: 'dfl6cv1aejkrsk',
  password: '16552cb6402c35564f5fe718a2d484e35557ce52a5a84b80c46ebb8c80aab6df',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
})

function getPlayers (request, response) {
  pool.query('SELECT * FROM player ORDER BY id ASC;', (error, results) => {
    if (error) {
      throw error
    }
    response.render('player-screen/player-form', {players: results.rows});
  });
}

const setPlayers = async (request) => {
  const playerID = request.playerID;
  const playerCodename = request.playerCodename;

  if (!(playerID && playerCodename)) {
    console.log(`Invalid: ${playerID}, ${playerCodename}`);
    return;
  }

  let queryString = 
  "INSERT INTO player (id, codename)" +
  "VALUES (" + playerID + ", '" + playerCodename +"') " +
  "ON CONFLICT (id) DO NOTHING ";

  pool.query(queryString, (error, results) => {
    if (error) {
      console.log("queryString = \n" + queryString);
      throw error;
    }
  })
}

async function getCodenameByID (id) {
  try {
    const result = await pool.query(
      `SELECT codename FROM player WHERE id = ${id}`
    );

    return result.rows[0];
  } catch (err) {
    return err.stack;
  }
}

module.exports = {
  getPlayers,
  setPlayers,
  getCodenameByID,
}