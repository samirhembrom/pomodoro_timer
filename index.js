const displayTimeEl = document.getElementById("display");
const buttonEl = document.getElementById("timer_start_stop");
displayTimeEl.innerHTML = "25:00";
//Get all the buttons with class class="buttons"
const btns = document.querySelectorAll(".buttons");
let sessionDuration = 1500;
let currentSession = 1500;
let isclockRunning = false;
let clockTimer;
//Loop through all the buttons and add  the active class to the current/clicked buttons
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    let activeButton = document.getElementsByClassName("active");
    activeButton[0].className = activeButton[0].className.replace(" active", "");
    this.className += " active";
    toggleClock(false);
    isclockRunning = false;
    timer_start_stop.innerHTML = "Start";
    setTimer(this.className[0]);
  })
}
//Setting display and session of the pomodoro
function setTimer(time) {
  if (time === "p") {
    sessionDuration = 1500;
    currentSession = 1500;
    displayTimer();
  } else if (time === "s") {
    sessionDuration = 300;
    currentSession = 300;
    displayTimer();
  } else if (time === "l") {
    sessionDuration = 900;
    currentSession = 900;
    displayTimer();
  }
}
//Adding Event listener to Start/Stop button and when reset is pressed the timer is reset to the currentSession
timer_start_stop.addEventListener("click", function() {
  if (timer_start_stop.innerHTML === "Reset") {
    sessionDuration = currentSession;
    timer_start_stop.innerHTML = "Start";
    displayTimer();
  }
  if (!isclockRunning) {
    timer_start_stop.innerHTML = "Stop";
  } else {
    timer_start_stop.innerHTML = "Start";
  }
  toggleClock(!isclockRunning);
})
//Setting interval for all the session
function toggleClock(play) {
  if (play) {
    isclockRunning = true;
    clockTimer = setInterval(() => {
      sessionDuration--;
      if (sessionDuration === 0) {
        clearInterval(clockTimer);
        //isclockRunning = false;
        timer_start_stop.innerHTML = "Reset";
        var audio = new Audio('sound.wav');
        audio.play();
      }
      displayTimer();
    }, 1000);
  } else {
    isclockRunning = false;
    clearInterval(clockTimer);
  }
}

//Displaying time 
function displayTimer() {
  const secsleft = sessionDuration;
  let result = "";
  const seconds = secsleft % 60;
  const minutes = parseInt(secsleft / 60) % 60;

  function addLeadingZeroes(time) {
    return time < 10 ? `0${time}` : time;
  }
  result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`;
  console.log(result);
  displayTimeEl.innerHTML = result;
}
