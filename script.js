document.addEventListener("DOMContentLoaded", () => {
  // === DEKLARASI VARIABEL UTAMA ===
  const body = document.body;
  const langToggle = document.getElementById("langToggle");
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");
  const serviceCards = document.querySelectorAll('.service-card');
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const accordionHeaders = document.querySelectorAll('.accordion-header');
  const scenicBgLayer = document.querySelector('.scenic-bg-layer');
  const modeToggles = document.querySelectorAll('#modeToggle, #footerModeToggle');
  const roleTextElement = document.getElementById("role-text");
  const portfolioTitle = document.getElementById('portfolio-title');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  const showcaseItems = document.querySelectorAll('.showcase-item');
  const showcaseImage = document.querySelector('.showcase-image');

  // === PRELOADER LOGIC ===
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    const tLogo = document.querySelector('.t-logo');
    const pulseTimeout = setTimeout(() => {
      if(tLogo) tLogo.classList.add('pulse-ready');
    }, 1200);

    window.addEventListener('load', () => {
      clearTimeout(pulseTimeout); 
      preloader.classList.add('preloader-hidden');
    });
  }
  
  // === FUNGSI ANIMASI HITUNG ANGKA ===
  function animateCountUp(el) {
    if (el.dataset.counted === 'true') return;
    el.dataset.counted = 'true';

    const target = +el.dataset.target;
    const duration = 2000;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let currentFrame = 0;

    const counter = setInterval(() => {
      currentFrame++;
      const progress = 1 - Math.pow(1 - (currentFrame / totalFrames), 3); // Efek ease-out
      const currentCount = Math.round(target * progress);
      el.textContent = currentCount + '+';

      if (currentFrame === totalFrames) {
        clearInterval(counter);
        el.textContent = target + '+';
      }
    }, frameRate);
  }

  // === DATA GAMBAR LATAR FOOTER ===
  const scenicBackgrounds = {
    light: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 380'%3E%3Cdefs%3E%3CradialGradient id='sun' cx='30%25' cy='25%25' r='30%25' fx='30%25' fy='25%25'%3E%3Cstop offset='0%25' stop-color='%23ffeea1'/%3E%3Cstop offset='100%25' stop-color='%23ffc94e'/%3E%3C/radialGradient%3E%3ClinearGradient id='sky' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23d9e8ff'/%3E%3Cstop offset='100%25' stop-color='%23f0f6ff'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23sky)'/%3E%3Cpath d='M-10 310 L60 300 L120 310 L180 290 L240 300 L300 280 L360 290 L420 270 L480 280 L540 260 L600 270 L660 250 L720 260 L780 240 L840 250 L900 230 L960 240 L1020 220 L1080 230 L1140 210 L1200 220 L1260 200 L1320 210 L1380 190 L1440 200 L1450 210 L1450 380 L-10 380 Z' fill='%23c0d6e4'/%3E%3Cpath d='M-10 290 L60 280 L120 290 L180 270 L240 280 L300 260 L360 270 L420 250 L480 260 L540 240 L600 250 L660 230 L720 240 L780 220 L840 230 L900 210 L960 220 L1020 200 L1080 210 L1140 190 L1200 200 L1260 180 L1320 190 L1380 170 L1440 180 L1450 190 L1450 380 L-10 380 Z' fill='%23d4e0e9'/%3E%3Ccircle cx='30%25' cy='25%25' r='40' fill='url(%23sun)'/%3E%3C/svg%3E")`,
    dark: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 380'%3E%3Cdefs%3E%3CradialGradient id='moon' cx='30%25' cy='25%25' r='30%25' fx='30%25' fy='25%25'%3E%3Cstop offset='0%25' stop-color='%23ffffff'/%3E%3Cstop offset='100%25' stop-color='%23f0f0f0'/%3E%3C/linearGradient%3E%3ClinearGradient id='sky' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%2310111c'/%3E%3Cstop offset='100%25' stop-color='%231f2233'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23sky)'/%3E%3Cpath d='M-10 310 L60 300 L120 310 L180 290 L240 300 L300 280 L360 290 L420 270 L480 280 L540 260 L600 270 L660 250 L720 260 L780 240 L840 250 L900 230 L960 240 L1020 220 L1080 230 L1140 210 L1200 220 L1260 200 L1320 210 L1380 190 L1440 200 L1450 210 L1450 380 L-10 380 Z' fill='%23191a29'/%3E%3Cpath d='M-10 290 L60 280 L120 290 L180 270 L240 280 L300 260 L360 270 L420 250 L480 260 L540 240 L600 250 L660 230 L720 240 L780 220 L840 230 L900 210 L960 220 L1020 200 L1080 210 L1140 190 L1200 200 L1260 180 L1320 190 L1380 170 L1440 180 L1450 190 L1450 380 L-10 380 Z' fill='%2323263a'/%3E%3Ccircle cx='30%25' cy='25%25' r='50' fill='url(%23moon)'/%3E%3C/svg%3E")`
  };

  // === DARK/LIGHT MODE LOGIC ===
  function updateAllToggles(isDarkMode) {
    modeToggles.forEach(toggle => {
      if (!toggle) return;
      toggle.classList.toggle("active-right", isDarkMode);
      toggle.classList.toggle("active-left", !isDarkMode);
    });
  }
  function applyTheme(theme) {
    const isDarkMode = theme === "dark";
    body.classList.toggle("dark-mode", isDarkMode);
    if (scenicBgLayer) {
      scenicBgLayer.style.backgroundImage = isDarkMode ? scenicBackgrounds.dark : scenicBackgrounds.light;
    }
    updateAllToggles(isDarkMode);
  }
  const currentTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(currentTheme);
  modeToggles.forEach(toggle => {
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const newTheme = body.classList.contains("dark-mode") ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme);
    });
  });

  // === LANGUAGE TOGGLE ===
  const currentLang = document.documentElement.lang;
  if (langToggle) {
    const isPortfolioPage = window.location.pathname.includes('portfolio');
    if (currentLang === "id") {
      langToggle.classList.add("active-left");
      langToggle.addEventListener("click", () => {
        window.location.href = isPortfolioPage ? "portfolio-eng.html" : "index-eng.html";
      });
    } else {
      langToggle.classList.add("active-right");
      langToggle.addEventListener("click", () => {
        window.location.href = isPortfolioPage ? "portfolio.html" : "index.html";
      });
    }
  }

  // === HAMBURGER MENU TOGGLE ===
  if (hamburger && mobileNav) {
    function closeMobileMenu() {
      hamburger.classList.remove("active");
      mobileNav.classList.remove("show");
    }
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      mobileNav.classList.toggle("show");
    });
    mobileNav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') { closeMobileMenu(); }
    });
  }

  // === HERO TYPING EFFECT ===
  if (roleTextElement) {
    const roles = currentLang === "id" ? ["Fotografer", "Retoucher", "Desainer"] : ["Photographer", "Retoucher", "Designer"];
    let roleIndex = 0;
    function typeEffect(element, text, i = 0) {
      if (i < text.length) {
        element.textContent = text.substring(0, i + 1);
        setTimeout(() => typeEffect(element, text, i + 1), 100);
      }
    }
    function changeRole() {
      roleIndex = (roleIndex + 1) % roles.length;
      typeEffect(roleTextElement, roles[roleIndex]);
    }
    typeEffect(roleTextElement, roles[roleIndex]);
    setInterval(changeRole, 4000);
  }

  // === SCROLL ANIMATION SYSTEM ===
  let lastScrollY = window.scrollY;
  let scrollDirection = 'down';
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) { scrollDirection = 'down'; } else { scrollDirection = 'up'; }
    lastScrollY = window.scrollY;
  }, { passive: true });
  
  const animatedElements = document.querySelectorAll('.animate-directional-y, .animate-zoom-in, .animate-group, .stat-item');
  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        if (entry.isIntersecting) {
          if (target.classList.contains('animate-directional-y')) {
            target.classList.add(scrollDirection === 'down' ? 'from-bottom' : 'from-top');
            void target.offsetHeight;
          } else if (target.classList.contains('animate-group')) {
            const children = target.querySelectorAll('[data-animation]');
            children.forEach((child, index) => {
              child.style.transitionDelay = `${index * 150}ms`;
              child.classList.add('is-visible');
            });
            return;
          }
          
          if (target.classList.contains('stat-item')) {
            const statNumber = target.querySelector('.stat-number');
            if (statNumber) animateCountUp(statNumber);
          }
          
          target.classList.add('is-visible');

        } else {
          if (target.classList.contains('animate-group')) {
            target.querySelectorAll('[data-animation]').forEach(child => child.classList.remove('is-visible'));
          } else {
            target.classList.remove('is-visible', 'from-top', 'from-bottom');
          }
          
          if (target.classList.contains('stat-item')) {
            const statNumber = target.querySelector('.stat-number');
            if (statNumber) {
              statNumber.dataset.counted = 'false';
              statNumber.textContent = '0+';
            }
          }
        }
      });
    }, { rootMargin: "-100px 0px -100px 0px", threshold: 0.15 });
    animatedElements.forEach((el) => observer.observe(el));
  }
  
  // === PORTFOLIO SLIDER & TEXT UPDATE (HOMEPAGE) ===
  const portfolioDescription = document.getElementById('portfolio-description');
  if (document.querySelector('.portfolio-swiper')) {
    const portfolioDataID = [ { title: 'Retouching Foto Model', description: 'Retouching foto model dengan pendekatan beauty-retouch.' }, { title: 'Fotografi Gaya Urban', description: 'Menangkap esensi kehidupan kota yang dinamis melalui lensa.' }, { title: 'Desain Branding Kreatif', description: 'Membangun identitas visual yang kuat untuk merek.' } ];
    const portfolioDataEN = [ { title: 'Model Photo Retouching', description: 'Model photo retouching with a beauty-retouch approach.' }, { title: 'Urban Style Photography', description: 'Capturing the essence of a dynamic city life through the lens.' }, { title: 'Creative Branding Design', description: 'Building a strong visual identity for brands.' } ];
    const portfolioData = currentLang === 'id' ? portfolioDataID : portfolioDataEN;
    const portfolioSwiper = new Swiper('.portfolio-swiper', {
        loop: true, effect: 'slide', speed: 800, grabCursor: true, centeredSlides: true, slidesPerView: 'auto',
        navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        pagination: { el: '.project-pagination', clickable: true },
    });
    function updatePortfolioText(index) {
        if (portfolioTitle && portfolioDescription && portfolioData[index]) {
            portfolioTitle.style.opacity = 0;
            portfolioDescription.style.opacity = 0;
            setTimeout(() => {
                portfolioTitle.textContent = portfolioData[index].title;
                portfolioDescription.textContent = portfolioData[index].description;
                portfolioTitle.style.opacity = 1;
                portfolioDescription.style.opacity = 1;
            }, 300);
        }
    }
    if (portfolioTitle && portfolioDescription) {
        portfolioTitle.style.transition = 'opacity 0.3s ease-out';
        portfolioDescription.style.transition = 'opacity 0.3s ease-out';
    }
    portfolioSwiper.on('slideChange', function () { updatePortfolioText(this.realIndex); });
    updatePortfolioText(portfolioSwiper.realIndex);
  }

  // === SERVICE & TESTIMONIAL CARD INTERACTION ===
  function setupCardInteraction(cards) {
    if (cards.length > 0) {
      cards.forEach(card => {
        card.addEventListener('click', () => {
          if (card.classList.contains('selected')) {
            const url = card.dataset.url;
            if (url) window.open(url, '_blank');
          } else {
            cards.forEach(other => other.classList.remove('selected'));
            card.classList.add('selected');
          }
        });
      });
    }
  }
  setupCardInteraction(serviceCards);
  setupCardInteraction(testimonialCards);

  // === TESTIMONIAL SLIDER ===
  if (document.querySelector('.testimonial-swiper')) {
    new Swiper('.testimonial-swiper', {
      loop: true, grabCursor: true, spaceBetween: 24,
      pagination: { el: '.testimonial-pagination', clickable: true },
      navigation: { nextEl: '.testimonial-next', prevEl: '.testimonial-prev' },
      breakpoints: { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
  }

  // === FAQ ACCORDION ===
  if (accordionHeaders.length > 0) {
    accordionHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        accordionHeaders.forEach(h => h.parentElement.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }
  
  // === PORTFOLIO PAGE LOGIC ===
  if (showcaseItems.length > 0 && showcaseImage) {
    if (showcaseItems[0].dataset.image) {
        showcaseImage.style.backgroundImage = `url(${showcaseItems[0].dataset.image})`;
        showcaseItems[0].classList.add('active');
        setTimeout(() => { showcaseImage.classList.add('visible'); }, 100);
    }
    showcaseItems.forEach(item => {
      item.addEventListener('mouseover', () => {
        showcaseItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        const newImage = item.dataset.image;
        showcaseImage.classList.remove('visible');
        setTimeout(() => {
            showcaseImage.style.backgroundImage = `url(${newImage})`;
            showcaseImage.classList.add('visible');
        }, 300);
      });
    });
  }

  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filterValue = button.dataset.filter;
        portfolioItems.forEach(item => {
          const itemCategory = item.dataset.category;
          if (filterValue === 'all' || filterValue === itemCategory) {
            item.classList.remove('hide');
          } else {
            item.classList.add('hide');
          }
        });
      });
    });
  }

  // === DESELECT ON OUTSIDE CLICK ===
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.service-card, .testimonial-card')) {
      document.querySelectorAll('.service-card.selected, .testimonial-card.selected').forEach(card => card.classList.remove('selected'));
    }
  });

});

