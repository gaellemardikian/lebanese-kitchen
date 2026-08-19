'use strict';

// ===== STATE =====
const state = {
  selectedIngredients: new Set(),
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

// ===== INIT =====
function init() {
  setupObserver();
  renderCategories();
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
  const visible = ALL_INGREDIENTS.filter(i => !lc || i.includes(lc));

  if (!visible.length) {
    els.ingredientList.innerHTML = `<p style="color:var(--gray-400);font-size:.85rem;padding:.5rem 0">No ingredients match.</p>`;
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

  if (state.selectedIngredients.size > 0) {
    recipes.sort((a, b) => {
      const pctA = a.ingredients.filter(i => state.selectedIngredients.has(i.item)).length / a.ingredients.length;
      const pctB = b.ingredients.filter(i => state.selectedIngredients.has(i.item)).length / b.ingredients.length;
      return pctB - pctA;
    });
  }

  return recipes;
}

function getMatchInfo(recipe) {
  if (state.selectedIngredients.size === 0) return null;
  const have = recipe.ingredients.filter(i => state.selectedIngredients.has(i.item)).length;
  const total = recipe.ingredients.length;
  const pct = have / total;
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
function openRecipe(id) {
  const recipe = RECIPES.find(r => r.id === id);
  if (!recipe) return;
  state.openRecipeId = id;

  const match = getMatchInfo(recipe);

  const ingredientsHtml = recipe.ingredients.map(i => {
    const have = state.selectedIngredients.has(i.item);
    return `
      <div class="ingredient-row ${have ? 'have' : ''}">
        <span class="ingredient-row-dot"></span>
        <span>
          <span class="ingredient-row-name">${i.item}</span>
          <span class="ingredient-row-amount">${i.amount}</span>
        </span>
      </div>
    `;
  }).join('');

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
        <span class="modal-meta-item"><span class="modal-meta-icon">👤</span> Serves ${recipe.servings}</span>
        <span class="modal-meta-item"><span class="difficulty-dot ${recipe.difficulty}" style="width:10px;height:10px"></span> ${recipe.difficulty}</span>
      </div>
      ${matchNote}
      <p class="modal-desc">${recipe.description}</p>
      <div class="card-tags" style="margin-bottom:1.25rem">${tagsHtml}</div>

      <h3 class="modal-section-title">🧺 Ingredients</h3>
      <div class="ingredients-grid">${ingredientsHtml}</div>

      <h3 class="modal-section-title">📋 Steps</h3>
      <ol class="steps-list">${stepsHtml}</ol>
    </div>
  `;

  els.modalOverlay.classList.add('open');
  els.modalOverlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Load real photo into modal hero
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

  els.ingredientList.addEventListener('click', handleIngredientClick);
  els.ingredientList.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') handleIngredientClick(e);
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
