'use strict';

// ===== AMOUNT SCALING =====
const UNICODE_FRACS = {
  '½':1/2,'¼':1/4,'¾':3/4,'⅓':1/3,'⅔':2/3,
  '⅛':1/8,'⅜':3/8,'⅝':5/8,'⅞':7/8,
};

function toDecimal(s) {
  s = s.trim();
  const mixed = s.match(/^(\d+)([½¼¾⅓⅔⅛⅜⅝⅞])$/);
  if (mixed) return +mixed[1] + UNICODE_FRACS[mixed[2]];
  if (UNICODE_FRACS[s]) return UNICODE_FRACS[s];
  const n = parseFloat(s);
  return isNaN(n) ? null : n;
}

function toNiceStr(v) {
  const whole = Math.floor(v);
  const frac  = v - whole;
  const FMAP  = [[1/8,'⅛'],[1/4,'¼'],[1/3,'⅓'],[3/8,'⅜'],[1/2,'½'],[5/8,'⅝'],[2/3,'⅔'],[3/4,'¾'],[7/8,'⅞']];
  for (const [f, sym] of FMAP) {
    if (Math.abs(frac - f) < 0.04) return whole > 0 ? `${whole}${sym}` : sym;
  }
  if (v === Math.round(v)) return String(Math.round(v));
  return v % 1 === 0 ? String(v) : v.toFixed(1).replace(/\.0$/, '');
}

function scaleAmount(str, factor) {
  if (factor === 1 || !str) return str;
  // Range: "4-5 stalks"
  const range = str.match(/^([½¼¾⅓⅔⅛⅜⅝⅞\d.]+)-([½¼¾⅓⅔⅛⅜⅝⅞\d.]+)(.*)/);
  if (range) {
    const v1 = toDecimal(range[1]), v2 = toDecimal(range[2]);
    if (v1 !== null && v2 !== null)
      return `${toNiceStr(v1 * factor)}-${toNiceStr(v2 * factor)}${range[3]}`;
  }
  // Single leading number/fraction
  const m = str.match(/^(\d*[½¼¾⅓⅔⅛⅜⅝⅞]|\d+\.?\d*)(.*)/);
  if (!m) return str; // "to taste", "for garnish", etc.
  const v = toDecimal(m[1]);
  if (v === null) return str;
  return toNiceStr(v * factor) + m[2];
}

// ===== STATE =====
let modalServings = 0;
let modalRecipe   = null;

function loadPantry() {
  try { return new Set(JSON.parse(localStorage.getItem('lk-pantry') || '[]')); }
  catch { return new Set(); }
}
function savePantry() {
  localStorage.setItem('lk-pantry', JSON.stringify([...state.pantry]));
}

const state = {
  selectedIngredients: new Set(),
  pantry: loadPantry(),
  filterMode: 'any',
  activeCategory: 'all',
  searchQuery: '',
  openRecipeId: null,
};

// ===== IMAGE CACHE =====
// Stores Wikipedia photo URLs keyed by recipe id. null = no photo available.
const imgCache = new Map();

