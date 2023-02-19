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
    response.status(200).json(results.rows)
  })
}

const setPlayers = (request, response) => {
  
  const playerID = request.playerID
  const playerName = request.playerName.split(" ", 2);

  console.log(`${playerID}, ${playerName[0]}, ${playerName[1]}`);

  const queryString = "INSERT INTO player (id, first_name, last_name, codename) VALUES (" + playerID + ", '" + playerName[0] + "', '" + playerName[1] + "', '" + "placeholder" + "');"

  pool.query(queryString, (error, results) => {
    if (error) {
      throw error;
    }
  })
}

module.exports = {
  getPlayers,
  setPlayers,
}