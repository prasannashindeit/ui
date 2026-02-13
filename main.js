/* ═══════════════════════════════════════════════════
   TERMINAL PORTFOLIO — JavaScript
   Boot sequence, typewriter, glitch, scroll animations
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initProjectFilters();
    initContactForm();
    initBackToTop();
    initCounters();
    initMatrixRain();
    initCRTFlicker();
});

/* ── Navigation ── */
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = navLinks.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.textContent = navLinks.classList.contains('open') ? '[✕ CLOSE]' : '[≡ MENU]';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.textContent = '[≡ MENU]';
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    links.forEach(l => l.classList.remove('active'));
                    const active = navLinks.querySelector(`a[href="#${id}"]`);
                    if (active) active.classList.add('active');
                }
            });
        },
        { rootMargin: '-30% 0px -70% 0px' }
    );
    sections.forEach(s => observer.observe(s));
}

/* ── Typing Effect ── */
function initTypingEffect() {
    const el = document.getElementById('typingText');
    if (!el) return;

    const phrases = [
        'penetration tester',
        'cybersecurity analyst',
        'vulnerability hunter',
        'red team operator',
        'security researcher',
        'ethical hacker'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;
    let pauseTime = 0;

    function type() {
        const current = phrases[phraseIdx];

        if (pauseTime > 0) {
            pauseTime--;
            setTimeout(type, 60);
            return;
        }

        if (!deleting) {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;

            if (charIdx === current.length) {
                pauseTime = 30; // pause at end
                deleting = true;
            }
            setTimeout(type, 60 + Math.random() * 40);
        } else {
            el.textContent = current.substring(0, charIdx - 1);
            charIdx--;

            if (charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
            }
            setTimeout(type, 30);
        }
    }

    // Start after boot sequence finishes
    setTimeout(type, 2000);
}

/* ── Scroll Animations ── */
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    elements.forEach(el => observer.observe(el));
}

/* ── Project Filters ── */
function initProjectFilters() {
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.project-card');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

/* ── Contact Form ── */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const message = form.querySelector('#message').value.trim();

        if (!name || !email || !message) return;

        // Replace form with success message
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        successDiv.innerHTML = `
      [<span style="color: var(--primary)">OK</span>] message transmitted successfully.<br/>
      > from: ${name}<br/>
      > email: ${email}<br/>
      > status: QUEUED_FOR_REVIEW<br/>
      <br/>
      $ echo "thank you! i'll respond soon."
    `;
        form.replaceWith(successDiv);
    });
}

/* ── Back to Top ── */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ── Stat Counters ── */
function initCounters() {
    const counters = document.querySelectorAll('.stat-value[data-count]');

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.dataset.count, 10);
                    animateCounter(el, target);
                    observer.unobserve(el);
                }
            });
        },
        { threshold: 0.3 }
    );

    counters.forEach(c => observer.observe(c));
}

function animateCounter(el, target) {
    const duration = 1500; // ms
    const start = performance.now();

    function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = current + '+';

        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            el.textContent = target + '+';
        }
    }

    requestAnimationFrame(tick);
}

/* ── Matrix Digital Rain ── */
function initMatrixRain() {
    const canvas = document.getElementById('matrixRain');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Characters: katakana + latin + digits + symbols
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'
        + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-={}[]|;:<>,.?/~`'
        + '01001101010110100101';
    const charArr = chars.split('');

    const fontSize = 14;
    let columns;
    let drops;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(0).map(() => Math.random() * -100);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
        // Semi-transparent fade for trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.06)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < columns; i++) {
            // Random character
            const char = charArr[Math.floor(Math.random() * charArr.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Leading character is brighter
            if (Math.random() > 0.98) {
                ctx.fillStyle = '#ffffff';  // bright white flash
            } else if (Math.random() > 0.8) {
                ctx.fillStyle = '#33ff00';  // bright green
            } else {
                ctx.fillStyle = 'rgba(51, 255, 0, 0.4)';  // dim green
            }

            ctx.fillText(char, x, y);

            // Reset drop when it falls off screen
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i] += 0.5 + Math.random() * 0.5;
        }

        requestAnimationFrame(draw);
    }

    draw();
}

/* ── CRT Flicker Effect ── */
function initCRTFlicker() {
    const overlay = document.querySelector('.crt-overlay');
    if (!overlay) return;

    // Random subtle brightness flicker
    function flicker() {
        const opacity = 0.85 + Math.random() * 0.15;
        overlay.style.opacity = opacity;

        // Occasional stronger flicker
        const nextDelay = Math.random() > 0.95
            ? 50 + Math.random() * 100   // quick flash
            : 100 + Math.random() * 2000; // normal interval

        setTimeout(flicker, nextDelay);
    }

    flicker();
}