async function fetchWikiPhoto(recipeId) {
  if (imgCache.has(recipeId)) return imgCache.get(recipeId);
  const title = WIKI_TITLES[recipeId];
  if (!title) { imgCache.set(recipeId, null); return null; }
  try {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=600&origin=*`;
    const res = await fetch(url);
    const data = await res.json();
    const pages = Object.values(data.query.pages);
    const src = pages[0]?.thumbnail?.source ?? null;
    imgCache.set(recipeId, src);
    return src;
  } catch {
    imgCache.set(recipeId, null);
    return null;
  }
}

function applyPhotoToCard(card, src) {
  const wrap = card.querySelector('.card-img-wrap');
  if (!wrap) return;
  const fallback = wrap.querySelector('.card-emoji-text');
  if (src) {
    const img = document.createElement('img');
    img.className = 'card-photo';
    img.alt = '';
    img.src = src;
    img.onload = () => { if (fallback) fallback.style.display = 'none'; wrap.prepend(img); };
  }
}

function applyPhotoToModal(src) {
  const hero = document.querySelector('.modal-hero');
  if (!hero || !src) return;
  const fallback = hero.querySelector('.modal-emoji');
  const img = document.createElement('img');
  img.className = 'modal-photo';
  img.alt = '';
  img.src = src;
  img.onload = () => { if (fallback) fallback.style.display = 'none'; hero.prepend(img); };
}

// Observe cards entering viewport then load their photo
let observer;
function setupObserver() {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const id = +card.dataset.id;
      observer.unobserve(card);
      fetchWikiPhoto(id).then(src => { if (src) applyPhotoToCard(card, src); });
    });
  }, { rootMargin: '200px' });
}

// ===== DOM REFS =====
const $ = id => document.getElementById(id);
const els = {
  filterToggle: $('filterToggle'),
  filterPanel: $('filterPanel'),
  filterOverlay: $('filterOverlay'),
  closeFilter: $('closeFilter'),
  filterBadge: $('filterBadge'),
  ingredientList: $('ingredientList'),
  ingredientSearch: $('ingredientSearch'),
  clearIngredients: $('clearIngredients'),
  applyFilter: $('applyFilter'),
  categoryNav: $('categoryNav'),
  recipeSearch: $('recipeSearch'),
  recipeGrid: $('recipeGrid'),
  emptyState: $('emptyState'),
  recipeCount: $('recipeCount'),
  activeFiltersInfo: $('activeFiltersInfo'),
  modalOverlay: $('modalOverlay'),
  modal: $('modal'),
  modalContent: $('modalContent'),
  modalClose: $('modalClose'),
  clearAll: $('clearAll'),
};

// ===== PANTRY =====
function renderPantrySection() {
  const chips = document.getElementById('pantryChips');
  const empty = document.getElementById('pantryEmpty');
  if (!chips || !empty) return;

  if (state.pantry.size === 0) {
    chips.innerHTML = '';
    empty.hidden = false;
    return;
  }
  empty.hidden = true;
  chips.innerHTML = [...state.pantry].sort().map(ing => `
    <span class="pantry-chip">
      ${ing}
      <button class="pantry-chip-remove" data-ing="${ing}" aria-label="Remove ${ing} from pantry">×</button>
    </span>
  `).join('');
}

function addToPantry(ing) {
  state.pantry.add(ing);
  state.selectedIngredients.delete(ing); // can't be both
  savePantry();
  renderPantrySection();
  renderIngredientList(document.getElementById('ingredientSearch').value);
  renderRecipes();
}

function removeFromPantry(ing) {
  state.pantry.delete(ing);
  savePantry();
  renderPantrySection();
  renderIngredientList(document.getElementById('ingredientSearch').value);
  renderRecipes();
}

// ===== INIT =====
function init() {
  setupObserver();
  renderCategories();
  renderPantrySection();
  renderIngredientList();
  renderRecipes();
  bindEvents();
}

// ===== CATEGORIES =====
function renderCategories() {
  els.categoryNav.innerHTML = Object.entries(CATEGORIES).map(([key, label]) => `
    <button class="cat-btn ${key === state.activeCategory ? 'active' : ''}" data-cat="${key}">${label}</button>
  `).join('');
}

// ===== INGREDIENT LIST =====
function renderIngredientList(filter = '') {
  const lc = filter.toLowerCase();
  // Hide pantry items — they're always available
  const visible = ALL_INGREDIENTS.filter(i =>
    !state.pantry.has(i) && (!lc || i.includes(lc))
  );

  if (!visible.length) {
    els.ingredientList.innerHTML = `<p style="color:var(--gray-400);font-size:.85rem;padding:.5rem 0">${state.pantry.size > 0 && !lc ? 'All matching ingredients are in your pantry.' : 'No ingredients match.'}</p>`;
    return;
  }

  els.ingredientList.innerHTML = visible.map(ing => {
    const checked = state.selectedIngredients.has(ing);
    const recipeCount = RECIPES.filter(r => r.ingredients.some(i => i.item === ing)).length;
    return `
      <div class="ingredient-item ${checked ? 'checked' : ''}" data-ing="${ing}" role="checkbox" aria-checked="${checked}" tabindex="0">
        <span class="ingredient-checkbox"></span>
        <span class="ingredient-name">${ing}</span>
        <span class="ingredient-count">${recipeCount}</span>
        <button class="pantry-add-btn" data-ing="${ing}" title="Add to pantry (always available)" tabindex="-1">🏠</button>
      </div>
    `;
  }).join('');
}

// ===== FILTER ENGINE =====
function getFilteredRecipes() {
  let recipes = [...RECIPES];

  if (state.activeCategory !== 'all') {
    recipes = recipes.filter(r => r.category === state.activeCategory);
  }

  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    recipes = recipes.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.nameAr.includes(q) ||
      r.description.toLowerCase().includes(q) ||
      r.tags.some(t => t.toLowerCase().includes(q)) ||
      r.ingredients.some(i => i.item.toLowerCase().includes(q))
    );
  }

  if (state.selectedIngredients.size > 0) {
    const sel = state.selectedIngredients;
    if (state.filterMode === 'all') {
      recipes = recipes.filter(r =>
        [...sel].every(ing => r.ingredients.some(i => i.item === ing))
      );
    } else {
      recipes = recipes.filter(r =>
        r.ingredients.some(i => sel.has(i.item))
      );
    }
  }

  if (state.selectedIngredients.size > 0 || state.pantry.size > 0) {
    const allHave = new Set([...state.selectedIngredients, ...state.pantry]);
    recipes.sort((a, b) => {
      const pctA = a.ingredients.filter(i => allHave.has(i.item)).length / a.ingredients.length;
      const pctB = b.ingredients.filter(i => allHave.has(i.item)).length / b.ingredients.length;
      return pctB - pctA;
    });
  }

  return recipes;
}

function getMatchInfo(recipe) {
  const hasFilter = state.selectedIngredients.size > 0 || state.pantry.size > 0;
  if (!hasFilter) return null;
  const allHave = new Set([...state.selectedIngredients, ...state.pantry]);
  const have  = recipe.ingredients.filter(i => allHave.has(i.item)).length;
  const total = recipe.ingredients.length;
  const pct   = have / total;
  return { have, total, full: pct === 1, pct };
}

// ===== RENDER RECIPES =====
function renderRecipes() {
  const recipes = getFilteredRecipes();

  els.recipeCount.textContent = `${recipes.length} recipe${recipes.length !== 1 ? 's' : ''}`;

  if (state.selectedIngredients.size > 0) {
    const tags = [...state.selectedIngredients].slice(0, 3).map(i =>
      `<span class="active-tag">${i}</span>`
    ).join('');
    const extra = state.selectedIngredients.size > 3
      ? `<span class="active-tag">+${state.selectedIngredients.size - 3}</span>` : '';
    els.activeFiltersInfo.innerHTML = tags + extra;
  } else {
    els.activeFiltersInfo.innerHTML = '';
  }

  if (!recipes.length) {
    els.recipeGrid.innerHTML = '';
    els.emptyState.hidden = false;
    return;
  }

  els.emptyState.hidden = true;
  els.recipeGrid.innerHTML = recipes.map(r => renderCard(r)).join('');

  els.recipeGrid.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => openRecipe(+card.dataset.id));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openRecipe(+card.dataset.id); });
    // Kick off lazy image load for this card
    if (observer) observer.observe(card);
  });
}

function renderCard(recipe) {
  const match = getMatchInfo(recipe);
  const difficultyLabel = { easy: 'Easy', medium: 'Medium', hard: 'Advanced' }[recipe.difficulty];
  const categoryLabel = CATEGORIES[recipe.category] || recipe.category;

  const matchBadge = match
    ? `<span class="card-match-badge ${match.full ? 'full' : 'partial'}">${match.full ? '✓ Can make' : `${match.have}/${match.total} ingredients`}</span>`
    : '';

  const tagsHtml = recipe.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('');

  return `
    <article class="recipe-card" data-id="${recipe.id}" role="button" tabindex="0" aria-label="${recipe.name}">
      <div class="card-img-wrap">
        <span class="card-emoji-text">${recipe.image}</span>
        <span class="card-category-badge">${categoryLabel}</span>
        ${matchBadge}
      </div>
      <div class="card-body">
        <h2 class="card-name">${recipe.name}</h2>
        <p class="card-name-ar">${recipe.nameAr}</p>
        <p class="card-desc">${recipe.description}</p>
        <div class="card-meta">
          <span class="meta-item">⏱ ${recipe.time} min</span>
          <span class="meta-item">👤 ${recipe.servings}</span>
          <span class="meta-item"><span class="difficulty-dot ${recipe.difficulty}"></span> ${difficultyLabel}</span>
        </div>
        <div class="card-tags">${tagsHtml}</div>
      </div>
    </article>
  `;
}

// ===== MODAL =====
function buildIngredientsHtml(recipe, servings) {
  const factor  = servings / recipe.servings;
  const allHave = new Set([...state.selectedIngredients, ...state.pantry]);
  return recipe.ingredients.map(i => {
    const have = allHave.has(i.item);
    const scaledAmount = scaleAmount(i.amount, factor);
    return `
      <div class="ingredient-row ${have ? 'have' : ''}">
        <span class="ingredient-row-dot"></span>
        <span>
          <span class="ingredient-row-name">${i.item}</span>
          <span class="ingredient-row-amount">${scaledAmount}</span>
        </span>
      </div>
    `;
  }).join('');
}

function refreshIngredients() {
  const grid = document.getElementById('modal-ingredients');
  if (grid && modalRecipe) grid.innerHTML = buildIngredientsHtml(modalRecipe, modalServings);
  const numEl = document.getElementById('servingsNum');
  if (numEl) numEl.textContent = modalServings;
}

function openRecipe(id) {
  const recipe = RECIPES.find(r => r.id === id);
  if (!recipe) return;
  state.openRecipeId = id;
  modalRecipe   = recipe;
  modalServings = recipe.servings;

  const match = getMatchInfo(recipe);

  const stepsHtml = recipe.steps.map((step, i) => `
    <li class="step-item">
      <span class="step-num">${i + 1}</span>
      <span class="step-text">${step}</span>
    </li>
  `).join('');

  const matchNote = match
    ? `<div class="modal-desc" style="background:${match.full ? '#e8f5e9' : '#fff8e1'};border-left-color:${match.full ? '#52b788' : '#c9a84c'}">
        ${match.full
          ? `✅ You have all ${match.total} ingredients!`
          : `🛒 You have ${match.have} of ${match.total} ingredients (${Math.round(match.pct * 100)}% match).`
        }
       </div>`
    : '';

  const tagsHtml = recipe.tags.map(t => `<span class="tag">${t}</span>`).join('');

  els.modalContent.innerHTML = `
    <div class="modal-hero">
      <span class="modal-emoji">${recipe.image}</span>
    </div>
    <div style="padding:0">
      <h2 class="modal-title">${recipe.name}</h2>
      <p class="modal-title-ar">${recipe.nameAr}</p>
      <div class="modal-meta">
        <span class="modal-meta-item"><span class="modal-meta-icon">⏱</span> ${recipe.time} min</span>
        <span class="modal-meta-item"><span class="difficulty-dot ${recipe.difficulty}" style="width:10px;height:10px"></span> ${recipe.difficulty}</span>
      </div>
      <div class="serving-adjuster">
        <button class="adj-btn" id="adjDown" aria-label="Fewer servings">−</button>
        <span class="adj-label">Serves <span id="servingsNum">${recipe.servings}</span></span>
        <button class="adj-btn" id="adjUp" aria-label="More servings">+</button>
      </div>
      ${matchNote}
      <p class="modal-desc">${recipe.description}</p>
      <div class="card-tags" style="margin-bottom:1.25rem">${tagsHtml}</div>

      <h3 class="modal-section-title">🧺 Ingredients</h3>
      <div class="ingredients-grid" id="modal-ingredients">${buildIngredientsHtml(recipe, modalServings)}</div>

      <h3 class="modal-section-title">📋 Steps</h3>
      <ol class="steps-list">${stepsHtml}</ol>
    </div>
  `;

  document.getElementById('adjDown').addEventListener('click', () => {
    if (modalServings > 1) { modalServings--; refreshIngredients(); }
  });
  document.getElementById('adjUp').addEventListener('click', () => {
    if (modalServings < 50) { modalServings++; refreshIngredients(); }
  });

  els.modalOverlay.classList.add('open');
  els.modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  fetchWikiPhoto(id).then(src => { if (src) applyPhotoToModal(src); });
}

function closeModal() {
  els.modalOverlay.classList.remove('open');
  els.modalOverlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  state.openRecipeId = null;
}

// ===== FILTER PANEL =====
function openFilterPanel() {
  els.filterPanel.classList.add('open');
  els.filterPanel.setAttribute('aria-hidden', 'false');
  els.filterOverlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
  els.ingredientSearch.focus();
}

function closeFilterPanel() {
  els.filterPanel.classList.remove('open');
  els.filterPanel.setAttribute('aria-hidden', 'true');
  els.filterOverlay.classList.remove('visible');
  document.body.style.overflow = '';
}

function updateFilterBadge() {
  const n = state.selectedIngredients.size;
  els.filterBadge.textContent = n;
  els.filterBadge.hidden = n === 0;
}

// ===== EVENT BINDING =====
function bindEvents() {
  els.filterToggle.addEventListener('click', openFilterPanel);
  els.closeFilter.addEventListener('click', closeFilterPanel);
  els.filterOverlay.addEventListener('click', closeFilterPanel);
  els.applyFilter.addEventListener('click', () => { closeFilterPanel(); renderRecipes(); });

  els.ingredientSearch.addEventListener('input', e => renderIngredientList(e.target.value));

  els.ingredientList.addEventListener('click', e => {
    // Pantry button takes priority
    const pantryBtn = e.target.closest('.pantry-add-btn');
    if (pantryBtn) { e.stopPropagation(); addToPantry(pantryBtn.dataset.ing); return; }
    handleIngredientClick(e);
  });
  els.ingredientList.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') handleIngredientClick(e);
  });

  // Pantry chip remove buttons
  document.getElementById('pantryChips').addEventListener('click', e => {
    const btn = e.target.closest('.pantry-chip-remove');
    if (btn) removeFromPantry(btn.dataset.ing);
  });

  els.clearIngredients.addEventListener('click', () => {
    state.selectedIngredients.clear();
    renderIngredientList(els.ingredientSearch.value);
    updateFilterBadge();
    renderRecipes();
  });

  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filterMode = btn.dataset.mode;
    });
  });

  els.categoryNav.addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    state.activeCategory = btn.dataset.cat;
    renderCategories();
    renderRecipes();
  });

  let searchTimer;
  els.recipeSearch.addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.searchQuery = e.target.value.trim();
      renderRecipes();
    }, 200);
  });

  els.modalClose.addEventListener('click', closeModal);
  els.modalOverlay.addEventListener('click', e => { if (e.target === els.modalOverlay) closeModal(); });

  if (els.clearAll) {
    els.clearAll.addEventListener('click', () => {
      state.selectedIngredients.clear();
      state.searchQuery = '';
      state.activeCategory = 'all';
      els.recipeSearch.value = '';
      updateFilterBadge();
      renderCategories();
      renderRecipes();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (state.openRecipeId) closeModal();
      else closeFilterPanel();
    }
  });
}

function handleIngredientClick(e) {
  const item = e.target.closest('.ingredient-item');
  if (!item) return;
  const ing = item.dataset.ing;
  if (state.selectedIngredients.has(ing)) {
    state.selectedIngredients.delete(ing);
  } else {
    state.selectedIngredients.add(ing);
  }
  item.classList.toggle('checked', state.selectedIngredients.has(ing));
  item.setAttribute('aria-checked', state.selectedIngredients.has(ing));
  updateFilterBadge();
  renderRecipes();
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);
