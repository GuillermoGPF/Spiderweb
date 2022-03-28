/*----------------------------------------------------------------------------------------------------------*/
/*                                           	Spiderweb Scripts                                           */
/*----------------------------------------------------------------------------------------------------------*/

// Chronometer
onload = function() {
    visor = document.getElementById("reloj"); //localizar pantalla del reloj
    //asociar eventos a botones: al pulsar el botón se activa su función.
    document.cron.empieza.onclick = empezar;
    document.cron.para.onclick = parar;
    document.cron.continua.onclick = continuar;
    document.cron.reinicia.onclick = reiniciar;
}

//variables de inicio:
var marcha = 0; //control del temporizador
var cro = 0; //estado inicial del cronómetro.

//cronometro en marcha. Empezar en 0:
function empezar() {
    if (marcha === 0) { //solo si el cronómetro esta parado
        emp = new Date() //fecha actual
        elcrono = setInterval(tiempo,10); //función del temporizador.
        marcha = 1 //indicamos que se ha puesto en marcha.
    }
}

function tiempo() { //función del temporizador
    actual = new Date() //fecha en el instante
    cro = actual - emp //tiempo transcurrido en milisegundos
    cr = new Date() //fecha donde guardamos el tiempo transcurrido
    cr.setTime(cro) 
    cs = cr.getMilliseconds() //milisegundos del cronómetro
    cs = cs/10; //paso a centésimas de segundo.
    cs = Math.round(cs)
    sg = cr.getSeconds(); //segundos del cronómetro
    mn = cr.getMinutes(); //minutos del cronómetro
    ho = cr.getHours() - 1; //horas del cronómetro
    if (cs < 10) {cs = "0"+cs;}  //poner siempre 2 cifras en los números
    if (sg < 10) {sg = "0"+sg;} 
    if (mn < 10) {mn = "0"+mn;} 
    visor.innerHTML = ho + " : " + mn + " : " + sg + " : " + cs; //pasar a pantalla.
}

//parar el cronómetro
function parar() { 
    if (marcha === 1) { //sólo si está en funcionamiento
        clearInterval(elcrono); //parar el crono
        marcha = 0; //indicar que está parado.
    }		
}		 

//Continuar una cuenta empezada y parada.
function continuar() {
    if (marcha === 0) { //sólo si el crono está parado
        emp2 = new Date(); //fecha actual
        emp2 = emp2.getTime(); //pasar a tiempo Unix
        emp3 = emp2 - cro; //restar tiempo anterior
        emp = new Date(); //nueva fecha inicial para pasar al temporizador 
        emp.setTime(emp3); //datos para nueva fecha inicial.
        elcrono = setInterval(tiempo,10); //activar temporizador
        marcha = 1;
    }		
}

//Volver al estado inicial
function reiniciar() {
    if (marcha === 1) { //si el cronómetro está en marcha:
        clearInterval(elcrono); //parar el crono
        marcha = 0;	//indicar que está parado
    }
    cro = 0; //tiempo transcurrido a cero
    visor.innerHTML = "0 : 00 : 00 : 00"; //visor a cero
}	

// -------------------------------------------------------------------------------------------------------

// Password Generator
function generatePassword(elm) {
    elm = document.getElementById(elm);
    elm.value = generateRandomPassword();
}

function generateRandomPassword() {
    return Math.random().toString(36).slice(-12);
}

// -------------------------------------------------------------------------------------------------------

// Transcript
function sayItOutLoud(id) {
    const message = document.getElementById(id).value;
    var speech = new SpeechSynthesisUtterance();
    speech.lang = "es-SP";
    // speech.lang = "en-US";

    //Set the text and voice attributes.
    speech.text = message;
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

// -------------------------------------------------------------------------------------------------------

// Textarea autoresize
$('textarea').each(function () {
    this.setAttribute('style', 'overflow-y: hidden;');
}).on('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// -------------------------------------------------------------------------------------------------------

// Music
const music = document.querySelector('.music');

function enableMute() {
    music.muted = true;
} 

function disableMute() {
    music.muted = false;
}

$(document).ready(function () {
    $('.play').show();
    $('.pause').hide();
    $('.pause').click(function () {
        $('.play').show();
        $('.pause').hide();
    });
    $('.play').click(function () {
        $('.pause').show();
        $('.play').hide();
    });

    $('.disable').hide();
    $('.enable').show();
    $('.enable').click(function () {
        $('.disable').show();
        $('.enable').hide();
    });

    $('.disable').click(function () {
        $('.enable').show();
        $('.disable').hide();
    });
    
    $('.music').on('timeupdate', function() {
        const myAudio = $(this)[0];
        const value = (100 / myAudio.duration) * myAudio.currentTime;
        $('.progress').val(value);

        $('.progress').click(function (e) {
            var pos = (e.pageX  - (this.offsetLeft + this.offsetParent.offsetLeft)) / this.offsetWidth;
            myAudio.currentTime = pos * myAudio.duration;
        });
    });
});

function handleFiles(event) {
    var files = event.target.files;
    $("#src").attr("src", URL.createObjectURL(files[0]));
    document.querySelector(".music").load();
    $('.play').hide();
    $('.pause').show();
}
document.getElementById("upload").addEventListener("change", handleFiles, false);

// -------------------------------------------------------------------------------------------------------

// Coins
function shuffleCoin() {
    const coin = document.getElementById('coin');
    let randomCoin = Math.floor(Math.random() * 2) + 1;
    coin.setAttribute('src', `./img/coin${randomCoin}.png`);
}

function launch() {
    setTimeout(shuffleCoin, 1200);
    const coin = document.getElementById('coin');
    coin.setAttribute('src', './img/moneda.gif');
}