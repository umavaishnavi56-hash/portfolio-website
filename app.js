// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');
let lightMode = false;

themeToggle?.addEventListener('click', () => {
  lightMode = !lightMode;
  document.documentElement.setAttribute('data-theme', lightMode ? 'light' : 'dark');
  
  if (lightMode) {
    themeIcon.classList.replace('bi-moon-stars-fill', 'bi-sun-fill');
    document.getElementById('nav-icon')?.classList.replace('text-white', 'text-dark');
  } else {
    themeIcon.classList.replace('bi-sun-fill', 'bi-moon-stars-fill');
    document.getElementById('nav-icon')?.classList.replace('text-dark', 'text-white');
  }
});

// Sticky Navbar & Active Section Highlight
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Sticky nav
  if (window.scrollY > 50) {
    navbar.classList.add('sticky-nav');
  } else {
    navbar.classList.remove('sticky-nav');
  }

  // Active link highlight
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});

// Typing Animation
const words = ["Frontend Developer", "UI/UX Enthusiast", "Web Designer", "Tech Explorer"];
let i = 0;
let timer;

function typingEffect() {
  let word = words[i].split("");
  var loopTyping = function() {
    if (word.length > 0) {
      document.getElementById('typing-text').innerHTML += word.shift();
    } else {
      setTimeout(deletingEffect, 2000);
      return false;
    }
    timer = setTimeout(loopTyping, 100);
  };
  loopTyping();
}

function deletingEffect() {
  let word = words[i].split("");
  var loopDeleting = function() {
    if (word.length > 0) {
      word.pop();
      document.getElementById('typing-text').innerHTML = word.join("");
    } else {
      if (words.length > (i + 1)) {
        i++;
      } else {
        i = 0;
      }
      typingEffect();
      return false;
    }
    timer = setTimeout(loopDeleting, 50);
  };
  loopDeleting();
}

// Start typing effect on load
const typingText = document.getElementById('typing-text');
if(typingText) {
  typingText.innerHTML = "";
  typingEffect();
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      
      // Animate progress bars if inside skills section
      if (entry.target.querySelector('.progress-bar')) {
        const progressBars = entry.target.querySelectorAll('.progress-bar');
        progressBars.forEach(bar => {
          const width = bar.getAttribute('data-width');
          bar.style.width = width;
        });
      }
      
      observer.unobserve(entry.target);
    }
  });
};

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Contact form handler (demo)
function handleSubmit(e){
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  if(msg){
    msg.textContent = 'Thank you! Your message has been sent successfully.';
    msg.classList.remove('text-success', 'text-danger');
    msg.classList.add('text-success');
    
    // Simulate API delay
    const btn = e.target.querySelector('button[type="submit"]') || e.target.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;
      e.target.reset();
      
      setTimeout(() => {
        msg.textContent = '';
      }, 3000);
    }, 1500);
  }
}
