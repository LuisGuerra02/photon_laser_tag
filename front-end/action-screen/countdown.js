window.onload =  () => {
    let minute = 6;
    let second = 00;
    countdownTimer = setInterval(() => {

        if (minute == 0 && second == 0) {
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
