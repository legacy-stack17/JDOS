/* ---------- Formulario: envía el mensaje por WhatsApp ---------- */
const WHATSAPP = '50584950711';
const form = document.getElementById('form-contacto');
const estado = document.getElementById('form-estado');

form.addEventListener('submit', e => {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const telefono = form.telefono.value.trim();
  const mensaje = form.mensaje.value.trim();
  const errores = [];

  if (nombre.length < 3) errores.push('Escribe tu nombre (mínimo 3 letras).');
  if (telefono && !/^[0-9+\s-]{8,15}$/.test(telefono)) errores.push('El teléfono debe tener entre 8 y 15 números.');
  if (mensaje.length < 10) errores.push('El mensaje debe tener al menos 10 caracteres.');

  if (errores.length) {
    estado.textContent = errores.join(' ');
    estado.className = 'estado error';
    return;
  }

  const texto = 'Hola, soy ' + nombre + '.' + (telefono ? ' Mi teléfono: ' + telefono + '.' : '') + '\n' + mensaje;
  window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
  estado.textContent = 'Se abrió WhatsApp con tu mensaje. Solo falta presionar enviar.';
  estado.className = 'estado ok';
  form.reset();
});

/* ---------- Menú en celular ---------- */
const botonMenu = document.querySelector('.menu-btn');
const menu = document.getElementById('menu');

if (botonMenu && menu) {
  botonMenu.hidden = false;

  const cerrarMenu = () => {
    menu.classList.remove('abierto');
    botonMenu.setAttribute('aria-expanded', 'false');
  };

  botonMenu.addEventListener('click', () => {
    const abierto = menu.classList.toggle('abierto');
    botonMenu.setAttribute('aria-expanded', String(abierto));
  });

  menu.addEventListener('click', e => {
    if (e.target.closest('a')) cerrarMenu();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('abierto')) {
      cerrarMenu();
      botonMenu.focus();
    }
  });

  // Si se agranda la ventana, se restablece el menú
  window.matchMedia('(min-width: 1001px)').addEventListener('change', cerrarMenu);
}

/* ---------- Visor de fotos: teclado (← → y Esc) ---------- */
document.addEventListener('keydown', e => {
  const visor = document.querySelector('.visor:target');
  if (!visor) return;

  if (e.key === 'Escape') {
    location.hash = 'galeria';
  } else if (e.key === 'ArrowLeft') {
    location.hash = visor.querySelector('.visor-ant').getAttribute('href');
  } else if (e.key === 'ArrowRight') {
    location.hash = visor.querySelector('.visor-sig').getAttribute('href');
  }
});
