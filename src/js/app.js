// Referencias a elementos de la interfaz
const scriptText = document.getElementById('script-text');
const btnPaste = document.getElementById('btn-paste');
const btnClear = document.getElementById('btn-clear');
const btnPlay = document.getElementById('btn-play');
const btnPause = document.getElementById('btn-pause');
const btnReset = document.getElementById('btn-reset');
const speedRange = document.getElementById('speed-range');
const speedValue = document.getElementById('speed-value');
const fontSizeRange = document.getElementById('font-size-range');
const fontSizeValue = document.getElementById('font-size-value');
const prompterScreen = document.getElementById('prompter-display');
const prompterContent = document.getElementById('prompter-content');
const statusLed = document.getElementById('status-led');
const statusLabel = document.getElementById('status-label');

// Variables de estado
let isRunning = false;
let scrollPosition = 0;
let animationFrameId = null;

// Actualizacion del estado visual
function updateStatus(active) {
    isRunning = active;
    if (active) {
        statusLed.src = 'img/led-active.png';
        statusLabel.textContent = 'En ejecución';
    } else {
        statusLed.src = 'img/led-inactive.png';
        statusLabel.textContent = 'Detenido';
    }
}

// Bucle de desplazamiento continuo
function scrollStep() {
    if (!isRunning) return;

    const speed = parseFloat(speedRange.value);
    scrollPosition -= speed;
    prompterContent.style.transform = `translateY(${scrollPosition}px)`;

    // Verificación de fin de texto
    const contentHeight = prompterContent.offsetHeight;
    if (Math.abs(scrollPosition) > (contentHeight + 200)) {
        pause();
        return;
    }

    animationFrameId = requestAnimationFrame(scrollStep);
}

// Cargar texto actual del editor al visor
function syncText() {
    const text = scriptText.value.trim();
    prompterContent.textContent = text.length > 0 ? text : 'Introduzca un texto para iniciar la lectura.';
}

// Iniciar o reanudar desplazamiento
function play() {
    if (isRunning) return;

    // Si el visor esta vacio o reiniciado, sincronizar con el texto actual
    if (scrollPosition === 0 || prompterContent.textContent === '') {
        syncText();
    }

    updateStatus(true);
    animationFrameId = requestAnimationFrame(scrollStep);
}

// Pausar desplazamiento
function pause() {
    updateStatus(false);
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
}

// Reiniciar posicion
function reset() {
    pause();
    scrollPosition = 0;
    prompterContent.style.transform = 'translateY(0px)';
    syncText();
}

// Asignacion de eventos de botones
btnPlay.addEventListener('click', play);
btnPause.addEventListener('click', pause);
btnReset.addEventListener('click', reset);

// Limpiar contenido y restablecer estado
btnClear.addEventListener('click', () => {
    pause();
    scriptText.value = '';
    prompterContent.textContent = 'Introduzca un texto para iniciar la lectura.';
    scrollPosition = 0;
    prompterContent.style.transform = 'translateY(0px)';
});

// Pegar texto desde el portapapeles y sincronizar
btnPaste.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        scriptText.value = text;
        syncText();
        reset();
    } catch {
        alert('No se pudo acceder al portapapeles. Inserte el texto manualmente.');
    }
});

// Actualizar visor si el usuario escribe o borra directamente en el textarea
scriptText.addEventListener('input', () => {
    if (!isRunning && scrollPosition === 0) {
        syncText();
    }
});

// Ajustes dinamicos
speedRange.addEventListener('input', () => {
    speedValue.textContent = speedRange.value;
});

fontSizeRange.addEventListener('input', () => {
    fontSizeValue.textContent = fontSizeRange.value;
    prompterContent.style.fontSize = `${fontSizeRange.value}px`;
});

// Atajo de teclado para alternar pausa/reanudacion
window.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && event.target !== scriptText) {
        event.preventDefault();
        isRunning ? pause() : play();
    }
});

// Inicializacion de parametros visuales
prompterContent.style.fontSize = `${fontSizeRange.value}px`;
syncText();