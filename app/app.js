require('./inputMask');

const moment = require('moment');
const Timer = require('./timer');
const Elements = require('./elements');
const parseInput = require('./parseInput');

timerDisplay.addEventListener('click', (e) => {
  Elements.showTimerInput();
  pauseTimer();
});

timerInput.addEventListener('keyup', (e) => {
  const code = e.code;
  const isExitCode = 'Escape' === code ||
                    'Space' === code ||
                    'Enter' === code;
  if(isExitCode){
    Elements.showTimerDisplay();

    playNewValue();
  }
});

function playNewValue(){
  const inputText = timerInput.value || '0';

  const value = parseInput(inputText);
  pauseTimer();
  Timer.reset();
  Timer.setValue(value);
  if(value){
    playTimer();
  }
}

function playTimer(){
  Elements.showTimerDisplay();
  Elements.showPauseButton();

  Timer.start(() => {
    Elements.showPlayButton();
  });
}

function pauseTimer(){
  Elements.showPlayButton();
  Timer.stop();
}

function restartTimer(){
  pauseTimer();
  Timer.restart();
}

play.addEventListener('click', (e) => {
  if(timerEdit.classList.contains('hide')){
    playTimer();
    return ;
  }
  playNewValue();
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