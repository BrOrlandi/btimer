const TimerFunction = require('./TimerFunction');

const renderDisplay = require('./renderDisplay');


class Timer {
  constructor(){
    this.countdown = 26000; // 10 minutes
    this.display = timerDisplay;
    this.timer = new TimerFunction();
  }

  setValue(value){
    this.countdown = value;
    renderDisplay(this.display, this.countdown);
  }

  start(){
    this.timer = new TimerFunction((time) => {
      renderDisplay(this.display, time);
      if(0 === time){
        this.display.classList.remove('animate');
      }
    },this.countdown,true);
    this.display.classList.add('animate');
  }

  stop(){
    this.timer.stop();
    this.display.classList.remove('animate');
  }

};

module.exports = new Timer();