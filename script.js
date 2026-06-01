const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const menuOpenIcon = document.getElementById('menu-open-icon');
const menuCloseIcon = document.getElementById('menu-close-icon');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section[id]');

function setMobileMenu(open) {
  mobileMenu.classList.toggle('hidden', !open);
  menuOpenIcon.classList.toggle('hidden', open);
  menuCloseIcon.classList.toggle('hidden', !open);
  mobileMenuButton.setAttribute('aria-expanded', String(open));
}

mobileMenuButton.addEventListener('click', () => {
  const isOpen = mobileMenuButton.getAttribute('aria-expanded') === 'true';
  setMobileMenu(!isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => setMobileMenu(false));
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const activeId = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
      });
    });
  },
  {
    rootMargin: '-35% 0px -55% 0px',
    threshold: 0
  }
);

sections.forEach((section) => sectionObserver.observe(section));
