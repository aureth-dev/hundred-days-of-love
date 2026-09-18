const messageText = `Palak... ❤️

100 days.

Somehow, that little number feels so much bigger when I think about everything we've shared in it.

From our random conversations to the stupid little things that somehow became my favourite memories, you've become such a beautiful part of my everyday life.

These 100 days weren't just 100 days on a calendar.

They were 100 days of knowing you a little more, laughing with you, missing you, annoying you, making you smile, and falling for you a little more every day. 🥹❤️

And honestly, my favourite thing about us isn't that everything has always been perfect.

It's that we're still here.
Still choosing each other.
Still making memories.
Still learning how to love each other a little better.

I know sometimes I get lost in my own little world, but please never mistake that for me loving you any less.

You mean much more to me than a few perfect surprises or one particular day can ever explain.

I don't want just 100 days with you, Palak.

I want all the ordinary days too.

The boring ones.
The chaotic ones.
The late-night ones.
The days when we have nothing special to say.

Because if they're with you, they're still special to me. ❤️

Thank you for these 100 days, my girl.

Here's to the memories we've already made...

and all the ones we haven't even imagined yet. 🫶🏻

Happy 100 Days, Palak.

I love you. ❤️`;

const risingHeartsContainer = document.getElementById('rising-hearts');
let hasTyped = false;

function createHearts() {
  const container = document.getElementById('hearts');
  const fragment = document.createDocumentFragment();
  
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    const size = Math.random() * 8 + 8;
    const duration = Math.random() * 6 + 6;
    const delay = Math.random() * 4;
    
    heart.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation: float ${duration}s ease-in-out ${delay}s infinite;
    `;
    fragment.appendChild(heart);
  }
  container.appendChild(fragment);
}

function typeText(element, text, speed) {
  let i = 0;
  const scrollContainer = document.getElementById('scroll-container');
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      if (scrollContainer && i % 4 === 0) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
      setTimeout(type, speed);
    }
  }
  type();
}

function reveal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('scale1');
}

function triggerHeartConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f6d365', '#fda085', '#ffffff', '#caa24d']
    });
  }
}

function spawnHeart() {
  if (document.hidden) return;
  const heart = document.createElement('div');
  heart.className = 'r-heart';
  heart.style.left = `${Math.random() * 95}vw`;
  risingHeartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 5000);
}

window.addEventListener('DOMContentLoaded', () => {
  createHearts();
  setInterval(spawnHeart, 600);

  setTimeout(() => {
    const msg = document.getElementById('loadingMsg');
    const intro = document.getElementById('intro');
    if (msg) msg.style.display = 'none';
    if (intro) intro.style.display = 'flex';
  }, 1000);

  const swiper = new Swiper('.mySwiper', {
    allowTouchMove: true,
    simulateTouch: true,
    pagination: { 
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      slideChange: function () {
        if (this.activeIndex === 1 && !hasTyped) {
          hasTyped = true;
          reveal('stiker2');
          setTimeout(() => {
            typeText(document.getElementById('typing-text'), messageText, 25);
          }, 300);
        }
        if (this.activeIndex === 2) {
          triggerHeartConfetti();
        }
      }
    }
  });

  document.getElementById('loveBtn').addEventListener('click', () => {
    const bgMusic = document.getElementById('bgMusic');
    if (bgMusic) {
      bgMusic.volume = 0.45;
      bgMusic.play().catch(() => {});
    }

    document.getElementById('overlay').classList.add('hidden');
    setTimeout(() => reveal('stiker1'), 300);
    setTimeout(() => reveal('teks1'), 600);
  });

  document.getElementById('claimBtn').addEventListener('click', function() {
    this.style.display = 'none';
    document.getElementById('claimedText').style.display = 'block';
    triggerHeartConfetti();
  });
});