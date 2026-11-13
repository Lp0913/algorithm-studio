(function(){
 'use strict';
 const $=id=>document.getElementById(id);
 const all=s=>[...document.querySelectorAll(s)];
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const demos=JSON.parse($('home-demos').textContent);
 const menu=$('mobile-menu'),toggle=$('menu-toggle'),visual=$('tech-visual'),hero=$('horizon');
 let paused=reduce.matches,raf=0,start=performance.now();
 function closeMenu(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','打开导航')}
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';menu.hidden=!open;toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'关闭导航':'打开导航')});
 all('#mobile-menu a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden){closeMenu();toggle.focus()}});
 document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!toggle.contains(e.target))closeMenu()});
 function paint(now){raf=0;const y=scrollY;const visible=y<hero.offsetHeight;$('site-header').classList.toggle('scrolled',y>50);$('reading-progress').style.transform=`scaleX(${y/Math.max(1,document.documentElement.scrollHeight-innerHeight)})`;if(visible&&!paused&&!reduce.matches){const p=Math.min(1,y/innerHeight);const t=(now-start)/7000;visual.style.setProperty('--scale',String(1.035+p*.065+Math.sin(t)*.008));visual.style.setProperty('--px',`${Math.sin(t)*7}px`);visual.style.setProperty('--py',`${-p*40+Math.cos(t)*4}px`)}if(visible&&!paused&&!reduce.matches&&!document.hidden)raf=requestAnimationFrame(paint)}
 function schedule(){if(!raf)raf=requestAnimationFrame(paint)}
 function motionState(){const b=$('motion-toggle');b.setAttribute('aria-pressed',String(paused));b.setAttribute('aria-label',paused?'开启首屏动效':'暂停首屏动效');b.querySelector('span').textContent=paused?'开启动效':'暂停动效';b.querySelector('img').src=`./assets/chapter-design/icons/${paused?'play':'pause'}.svg`;schedule()}
 $('motion-toggle').addEventListener('click',()=>{paused=!paused;motionState()});
 reduce.addEventListener('change',()=>{paused=reduce.matches;motionState();if(paused)$('home-video').pause()});
 window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',()=>{if(innerWidth>760)closeMenu();schedule()},{passive:true});
 const video=$('home-video');let inview=false,userPaused=false,autoPause=false;
 video.addEventListener('pause',()=>{if(autoPause){autoPause=false;return}if(inview)userPaused=true});video.addEventListener('play',()=>{autoPause=false;userPaused=false});
 const observer=new IntersectionObserver(entries=>{inview=entries[0].isIntersecting;if(inview&&!userPaused&&!reduce.matches)video.play().catch(()=>{});else if(!inview&&!video.paused){autoPause=true;video.pause()}},{threshold:.35});observer.observe(video);
 all('[data-demo]').forEach(button=>button.addEventListener('click',()=>{const v=demos.find(d=>d.id===button.dataset.demo);if(!v)return;autoPause=true;video.pause();video.src=v.video;video.poster=v.poster;video.setAttribute('aria-label',v.title);$('demo-name').textContent=v.title;userPaused=false;video.load();video.play().catch(()=>{});all('[data-demo]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)))}));
 document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;if(!video.paused){autoPause=true;video.pause()}}else{schedule();if(inview&&!userPaused&&!reduce.matches)video.play().catch(()=>{})}});
 window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);raf=0;observer.disconnect()});window.addEventListener('pageshow',e=>{if(e.persisted){observer.observe(video);schedule()}});
 const legacy=location.hash;
 if(/^#(?:algorithm-|cap-panel-|cap-tab-)/.test(legacy))location.replace('./algorithms.html'+legacy);
 motionState();
})();
