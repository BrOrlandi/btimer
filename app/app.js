const moment = require('moment');
const Timer = require('./Timer');
var {ipcRenderer, remote} = require('electron');

const parseTime = (time) => {
    let momentTime = moment.duration(time, 'milliseconds');
    let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
    let min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes();
    let mil = Math.floor(momentTime.milliseconds());

    if(mil < 100){
      mil = '0'+mil;
    }
    if(mil < 10){
      mil = '0'+mil;
    }

    const text = `${min}:${sec}:${mil}`;
    return text.split('').map((char) => {
      return `<span>${char}</span>`;
    }).join('');
};

const timer = new Timer((time) => {
  timerDiv.innerHTML = parseTime(time);
},26000,true);

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  ipcRenderer.send('asynchronous-message', 'menu');

}, false)