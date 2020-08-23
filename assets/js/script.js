const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 40;

function handleKeyUp(event) {
  if (event.keyCode === 32 || event.keyCode === 38) {
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  let jumpSpeedUp = 50;
  let jumpSpeedDown = 50;
  let jumpHeight = 200;
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= jumpHeight) {
      clearInterval(upInterval);

      let downInterval = setInterval(() => {
        if (position <= 40) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = `${position}px`;
        }
      }, jumpSpeedDown);
    } else {
      position += 80;
      dino.style.bottom = `${position}px`;
    }
  }, jumpSpeedUp);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = `${cactusPosition}px`;

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftTimer);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = `<div class="game-over">
      <h1>Fim de jogo</h1>
      <img src="./assets/img/dino.png">
      </div>`;
    } else {
      cactusPosition -= 10;
      cactus.style.left = `${cactusPosition}px`;
    }
  }, 40);

  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
