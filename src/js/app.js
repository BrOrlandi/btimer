import './inputMask';

import Timer from './timer';
import Elements from './elements';
import parseInput from './parseInput';
import isElectron from './isElectron';

import {
  timerInput,
  timerEdit,
  timerDisplay,
  play,
  pause,
  restart,
  body,
} from './definitions';

document.addEventListener('DOMContentLoaded', () => {
  const isElectronEnvironment = isElectron();
  const envClass = isElectronEnvironment ? 'isElectron' : 'isWeb';
  body.classList.add(envClass);
});

function playTimer() {
  Elements.showTimerDisplay();
  Elements.showPauseButton();

  Timer.start(() => {
    Elements.showPlayButton();
  });
}

function pauseTimer() {
  Elements.showPlayButton();
  Timer.stop();
}

function restartTimer() {
  pauseTimer();
  Timer.restart();
}

function playNewValue() {
  const inputText = timerInput.value || '0';

  const value = parseInput(inputText);
  pauseTimer();
  Timer.reset();
  Timer.setValue(value);
  if (value) {
    playTimer();
  }
}

play.addEventListener('click', () => {
  if (timerEdit.classList.contains('hide')) {
    playTimer();
    return;
  }
  playNewValue();
});

pause.addEventListener('click', () => {
  pauseTimer();
});

restart.addEventListener('click', () => {
  restartTimer();
});

document.addEventListener('keyup', (event) => {
  const { code } = event;
  if (event.target === timerInput) {
    return;
  }

  if (code === 'Escape') {
    restartTimer();
  } else if (code === 'Space' || code === 'Enter') {
    if (Timer.isRunning()) {
      pauseTimer();
      return;
    }
    playTimer();
  }
});

timerDisplay.addEventListener('click', () => {
  Elements.showTimerInput();
  pauseTimer();
});

timerInput.addEventListener('keyup', (event) => {
  const { code } = event;
  const isExitCode = code === 'Escape' ||
                    code === 'Space' ||
                    code === 'Enter';
  if (isExitCode) {
    Elements.showTimerDisplay();

    playNewValue();
  }
});
