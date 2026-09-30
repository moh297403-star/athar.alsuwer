const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
}
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-item');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  projects.forEach(card => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.classList.toggle('is-hidden', !show);
  });
}));

const lightbox = document.querySelector('.lightbox');
const lightboxImg = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('p');
const closeLightbox = () => {
  lightbox?.classList.remove('open');
  document.body.classList.remove('no-scroll');
};
document.querySelectorAll('.project-item img').forEach(img => {
  img.addEventListener('click', () => {
    if (!lightbox) return;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.closest('figure')?.innerText || img.alt;
    lightbox.classList.add('open');
    document.body.classList.add('no-scroll');
  });
});
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

const revealEls = document.querySelectorAll('.section, .numbers, .hero-card, .service-card, .project-item, .credential-grid > div');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.08});
revealEls.forEach(el => observer.observe(el));

document.getElementById('year').textContent = new Date().getFullYear();
