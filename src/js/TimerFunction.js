
class TimerFunction {
  /**
   * Creates a new timer
   * @param {function} callback - The callback method called on each tick
   * @param {integer} duration - The timer's duration
   * @param {boolean} autostart - Controls whether the time is going to start automatically or not
   */
  constructor(callback, duration /* miliseconds */, autostart) {
    // In case no arguments where provided initializing the attributes
    this.timeAttr = 0;
    this.startAttr = null;
    this.durationAttr = null;
    this.callbackAttr = null;

    if (arguments.length) {
      this.callback(callback);
      this.duration(duration);
      this.reset();
      if (autostart) this.start();
    }
  }

  /** Private method that return the current timestamp */
  static _now() {
    return window.performance ? window.performance.now() : Date.now();
  }

  /** Private method that run on each animationFrame */
  _tick() {
    if (this.startAttr === false) return;
    this.timeAttr = this.timeAttr + (this._now() - this.startAttr);
    this.stop();
    this.callbackAttr(this.time());
    this.start();
  }

  /**
   * Starts the timer
   * @param {boolean} reset - Controls whether the timer is going to restart or not
   */
  start(reset /* true to restart */) {
    if (reset) this.reset(true);
    if (!this.callbackAttr || this.startAttr || this.timeAttr > this.durationAttr) return;
    this.startAttr = this._now();
    requestAnimationFrame(() => {
      this._tick();
    });
  }

  /** Stop the counter */
  stop() {
    this.startAttr = false;
  }

  /**
   * Resets the counter
   * @param {boolean} stop - Controls whether to stop the counter or not
   */
  reset(stop) {
    if (stop) this.stop();
    this.timeAttr = 0;
  }

  /**
   * Sets the duration
   * @param {integer} ms - The number of miliseconds the timer is goint to count
   */
  duration(ms) {
    if (ms) this.durationAttr = ms;
    return this.durationAttr;
  }

  /**
   * Sets the callback function
   * @param {function} fn - The callback function that is going to run on each tick
   */
  callback(fn) {
    if (typeof fn === 'function') this.callbackAttr = fn;
    return fn;
  }

  /**
   *
   * @param {boolean} elapsed - Timer is going to show the elapsed or remaining time
   */
  time(elapsed /* true for elapsed instead of remaining */) {
    return !!elapsed
        || !this.durationAttr
      ? this.timeAttr
      : Math.max(0, this.durationAttr - this.timeAttr);
  }
}

module.exports = TimerFunction;
