//efeito estrelas

const canvasStar = document.getElementById('canvas');
const ctxStar = canvasStar.getContext('2d');

const canvasSnow = document.getElementById('canvas2');
const ctxSnow = canvasSnow.getContext('2d');

const toggleButton = document.getElementById('toggle__button--star');
const themeButton = document.getElementById('toggle-theme');

// Ajusta tamanho dos canvas
function resizeCanvas() {
  canvasStar.width = window.innerWidth;
  canvasStar.height = window.innerHeight;
  canvasSnow.width = window.innerWidth;
  canvasSnow.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Controle inicial
let starsEnabled = true;
let snowEnabled = false;
let lastEffect = 'stars'; // guarda o último efeito ativo

// BOTÃO de ativar/desativar o efeito atual
toggleButton.addEventListener('click', () => {
  if (starsEnabled || snowEnabled) {
    // Desativar e salvar estado anterior
    lastEffect = starsEnabled ? 'stars' : 'snow';
    starsEnabled = false;
    snowEnabled = false;
  } else {
    // Reativar último efeito usado
    if (lastEffect === 'stars') {
      starsEnabled = true;
    } else {
      snowEnabled = true;
    }
  }

  // Atualiza ícone e texto
  toggleButton.classList.toggle('bi-star-fill', starsEnabled || snowEnabled);
  toggleButton.classList.toggle('bi-star', !(starsEnabled || snowEnabled));
  toggleButton.dataset.effect = (starsEnabled || snowEnabled) ? 'Desativar Efeito' : 'Ativar Efeito';
  toggleButton.style.color = (starsEnabled || snowEnabled) ? 'white' : 'gray';
});

// BOTÃO de troca de tema + troca de efeito
themeButton.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');

  // Alterna efeito conforme tema
  if (document.body.classList.contains('light-theme')) {
    starsEnabled = false;
    snowEnabled = true;
    lastEffect = 'snow';
  } else {
    starsEnabled = true;
    snowEnabled = false;
    lastEffect = 'stars';
  }

  // Sempre ativar ícone de efeito ao trocar tema
  toggleButton.classList.add('bi-star-fill');
  toggleButton.classList.remove('bi-star');
  toggleButton.dataset.effect = 'Desativar Efeito';
  toggleButton.style.color = 'white';
});

// --- CLASSE E FUNÇÕES ESTRELAS ---
class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvasStar.width * 0.2 - 100;
    this.y = Math.random() * canvasStar.height;
    this.length = Math.random() * 80 + 50;
    this.speed = Math.random() * 4 + 4;
    this.opacity = Math.random() * 0.5 + 0.5;
    this.angle = Math.PI / 6;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);

    if (this.x > canvasStar.width || this.y > canvasStar.height) {
      this.reset();
    }
  }

  draw() {
    ctxStar.beginPath();
    ctxStar.moveTo(this.x, this.y);
    ctxStar.lineTo(
      this.x - this.length * Math.cos(this.angle),
      this.y - this.length * Math.sin(this.angle)
    );
    ctxStar.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctxStar.lineWidth = 2;
    ctxStar.stroke();
  }
}

// Criar estrelas
const stars = [];
for (let i = 0; i < 4; i++) {
  stars.push(new Star());
}

// --- CLASSE E FUNÇÕES NEVE ---
class Snowflake {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvasSnow.width;
    this.y = Math.random() * -canvasSnow.height;
    this.radius = Math.random() * 3 + 1;
    this.speed = Math.random() * 1 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.3;
    this.wind = (Math.random() - 0.5) * 0.5;
  }

  update() {
    this.y += this.speed;
    this.x += this.wind;

    if (this.y > canvasSnow.height) {
      this.reset();
      this.y = 0;
    }

    if (this.x > canvasSnow.width) this.x = 0;
    else if (this.x < 0) this.x = canvasSnow.width;
  }

  draw() {
    ctxSnow.beginPath();
    ctxSnow.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctxSnow.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctxSnow.fill();
  }
}

// Criar flocos de neve
const snowflakes = [];
for (let i = 0; i < 150; i++) {
  snowflakes.push(new Snowflake());
}

// --- ANIMAÇÃO ---
function animate() {
  ctxStar.clearRect(0, 0, canvasStar.width, canvasStar.height);
  ctxSnow.clearRect(0, 0, canvasSnow.width, canvasSnow.height);

  if (starsEnabled) {
    for (const star of stars) {
      star.update();
      star.draw();
    }
  }

  if (snowEnabled) {
    for (const flake of snowflakes) {
      flake.update();
      flake.draw();
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


  // trocar tema 

  const toggleIcon = document.getElementById('toggle-theme');

toggleIcon.addEventListener('click', () => {
  const body = document.body;
  body.classList.toggle('dark-theme');

  // Atualiza o ícone e o title conforme o tema
  if (body.classList.contains('dark-theme')) {
    toggleIcon.classList.remove('bi-brightness-high'); // remove ícone sol
    toggleIcon.classList.add('bi-moon');               // adiciona ícone lua
    
  } else {
    toggleIcon.classList.remove('bi-moon');            // remove ícone lua
    toggleIcon.classList.add('bi-brightness-high');    // adiciona ícone sol
    
  }

  // Salvar a preferência
  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Aplica o tema e ícone salvo ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    toggleIcon.classList.remove('bi-brightness-high');
    toggleIcon.classList.add('bi-moon');
    toggleIcon.setAttribute('title', toggleIcon.dataset.dark);
  } else {
    toggleIcon.classList.remove('bi-moon');
    toggleIcon.classList.add('bi-brightness-high');
    toggleIcon.setAttribute('title', toggleIcon.dataset.light);
  }
});


