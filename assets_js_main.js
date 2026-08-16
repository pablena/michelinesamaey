// main.js — navigation, year, lightbox, contact validation
document.addEventListener('DOMContentLoaded', function(){
  // year
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // mobile nav
  const navToggle = document.getElementById('nav-toggle');
  const siteNav = document.getElementById('site-nav');
  if(navToggle && siteNav){
    navToggle.addEventListener('click', ()=>{
      const expanded = siteNav.getAttribute('data-open') === 'true';
      siteNav.setAttribute('data-open', !expanded);
      siteNav.style.display = expanded ? '' : 'flex';
      siteNav.style.flexDirection = 'column';
      siteNav.style.gap = '0.5rem';
    });
  }

  // Gallery lightbox
  const items = document.querySelectorAll('.gallery-item');
  let currentIndex = -1;
  const lightbox = createLightbox();

  items.forEach((el, i)=>{
    el.addEventListener('click', ()=>{
      const src = el.querySelector('img').dataset.full || el.querySelector('img').src;
      openLightbox(src, i);
    });
  });

  function createLightbox(){
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = `
      <div class="lightbox-content"><img src="" alt=""></div>
      <button class="lb-close" aria-label="Cerrar">✕</button>
      <button class="lb-nav lb-prev" aria-label="Anterior">◀</button>
      <button class="lb-nav lb-next" aria-label="Siguiente">▶</button>
    `;
    document.body.appendChild(lb);

    const img = lb.querySelector('img');
    const close = lb.querySelector('.lb-close');
    const prev = lb.querySelector('.lb-prev');
    const next = lb.querySelector('.lb-next');

    close.addEventListener('click', closeLightbox);
    lb.addEventListener('click', (e)=>{ if(e.target===lb) closeLightbox(); });
    prev.addEventListener('click', showPrev);
    next.addEventListener('click', showNext);
    document.addEventListener('keydown', handleKeys);

    function handleKeys(e){
      if(!lb.classList.contains('open')) return;
      if(e.key === 'Escape') closeLightbox();
      if(e.key === 'ArrowLeft') showPrev();
      if(e.key === 'ArrowRight') showNext();
    }

    return {
      el: lb,
      img,
      open(src){ img.src = src; lb.classList.add('open'); },
      close(){ lb.classList.remove('open'); img.src=''; }
    };

    function showPrev(){ if(currentIndex > 0) openLightbox(getSrcByIndex(--currentIndex), currentIndex); }
    function showNext(){ if(currentIndex < items.length-1) openLightbox(getSrcByIndex(++currentIndex), currentIndex); }
    function getSrcByIndex(i){
      const it = items[i];
      return it.querySelector('img').dataset.full || it.querySelector('img').src;
    }
  }

  function openLightbox(src, i){
    currentIndex = i;
    lightbox.open(src);
  }
  function closeLightbox(){ lightbox.close(); }

  // Contact form front-end validation + mailto fallback
  const form = document.querySelector('form[data-contact]');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.querySelector('[name=name]').value.trim();
      const email = form.querySelector('[name=email]').value.trim();
      const message = form.querySelector('[name=message]').value.trim();

      if(!name || !email || !message){
        showMessage('Por favor, completa los campos obligatorios.', false);
        return;
      }
      // basic email check
      if(!/^\S+@\S+\.\S+$/.test(email)){
        showMessage('Introduce un correo válido.', false);
        return;
      }

      // If you have a backend endpoint, replace this with a fetch POST
      // Fallback: open mail client with prefilled body
      const subject = encodeURIComponent('Contacto desde la web — ' + name);
      const body = encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\n${message}`);
      window.location.href = `mailto:artista@example.com?subject=${subject}&body=${body}`;

      showMessage('Se ha abierto tu cliente de correo. También puedes escribir directamente a artista@example.com', true);
      form.reset();
    });
  }

  function showMessage(text, ok){
    let el = document.querySelector('.form .success') || document.createElement('div');
    el.className = 'success';
    el.textContent = text;
    document.querySelector('.form').appendChild(el);
    if(!ok) el.style.background = '#ffecec';
    setTimeout(()=>{ if(el) el.remove(); }, 7000);
  }
});