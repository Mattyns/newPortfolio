const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const toggleButton = document.getElementById('toggle__button--star');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Controle de ativação/desativação
let starsEnabled = true;

toggleButton.addEventListener('click', () => {
  starsEnabled = !starsEnabled;

  // Alternar o ícone entre estrela cheia e vazia
  toggleButton.classList.toggle('bi-star-fill');
  toggleButton.classList.toggle('bi-star');

  // Alternar o valor do atributo data-effect
  if (toggleButton.dataset.effect === 'Desativar Efeito') {
    toggleButton.dataset.effect = 'Ativar Efeito';
  } else {
    toggleButton.dataset.effect = 'Desativar Efeito';
  }

  // Trocar cor como feedback visual (opcional)
  toggleButton.style.color = starsEnabled ? 'white' : 'gray';
});

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width * 0.2 - 100;
    this.y = Math.random() * canvas.height;
    this.length = Math.random() * 80 + 50;
    this.speed = Math.random() * 4 + 4;
    this.opacity = Math.random() * 0.5 + 0.5;
    this.angle = Math.PI / 6;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);

    if (this.x > canvas.width || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(
      this.x - this.length * Math.cos(this.angle),
      this.y - this.length * Math.sin(this.angle)
    );
    ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// Criar estrelas
const stars = [];
for (let i = 0; i < 4; i++) {
  stars.push(new Star());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (starsEnabled) {
    for (const star of stars) {
      star.update();
      star.draw();
    }
  }

  requestAnimationFrame(animate);
}

animate();


//menu left

const menuLeft = document.querySelector('.menu__left')
const menuLeftButton = document.querySelector('.menu__left--button')

menuLeftButton.addEventListener('mouseover', showleft)
menuLeft.addEventListener('mouseleave', hideleft)

function showleft() {
  menuLeft.style.left = '0px'
}

function hideleft() {
  menuLeft.style.left = '-45px'
}


//efeito de digitação 

const texts = ["Desenvolvedor Web", "Matheus Everton"];
  let currentText = 0;
  let index = 0;
  let isDeleting = false;
  const speed = 100;
  const eraseSpeed = 50;
  const delayBetween = 1500;

  function type() {
    const element = document.getElementById("typing");
    const text = texts[currentText];

    if (!isDeleting) {
      element.innerHTML = text.substring(0, index + 1) + '<span class="cursor"></span>';
      index++;
      if (index === text.length) {
        isDeleting = true;
        setTimeout(type, delayBetween);
        return;
      }
    } else {
      element.innerHTML = text.substring(0, index - 1) + '<span class="cursor"></span>';
      index--;
      if (index === 0) {
        isDeleting = false;
        currentText = (currentText + 1) % texts.length;
      }
    }
    
    setTimeout(type, isDeleting ? eraseSpeed : speed);
  }

  type();


