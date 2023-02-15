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
  pool.query('SELECT * FROM player ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getPlayers,
}