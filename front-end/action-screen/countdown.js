window.onload =  () => {
    const event = new CustomEvent("stop-game");

    let minute = 6;
    let second = 00;
    countdownTimer = setInterval(() => {

        if (minute == 0 && second == 0) {
            document.dispatchEvent(event);
            clearInterval(countdownTimer);
        }

        document.getElementById('timer').innerHTML = `${minute}:${String(second).padStart(2,'0')}`;
        second--;

        if (second < 0) {
            minute--;
            second = 59;
        }
    }, 1000);
};