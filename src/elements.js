
class Elements {
  static showPlayButton() {
    play.classList.remove('hide');
    pause.classList.add('hide');
  }

  static showPauseButton() {
    play.classList.add('hide');
    pause.classList.remove('hide');
  }

  static showTimerDisplay() {
    timerDisplay.classList.remove('hide');
    timerEdit.classList.add('hide');
  }

  static showTimerInput() {
    timerDisplay.classList.add('hide');
    timerEdit.classList.remove('hide');
    timerInput.focus();
  }
}

module.exports = Elements;
