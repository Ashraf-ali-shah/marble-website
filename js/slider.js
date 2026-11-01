  // Hero image slider (fade, auto-play, arrows, dots)
(function () {
  var root = document.getElementById('hero-slider');
  if (!root) return;
  var slides = root.querySelectorAll('.hs-slide');
  var dotsBox = root.querySelector('.hs-dots');
  var i = 0, timer;

  slides.forEach(function (_, n) {
    var d = document.createElement('button');
    d.className = 'hs-dot';
    d.setAttribute('aria-label', 'صورة ' + (n + 1));
    d.onclick = function () { go(n); restart(); };
    dotsBox.appendChild(d);
  });
  var dots = dotsBox.children;

  function go(n) {
    slides[i].classList.remove('active'); dots[i].classList.remove('active');
    i = (n + slides.length) % slides.length;
    slides[i].classList.add('active'); dots[i].classList.add('active');
  }
  function restart() {
    clearInterval(timer);
    timer = setInterval(function () { go(i + 1); }, 4500);
  }

  root.querySelector('.hs-next').onclick = function () { go(i + 1); restart(); };
  root.querySelector('.hs-prev').onclick = function () { go(i - 1); restart(); };
  go(0); restart();
})();