const $ = id => document.getElementById(id);

/** 一处改联系方式，全站同步。占位信息，上线前换成真实值即可。 */
const STUDIO = {
 email: 'hello@ztd-algo.cn',
 wechat: 'ztd_algo',
 phone: '138-0000-8866',
 mailSubject: '算法定制合作咨询',
 mailBody: [
  '您好，我们希望先做可行性评估：',
  '1. 要识别/定位的目标：',
  '2. 样本情况（可脱敏）：',
  '3. 期望验收指标：',
  '4. 运行与接入环境：',
 ].join('\n'),
};

function mailtoHref(email = STUDIO.email) {
 const subject = encodeURIComponent(STUDIO.mailSubject);
 const body = encodeURIComponent(STUDIO.mailBody);
 return `mailto:${email}?subject=${subject}&body=${body}`;
}

function bindStudioContact() {
 document.querySelectorAll('[data-contact="email"], [data-contact="email-cta"]').forEach(node => {
  node.setAttribute('href', node.dataset.contact === 'email-cta' ? mailtoHref() : `mailto:${STUDIO.email}`);
  if (node.dataset.contact === 'email') node.textContent = STUDIO.email;
 });
 document.querySelectorAll('[data-contact="phone"]').forEach(node => {
  node.setAttribute('href', `tel:${STUDIO.phone.replace(/\D/g, '')}`);
  node.textContent = STUDIO.phone;
 });
 document.querySelectorAll('[data-contact="wechat"]').forEach(button => {
  button.dataset.copy = STUDIO.wechat;
  button.textContent = STUDIO.wechat;
  button.addEventListener('click', async () => {
   const tip = button.parentElement?.querySelector('.contact-copy-tip');
   try {
    await navigator.clipboard.writeText(STUDIO.wechat);
    if (tip) {
     tip.hidden = false;
     window.setTimeout(() => { tip.hidden = true; }, 1600);
    }
   } catch (_) {
    window.prompt('复制微信号：', STUDIO.wechat);
   }
  });
 });
}
bindStudioContact();

function applyTheme(id = 'azure') {
 document.documentElement.dataset.theme = id;
 const meta = document.querySelector('meta[name="theme-color"]');
 if (meta) meta.content = getComputedStyle(document.documentElement).getPropertyValue('--dark').trim() || '#0c0e12';
}
// 正式站暂锁定「科技冷渐变」；其他主题仍保留在 themes.css，便于后续切换。
applyTheme('azure');
try { localStorage.setItem('studio-theme', 'azure'); } catch (_) {}

function enhanceResultPanels() {
 document.querySelectorAll('.algorithm-row-visual').forEach(visual => {
  if (visual.dataset.enhanced) return;
  visual.dataset.enhanced = '1';
  const head = document.createElement('div');
  head.className = 'result-panel-head';
  head.innerHTML = '<span>识别结果</span><span>可复核标注</span>';
  const stage = document.createElement('div');
  stage.className = 'result-stage';
  while (visual.firstChild) stage.appendChild(visual.firstChild);
  visual.append(head, stage);
 });
 document.querySelectorAll('.algorithm-row-figure > figcaption').forEach(caption => {
  if (caption.dataset.enhanced) return;
  caption.dataset.enhanced = '1';
  caption.classList.add('result-caption');
 });
 document.querySelectorAll('.algorithm-row-io dt').forEach(dt => {
  if (dt.textContent.trim() === '输入') dt.textContent = '输入数据';
  if (dt.textContent.trim() === '输出') dt.textContent = '交付输出';
 });
 document.querySelectorAll('.algorithm-row-application > span').forEach(span => {
  if (span.textContent.trim() === '应用场景') span.textContent = '业务场景';
 });
}
enhanceResultPanels();

