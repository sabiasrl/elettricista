(function () {
  'use strict';

  function initDomoticaCarousel() {
    var root = document.querySelector('[data-domotica-carousel]');
    if (!root) return;

    var slides = root.querySelectorAll('[data-carousel-slide]');
    var dotsWrap = root.querySelector('.domotica__carousel-dots');
    if (!slides.length || !dotsWrap) return;

    var i = 0;
    var timer;
    var intervalMs = 3000;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(index) {
      i = (index + slides.length) % slides.length;
      slides.forEach(function (el, j) {
        el.classList.toggle('is-active', j === i);
      });
      var dots = dotsWrap.querySelectorAll('.domotica__carousel-dot');
      dots.forEach(function (d, j) {
        d.classList.toggle('is-active', j === i);
        d.setAttribute('aria-current', j === i ? 'true' : 'false');
      });
    }

    slides.forEach(function (_, j) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'domotica__carousel-dot' + (j === 0 ? ' is-active' : '');
      b.setAttribute('aria-label', 'Vai alla slide ' + (j + 1) + ' di ' + slides.length);
      if (j === 0) b.setAttribute('aria-current', 'true');
      b.addEventListener('click', function () {
        show(j);
        restart();
      });
      dotsWrap.appendChild(b);
    });

    function tick() {
      show(i + 1);
    }

    function restart() {
      if (timer) clearInterval(timer);
      if (!reducedMotion && slides.length > 1) {
        timer = setInterval(tick, intervalMs);
      }
    }

    restart();

    var mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    function onMotionPrefChange(e) {
      reducedMotion = e.matches;
      restart();
    }
    if (mql.addEventListener) {
      mql.addEventListener('change', onMotionPrefChange);
    } else if (mql.addListener) {
      mql.addListener(onMotionPrefChange);
    }
  }

  function initNav() {
    var navToggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.nav');

    if (!navToggle || !nav) return;

    navToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var isOpen = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    var logo = document.querySelector('.header .logo');
    if (logo) {
      logo.addEventListener('click', function () {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  function boot() {
    initNav();
    initDomoticaCarousel();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
