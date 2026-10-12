'use strict';

document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');

if (menuButton && navigation) {
  menuButton.hidden = false;

  const closeMenu = (returnFocus = false) => {
    navigation.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('.menu-label').textContent = 'Menu';
    if (returnFocus) menuButton.focus();
  };

  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
    navigation.classList.toggle('is-open', open);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) closeMenu();
  });

  window.matchMedia('(max-width: 760px)').addEventListener('change', () => closeMenu());
}

const galleryLinks = [...document.querySelectorAll('[data-gallery]')];
const galleryDialog = document.querySelector('.gallery-dialog');

if (galleryDialog && typeof galleryDialog.showModal === 'function' && galleryLinks.length) {
  const photo = galleryDialog.querySelector('.dialog-image');
  const caption = galleryDialog.querySelector('.dialog-caption');
  let currentIndex = 0;
  let opener;

  const showPhoto = (index) => {
    currentIndex = (index + galleryLinks.length) % galleryLinks.length;
    const link = galleryLinks[currentIndex];
    photo.src = link.href;
    photo.alt = link.querySelector('img').alt;
    caption.textContent = `${currentIndex + 1} / ${galleryLinks.length} — ${link.dataset.caption}`;
  };

  galleryLinks.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      showPhoto(index);
      galleryDialog.showModal();
      document.body.style.overflow = 'hidden';
      galleryDialog.querySelector('.dialog-close').focus();
    });
  });

  galleryDialog.querySelector('.dialog-close').addEventListener('click', () => galleryDialog.close());
  galleryDialog.querySelector('.gallery-previous').addEventListener('click', () => showPhoto(currentIndex - 1));
  galleryDialog.querySelector('.gallery-next').addEventListener('click', () => showPhoto(currentIndex + 1));

  galleryDialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(currentIndex + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });

  galleryDialog.addEventListener('click', (event) => {
    if (event.target === galleryDialog) {
      const bounds = galleryDialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) galleryDialog.close();
    }
  });

  galleryDialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    if (opener) opener.focus();
  });
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});
