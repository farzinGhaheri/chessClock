let playing = false;
let currentPlayer = Number;
const panel = document.querySelector('.player');
const buttons = document.querySelectorAll('.bttn');
let start = document.querySelector('.star');
let player2  = document.querySelector('.ply2');
let player1 = document.querySelector('.ply1')
// Sound effects for project.
// const timesUp = new Audio('audio/460133__eschwabe3__robot-affirmative.wav');
// const click = new Audio('audio/561660__mattruthsound.wav');

// Add a leading zero to numbers less than 10.
const padZero = (number) => {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}

// Warn the player if time drops below thirty seconds.
const timeWarning = (player, min, sec) => {
        // Change the numbers to red below 0 minutes and 30 seconds
        if (min < 1 && sec <= 30) {
            if (player === 1) {
                document.querySelector('.player-1 .player__digits').style.color = '#CC0000';
            } else {
                document.querySelector('.player-2 .player__digits').style.color = '#CC0000';
            }
        }
}

// Create a class for the timer.
class Timer {
    constructor(player, minutes) {
        this.player = player;
        this.minutes = minutes;
    }
    getMinutes(timeId) {
        return document.getElementById(timeId).textContent;
    }
}

// Create an instance of the timer for each player.
let p1time = new Timer('min1', document.getElementById('min1').textContent);
let p2time = new Timer('min2', document.getElementById('min2').textContent);

// Swap player's timer after a move (player1 = 1, player2 = 2).
const swapPlayer = () => {
    if (!playing) return;
    // Toggle the current player.
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    // Play the click sound.
    // click.play();//need to add sound
}

// Start timer countdown to zero.
const startTimer = () => {
    playing = true;
    let p1sec = 60;
    let p2sec = 60;

    let timerId = setInterval(function() {
        // Player 1.


        if (currentPlayer === 1) {
            console.log('inside 1')
            if (playing) {
                player2.style.pointerEvents='none'
                player1.style.pointerEvents='visible'
                player1.addEventListener('click',swapPlayer)
                p1time.minutes = parseInt(p1time.getMinutes('min1'), 10);
                if (p1sec === 60) {
                    p1time.minutes = p1time.minutes - 1;
                }
                p1sec = p1sec - 1;
                document.getElementById('sec1').textContent = padZero(p1sec);
                document.getElementById('min1').textContent = padZero(p1time.minutes);
                if(p1sec === 30){
                   return timeWarning(1, 0 , 30);
                }
                if (p1sec === 0) {
                    // If minutes and seconds are zero stop timer with the clearInterval method.
                    if (p1sec === 0 && p1time.minutes === 0) {
                        // Play a sound effect.
                        // timesUp.play();// need to add sound
                        // Stop timer.
                        clearInterval(timerId);
                        playing = false;
                    }
                    p1sec = 60;
                }
            }
        } else if(currentPlayer === 2) {
            // Player 2.
            console.log('inside 2')
            if (playing) {
                player1.style.pointerEvents='none'
                player2.style.pointerEvents='visible'
                p2time.minutes = parseInt(p2time.getMinutes('min2'), 10);
                player2.addEventListener('click',swapPlayer)
                if (p2sec === 60) {
                    p2time.minutes = p2time.minutes - 1;
                }
                p2sec = p2sec - 1;
                document.getElementById('sec2').textContent = padZero(p2sec);
                document.getElementById('min2').textContent = padZero(p2time.minutes);
                if(p2sec === 30){
                    return timeWarning(2, 0 , 30);
                 }
                else if (p2sec === 0) {
                    // If minutes and seconds are zero stop timer with the clearInterval method.
                    if (p2sec === 0 && p2time.minutes === 0) {
                        // Play a sound effect.
                        // timesUp.play(); //need to add sound
                        // Stop timer.
                        clearInterval(timerId);
                        playing = false;
                    }
                    p2sec = 60;
                }
            }
        }
    }, 1000);
}


// Loop through the start and reset buttons.

function getStart() {
    start.style.color = '#EEEEEE';
    start.style.backgroundColor = '#606060';
    start.classList.add('disabled')
    startTimer();
    swapPlayer();
}
function restarts(){
    location.reload(true);
}