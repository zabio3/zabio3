// Terminal Portfolio - zabio3
// Typing Animation Script

document.addEventListener('DOMContentLoaded', () => {
  // Get all elements with typing animation
  const typingElements = document.querySelectorAll('[data-typing]');

  typingElements.forEach((element, index) => {
    const text = element.getAttribute('data-typing');
    const delay = parseInt(element.getAttribute('data-delay')) || index * 1000;
    const speed = parseInt(element.getAttribute('data-speed')) || 50;

    element.textContent = '';
    element.style.visibility = 'visible';

    setTimeout(() => {
      typeText(element, text, speed);
    }, delay);
  });

  // Sequential typing for command outputs
  const commandOutputs = document.querySelectorAll('.command-output');
  let totalDelay = 0;

  commandOutputs.forEach((output) => {
    const commandDelay = parseInt(output.getAttribute('data-command-delay')) || 500;
    totalDelay += commandDelay;

    output.style.opacity = '0';

    setTimeout(() => {
      output.style.opacity = '1';
      output.style.transition = 'opacity 0.3s ease';
    }, totalDelay);
  });
});

function typeText(element, text, speed) {
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  element.appendChild(cursor);

  function type() {
    if (i < text.length) {
      element.insertBefore(document.createTextNode(text.charAt(i)), cursor);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Matrix rain effect (optional background)
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF';
  const charArray = chars.split('');

  const fontSize = 14;
  const columns = canvas.width / fontSize;

  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function draw() {
    ctx.fillStyle = 'rgba(13, 17, 23, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px Fira Code';

    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 50);

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Initialize matrix rain if canvas exists
initMatrixRain();
