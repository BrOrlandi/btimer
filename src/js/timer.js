import TimerFunction from './TimerFunction';
import renderDisplay from './renderDisplay';

import alarmSound from '../assets/Aquila.ogg';

import { timerDisplay } from './definitions';

const audio = new Audio(alarmSound);

class Timer {
  constructor() {
    this.display = timerDisplay;
    this.timer = new TimerFunction();
    this.timer.duration(this.countdown);
    this._running = false;
    this.setValue(600000); // 10 minutes
    this.endTimeout = null;
    this._autoRestart = false;
    this._autoRestartTimeout = null;
  }

  setValue(value) {
    this.countdown = value;
    this.timer.duration(this.countdown);
    renderDisplay(this.display, this.countdown);
  }

  toggleAutoRestart() {
    this._autoRestart = !this._autoRestart;
  }

  start(endCallback) {
    this._running = true;
    this._endCallback = endCallback;

    this.timer.callback((time) => {
      renderDisplay(this.display, time);
      if (time <= 10000) {
        this.display.classList.add('hurry');
      }
    });

    this.endTimeout = setTimeout(() => {
      this._end();
    }, this.countdown);

    this.timer.start(false);
    this.display.classList.add('animate');
  }

  stop() {
    if (this.endTimeout) {
      clearTimeout(this.endTimeout);
      this.endTimeout = null;
    }

    this.timer.stop();
    this.display.classList.remove('animate');
    this.display.classList.remove('hurry');
    this._running = false;
  }

  reset() {
    this.timer.reset();
  }

  restart(cancelAutoRestart) {
    if (cancelAutoRestart) {
      clearTimeout(this._autoRestartTimeout);
    }
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

    if (!this._autoRestart) {
      this._endCallback();

      return;
    }

    this._autoRestartTimeout = setTimeout(() => {
      this.start(null);
    }, 3000);
  }
}

module.exports = new Timer();
