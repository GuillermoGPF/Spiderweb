// Dados
function shuffle() {
    const img1 = document.getElementById('dado1');
    const img2 = document.getElementById('dado2');
    let randomNumber1 = Math.floor(Math.random() * 6) + 1;
    let randomNumber2 = Math.floor(Math.random() * 6) + 1;
    img1.setAttribute('src', `./img/${randomNumber1}.png`);
    img2.setAttribute('src', `./img/${randomNumber2}.png`);
}

function anim() {
    setTimeout(shuffle, 500);
    const img1 = document.getElementById('dado1');
    img1.setAttribute('src', './img/dados.gif');
    const img2 = document.getElementById('dado2');
    img2.setAttribute('src', './img/dados.gif');
}

let click = true;
let letter = document.getElementById("btn-dado2");

function show() {
    if (click == true) {
        document.getElementById('dado2').style.display = "block";
        letter.innerHTML = "Quitar dado";
        click = false;
    } else {
        document.getElementById('dado2').style.display = "none";
        letter.innerHTML = "Segundo dado";
        click = true;
    }
}