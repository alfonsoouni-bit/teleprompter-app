# Teleprompter Web

Aplicación web diseñada para la asistencia en lectura continua de guiones y presentaciones mediante desplazamiento automático configurable.

## Características
- Edición y carga rápida de texto mediante acciones directas (Pegar, Limpiar, Ejecutar, Pausar y Reiniciar).
- Control dinámico de velocidad de desplazamiento y escala tipográfica.
- Indicador visual de estado operativo (activo/detenido).
- Atajo de teclado: Barra espaciadora para alternar entre pausa y reanudación.

## Estructura del repositorio
El proyecto cuenta con dos entornos de código delimitados:

- **Código fuente (`src/`):** Contiene los archivos sin comprimir (`styles.css`, `app.js`) estructurados para mantenimiento, lectura y depuración en desarrollo.
- **Distribución de producción (`dist/`):** Contiene la versión optimizada para despliegue en servidor web. Incluye los archivos minificados (`styles.min.css`, `app.min.js`), imágenes optimizadas y el `index.html` enlazado a los recursos comprimidos para minimizar la latencia de transferencia.

## Despliegue
La carpeta `dist/` constituye el artefacto final listo para servirse a través de servidores web como Nginx o Apache.