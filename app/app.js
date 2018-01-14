require('./inputMask');

const moment = require('moment');
const Timer = require('./timer');
const parseInput = require('./parseInput');

timerDisplay.addEventListener('click', (e) => {
  timerDisplay.classList.add('hide');
  timerEdit.classList.remove('hide');
  timerInput.focus();
  Timer.stop();
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
    Timer.setValue(value);
    if(value){
      Timer.start();
    }
  }
});

Timer.setValue(600000);
