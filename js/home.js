/* ============================================
   إتقان الرخام — Home Page JavaScript
   Handles: Icons, Mobile Menu, FAQ Accordion,
   Testimonial Slider, Sticky Header Shadow
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. INITIALIZE LUCIDE ICONS ---------- */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* ---------- 2. MOBILE MENU TOGGLE ---------- */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');

      mobileMenu.classList.toggle('hidden');

      // Swap menu/X icon
      menuBtn.innerHTML = isHidden
        ? '<i data-lucide="x" class="w-5 h-5 text-charcoal"></i>'
        : '<i data-lucide="menu" class="w-5 h-5 text-charcoal"></i>';

      lucide.createIcons();
      menuBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.innerHTML = '<i data-lucide="menu" class="w-5 h-5 text-charcoal"></i>';
        lucide.createIcons();
      });
    });
  }

  /* ---------- 3. STICKY HEADER SHADOW ON SCROLL ---------- */
  const stickyNav = document.querySelector('header .sticky');
  if (stickyNav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        stickyNav.classList.add('shadow-md');
      } else {
        stickyNav.classList.remove('shadow-md');
      }
    });
  }

  /* ---------- 4. FAQ ACCORDION ---------- */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const trigger = item.querySelector('.faq-trigger');
  const content = item.querySelector('.faq-content');

  trigger.addEventListener('click', () => {
    const icon = item.querySelector('.faq-icon'); // ✅ fresh query every click
    const isOpen = !content.classList.contains('hidden');

    // Close all other FAQs (accordion behavior — one open at a time)
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        const otherContent = otherItem.querySelector('.faq-content');
        const otherIcon = otherItem.querySelector('.faq-icon'); // already fresh — this was fine
        otherContent.classList.add('hidden');
        otherIcon.setAttribute('data-lucide', 'plus');
      }
    });

    // Toggle current FAQ
    content.classList.toggle('hidden');
    icon.setAttribute('data-lucide', isOpen ? 'plus' : 'minus');

    lucide.createIcons();
  });
});
  /* ---------- 5. TESTIMONIAL SLIDER ---------- */
  const testimonials = [
    {
      quote: "كنت مترددًا في البداية، لكن الفريق شرح لي كل خطوة قبل تنفيذها. النتيجة غيّرت شكل الصالة بالكامل.",
      name: "عبدالله المطيري",
      location: "حي النرجس، الرياض"
    },
    {
      quote: "جودة التلميع فاقت توقعاتي، والفريق محترم في المواعيد ونظيف في طريقة العمل. أنصح فيهم بدون تردد.",
      name: "سارة القحطاني",
      location: "حي الملقا، الرياض"
    },
    {
      quote: "الرخام القديم في فيلتنا رجع كأنه جديد. سعر عادل وخدمة واضحة من أول معاينة لآخر يوم تسليم.",
      name: "فهد العتيبي",
      location: "حي الياسمين، الرياض"
    }
  ];

  let currentTestimonial = 0;
  const sliderContainer = document.getElementById('testimonial-slider');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  let autoSlideInterval;

  function renderTestimonial(index) {
    const t = testimonials[index];
    sliderContainer.innerHTML = `
      <div class="testimonial-slide animate-fade">
        <p class="text-white text-xl md:text-2xl leading-relaxed mb-6">"${t.quote}"</p>
        <p class="text-gold font-bold">${t.name}</p>
        <p class="text-marble-beige/60 text-sm">${t.location}</p>
      </div>
    `;
  }

  function goToTestimonial(index) {
    currentTestimonial = (index + testimonials.length) % testimonials.length;
    renderTestimonial(currentTestimonial);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      goToTestimonial(currentTestimonial + 1);
    }, 6000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  if (sliderContainer && prevBtn && nextBtn) {
    renderTestimonial(currentTestimonial);
    startAutoSlide();

    nextBtn.addEventListener('click', () => {
      goToTestimonial(currentTestimonial + 1);
      resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
      goToTestimonial(currentTestimonial - 1);
      resetAutoSlide();
    });

    // Pause autoplay when user hovers over testimonial section
    const testimonialSection = sliderContainer.closest('section');
    if (testimonialSection) {
      testimonialSection.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
      testimonialSection.addEventListener('mouseleave', startAutoSlide);
    }
  }

  /* ---------- 6. VIDEO: PAUSE OTHERS WHEN ONE PLAYS ---------- */
  const allVideos = document.querySelectorAll('video');
  allVideos.forEach(video => {
    video.addEventListener('play', () => {
      allVideos.forEach(otherVideo => {
        if (otherVideo !== video) {
          otherVideo.pause();
        }
      });
    });
  });

});
  /* ---------- FAB: EXPANDABLE FLOATING ACTION BUTTON ---------- */
    /* ---------- FAB: EXPANDABLE FLOATING ACTION BUTTON ---------- */
  const fabToggle = document.getElementById('fab-toggle');
  const fabOptions = document.querySelectorAll('.fab-option');
  const fabContainer = document.getElementById('fab-container');
  let fabOpen = false;

  function closeFab() {
    fabOpen = false;
    fabOptions.forEach(option => {
      option.classList.add('opacity-0', 'scale-0', 'translate-y-4', 'pointer-events-none');
      option.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
    });
    const currentIcon = document.getElementById('fab-icon');
    currentIcon.setAttribute('data-lucide', 'message-square-text');
    currentIcon.classList.add('pointer-events-none');
    fabToggle.setAttribute('aria-expanded', 'false');
    lucide.createIcons();
  }

  function openFab() {
    fabOpen = true;
    fabOptions.forEach(option => {
      option.classList.remove('opacity-0', 'scale-0', 'translate-y-4', 'pointer-events-none');
      option.classList.add('opacity-100', 'scale-100', 'translate-y-0');
    });
    const currentIcon = document.getElementById('fab-icon');
    currentIcon.setAttribute('data-lucide', 'x');
    currentIcon.classList.add('pointer-events-none');
    fabToggle.setAttribute('aria-expanded', 'true');
    lucide.createIcons();
  }

  if (fabToggle) {
    fabToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      fabOpen ? closeFab() : openFab();
    });

    document.addEventListener('click', (e) => {
      if (fabOpen && fabContainer && !fabContainer.contains(e.target)) {
        closeFab();
      }
    });
  }
