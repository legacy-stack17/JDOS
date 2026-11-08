
const btn = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');
btn.addEventListener('click', () => {
  const abierto = menu.classList.toggle('abierto');
  btn.setAttribute('aria-expanded', abierto);
});
menu.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    menu.classList.remove('abierto');
    btn.setAttribute('aria-expanded', 'false');
  }
});

// 2. Visor de la galería (con <dialog>: Esc y foco ya vienen incluidos)
const fotos = [...document.querySelectorAll('.galeria a.foto')];
const visor = document.getElementById('visor');
const img = visor.querySelector('img');
const pie = visor.querySelector('figcaption');
let actual = 0;

function mostrar(n) {
  actual = (n + fotos.length) % fotos.length;
  const a = fotos[actual];
  img.src = a.href;
  img.alt = a.querySelector('img').alt;
  pie.textContent = a.dataset.titulo;
}
fotos.forEach((a, n) => a.addEventListener('click', e => {
  e.preventDefault();
  mostrar(n);
  visor.showModal();
}));
visor.querySelector('.v-cerrar').addEventListener('click', () => visor.close());
visor.querySelector('.v-ant').addEventListener('click', () => mostrar(actual - 1));
visor.querySelector('.v-sig').addEventListener('click', () => mostrar(actual + 1));
visor.addEventListener('click', e => { if (e.target === visor) visor.close(); });
document.addEventListener('keydown', e => {
  if (!visor.open) return;
  if (e.key === 'ArrowLeft') mostrar(actual - 1);
  if (e.key === 'ArrowRight') mostrar(actual + 1);
});
let x0 = 0;
visor.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
visor.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 50) mostrar(actual + (dx < 0 ? 1 : -1));
});

// 3. Botón volver arriba
const subir = document.querySelector('.subir');
window.addEventListener('scroll', () => { subir.hidden = window.scrollY < 600; }, { passive: true });
subir.addEventListener('click', () => window.scrollTo({ top: 0 }));
