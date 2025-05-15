document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector(".grid");
    const cells = Array.from(grid.querySelectorAll("div"));

    const width = 10;
    let pacManIndex = 11;

    class Ghost {
        constructor(name, startIndex, className, speed = 500) {
            this.name = name;
            this.currentIndex = startIndex;
            this.className = className;
            this.speed = speed;
            this.timerId = null;
            this.directions = [-1, 1, -width, width]
        }

        draw() {
            cells[this.currentIndex].classList.add('ghost', this.className);
        }

        erase() {
            cells[this.currentIndex].classList.remove('ghost', this.className);
        }

        move() {
            const moveGhost = () => {
                const direction = this.directions[Math.floor(Math.random() * this.directions.length)]; const nextIndex = this.currentIndex + direction;

                if (
                    !cells[nextIndex].classList.contains('wall') &&
                    !cells[nextIndex].classList.contains('ghost')
                ) {
                    this.erase();
                    this.currentIndex = nextIndex;
                    this.draw();
                } else {
                    moveGhost();
                }
            }

            this.timerId = setInterval(moveGhost, this.speed);
        }
    }

    const blinky = new Ghost('blinky', 35, 'red', 500);
    const pinky = new Ghost('pinky', 36, 'pink', 600);
    const ghosts = [blinky, pinky];

    ghosts.forEach(ghost => {
        ghost.draw();
        ghost.move();
    });

    function drawPacman() {
        cells.forEach(cell => cell.classList.remove('pacman'));
        cells[pacManIndex].classList.add('pacman');
    }

    drawPacman();

    document.addEventListener('keydown', (e) => {
        cells[pacManIndex].classList.remove('pacman');

        switch (e.key) {
            case 'ArrowLeft':
                if (pacManIndex % width !== 0 && !cells[pacManIndex - 1].classList.contains('wall')) {
                    pacManIndex -= 1;
                }
                break;
            case 'ArrowRight':
                if (pacManIndex % width < width - 1 && !cells[pacManIndex + 1].classList.contains('wall')) {
                    pacManIndex += 1;
                }
                break;
            case 'ArrowUp':
                if (pacManIndex - width >= 0 && !cells[pacManIndex - width].classList.contains('wall')) {
                    pacManIndex -= width;
                }
                break;
            case 'ArrowDown':
                if (pacManIndex + width < cells.length && !cells[pacManIndex + width].classList.contains('wall')) {
                    pacManIndex += width;
                }
                break;
        }
        
        drawPacman();
    })
});