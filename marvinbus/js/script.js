/* ==========================================================================
   MARVINBUS INTERNACIONAL TSP — script.js
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- footer year ---------- */
  document.querySelectorAll('.js-year').forEach(el => el.textContent = new Date().getFullYear());

  /* ---------- header scroll shadow ---------- */
  const header = document.querySelector('.site-header');
  if(header){
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  /* ---------- mobile nav ---------- */
  const burger = document.querySelector('.burger');
  const mainNav = document.querySelector('.main-nav');
  if(burger && mainNav){
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      mainNav.classList.toggle('mobile-open');
      document.body.style.overflow = mainNav.classList.contains('mobile-open') ? 'hidden' : '';
    });
    mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open');
      mainNav.classList.remove('mobile-open');
      document.body.style.overflow = '';
    }));
  }

  /* ---------- scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  if('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach((el,i) => {
      el.style.transitionDelay = (i % 6) * 60 + 'ms';
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- hero slider ---------- */
  const slides = document.querySelectorAll('.hero-slide');
  const dotsWrap = document.querySelector('.hero-dots');
  const heroIndexCur = document.querySelector('.hero-index .cur');
  if(slides.length){
    let current = 0, timer;
    const dots = [];
    if(dotsWrap){
      slides.forEach((_, i) => {
        const b = document.createElement('button');
        if(i === 0) b.classList.add('active');
        b.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }
    function goTo(i){
      slides[current].classList.remove('active');
      dots[current] && dots[current].classList.remove('active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('active');
      if(dots[current]){
        // reinicia la animación de la barra de progreso del punto activo
        dots[current].classList.remove('active');
        void dots[current].offsetWidth;
        dots[current].classList.add('active');
      }
      if(heroIndexCur) heroIndexCur.textContent = String(current + 1).padStart(2, '0');
      resetTimer();
    }
    function resetTimer(){
      clearInterval(timer);
      timer = setInterval(() => goTo(current + 1), 6000);
    }
    document.querySelector('.hero-arrow.next')?.addEventListener('click', () => goTo(current + 1));
    document.querySelector('.hero-arrow.prev')?.addEventListener('click', () => goTo(current - 1));
    resetTimer();
  }

  /* ---------- swap origen/destino ---------- */
  const swapBtn = document.querySelector('.js-swap');
  if(swapBtn){
    swapBtn.addEventListener('click', () => {
      const origen = document.getElementById('origen');
      const destino = document.getElementById('destino');
      if(origen && destino){
        const tmp = origen.value;
        origen.value = destino.value;
        destino.value = tmp;
        swapBtn.style.transform = 'rotate(180deg)';
        setTimeout(() => swapBtn.style.transform = '', 350);
      }
    });
  }

  /* ---------- toast ---------- */
  function showToast(msg){
    let toast = document.querySelector('.toast');
    if(!toast){
      toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = '<span class="dot"></span><span class="msg"></span>';
      document.body.appendChild(toast);
    }
    toast.querySelector('.msg').textContent = msg;
    toast.classList.add('show');
    clearTimeout(toast._t);
    toast._t = setTimeout(() => toast.classList.remove('show'), 3200);
  }
  window.mbToast = showToast;

  /* ---------- número de WhatsApp del negocio ---------- */
  const WHATSAPP_NUMBER = '51983881948';

function openWhatsApp(message){
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

  console.log('MENSAJE ORIGINAL:', message);
  console.log('MENSAJE CODIFICADO:', encodedMessage);
  console.log('URL COMPLETA:', url);

  window.open(url, '_blank', 'noopener');
}

  /* ---------- buscador de pasajes -> abre WhatsApp con el mensaje listo ---------- */
  const searchForm = document.querySelector('.js-search-form');
  if(searchForm){
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const origen = document.getElementById('origen').value;
      const destino = document.getElementById('destino').value;
      const fecha = document.getElementById('fecha').value;
      const pasajeros = document.getElementById('pasajeros').value;

      if(origen === destino){
        showToast('El origen y el destino no pueden ser iguales.');
        return;
      }
      if(!fecha){
        showToast('Selecciona una fecha de viaje.');
        document.getElementById('fecha').focus();
        return;
      }

      const fechaTexto = new Date(fecha + 'T00:00:00').toLocaleDateString('es-PE', {day:'numeric', month:'long', year:'numeric'});
      const mensaje = `Hola MarvinBus \u{1F44B}, quisiera consultar disponibilidad de pasajes:\n\n` +
        `\u{1F4CD} Origen: ${origen}\n` +
        `\u{1F4CD} Destino: ${destino}\n` +
        `\u{1F4C5} Fecha de viaje: ${fechaTexto}\n` +
        `\u{1F9D1} Pasajeros: ${pasajeros}\n\n` +
        `Quedo atento(a), ¡gracias!`;

        console.log(mensaje);
        console.log([...mensaje].map(c => c.codePointAt(0).toString(16)));

      showToast('Abriendo WhatsApp con tu consulta...');
      openWhatsApp(mensaje);
    });
  }

  /* ---------- horarios tabs ---------- */
  const tabs = document.querySelectorAll('.route-tab');
  if(tabs.length){
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.route-panel').forEach(p => p.classList.remove('active'));
        document.getElementById(tab.dataset.target)?.classList.add('active');
      });
    });
  }

  /* ---------- formularios que arman un mensaje y abren WhatsApp ---------- */
  document.querySelectorAll('.js-whatsapp-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(input => {
        const field = input.closest('.field');
        if(!field) return;
        const isValid = input.value.trim() !== '';
        field.classList.toggle('err', !isValid);
        if(!isValid) valid = false;
      });

      if(!valid){
        showToast('Completa los campos obligatorios.');
        return;
      }

      const intro = form.dataset.waIntro || 'Hola MarvinBus 👋, te escribo desde la página web:';
      let mensaje = intro + '\n\n';
      form.querySelectorAll('[data-wa-label]').forEach(input => {
        const value = input.value.trim();
        if(value) mensaje += `${input.dataset.waLabel}: ${value}\n`;
      });
      mensaje += '\n¡Gracias!';

      const successBox = form.querySelector('.form-success');
      if(successBox){
        successBox.classList.add('show');
        setTimeout(() => successBox.classList.remove('show'), 5000);
      }
      showToast('Abriendo WhatsApp con tu mensaje...');
      openWhatsApp(mensaje);
      form.reset();
    });
    form.querySelectorAll('[required]').forEach(input => {
      input.addEventListener('input', () => input.closest('.field')?.classList.remove('err'));
    });
  });

  /* ---------- active nav link by current page ---------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === path) a.classList.add('active');
  });

  /* ---------- set min date for date input to today ---------- */
  const fechaInput = document.getElementById('fecha');
  if(fechaInput){
    const today = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('min', today);
  }
});
