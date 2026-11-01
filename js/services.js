/* ============================================
   إتقان الرخام — Services Page JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- INITIALIZE LUCIDE ICONS ---------- */
  if (window.lucide) {
    lucide.createIcons();
  }

  /* ---------- MOBILE MENU TOGGLE ---------- */
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      menuBtn.innerHTML = isHidden
        ? '<i data-lucide="x" class="w-5 h-5 text-charcoal"></i>'
        : '<i data-lucide="menu" class="w-5 h-5 text-charcoal"></i>';
      lucide.createIcons();
      menuBtn.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.innerHTML = '<i data-lucide="menu" class="w-5 h-5 text-charcoal"></i>';
        lucide.createIcons();
      });
    });
  }

  /* ---------- STICKY HEADER SHADOW ---------- */
  const stickyNav = document.querySelector('header .sticky');
  if (stickyNav) {
    window.addEventListener('scroll', () => {
      stickyNav.classList.toggle('shadow-md', window.scrollY > 10);
    });
  }

  /* ---------- FAQ ACCORDION ---------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    trigger.addEventListener('click', () => {
      const icon = item.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');

      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          const otherContent = otherItem.querySelector('.faq-content');
          const otherIcon = otherItem.querySelector('.faq-icon');
          otherContent.classList.add('hidden');
          otherIcon.setAttribute('data-lucide', 'plus');
        }
      });

      content.classList.toggle('hidden');
      icon.setAttribute('data-lucide', isOpen ? 'plus' : 'minus');
      lucide.createIcons();
    });
  });

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

});