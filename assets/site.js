'use strict';

document.documentElement.classList.add('js');

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const entranceTargets = [...document.querySelectorAll('[data-enter]')];
let entranceObserver;

const revealEntrance = (element, immediate = false) => {
  if (!immediate && element.classList.contains('is-entered')) return;
  element.classList.toggle('enter-instant', immediate);
  element.classList.toggle('is-entering', !immediate);
  element.classList.add('is-entered');
};

const resetEntrance = (element, fromAbove = false) => {
  if (element.contains(document.activeElement)) return;
  element.dataset.enterEdge = fromAbove ? 'above' : 'below';
  element.classList.add('enter-instant');
  element.classList.remove('is-entered', 'is-entering');
};

const configureEntrances = () => {
  if (entranceObserver) entranceObserver.disconnect();
  entranceObserver = null;
  document.documentElement.classList.toggle('motion-paused', motionPreference.matches);
  for (const element of entranceTargets) element.classList.remove('is-entering');
  if (motionPreference.matches || typeof window.IntersectionObserver !== 'function') {
    document.documentElement.classList.remove('scroll-motion');
    return;
  }

  for (const element of entranceTargets) {
    const bounds = element.getBoundingClientRect();
    if ((bounds.width && bounds.height && bounds.bottom > 0 && bounds.top < window.innerHeight)
      || element.contains(document.activeElement)) {
      revealEntrance(element, true);
    } else {
      resetEntrance(element, bounds.bottom <= 0);
    }
  }

  entranceObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.boundingClientRect.width || !entry.boundingClientRect.height) continue;
      if (entry.isIntersecting) {
        revealEntrance(entry.target);
      } else if (entry.boundingClientRect.bottom <= 0
        || entry.boundingClientRect.top >= window.innerHeight) {
        resetEntrance(entry.target, entry.boundingClientRect.bottom <= 0);
      }
    }
  }, { threshold: 0 });
  document.documentElement.classList.add('scroll-motion');
  for (const element of entranceTargets) entranceObserver.observe(element);
};

const finishEntrance = (event) => {
  if (event.propertyName === 'transform' && event.target.matches('[data-enter]')) {
    event.target.classList.remove('is-entering');
  }
};
document.addEventListener('transitionend', finishEntrance);
document.addEventListener('transitioncancel', finishEntrance);
let pointerEntrance = null;
document.addEventListener('pointerdown', (event) => {
  pointerEntrance = event.target.closest('[data-enter]');
}, true);
const clearPointerEntrance = () => { window.setTimeout(() => { pointerEntrance = null; }, 0); };
document.addEventListener('pointerup', clearPointerEntrance, true);
document.addEventListener('pointercancel', clearPointerEntrance, true);
document.addEventListener('focusin', (event) => {
  const entrance = event.target.closest('[data-enter]');
  if (entrance) revealEntrance(entrance, entrance !== pointerEntrance);
});
document.addEventListener('focusout', (event) => {
  const entrance = event.target.closest('[data-enter]');
  if (!entrance || !entranceObserver || entrance.contains(event.relatedTarget)) return;
  const bounds = entrance.getBoundingClientRect();
  if (bounds.bottom <= 0 || bounds.top >= window.innerHeight) {
    resetEntrance(entrance, bounds.bottom <= 0);
  }
});
motionPreference.addEventListener('change', configureEntrances);
configureEntrances();

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
