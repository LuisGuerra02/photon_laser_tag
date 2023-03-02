const { Pool } = require('pg')
 
const pool = new Pool({
  user: 'ec2-34-224-217-239.compute-1.amazonaws.com',
  host: 'ec2-3-224-125-117.compute-1.amazonaws.com',
  database: 'dfl6cv1aejkrsk',
  password: '16552cb6402c35564f5fe718a2d484e35557ce52a5a84b80c46ebb8c80aab6df',
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
    
    console.log(results.rows);
    response.render('player-screen/player-form', {players: results.rows});
  });
}

const setPlayers = async (request, id) => {
  const playerID = id;
  const playerCodename = request.playerCodename;
  const playerName = request.playerName.split(" ", 2);

  if (!(playerID && playerCodename && playerName[0] && playerName[1])) {
    console.log(`Invalid: ${playerID}, ${playerCodename}, ${playerName}`);
    return;
  }

  let queryString = 
  "INSERT INTO player (id, first_name, last_name, codename)" +
  "VALUES (" + playerID + ", '" + playerName[0] + "', '" + playerName[1] + "', '" + playerCodename +"') " +
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