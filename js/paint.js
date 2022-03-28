/*----------------------------------------------------------------------------------------------------------*/
/*                                             Paint Script                                                 */
/*----------------------------------------------------------------------------------------------------------*/

// VARIABLES
let canvas = document.getElementById('canvas');
let lineas = [];
let correccionX = 0;
let correccionY = 0;
let pintarLinea = false;
let color = '#000';

// Marca el nuevo punto
let nuevaPosicionX = 0;
let nuevaPosicionY = 0;

let posicion = canvas.getBoundingClientRect()
correccionX = posicion.x;
correccionY = posicion.y;

// Paleta draggalge
$('#config').draggable();

resize();
window.addEventListener('resize', resize);

// FUNCIONES

// Tamaño pantalla
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Color
function setColor(elm) {
    color = elm.dataset.color;
}

// Funcion que empieza a dibujar la linea
function empezarDibujo() {
    pintarLinea = true;
    lineas.push([]);
};

// Funcion que guarda la posicion de la nueva línea
function guardarLinea() {
    lineas[lineas.length - 1].push({
        x: nuevaPosicionX,
        y: nuevaPosicionY
    });
}

// Funcion dibuja la linea
function dibujarLinea(event) {
    event.preventDefault();
    if (pintarLinea) {
        let ctx = canvas.getContext('2d')

        // Estilos de linea
        ctx.lineJoin = ctx.lineCap = 'round';

        //Barra de tamaños
        $("#range").change(function() {
            $("#number-range").html($("#range").val());
            let a = $('#number-range').text();
            ctx.lineWidth = a;
        });

        //Color de la línea
        $('#color-line').on('change', function() {
            ctx.strokeStyle =  (this.value);
            ctx.fillStyle = (this.value);
        });

        //Color de fondo
        $('#canvas').css('background-color','#f5f5f5');
        $('#color-bg').on('change', function() {
            $('#canvas').css('background-color',(this.value));
        });

        // Marca el nuevo punto
        if (event.changedTouches == undefined) {
            // Versión ratón
            nuevaPosicionX = event.layerX;
            nuevaPosicionY = event.layerY;
        } else {
            // Versión touch, pantalla tactil
            nuevaPosicionX = event.changedTouches[0].pageX - correccionX;
            nuevaPosicionY = event.changedTouches[0].pageY - correccionY;
        }
        // Guarda la linea
        guardarLinea();
        // Redibuja todas las lineas guardadas
        ctx.beginPath();
        lineas.forEach(function (segmento) {
            ctx.moveTo(segmento[0].x, segmento[0].y);
            segmento.forEach(function (punto, index) {
                ctx.lineTo(punto.x, punto.y);
            });
        });
        ctx.stroke();
    }
}

// Funcion que deja de dibujar la linea
function pararDibujar () {
    pintarLinea = false;
    guardarLinea();
}

// Eventos raton
canvas.addEventListener('mousedown', empezarDibujo, false);
canvas.addEventListener('mousemove', dibujarLinea, false);
canvas.addEventListener('mouseup', pararDibujar, false);

// Eventos pantallas táctiles
canvas.addEventListener('touchstart', empezarDibujo, false);
canvas.addEventListener('touchmove', dibujarLinea, false);

//Creamos la imagen del canvas
let jpeg = document.getElementById("jpeg");
jpeg.addEventListener("click", () => {
    // Crear un elemento <a>
    let enlace = document.createElement('a');
    // El título
    enlace.download = "paint.jpg";
    // Convertir la imagen a Base64 y ponerlo en el enlace
    enlace.href = canvas.toDataURL();
    // Hacer click en él
    enlace.click();
});

// Paleta
let click = true;
$('#config').hide();
$('.float').click(function() {
    if (click == true) {
        $('#config').show('blind');
        click = false;
    } else {
        $('#config').hide('blind');
        click = true;
    }
});