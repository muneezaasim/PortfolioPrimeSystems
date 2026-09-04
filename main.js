/**
 * Prime Systems - Modern Core JavaScript
 * High-performance, zero external dependency ES6 implementation
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. PRELOADER WITH FAIL-SAFE TIMEOUT
  const preloader = document.getElementById('preloader');
  const dismissPreloader = () => {
    if (preloader && !preloader.classList.contains('fade-out')) {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.remove(), 400);
    }
  };

  window.addEventListener('load', dismissPreloader);
  // Guarantee dismissal within 1.2s even on slow or hanging connections
  setTimeout(dismissPreloader, 1200);

  // 2. STICKY BLUR NAVBAR ON SCROLL (THROTTLED WITH RAF)
  const navbar = document.querySelector('.navbar');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 40) {
          navbar?.classList.add('scrolled');
        } else {
          navbar?.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // 3. ACCESSIBLE MOBILE DRAWER & BACKDROP
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const drawerClose = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link, .mobile-drawer .btn');

  const openDrawer = () => {
    mobileDrawer?.classList.add('active');
    drawerBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
    mobileToggle?.setAttribute('aria-expanded', 'true');
  };

  const closeDrawer = () => {
    mobileDrawer?.classList.remove('active');
    drawerBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
    mobileToggle?.setAttribute('aria-expanded', 'false');
  };

  mobileToggle?.addEventListener('click', openDrawer);
  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer?.classList.contains('active')) {
      closeDrawer();
    }
  });

  // 4. ANIMATED STAT COUNTERS (INTERSECTION OBSERVER)
  const statNumbers = document.querySelectorAll('.stat-count');
  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const targetEl = entry.target;
          const targetValue = parseInt(targetEl.getAttribute('data-target'), 10);
          const duration = 1600; // ms
          const startTimestamp = performance.now();

          const updateCount = (currentTimestamp) => {
            const progress = Math.min((currentTimestamp - startTimestamp) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeOut * targetValue);
            targetEl.textContent = currentCount;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              targetEl.textContent = targetValue;
            }
          };

          requestAnimationFrame(updateCount);
          observer.unobserve(targetEl);
        }
      });
    }, { threshold: 0.3 });

    statNumbers.forEach(stat => statObserver.observe(stat));
  }

  // 5. INSTRUMENTS CATEGORY FILTERING
  const tabButtons = document.querySelectorAll('.tab-btn');
  const instrumentCards = document.querySelectorAll('.instrument-card');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      instrumentCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeUp 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 6. BACK TO TOP BUTTON
  const backToTopBtn = document.getElementById('backToTop');
  backToTopBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
