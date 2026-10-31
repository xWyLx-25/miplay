const modal = document.getElementById('modal');
const openModal = () => { modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); };
const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); };
document.getElementById('detailsButton').addEventListener('click', openModal);
document.querySelectorAll('[data-details]').forEach(button => button.addEventListener('click', openModal));
document.getElementById('modalClose').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });
document.getElementById('year').textContent = new Date().getFullYear();

const filters = [...document.querySelectorAll('.filter')];
const search = document.getElementById('searchInput');
const cards = [...document.querySelectorAll('.game-card')];
let activeFilter = 'all';
function updateGames() {
  const query = search.value.trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const matchesFilter = activeFilter === 'all' || card.dataset.category === activeFilter;
    const matchesSearch = card.dataset.name.includes(query);
    card.hidden = !(matchesFilter && matchesSearch);
    if (!card.hidden) visible++;
  });
  document.getElementById('noResults').hidden = visible > 0;
}
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  activeFilter = button.dataset.filter;
  updateGames();
}));
search.addEventListener('input', updateGames);
document.getElementById('menuToggle').addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open')));


// ---- Reproductor de juegos (SOMBRA) ----
const player = document.getElementById('player');
const playerFrame = document.getElementById('playerFrame');
const GAME_URL = 'juego/SOMBRA.html';
function playGame() {
  closeModal();
  player.hidden = false;
  player.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (!playerFrame.getAttribute('src')) playerFrame.src = GAME_URL; // se descarga solo al dar JUGAR
  playerFrame.addEventListener('load', () => playerFrame.focus(), { once: true });
  setTimeout(() => playerFrame.focus(), 300);
}
function stopGame() {
  if (document.fullscreenElement) document.exitFullscreen();
  player.hidden = true;
  player.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  playerFrame.removeAttribute('src'); // detiene el juego y libera memoria
}
document.querySelectorAll('[data-play]').forEach(b => b.addEventListener('click', playGame));
document.getElementById('playerClose').addEventListener('click', stopGame);
document.getElementById('playerFull').addEventListener('click', () => {
  (playerFrame.requestFullscreen || playerFrame.webkitRequestFullscreen).call(playerFrame);
});
