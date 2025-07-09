const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

const images = [
  'url("Assets/background1.jpg")',
  'url("Assets/background22.png")',
  'url("Assets/background33.jpg")',
  'url("Assets/background44.jpeg")'
];

let current = 0;
const overlay = document.querySelector('.bg-overlay');

function updateBackground() {
  overlay.style.backgroundImage = images[current];
}

function prevImage() {
  current = (current - 1 + images.length) % images.length;
  fadeImage();
}

function nextImage() {
  current = (current + 1) % images.length;
  fadeImage();
}

function fadeImage() {
  overlay.style.opacity = 0;
  setTimeout(() => {
    updateBackground();
    overlay.style.opacity = 0.5;
  }, 500);
}

setInterval(() => {
  nextImage();
}, 5000);

updateBackground();

document.querySelectorAll('.boxx').forEach(el => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  obs.observe(el);
});

const lines = [
  document.querySelector('.line-tl'),
  document.querySelector('.line-tr'),
  document.querySelector('.line-bl'),
  document.querySelector('.line-br')
];

const bubbles = [
  document.querySelector('.bubble-tl'),
  document.querySelector('.bubble-tr'),
  document.querySelector('.bubble-bl'),
  document.querySelector('.bubble-br')
];

const fadeTexts = document.querySelectorAll('.title4');


const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      lines.forEach((line, i) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); 
        }
        setTimeout(() => {
          line.classList.add('animate');

          setTimeout(() => {
            bubbles[i].classList.add('visible');
          }, 1000);
        }, i * 1200); 
      });
      observer.disconnect();
    }
  });
});

observer.observe(document.querySelector('.main4body'));

fadeTexts.forEach(text => {
  observer.observe(text);
});