document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const cells = Array.from(grid.querySelectorAll("div"));

  const width = 10;
  let pacManIndex = 11;
  let score = 0;
  let endState = false;

  let lifes = 3;

  class Ghost {
    constructor(name, startIndex, className, speed = 500) {
      this.name = name;
      this.currentIndex = startIndex;
      this.startIndex = startIndex;
      this.className = className;
      this.speed = speed;
      this.timerId = null;
      this.directions = [-1, 1, -width, width];
      this.isScared = false;
      this.scaredTimeout = null;
      this.resurrectInterval = null;
    }

    draw() {
      cells[this.currentIndex].classList.add("ghost", this.className);
      if (this.isScared) {
        cells[this.currentIndex].classList.add("scared");
      } else {
        cells[this.currentIndex].classList.remove("scared");
      }
    }

    erase() {
      cells[this.currentIndex].classList.remove(
        "ghost",
        this.className,
        "scared"
      );
    }

    move() {
      const moveGhost = () => {
        let direction;
        let nextIndex;
        const maxAttemps = 10;
        let attempts = 0;

        if (this.isScared) {
          do {
            direction =
              this.directions[
                Math.floor(Math.random() * this.directions.length)
              ];
            nextIndex = this.currentIndex + direction;
            attempts++;
          } while (
            (cells[nextIndex].classList.contains("wall") ||
              cells[nextIndex].classList.contains("ghost") ||
              cells[nextIndex].classList.contains("pacman")) &&
            attempts < maxAttemps
          );

          if (attempts >= maxAttemps) return;
        } else {
          const pacmanX = pacManIndex % width;
          const pacmanY = Math.floor(pacManIndex / width);

          const ghostX = this.currentIndex % width;
          const ghostY = Math.floor(this.currentIndex / width);

          const dx = pacmanX - ghostX;
          const dy = pacmanY - ghostY;

          const directions = [];

          if (Math.abs(dx) > Math.abs(dy)) {
            directions.push(dx > 0 ? 1 : -1);
            directions.push(dy > 0 ? width : -width);
          } else {
            directions.push(dy > 0 ? width : -width);
            directions.push(dx > 0 ? 1 : -1);
          }

          this.directions.forEach((dir) => {
            if (!directions.includes(dir)) {
              directions.push(dir);
            }
          });

          for (const dir of directions) {
            const next = this.currentIndex + dir;

            if (
              !cells[next].classList.contains("wall") &&
              !cells[next].classList.contains("ghost")
            ) {
              direction = dir;
              nextIndex = next;
              break;
            }
          }

          if (direction == undefined) return;
        }

        this.erase();
        this.currentIndex = nextIndex;
        this.draw();

        if (this.currentIndex === pacManIndex) {
          if (this.isScared) {
            this.kill();
          } else {
            lifes--;
            updateLifes();
          }
        }
      };

      this.timerId = setInterval(moveGhost, this.speed);
    }

    setScared() {
      this.isScared = true;
      this.draw();
      clearTimeout(this.scaredTimeout);
      this.scaredTimeout = setTimeout(() => {
        this.isScared = false;
        this.draw();
        // this.move();
      }, 3000);
    }

    kill() {
      this.erase();
      clearInterval(this.timerId);
      // clearTimeout(this.scaredTimeout);
      this.resurrectInterval = setInterval(() => {
        if (!this.isScared) {
          clearInterval(this.resurrectInterval);
          this.move();
        }
      }, 500);
      score += 100;
      this.currentIndex = this.startIndex;
      updateScore();
    }
  }

  const blinky = new Ghost("blinky", 81, "red", 500);
  const pinky = new Ghost("pinky", 87, "pink", 600);
  const ghosts = [blinky, pinky];

  ghosts.forEach((ghost) => {
    ghost.draw();
    ghost.move();
  });

  function drawPacman() {
    cells.forEach((cell) => cell.classList.remove("pacman"));
    cells[pacManIndex].classList.add("pacman");
  }

  function updateScore() {
    document.querySelector("#score").textContent = score;
    const dots = document.querySelectorAll(".dot, .power-pellet").length;
    if (dots <= 0) end();
  }

  function updateLifes() {
    document.querySelector("#lifes").textContent = lifes;
    if (lifes <= 0) loose();
  }

  function eat() {
    const pacmanClasslist = cells[pacManIndex].classList;

    if (pacmanClasslist.contains("dot")) {
      cells[pacManIndex].classList.remove("dot");
      score += 5;
    } else if (pacmanClasslist.contains("power-pellet")) {
      cells[pacManIndex].classList.remove("power-pellet");
      score += 10;
      ghosts.forEach((ghost) => ghost.setScared());
    }

    if (pacmanClasslist.contains("ghost")) {
      if (pacmanClasslist.contains("scared")) {
        ghosts.find(({ currentIndex }) => currentIndex == pacManIndex).kill();
      } else {
        lifes--;
        updateLifes();
      }
    }

    updateScore();
  }

  function end() {
    endState = true;
    document.querySelector(".backdrop").classList.add("flex");
    endState = true;
    ghosts.forEach((ghost) => {
      clearInterval(ghost.timerId);
      clearInterval(ghost.resurrectInterval);
      clearTimeout(ghost.scaredTimeout);
      ghost.erase();
    });
  }

  function loose() {
    document.getElementById("msg-title").textContent = "¡Que mal!";
    document.getElementById("msg-paragraph").textContent =
      "🤡💀 ¡Has perdido! 💀🤡";
    end();
  }

  drawPacman();
  updateScore();
  updateLifes();

  document.addEventListener("keydown", (e) => {
    if (endState) return;

    cells[pacManIndex].classList.remove(
      "pacman",
      "look-left",
      "look-up",
      "look-down"
    );

    var looking;

    switch (e.key) {
      case "ArrowLeft":
        if (
          pacManIndex % width !== 0 &&
          !cells[pacManIndex - 1].classList.contains("wall")
        ) {
          pacManIndex -= 1;
        }
        looking = "look-left";
        break;
      case "ArrowRight":
        if (
          pacManIndex % width < width - 1 &&
          !cells[pacManIndex + 1].classList.contains("wall")
        ) {
          pacManIndex += 1;
        }
        break;
      case "ArrowUp":
        if (
          pacManIndex - width >= 0 &&
          !cells[pacManIndex - width].classList.contains("wall")
        ) {
          pacManIndex -= width;
        }
        looking = "look-up";
        break;
      case "ArrowDown":
        if (
          pacManIndex + width < cells.length &&
          !cells[pacManIndex + width].classList.contains("wall")
        ) {
          pacManIndex += width;
        }
        looking = "look-down";
        break;
    }
    drawPacman();

    if (looking && !cells[pacManIndex].classList.contains("ghost")) {
      cells[pacManIndex].classList.add(looking);
    }

    eat();
  });
});
