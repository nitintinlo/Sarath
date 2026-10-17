/**
 * SP Sharath Author Website - Main Logic & Interactions
 * Features: 3D Tilt, Interactive Folklore Map, Reader Modal, Custom Cursor, Ambience Controller
 */

// --- Lore & Story World Map Data (The Mundar Universe) ---
const STORY_LOCATIONS = {
  'varathupokku-trail': {
    title: 'The Varathupokku Trail (വരത്തുപോക്ക് പാത)',
    malayalam: 'വരത്തുപോക്ക് • The Migration Path of the Wandering Dead',
    coords: '9°32\'18" N, 76°22\'40" E • Outer Dykes of Mundar',
    lore: `In the folklore of Mundar, 'Varathupokku' denotes the nocturnal passage through which wandering souls, displaced spirits, and ancient ancestral phantoms drift between the marshes and water channels. Local villagers never step onto this earthen bund after 10 PM without carrying a piece of black iron and a lighted coconut-leaf torch. Those who obstructed the Varathupokku were found days later sitting motionless in the paddy reeds, staring into the dark water without speech.`,
    excerpt: `"മുണ്ടാറിലെ മഞ്ഞിൽ പാതിരാവിലും കറുത്ത ചെളിയിലൂടെ ഒരു നിഴൽ നിരങ്ങി നീങ്ങുന്നുണ്ടായിരുന്നു. അതൊരു കാറ്റല്ലായിരുന്നു; വെള്ളക്കെട്ടുകൾക്കുമുകളിലൂടെ ഒഴുകിനടക്കുന്ന ആത്മാക്കളുടെ വരത്തുപോക്കായിരുന്നു അത്..."`,
    bookRef: 'From: വരത്തുപോക്ക് (Varathupokku) • Manorama Books'
  },
  'mundar-hamlet': {
    title: 'Mundar Hamlet (മുണ്ടാർ ഗ്രാമം)',
    malayalam: 'മുണ്ടാർ • The Rain-Soaked Epicenter of Folk Horror',
    coords: '9°31\'05" N, 76°24\'12" E • Central Backwater Polder',
    lore: `An isolated village surrounded on four sides by dark backwater tributaries and shifting mud banks. In Mundar, time flows backward during the monsoon. It is the setting where Narayanan Vappan's ancestral house stands, and where the boundary between sleep, memory, and demonic manifestation dissolved during the events of Urakkappishachu and Varathupokku.`,
    excerpt: `"മുണ്ടാറിൽ മഴ പെയ്താൽ പിന്നെ ഒച്ചകൾക്കൊന്നും കൃത്യമായ ദിശയുണ്ടാകില്ല. തോടിനക്കരെ നിന്ന് വിളിക്കുന്നത് മനുഷ്യനാണോ അതോ ഉറക്കത്തിൽ നിന്ന് ഉണർന്ന പിശാചാണോ എന്ന് ആർക്കും തിരിച്ചറിയാൻ കഴിയില്ലായിരുന്നു."`,
    bookRef: 'From: ഉറക്കപ്പിശാച് (Urakkappishachu) • Chapter II'
  },
  'vappan-illam': {
    title: 'Narayanan Vappan\'s Ancestral House (വാപ്പന്റെ വീട്)',
    malayalam: 'നാരായണൻ വാപ്പന്റെ തറവാട് • The House of Whispers',
    coords: '9°30\'45" N, 76°23\'55" E • Eastern Bend of Mundar',
    lore: `The dimly lit, creaking wooden house where the bedridden patriarch Narayanan Vappan spent his final years narrating unspeakable village folklore to his daughter-in-law Rathi. The house's slatted teak windows face the dark canal, from which strange damp footprints appeared every morning without any visitor having arrived.`,
    excerpt: `"ചെലതരം കേൾവികളും കാഴ്ചകളും എല്ലാർക്കുവൊന്നും കാണാൻ പറ്റത്തില്ല. മോളേ, പുസ്തകത്തേലൊക്കെ എഴുതിവെച്ചിരിക്കുന്നതല്ല ലോകം. നമ്മൾ ഉറങ്ങുമ്പോഴും കണ്ണുചിമ്മാതെ കാത്തിരിക്കുന്ന ചെലതുണ്ട്..."`,
    bookRef: 'From: ഉറക്കപ്പിശാച് (Urakkappishachu) • Prologue'
  },
  'sarpa-kavu': {
    title: 'Sarpa Kavu of Mundar (സർപ്പക്കാവ്)',
    malayalam: 'സർപ്പക്കാവ് • The Untouched Naga Sanctuary',
    coords: '9°29\'12" N, 76°20\'45" E • Sacred Bamboo Thicket',
    lore: `Tucked within impenetrable clumps of wild bamboo and ancient banyan roots lies the Sarpa Kavu of Mundar. For twelve generations, no dry leaf has been swept away and no iron blade permitted past the serpent stones. In both novels, the Sarpa Kavu acts as the chthonic anchor holding back the subterranean terrors beneath the village silt.`,
    excerpt: `"The water had already risen to the hooded serpent's stone mouth. Under his trembling palm, the granite pulsed with the rhythmic warmth of a living throat."`,
    bookRef: 'From: The Backwater Canon • SP Sharath'
  },
  'vembanad-depths': {
    title: 'Vembanad Depths (വേമ്പനാട്ട് കായൽ പരപ്പ്)',
    malayalam: 'വേമ്പനാട്ടു കായൽ • The Midnight Lake of Spirits',
    coords: '9°35\'40" N, 76°23\'10" E • Central Lake Basin',
    lore: `The vast expanse of Vembanad Lake where the four rivers of Kuttanad merge into black infinity. Boatmen claim that on foggy nights between 2 AM and dawn, traditional canoe paddlers can hear the submerged chime of temple bells swallowed during the Great Flood of 1924.`,
    excerpt: `"The lake has lungs, sir. Once every half-century, it inhales, and whatever is drifting on its surface belongs to the silt below."`,
    bookRef: 'From: The Midnight Kayal • SP Sharath'
  }
};

