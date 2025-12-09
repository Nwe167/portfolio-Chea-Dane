// Mobile nav toggle (matches .nav-list.active in CSS)
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');

if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('active');
  });

  // close when link clicked
  navList.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navList.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Reveal on scroll (adds .show)
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      // add .show to child cards for stagger
      entry.target.querySelectorAll('.card').forEach((card, i) => {
        setTimeout(() => card.classList.add('show'), i * 120);
      });
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.hidden, .section-hidden, .hero').forEach(el => {
  observer.observe(el);
});

// Floating CTA: show when user scrolls down
(function() {
  const cta = document.getElementById('cta');
  if (!cta) return;
  const threshold = 220;
  const onScroll = () => {
    if (window.scrollY > threshold) cta.classList.add('show');
    else cta.classList.remove('show');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const contact = document.getElementById('contact');
  cta.addEventListener('click', () => contact?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
})();

// Simple typing effect for #typing
(function() {
  const el = document.getElementById('typing');
  if (!el) return;
  const words = ['Frontend Developer', 'Web Designer', 'React & Django', 'Accessible UI'];
  let w = 0, i = 0, deleting = false;

  function tick() {
    const current = words[w];
    if (!deleting) {
      el.textContent = current.slice(0, ++i);
      if (i === current.length) {
        deleting = true;
        setTimeout(tick, 1000);
        return;
      }
    } else {
      el.textContent = current.slice(0, --i);
      if (i === 0) {
        deleting = false;
        w = (w + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 60 : 120);
  }
  tick();
})();
