import moment from 'moment';

function splitTime(time) {
  const momentTime = moment.duration(time, 'milliseconds');
  const sec = momentTime.seconds() < 10 ? (`0${momentTime.seconds()}`) : momentTime.seconds();
  const min = momentTime.minutes() < 10 ? (`0${momentTime.minutes()}`) : momentTime.minutes();
  let mil = Math.floor(momentTime.milliseconds());

  if (mil < 100) {
    mil = `0${mil}`;
  }

  if (mil < 10) {
    mil = `0${mil}`;
  }

  const minDigist = `${min}`.split('');
  const secDigist = `${sec}`.split('');
  const milDigist = `${mil}`.split('');
  return minDigist
    .concat(secDigist)
    .concat(milDigist);
}

module.exports = function renderDisplay(display, time) {
  const digits = splitTime(time);

  const digitsDisplay = display.querySelectorAll('.digit');

  digits.forEach((digit, index) => {
    digitsDisplay[index].innerText = digit;
  });
};
