let gameState = false;

const startGame = () => {
    gameState = true;
}

const setGameState = (state) => {
    gameState = state;
}

const isRunning = () => {
    return gameState;
}

module.exports = {
    startGame,
    setGameState,
    isRunning,
}