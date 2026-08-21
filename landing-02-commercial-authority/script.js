const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    menu.textContent = open ? 'Menu' : 'Close';
    nav.classList.toggle('is-open', !open);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menu.setAttribute('aria-expanded', 'false');
    menu.textContent = 'Menu';
    nav.classList.remove('is-open');
  }));
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-market]');
const emptyState = document.querySelector('[data-empty]');
filterButtons.forEach((button) => button.addEventListener('click', () => {
  filterButtons.forEach((item) => item.classList.toggle('active', item === button));
  const filter = button.dataset.filter;
  let visible = 0;
  projectCards.forEach((card) => {
    const show = filter === 'all' || card.dataset.market === filter;
    card.hidden = !show;
    if (show) visible += 1;
  });
  if (emptyState) emptyState.hidden = visible !== 0;
}));

const form = document.querySelector('[data-form]');
if (form) form.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = form.querySelector('[data-status]');
  if (!form.checkValidity()) {
    status.textContent = 'Choose a project type and add a location, stage, and valid email.';
    status.className = 'form-status error';
    form.querySelector(':invalid')?.focus();
    return;
  }
  status.textContent = 'Demo state: intake captured. Connect this form to the client’s preconstruction workflow.';
  status.className = 'form-status success';
});
