/* Shared static/browser rendering keeps every algorithm readable without JavaScript. */
(function (root) {
  'use strict';
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => `<img class="icon" src="./assets/chapter-design/icons/${name}.svg" width="20" height="20" alt="" aria-hidden="true">`;
  function prepare(data) {
    const catalog = JSON.parse(JSON.stringify(data));
    const field = catalog.groups[0].items.find(item => item.id === '0-1');
    Object.assign(field, {compareBefore:'./assets/chapter-design/field-before.jpg',compareAfter:'./assets/chapter-design/field-after.jpg',beforeLabel:'原始影像',afterLabel:'边界示意',illustrative:true,mediaCaption:'识别农田边界，呈现地块轮廓。'});
    catalog.groups[4].featuredId = '4-2';
    return catalog;
  }
  function comparison(item) {
    const before = escape(item.beforeLabel || '原始影像');
    const after = escape(item.afterLabel || '处理结果');
    return `<div class="comparison" data-compare style="--split:50%"><img src="${escape(item.compareBefore)}" alt="${escape(item.name)}：${before}" loading="lazy"><img class="compare-after" src="${escape(item.compareAfter)}" alt="${escape(item.name)}：${after}" loading="lazy"><span class="comparison-handle"><span>${icon('chevrons-left-right')}</span></span><span class="compare-label before">${before}</span><span class="compare-label after">${after}</span><input type="range" min="0" max="100" value="50" aria-label="${escape(item.name)}前后对比，左右拖动或使用方向键" aria-valuetext="${before} 50%，${after} 50%"></div>`;
  }
  function feature(item, groupId) {
    const type = item.compareBefore ? 'comparison' : item.video ? 'video' : 'image';
    let media = type === 'comparison' ? comparison(item) : type === 'video' ? `<video src="${escape(item.video)}" poster="${escape(item.image)}" controls muted loop playsinline preload="metadata" data-inview-video aria-label="${escape(item.name)}视频演示"></video>` : `<img src="${escape(item.image)}" alt="${escape(item.alt || item.name + '示例画面')}" loading="lazy" decoding="async">`;
    const label = item.illustrative ? '效果示意' : item.compareBefore ? (item.id === '2-1' ? '双期影像对照' : '前后对比') : '示例画面';
    const source = item.id === '5-5' ? './assets/cases/crack.png' : item.example?.startsWith('#') ? item.image : (item.example || item.image);
    const sourceLabel = ['2-1','3-5'].includes(item.id) ? '查看原始影像' : '查看完整示例';
    const note = item.id === '0-3' ? '示例呈现林木覆盖与类别分布。' : item.id === '2-1' ? '两期观测影像用于变化对照。' : item.id === '2-4' ? '选址分析方法示例。' : '';
    const caption = item.id === '3-5' ? '对比曝光补偿前后的影像，观察色彩一致性的改善。' : (item.mediaCaption || item.description);
    return `<div class="stage-frame is-${type}">${media}</div><figcaption><div class="feature-caption"><h3 id="feature-title-${groupId}">${escape(item.name)}</h3><p>${escape(caption)}</p></div><div class="feature-meta"><span>${label}${type === 'comparison' ? ' · 拖动查看' : ''}</span><a href="${escape(source)}" target="_blank" rel="noopener">${sourceLabel} ${icon('arrow-up-right')}</a></div><dl class="feature-details"><div><dt>输入</dt><dd>${escape(item.input)}</dd></div><div><dt>输出</dt><dd>${escape(item.output)}</dd></div></dl>${note ? `<p class="feature-notice">${note}</p>` : ''}</figcaption>`;
  }
  function row(item, active, groupId) {
    const thumb = item.illustrative ? item.compareBefore : item.image;
    return `<li id="algorithm-${escape(item.id)}"><button class="algorithm-choice" type="button" data-algorithm="${escape(item.id)}" aria-pressed="${active}" aria-controls="feature-${groupId}"><img class="algorithm-thumb" src="${escape(thumb)}" alt="" width="96" height="63" loading="lazy"><span><strong>${escape(item.name)}</strong><small>${escape(item.shortDescription || item.description)}</small></span>${icon('arrow-up-right')}</button></li>`;
  }
  function chapter(group, index) {
    const selected = group.items.find(item => item.id === group.featuredId) || group.items[0];
    const descriptions = ['从影像中识别建筑、水体与地块。','从静态识别，到连续追踪。','让不同时间的影像，呈现变化。','还原纹理，改善图像的可读性。','识别作物与生物，观察生态变化。','从巡检影像中寻找需要关注的异常。'];
    return `<section class="algorithm-chapter ${index % 2 ? 'reverse' : ''}" id="cap-panel-${group.id}" data-group="${group.id}" aria-labelledby="chapter-title-${group.id}"><div class="shell"><div class="chapter-kicker" id="algorithm-${group.id}-overview"><em>${String(index+1).padStart(2,'0')} /</em><span>${escape(group.title)}</span></div><div class="chapter-heading"><h2 id="chapter-title-${group.id}">${escape(group.headline)}</h2><p>${descriptions[index]}</p></div><div class="chapter-body"><figure class="chapter-feature" id="feature-${group.id}" aria-labelledby="feature-title-${group.id}" data-selected="${selected.id}">${feature(selected,group.id)}</figure><ul class="algorithm-list" aria-label="${escape(group.title)}具体算法">${group.items.map(item => row(item,item.id===selected.id,group.id)).join('')}</ul></div></div></section>`;
  }
  const api = {escape,icon,prepare,feature,row,chapter};
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.StudioViews = api;
})(typeof window === 'undefined' ? globalThis : window);
