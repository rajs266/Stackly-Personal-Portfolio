/**
 * STACKLY HAUTE COUTURE & BESPOKE ATELIER - JAVASCRIPT ENGINE
 * Luxury Fashion Designer Portfolio & Client Suite
 */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCustomCursor();
  initVideoBoxMagneticCursor();
  initHeaderScroll();
  initMobileDrawer();
  initHeroCanvas3D();
  initCounterStats();
  initCollectionsSwiper();
  initLookbookFilter();
  initModals();
  initAuthLogic();
  initDashboard();
  initScrollReveal();
  initItemAnimations();
  initExpandShowcase();
  initFlipCards();
  initLinkRedirects();
  initFaqAccordion();
  initMasterclassCards();
  initCustomDropdowns();
  initCustomDatePicker();
  initContactFormValidation();
});

/* ==========================================================================
   1. PRELOADER (Ultra-Fast Luxury Haute Couture Engine - Guaranteed < 2s)
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('stackly-preloader');
  if (!preloader) return;

  const fill = document.getElementById('preloader-progress-fill');
  const pct = document.getElementById('preloader-pct-num');
  const status = document.getElementById('preloader-status-text');

  let isDismissed = false;

  const statuses = [
    'CURATING SILHOUETTES...',
    'DRAPING MULBERRY SILK...',
    'CALIBRATING RUNWAY LIGHTS...',
    'WELCOME TO STACKLY ATELIER'
  ];

  function dismissPreloader() {
    if (isDismissed) return;
    isDismissed = true;
    if (fill) fill.style.width = '100%';
    if (pct) pct.textContent = '100';
    if (status) status.textContent = statuses[3];

    setTimeout(() => {
      preloader.classList.add('loaded');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 350);
    }, 120);
  }

  const startTime = performance.now();
  const targetDuration = 600;

  function animateProgress(now) {
    if (isDismissed) return;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / targetDuration, 1);
    
   
    const currentPct = Math.floor((1 - Math.pow(1 - progress, 3)) * 100);

    if (fill) fill.style.width = currentPct + '%';
    if (pct) pct.textContent = currentPct;

    if (status) {
      if (currentPct < 30) status.textContent = statuses[0];
      else if (currentPct < 65) status.textContent = statuses[1];
      else if (currentPct < 90) status.textContent = statuses[2];
      else status.textContent = statuses[3];
    }

    if (progress < 1) {
      requestAnimationFrame(animateProgress);
    } else {
      dismissPreloader();
    }
  }

  requestAnimationFrame(animateProgress);

 
  setTimeout(dismissPreloader, 1100);
  window.addEventListener('load', dismissPreloader, { once: true });
}

/* ==========================================================================
   2. HIGH PRECISION CUSTOM CURSOR (Luxury Orbital Aura & Instant Lock)
   ========================================================================== */
function initCustomCursor() {
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!dot || !ring) return;

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isFirstMove = true;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

   
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;

    if (isFirstMove) {
      ringX = mouseX;
      ringY = mouseY;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      dot.classList.remove('cursor-hidden');
      ring.classList.remove('cursor-hidden');
      isFirstMove = false;
    }
  });

 
  function renderRing() {
    if (!isFirstMove) {
      ringX += (mouseX - ringX) * 0.28;
      ringY += (mouseY - ringY) * 0.28;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
    }
    requestAnimationFrame(renderRing);
  }
  requestAnimationFrame(renderRing);

 
  window.addEventListener('mousedown', () => {
    ring.classList.add('cursor-clicking');
    dot.classList.add('cursor-clicking');
  });

  window.addEventListener('mouseup', () => {
    ring.classList.remove('cursor-clicking');
    dot.classList.remove('cursor-clicking');
  });

 
  document.addEventListener('mouseleave', () => {
    dot.classList.add('cursor-hidden');
    ring.classList.add('cursor-hidden');
  });

  document.addEventListener('mouseenter', () => {
    dot.classList.remove('cursor-hidden');
    ring.classList.remove('cursor-hidden');
  });

 
  const interactiveSelector = 'a, button, [role="button"], input[type="submit"], input[type="button"], .filter-btn, .dash-sidebar-link, .dash-sidebar-logout, .video-play-trigger, .swiper-btn-prev, .swiper-btn-next, .artisan-social-link';
  
  document.addEventListener('mouseover', (e) => {
    const el = e.target.closest(interactiveSelector);
    if (el) {
      ring.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const el = e.target.closest(interactiveSelector);
    if (el) {
      ring.classList.remove('cursor-hover');
    }
  });
}

/* ==========================================================================
   2b. IMMERSIVE RUNWAY RECORD - MAGNETIC PLAY BUTTON CURSOR FOLLOWER
   ========================================================================== */
function initVideoBoxMagneticCursor() {
  const videoCard = document.querySelector('.video-box-card');
  const playBtn = videoCard?.querySelector('.video-play-trigger');
  const dot = document.querySelector('.custom-cursor-dot');
  const ring = document.querySelector('.custom-cursor-ring');
  if (!videoCard || !playBtn) return;

  function isDesktopDevice() {
    return window.innerWidth >= 992 && window.matchMedia('(pointer: fine)').matches;
  }

  function resetCenter() {
    playBtn.classList.remove('is-following');
    playBtn.style.left = '';
    playBtn.style.top = '';
    playBtn.style.transform = '';
    if (dot) dot.classList.remove('cursor-hidden');
    if (ring) ring.classList.remove('cursor-hidden');
  }

  let isHovered = false;

  function updatePosition(e) {
    if (!isDesktopDevice()) {
      resetCenter();
      return;
    }
    const rect = videoCard.getBoundingClientRect();
    const borderLeft = videoCard.clientLeft || 0;
    const borderTop = videoCard.clientTop || 0;
    const x = e.clientX - rect.left - borderLeft;
    const y = e.clientY - rect.top - borderTop;

    playBtn.style.left = `${x}px`;
    playBtn.style.top = `${y}px`;
    playBtn.style.transform = 'translate(-50%, -50%) scale(1.12)';
  }

  videoCard.addEventListener('mouseenter', (e) => {
    if (!isDesktopDevice()) return;
    isHovered = true;
    playBtn.classList.add('is-following');
    updatePosition(e);

   
    if (dot) dot.classList.add('cursor-hidden');
    if (ring) ring.classList.add('cursor-hidden');
  });

  videoCard.addEventListener('mousemove', (e) => {
    if (!isHovered || !isDesktopDevice()) return;
    updatePosition(e);
  });

  videoCard.addEventListener('mouseleave', () => {
    isHovered = false;
    resetCenter();
  });

  window.addEventListener('resize', () => {
    if (!isDesktopDevice()) {
      resetCenter();
    }
  });

 
  videoCard.addEventListener('click', (e) => {
    if (e.target !== playBtn && !playBtn.contains(e.target)) {
      playBtn.click();
    }
  });
}

