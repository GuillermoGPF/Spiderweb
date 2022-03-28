// Ruleta
let ruleta = document.querySelector('.ruleta');
let btn = document.getElementById('spin');
let number = Math.ceil(Math.random() * 1000);

btn.onclick = function() {
    ruleta.style.transform = 'rotate(' + number + 'deg)';
    number += Math.ceil(Math.random() * 1000);
}

function resultado(){
    let nom1 = document.getElementById('input-one').value;
    document.querySelector('.one').innerHTML = nom1;
    let nom2 = document.getElementById('input-two').value;
    document.querySelector('.two').innerHTML = nom2;
    let nom3 = document.getElementById('input-three').value;
    document.querySelector('.three').innerHTML = nom3;
    let nom4 = document.getElementById('input-four').value;
    document.querySelector('.four').innerHTML = nom4;
    let nom5 = document.getElementById('input-five').value;
    document.querySelector('.five').innerHTML = nom5;
    let nom6 = document.getElementById('input-six').value;
    document.querySelector('.six').innerHTML = nom6;
    let nom7 = document.getElementById('input-seven').value;
    document.querySelector('.seven').innerHTML = nom7;
    let nom8 = document.getElementById('input-eight').value;
    document.querySelector('.eight').innerHTML = nom8;
}