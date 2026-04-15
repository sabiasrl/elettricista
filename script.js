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

  /* Carousel showcase Domotica disattivato (markup commentato in index.html)
  function initDomoticaShowcaseCarousel() {
    var root = document.querySelector('[data-domotica-showcase-carousel]');
    if (!root) return;

    var slides = root.querySelectorAll('[data-showcase-slide]');
    var dotsWrap = root.querySelector('.domotica__showcase-dots');
    if (!slides.length || !dotsWrap) return;

    var i = 0;
    var timer;
    var intervalMs = 2200;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(index) {
      i = (index + slides.length) % slides.length;
      slides.forEach(function (el, j) {
        el.classList.toggle('is-active', j === i);
      });
      var dots = dotsWrap.querySelectorAll('.domotica__showcase-dot');
      dots.forEach(function (d, j) {
        d.classList.toggle('is-active', j === i);
        d.setAttribute('aria-current', j === i ? 'true' : 'false');
      });
    }

    slides.forEach(function (_, j) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'domotica__showcase-dot' + (j === 0 ? ' is-active' : '');
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
  */

  function initQuoteFormMailto() {
    var form = document.querySelector('.quote-form');
    if (!form) return;

    var to = form.getAttribute('data-mail-to') || '';
    var subject = form.getAttribute('data-mail-subject') || 'Richiesta preventivo';
    if (!to) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var nameEl = form.querySelector('#name');
      var emailEl = form.querySelector('#email');
      var phoneEl = form.querySelector('#phone');
      var typeEl = form.querySelector('#type');
      var messageEl = form.querySelector('#message');

      var name = (nameEl && nameEl.value) ? nameEl.value.trim() : '';
      var email = (emailEl && emailEl.value) ? emailEl.value.trim() : '';
      var phone = (phoneEl && phoneEl.value) ? phoneEl.value.trim() : '';
      var message = (messageEl && messageEl.value) ? messageEl.value.trim() : '';

      var typeLabel = '(non indicato)';
      if (typeEl && typeEl.options && typeEl.selectedIndex >= 0) {
        var opt = typeEl.options[typeEl.selectedIndex];
        if (opt && typeEl.value) typeLabel = opt.text;
      }

      var body = [
        'Nome e cognome: ' + name,
        'Email: ' + email,
        'Telefono: ' + (phone || '(non indicato)'),
        'Tipologia di committente: ' + typeLabel,
        '',
        'Descrivi l’intervento o la richiesta:',
        message
      ].join('\r\n');

      var url = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      window.location.href = url;
    });
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

  function initBlogSpa() {
    var root = document.querySelector('[data-blog-root]');
    if (!root) return;

    var list = root.querySelector('[data-blog-list]');
    var stack = root.querySelector('[data-blog-articles]');
    var articles = root.querySelectorAll('[data-blog-article]');
    var lastBlogSlug = null;

    function scrollToInstantY(top) {
      var y = Math.max(0, top);
      try {
        window.scrollTo({ top: y, left: 0, behavior: 'instant' });
      } catch (e) {
        window.scrollTo(0, y);
      }
    }

    function openArticle(slug) {
      lastBlogSlug = slug;
      document.body.classList.add('is-blog-reading');
      if (list) list.hidden = true;
      if (stack) stack.hidden = false;
      articles.forEach(function (el) {
        el.hidden = el.getAttribute('data-blog-article') !== slug;
      });
      var target = document.getElementById('blog-articolo-' + slug);
      if (target) {
        scrollToInstantY(0);
        var backBtn = target.querySelector('[data-blog-back]');
        if (backBtn) backBtn.focus({ preventScroll: true });
      }
    }

    function closeArticle() {
      document.body.classList.remove('is-blog-reading');
      if (list) list.hidden = false;
      if (stack) stack.hidden = true;
      articles.forEach(function (el) {
        el.hidden = true;
      });
    }

    function jumpToBlogCardInstant(slug) {
      if (!slug) return;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          var card = document.getElementById('blog-card-' + slug);
          if (!card) return;
          var pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
          var y = card.getBoundingClientRect().top + window.pageYOffset - pad;
          scrollToInstantY(y);
        });
      });
    }

    /** Indietro: chiude l’articolo, salta alla card senza animazione, aggiorna URL senza scroll del browser sull’hash. */
    function goBackToBlogCard() {
      var slug = lastBlogSlug;
      closeArticle();
      if (!slug) {
        try {
          history.replaceState(null, '', location.pathname + location.search + '#blog');
        } catch (e) {
          location.hash = '#blog';
        }
        return;
      }
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          var card = document.getElementById('blog-card-' + slug);
          var hash = '#blog-card-' + slug;
          var newUrl = location.pathname + location.search + hash;
          if (!card) {
            try {
              history.replaceState(null, '', newUrl);
            } catch (e2) {
              location.hash = hash;
            }
            return;
          }
          var pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
          var y = card.getBoundingClientRect().top + window.pageYOffset - pad;
          scrollToInstantY(y);
          try {
            history.replaceState(null, '', newUrl);
          } catch (e3) {
            if (location.hash !== hash) location.hash = hash;
          }
        });
      });
    }

    function syncFromHash() {
      var m = /^#blog-articolo-(.+)$/.exec(location.hash);
      if (m && m[1]) {
        openArticle(m[1]);
        return;
      }
      var wasReading = document.body.classList.contains('is-blog-reading');
      closeArticle();
      if (!wasReading) return;
      var cardHash = /^#blog-card-(.+)$/.exec(location.hash);
      if (cardHash && cardHash[1]) {
        jumpToBlogCardInstant(cardHash[1]);
        return;
      }
      if (location.hash === '#blog' && lastBlogSlug) {
        jumpToBlogCardInstant(lastBlogSlug);
      }
    }

    root.addEventListener('click', function (e) {
      var back = e.target.closest('[data-blog-back]');
      if (back && root.contains(back)) {
        e.preventDefault();
        goBackToBlogCard();
        return;
      }
      var opener = e.target.closest('[data-blog-open]');
      if (!opener || !list.contains(opener)) return;
      var slug = opener.getAttribute('data-blog-open');
      if (slug) location.hash = '#blog-articolo-' + slug;
    });

    root.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var card = e.target.closest('.blog-card[data-blog-open]');
      if (!card || !list.contains(card)) return;
      e.preventDefault();
      var slug = card.getAttribute('data-blog-open');
      if (slug) location.hash = '#blog-articolo-' + slug;
    });

    root.querySelectorAll('[data-blog-to-preventivo]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        closeArticle();
        lastBlogSlug = null;
        location.hash = '#preventivo';
      });
    });

    window.addEventListener('hashchange', syncFromHash);

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if (!document.body.classList.contains('is-blog-reading')) return;
      e.preventDefault();
      goBackToBlogCard();
    });

    syncFromHash();
  }

  function boot() {
    initNav();
    initQuoteFormMailto();
    initDomoticaCarousel();
    /* initDomoticaShowcaseCarousel(); — carousel disattivato */
    initBlogSpa();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
