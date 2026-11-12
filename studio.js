/* Progressive interaction layer. No framework, external requests, or hidden content dependency. */
(() => {
  'use strict';

  const byId = id => document.getElementById(id);
  const all = (selector, scope = document) => scope ? [...scope.querySelectorAll(selector)] : [];
  const listen = (node, type, handler, options) => node?.addEventListener(type, handler, options);
  const motion = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;
  const reducedMotion = () => Boolean(motion?.matches);
  const scrollBehavior = () => reducedMotion() ? 'instant' : 'smooth';

  function scrollToNode(node, behavior = scrollBehavior()) {
    if (!node || node.hidden) return;
    requestAnimationFrame(() => node.scrollIntoView({ block: 'start', behavior }));
  }

  // Mobile navigation remains a normal list of links, with Escape and focus restoration.
  const menuToggle = byId('menu-toggle');
  const mobileMenu = byId('mobile-menu');
  function closeMenu({ restoreFocus = false } = {}) {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '打开导航');
    if (restoreFocus) menuToggle.focus({ preventScroll: true });
  }
  listen(menuToggle, 'click', () => {
    if (!mobileMenu) return;
    const opening = menuToggle.getAttribute('aria-expanded') !== 'true';
    mobileMenu.hidden = !opening;
    menuToggle.setAttribute('aria-expanded', String(opening));
    menuToggle.setAttribute('aria-label', opening ? '关闭导航' : '打开导航');
  });
  all('a', mobileMenu).forEach(link => listen(link, 'click', () => closeMenu()));
  listen(document, 'keydown', event => {
    if (event.key === 'Escape' && mobileMenu && !mobileMenu.hidden) closeMenu({ restoreFocus: true });
  });
  listen(document, 'click', event => {
    if (!mobileMenu || mobileMenu.hidden || !menuToggle) return;
    if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
  });
  const desktopBreakpoint = typeof matchMedia === 'function' ? matchMedia('(min-width: 1025px)') : null;
  listen(desktopBreakpoint, 'change', event => { if (event.matches) closeMenu(); });

  // Prepare a project brief locally; there is no form submission or network request.
  const briefForm = byId('project-brief');
  if (briefForm?.tagName === 'FORM') {
    const briefStatus = byId('brief-status');
    briefStatus?.setAttribute('role', 'status');
    const goalField = briefForm.elements.namedItem('goal');
    const dataField = briefForm.elements.namedItem('data');
    let briefObjectURL = null;
    let briefReleaseTimer;
    const releaseBriefURL = () => {
      clearTimeout(briefReleaseTimer);
      if (briefObjectURL) URL.revokeObjectURL(briefObjectURL);
      briefObjectURL = null;
    };
    const fieldValue = name => {
      const field = briefForm.elements.namedItem(name);
      return typeof field?.value === 'string' ? field.value.trim() : '';
    };
    const selectLabel = name => {
      const field = briefForm.elements.namedItem(name);
      if (!fieldValue(name)) return '待补充';
      return field?.selectedOptions?.[0]?.textContent.trim() || fieldValue(name);
    };
    [goalField, dataField].forEach(field => listen(field, 'input', () => {
      field.setCustomValidity('');
      if (briefStatus) briefStatus.textContent = '';
    }));
    listen(briefForm, 'change', () => { if (briefStatus) briefStatus.textContent = ''; });
    listen(briefForm, 'submit', event => {
      event.preventDefault();
      if (briefStatus) briefStatus.textContent = '';
      const goal = fieldValue('goal');
      const data = fieldValue('data');
      if (!goalField || typeof goalField.setCustomValidity !== 'function') {
        if (briefStatus) briefStatus.textContent = '暂时无法生成需求摘要，请刷新页面后重试。';
        return;
      }
      goalField.setCustomValidity(!goal ? '请填写项目目标。' : goal.length > 240 ? '项目目标请控制在 240 个字符以内。' : '');
      dataField?.setCustomValidity(data.length > 1000 ? '数据说明请控制在 1000 个字符以内。' : '');
      if (!briefForm.reportValidity()) return;

      const now = new Date();
      const date = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
      const filename = `志通达-项目需求摘要-${date}.txt`;
      const content = [
        '志通达算法研发工作室',
        '项目需求摘要',
        `生成日期：${date}`,
        '',
        `业务场景：${selectLabel('scene')}`,
        '',
        '项目目标：',
        goal,
        '',
        '数据情况：',
        data || '待补充',
        '',
        `部署方式：${selectLabel('deployment')}`,
        ''
      ].join('\r\n');
      releaseBriefURL();
      const downloadLink = document.createElement('a');
      try {
        briefObjectURL = URL.createObjectURL(new Blob(['\uFEFF', content], { type: 'text/plain;charset=utf-8' }));
        downloadLink.href = briefObjectURL;
        downloadLink.download = filename;
        downloadLink.hidden = true;
        document.body.append(downloadLink);
        downloadLink.click();
        if (briefStatus) briefStatus.textContent = `已生成「${filename}」并交由浏览器下载，请在下载列表中查看。内容未发送到服务器。`;
        // Keep the URL alive long enough for the browser to start the download.
        briefReleaseTimer = setTimeout(releaseBriefURL, 30000);
      } catch (_) {
        releaseBriefURL();
        if (briefStatus) briefStatus.textContent = '需求摘要暂未能生成，请重试或检查浏览器的下载设置。';
      } finally {
        downloadLink.remove();
      }
    });
    listen(window, 'pagehide', releaseBriefURL);
    // The HTML starts disabled so a no-JavaScript visit cannot submit fields as a URL.
    const briefSubmit = briefForm.querySelector('[type="submit"]');
    if (briefSubmit) briefSubmit.disabled = false;
  }

  // Each comparison is independent and retains native range keyboard controls.
  all('[data-compare]').forEach(compare => {
    const range = compare.querySelector('input[type="range"]');
    if (!range) return;
    const before = compare.querySelector('.compare-before-label');
    const after = compare.querySelector('.compare-after-label');
    const beforeText = compare.dataset.beforeLabel || before?.textContent.trim() || '处理前';
    const afterText = compare.dataset.afterLabel || after?.textContent.trim() || '处理后';
    if (before) before.textContent = beforeText;
    if (after) after.textContent = afterText;
    const update = () => {
      const min = range.min === '' ? 0 : Number(range.min);
      const max = range.max === '' ? 100 : Number(range.max);
      const value = Number(range.value);
      const split = max > min ? Math.max(0, Math.min(100, (value - min) / (max - min) * 100)) : 50;
      compare.style.setProperty('--split', `${split}%`);
      if (before) before.hidden = split < 12;
      if (after) after.hidden = split > 88;
      range.setAttribute('aria-valuetext', `${beforeText} ${Math.round(split)}%，${afterText} ${Math.round(100 - split)}%`);
    };
    listen(range, 'input', update);
    listen(range, 'change', update);
    update();
  });

  const groups = all('.algorithm-group[data-group]');
  const cards = all('.algorithm-card[data-algorithm]');
  const filterButtons = all('[data-filter]');
  const searchInput = byId('algorithm-search');
  const resultCount = byId('result-count');
  const emptyState = byId('empty-state');
  const clearSearch = byId('clear-search');
  const validFilters = new Set(['all', ...groups.map(group => group.dataset.group)]);
  const normalized = value => String(value || '').normalize('NFKC').trim().toLocaleLowerCase();
  const searchableText = new Map(cards.map(card => [card, normalized(card.textContent)]));
  let selectedFilter = 'all';
  let searchHistoryTimer;

  function applyCatalog() {
    const query = normalized(searchInput?.value);
    const terms = query ? query.split(/\s+/) : [];
    let total = 0;
    groups.forEach(group => {
      let groupCount = 0;
      const matchingGroup = selectedFilter === 'all' || selectedFilter === group.dataset.group;
      all('.algorithm-card[data-algorithm]', group).forEach(card => {
        const text = searchableText.get(card) || '';
        const visible = matchingGroup && terms.every(term => text.includes(term));
        card.hidden = !visible;
        if (visible) groupCount += 1;
      });
      group.hidden = groupCount === 0;
      const counter = group.querySelector('.algorithm-count');
      if (counter) counter.textContent = `${String(groupCount).padStart(2, '0')} 项算法`;
      total += groupCount;
    });
    filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === selectedFilter)));
    if (resultCount) resultCount.textContent = selectedFilter === 'all' && !query ? `展示全部 ${total} 项算法` : `找到 ${total} 项算法`;
    if (emptyState) emptyState.hidden = total > 0;
    if (clearSearch) clearSearch.hidden = selectedFilter === 'all' && !query;
    scheduleScrollUpdate();
  }

  function catalogHash() {
    return selectedFilter === 'all' ? '#light' : `#cap-tab-${selectedFilter}`;
  }
  function rememberCatalog(method = 'replaceState', hash = catalogHash()) {
    if (!groups.length) return;
    const previous = history.state && typeof history.state === 'object' ? history.state : {};
    const next = {
      ...previous,
      studioCatalog: { filter: selectedFilter, query: searchInput?.value || '', hash }
    };
    try { history[method](next, '', `${location.pathname}${location.search}${hash}`); }
    catch (_) { /* File previews and restricted environments still keep in-page controls working. */ }
  }
  filterButtons.forEach(button => {
    listen(button, 'click', () => {
      if (!validFilters.has(button.dataset.filter)) return;
      clearTimeout(searchHistoryTimer);
      selectedFilter = button.dataset.filter;
      applyCatalog();
      rememberCatalog('pushState');
    });
  });
  listen(searchInput, 'input', () => {
    applyCatalog();
    clearTimeout(searchHistoryTimer);
    searchHistoryTimer = setTimeout(() => rememberCatalog(), 180);
  });
  listen(clearSearch, 'click', () => {
    clearTimeout(searchHistoryTimer);
    selectedFilter = 'all';
    if (searchInput) searchInput.value = '';
    applyCatalog();
    rememberCatalog('pushState');
    searchInput?.focus({ preventScroll: true });
  });

  function readHash() {
    try { return decodeURIComponent(location.hash.slice(1)); }
    catch (_) { return location.hash.slice(1); }
  }
  function resolveCatalogTarget(hash) {
    const category = hash.match(/^cap-(?:tab|panel)-(\d+)$/) || hash.match(/^algorithm-(\d+)-overview$/);
    if (category) {
      const group = groups.find(item => item.dataset.group === category[1]);
      return group ? { group, target: group } : null;
    }
    const algorithm = hash.match(/^algorithm-(\d+)-(\d+)$/);
    if (algorithm) {
      const card = cards.find(item => item.dataset.algorithm === `${algorithm[1]}-${algorithm[2]}`);
      const group = card?.closest('.algorithm-group');
      return group ? { group, target: card } : null;
    }
    const target = byId(hash);
    const group = target?.closest('.algorithm-group');
    return group ? { group, target } : null;
  }
  function syncLocation({ allowSavedState = true, scroll = true } = {}) {
    if (!groups.length) return;
    clearTimeout(searchHistoryTimer);
    const hash = readHash();
    const target = resolveCatalogTarget(hash);
    const saved = allowSavedState ? history.state?.studioCatalog : null;
    if (saved && saved.hash === location.hash && validFilters.has(saved.filter)) {
      selectedFilter = saved.filter;
      if (searchInput) searchInput.value = typeof saved.query === 'string' ? saved.query : '';
      applyCatalog();
      if (scroll && target && !target.group.hidden && !target.target.hidden) scrollToNode(target.target, 'instant');
      return;
    }
    if (target) {
      selectedFilter = target.group.dataset.group;
      if (searchInput) searchInput.value = '';
      applyCatalog();
      if (scroll) scrollToNode(target.target, 'instant');
    } else if (!hash || hash === 'light') {
      selectedFilter = 'all';
      if (searchInput) searchInput.value = '';
      applyCatalog();
    }
  }
  // Intercept legacy deep links before the browser tries to scroll to a hidden category.
  listen(document, 'click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href]');
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
    let url;
    try { url = new URL(link.href, location.href); } catch (_) { return; }
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return;
    let hash;
    try { hash = decodeURIComponent(url.hash.slice(1)); } catch (_) { hash = url.hash.slice(1); }
    const resolved = resolveCatalogTarget(hash);
    if (!resolved) return;
    event.preventDefault();
    clearTimeout(searchHistoryTimer);
    selectedFilter = resolved.group.dataset.group;
    if (searchInput) searchInput.value = '';
    applyCatalog();
    rememberCatalog('pushState', url.hash);
    closeMenu();
    scrollToNode(resolved.target);
  });
  listen(window, 'popstate', () => syncLocation());
  listen(window, 'hashchange', () => syncLocation());

  // Local demonstration media: preserve its aspect ratio and expose genuine playback errors.
  const player = byId('media-player');
  const mediaFrame = byId('media-frame');
  const mediaTitle = byId('media-title');
  const mediaDescription = byId('media-description');
  const mediaStatus = byId('media-status');
  const mediaOpen = byId('media-open');
  let mediaMessage = mediaStatus?.querySelector('[data-media-message]') || null;
  const mediaButtons = all('[data-media-index]');
  let mediaItems = [];
  let mediaRequest = 0;
  let selectedMedia = -1;
  try {
    const parsed = JSON.parse(byId('media-data')?.textContent || '[]');
    if (Array.isArray(parsed)) mediaItems = parsed;
  } catch (_) { /* The static poster and controls remain usable if optional metadata is malformed. */ }

  function assetURL(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    const path = value.trim();
    if (/^(?:\.\.?\/|\/|https?:\/\/)/i.test(path)) return path;
    if (path.startsWith('assets/')) return `./${path}`;
    return `./assets/github/${path}`;
  }
  function showMediaStatus(message = '') {
    if (!mediaStatus) return;
    if (message && !mediaMessage) {
      mediaMessage = document.createElement('span');
      mediaMessage.dataset.mediaMessage = '';
      // Replace only the initial plain-text message; retain the live download link.
      [...mediaStatus.childNodes].forEach(node => { if (node.nodeType === 3) node.remove(); });
      mediaStatus.insertBefore(mediaMessage, mediaStatus.firstChild);
    }
    if (mediaMessage) mediaMessage.textContent = message ? `${message} ` : '';
    mediaStatus.hidden = !message;
    if (mediaOpen) mediaOpen.hidden = !message;
  }
  function updateMediaAspect(item) {
    const width = Number(item?.width) || player?.videoWidth;
    const height = Number(item?.height) || player?.videoHeight;
    if (mediaFrame && width > 0 && height > 0) mediaFrame.style.setProperty('--media-aspect', `${width} / ${height}`);
  }
  function reportMediaError(error) {
    if (error?.name === 'AbortError' || error?.code === 1) return;
    if (error?.name === 'NotAllowedError') {
      showMediaStatus('浏览器暂未允许自动播放，请点击播放器中的播放按钮。');
      return;
    }
    showMediaStatus('当前片段暂时未能加载，可通过“打开视频文件”重试。');
  }
  function selectMedia(index, { autoplay = false } = {}) {
    if (!player || !Number.isInteger(index) || !mediaItems[index]) return;
    const item = mediaItems[index];
    const videoURL = assetURL(item.video);
    if (!videoURL) return;
    const source = player.querySelector('source');
    const request = ++mediaRequest;
    selectedMedia = index;
    player.pause();
    player.preload = 'metadata';
    const posterURL = assetURL(item.poster);
    if (posterURL) player.poster = posterURL;
    if (source) { source.src = videoURL; source.type = 'video/mp4'; }
    else player.src = videoURL;
    player.setAttribute('aria-label', item.title || '算法效果演示');
    if (mediaTitle) mediaTitle.textContent = item.title || '算法效果演示';
    if (mediaDescription) mediaDescription.textContent = item.desc || '';
    if (mediaOpen) mediaOpen.href = videoURL;
    mediaButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.mediaIndex) === index)));
    showMediaStatus();
    updateMediaAspect(item);
    player.load();
    if (autoplay) {
      const bounds = player.getBoundingClientRect();
      if (bounds.bottom <= 0 || bounds.top >= innerHeight) {
        player.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
      const promise = player.play();
      if (promise?.catch) promise.catch(error => { if (request === mediaRequest) reportMediaError(error); });
    }
  }
  if (player) {
    listen(player, 'error', () => reportMediaError(player.error));
    listen(player.querySelector('source'), 'error', () => reportMediaError(player.error));
    listen(player, 'loadedmetadata', () => updateMediaAspect(mediaItems[selectedMedia]));
    listen(player, 'loadeddata', () => showMediaStatus());
    listen(player, 'playing', () => {
      showMediaStatus();
      all('video').forEach(other => { if (other !== player) other.pause(); });
    });
    mediaButtons.forEach(button => listen(button, 'click', () => {
      const index = Number(button.dataset.mediaIndex);
      selectMedia(index, { autoplay: true });
    }));
    const current = mediaButtons.find(button => button.getAttribute('aria-pressed') === 'true');
    const initialIndex = current ? Number(current.dataset.mediaIndex) : mediaItems[2] ? 2 : 0;
    selectMedia(initialIndex);
    if ('IntersectionObserver' in window) {
      const videoObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (!entry.isIntersecting) player.pause(); });
      });
      videoObserver.observe(player);
    }
    listen(document, 'visibilitychange', () => { if (document.hidden) player.pause(); });
  }

  // Motion is decorative. Without it, the original HTML remains fully visible and usable.
  const revealNodes = all('[data-reveal]');
  let revealObserver;
  function configureReveals() {
    revealObserver?.disconnect();
    if (reducedMotion() || !('IntersectionObserver' in window)) {
      revealNodes.forEach(node => { node.classList.remove('reveal-ready'); node.classList.add('is-visible'); });
      return;
    }
    try {
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.06, rootMargin: '0px 0px -18px 0px' });
      revealNodes.forEach(node => {
        if (node.classList.contains('is-visible')) return;
        node.classList.add('reveal-ready');
        revealObserver.observe(node);
      });
    } catch (_) {
      revealNodes.forEach(node => { node.classList.remove('reveal-ready'); node.classList.add('is-visible'); });
    }
  }
  configureReveals();

  const progress = byId('reading-progress');
  const hero = byId('horizon');
  const catalog = byId('light');
  const filterBar = catalog?.querySelector('.filter-bar');
  // This sibling stays in normal flow when the filter bar becomes sticky.
  const catalogFlowAnchor = filterBar?.nextElementSibling;
  const backTop = byId('back-to-top');
  const navLinks = all('a[data-nav]');
  const navTargets = navLinks.map(link => {
    try { return { link, target: byId(decodeURIComponent(new URL(link.href, location.href).hash.slice(1))) }; }
    catch (_) { return { link, target: null }; }
  }).filter(item => item.target);
  let scrollQueued = false;
  let lastNavTarget = null;
  let catalogGeometryDirty = true;
  let catalogProgressStart = 0;
  let lastCatalogProgress = -1;

  function updateScroll() {
    scrollQueued = false;
    const y = window.scrollY || document.documentElement.scrollTop || 0;
    const available = Math.max(0, document.documentElement.scrollHeight - innerHeight);
    // Read geometry once per section before writing styles or attributes.
    const sectionRects = new Map();
    const readRect = node => {
      if (!node) return null;
      if (!sectionRects.has(node)) sectionRects.set(node, node.getBoundingClientRect());
      return sectionRects.get(node);
    };
    const heroRect = readRect(hero);
    let current = null;
    const readingLine = Math.min(220, innerHeight * 0.3);
    for (const item of navTargets) {
      const rect = readRect(item.target);
      if (!item.target.hidden && rect.top <= readingLine && rect.bottom > readingLine) current = item.target;
    }
    const catalogRect = readRect(catalog);
    let catalogProgress = 0;
    if (catalogRect && filterBar) {
      if (catalogGeometryDirty) {
        const stickyTop = parseFloat(getComputedStyle(filterBar).top) || 0;
        const flowTop = catalogFlowAnchor
          ? readRect(catalogFlowAnchor).top - filterBar.offsetHeight
          : readRect(filterBar).top;
        catalogProgressStart = flowTop - catalogRect.top - stickyTop;
        catalogGeometryDirty = false;
      }
      const distance = Math.max(1, catalogRect.height - catalogProgressStart);
      catalogProgress = Math.max(0, Math.min(1, (-catalogRect.top - catalogProgressStart) / distance));
    }
    if (progress) progress.style.transform = `scaleX(${available > 0 ? Math.min(1, y / available) : 0})`;
    if (backTop) backTop.hidden = y < Math.min(640, innerHeight * 0.8);
    if (heroRect) {
      const ratio = reducedMotion() ? 0 : Math.max(0, Math.min(1, -heroRect.top / Math.max(1, heroRect.height)));
      hero.style.setProperty('--hero-progress', String(ratio));
    }
    if (filterBar && catalogProgress !== lastCatalogProgress) {
      filterBar.style.setProperty('--catalog-progress', String(catalogProgress));
      lastCatalogProgress = catalogProgress;
    }
    if (current !== lastNavTarget) {
      navTargets.forEach(item => {
        if (item.target === current) item.link.setAttribute('aria-current', 'location');
        else item.link.removeAttribute('aria-current');
      });
      lastNavTarget = current;
    }
  }
  function scheduleScrollUpdate() {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(updateScroll);
  }
  function refreshScrollGeometry() {
    catalogGeometryDirty = true;
    scheduleScrollUpdate();
  }
  listen(window, 'scroll', scheduleScrollUpdate, { passive: true });
  listen(window, 'resize', refreshScrollGeometry, { passive: true });
  listen(window, 'load', refreshScrollGeometry);
  listen(motion, 'change', () => { configureReveals(); scheduleScrollUpdate(); });
  if (backTop?.tagName === 'BUTTON') listen(backTop, 'click', () => scrollToNode(hero));

  if (groups.length) {
    applyCatalog();
    syncLocation({ scroll: Boolean(location.hash) });
  }
  updateScroll();
})();
