const setScore = (playerName, points) => {
	let currentPoints = parseInt(document.getElementById(playerName).innerHTML);

	let totalPoints = currentPoints + points;

	document.getElementById(playerName).innerHTML = totalPoints;

	updateScoreboard();
};

const updateLog = (playerFired, playerHit) => {
	redPlayers = Array.from(document.getElementsByClassName("red-team"));
	bluePlayers = Array.from(document.getElementsByClassName("blue-team"));

	redPlayers.forEach((player) => {
		if (player.innerHTML == playerFired) {
			updateRedLog(playerFired, playerHit, "hit");
			updateBlueLog(playerHit, playerFired, "hit by");
		}
	})

	bluePlayers.forEach((player) => {
		if (player.innerHTML == playerFired) {
			updateBlueLog(playerFired, playerHit, "hit");
			updateRedLog(playerHit, playerFired, "hit by");
		}
	})

	
	redScroller = document.getElementsByClassName("color-scroll")[0];
	redScroller.scrollTop = redScroller.scrollHeight;

	blueScroller = document.getElementsByClassName("color-scroll")[1];
	blueScroller.scrollTop = blueScroller.scrollHeight;
}

const updateScoreboard = () => {
	redPlayers = Array.from(document.getElementsByClassName("red-team"));
	redPoints = 0;

	bluePlayers = Array.from(document.getElementsByClassName("blue-team"));
	bluePoints = 0;

	redPlayers.forEach((player) => {
		redPoints += parseInt(
			document.getElementById(player.innerHTML).innerHTML
		);
	});

	bluePlayers.forEach((player) => {
		bluePoints += parseInt(
			document.getElementById(player.innerHTML).innerHTML
		);
	});

	if (redPoints > bluePoints) {
		redWinning();
	} else if (redPoints < bluePoints) {
		blueWinning();
	} else {
		tieWinning();
	}

	sortScores(document.getElementById("red-scores"));
    sortScores(document.getElementById("blue-scores"));

	setTopRedPlayer();
	setTopBluePlayer();
	
	setTop5();
}

const updateRedLog = (redPlayer, bluePlayer, action) => {
	let redTable = document.getElementById("red-log");

	let newRow = redTable.insertRow(-1);

	let redData = newRow.insertCell();
	redData.appendChild(document.createTextNode(redPlayer));

	let actionData = newRow.insertCell();
	actionData.appendChild(document.createTextNode(action));

	let blueData = newRow.insertCell();
	blueData.appendChild(document.createTextNode(bluePlayer));
}

const updateBlueLog = (bluePlayer, redPlayer, action) => {
	let blueTable = document.getElementById("blue-log");

	let newRow = blueTable.insertRow(-1);

	let blueData = newRow.insertCell();
	blueData.appendChild(document.createTextNode(bluePlayer));

	let actionData = newRow.insertCell();
	actionData.appendChild(document.createTextNode(action));

	let redData = newRow.insertCell();
	redData.appendChild(document.createTextNode(redPlayer));
}

const sortScores = (table) => {
	var scores, switching, i, score1, score2, shouldSwitch;
	switching = true;

	while (switching) {
		switching = false;
		scores = table.rows;

		for (i = 1; i < scores.length - 1; i++) {
			shouldSwitch = false;

			score1 = scores[i].getElementsByTagName("TD")[1];
			score2 = scores[i + 1].getElementsByTagName("TD")[1];

			if (parseInt(score1.innerHTML) < parseInt(score2.innerHTML)) {
				shouldSwitch = true;
				break;
			}
		}

		if (shouldSwitch) {
			scores[i].parentNode.insertBefore(scores[i + 1], scores[i]);
			switching = true;
		}
	}
};

const redWinning = () => {
	winningTeam = document.getElementById("winning-team");
	winningTeam.innerHTML = "Red";
	winningTeam.style.color = "#fa7055";
};

const blueWinning = () => {
	winningTeam = document.getElementById("winning-team");
	winningTeam.innerHTML = "Blue";
	winningTeam.style.color = "#758fe4";
};

const tieWinning = () => {
	winningTeam = document.getElementById("winning-team");
	winningTeam.innerHTML = "Tie";
	winningTeam.style.color = "silver";
};

const setTopRedPlayer = () => {
	topPlayer = document.getElementById("top-red");
	topPlayer.innerHTML = document.getElementsByClassName("red-team")[0].innerHTML;

}

const setTopBluePlayer = () => {
	topPlayer = document.getElementById("top-blue");
	topPlayer.innerHTML = document.getElementsByClassName("blue-team")[0].innerHTML;
}

const setTop5 = () => {
	redTable = document.getElementById("red-scores");
	blueTable = document.getElementById("blue-scores");
	top5Table = document.getElementById("top-table");

	redScores = redTable.rows;
	blueScores = blueTable.rows;
	let scores = [];

	for (let i = 1; (i < redScores.length) && (i < 6); i++) {
		scores.push(redScores[i].cells);
	}
	
	for (let i = 1; (i < blueScores.length) && (i < 6); i++) {
		scores.push(blueScores[i].cells);
	}

	scores.sort((a, b) => a[1].innerHTML - b[1].innerHTML)

	newBody = document.createElement("tbody");
	newBody.setAttribute("id", "t-body");

	// Populate Table
	for (let i = scores.length - 1; (i > scores.length - 6) && (i >= 0); i--) {
		newPlayerRow = newBody.insertRow(-1);

		newNameCell = newPlayerRow.insertCell();
		nameCellData = document.createTextNode(scores[i][0].innerHTML)

		newNameCell.appendChild(nameCellData);

		newScoreCell = newPlayerRow.insertCell();
		newScoreCell.appendChild(document.createTextNode(scores[i][1].innerHTML));
	}

	oldBody = document.getElementById("t-body");
	oldBody.parentNode.replaceChild(newBody, oldBody);
}