const openMedia = [
  {
    "id": "traffic-tracking",
    "file": "traffic.gif",
    "title": "交通目标持续追踪",
    "desc": "在道路视频中关联目标标识，形成可复核的运动轨迹。",
    "repo": "tryolabs/norfair",
    "license": "BSD-3-Clause",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/traffic.gif",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "repository": "https://github.com/tryolabs/norfair",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/README.md",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "traffic-tracking.mp4",
    "poster": "traffic-tracking.jpg",
    "original_sha256": "1f7bd15d1ad0451864646eba04270b5463d13e0c00a1f95417bda7dfc4b742cc",
    "transform": "Up to 12 seconds; muted H.264 MP4; max width 960; derived poster at second 1."
  },
  {
    "id": "prompt-matting",
    "title": "提示式图像抠图",
    "desc": "通过提示选择目标，展示前景与背景分离。",
    "repo": "shi-labs/Matting-Anything",
    "commit": "eb01e1c1f0016e2a4d00615b115f3b5ddcd031e4",
    "url": "https://raw.githubusercontent.com/shi-labs/Matting-Anything/eb01e1c1f0016e2a4d00615b115f3b5ddcd031e4/assets/teaser.gif",
    "source_page": "https://github.com/shi-labs/Matting-Anything/blob/eb01e1c1f0016e2a4d00615b115f3b5ddcd031e4/assets/teaser.gif",
    "license": "MIT",
    "license_file": "licenses/MATTING-ANYTHING-MIT.txt",
    "video": "prompt-matting.mp4",
    "poster": "prompt-matting.jpg",
    "original_sha256": "684f501b4512fb0a07cee9ac59952ff41edafab04ebb3ab40f681f3929cfd05c",
    "transform": "Up to 12 seconds, muted H.264, max width 960, first-frame poster."
  },
  {
    "id": "visual-annotations",
    "file": "annotation.mp4",
    "title": "多类型视觉结果标注",
    "desc": "以检测框、轮廓与标签呈现识别输出，便于业务复核。",
    "repo": "roboflow/supervision",
    "license": "MIT",
    "url": "https://github.com/roboflow/supervision/assets/26109316/691e219c-0565-4403-9218-ab5644f39bce",
    "commit": "50b4f2a7b2fc08e365c771e9ce43f47244bb056f",
    "repository": "https://github.com/roboflow/supervision",
    "source_page": "https://github.com/roboflow/supervision/blob/50b4f2a7b2fc08e365c771e9ce43f47244bb056f/README.md",
    "license_file": "licenses/SUPERVISION-MIT.txt",
    "video": "visual-annotations.mp4",
    "poster": "visual-annotations.jpg",
    "original_sha256": "e47d3d715453be6c123e6619b517d55f5c82a8544691d5be9082822023ba2172",
    "transform": "Up to 12 seconds; muted H.264 MP4; max width 960; derived poster at second 1."
  },
  {
    "id": "tracking-3d",
    "file": "3d.gif",
    "title": "三维目标追踪",
    "desc": "在三维空间中关联目标位置，观察轨迹与持续跟踪结果。",
    "repo": "tryolabs/norfair",
    "license": "BSD-3-Clause",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/3d.gif",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "repository": "https://github.com/tryolabs/norfair",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/README.md",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "tracking-3d.mp4",
    "poster": "tracking-3d.jpg",
    "original_sha256": "bfbbd79e5b3c919b779119e6b2f36f7f8a48422328393647153499dfc64a19b8",
    "transform": "Up to 12 seconds; muted H.264 MP4; max width 960; derived poster at second 1."
  },
  {
    "id": "pose-tracking",
    "file": "alphapose.gif",
    "title": "人体关键点追踪",
    "desc": "通过连续关键点展示姿态变化和跨帧关联。",
    "repo": "tryolabs/norfair",
    "license": "BSD-3-Clause",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/alphapose.gif",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "repository": "https://github.com/tryolabs/norfair",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/README.md",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "pose-tracking.mp4",
    "poster": "pose-tracking.jpg",
    "original_sha256": "6b6d0dab50ee3cd8c899ea81660b2e88c6ed0c222869d1d23ff59486c410af59",
    "transform": "Up to 12 seconds; muted H.264 MP4; max width 960; derived poster at second 1."
  },
  {
    "id": "camera-motion",
    "file": "camera_stabilization.gif",
    "title": "运动相机下的目标追踪",
    "desc": "在相机移动的画面中观察稳定的目标关联。",
    "repo": "tryolabs/norfair",
    "license": "BSD-3-Clause",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/camera_stabilization.gif",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "repository": "https://github.com/tryolabs/norfair",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/README.md",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "camera-motion.mp4",
    "poster": "camera-motion.jpg",
    "original_sha256": "08d1daf2438088be54d2567bd8ffd1a5ca1c2423886fad071e591afb6062a7f8",
    "transform": "Up to 12 seconds; muted H.264 MP4; max width 960; derived poster at second 1."
  },
  {
    "id": "pedestrian-tracking",
    "title": "行人目标追踪",
    "desc": "连续画面中的行人检测与编号。",
    "repo": "tryolabs/norfair",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/yolov5_pedestrian.gif",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/yolov5_pedestrian.gif",
    "license": "BSD-3-Clause",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "pedestrian-tracking.mp4",
    "poster": "pedestrian-tracking.jpg",
    "original_sha256": "5c8d5bf550d8a926f42dc33de6910b616c39cfc41a3dea12f33c497d85964059",
    "transform": "Up to 12 seconds, muted H.264, max width 960, first-frame poster."
  },
  {
    "id": "pose-frame-skipping",
    "title": "间隔帧姿态追踪",
    "desc": "跳帧条件下的人体关键点关联。",
    "repo": "tryolabs/norfair",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/openpose_skip_3_frames.gif",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/openpose_skip_3_frames.gif",
    "license": "BSD-3-Clause",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "pose-frame-skipping.mp4",
    "poster": "pose-frame-skipping.jpg",
    "original_sha256": "885f0973460edc0eded0ceb23bdc0eb3f9b1e2c79fe2174c244461e962337970",
    "transform": "Up to 12 seconds, muted H.264, max width 960, first-frame poster."
  },
  {
    "id": "traffic-mmdet",
    "title": "交通检测与轨迹关联",
    "desc": "基于 MMDetection 检测结果的道路目标追踪。",
    "repo": "tryolabs/norfair",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/traffic_mmdet.gif",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/traffic_mmdet.gif",
    "license": "BSD-3-Clause",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "traffic-mmdet.mp4",
    "poster": "traffic-mmdet.jpg",
    "original_sha256": "672c6ba9e61aa4d140d2362f4c1f95c84c10162d91079907db160cc9a96e0106",
    "transform": "Up to 12 seconds, muted H.264, max width 960, first-frame poster."
  },
  {
    "id": "traffic-yolov7",
    "title": "道路车辆追踪",
    "desc": "车辆检测结果在连续帧中的关联。",
    "repo": "tryolabs/norfair",
    "commit": "e517b4236f6b67a6ecf342f5df1fccb7788dbc54",
    "url": "https://raw.githubusercontent.com/tryolabs/norfair/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/yolov7_cars.gif",
    "source_page": "https://github.com/tryolabs/norfair/blob/e517b4236f6b67a6ecf342f5df1fccb7788dbc54/docs/videos/yolov7_cars.gif",
    "license": "BSD-3-Clause",
    "license_file": "licenses/NORFAIR-BSD-3-Clause.txt",
    "video": "traffic-yolov7.mp4",
    "poster": "traffic-yolov7.jpg",
    "original_sha256": "d0e9b5b09b04f5f2aeadd07d52e37e467d45a71daf2ffa88b55e2c0fe50d505e",
    "transform": "Up to 12 seconds, muted H.264, max width 960, first-frame poster."
  }
];
const mediaById=new Map(openMedia.map(item=>[item.id,item]));

