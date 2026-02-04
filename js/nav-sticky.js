// Sticky navigation (desktop only)
(function () {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  function apply() {
    if (isMobile()) {
      nav.classList.remove('nav-sticky');
    } else {
      nav.classList.add('nav-sticky');
    }
  }

  window.addEventListener('resize', apply);
  apply();
})();