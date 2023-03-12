# photon_laser_tag
>Installation

*Prerequisties:*

* Node.js must be installed

1. To install all dependencies run `npm i` in the terminal at the root directory of this project.
2. Once all the dependencies have been installed, run `npm start` to start the server.

Server default location is hosted at `localhost:3000`

NOTE: App is also deployed to Heroku at 'https://lasertag-team10.herokuapp.com/'

>Working Paths

* `/` - Displays Splash Screen

* `/players` - Displays all players inside of DB
    - Enter a number 1-8 as the Player ID to query a pre-determined Player Codename (only enter a value, no need to press enter or submit)
    - Else, a blank Player Codename will be available for the user to enter their desired Codename
    
* `/timer` - Pre-game countdown timer

* `/action` - Action screen and scoreboard
