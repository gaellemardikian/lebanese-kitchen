'use strict';

// ===== STATE =====
const state = {
  selectedIngredients: new Set(),
  filterMode: 'any',       // 'any' | 'all'
  activeCategory: 'all',
  searchQuery: '',
  openRecipeId: null,
};

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

  // Category filter
  if (state.activeCategory !== 'all') {
    recipes = recipes.filter(r => r.category === state.activeCategory);
  }

  // Search filter
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

  // Ingredient filter
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

  // Sort: full matches first when filtering
  if (state.selectedIngredients.size > 0) {
    recipes.sort((a, b) => {
      const matchA = a.ingredients.filter(i => state.selectedIngredients.has(i.item)).length;
      const matchB = b.ingredients.filter(i => state.selectedIngredients.has(i.item)).length;
      const pctA = matchA / a.ingredients.length;
      const pctB = matchB / b.ingredients.length;
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

  // Update stats
  els.recipeCount.textContent = `${recipes.length} recipe${recipes.length !== 1 ? 's' : ''}`;

  // Active filters info
  if (state.selectedIngredients.size > 0) {
    const tags = [...state.selectedIngredients].slice(0, 3).map(i =>
      `<span class="active-tag">${i}</span>`
    ).join('');
    const extra = state.selectedIngredients.size > 3 ? `<span class="active-tag">+${state.selectedIngredients.size - 3}</span>` : '';
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

  // Bind card clicks
  els.recipeGrid.querySelectorAll('.recipe-card').forEach(card => {
    card.addEventListener('click', () => openRecipe(+card.dataset.id));
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openRecipe(+card.dataset.id); });
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
      <div class="card-emoji">
        ${recipe.image}
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
    <div class="modal-hero">${recipe.image}</div>
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
  // Filter panel open/close
  els.filterToggle.addEventListener('click', openFilterPanel);
  els.closeFilter.addEventListener('click', closeFilterPanel);
  els.filterOverlay.addEventListener('click', closeFilterPanel);
  els.applyFilter.addEventListener('click', () => { closeFilterPanel(); renderRecipes(); });

  // Ingredient search
  els.ingredientSearch.addEventListener('input', e => renderIngredientList(e.target.value));

  // Ingredient checkboxes (delegated)
  els.ingredientList.addEventListener('click', handleIngredientClick);
  els.ingredientList.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') handleIngredientClick(e);
  });

  // Clear ingredients
  els.clearIngredients.addEventListener('click', () => {
    state.selectedIngredients.clear();
    renderIngredientList(els.ingredientSearch.value);
    updateFilterBadge();
    renderRecipes();
  });

  // Mode buttons
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.filterMode = btn.dataset.mode;
    });
  });

  // Category nav (delegated)
  els.categoryNav.addEventListener('click', e => {
    const btn = e.target.closest('.cat-btn');
    if (!btn) return;
    state.activeCategory = btn.dataset.cat;
    renderCategories();
    renderRecipes();
  });

  // Recipe search
  let searchTimer;
  els.recipeSearch.addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.searchQuery = e.target.value.trim();
      renderRecipes();
    }, 200);
  });

  // Modal close
  els.modalClose.addEventListener('click', closeModal);
  els.modalOverlay.addEventListener('click', e => { if (e.target === els.modalOverlay) closeModal(); });

  // Clear all
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

  // Keyboard: Esc closes modals
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
  // Live update recipes while panel is open
  renderRecipes();
}

// ===== START =====
document.addEventListener('DOMContentLoaded', init);
