/* Interactive algorithm visualisation. Generated coordinates are illustrative,
 * not inference results, customer data or measured model performance. */
(function () {
  'use strict';

  const BLUE = '#147ccc', CYAN = '#34c7e6', INK = '#194e74';
  const TAU = Math.PI * 2;
  const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };
  const hash = n => { const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v); };
  const river = z => Math.sin(z * .135) * 4.8 + Math.cos(z * .27) * 1.25 - 2;
  const height = (x, z) => {
    const bank = smooth(.85, 4.1, Math.abs(x - river(z)));
    return (.3 + 1.5 * Math.pow(Math.sin(x * .115 + z * .065 + 2.3), 2)
      + 2 * Math.exp(-((x + 11) ** 2 + (z + 7) ** 2) / 100)) * bank - .15;
  };
  const modes = {
    terrain: ['遥感解析', '扫描遥感地块', '区分水体与植被', '完成地物分类'],
    tracking: ['目标追踪', '捕捉运动目标', '关联连续轨迹', '持续追踪'],
    reconstruction: ['点云重建', '采集空间点位', '对齐曲面结构', '完成三维重建']
  };

  function create(options = {}) {
    const canvas = options.canvas;
    const container = options.container || (canvas && canvas.parentElement);
    if (!canvas || !container) return null;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return null;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const buttons = options.modeButtons ? Array.from(options.modeButtons) : [];
    const statusNode = options.statusNode;
    let width = 0, heightPx = 0, dpr = 1, mobile = false, wide = 0;
    let active = true, paused = false, destroyed = false, raf = 0;
    let mode = 'reconstruction', modeTime = 0, clock = 0, elapsed = 0, last = 0;
    let pointerX = 0, pointerY = 0, angleX = 0, angleY = 0;
    let points = [], buildings = [], terrainRows = [], terrainCols = [];
    let reconstructionPoints = [], reconstructionColumns = [];
    let projection = {}, lastStatus = '';
    let knownMobile;
    const listeners = [];

    function listen(target, type, callback, config) {
      target.addEventListener(type, callback, config);
      listeners.push(() => target.removeEventListener(type, callback, config));
    }
    function addPoint(x, y, z, kind) {
      const i = points.length;
      points.push({ x, y, z, kind,
        sx: (hash(i + 31) - .5) * 65,
        sy: 6 + hash(i + 73) * 21,
        sz: (hash(i + 199) - .5) * 58,
        size: .7 + hash(i + 107) * .65 });
    }
    function makeScene() {
      points = []; buildings = []; terrainRows = []; terrainCols = [];
      const columns = mobile ? 49 : 83;
      const rows = mobile ? 37 : 61;
      for (let j = 0; j < rows; j++) {
        const z = -14 + j * 28 / (rows - 1);
        for (let i = 0; i < columns; i++) {
          const x = -18 + i * 36 / (columns - 1);
          const distance = Math.abs(x - river(z));
          if (distance < .85 && (i + j) % 3 !== 0) continue;
          addPoint(x, height(x, z), z, distance < 1.1 ? 2 : 0);
        }
      }
      // The thin geographic mesh supports the point cloud without hiding it.
      for (let z = -14; z <= 14; z += 2) {
        const row = [];
        for (let x = -18; x <= 18; x += .6) row.push([x, height(x, z), z]);
        terrainRows.push(row);
      }
      for (let x = -18; x <= 18; x += 3) {
        const col = [];
        for (let z = -14; z <= 14; z += .6) col.push([x, height(x, z), z]);
        terrainCols.push(col);
      }
      const blocks = [
        [6.3, -8.8, 1.4, 1.8, 4.5], [9, -8, 1.8, 2.1, 7.2],
        [12.1, -7.2, 2, 1.7, 10.5], [15, -6.7, 1.4, 2.1, 6.2],
        [5.3, -4.3, 1.6, 1.7, 3.2], [8.4, -3.8, 1.7, 2, 5.7],
        [11.6, -3.3, 2.1, 1.6, 8.1], [14.8, -2.7, 1.8, 1.8, 4.5],
        [7.6, .3, 2, 1.8, 3.4], [10.8, .8, 1.7, 2.1, 5.1],
        [14.2, 1.2, 2.3, 1.9, 3.7], [10, 5, 2.2, 1.8, 2.5],
        [13.5, 5.6, 2.1, 1.7, 3.2], [15.6, 9.2, 1.8, 2.1, 2.6]
      ];
      blocks.forEach((block, b) => {
        const [rawX, rawZ, w, rawDepth, h] = block;
        // Keep the complete city in the central right-hand composition. Compress
        // its depth so forward buildings do not disappear beyond the viewport.
        const x = rawX - 6.4, z = (rawZ - 1.8) * .72, depth = rawDepth * .72;
        const base = height(x, z);
        buildings.push({ x, z, w, depth, h, base });
        const step = mobile ? .76 : .5;
        for (let y = .1; y < h; y += step) {
          for (let a = 0; a <= w; a += step) {
            addPoint(x + a - w / 2, base + y, z - depth / 2, 1);
            addPoint(x + a - w / 2, base + y, z + depth / 2, 1);
          }
          for (let a = step; a < depth; a += step) {
            addPoint(x - w / 2, base + y, z + a - depth / 2, 1);
            addPoint(x + w / 2, base + y, z + a - depth / 2, 1);
          }
        }
        for (let a = 0; a <= w; a += step) for (let c = 0; c <= depth; c += step) {
          addPoint(x + a - w / 2, base + h, z + c - depth / 2, 1);
        }
      });
      makeReconstruction();
    }

    function updateProjection() {
      const yaw = -.34 + angleX * .22;
      const pitch = .64 + angleY * .08;
      projection = {
        cy: Math.cos(yaw), sy: Math.sin(yaw), cp: Math.cos(pitch), sp: Math.sin(pitch),
        cx: width * (mobile ? .47 : .64 - .035 * wide), cyScreen: heightPx * (mobile ? .77 : .67),
        scale: mobile ? Math.min(width * .034, heightPx * .052) : Math.min(width * .021, heightPx * .052)
      };
    }
    function project(x, y, z) {
      const p = projection;
      const a = x * p.cy - z * p.sy;
      const b = x * p.sy + z * p.cy;
      const depth = y * p.sp + b * p.cp;
      const perspective = 58 / (58 - depth);
      return [p.cx + a * p.scale * perspective,
        p.cyScreen - (y * p.cp - b * p.sp) * p.scale * perspective, perspective];
    }
    function visibility(x, y) {
      return (mobile ? 1 : smooth(width * (.37 - .06 * wide), width * (.48 - .06 * wide), x))
        * smooth(heightPx * (mobile ? .43 : .12), heightPx * (mobile ? .59 : .23), y)
        * (1 - smooth(heightPx * .89, heightPx, y));
    }
    function pathLine(coords, color, alpha, lineWidth = 1, dashed = false) {
      if (coords.length < 2) return;
      ctx.beginPath();
      let avg = 0;
      coords.forEach((c, i) => { const p = project(...c); avg += visibility(p[0], p[1]);
        if (i === 0) ctx.moveTo(p[0], p[1]); else ctx.lineTo(p[0], p[1]); });
      ctx.globalAlpha = Math.min(1, alpha * 2) * avg / coords.length;
      const strokeScale = clamp(projection.scale / 32, .95, 1.6);
      ctx.strokeStyle = color; ctx.lineWidth = lineWidth * strokeScale;
      if (dashed) ctx.setLineDash([5, 7]);
      ctx.stroke();
      if (dashed) ctx.setLineDash([]);
    }
    function corners(b, extra = 0) {
      const x = b.x - b.w / 2 - extra, x2 = b.x + b.w / 2 + extra;
      const z = b.z - b.depth / 2 - extra, z2 = b.z + b.depth / 2 + extra;
      const y = b.base, y2 = b.base + b.h + extra;
      return [[x,y,z],[x2,y,z],[x2,y,z2],[x,y,z2],[x,y2,z],[x2,y2,z],[x2,y2,z2],[x,y2,z2]];
    }
    function box(b, color, alpha, stroke = 1, filled = false, extra = 0) {
      const c = corners(b, extra);
      if (filled) {
        ctx.fillStyle = color;
        [[0,1,5,4],[1,2,6,5],[4,5,6,7]].forEach(face => {
          ctx.beginPath(); let vis = 0;
          face.forEach((index, i) => { const p = project(...c[index]); vis += visibility(p[0],p[1]);
            if (i === 0) ctx.moveTo(p[0],p[1]); else ctx.lineTo(p[0],p[1]); });
          ctx.closePath(); ctx.globalAlpha = alpha * .23 * vis / 4; ctx.fill();
        });
      }
      [[0,1,2,3,0],[4,5,6,7,4],[0,4],[1,5],[2,6],[3,7]].forEach(edge => pathLine(edge.map(i => c[i]),color,alpha,stroke));
    }

    function drawRiver(assembly) {
      const left = [], right = [];
      for (let z = -14; z <= 14; z += .4) {
        left.push([river(z) - 1.05, .02, z]);
        right.push([river(z) + 1.05, .02, z]);
      }
      pathLine(left, CYAN, .67 * assembly, 1.5);
      pathLine(right, BLUE, .42 * assembly, 1);
      // Flow packets follow the river; their motion reinforces the continuous scene.
      for (let n = 0; n < 8; n++) {
        const z = ((clock * 1.8 + n * 3.7) % 28) - 14;
        const p = project(river(z), .1, z);
        ctx.globalAlpha = .8 * assembly * visibility(p[0],p[1]);
        ctx.fillStyle = CYAN; ctx.beginPath(); ctx.arc(p[0],p[1],2.2 * p[2],0,TAU); ctx.fill();
      }
    }
    function drawScan(scan, assembly) {
      if (mode === 'tracking') return;
      const c = [[scan,.2,-14],[scan,7.5,-14],[scan,7.5,14],[scan,.2,14]].map(p => project(...p));
      const gradient = ctx.createLinearGradient(c[0][0],c[0][1],c[1][0],c[1][1]);
      gradient.addColorStop(0, 'rgba(20,124,204,.55)');
      gradient.addColorStop(.4, 'rgba(52,199,230,.36)');
      gradient.addColorStop(1, 'rgba(52,199,230,0)');
      ctx.beginPath(); c.forEach((p,i)=>i ? ctx.lineTo(p[0],p[1]) : ctx.moveTo(p[0],p[1])); ctx.closePath();
      ctx.globalAlpha = assembly; ctx.fillStyle = gradient; ctx.fill();
      const ground = [];
      for (let z = -14; z <= 14; z += .4) ground.push([scan,height(scan,z)+.12,z]);
      pathLine(ground, CYAN, .95 * assembly, 2.5);
      pathLine([[scan,.2,-14],[scan,7.5,-14]], CYAN, .45 * assembly, 1);
      pathLine([[scan,.2,14],[scan,7.5,14]], CYAN, .45 * assembly, 1);
    }
    function drawTracking(assembly) {
      for (let lane = 0; lane < 3; lane++) {
        const trail = [], road = [];
        const z = ((clock * (2.3 + lane * .45) + lane * 9) % 26) - 13;
        const laneX = zz => river(zz) + 3.3 + lane * 1.4;
        for (let a = -14; a < 14; a += .5) road.push([laneX(a),height(laneX(a),a)+.12,a]);
        pathLine(road, BLUE, .22 * assembly, 1, true);
        for (let a = Math.max(-14,z - 5.5); a <= z; a += .25) trail.push([laneX(a),height(laneX(a),a)+.22,a]);
        pathLine(trail, lane === 1 ? CYAN : BLUE, .87 * assembly, 2.5);
        const x = laneX(z), base = height(x,z) + .2;
        const b = { x, z, w: .9, depth: 1.45, h: .65, base };
        box(b, BLUE, .9 * assembly, 1.5, true);
        box({...b, w:1.5,depth:2.1,h:1.2}, CYAN, .75 * assembly, 1.2);
        const p = project(x,base+1.7,z);
        const alpha = visibility(p[0],p[1]) * assembly;
        ctx.globalAlpha = alpha; ctx.font = `${mobile ? 9 : 10}px ui-monospace, monospace`;
        ctx.textAlign = 'center'; ctx.fillStyle = INK;
        ctx.fillText(`TRACK 0${lane + 1}`,p[0],p[1]);
      }
    }
    // The classification scene has its own top-down geographic projection.
    function sceneBounds() {
      return mobile
        ? {x:width*.055,y:heightPx*.59,w:width*.89,h:heightPx*.245}
        : {x:width*(.52-.06*wide),y:heightPx*.285,w:width*(.43+.035*wide),h:heightPx*.485};
    }
    function polygon(vertices, fill, stroke, lineWidth=1, opacity=1) {
      ctx.beginPath();
      vertices.forEach((p,i)=>i ? ctx.lineTo(p[0],p[1]) : ctx.moveTo(p[0],p[1]));
      ctx.closePath();ctx.globalAlpha=opacity;
      if(fill){ctx.fillStyle=fill;ctx.fill()}
      if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=lineWidth;ctx.stroke()}
    }
    function mapPoint(bounds,u,v) {
      const lean = mobile ? 0 : .022;
      return [bounds.x+bounds.w*(u+(v-.5)*lean)+angleX*(mobile?0:5),
        bounds.y+bounds.h*(v+(u-.5)*lean)+angleY*(mobile?0:4)];
    }
    function mapPolygon(bounds,coordinates,fill,stroke,lineWidth=1,opacity=1) {
      polygon(coordinates.map(p=>mapPoint(bounds,...p)),fill,stroke,lineWidth,opacity);
    }
    function mapRiver(u) { return .47+Math.sin(u*5.5)*.085+Math.sin(u*12)*.022; }
    function parcelVertex(i,j,cols,rows) {
      return [i/cols+(i>0&&i<cols?(hash(i*47+j*11)-.5)*.045:0),
        j/rows+(j>0&&j<rows?(hash(j*37+i*17)-.5)*.045:0)];
    }
    function mapLayer(bounds,classified) {
      const greens=['#69b6a3','#86c5af','#abd3bb','#5fae9c','#95c6b2'];
      const urban=['#b0c6d3','#c1d0da','#91b1c4'];
      const cols=mobile?6:8,rows=mobile?4:6;
      mapPolygon(bounds,[[0,0],[1,0],[1,1],[0,1]],classified?'#e0eeec':'#e7eff2',null);
      for(let j=0;j<rows;j++)for(let i=0;i<cols;i++) {
        const parcel=[parcelVertex(i,j,cols,rows),parcelVertex(i+1,j,cols,rows),
          parcelVertex(i+1,j+1,cols,rows),parcelVertex(i,j+1,cols,rows)];
        const rural=i<cols*.58||j===rows-1;
        const fill=classified?(rural?greens[(i+j*3)%greens.length]:urban[(i+j)%urban.length]):(rural?'#d5e3e5':'#c9d9e2');
        mapPolygon(bounds,parcel,fill,classified?'#effaf6':'#f0f6f8',mobile?1:1.6);
        // Agricultural row texture makes each field legible even before colour.
        if(rural) {
          const low=parcel[0],high=parcel[2];
          ctx.save();ctx.beginPath();parcel.forEach((v,k)=>{const p=mapPoint(bounds,...v);k?ctx.lineTo(...p):ctx.moveTo(...p)});ctx.closePath();ctx.clip();
          for(let r=1;r<5;r++) {
            const yy=low[1]+(high[1]-low[1])*r/5;
            const a=mapPoint(bounds,low[0]-.025,yy),b=mapPoint(bounds,high[0]+.025,yy+.012);
            ctx.beginPath();ctx.moveTo(...a);ctx.lineTo(...b);ctx.globalAlpha=classified?.32:.24;
            ctx.strokeStyle=classified?'#267a70':'#8daab6';ctx.lineWidth=mobile?.5:.9;ctx.stroke();
          }
          ctx.restore();
        }
      }
      // A genuine winding water region cuts across the parcel layer.
      const banks=[];
      for(let v=0;v<=1.001;v+=.025)banks.push([mapRiver(v)-.038,v]);
      for(let v=1;v>=-.001;v-=.025)banks.push([mapRiver(v)+.038,v]);
      mapPolygon(bounds,banks,classified?'#41a8d2':'#aac7d7',classified?'#138bc0':'#91b5c8',mobile?1:1.8);
      // Neutral built-up footprints, separated by a broad transport corridor.
      mapPolygon(bounds,[[.64,0],[.666,0],[.71,1],[.685,1]],'#eef5f8',null);
      for(let j=0;j<4;j++)for(let i=0;i<3;i++) {
        const u=.735+i*.074,v=.08+j*.205;
        const w=.043+(i%2)*.01,h=.075+(j%2)*.035;
        mapPolygon(bounds,[[u,v],[u+w,v],[u+w,v+h],[u,v+h]],
          classified?'#6e95ae':'#9cb5c6',classified?'#315f7b':'#799bae',mobile?.7:1.15);
      }
    }
    function drawClassification() {
      const bounds=sceneBounds();
      const phase=modeTime+.75;
      const progress=(media.matches||paused)?1:clamp(phase/5.7);
      const scan=clamp(progress,-.03,1.03);
      ctx.save();
      ctx.shadowColor='rgba(27,93,119,.13)';ctx.shadowBlur=mobile?12:28;ctx.shadowOffsetY=mobile?6:14;
      mapPolygon(bounds,[[0,0],[1,0],[1,1],[0,1]],'#edf5f6','#9ab8c7',1);
      ctx.shadowBlur=0;ctx.shadowOffsetY=0;
      mapLayer(bounds,false);
      ctx.save();ctx.beginPath();
      [[0,0],[scan,0],[scan,1],[0,1]].forEach((v,i)=>{const p=mapPoint(bounds,...v);i?ctx.lineTo(...p):ctx.moveTo(...p)});ctx.closePath();ctx.clip();
      mapLayer(bounds,true);ctx.restore();
      // The scan reveals filled classes rather than a generic 3D light curtain.
      if(progress<1&&!media.matches&&!paused) {
        const p0=mapPoint(bounds,scan,0),p1=mapPoint(bounds,scan,1);
        const beam=ctx.createLinearGradient(p0[0]-22,0,p0[0]+3,0);
        beam.addColorStop(0,'rgba(9,134,190,0)');beam.addColorStop(1,'rgba(9,134,190,.38)');
        ctx.fillStyle=beam;ctx.globalAlpha=1;ctx.fillRect(p0[0]-22,bounds.y,25,bounds.h);
        ctx.beginPath();ctx.moveTo(...p0);ctx.lineTo(...p1);ctx.strokeStyle='#087eaa';ctx.lineWidth=mobile?2:3;ctx.stroke();
        for(const p of [p0,p1]){ctx.beginPath();ctx.arc(p[0],p[1],mobile?3:5,0,TAU);ctx.fillStyle='#087eaa';ctx.fill()}
      }
      mapPolygon(bounds,[[0,0],[1,0],[1,1],[0,1]],null,'#76a7ba',mobile?.8:1.5);
      // Small registration marks communicate a top-down image analysis field.
      ctx.globalAlpha=.8;ctx.strokeStyle=INK;ctx.lineWidth=mobile?1:1.5;
      for(const [u,v,sx,sy] of [[0,0,1,1],[1,0,-1,1],[1,1,-1,-1],[0,1,1,-1]]) {
        const p=mapPoint(bounds,u,v),n=mobile?6:11;
        ctx.beginPath();ctx.moveTo(p[0]+sx*n,p[1]);ctx.lineTo(...p);ctx.lineTo(p[0],p[1]+sy*n);ctx.stroke();
      }
      ctx.restore();ctx.globalAlpha=1;
    }
    // A curved architectural pavilion is reconstructed from spatial samples.
    // It is deliberately separate from both the map and the tracking city.
    function roofHeight(u,v) {
      return 2.8+6.2*Math.sqrt(Math.max(.04,1-u*u))+.8*Math.cos(v*Math.PI*.8);
    }
    function makeReconstruction() {
      reconstructionPoints=[];reconstructionColumns=[];
      const cols=mobile?47:73,rows=mobile?25:41;
      function sample(x,y,z,kind) {
        const n=reconstructionPoints.length;
        reconstructionPoints.push({x,y,z,kind,
          dx:(hash(n+801)-.5)*22,dy:(hash(n+417)-.35)*16,dz:(hash(n+943)-.5)*22,
          delay:hash(n+29)*.55,size:.9+hash(n+173)*.8});
      }
      for(let j=0;j<rows;j++)for(let i=0;i<cols;i++) {
        const u=-1+i*2/(cols-1),v=-1+j*2/(rows-1);
        sample(u*13,roofHeight(u,v),v*8,0);
      }
      for(const x of [-11.2,11.2])for(const z of [-6,0,6]) {
        const h=roofHeight(x/13,z/8);
        reconstructionColumns.push({x,z,h});
        for(let y=.12;y<h;y+=mobile?.48:.32)for(let ring=0;ring<6;ring++) {
          const a=ring*TAU/6;sample(x+Math.cos(a)*.23,y,z+Math.sin(a)*.23,1);
        }
      }
      for(let z=-9;z<=9;z+=mobile?1.6:1.1)for(let x=-14;x<=14;x+=mobile?1.6:1.1)sample(x,0,z,2);
    }
    function reconstructionState() {
      if(media.matches||paused)return {phase:6,alignment:1,mesh:1,stage:3};
      const phase=Math.min(modeTime,10);
      return {phase,alignment:smooth(.6,3.8,phase),mesh:smooth(2.6,4.5,phase),
        stage:phase<1.4?1:phase<4.5?2:3};
    }
    function drawReconstruction() {
      const state=reconstructionState();
      const yaw=-.43+Math.sin((state.phase-4)*.17)*.14+angleX*.10;
      const pitch=.43+angleY*.05,cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
      const scale=mobile?Math.min(width*.026,heightPx*.029):Math.min(width*.0138,heightPx*.034);
      const cx=width*(mobile?.50:.742-.045*wide),baseY=heightPx*(mobile?.765:.62);
      function projectArch(x,y,z) {
        const a=x*cy-z*sy,b=x*sy+z*cy,depth=y*sp+b*cp,p=70/(70-depth);
        return [cx+a*scale*p,baseY-(y*cp-b*sp)*scale*p,p];
      }
      function archLine(coords,color,alpha,lineWidth=1) {
        if(alpha<=.001)return;
        ctx.beginPath();let vis=0;
        coords.forEach((c,i)=>{const p=projectArch(...c);vis+=visibility(p[0],p[1]);i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1])});
        ctx.globalAlpha=alpha*vis/coords.length;ctx.strokeStyle=color;
        ctx.lineWidth=lineWidth*clamp(scale/20,.8,1.65);ctx.stroke();
      }
      ctx.lineJoin='round';ctx.lineCap='round';
      // Ground registration grid and a thin continuous foundation.
      const base=[[-14,0,-9],[14,0,-9],[14,0,9],[-14,0,9],[-14,0,-9]];
      archLine(base,'#548aa5',.5*state.mesh,1.2);
      for(let z=-8;z<=8;z+=2)archLine([[-14,0,z],[14,0,z]],'#84b4c8',.18*state.mesh,.7);
      for(let x=-12;x<=12;x+=3)archLine([[x,0,-9],[x,0,9]],'#84b4c8',.18*state.mesh,.7);
      // A lightly filled curved shell makes the geometry read as one roof,
      // rather than disconnected dots or a collection of floating boxes.
      for(let v=-1;v<.999;v+=.125)for(let u=-1;u<.999;u+=.1) {
        const q=[[u,v],[Math.min(1,u+.1),v],[Math.min(1,u+.1),Math.min(1,v+.125)],[u,Math.min(1,v+.125)]];
        const coords=q.map(([a,b])=>projectArch(a*13,roofHeight(a,b),b*8));
        polygon(coords,BLUE,null,1,.035*state.mesh);
      }
      for(const c of reconstructionColumns) {
        archLine([[c.x,0,c.z],[c.x,c.h,c.z]],INK,.72*state.mesh,mobile?1.5:2.1);
        archLine([[c.x-.45,0,c.z],[c.x+.45,0,c.z]],BLUE,.45*state.mesh,1.2);
      }
      // Parallel ribs follow the continuous barrel vault, with coherent eaves.
      for(let v=-1;v<=1.001;v+=.25) {
        const curve=[];for(let u=-1;u<=1.001;u+=.025)curve.push([u*13,roofHeight(u,v),v*8]);
        archLine(curve,Math.abs(v)>.99?INK:BLUE,(Math.abs(v)>.99?.85:.42)*state.mesh,Math.abs(v)>.99?1.8:1);
      }
      for(let u=-1;u<=1.001;u+=.2) {
        const curve=[];for(let v=-1;v<=1.001;v+=.05)curve.push([u*13,roofHeight(u,v),v*8]);
        archLine(curve,CYAN,.49*state.mesh,1);
      }
      for(const p of reconstructionPoints) {
        const converge=(media.matches||paused)?1:smooth(.6+p.delay,3.4+p.delay,state.phase);
        const scatter=1-converge;
        const q=projectArch(p.x+p.dx*scatter,p.y+p.dy*scatter,p.z+p.dz*scatter);
        if(q[0]<0||q[0]>width||q[1]<0||q[1]>heightPx)continue;
        const vis=visibility(q[0],q[1]);if(vis<.01)continue;
        ctx.globalAlpha=vis*(p.kind===2?.25:p.kind===1?.83:.7)*(.55+.45*converge);
        ctx.fillStyle=p.kind===1?INK:p.kind===2?'#79a8be':(hash(p.x+p.z*19)>.73?CYAN:BLUE);
        const size=p.size*q[2]*clamp(scale/14,1,2.1)*(p.kind===2?.8:1.05);
        ctx.fillRect(q[0]-size*.5,q[1]-size*.5,size,size);
      }
      // A reconstruction contour travels across the already aligned shell.
      if(state.mesh>.7) {
        const v=(media.matches||paused)?.15:Math.sin((state.phase-4.5)*.45)*.86;
        const curve=[];for(let u=-1;u<=1.001;u+=.025)curve.push([u*13,roofHeight(u,v)+.025,v*8]);
        archLine(curve,CYAN,.92*state.mesh,mobile?1.7:2.4);
      }
      ctx.globalAlpha=1;
      const status=modes.reconstruction[state.stage];
      if(statusNode&&status!==lastStatus){statusNode.textContent=status;lastStatus=status;}
    }
    function paint() {
      if (destroyed || width < 1 || heightPx < 1) return;
      updateProjection();
      ctx.setTransform(dpr,0,0,dpr,0,0); ctx.clearRect(0,0,width,heightPx);
      const staticState = media.matches;
      if(mode==='terrain') {
        drawClassification();
        const cycle=Math.min(modeTime/5.7,1);
        const status=modes[mode][(media.matches||paused)?3:1+Math.min(2,Math.floor(cycle*3))];
        if(statusNode&&status!==lastStatus){statusNode.textContent=status;lastStatus=status;}
        return;
      }
      if(mode==='reconstruction'){drawReconstruction();return;}
      const assembly = staticState ? 1 : 1 - Math.pow(1 - clamp(elapsed / 1.85),3);
      const spread = 1 - assembly;
      const cycle = ((modeTime + 1) % 7.4) / 7.4;
      const scan = staticState ? 9 : -18 + cycle * 36;
      const lines = smooth(.15,.75,assembly);
      ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      terrainRows.forEach(row => pathLine(row, BLUE, .16 * lines, .7));
      terrainCols.forEach(col => pathLine(col, BLUE, .09 * lines, .6));
      drawRiver(lines);
      buildings.forEach(b => box(b, BLUE, .12 * lines,.8,true));

      for (const p of points) {
        const x = p.x + p.sx * spread;
        const y = p.y + p.sy * spread;
        const z = p.z + p.sz * spread;
        const q = project(x,y,z);
        if(q[0]<0 || q[0]>width || q[1]<0 || q[1]>heightPx) continue;
        const vis = visibility(q[0],q[1]); if(vis < .015) continue;
        const band = Math.max(0,1 - Math.abs(p.x - scan) / 1.25);
        let alpha = p.kind === 1 ? .92 : p.kind === 2 ? .8 : .67;
        if(mode === 'tracking') alpha *= p.kind === 1 ? .42 : .6;
        alpha = Math.min(1, alpha + band * .5) * vis * (.35 + .65 * assembly);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = band > .25 ? CYAN : p.kind === 1 ? INK : BLUE;
        const pointScale = clamp(projection.scale / 32, .86, 1.7);
        const radius = (p.size + band * 1.8) * q[2] * 2 * pointScale;
        ctx.fillRect(q[0] - radius*.5,q[1] - radius*.5,radius,radius);
      }
      drawScan(scan,lines);drawTracking(lines);
      ctx.globalAlpha = 1;
      const status = modes[mode][1 + Math.min(2,Math.floor(cycle * 3))];
      if(statusNode && status !== lastStatus) { statusNode.textContent = status; lastStatus = status; }
    }
    function canAnimate() { return active && !paused && !media.matches && !document.hidden && !destroyed; }
    function frame(now) {
      raf = 0;
      if (!canAnimate()) { last = 0; return; }
      const dt = last ? Math.min((now-last)/1000,.04) : 1/60;
      last = now; clock += dt; elapsed += dt; modeTime += dt;
      const easing = 1-Math.pow(.001,dt);
      angleX += (pointerX-angleX)*easing; angleY += (pointerY-angleY)*easing;
      paint(); raf = requestAnimationFrame(frame);
    }
    function schedule() {
      if(canAnimate() && !raf) raf = requestAnimationFrame(frame);
      else if(!canAnimate()) { cancelAnimationFrame(raf); raf = 0; last = 0; if(active) paint(); }
    }
    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width; heightPx = bounds.height;
      if(width < 1 || heightPx < 1) return;
      mobile = width < 700; wide = clamp((width - 1600) / 960);
      dpr = Math.min(window.devicePixelRatio || 1,mobile ? 1.35 : 1.6);
      canvas.width = Math.round(width*dpr); canvas.height = Math.round(heightPx*dpr);
      if(knownMobile !== mobile) { makeScene(); knownMobile = mobile; }
      paint(); schedule();
    }
    function setMode(value) {
      if(!modes[value] || destroyed) return;
      mode = value; modeTime = 0; lastStatus = '';
      buttons.forEach(button => {
        const value = button.dataset.scene || button.dataset.heroMode || button.dataset.mode;
        button.setAttribute('aria-pressed',String(value === mode));
      });
      canvas.dataset.mode = mode;
      container.dataset.scene = mode;
      container.dispatchEvent(new CustomEvent('hero-mode-change',{detail:{mode}}));
      paint(); schedule();
    }
    function setActive(value) {
      active = Boolean(value);
      if(active) resize();
      schedule();
    }
    function setPaused(value) { paused = Boolean(value); schedule(); }
    function destroy() {
      destroyed = true; cancelAnimationFrame(raf); raf = 0;
      listeners.forEach(remove => remove()); observer.disconnect();
      ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    listen(container,'pointermove',event => {
      if(event.pointerType === 'touch' || paused || media.matches) return;
      const r = container.getBoundingClientRect();
      pointerX = clamp((event.clientX-r.left)/r.width,0,1)*2-1;
      pointerY = clamp((event.clientY-r.top)/r.height,0,1)*2-1;
    },{passive:true});
    listen(container,'pointerleave',()=>{pointerX=0;pointerY=0},{passive:true});
    buttons.forEach(button => listen(button,'click',()=>setMode(button.dataset.scene || button.dataset.heroMode || button.dataset.mode)));
    listen(document,'visibilitychange',schedule);
    listen(media,'change',()=>{elapsed=Math.max(elapsed,1.85);schedule()});
    listen(window,'pagehide',()=>{cancelAnimationFrame(raf);raf=0;last=0});
    listen(window,'pageshow',schedule);
    const observer = new ResizeObserver(resize); observer.observe(canvas);
    resize(); setMode(mode);
    return { setActive, setPaused, setMode, destroy,
      getState:()=>({mode,active,paused,reducedMotion:media.matches,pointCount:mode==='reconstruction'?reconstructionPoints.length:points.length,sceneKind:({terrain:'land-cover-classification',tracking:'spatial-target-tracking',reconstruction:'point-cloud-reconstruction'})[mode],animating:!!raf}) };
  }

  let instance = null;
  window.StudioHeroMotion = {
    init(options) { if(instance) instance.destroy(); instance = create(options); return instance; },
    setActive(value) { if(instance) instance.setActive(value); },
    setPaused(value) { if(instance) instance.setPaused(value); },
    setMode(value) { if(instance) instance.setMode(value); },
    getState() { return instance ? instance.getState() : null; },
    destroy() { if(instance) instance.destroy(); instance = null; }
  };
})();
