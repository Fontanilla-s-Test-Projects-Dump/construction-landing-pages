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

const form = document.querySelector('[data-form]');
if (form) form.addEventListener('submit', (event) => {
  event.preventDefault();
  const status = form.querySelector('[data-status]');
  if (!form.checkValidity()) {
    status.textContent = 'Please add the project, location, question, and a valid email.';
    status.className = 'form-status error';
    form.querySelector(':invalid')?.focus();
    return;
  }
  status.textContent = 'Demo state: your brief is ready to send. Connect this form to the client’s intake endpoint.';
  status.className = 'form-status success';
});
