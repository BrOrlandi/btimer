const moment = require('moment');
const Timer = require('./Timer');

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

function closeWindow() {
  window.close();
}


const {remote} = require('electron')
const {Menu, MenuItem} = remote

const menu = new Menu()
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
}, false)