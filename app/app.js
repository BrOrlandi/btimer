require('./inputMask');

const moment = require('moment');
const Timer = require('./timer');
const parseInput = require('./parseInput');

timerDisplay.addEventListener('click', (e) => {
  timerDisplay.classList.add('hide');
  timerEdit.classList.remove('hide');
  timerInput.focus();
  pauseTimer();
});

timerInput.addEventListener('keyup', (e) => {
  const code = e.code;
  const isExitCode = 'Escape' === code ||
                    'Space' === code ||
                    'Enter' === code;
  if(isExitCode){
    timerDisplay.classList.remove('hide');
    timerEdit.classList.add('hide');

    const inputText = e.target.value || '0';

    const value = parseInput(inputText);
    pauseTimer();
    Timer.reset();
    Timer.setValue(value);
    if(value){
      playTimer();
    }
  }
});

function playTimer(){
  timerDisplay.classList.remove('hide');
  timerEdit.classList.add('hide');

  play.classList.add('hide');
  pause.classList.remove('hide');
  Timer.start();
}

function pauseTimer(){
  play.classList.remove('hide');
  pause.classList.add('hide');
  Timer.stop();
}

function restartTimer(){
  pauseTimer();
  Timer.restart();
}

play.addEventListener('click', (e) => {
  playTimer();
});

pause.addEventListener('click', (e) => {
  pauseTimer();
});

restart.addEventListener('click', (e) => {
  restartTimer();
});

document.addEventListener('keyup', (e) => {
  const code = e.code;
  if(e.target === timerInput) {
    return;
  }

  if('Escape' === code){
    restartTimer();
  }
  else if('Space' === code || 'Enter' === code){
    if(Timer.isRunning()){
      pauseTimer();
      return;
    }
    playTimer();
  }
});