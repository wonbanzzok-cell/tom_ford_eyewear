/* TOM FORD Eyewear — unofficial introductory page. Plain JS, no globals. */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.remove('no-js');
  root.classList.add('js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Header: scrolled state and mobile menu ---------- */
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const setMenu = (open) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'CLOSE' : 'MENU';
  };
  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal, .sig');
  if (!('IntersectionObserver' in window) || reduceMotion.matches) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Timeline rail: counter, active dot, arrows ---------- */
  const rail = document.querySelector('.timeline__rail');
  if (rail) {
    const items = Array.from(rail.querySelectorAll('.tl-item'));
    const current = document.querySelector('.counter__current');
    const total = document.querySelector('.counter__total');
    const [prevBtn, nextBtn] = document.querySelectorAll('.timeline .arrow');
    const pad = (n) => String(n).padStart(2, '0');
    let index = 0;

    total.textContent = pad(items.length);

    const update = () => {
      const railLeft = rail.getBoundingClientRect().left;
      let best = 0;
      let bestDist = Infinity;
      items.forEach((item, i) => {
        const dist = Math.abs(item.getBoundingClientRect().left - railLeft);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      const atEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
      index = atEnd ? items.length - 1 : best;
      items.forEach((item, i) => item.classList.toggle('is-active', i === index));
      current.textContent = pad(index + 1);
      prevBtn.disabled = rail.scrollLeft <= 4;
      nextBtn.disabled = atEnd;
    };

    let ticking = false;
    rail.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => { update(); ticking = false; });
    }, { passive: true });
    window.addEventListener('resize', update);

    const go = (dir) => {
      const target = items[Math.min(items.length - 1, Math.max(0, index + dir))];
      rail.scrollTo({
        left: target.offsetLeft - items[0].offsetLeft,
        behavior: reduceMotion.matches ? 'auto' : 'smooth'
      });
    };
    prevBtn.addEventListener('click', () => go(-1));
    nextBtn.addEventListener('click', () => go(1));
    update();
  }

  /* ---------- Iconic models: frame selector (tabs) ---------- */
  const models = document.querySelector('[data-models]');
  if (models) {
    const cards = Array.from(models.querySelectorAll('.model'));
    const tablist = document.createElement('div');
    tablist.className = 'model-tabs';
    tablist.setAttribute('role', 'tablist');
    tablist.setAttribute('aria-label', '대표 모델 선택');

    const tabs = cards.map((card, i) => {
      const name = card.querySelector('.model__name').textContent.trim();
      const code = card.querySelector('.model__code').textContent.trim();
      const tab = document.createElement('button');
      tab.type = 'button';
      tab.className = 'model-tab';
      tab.id = `tab-${card.id}`;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', card.id);
      const art = card.querySelector('.model__art').cloneNode(true);
      art.removeAttribute('class');
      const label = document.createElement('span');
      label.textContent = card.dataset.tabLabel || name;
      tab.append(art, label);
      tab.setAttribute('aria-label', `${name} ${code}`);
      card.setAttribute('role', 'tabpanel');
      card.setAttribute('aria-labelledby', tab.id);
      card.tabIndex = 0;
      tab.addEventListener('click', () => select(i, false));
      tablist.appendChild(tab);
      return tab;
    });

    function select(i, focus) {
      tabs.forEach((tab, j) => {
        const on = i === j;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        cards[j].hidden = !on;
      });
      if (focus) tabs[i].focus();
    }

    tablist.addEventListener('keydown', (event) => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      let next = null;
      if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== null) {
        event.preventDefault();
        select(next, true);
      }
    });

    models.prepend(tablist);
    models.classList.add('is-enhanced');
    select(0, false);
  }
})();