// --- Excerpt Data for Book Reader Modal ---
const BOOK_EXCERPTS = {
  'varathupokku': {
    title: 'വരത്തുപോക്ക് | Varathupokku',
    subtitle: 'The Wandering Path • Chapter I: The Footprints in Mud',
    author: 'S.P. Sarath (എസ്.പി. ശരത്ത്)',
    text: `
      <div style="font-family: var(--font-malayalam); font-size: 1.25rem; line-height: 1.8; color: #a7dfc6; margin-bottom: 24px; padding: 16px 20px; background: rgba(13, 242, 148, 0.05); border-left: 3px solid var(--emerald-primary); border-radius: 0 10px 10px 0;">
        "മലയാളത്തിലെ മികച്ച ബെസ്‌റ്റ്സെല്ലർ ഉറക്കപ്പിശാചിനുശേഷം എസ് പി ശരത്തിൻ്റെ മറ്റൊരു ക്ലാസിക് നോവൽ. മുണ്ടാറിന്റെ മഞ്ഞിൽ അലഞ്ഞുതിരിയുന്ന ആത്മാക്കളുടെ വഴികളിലൂടെ..."
      </div>

      <p class="drop-cap">The fog in Mundar does not descend from the sky; it bleeds directly from the black water of the dykes. When Narayanan Vappan sat upright in his wooden cot, his eyes tracked the rhythmic swaying of the coconut-leaf rafters. It was twenty minutes past midnight. Outside, where the mud bund stretched toward the eastern tributary, a figure was walking through the floodwater—without parting the current.</p>
      
      <p>"That is not a living man, Rathi," the old man whispered, his raspy voice cutting through the damp chill. "Do not light the lamp. When they walk the Varathupokku, light is an invitation to stay."</p>

      <p>Rathi stood motionless by the window lattice. Through the diamond-shaped wooden openings, she could see the silhouette gliding across the mirror-like surface of the canal. There was no sound of footsteps, only the faint, sickening scent of crushed betel leaves and damp river silt—the exact scent of the sacred serpent grove thirty miles away.</p>
      
      <p>The Varathupokku had begun. And in Mundar, once the spirits take the path, the living must either close their doors or surrender their dreams to the water.</p>
    `
  },
  'urakkappishachu': {
    title: 'ഉറക്കപ്പിശാച് | Urakkappishachu',
    subtitle: 'The Sleep Demon • The Testament of Narayanan Vappan',
    author: 'S.P. Sarath (എസ്.പി. ശരത്ത്)',
    text: `
      <div style="font-family: var(--font-malayalam); font-size: 1.3rem; line-height: 1.9; color: #e6ca65; margin-bottom: 24px; padding: 18px 24px; background: rgba(212, 175, 55, 0.06); border-left: 3px solid var(--gold-primary); border-radius: 0 10px 10px 0;">
        "ചെലതരം കേൾവികളും കാഴ്ചകളും എല്ലാർക്കുവൊന്നും കാണാൻ പറ്റത്തില്ല. മോളേ, പുസ്തകത്തേലൊക്കെ എഴുതിവെച്ചിരിക്കുന്നതല്ല ലോകം. നമ്മൾ ഉറങ്ങുമ്പോഴും കണ്ണുചിമ്മാതെ കാത്തിരിക്കുന്ന ചെലതുണ്ട്... ഉറക്കപ്പിശാചുകൾ."
      </div>

      <p class="drop-cap">It was during the fortieth night of the unbroken monsoon that the chest grew heavy. Not the physical heaviness of soaked blankets or age-worn lungs, but the cold, suffocating weight of an entity sitting squarely upon the ribs while the mind is fully awake.</p>

      <p>Narayanan Vappan looked at his daughter-in-law Rathi through the dim haze of the brass kerosene lamp. "People think the demon attacks from outside, girl. They think an iron nail under the mattress or a sacred palm leaf will keep it at bay. But the sleep demon is born in the guilt we refuse to bury before we close our eyes."</p>

      <p>Outside the window, the Mundar river rose inch by inch against the foundation stone of the Illam. Each time the water touched the veranda step, a hollow tap echoed through the wooden floorboards, as though someone submerged beneath the house was knocking to be admitted into the warm bedroom.</p>
    `
  },
  'contessa': {
    title: 'കോണ്ടെസ്സ | Contessa',
    subtitle: 'The Quest for Orathan Inashu\'s Lost Treasure • DC Books',
    author: 'S.P. Sarath (എസ്.പി. ശരത്ത്)',
    text: `
      <div style="font-family: var(--font-malayalam); font-size: 1.25rem; line-height: 1.8; color: #ff8a80; margin-bottom: 24px; padding: 18px 22px; background: rgba(229, 57, 53, 0.08); border-left: 3px solid #e53935; border-radius: 0 10px 10px 0;">
        "ഉറക്കപ്പിശാച്, വരത്തുപോക്ക് എന്നിവയ്ക്കു ശേഷം എസ്.പി. ശരത്തിന്റെ ഏറ്റവും പുതിയ നോവൽ. ഒരത്തൻ ഈനാശുവിൽനിന്ന് നഷ്ടപ്പെട്ട നിധി തേടിയുള്ള ഒരു വണ്ടിക്കഥ."
      </div>

      <p class="drop-cap">ഇതൊരു അന്വേഷണമാണ്. ഒരത്തൻ ഈനാശുവിൽനിന്ന് നഷ്ടപ്പെട്ട നിധി തേടിയുള്ള ഒരു യാത്ര. ആ യാത്രയിൽ കണ്ടുമുട്ടുന്നവർക്കെല്ലാം ഓരോ കഥകളാണ്. മുന്നിൽ വരുന്ന പലതിനും നമ്മളോട് എന്തൊക്കൊയോ പറയാനുണ്ട്.</p>

      <p>അങ്ങനെ ഒരു വണ്ടിക്കഥയിലൂടെ പല ജീവിതങ്ങളിലെ യാഥാർത്ഥ്യങ്ങൾ തേടുകയാണ് ഈ നോവൽ. ഒരത്തൻ ഈനാശു എന്ന വ്യവസായസാമ്രാജ്യത്തിൽ നിന്ന് തുടങ്ങി വർഷങ്ങൾ നീണ്ട ഗാഢപ്രണയത്തിൻ്റെ മറ്റൊരു കഥയിലേക്കുള്ള സഞ്ചാരം.</p>

      <p>ഒരത്തൻ്റെ സാമ്രാജ്യത്തിൽ കയറി കളിച്ചതാരാണ്? ഈ കഥയിൽ ആ കോണ്ടെസ്സ കാറിനുള്ള പങ്ക് എന്താണ്? നഷ്ടപ്പെട്ടുപോയത് കണ്ടെത്താനാകുമോ? എന്നിങ്ങനെ അനേക ചോദ്യങ്ങൾക്കുള്ള ഒരു ഉത്തരം തേടൽ കൂടിയാണ് ഈ കഥ — പാൻ ഇന്ത്യൻ ജീവിത യാഥാർത്ഥ്യങ്ങളുടെ ഒരു നേർക്കാഴ്ച.</p>
    `
  },
  'drowning-grove': {
    title: 'The Drowning Grove',
    subtitle: 'The Submerged Shrine of Sarpa Kavu',
    author: 'S.P. Sarath',
    text: `
      <p class="drop-cap">The river at Kumarakom does not sleep; it merely thickens after midnight. When the oil lamp in the prow of the canoe flickered against the damp river mist, Madhavan felt the chill that had haunted three generations of his bloodline. The water was level with the gunwale, black as obsidian, mirror-smooth save for the faint luminescence of emerald fireflies clinging to the hanging banyan ropes.</p>
      
      <p>Ahead, breaking the fog like an island of black bone, the giant roots of the primordial mangrove rose from the depths, clutching an ancient granite idol whose single hooded eye caught the pale sliver of the midnight moon.</p>
    `
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Audio Engine UI Controller with Responsive Labels
  const audioBtn = document.getElementById('audio-controller');
  const audioLabel = document.getElementById('audio-label');

  function updateAudioLabel(isPlaying) {
    if (!audioLabel) return;
    const isMobile = window.innerWidth <= 480;
    if (isPlaying) {
      audioLabel.textContent = isMobile ? 'AMBIENCE: ON' : 'RIVER AMBIENCE: ON';
    } else {
      audioLabel.textContent = isMobile ? 'AMBIENCE: OFF' : 'RIVER AMBIENCE: OFF';
    }
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      const isPlaying = window.backwaterAudio.toggle();
      if (isPlaying) {
        audioBtn.classList.add('playing');
      } else {
        audioBtn.classList.remove('playing');
      }
      updateAudioLabel(isPlaying);
    });

    window.addEventListener('resize', () => {
      const isPlaying = audioBtn.classList.contains('playing');
      updateAudioLabel(isPlaying);
    });
    updateAudioLabel(false);
  }

  // 2. Custom Cursor Follower & Hover Effects (Desktop Only)
  const cursor = document.getElementById('custom-cursor');
  const cursorTrail = document.getElementById('custom-cursor-trail');

  if (cursor && cursorTrail) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = mouseX;
    let trailY = mouseY;

    window.addEventListener('mousemove', (e) => {
      if (window.innerWidth <= 1024) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    function renderCursorTrail() {
      if (window.innerWidth > 1024) {
        trailX += (mouseX - trailX) * 0.18;
        trailY += (mouseY - trailY) * 0.18;
        cursorTrail.style.left = `${trailX}px`;
        cursorTrail.style.top = `${trailY}px`;
      }
      requestAnimationFrame(renderCursorTrail);
    }
    requestAnimationFrame(renderCursorTrail);

    // Hover effect on interactive elements
    const interactiveEls = document.querySelectorAll('a, button, .map-hotspot, .book-card-3d, .book-shelf-item, .glass-card, input');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (window.innerWidth > 1024) document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        if (window.innerWidth > 1024) document.body.classList.remove('cursor-hover');
      });
    });
  }

  // 3. 3D Parallax Root Movement (Desktop Only)
  const rootsLeft = document.querySelector('.roots-left');
  const rootsRight = document.querySelector('.roots-right');

  window.addEventListener('mousemove', (e) => {
    if (window.innerWidth <= 1024) return;
    const normX = (e.clientX / window.innerWidth) - 0.5;
    const normY = (e.clientY / window.innerHeight) - 0.5;

    if (rootsLeft) {
      rootsLeft.style.transform = `translateX(${normX * -25}px) translateY(${normY * -15}px)`;
    }
    if (rootsRight) {
      rootsRight.style.transform = `scaleX(-1) translateX(${normX * 25}px) translateY(${normY * -15}px)`;
    }
  });

  // 4. 3D Floating Book Tilt Physics (Desktop Only)
  const bookScenes = document.querySelectorAll('.book-3d-scene');
  bookScenes.forEach(scene => {
    const card = scene.querySelector('.book-card-3d');
    if (!card) return;
    scene.addEventListener('mousemove', (e) => {
      // Guard against touch devices and mobile screens
      if (window.innerWidth <= 768) return;

      const rect = scene.getBoundingClientRect();
      const x = e.clientX - rect.left - (rect.width / 2);
      const y = e.clientY - rect.top - (rect.height / 2);
      
      const rotY = (x / (rect.width / 2)) * 18;
      const rotX = -(y / (rect.height / 2)) * 16;

      card.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) translateY(-8px)`;
    });

    scene.addEventListener('mouseleave', () => {
      if (window.innerWidth <= 768) {
        card.style.transform = '';
      } else {
        card.style.transform = `rotateY(-18deg) rotateX(8deg) translateY(0px)`;
      }
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      bookScenes.forEach(scene => {
        const card = scene.querySelector('.book-card-3d');
        if (card) card.style.transform = '';
      });
    }
  });

  // 5. Header Scroll Class
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 6. Mobile Navigation Drawer Controller
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileNavClose = document.getElementById('mobile-nav-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileDrawerCtas = document.querySelectorAll('.mobile-drawer-cta');

  function openMobileNav() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.add('active');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    if (mobileToggleBtn) {
      mobileToggleBtn.classList.add('open');
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
    }
    document.body.classList.add('nav-drawer-open');
  }

  function closeMobileNav() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.remove('active');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    if (mobileToggleBtn) {
      mobileToggleBtn.classList.remove('open');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('nav-drawer-open');
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('active')) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavClose) {
    mobileNavClose.addEventListener('click', closeMobileNav);
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  mobileDrawerCtas.forEach(cta => {
    cta.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // Close mobile drawer on desktop resize
  window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && mobileNavDrawer && mobileNavDrawer.classList.contains('active')) {
      closeMobileNav();
    }
  });

  // 7. Interactive Story World Map Modal (Folklore Dossier)
  const mapHotspots = document.querySelectorAll('.map-hotspot');
  const modalOverlay = document.getElementById('story-modal');
  const modalTag = document.getElementById('modal-tag');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  mapHotspots.forEach(hotspot => {
    hotspot.addEventListener('click', () => {
      const locationKey = hotspot.getAttribute('data-location');
      const data = STORY_LOCATIONS[locationKey];
      if (!data) return;

      // Audio cue
      if (window.backwaterAudio) window.backwaterAudio.triggerChime(520);

      modalTag.textContent = data.malayalam;
      modalTitle.textContent = data.title;
      modalBody.innerHTML = `
        <div style="font-family: monospace; font-size: 0.8rem; color: var(--emerald-primary); margin-bottom: 20px;">
          COORDINATES: ${data.coords}
        </div>
        <p class="drop-cap">${data.lore}</p>
        <blockquote style="margin: 24px 0; padding: 18px 24px; border-left: 2px solid var(--emerald-primary); background: rgba(13, 242, 148, 0.05); font-style: italic; border-radius: 0 8px 8px 0;">
          ${data.excerpt}
          <div style="font-family: var(--font-sans); font-size: 0.78rem; text-transform: uppercase; color: var(--gold-primary); margin-top: 10px; font-style: normal;">
            ${data.bookRef}
          </div>
        </blockquote>
      `;

      modalOverlay.classList.add('active');
      document.body.classList.add('modal-open');
    });
  });

  // 8. Book Excerpt Reader Trigger
  const excerptBtns = document.querySelectorAll('[data-open-excerpt]');
  excerptBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const bookKey = btn.getAttribute('data-open-excerpt') || 'drowning-grove';
      const excerpt = BOOK_EXCERPTS[bookKey];
      if (!excerpt) return;

      if (window.backwaterAudio) window.backwaterAudio.triggerChime(660);

      modalTag.textContent = `${excerpt.title} • Excerpt`;
      modalTitle.textContent = excerpt.subtitle;
      modalBody.innerHTML = excerpt.text;

      modalOverlay.classList.add('active');
      document.body.classList.add('modal-open');
    });
  });

  // Close Modal Handler
  function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
      }
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('active')) {
        closeMobileNav();
      }
    }
  });

  // 9. Mobile Carousel Scroll-Snap & Indicator Sync (News & Reviews)
  function initMobileCarouselSync(carouselId, indicatorsId) {
    const carousel = document.getElementById(carouselId);
    const indicators = document.getElementById(indicatorsId);
    if (!carousel || !indicators) return;

    const dots = indicators.querySelectorAll('.indicator-dot');
    const cards = carousel.querySelectorAll('.news-card, .review-card');
    if (!dots.length || !cards.length) return;

    // Dot tap to scroll card into view
    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        if (cards[idx]) {
          cards[idx].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
        }
      });
    });

    // Update active dot on scroll
    let scrollTimer;
    carousel.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const carouselLeft = carousel.getBoundingClientRect().left;
        let closestIdx = 0;
        let minDiff = Infinity;

        cards.forEach((card, idx) => {
          const diff = Math.abs(card.getBoundingClientRect().left - carouselLeft);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = idx;
          }
        });

        dots.forEach((dot, idx) => {
          if (idx === closestIdx) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }, 40);
    }, { passive: true });
  }

  initMobileCarouselSync('news-carousel', 'news-indicators');
  initMobileCarouselSync('reviews-carousel', 'reviews-indicators');
});
