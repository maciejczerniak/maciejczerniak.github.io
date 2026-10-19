(function () {
  const dialog = document.querySelector('.project-lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;

  const image = dialog.querySelector('.project-lightbox__image');
  const closeButton = dialog.querySelector('.project-lightbox__close');
  let opener = null;
  let previousOverflow = '';

  document.querySelectorAll('[data-project-evidence]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = link;
      const thumbnail = link.closest('figure').querySelector('img');
      image.alt = thumbnail.alt;
      image.src = link.href;
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    });
  });

  closeButton.addEventListener('click', function () {
    dialog.close();
  });

  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) dialog.close();
  });

  // Native dialog handles Escape and keeps keyboard focus inside the overlay.
  dialog.addEventListener('close', function () {
    document.body.style.overflow = previousOverflow;
    if (opener) opener.focus({ preventScroll: true });
  });
})();
