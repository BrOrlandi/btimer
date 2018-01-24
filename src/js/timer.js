import TimerFunction from './TimerFunction';
import renderDisplay from './renderDisplay';

import alarmSound from '../assets/Aquila.ogg';

const audio = new Audio(alarmSound);

class Timer {
  constructor() {
    this.display = timerDisplay;
    this.timer = new TimerFunction();
    this.timer.duration(this.countdown);
    this._running = false;
    this.setValue(600000); // 10 minutes
  }

  setValue(value) {
    this.countdown = value;
    this.timer.duration(this.countdown);
    renderDisplay(this.display, this.countdown);
  }

  start(endCallback) {
    this._running = true;
    this._ennCallback = endCallback;
    this.timer.callback((time) => {
      renderDisplay(this.display, time);
      if (time <= 10000) {
        this.display.classList.add('hurry');
      }
      if (time === 0) {
        this._end();
      }
    });
    this.timer.start(false);
    this.display.classList.add('animate');
  }

  stop() {
    this.timer.stop();
    this.display.classList.remove('animate');
    this.display.classList.remove('hurry');
    this._running = false;
  }

  reset() {
    this.timer.reset();
  }

  restart() {
    this.timer.reset(true);
    renderDisplay(this.display, this.countdown);
  }

  isRunning() {
    return this._running;
  }

  _end() {
    audio.play();
    setTimeout(() => {
      this.stop();
      this.restart();
    }, 2000);
    this._ennCallback();
  }
}

module.exports = new Timer();
