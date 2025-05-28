# 👾 Pac-Man Clásico en JavaScript
Este proyecto es una recreación del juego de Pac-Man, desarrollada desde cero utilizando únicamente HTML, CSS y JavaScript puro. Sin frameworks ni librerías externas. El objetivo es ofrecer una experiencia retro divertida y funcional directamente en el navegador web.
# 🚀 Fases Implementadas 
### 🎯 Estructura
- Se utilizo HTML 5 para realizar la estructuracion inicial de los elementos del juego.
- Mediante CSS se realizó la estilización del laberinto, estructurandolo en un cuadro de 10 x 10 casillas dentro del cual se posicionaron los obstaculos, Pac-Man, su alimento y sus enemigos.

### 😎 Personalizacion
- Se siguió implementando CSS para realizar la personalizacion del juego.
- Se utilizaron imagenes con `mask-image` para poder definir su color mas facilmente con `background-color`.
- Se utilizaron las clases `look-{direction}` para que pacman mire en la direccion en la que se mueve.
- Se crearon modales que se muestran cuando se pierde o se gana la partida.

### 🕹 Jugabilidad
- Se realizó la implementación de juego de pacman mediante JavaScript.
- Se programó el movimiento de Pac-Man mediante las flechas de direccion del teclado
- Se programó la una IA basica para los fantasmas. Mientras no estén asustados se moveran hacia la direccion donde pacman se encuentra.
- Se programó la puntuación de juego. Las pastillas blancas dan 5 puntos y las pastillas rojas dan 10 puntos y asustan a los fantasmas, volviendolos el alimento de pacman durante pocos segundos y haciendo que se se muevan confundidos de manera aleatorea.
- Si Pac-Man se come un fantasma, reaparecerá cuando el efecto de la pastilla roja haya pasado.
- Si los fantasmas no están asustados y tocan a Pac-Man este perderá una vida, si las vidas llegan a 0 la partida finalizará.

# 🎮 Instrucciones para jugar
Usa las flechas de direccion de tu teclado para mover a Pac-Man.
- ⬆ Arriba
- ⬇ Abajo
- ➡ Derecha
- ⬅ Izquierda

El objetivo es comer todos los puntos del laberinto sin ser atrapado por los fantasmas.

***Tienes 3 vidas. Cada vez que un fantasma te atrapa, pierdes una vida.***

El juego se acaba cuando comes todos los puntos o pierdes todas tus vidas.

# ✒ Créditos
*Desarrollado por **Daniel Alejandro Jerez Barreto***

*Imagenes recuperadas de https://www.streamlinehq.com*
- **Pacman:** https://www.streamlinehq.com/icons/download/pacman--26755
- **Fantasma:** https://www.streamlinehq.com/icons/download/ghost-fill--29392
