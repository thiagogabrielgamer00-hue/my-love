// Alterna fotos e vídeos na mesma seção, sem mudar de página.
(() => {
  const cfg = window.GALERIA_CONFIG;
  const grid = document.getElementById('album-grid');
  const status = document.getElementById('album-status');
  const number = document.getElementById('album-page');
  const prev = document.getElementById('album-prev');
  const next = document.getElementById('album-next');
  const panel = document.getElementById('galeria-painel');
  const tabs = [...document.querySelectorAll('.gallery-tab')];
  const perPage = Math.max(1, Number(cfg.itensPorPagina) || 24);
  let type = 'fotos';
  const pages = {fotos: 1, videos: 1};

  function amount() {
    const value = type === 'fotos' ? cfg.quantidadeFotos : cfg.quantidadeVideos;
    const max = type === 'fotos' ? Math.min(400, cfg.maxFotos) : Math.min(200, cfg.maxVideos);
    return Math.max(0, Math.min(max, Number(value) || 0));
  }

  function render() {
    // Pausa vídeos antes de trocar a página ou álbum.
    grid.querySelectorAll('video').forEach(video => video.pause());
    grid.replaceChildren();
    const quantity = amount();
    const pageCount = Math.max(1, Math.ceil(quantity / perPage));
    pages[type] = Math.min(pages[type], pageCount);
    const page = pages[type];
    const photo = type === 'fotos';
    status.textContent = `${quantity} ${photo ? 'fotos' : 'vídeos'} configurados • capacidade: ${photo ? 400 : 200}`;
    number.textContent = `Página ${page} de ${pageCount}`;
    prev.disabled = page <= 1;
    next.disabled = page >= pageCount;

    if (!quantity) {
      grid.innerHTML = '<p class="album-empty">Ainda não há lembranças cadastradas aqui.</p>';
      return;
    }
    const from = (page - 1) * perPage + 1;
    const to = Math.min(quantity, from + perPage - 1);
    for(let i=from;i<=to;i++) {
      const card = document.createElement('article');
      card.className = 'media-card';
      const path = `${photo ? cfg.pastaFotos : cfg.pastaVideos}/${photo ? 'foto' : 'video'}${i}.${photo ? 'jpg' : 'mp4'}`;
      const media = document.createElement(photo ? 'img' : 'video');
      if(photo) {
        media.loading = 'lazy';
        media.alt = `Nossa foto ${i}`;
        media.src = path;
        media.onerror = () => card.remove();
        media.addEventListener('click', () => {
          const modal = document.getElementById('image-modal');
          const target = document.getElementById('modal-image');
          target.src = path;
          target.alt = media.alt;
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      } else {
        media.controls = true;
        media.preload = 'metadata';
        const source = document.createElement('source');
        source.src = path;
        source.type = 'video/mp4';
        source.addEventListener('error', () => card.remove());
        media.append(source);
      }
      const caption = document.createElement('div');
      caption.className = 'media-caption';
      const label = document.createElement('span');
      label.className = 'media-type';
      label.textContent = photo ? '📸 FOTO' : '🎬 VÍDEO';
      const title = document.createElement('h3');
      title.textContent = `${photo ? 'Momento' : 'Vídeo'} ${i} ❤️`;
      caption.append(label,title);
      card.append(media,caption);
      grid.append(card);
    }
  }

  tabs.forEach(tab => tab.addEventListener('click', () => {
    type = tab.dataset.type;
    tabs.forEach(item => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    panel.setAttribute('aria-labelledby', tab.id);
    render();
  }));
  prev.addEventListener('click', () => {if(pages[type]>1) {pages[type]--;render();}});
  next.addEventListener('click', () => {if(pages[type]<Math.ceil(amount()/perPage)) {pages[type]++;render();}});
  render();
})();
