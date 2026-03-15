(function () {
  'use strict';

  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a link (mobile)
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Optional: simple form handling (no submit to server by default)
  var form = document.querySelector('.quote-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      // Replace with your backend endpoint or mailto/form service
      var msg = 'Grazie per la richiesta. Per inviare davvero il preventivo, collega il form a un backend o a un servizio come Formspree.';
      alert(msg);
    });
  }
})();
