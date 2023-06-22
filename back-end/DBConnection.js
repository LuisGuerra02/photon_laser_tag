const { Pool } = require('pg')

const pool = new Pool({
  user: 'nelgvzlzgdwvlx',
  host: 'ec2-44-213-151-75.compute-1.amazonaws.com',
  database: 'ddu3gjgoncun6',
  password: 'bbea10ad2f2a1a583b02431fba8ca21d21087a98fc2c6ace980a2a24292cafb2',
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