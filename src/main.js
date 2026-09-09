import './style.css';

const app = document.querySelector('#app');

const icon = (name) => ({ home: '⌂', squad: '♙', forge: '◈', rank: '↗', news: '✦', settings: '⚙', bolt: 'ϟ', close: '×' }[name] || '•');

app.innerHTML = `
  <main class="shell">
    <aside class="rail">
      <a class="brand" href="#" aria-label="Open Smash accueil"><span>OPEN</span><b>SMASH</b><i></i></a>
      <nav>
        <button class="nav-item active" data-panel="hall"><em>${icon('home')}</em><span>Hall</span></button>
        <button class="nav-item" data-panel="agents"><em>${icon('squad')}</em><span>Agents</span></button>
        <button class="nav-item" data-panel="atelier"><em>${icon('forge')}</em><span>Atelier</span></button>
        <button class="nav-item" data-panel="classement"><em>${icon('rank')}</em><span>Classement</span></button>
      </nav>
      <div class="rail-bottom"><button class="nav-item" data-panel="actu"><em>${icon('news')}</em><span>Actualités</span></button><button class="nav-item" data-panel="settings"><em>${icon('settings')}</em><span>Réglages</span></button></div>
    </aside>

    <section class="content">
      <header class="topbar">
        <button class="season-pill" id="seasonButton"><span class="sun">✺</span><span>SAISON 01</span><b>37 jours</b></button>
        <div class="currency"><span class="coin">◒</span><b>2 480</b><span class="divider"></span><span class="crystal">◆</span><b>85</b><button class="plus">+</button></div>
        <button class="profile"><span class="avatar">A</span><span><b>ASTRA_9</b><small>Niv. 24</small></span><i>⌄</i></button>
      </header>

      <div class="page" id="hall">
        <section class="hero">
          <div class="hero-copy">
            <p class="eyebrow"><span></span> ÉVÉNEMENT EN DIRECT</p>
            <h1>La mêlée<br><i>du marché</i></h1>
            <p class="lede">Sécurisez les caisses, contrôlez les allées et faites basculer la ville de votre côté.</p>
            <div class="event-meta"><span>3 <small>VS</small> 3</span><b>•</b><strong>Foire aux reliques</strong><b>•</b><time>02:18:44</time></div>
            <button class="play" id="playButton"><span>${icon('bolt')}</span> LANCER LA PARTIE <kbd>↵</kbd></button>
          </div>
          <div class="hero-art" aria-label="Illustration de l'agent Nova">
            <div class="orb orb-one"></div><div class="orb orb-two"></div><div class="arc"></div>
            <div class="character"><div class="hair"></div><div class="face"><i></i><i></i><b></b></div><div class="coat"></div><div class="arm"></div><div class="blaster"><span></span></div><div class="legs"></div></div>
            <span class="tag tag-a">NOUVEAU</span><span class="tag tag-b">RANG 12</span>
          </div>
        </section>

        <section class="below-hero">
          <div class="section-heading"><div><p class="eyebrow"><span></span> SÉLECTION RAPIDE</p><h2>Choisir un terrain</h2></div><button class="text-button">Voir les modes <b>→</b></button></div>
          <div class="mode-grid">
            <article class="mode-card selected" data-mode="Foire aux reliques"><div class="map map-amber"><i></i><i></i><i></i></div><div class="mode-info"><span class="mode-icon">✣</span><div><b>Foire aux reliques</b><small>Contrôle · 3v3</small></div><em>EN JEU</em></div></article>
            <article class="mode-card" data-mode="Rixe du soir"><div class="map map-night"><i></i><i></i><i></i></div><div class="mode-info"><span class="mode-icon">⌁</span><div><b>Rixe du soir</b><small>Escarmouche · 5v5</small></div><em>18:00</em></div></article>
            <article class="mode-card" data-mode="Dernière rame"><div class="map map-mint"><i></i><i></i><i></i></div><div class="mode-info"><span class="mode-icon">⌬</span><div><b>Dernière rame</b><small>Survie · solo</small></div><em>23:00</em></div></article>
          </div>
        </section>

        <section class="progress-row">
          <article class="pass-card"><div><p class="eyebrow"><span></span> PISTE DE SAISON</p><h3>Le carnet de la<br>ville basse</h3><p>Palier 18 <b>·</b> encore 240 points</p><div class="progress"><span></span></div></div><div class="pass-stamp">18<small>/ 50</small></div></article>
          <article class="quest-card"><p class="eyebrow"><span></span> OBJECTIFS DU JOUR</p><div class="quest"><span>◎</span><div><b>Ouvrir 3 caisses</b><small>2 / 3</small></div><em>+80</em></div><div class="quest"><span>✳</span><div><b>Gagner une partie</b><small>0 / 1</small></div><em>+120</em></div></article>
        </section>
      </div>
    </section>
  </main>
  <div class="toast" id="toast" role="status"></div>
  <dialog id="matchDialog"><button class="dialog-close" aria-label="Fermer">${icon('close')}</button><div class="match-mark">✣</div><p class="eyebrow"><span></span> RECHERCHE D'ESCouade</p><h2>On rassemble<br>les combattants.</h2><p>Terrain sélectionné : <b id="selectedMode">Foire aux reliques</b></p><div class="searching"><i></i><i></i><i></i><i></i><i></i></div><button class="cancel">Annuler</button></dialog>
`;

const toast = document.querySelector('#toast');
let selectedMode = 'Foire aux reliques';
function notify(message) { toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 2600); }

document.querySelectorAll('.mode-card').forEach(card => card.addEventListener('click', () => {
  document.querySelector('.mode-card.selected').classList.remove('selected');
  card.classList.add('selected'); selectedMode = card.dataset.mode;
  notify(`${selectedMode} sélectionné`);
}));
document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => {
  document.querySelector('.nav-item.active').classList.remove('active'); item.classList.add('active');
  notify(`${item.querySelector('span').textContent} arrive dans la prochaine mise à jour.`);
}));
const dialog = document.querySelector('#matchDialog');
document.querySelector('#playButton').addEventListener('click', () => { document.querySelector('#selectedMode').textContent = selectedMode; dialog.showModal(); });
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.cancel').addEventListener('click', () => dialog.close());
document.querySelector('#seasonButton').addEventListener('click', () => notify('Récompense de saison : 240 points pour le prochain palier.'));
document.querySelector('.plus').addEventListener('click', () => notify('La boutique est en préparation.'));
document.addEventListener('keydown', e => { if (e.key === 'Enter' && !dialog.open) document.querySelector('#playButton').click(); });
