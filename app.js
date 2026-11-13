(function(){
 'use strict';
 const $=id=>document.getElementById(id),all=(s,p=document)=>[...p.querySelectorAll(s)];
 const catalog=JSON.parse($('studio-catalog').textContent),views=window.StudioViews;
 const items=new Map(catalog.groups.flatMap(g=>g.items.map(i=>[i.id,i])));
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const menu=$('mobile-menu'),menuToggle=$('menu-toggle'),hero=$('horizon'),visual=$('tech-visual');
 let route='home',currentGroup='0',raf=0;
 const heroModes=['reconstruction','terrain','tracking'],sceneDuration=11000;
 let heroMode='reconstruction',heroAdvanceTimer=0,heroProgress=null,heroKeyboardPause=false;
 const sceneCopy={
  terrain:{label:'遥感影像分析',title:'解析地表。',body:'从遥感影像中识别建筑、水体与植被。<br>把复杂地表，转化为清晰的空间信息。',eyebrow:'02 / LAND COVER',description:'单张影像 · 区分建筑、植被与水体',legendLabel:'地物分类图例',legend:[['#278ec0','水体'],['#46a89b','植被'],['#65839b','建筑']]},
  tracking:{label:'视觉目标追踪',title:'追踪目标。',body:'从连续画面中定位目标、关联轨迹。<br>让运动的每一刻，都有迹可循。',eyebrow:'03 / OBJECT TRACKING',description:'连续画面 · 关联同一目标的运动轨迹',legendLabel:'追踪图例',legend:[['#147ccc','目标'],['#34c7e6','轨迹']]},
  reconstruction:{label:'三维空间重建',title:'重建空间。',body:'从离散点云到连续结构。<br>重建物体轮廓，理解三维空间。',eyebrow:'01 / 3D RECONSTRUCTION',description:'离散点云 · 空间对齐 · 曲面重建',legendLabel:'重建图例',legend:[['#34c7e6','采样点'],['#147ccc','结构网格']]}
 };
 function stopHeroCycle(){clearTimeout(heroAdvanceTimer);heroAdvanceTimer=0;if(heroProgress){heroProgress.cancel();heroProgress=null}}
 function scheduleHeroCycle(){
  stopHeroCycle();
  if(route!=='home'||document.hidden||reduce.matches||heroKeyboardPause)return;
  const progress=hero.querySelector(`[data-hero-mode="${heroMode}"] .hero-progress`);
  if(progress)heroProgress=progress.animate([{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{duration:sceneDuration,easing:'linear',fill:'forwards'});
  heroAdvanceTimer=setTimeout(()=>motion.setMode(heroModes[(heroModes.indexOf(heroMode)+1)%heroModes.length]),sceneDuration);
 }
 function syncSceneContext(value){
  const copy=sceneCopy[value];if(!copy)return;heroMode=value;
  $('hero-eyebrow').textContent=copy.label;$('hero-title').innerHTML=`以算法，<br><span>${copy.title}</span>`;$('hero-sub').innerHTML=copy.body;
  $('scene-overline').textContent=copy.eyebrow;$('hero-description').textContent=copy.description;$('hero-legend').setAttribute('aria-label',copy.legendLabel);$('hero-legend').innerHTML=copy.legend.map(([color,label])=>`<span><i style="--swatch:${color}" aria-hidden="true"></i>${label}</span>`).join('');
  if(!reduce.matches){[hero.querySelector('.hero-message'),hero.querySelector('.scene-caption'),$('hero-motion')].forEach(el=>{el.getAnimations().forEach(a=>a.cancel());el.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)'})})}
  scheduleHeroCycle();
 }
 hero.addEventListener('hero-mode-change',event=>syncSceneContext(event.detail.mode));
 syncSceneContext('reconstruction');
 const motion=window.StudioHeroMotion;motion.init({canvas:$('hero-motion'),container:hero,modeButtons:all('[data-hero-mode]'),statusNode:$('hero-status')});
 const videoObserver=new IntersectionObserver(entries=>entries.forEach(({target:v,isIntersecting:shown,intersectionRatio:ratio})=>{v.dataset.inview=String(shown);if(shown&&ratio>=.3&&!document.hidden&&v.closest('.app-view')?.id==='view-'+route&&!reduce.matches&&v.dataset.userPaused!=='true')v.play().catch(()=>{});else if(!shown&&!v.paused){v.dataset.autoPause='true';v.pause()}}),{threshold:.3});
 function bindVideos(parent){all('video',parent).forEach(v=>{if(!v.dataset.bound){v.dataset.bound='true';v.addEventListener('error',()=>console.error('Video playback error',v.error?.code,v.error?.message,v.currentSrc));v.addEventListener('pause',()=>{if(v.dataset.autoPause==='true'){delete v.dataset.autoPause;return}if(v.dataset.inview==='true')v.dataset.userPaused='true'});v.addEventListener('play',()=>{delete v.dataset.autoPause;v.dataset.userPaused='false'})}videoObserver.observe(v)})}
 function resumeVideos(){all('video',$('view-'+route)).forEach(v=>{const r=v.getBoundingClientRect();if(!document.hidden&&!reduce.matches&&v.dataset.userPaused!=='true'&&r.width>0&&r.top<innerHeight*.85&&r.bottom>innerHeight*.15)v.play().catch(()=>{})})}
 function pauseVideos(){all('video').forEach(v=>{if(!v.paused){v.dataset.autoPause='true';v.pause()}})}
 function bindComparisons(parent){all('[data-compare]',parent).forEach(box=>{const input=box.querySelector('input');if(input.dataset.bound)return;input.dataset.bound='true';const update=()=>{box.style.setProperty('--split',input.value+'%');const before=box.querySelector('.before'),after=box.querySelector('.after');input.setAttribute('aria-valuetext',`${before.textContent} ${input.value}%，${after.textContent} ${100-Number(input.value)}%`);before.style.opacity=Number(input.value)<15?'0':'1';after.style.opacity=Number(input.value)>85?'0':'1'};input.addEventListener('input',update);update()})}
 function selectAlgorithm(id){const item=items.get(id);if(!item)return;const group=id.split('-')[0],section=$('cap-panel-'+group),feature=$('feature-'+group);if(feature.dataset.selected!==id){all('video',feature).forEach(v=>{videoObserver.unobserve(v);v.pause()});feature.innerHTML=views.feature(item,group);feature.dataset.selected=id;feature.classList.remove('is-switching');requestAnimationFrame(()=>feature.classList.add('is-switching'));all('[data-algorithm]',section).forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.algorithm===id)));bindComparisons(feature);bindVideos(feature)}}
 function closeMenu(focus=false){menu.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','打开导航');menuToggle.innerHTML=views.icon('menu');if(focus)menuToggle.focus()}
 menuToggle.addEventListener('click',()=>{const open=menuToggle.getAttribute('aria-expanded')!=='true';menu.hidden=!open;menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'关闭导航':'打开导航');menuToggle.innerHTML=views.icon(open?'x':'menu')});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden)closeMenu(true)});document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!menuToggle.contains(e.target))closeMenu()});
 function parseRoute(){const hash=location.hash;let match=hash.match(/^#\/(home|algorithms|demos|about)(?:\/(\d))?(?:\/(\d-\d+))?$/);if(match)return {name:match[1],group:match[2]||'0',item:match[3]};match=hash.match(/^#algorithm-(\d)-(\d+)$/);if(match)return{name:'algorithms',group:match[1],item:`${match[1]}-${match[2]}`};match=hash.match(/^#(?:cap-panel-|cap-tab-)(\d)$/);if(match)return{name:'algorithms',group:match[1]};const legacy={'#light':'algorithms','#motion-examples':'demos','#live-demo':'demos','#about':'about','#contact':'about'};return{name:legacy[hash]||'home',group:'0'}}
 function renderRoute({reset=true}={}){let next=parseRoute();if(!catalog.groups.some(g=>g.id===next.group))next.group='0';const changing=route!==next.name||currentGroup!==next.group;if(changing)pauseVideos();route=next.name;currentGroup=next.group;document.body.className='home-page app-route-'+route;all('.app-view').forEach(el=>{el.hidden=el.id!=='view-'+route;el.classList.remove('view-enter')});const active=$('view-'+route);if(changing&&!reduce.matches)requestAnimationFrame(()=>active.classList.add('view-enter'));all('.algorithm-chapter').forEach(el=>el.hidden=el.dataset.group!==currentGroup);all('[data-chapter-link]').forEach(a=>{if(a.dataset.chapterLink===currentGroup)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')});if(route==='algorithms'){const group=catalog.groups.find(g=>g.id===currentGroup);selectAlgorithm(group.items.some(i=>i.id===next.item)?next.item:group.featuredId);}all('.primary-nav>a,.mobile-menu>a').forEach(a=>{if(a.hash.startsWith('#/'+route))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});closeMenu();if(reset)window.scrollTo({top:0,behavior:'instant'});document.title=({home:'以算法，理解世界',algorithms:'算法目录',demos:'动态演示',about:'关于我们'}[route])+'｜志通达算法研发工作室';bindVideos(active);if(changing){const heading=active.querySelector('h1,h2');if(heading){heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true})}}motion.setActive(route==='home');scheduleHeroCycle();resumeVideos();if(next.item&&innerWidth<=850)$('feature-'+currentGroup).scrollIntoView({block:'start',behavior:'instant'});schedule()}
 document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#/"]');if(!a||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.button>0)return;e.preventDefault();if(location.hash!==a.hash)history.pushState(null,'',a.hash);renderRoute()});
 all('[data-algorithm]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.algorithm;history.pushState(null,'',`#/algorithms/${id.split('-')[0]}/${id}`);selectAlgorithm(id);if(innerWidth<=850)$('feature-'+id.split('-')[0]).scrollIntoView({block:'start',behavior:'instant'})}));
 window.addEventListener('popstate',()=>renderRoute());window.addEventListener('hashchange',()=>renderRoute());
 all('[data-demo]').forEach(b=>b.addEventListener('click',()=>{const item=catalog.videos.find(v=>v.id===b.dataset.demo);if(!item)return;const video=$('home-video');if(!video.paused){video.dataset.autoPause='true';video.pause()}video.src=item.video;video.poster=item.poster;video.style.setProperty('--video-ratio',item.width+'/'+item.height);video.setAttribute('aria-label',item.title);video.dataset.userPaused='false';video.load();video.play().catch(()=>{});$('demo-name').textContent=item.title;$('demo-description').textContent=item.desc;$('demo-index').textContent=String(catalog.videos.indexOf(item)+1).padStart(2,'0');all('[data-demo]').forEach(btn=>btn.setAttribute('aria-pressed',String(btn===b)));if(innerWidth<=1100)document.querySelector('.demo-stage').scrollIntoView({block:'start',behavior:reduce.matches?'instant':'smooth'})}));
 function paint(){raf=0;const y=scrollY;$('site-header').classList.toggle('scrolled',y>35);$('reading-progress').style.transform=`scaleX(${y/Math.max(1,document.documentElement.scrollHeight-innerHeight)})`;}
 function schedule(){if(!raf)raf=requestAnimationFrame(paint)}
 hero.addEventListener('focusin',e=>{if(e.target.matches(':focus-visible')){heroKeyboardPause=true;stopHeroCycle()}});
 hero.addEventListener('focusout',e=>{if(!hero.contains(e.relatedTarget)){heroKeyboardPause=false;scheduleHeroCycle()}});
 hero.addEventListener('pointerdown',()=>{if(heroKeyboardPause){heroKeyboardPause=false;scheduleHeroCycle()}},{passive:true});
 reduce.addEventListener('change',()=>{motion.setPaused(reduce.matches);scheduleHeroCycle();if(reduce.matches){hero.querySelectorAll('.hero-message,.scene-caption,#hero-motion').forEach(el=>el.getAnimations().forEach(a=>a.cancel()));pauseVideos()}});
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',()=>{if(innerWidth>760)closeMenu();schedule()},{passive:true});
 document.addEventListener('visibilitychange',()=>{scheduleHeroCycle();if(document.hidden){cancelAnimationFrame(raf);raf=0;pauseVideos()}else{bindVideos($('view-'+route));resumeVideos();schedule()}});
 window.addEventListener('pagehide',()=>{stopHeroCycle();cancelAnimationFrame(raf);raf=0;videoObserver.disconnect()});window.addEventListener('pageshow',e=>{if(e.persisted){bindVideos($('view-'+route));resumeVideos();scheduleHeroCycle();schedule()}});
 bindComparisons(document);motion.setPaused(reduce.matches);renderRoute();
})();
