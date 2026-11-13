(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const all = (selector, parent = document) => [...parent.querySelectorAll(selector)];
  const data = JSON.parse($('studio-catalog').textContent);
  const groups = new Map(data.groups.map(g => [g.id,g]));
  const items = new Map(data.groups.flatMap(g=>g.items.map(item=>[item.id,item])));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const view = window.StudioViews;
  const menu = $('mobile-menu');
  const toggle = $('menu-toggle');
  let paused = reduced.matches;
  let frame = 0;
  let startTime = performance.now();

  function closeMenu(focus = false) {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','打开导航');
    toggle.innerHTML = view.icon('menu');
    if(focus) toggle.focus();
  }
  toggle.addEventListener('click',()=>{
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    menu.hidden = !open;
    toggle.setAttribute('aria-expanded',String(open));
    toggle.setAttribute('aria-label',open?'关闭导航':'打开导航');
    toggle.innerHTML=view.icon(open?'x':'menu');
  });
  all('a',menu).forEach(a=>a.addEventListener('click',()=>closeMenu()));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden) closeMenu(true)});
  document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!toggle.contains(e.target))closeMenu()});
  window.addEventListener('resize',()=>{if(innerWidth>600)closeMenu(); schedule()},{passive:true});

  function bindComparisons(parent) {
    all('[data-compare]',parent).forEach(box=>{
      const range=box.querySelector('input');
      if(range.dataset.bound)return;
      range.dataset.bound='true';
      const update=()=>{
        box.style.setProperty('--split',range.value+'%');
        const before=box.querySelector('.before');
        const after=box.querySelector('.after');
        range.setAttribute('aria-valuetext',`${before.textContent} ${range.value}%，${after.textContent} ${100-Number(range.value)}%`);
        before.style.opacity=Number(range.value)<15?'0':'1';
        after.style.opacity=Number(range.value)>85?'0':'1';
      };
      range.addEventListener('input',update);
      update();
    });
  }
  const videoObserver = new IntersectionObserver(entries=>{
    entries.forEach(({target,isIntersecting})=>{
      target.dataset.inview=String(isIntersecting);
      if(isIntersecting&&!reduced.matches&&target.dataset.userPaused!=='true') target.play().catch(()=>{});
      else if(!isIntersecting&&!target.paused){target.dataset.autoPause='true';target.pause();}
    });
  },{threshold:.35});
  function watchVideos(parent) {
    all('[data-inview-video]',parent).forEach(video=>{
      if(video.dataset.bound)return;
      video.dataset.bound='true';
      videoObserver.observe(video);
      video.addEventListener('pause',()=>{
        if(video.dataset.autoPause==='true'){delete video.dataset.autoPause;return}
        if(video.dataset.inview==='true')video.dataset.userPaused='true';
      });
      video.addEventListener('play',()=>{delete video.dataset.autoPause;video.dataset.userPaused='false'});
    });
  }
  function selectAlgorithm(id,{remember=true,scroll=false}={}) {
    const item=items.get(id);
    if(!item)return;
    const groupId=id.split('-')[0];
    const section=$('cap-panel-'+groupId);
    const feature=$('feature-'+groupId);
    if(feature.dataset.selected!==id){
      all('video',feature).forEach(v=>{videoObserver.unobserve(v);v.pause()});
      feature.innerHTML=view.feature(item,groupId);
      feature.dataset.selected=id;
      feature.classList.remove('is-switching');
      requestAnimationFrame(()=>feature.classList.add('is-switching'));
      all('[data-algorithm]',section).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.algorithm===id)));
      bindComparisons(feature);watchVideos(feature);
    }
    if(remember)history.pushState({algorithm:id},'', '#algorithm-'+id);
    if(scroll || innerWidth<=850)feature.scrollIntoView({block:'start',behavior:reduced.matches?'instant':'smooth'});
  }
  all('[data-algorithm]').forEach(button=>button.addEventListener('click',()=>selectAlgorithm(button.dataset.algorithm)));
  function routeHash({initial=false}={}) {
    const hash=location.hash;
    const algorithm=hash.match(/^#algorithm-(\d)-(\d+)$/);
    if(algorithm){selectAlgorithm(`${algorithm[1]}-${algorithm[2]}`,{remember:false,scroll:true});return}
    const category=hash.match(/^#(?:cap-tab-(\d)|algorithm-(\d)-overview)$/);
    if(category){const node=$('cap-panel-'+(category[1]||category[2]));node?.scrollIntoView({block:'start',behavior:initial?'instant':'smooth'});return}
    const comparisons={'#crack-compare':'5-5','#change-compare':'2-1','#color-compare':'3-5'};
    if(comparisons[hash]){selectAlgorithm(comparisons[hash],{remember:false,scroll:true});return}
    const aliases={'#selected-work':'cap-panel-0','#process':'light','#solutions':'light','#contact':'about','#deliverables':'about'};
    if(aliases[hash])$(aliases[hash])?.scrollIntoView({block:'start',behavior:initial?'instant':'smooth'});
  }
  window.addEventListener('popstate',()=>routeHash());
  window.addEventListener('hashchange',()=>routeHash());
  all('[data-chapter-link]').forEach(link=>link.addEventListener('click',()=>{
    // Normal anchors keep all six sections visible and retain browser history.
    closeMenu();
  }));
  all('[data-video]').forEach(button=>button.addEventListener('click',()=>{
    const item=data.videos.find(v=>v.id===button.dataset.video);
    if(!item)return;
    const video=$('gallery-video');
    video.pause();video.src=item.video;video.poster=item.poster;
    video.setAttribute('aria-label',item.title);video.dataset.userPaused='false';video.load();video.play().catch(()=>{});
    $('gallery-title').textContent=item.title;$('gallery-description').textContent=item.desc;
    all('[data-video]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  }));

  const hero=$('horizon');
  const heroVisual=hero?.querySelector('.hero-visual');
  const chapterLinks=all('[data-chapter-link]');
  const chapterNodes=all('.algorithm-chapter');
  let activeChapter='0';
  function paint(now) {
    frame=0;
    const y=window.scrollY;
    const progress=y/Math.max(1,document.documentElement.scrollHeight-innerHeight);
    $('reading-progress').style.transform=`scaleX(${progress})`;
    $('site-header').classList.toggle('scrolled',y>35);
    const heroVisible=Boolean(heroVisual&&y<hero.offsetHeight);
    if(heroVisible&&!paused&&!reduced.matches){
      const p=Math.max(0,Math.min(1,y/Math.max(1,hero.offsetHeight*.65)));
      const idle=Math.sin((now-startTime)/6000)*3;
      heroVisual.style.setProperty('--hero-reveal',`${Math.max(18,66-p*45+idle)}%`);
      heroVisual.style.setProperty('--hero-scale',String(1+p*.035));
      heroVisual.style.setProperty('--hero-y',`${-p*16}px`);
    }
    const top=Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header'))+Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--index'))+innerHeight*.22;
    let current='0';
    chapterNodes.forEach(node=>{if(node.getBoundingClientRect().top<=top)current=node.dataset.group});
    if(current!==activeChapter){
      activeChapter=current;
      chapterLinks.forEach(link=>{
        if(link.dataset.chapterLink===current)link.setAttribute('aria-current','true');
        else link.removeAttribute('aria-current');
      });
    }
    if(heroVisible&&!paused&&!reduced.matches&&!document.hidden)frame=requestAnimationFrame(paint);
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(paint)}
  function reflectMotion(){
    if(!$('motion-toggle')){schedule();return}
    $('motion-toggle').setAttribute('aria-pressed',String(paused));
    $('motion-toggle').setAttribute('aria-label',paused?'开启首屏动效':'暂停首屏动效');
    $('motion-toggle').innerHTML=view.icon(paused?'play':'pause')+`<span>${paused?'开启动效':'暂停动效'}</span>`;
    schedule();
  }
  $('motion-toggle')?.addEventListener('click',()=>{paused=!paused;reflectMotion()});
  reduced.addEventListener('change',()=>{paused=reduced.matches;reflectMotion();if(paused)all('video').forEach(v=>v.pause())});
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){cancelAnimationFrame(frame);frame=0;all('video').forEach(v=>{if(!v.paused){v.dataset.autoPause='true';v.pause()}})}
    else {schedule();all('[data-inview-video]').forEach(v=>{if(v.dataset.inview==='true'&&v.dataset.userPaused!=='true'&&!reduced.matches)v.play().catch(()=>{})})}
  });
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);frame=0;videoObserver.disconnect()});
  window.addEventListener('pageshow',event=>{if(event.persisted){all('[data-inview-video]').forEach(v=>videoObserver.observe(v));schedule()}});
  document.body.classList.add('motion-ready');
  bindComparisons(document);watchVideos(document);reflectMotion();
  if(location.hash)requestAnimationFrame(()=>routeHash({initial:true}));
})();