const directoryTabs = [...document.querySelectorAll('.directory-index [role="tab"]')];
const directoryPanels = [...document.querySelectorAll('.directory-panel')];

function selectCapability(selected) {
 for (const tab of directoryTabs) {
  const active = tab === selected;
  tab.setAttribute('aria-selected', String(active));
  tab.tabIndex = active ? 0 : -1;
  $(tab.getAttribute('aria-controls')).hidden = !active;
 }
}
function setDirectoryHash(hash) {
 if (location.hash !== hash) history.pushState(null, '', hash);
}
directoryTabs.forEach((tab, index) => {
 tab.addEventListener('click', () => {
  selectCapability(tab);
  setDirectoryHash('#' + tab.id);
 });
 tab.addEventListener('keydown', event => {
  const offsets = {ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1};
  let next = index;
  if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = directoryTabs.length - 1;
  else if (event.key in offsets) next = (index + offsets[event.key] + directoryTabs.length) % directoryTabs.length;
  else return;
  event.preventDefault();
  const selected = directoryTabs[next];
  selectCapability(selected);
  setDirectoryHash('#' + selected.id);
  selected.focus();
 });
});
function openLinkedCapability() {
 const target = $(location.hash.slice(1));
 if (!location.hash || location.hash === '#light') selectCapability(directoryTabs[0]);
 else if (directoryTabs.includes(target)) selectCapability(target);
 else if (target?.matches('[data-algorithm], [data-category-overview]')) {
  const panel = target.closest('.directory-panel');
  selectCapability($(panel.getAttribute('aria-labelledby')));
  requestAnimationFrame(() => target.scrollIntoView({block: 'start', behavior: 'instant'}));
 }
}
document.querySelectorAll('[data-capability]').forEach(link => {
 link.addEventListener('click', event => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  const tab = $(link.dataset.capability);
  selectCapability(tab);
  setDirectoryHash(link.hash);
  tab.focus({preventScroll: true});
  $('light').scrollIntoView();
 });
});
window.addEventListener('hashchange', openLinkedCapability);
window.addEventListener('popstate', openLinkedCapability);
openLinkedCapability();

