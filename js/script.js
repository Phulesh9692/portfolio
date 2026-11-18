// ===== Theme toggle (remembers choice) =====
const root = document.documentElement;
document.getElementById('themeToggle').addEventListener('click', () => {
  const isDark = root.dataset.theme === 'dark' ||
    (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
  const next = isDark ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('theme', next); } catch (e) {}
});

// ===== Mobile menu =====
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuToggle');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', false);
}));

// ===== Highlight current section in the menu =====
const links = [...nav.querySelectorAll('a')];
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section[id]').forEach(s => io.observe(s));

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();
