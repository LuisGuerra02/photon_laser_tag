const { Pool } = require('pg')
 
const pool = new Pool({
  user: 'czuiekbasptrrq',
  host: 'ec2-3-224-125-117.compute-1.amazonaws.com',
  database: 'dh75dqtbnprdc',
  password: '699ebd62a6cb6fb16cd07cea3c8e004d56bf12e2770ad4c34f44fef6a57a22b1',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
})

const getPlayers = (request, response) => {
  pool.query('SELECT * FROM player ORDER BY id ASC;', (error, results) => {
    if (error) {
      throw error
    }
    
    response.render('player-screen/player-form', {players: results.rows});
  });
}

const setPlayers = async (request, response) => {
  
  const playerID = parseInt(request.playerID);
  const playerName = request.playerName.split(" ", 2);

  if (!(Number.isInteger(playerID) && playerName[0] && playerName[1])) {
    return;
  }

  let queryString = 
  "INSERT INTO player (id, first_name, last_name, codename)" +
  "VALUES (" + playerID + ", '" + playerName[0] + "', '" + playerName[1] + "', 'placeholder') " +
  "ON CONFLICT (id) DO UPDATE " +
    "SET first_name = EXCLUDED.first_name, " +
        "last_name = EXCLUDED.last_name, " +
        "codename = EXCLUDED.codename;";

  pool.query(queryString, (error, results) => {
    if (error) {
      console.log("queryString = \n" + queryString);
      throw error;
    }
  })
}

module.exports = {
  getPlayers,
  setPlayers,
}