const screeningVideo = $('screening-video');
const screeningButtons = [...document.querySelectorAll('[data-screening]')];
const screeningError = $('screening-error');
function showScreeningError() {
 screeningError.hidden = false;
}
screeningVideo.addEventListener('error', showScreeningError);
screeningVideo.querySelector('source').addEventListener('error', showScreeningError);
screeningVideo.addEventListener('loadeddata', () => { screeningError.hidden = true; });
screeningButtons.forEach(button => {
 button.addEventListener('click', () => {
  const media = mediaById.get(button.dataset.screening);
  for (const choice of screeningButtons) {
   choice.setAttribute('aria-pressed', String(choice === button));
  }
  screeningVideo.poster = './assets/github/' + media.poster;
  const videoPath = './assets/github/' + media.video;
  screeningError.hidden = true;
  $('screening-download').href = videoPath;
  screeningVideo.querySelector('source').src = videoPath;
  screeningVideo.setAttribute('aria-label', media.title);
  $('screening-title').textContent = media.title;
  $('screening-description').textContent = media.desc;
  const playerBounds = screeningVideo.getBoundingClientRect();
  const headerBottom = document.querySelector('.masthead-bar').getBoundingClientRect().bottom;
  if (playerBounds.bottom <= headerBottom || playerBounds.top >= innerHeight) {
   screeningVideo.scrollIntoView({block: 'center', behavior: 'instant'});
  }
  screeningVideo.load();
  screeningVideo.play().catch(() => {});
 });
});
const fieldCompare = $('field-compare');
const fieldRange = $('field-range');
const yearBefore = fieldCompare.querySelector('.field-year-before');
const yearAfter = fieldCompare.querySelector('.field-year-after');
function updateFieldSplit() {
 const split = Number(fieldRange.value);
 fieldCompare.style.setProperty('--split', split + '%');
 yearBefore.hidden = split < 12;
 yearAfter.hidden = split > 88;
 fieldRange.setAttribute('aria-valuetext', `1999 年影像占 ${split}%，2024 年影像占 ${100 - split}%`);
}
fieldRange.addEventListener('input', updateFieldSplit);
updateFieldSplit();
fieldRange.hidden = false;

const pageVideos = [...document.querySelectorAll('main video[controls]')];
const videoVisibility = new IntersectionObserver(entries => {
 for (const entry of entries) {
  if (!entry.isIntersecting) entry.target.pause();
 }
});
pageVideos.forEach(video => {
 videoVisibility.observe(video);
 video.addEventListener('play', () => {
  for (const other of pageVideos) {
   if (other !== video) other.pause();
  }
 });
});
document.addEventListener('visibilitychange', () => {
 if (document.hidden) pageVideos.forEach(video => video.pause());
});

// Reveal is progressive: all content remains visible if motion or JS is unavailable.
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
if (!reduceMotion.matches) {
 const revealNodes = [...document.querySelectorAll('[data-reveal], .section-head, .solution, .delivery-strip, .story-card, .screening-player, .cooperation-modes article, .contact-action')];
 const revealObserver = new IntersectionObserver(entries => {
  for (const entry of entries) {
   if (!entry.isIntersecting) continue;
   entry.target.classList.add('is-visible');
   revealObserver.unobserve(entry.target);
  }
 }, {threshold: .08, rootMargin: '0px 0px -24px 0px'});
 for (const node of revealNodes) {
  node.classList.add('scroll-reveal');
  revealObserver.observe(node);
 }
 const hero = $('horizon');
 const backdrop = hero.querySelector('.hero-backdrop');
 let scheduled = false;
 let heroVisible = true;
 const heroObserver = new IntersectionObserver(entries => { heroVisible = entries[0].isIntersecting; });
 heroObserver.observe(hero);
 function updateHero() {
  if (heroVisible) {
   const shift = Math.min(Math.max(-hero.getBoundingClientRect().top, 0), hero.offsetHeight) * .16;
   backdrop.style.setProperty('--hero-shift', shift + 'px');
  }
  const available = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty('--page-progress', available > 0 ? Math.min(window.scrollY / available, 1) : 0);
  scheduled = false;
 }
 window.addEventListener('scroll', () => {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(updateHero);
 }, {passive: true});
 reduceMotion.addEventListener('change', event => {
  if (!event.matches) return;
  revealObserver.disconnect();
  revealNodes.forEach(node => node.classList.add('is-visible'));
  backdrop.style.setProperty('--hero-shift', '0px');
 });
}

const masthead = document.querySelector('.masthead');
const backTop = $('back-top');
function pageScrollY() {
 return window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
function syncChrome() {
 const y = pageScrollY();
 const compact = y > 12;
 if (masthead) {
  masthead.classList.toggle('is-compact', compact);
  const bar = masthead.querySelector('.masthead-bar');
  const topGap = compact ? 12 : 0;
  const barH = bar ? bar.getBoundingClientRect().height : 64;
  document.documentElement.style.setProperty('--header-height', `${Math.ceil(topGap + barH + 8)}px`);
 }
 if (backTop) {
  const show = y >= Math.min(480, innerHeight * 0.65);
  backTop.classList.toggle('is-visible', show);
  backTop.setAttribute('aria-hidden', String(!show));
  backTop.tabIndex = show ? 0 : -1;
 }
}
syncChrome();
window.addEventListener('scroll', syncChrome, { passive: true });
document.addEventListener('scroll', syncChrome, { passive: true, capture: true });