/* ==========================================================================
   3. HEADER & MOBILE DRAWER
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.classList.add('drawer-open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('drawer-open');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

 
  drawer.querySelectorAll('.drawer-nav-list a, .drawer-footer a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

 
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

 
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   4. 3D HERO CANVAS (Luxury Silk Mesh & Particles)
   ========================================================================== */
function initHeroCanvas3D() {
  const canvas = document.getElementById('heroCanvas3D');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 42;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class SilkParticle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 184, 0, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new SilkParticle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

   
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const lineAlpha = (1 - dist / 130) * 0.18;
          ctx.strokeStyle = `rgba(245, 184, 0, ${lineAlpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}

/* ==========================================================================
   5. COUNTER STATS (Hero Numbers & Facts Counter with Visible Scroll Animation)
   ========================================================================== */
function initCounterStats() {
  function runCountAnimation(counter, duration = 2000) {
    const target = parseInt(counter.getAttribute('data-target'), 10) || 0;
    const suffix = counter.getAttribute('data-suffix') || '';
    const prefix = counter.getAttribute('data-prefix') || '';
    counter.classList.add('is-counting');

    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
     
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeProgress * target);
      counter.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
        setTimeout(() => {
          counter.classList.remove('is-counting');
        }, 400);
      }
    }
    requestAnimationFrame(step);
  }

 
  const factCounters = document.querySelectorAll('.fact-number[data-target]');
  const factsSection = document.querySelector('.facts-counter-section');
  if (factCounters.length && factsSection) {
    let hasAnimatedFacts = false;
    const factsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedFacts) {
          hasAnimatedFacts = true;
          factCounters.forEach(c => runCountAnimation(c, 2200));
        }
      });
    }, { threshold: 0.25 });
    factsObserver.observe(factsSection);
  }

 
  const heroCounters = document.querySelectorAll('.hero-stat-num[data-target]');
  const heroStatsBar = document.querySelector('.hero-bottom-stats-bar');
  if (heroCounters.length && heroStatsBar) {
    let hasAnimatedHero = false;
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimatedHero) {
          hasAnimatedHero = true;
          heroCounters.forEach(c => runCountAnimation(c, 2000));
        }
      });
    }, { threshold: 0.15 });
    heroObserver.observe(heroStatsBar);
  }
}

/* ==========================================================================
   6. COLLECTIONS SWIPER SLIDESHOW
   ========================================================================== */
function initCollectionsSwiper() {
  if (typeof Swiper === 'undefined') return;

  const swiperEl = document.querySelector('.swiper-collections-container');
  if (!swiperEl) return;

  const collectionsSwiper = new Swiper('.swiper-collections-container', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    grabCursor: false,
    preventClicks: false,
    preventClicksPropagation: false,
    touchStartPreventDefault: false,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-btn-next',
      prevEl: '.swiper-btn-prev'
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 28
      }
    }
  });

  const prevBtn = document.querySelector('.swiper-btn-prev');
  const nextBtn = document.querySelector('.swiper-btn-next');
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      collectionsSwiper.slidePrev();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      collectionsSwiper.slideNext();
    });
  }

 
  const testEl = document.querySelector('.swiper-testimonials');
  if (testEl) {
    new Swiper('.swiper-testimonials', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: {
        delay: 5000
      },
      pagination: {
        el: '.swiper-pagination-testimonials',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 24
        }
      }
    });
  }
}

/* ==========================================================================
   7. LOOKBOOK FILTERING
   ========================================================================== */
function initLookbookFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.lookbook-grid-item');
  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   8. MODALS (Video & Silhouette Quick-View & Booking)
   ========================================================================== */
function initModals() {
 
  function openModal(modal) {
    if (!modal) return;
    modal.classList.add('open');
    document.body.classList.add('modal-open');
  }

 
  const videoModal = document.getElementById('videoModal');
  const videoPlayer = document.getElementById('runwayVideoPlayer');
  const videoFrame = document.getElementById('runwayVideoFrame');
  const videoTriggers = document.querySelectorAll('.video-play-trigger, .btn-watch-runway');

  if (videoModal && videoTriggers.length) {
    videoTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(videoModal);
        if (videoPlayer) {
          videoPlayer.currentTime = 0;
          const playPromise = videoPlayer.play();
          if (playPromise !== undefined) {
            playPromise.catch(err => {
              console.log('Video autoplay prevented or interaction required:', err);
            });
          }
        }
        if (videoFrame) {
          videoFrame.src = "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1";
        }
      });
    });
  }

 
  const lookbookModal = document.getElementById('lookbookModal');
  const viewBtns = document.querySelectorAll('.lookbook-view-btn');

  if (lookbookModal && viewBtns.length) {
    viewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.lookbook-card');
        if (!card) return;

        const title = card.querySelector('.lookbook-title')?.textContent || 'Couture Silhouette';
        const tag = card.querySelector('.lookbook-tag')?.textContent || 'HAUTE COUTURE';
        const desc = card.querySelector('.lookbook-desc')?.textContent || '';
        const imgSrc = card.querySelector('img')?.src || '';

        const mTitle = document.getElementById('modalLookTitle');
        const mTag = document.getElementById('modalLookTag');
        const mDesc = document.getElementById('modalLookDesc');
        const mImg = document.getElementById('modalLookImg');

        if (mTitle) mTitle.textContent = title;
        if (mTag) mTag.textContent = tag;
        if (mDesc) mDesc.textContent = desc;
        if (mImg) mImg.src = imgSrc;

        openModal(lookbookModal);
      });
    });
  }

 
  document.addEventListener('click', (e) => {
    const bookingBtn = e.target.closest('.btn-book-fitting');
    if (bookingBtn) {
      e.preventDefault();
      e.stopPropagation();
      window.location.href = 'signup.html';
    }
  });

 
  function closeAllModals() {
    document.querySelectorAll('.custom-modal-backdrop').forEach(m => m.classList.remove('open'));
    document.body.classList.remove('modal-open');
    if (videoPlayer) {
      videoPlayer.pause();
      videoPlayer.currentTime = 0;
    }
    if (videoFrame) {
      videoFrame.src = "";
    }
  }

 
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      closeAllModals();
    });
  });

 
  document.querySelectorAll('.custom-modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeAllModals();
      }
    });
  });

 
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

/* ==========================================================================
   9. AUTHENTICATION & SESSION MANAGEMENT
   ========================================================================== */
function cleanupAuthModalsAndOverlays() {
  if (typeof Swal !== 'undefined') {
    try {
      Swal.close();
    } catch (err) {}
  }

 
  document.querySelectorAll('.swal2-container').forEach(el => el.remove());

 
  document.body.classList.remove('swal2-shown', 'swal2-height-auto', 'swal2-no-backdrop', 'modal-open');
  document.documentElement.classList.remove('swal2-shown', 'swal2-height-auto');

 
  document.querySelectorAll('[aria-hidden="true"]').forEach(el => {
    if (!el.classList.contains('custom-modal-backdrop') && el.id !== 'searchModal' && el.id !== 'videoModal') {
      el.removeAttribute('aria-hidden');
    }
  });

 
  const forms = [document.getElementById('signInForm'), document.getElementById('signUpForm')];
  forms.forEach(form => {
    if (form) {
      form.style.pointerEvents = 'auto';
      form.querySelectorAll('input, button, select, textarea').forEach(el => {
        el.removeAttribute('disabled');
        el.style.pointerEvents = 'auto';
      });
    }
  });

  const submitBtns = document.querySelectorAll('button[type="submit"], input[type="submit"]');
  submitBtns.forEach(btn => {
    btn.removeAttribute('disabled');
    btn.style.pointerEvents = 'auto';
  });
}


window.addEventListener('pageshow', () => {
  cleanupAuthModalsAndOverlays();
});

window.addEventListener('popstate', () => {
  cleanupAuthModalsAndOverlays();
});

function initAuthLogic() {
  cleanupAuthModalsAndOverlays();
  const signInForm = document.getElementById('signInForm');
  const signUpForm = document.getElementById('signUpForm');

 
  const roleBtns = document.querySelectorAll('.auth-role-tabs .auth-role-btn');
  let selectedRole = 'client';

  roleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      roleBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedRole = btn.getAttribute('data-role') || 'client';

      const roleBadge = document.getElementById('activeRoleBadge');
      const roleDesc = document.getElementById('activeRoleDesc');
      if (selectedRole === 'designer' || selectedRole === 'admin') {
        if (roleBadge) roleBadge.textContent = 'FASHION DESIGNER \u2022 ATELIER SUITE';
        if (roleDesc) roleDesc.textContent = 'Manage commissions, garment pipeline, textile inventory & runway analytics.';
      } else {
        if (roleBadge) roleBadge.textContent = 'BESPOKE VIP CLIENT PORTAL';
        if (roleDesc) roleDesc.textContent = 'Access your custom commission pipeline, virtual fittings & lookbooks.';
      }
    });
  });

 
  window.togglePasswordVisibility = function(inputId, btnEl) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const icon = btnEl ? btnEl.querySelector('i') : null;
    if (input.type === 'password') {
      input.type = 'text';
      if (icon) {
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      }
    } else {
      input.type = 'password';
      if (icon) {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      }
    }
  };

 
  let signupRole = 'client';
  window.selectSignupRole = function(role, btnEl) {
    signupRole = role;
    const parentTabs = btnEl ? btnEl.closest('.auth-role-tabs') : null;
    if (parentTabs) {
      parentTabs.querySelectorAll('.auth-role-btn').forEach(b => b.classList.remove('active'));
      btnEl.classList.add('active');
    }
    const badge = document.getElementById('signupRoleBadge');
    const desc = document.getElementById('signupRoleDesc');
    if (role === 'designer' || role === 'admin') {
      if (badge) badge.textContent = 'FASHION DESIGNER \u2022 ATELIER DIRECTOR ACCESS';
      if (desc) desc.textContent = 'Access master atelier management console, client salon bookings, and fashion telemetry.';
    } else {
      if (badge) badge.textContent = 'BESPOKE VIP CLIENT REGISTRATION';
      if (desc) desc.textContent = 'Register for private salon appointments, bridal couture commissions, and digital lookbooks.';
    }
  };

 
  window.handleForgotPassword = function() {
    if (typeof Swal !== 'undefined') {
      Swal.fire({
        title: 'Reset Atelier Security Pass',
        text: 'Enter your registered email address to receive secure reset credentials.',
        input: 'email',
        inputPlaceholder: 'patron@stackly.couture',
        showCancelButton: true,
        confirmButtonText: 'Dispatch Key',
        cancelButtonText: 'Cancel',
        customClass: {
          popup: 'couture-swal-popup'
        }
      }).then((result) => {
        if (result.isConfirmed && result.value) {
          Swal.fire({
            title: 'Instructions Dispatched!',
            text: `A cryptographic security reset link has been dispatched to ${result.value}.`,
            icon: 'success',
            customClass: {
              popup: 'couture-swal-popup'
            }
          });
        }
      });
    } else {
      const email = prompt('Enter your registered atelier email to reset your security pass:');
      if (email) {
        alert(`A cryptographic security reset link has been dispatched to ${email}.`);
      }
    }
  };

 
  window.handleSocialAuth = function(provider) {
    window.location.href = '404.html';
  };

 
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('registered') === 'true') {
    const regEmail = urlParams.get('email');
    const authEmailInput = document.getElementById('authEmail');
    if (authEmailInput && regEmail) {
      authEmailInput.value = decodeURIComponent(regEmail);
    }
  }

 
  function setupInputClearing(inputEl, groupEl) {
    if (!inputEl || !groupEl) return;
    inputEl.addEventListener('input', () => {
      groupEl.classList.remove('has-error');
    });
    inputEl.addEventListener('change', () => {
      groupEl.classList.remove('has-error');
    });
  }

 
  if (signInForm) {
    const emailInput = document.getElementById('authEmail');
    const passInput = document.getElementById('authPassword');
    const groupEmail = document.getElementById('group-authEmail');
    const groupPass = document.getElementById('group-authPassword');

    setupInputClearing(emailInput, groupEmail);
    setupInputClearing(passInput, groupPass);

    signInForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const emailVal = emailInput?.value.trim() || '';
      const passVal = passInput?.value.trim() || '';
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(emailVal)) {
        if (groupEmail) groupEmail.classList.add('has-error');
        isValid = false;
      }

      if (passVal.length < 6) {
        if (groupPass) groupPass.classList.add('has-error');
        isValid = false;
      }

      if (!isValid) {
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Verification Incomplete',
            text: 'Please provide valid atelier credentials to enter the suite.',
            icon: 'warning',
            customClass: {
              popup: 'couture-swal-popup'
            }
          });
        }
        return;
      }

      const userName = emailVal.split('@')[0].replace('.', ' ').toUpperCase();
      localStorage.setItem('userEmail', emailVal);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userRole', selectedRole);
      localStorage.setItem('isLoggedIn', 'true');

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Welcome to Atelier',
          html: `<p style="color:#cbd5e1;">Welcome back, <strong style="color:#c28800;">${userName}</strong>.</p><p style="color:#94a3b8;font-size:0.85rem;">Authenticating secure atelier session...</p>`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: 'couture-swal-popup'
          }
        }).then(() => {
          cleanupAuthModalsAndOverlays();
          if (selectedRole === 'designer' || selectedRole === 'admin') {
            window.location.href = 'dashboard-studio.html';
          } else {
            window.location.href = 'dashboard-client.html';
          }
        });
      } else {
        cleanupAuthModalsAndOverlays();
        if (selectedRole === 'designer' || selectedRole === 'admin') {
          window.location.href = 'dashboard-studio.html';
        } else {
          window.location.href = 'dashboard-client.html';
        }
      }
    });
  }

 
  if (signUpForm) {
    const nameInput = document.getElementById('signupName');
    const phoneInput = document.getElementById('signupPhone');
    const emailInput = document.getElementById('signupEmail');
    const styleInput = document.getElementById('signupStyle');
    const cityInput = document.getElementById('signupCity');
    const passInput = document.getElementById('signupPassword');
    const confirmPassInput = document.getElementById('signupConfirmPassword');
    const termsCheck = document.getElementById('termsCheck');

    const groupName = document.getElementById('group-signupName');
    const groupPhone = document.getElementById('group-signupPhone');
    const groupEmail = document.getElementById('group-signupEmail');
    const groupStyle = document.getElementById('group-signupStyle');
    const groupCity = document.getElementById('group-signupCity');
    const groupPass = document.getElementById('group-signupPassword');
    const groupConfirmPass = document.getElementById('group-signupConfirmPassword');
    const groupTerms = document.getElementById('group-termsCheck');

    setupInputClearing(nameInput, groupName);
    setupInputClearing(phoneInput, groupPhone);
    setupInputClearing(emailInput, groupEmail);
    setupInputClearing(styleInput, groupStyle);
    setupInputClearing(cityInput, groupCity);
    setupInputClearing(passInput, groupPass);
    setupInputClearing(confirmPassInput, groupConfirmPass);
    if (termsCheck && groupTerms) {
      termsCheck.addEventListener('change', () => groupTerms.classList.remove('has-error'));
    }

    signUpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      let firstErrorField = null;

     
      const nameVal = nameInput?.value.trim() || '';
      const nameRegex = /^[A-Za-z\s]{2,50}$/;
      if (!nameRegex.test(nameVal)) {
        if (groupName) groupName.classList.add('has-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = nameInput;
      }

     
      const phoneVal = phoneInput?.value.trim() || '';
      const phoneRegex = /^[0-9+()\s-]{7,20}$/;
      if (!phoneRegex.test(phoneVal)) {
        if (groupPhone) groupPhone.classList.add('has-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = phoneInput;
      }

     
      const emailVal = emailInput?.value.trim() || '';
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(emailVal)) {
        if (groupEmail) groupEmail.classList.add('has-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = emailInput;
      }

     
      const styleVal = styleInput?.value.trim() || '';
      if (styleVal.length < 2) {
        if (groupStyle) groupStyle.classList.add('has-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = styleInput;
      }

     
      const cityVal = cityInput?.value.trim() || '';
      if (cityVal.length < 2) {
        if (groupCity) groupCity.classList.add('has-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = cityInput;
      }

     
      const passVal = passInput?.value.trim() || '';
      if (passVal.length < 6) {
        if (groupPass) groupPass.classList.add('has-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = passInput;
      }

     
      const confirmVal = confirmPassInput?.value.trim() || '';
      if (!confirmVal || confirmVal !== passVal) {
        if (groupConfirmPass) groupConfirmPass.classList.add('has-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = confirmPassInput;
      }

     
      if (termsCheck && !termsCheck.checked) {
        if (groupTerms) groupTerms.classList.add('has-error');
        isValid = false;
        if (!firstErrorField) firstErrorField = termsCheck;
      }

      if (!isValid) {
        if (firstErrorField && typeof firstErrorField.focus === 'function') {
          firstErrorField.focus();
        }
        if (typeof Swal !== 'undefined') {
          Swal.fire({
            title: 'Please Verify Registration',
            text: 'Ensure all required fields are correctly completed before proceeding.',
            icon: 'warning',
            customClass: {
              popup: 'couture-swal-popup'
            }
          });
        }
        return;
      }

     
      localStorage.setItem('userName', nameVal);
      localStorage.setItem('userEmail', emailVal);
      localStorage.setItem('userPhone', phoneVal);
      localStorage.setItem('userRole', signupRole);
      localStorage.setItem('clientStyle', styleVal);
      localStorage.setItem('clientCity', cityVal);
      localStorage.setItem('isLoggedIn', 'true');

      if (typeof Swal !== 'undefined') {
        Swal.fire({
          title: 'Account Created Successfully!',
          html: `<p style="color:#cbd5e1;">Welcome to Stackly Haute Couture, <strong style="color:#c28800;">${nameVal}</strong>.</p><p style="color:#94a3b8;font-size:0.85rem;">Your bespoke profile is ready. Redirecting to Sign In...</p>`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1800,
          customClass: {
            popup: 'couture-swal-popup'
          }
        }).then(() => {
          cleanupAuthModalsAndOverlays();
          window.location.href = `signin.html?registered=true&email=${encodeURIComponent(emailVal)}`;
        });
      } else {
        alert(`Account Created Successfully! Welcome to Stackly Haute Couture, ${nameVal}. Redirecting to Sign In.`);
        cleanupAuthModalsAndOverlays();
        window.location.href = `signin.html?registered=true&email=${encodeURIComponent(emailVal)}`;
      }
    });
  }
}

/* ==========================================================================
   10. DASHBOARDS (Studio & Analytics)
   ========================================================================== */
function initDashboard() {
 
  const dashMenuBtn = document.getElementById('dashMenuToggle');
  const dashSidebar = document.getElementById('dashSidebar') || document.querySelector('.dash-sidebar');
  const dashOverlay = document.getElementById('dashOverlay');
  const dashCloseBtn = document.getElementById('dashSidebarClose');

  function closeSidebar() {
    if (dashSidebar) dashSidebar.classList.remove('open');
    if (dashOverlay) dashOverlay.classList.remove('show');
    document.body.classList.remove('dash-sidebar-open');
    if (dashMenuBtn) {
      dashMenuBtn.classList.remove('open');
      dashMenuBtn.setAttribute('aria-expanded', 'false');
    }
  }

  function openSidebar() {
    if (dashSidebar) dashSidebar.classList.add('open');
    if (dashOverlay) dashOverlay.classList.add('show');
    document.body.classList.add('dash-sidebar-open');
    if (dashMenuBtn) {
      dashMenuBtn.classList.add('open');
      dashMenuBtn.setAttribute('aria-expanded', 'true');
    }
  }

  if (dashMenuBtn && dashSidebar) {
    dashMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (dashSidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (dashCloseBtn) {
    dashCloseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      closeSidebar();
    });
  }

  if (dashOverlay) {
    dashOverlay.addEventListener('click', closeSidebar);
  }

 
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dashSidebar && dashSidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

 
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && dashSidebar && dashSidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

 
  const storedName = localStorage.getItem('userName') || 'Aria Vance';
  const storedEmail = localStorage.getItem('userEmail') || 'vip.client@stackly.couture';
  const storedRole = localStorage.getItem('userRole') || 'client';

  const userAvatar = document.getElementById('dashUserAvatar');
  const userNameEl = document.getElementById('dashUserName');
  const userEmailEl = document.getElementById('dashUserEmail');
  const welcomeName = document.getElementById('dashWelcomeName');
  const welcomeClientName = document.getElementById('dashWelcomeClientName');
  const topAvatar = document.getElementById('dashTopAvatar');
  const topName = document.getElementById('dashTopName');

  const initial = storedName.charAt(0).toUpperCase();
  if (userAvatar) userAvatar.textContent = initial;
  if (topAvatar) topAvatar.textContent = initial;
  if (userNameEl) userNameEl.textContent = storedName;
  if (topName) topName.textContent = storedName;
  if (userEmailEl) userEmailEl.textContent = storedEmail;
  if (welcomeName) welcomeName.textContent = storedName;
  if (welcomeClientName) welcomeClientName.textContent = storedName;

 
  const navLinks = document.querySelectorAll('.dash-sidebar-link[data-target-tab]');
  const tabSections = document.querySelectorAll('.dash-tab-content');

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const target = link.getAttribute('data-target-tab');
      tabSections.forEach(tab => {
        if (tab.id === target) {
          tab.style.display = 'block';
        } else {
          tab.style.display = 'none';
        }
      });

     
      if (window.innerWidth < 992) {
        closeSidebar();
      }
    });
  });

 
  if (dashSidebar) {
    const otherItems = dashSidebar.querySelectorAll('a, .dash-sidebar-logout');
    otherItems.forEach(item => {
      item.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          closeSidebar();
        }
      });
    });
  }

 
  window.logoutAtelier = function() {
    if (confirm('Are you sure you want to exit your private atelier portal?')) {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
      window.location.href = 'signin.html';
    }
  };
}

/* ==========================================================================
   11. ULTRA MODERN SCROLL ANIMATIONS (IntersectionObserver)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/* ==========================================================================
   12. 3D FLIP CARD INTERACTION (Touch & Click Support)
   ========================================================================== */
function initFlipCards() {
  document.addEventListener('click', (e) => {
   
    if (e.target.closest('button') || e.target.closest('a')) return;
    const card = e.target.closest('.flip-card, .craft-flip-card');
    if (card) {
      card.classList.toggle('is-flipped');
    }
    const artisanCard = e.target.closest('.artisan-hover-card');
    if (artisanCard) {
      artisanCard.classList.toggle('is-active');
    } else {
      document.querySelectorAll('.artisan-hover-card.is-active').forEach(c => c.classList.remove('is-active'));
    }
  });
}

/* ==========================================================================
   13. AUTOMATIC 404 REDIRECT FOR UNLINKED ELEMENTS
   ========================================================================== */
function initLinkRedirects() {
 
  const dummyLinks = document.querySelectorAll('a[href="#"], a[href=""]');
  dummyLinks.forEach(link => {
    link.setAttribute('href', '404.html');
  });
}

/* ==========================================================================
   11b. PER-ITEM SCROLL ANIMATIONS (cards, buttons, numbers, skill bars)
   ========================================================================== */
function initItemAnimations() {
  const groups = [
    { sel: '.about-pillar-item', type: 'up' },
    { sel: '.fact-counter-card', type: 'zoom' },
    { sel: '.service-card-3d', type: 'up' },
    { sel: '.skill-bar-item', type: 'left' },
    { sel: '.booking-cta-card', type: 'zoom' },
    { sel: '.video-box-card', type: 'left' },
    { sel: '.about-image-card', type: 'left' },
    { sel: '.artisan-card', type: 'up' },
    { sel: '.award-card', type: 'zoom' },
    { sel: '.odyssey-step-card', type: 'up' },
    { sel: '.editorial-card', type: 'up' },
    { sel: '.fitting-stage-card', type: 'up' },
    { sel: '.faq-accordion-item', type: 'up' },
    { sel: '.dispatch-video-card', type: 'left' },
    { sel: '.dispatch-mini-card', type: 'up' },
    { sel: '.masterclass-card', type: 'up' },
    { sel: '.suite-card', type: 'up' },
    { sel: '.trunk-show-card', type: 'up' },
    { sel: 'main .btn-gold, main .btn-gold-outline', type: 'zoom', skip: '.hero-couture-section, .swiper-btn-prev, .swiper-btn-next, .flip-card' },
    { sel: '.footer-social-icon', type: 'zoom' }
  ];

  const items = [];
  groups.forEach(g => {
    document.querySelectorAll(g.sel).forEach(el => {
      if (g.skip && (el.closest(g.skip) || el.matches(g.skip))) return;
      if (el.classList.contains('anim-item')) return;
      const siblings = Array.from(el.parentElement.children).filter(c => c.matches(g.sel));
      const idx = Math.max(0, siblings.indexOf(el));
      el.classList.add('anim-item', 'anim-' + g.type);
      el.style.setProperty('--anim-delay', (idx * 0.12) + 's');
      items.push(el);
    });
  });

 
  document.querySelectorAll('.skill-fill').forEach(fill => {
    fill.dataset.w = fill.style.width;
    fill.style.width = '0%';
  });

  const finish = el => {
    el.classList.remove('in-view');
    el.classList.add('anim-done');
  };

  const show = el => {
    el.classList.add('in-view');
    el.addEventListener('animationend', () => finish(el), { once: true });
    if (el.classList.contains('skill-bar-item')) {
      const fill = el.querySelector('.skill-fill');
      if (fill) setTimeout(() => { fill.style.width = fill.dataset.w; }, 250);
    }
    el.querySelectorAll('.fact-number').forEach(n => n.classList.add('num-pop'));
  };

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(el => { el.classList.add('anim-done'); });
    document.querySelectorAll('.skill-fill').forEach(f => { f.style.width = f.dataset.w; });
    return;
  }

  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        show(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -30px 0px' });

  items.forEach(el => io.observe(el));
}

/* ==========================================================================
   11c. EXPANDING SHOWCASE (small rectangle grows to full hero size on scroll)
   ========================================================================== */
function initExpandShowcase() {
  const section = document.getElementById('expandShowcase');
  if (!section) return;
  const media = section.querySelector('.expand-media');
  const stage = section.querySelector('.expand-stage');
  const hint = section.querySelector('.expand-hint');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const ease = t => 1 - Math.pow(1 - t, 3);

  function update() {
    ticking = false;
    const rect = section.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const total = section.offsetHeight - vh;
    const p = reduce ? 1 : clamp(-rect.top / total, 0, 1);
    const e = ease(clamp(p / 0.85, 0, 1));

   
    const startW = Math.min(vw * 0.62, 640);
    const startS = startW / vw;
    const s = lerp(startS, 1, e);
    media.style.width = (vw * s) + 'px';
    media.style.height = (vh * s) + 'px';
    media.style.borderRadius = lerp(28, 0, e) + 'px';
    stage.style.transform = 'translate(-50%, -50%) scale(' + s + ')';
    if (hint) hint.style.opacity = 1 - clamp(p / 0.12, 0, 1);
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
}

/* ==========================================================================
   14. FAQ ACCORDION INTERACTION
   ========================================================================== */
function initFaqAccordion() {
  document.addEventListener('click', (e) => {
    const header = e.target.closest('.faq-accordion-header');
    if (!header) return;

    const item = header.closest('.faq-accordion-item');
    if (!item) return;

    const container = item.closest('.faq-accordion-container');
    const wasActive = item.classList.contains('active');

    if (container) {
      container.querySelectorAll('.faq-accordion-item').forEach(i => i.classList.remove('active'));
    }

    if (!wasActive) {
      item.classList.add('active');
    }
  });
}

/* ==========================================================================
   15. MASTERCLASS CARDS INTERACTION (TOUCH & CLICK SUPPORT)
   ========================================================================== */
function initMasterclassCards() {
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.masterclass-card');
    if (!card) {
      document.querySelectorAll('.masterclass-card.is-active').forEach(c => c.classList.remove('is-active'));
      return;
    }
    if (e.target.closest('.masterclass-link-btn')) return;

    const wasActive = card.classList.contains('is-active');
    document.querySelectorAll('.masterclass-card.is-active').forEach(c => c.classList.remove('is-active'));
    if (!wasActive) {
      card.classList.add('is-active');
    }
  });
}

/* ==========================================================================
   16. CUSTOM LUXURY DROPDOWNS (STRICT MOBILE SCREEN CONSTRAINT)
   ========================================================================== */
function initCustomDropdowns() {
  const dropdownContainers = document.querySelectorAll('.custom-dropdown-container');
  if (!dropdownContainers.length) return;

  dropdownContainers.forEach(container => {
    const trigger = container.querySelector('.custom-dropdown-trigger');
    const menu = container.querySelector('.custom-dropdown-menu');
    const selectedText = container.querySelector('.custom-dropdown-selected');
    const hiddenInput = container.querySelector('input[type="hidden"]');
    const items = container.querySelectorAll('.custom-dropdown-item');

    if (!trigger || !menu) return;

   
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = container.classList.contains('is-open');

     
      document.getElementById('occasionDateContainer')?.classList.remove('is-open');
      document.querySelectorAll('.custom-dropdown-container.is-open').forEach(c => {
        if (c !== container) {
          c.classList.remove('is-open');
          c.querySelector('.custom-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        container.classList.remove('is-open');
        trigger.setAttribute('aria-expanded', 'false');
      } else {
        container.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

   
    items.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const value = item.getAttribute('data-value');
        const text = item.querySelector('span')?.textContent || value;

        items.forEach(i => i.classList.remove('is-selected'));
        item.classList.add('is-selected');

        if (selectedText) {
          selectedText.textContent = text;
          selectedText.classList.remove('text-muted');
          selectedText.classList.add('text-dark');
        }

        if (hiddenInput) {
          hiddenInput.value = value;
          hiddenInput.dispatchEvent(new Event('change', { bubbles: true }));
        }

        container.classList.remove('is-open');
        container.classList.remove('is-invalid');
        trigger.setAttribute('aria-expanded', 'false');

       
        const errorSlot = container.closest('.form-field-group')?.querySelector('.form-field-error');
        if (errorSlot) {
          errorSlot.textContent = '';
        }
      });
    });
  });

 
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-dropdown-container')) {
      document.querySelectorAll('.custom-dropdown-container.is-open').forEach(c => {
        c.classList.remove('is-open');
        c.querySelector('.custom-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

 
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.custom-dropdown-container.is-open').forEach(c => {
        c.classList.remove('is-open');
        c.querySelector('.custom-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* ==========================================================================
   17. CUSTOM LUXURY DATE PICKER (STRICT MOBILE SCREEN CONSTRAINT)
   ========================================================================== */
function initCustomDatePicker() {
  const container = document.getElementById('occasionDateContainer');
  const input = document.getElementById('contactDate');
  const popup = document.getElementById('customCalendarPopup');
  const monthYearLabel = document.getElementById('calMonthYear');
  const daysGrid = document.getElementById('calDaysGrid');
  const prevBtn = document.getElementById('calPrevMonth');
  const nextBtn = document.getElementById('calNextMonth');
  const clearBtn = document.getElementById('calClearBtn');
  const todayBtn = document.getElementById('calTodayBtn');
  const dateError = document.getElementById('dateError');

  if (!container || !input || !popup || !daysGrid) return;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();
  let selectedDate = null;

  function renderCalendar(year, month) {
    if (monthYearLabel) {
      monthYearLabel.textContent = `${monthNames[month]} ${year}`;
    }

    daysGrid.innerHTML = '';

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

   
    for (let i = 0; i < firstDayIndex; i++) {
      const emptyCell = document.createElement('div');
      emptyCell.className = 'calendar-day-cell empty';
      daysGrid.appendChild(emptyCell);
    }

   
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement('div');
      cell.className = 'calendar-day-cell';
      cell.textContent = day;

      const thisDate = new Date(year, month, day);
      thisDate.setHours(0, 0, 0, 0);

     
      if (thisDate < today) {
        cell.classList.add('disabled');
      }

     
      if (thisDate.getTime() === today.getTime()) {
        cell.classList.add('is-today');
      }

     
      if (selectedDate && thisDate.getTime() === selectedDate.getTime()) {
        cell.classList.add('is-selected');
      }

     
      cell.addEventListener('click', (e) => {
        e.stopPropagation();
        selectedDate = thisDate;

        const yyyy = thisDate.getFullYear();
        const mm = String(thisDate.getMonth() + 1).padStart(2, '0');
        const dd = String(thisDate.getDate()).padStart(2, '0');
        input.value = `${yyyy}-${mm}-${dd}`;

        input.dispatchEvent(new Event('change', { bubbles: true }));

        if (dateError) dateError.textContent = '';
        input.classList.remove('is-invalid');
        container.classList.remove('is-invalid');

        closeCalendar();
      });

      daysGrid.appendChild(cell);
    }
  }

  function openCalendar() {
   
    document.querySelectorAll('.custom-dropdown-container.is-open').forEach(c => {
      c.classList.remove('is-open');
      c.querySelector('.custom-dropdown-trigger')?.setAttribute('aria-expanded', 'false');
    });

    container.classList.add('is-open');
    popup.setAttribute('aria-hidden', 'false');
    renderCalendar(currentYear, currentMonth);
  }

  function closeCalendar() {
    container.classList.remove('is-open');
    popup.setAttribute('aria-hidden', 'true');
  }

 
  const inputWrap = container.querySelector('.custom-datepicker-input-wrap');
  inputWrap?.addEventListener('click', (e) => {
    e.stopPropagation();
    if (container.classList.contains('is-open')) {
      closeCalendar();
    } else {
      openCalendar();
    }
  });

 
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
  });

 
  clearBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    selectedDate = null;
    input.value = '';
    input.dispatchEvent(new Event('change', { bubbles: true }));
    renderCalendar(currentYear, currentMonth);
    closeCalendar();
  });

 
  todayBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    selectedDate = new Date(today);
    currentYear = today.getFullYear();
    currentMonth = today.getMonth();

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    input.value = `${yyyy}-${mm}-${dd}`;

    input.dispatchEvent(new Event('change', { bubbles: true }));
    if (dateError) dateError.textContent = '';
    input.classList.remove('is-invalid');
    container.classList.remove('is-invalid');

    renderCalendar(currentYear, currentMonth);
    closeCalendar();
  });

 
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#occasionDateContainer')) {
      closeCalendar();
    }
  });

 
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCalendar();
    }
  });
}

/* ==========================================================================
   18. CONTACT FORM VALIDATION & EQUAL-HEIGHT ZERO-SHIFT ENGINE
   ========================================================================== */
function initContactFormValidation() {
  const form = document.getElementById('appointmentBookingForm');
  if (!form) return;

  const nameInput = document.getElementById('contactFullName');
  const emailInput = document.getElementById('contactEmail');
  const phoneInput = document.getElementById('contactPhone');
  const dateInput = document.getElementById('contactDate');
  const commissionInput = document.getElementById('commissionTypeInput');
  const locationInput = document.getElementById('fittingLocationInput');
  const commissionContainer = document.getElementById('commissionDropdown');
  const locationContainer = document.getElementById('locationDropdown');
  const successAlert = document.getElementById('formSuccessAlert');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const phoneError = document.getElementById('phoneError');
  const dateError = document.getElementById('dateError');
  const commissionError = document.getElementById('commissionError');
  const locationError = document.getElementById('locationError');
  const submitBtn = document.getElementById('submitAppointmentBtn');

 
  const resetSubmitBtn = () => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fa-solid fa-calendar-check me-2"></i> Submit Fitting Request';
    }
  };

 
  resetSubmitBtn();

 
  window.addEventListener('pageshow', () => {
    resetSubmitBtn();
  });

 
  window.addEventListener('pagehide', () => {
    resetSubmitBtn();
  });

 
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

 
  nameInput?.addEventListener('input', () => {
    if (nameInput.value.trim().length >= 2) {
      if (nameError) nameError.textContent = '';
      nameInput.classList.remove('is-invalid');
    }
  });

  emailInput?.addEventListener('input', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailInput.value.trim())) {
      if (emailError) emailError.textContent = '';
      emailInput.classList.remove('is-invalid');
    }
  });

  phoneInput?.addEventListener('input', () => {
    const digits = phoneInput.value.replace(/\D/g, '');
    if (digits.length >= 10) {
      if (phoneError) phoneError.textContent = '';
      phoneInput.classList.remove('is-invalid');
    }
  });

  dateInput?.addEventListener('change', () => {
    if (dateInput.value) {
      if (dateError) dateError.textContent = '';
      dateInput.classList.remove('is-invalid');
    }
  });

  commissionInput?.addEventListener('change', () => {
    if (commissionInput.value) {
      if (commissionError) commissionError.textContent = '';
      commissionContainer?.classList.remove('is-invalid');
    }
  });

  locationInput?.addEventListener('change', () => {
    if (locationInput.value) {
      if (locationError) locationError.textContent = '';
      locationContainer?.classList.remove('is-invalid');
    }
  });

 
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;
    let firstInvalid = null;

   
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal) {
      if (nameError) nameError.textContent = 'Please enter your full name';
      nameInput?.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = nameInput;
      hasError = true;
    } else if (nameVal.length < 2) {
      if (nameError) nameError.textContent = 'Name must be at least 2 characters';
      nameInput?.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = nameInput;
      hasError = true;
    } else {
      if (nameError) nameError.textContent = '';
      nameInput?.classList.remove('is-invalid');
    }

   
    const emailVal = emailInput ? emailInput.value.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailVal) {
      if (emailError) emailError.textContent = 'Please enter your email address';
      emailInput?.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = emailInput;
      hasError = true;
    } else if (!emailRegex.test(emailVal)) {
      if (emailError) emailError.textContent = 'Please enter a valid email address';
      emailInput?.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = emailInput;
      hasError = true;
    } else {
      if (emailError) emailError.textContent = '';
      emailInput?.classList.remove('is-invalid');
    }

   
    const phoneVal = phoneInput ? phoneInput.value.trim() : '';
    const phoneDigits = phoneVal.replace(/\D/g, '');
    if (!phoneVal) {
      if (phoneError) phoneError.textContent = 'Please enter your contact number';
      phoneInput?.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = phoneInput;
      hasError = true;
    } else if (phoneDigits.length < 10) {
      if (phoneError) phoneError.textContent = 'Please enter a valid 10-digit number';
      phoneInput?.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = phoneInput;
      hasError = true;
    } else {
      if (phoneError) phoneError.textContent = '';
      phoneInput?.classList.remove('is-invalid');
    }

   
    const dateVal = dateInput ? dateInput.value : '';
    const dateContainer = document.getElementById('occasionDateContainer');
    if (!dateVal) {
      if (dateError) dateError.textContent = 'Please select your occasion date';
      dateInput?.classList.add('is-invalid');
      dateContainer?.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = dateInput;
      hasError = true;
    } else {
      if (dateError) dateError.textContent = '';
      dateInput?.classList.remove('is-invalid');
      dateContainer?.classList.remove('is-invalid');
    }

   
    const commissionVal = commissionInput ? commissionInput.value : '';
    if (!commissionVal) {
      if (commissionError) commissionError.textContent = 'Please select a commission type';
      commissionContainer?.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = commissionContainer?.querySelector('.custom-dropdown-trigger');
      hasError = true;
    } else {
      if (commissionError) commissionError.textContent = '';
      commissionContainer?.classList.remove('is-invalid');
    }

   
    const locationVal = locationInput ? locationInput.value : '';
    if (!locationVal) {
      if (locationError) locationError.textContent = 'Please select a fitting location';
      locationContainer?.classList.add('is-invalid');
      if (!firstInvalid) firstInvalid = locationContainer?.querySelector('.custom-dropdown-trigger');
      hasError = true;
    } else {
      if (locationError) locationError.textContent = '';
      locationContainer?.classList.remove('is-invalid');
    }

    if (hasError) {
      if (firstInvalid && typeof firstInvalid.focus === 'function') {
        firstInvalid.focus();
      }
      return;
    }

   
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Submitting Request...';
    }

   
    setTimeout(() => {
      window.location.href = '404.html';
    }, 300);
  });
}