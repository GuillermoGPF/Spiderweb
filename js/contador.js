/*----------------------------------------------------------------------------------------------------------*/
/*                                             Counter Script                                               */
/*----------------------------------------------------------------------------------------------------------*/

let target_time;
let start_time;

function setCounter() {
    target_time = new Date();
    start_time = target_time;
    let new_value = document.getElementById('input-timer').value;
    new_value = new_value.split(':');

    let hours = target_time.getHours() + Number(new_value[0]);
    let minutes = target_time.getMinutes() + Number(new_value[1]);

    target_time.setHours(hours);
    target_time.setMinutes(minutes);
    updateTimer(null);

    let i = setInterval(function() {
        updateTimer(i);
    }, 1000);
}

function updateTimer(i) {
    let target_count_down = target_time.getTime();
    let now = new Date().getTime();
    let distance = target_count_down - now;

    let hours = Math.floor((distance % (1000 * 60 * 60 * 24))/(1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60))/(1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60))/1000);

    let output;
    if (hours < 10) {
        output = '0' + hours + ':';
    } else {
        output = hours + ':';
    }

    if (minutes < 10) {
        output += '0' + minutes + ':';
    } else {
        output += minutes + ':';
    }

    if (seconds < 10) {
        output += '0' + seconds;
    } else {
        output += seconds;
    }
    document.getElementById('timer').innerHTML = output;

    if (distance < 0) {
        clearInterval(i);
        document.getElementById('timer').innerHTML = 'Fin';
    }
}