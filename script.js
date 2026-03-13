document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('currentYear');
  if (year) year.textContent = new Date().getFullYear();

  const form = document.getElementById('leadForm');
  const feedback = document.getElementById('formFeedback');

  if (form && feedback) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const nome = form.nome.value.trim();
      const email = form.email.value.trim();

      if (!nome || !email) {
        feedback.textContent = 'Preencha seu nome e e-mail para continuar.';
        feedback.style.color = '#fca5a5';
        return;
      }

      feedback.textContent = `Perfeito, ${nome}! Simulamos o envio dos seus dados.`;
      feedback.style.color = '#86efac';
      form.reset();
    });
  }

  const counters = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const animateCounters = () => {
    if (hasAnimated) return;
    hasAnimated = true;

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target || 0);
      const suffix = counter.textContent.includes('K+') ? 'K+' : counter.textContent.includes('%') ? '%' : '+';
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 30));

      const tick = () => {
        current += step;
        if (current >= target) current = target;
        counter.textContent = `${current}${suffix}`;
        if (current < target) window.requestAnimationFrame(tick);
      };

      tick();
    });
  };

  const hero = document.querySelector('.stats-row');
  if (hero) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      });
    }, { threshold: 0.35 });

    observer.observe(hero);
  }

  document.querySelectorAll('.navbar-collapse .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const navCollapse = document.querySelector('.navbar-collapse.show');
      if (navCollapse) {
        bootstrap.Collapse.getInstance(navCollapse)?.hide();
      }
    });
  });
});
