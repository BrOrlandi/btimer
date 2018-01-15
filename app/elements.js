
class Elements {
  showPlayButton(){
    play.classList.remove('hide');
    pause.classList.add('hide');
  }

  showPauseButton(){
    play.classList.add('hide');
    pause.classList.remove('hide');
  }

  showTimerDisplay(){
    timerDisplay.classList.remove('hide');
    timerEdit.classList.add('hide');
  }

  showTimerInput(){
    timerDisplay.classList.add('hide');
    timerEdit.classList.remove('hide');
    timerInput.focus();
  }
}

module.exports = new Elements();