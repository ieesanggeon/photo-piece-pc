'use strict';
const SPAWN_DURATION_MS=2400;
const ACTIVE_PUZZLE_PREFIX='사진조각_현재퍼즐_';
const SUPABASE_URL='https://ornvchxdihjeefqnokhi.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_c_tPRer-X-OIbh8u9CYUQw_AqAJ8TZI';
const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
const $=id=>document.getElementById(id), canvas=$('canvas'),ctx=canvas.getContext('2d');
const originalPhotos=[
 {name:'황금빛 산악 호수',src:'assets/originals/alpine-lake.png'},
 {name:'가을 숲길',src:'assets/originals/autumn-forest.png'},
 {name:'바닷가 등대',src:'assets/originals/lighthouse-coast.png'},
 {name:'강변의 푸른 도시',src:'assets/originals/riverside-city.png'},
 {name:'봄꽃 풍차 들판',src:'assets/originals/spring-flower-field.png'},
 {name:'눈 덮인 산골 마을',src:'assets/originals/snow-village.png'},
 {name:'에메랄드 폭포',src:'assets/originals/tropical-waterfall.png'},
 {name:'붉은 사막 협곡',src:'assets/originals/desert-canyon.png'},
 {name:'별빛 라벤더 호수',src:'assets/originals/starry-lavender-lake.png'},
 {name:'햇살 드는 정물화',src:'assets/originals/rustic-still-life.png'}
];
const moviePosterGroups=[
 {name:'아이언맨',items:[
  {name:'아이언맨',src:'assets/posters/iron-man.png'},
  {name:'아이언맨 2',src:'assets/posters/iron-man-2.png'},
  {name:'아이언맨 3',src:'assets/posters/iron-man-3.png'}
 ]},
 {name:'캡틴 아메리카',items:[
  {name:'캡틴 아메리카: 퍼스트 어벤져',src:'assets/posters/captain-america-first-avenger.png'},
  {name:'캡틴 아메리카: 윈터 솔져',src:'assets/posters/captain-america-winter-soldier.png'},
  {name:'캡틴 아메리카: 시빌 워',src:'assets/posters/captain-america-civil-war.png'},
  {name:'캡틴 아메리카: 브레이브 뉴 월드',src:'assets/posters/captain-america-brave-new-world.png'}
 ]},
 {name:'토르',items:[
  {name:'토르: 천둥의 신',src:'assets/posters/thor.png'},
  {name:'토르: 다크 월드',src:'assets/posters/thor-dark-world.png'},
  {name:'토르: 라그나로크',src:'assets/posters/thor-ragnarok.png'},
  {name:'토르: 러브 앤 썬더',src:'assets/posters/thor-love-and-thunder.png'}
 ]},
 {name:'어벤져스',items:[
  {name:'어벤져스',src:'assets/posters/avengers.png'},
  {name:'어벤져스: 에이지 오브 울트론',src:'assets/posters/avengers-age-of-ultron.png'},
  {name:'어벤져스: 인피니티 워',src:'assets/posters/avengers-infinity-war.png'},
  {name:'어벤져스: 엔드게임',src:'assets/posters/avengers-endgame.png'},
  {name:'어벤져스: 둠스데이',src:'assets/posters/avengers-doomsday.png'}
 ]},
 {name:'베놈',items:[
  {name:'베놈',src:'assets/posters/venom.png'},
  {name:'베놈 2: 렛 데어 비 카니지',src:'assets/posters/venom-let-there-be-carnage.png'},
  {name:'베놈: 라스트 댄스',src:'assets/posters/venom-the-last-dance.png'}
 ]},
 {name:'스파이더맨',items:[
  {name:'스파이더맨: 홈커밍',src:'assets/posters/spider-man-homecoming.png'},
  {name:'스파이더맨: 파 프롬 홈',src:'assets/posters/spider-man-far-from-home.png'},
  {name:'스파이더맨: 노 웨이 홈',src:'assets/posters/spider-man-no-way-home.png'},
  {name:'스파이더맨: 브랜드 뉴 데이',src:'assets/posters/spider-man-brand-new-day.png'}
 ]},
 {name:'쥬라기 시리즈',items:[
  {name:'쥬라기 공원',src:'assets/posters/jurassic-park.png'},
  {name:'쥬라기 공원 2: 잃어버린 세계',src:'assets/posters/jurassic-park-lost-world.png'},
  {name:'쥬라기 공원 3',src:'assets/posters/jurassic-park-3.png'},
  {name:'쥬라기 월드',src:'assets/posters/jurassic-world.png'},
  {name:'쥬라기 월드: 폴른 킹덤',src:'assets/posters/jurassic-world-fallen-kingdom.png'},
  {name:'쥬라기 월드: 도미니언',src:'assets/posters/jurassic-world-dominion.png'},
  {name:'쥬라기 월드: 새로운 시작',src:'assets/posters/jurassic-world-rebirth.png'}
 ]},
 {name:'신카이 마코토',items:[
  {name:'너의 이름은.',src:'assets/posters/your-name.png'},
  {name:'날씨의 아이',src:'assets/posters/weathering-with-you.png'},
  {name:'스즈메의 문단속',src:'assets/posters/suzume.png'}
 ]},
 {name:'최애의 아이',items:[
  {name:'최애의 아이 1기',src:'assets/posters/oshi-no-ko-season-1.png'},
  {name:'최애의 아이 2기',src:'assets/posters/oshi-no-ko-season-2.png'},
  {name:'최애의 아이 3기',src:'assets/posters/oshi-no-ko-season-3.png'}
 ]},
 {name:'아바타',items:[
  {name:'아바타',src:'assets/posters/avatar.png'},
  {name:'아바타: 물의 길',src:'assets/posters/avatar-way-of-water.png'},
  {name:'아바타: 불과 재',src:'assets/posters/avatar-fire-and-ash.png'}
 ]},
 {name:'듄',items:[
  {name:'듄',src:'assets/posters/dune.png'},
  {name:'듄: 파트 2',src:'assets/posters/dune-part-two.png'},
  {name:'듄: 파트 3',src:'assets/posters/dune-part-three.png'}
 ]},
 {name:'겨울왕국',items:[
  {name:'겨울왕국',src:'assets/posters/frozen.png'},
  {name:'겨울왕국 2',src:'assets/posters/frozen-2.png'}
 ]},
 {name:'토이 스토리',items:[
  {name:'토이 스토리',src:'assets/posters/toy-story.png'},
  {name:'토이 스토리 2',src:'assets/posters/toy-story-2.png'},
  {name:'토이 스토리 3',src:'assets/posters/toy-story-3.png'},
  {name:'토이 스토리 4',src:'assets/posters/toy-story-4.png'},
  {name:'토이 스토리 5',src:'assets/posters/toy-story-5.png'}
 ]}
];
let countChosen=false,image=null,puzzleImage=null,selectedName='',selectedUrl='',selectedKind='예제',selectedFile=null,loadId=0,blobUrl=null,pieces=[],allPieces=[],spawnTimer=null,spawnIndex=0,spawnStartedAt=0,spawning=false,generationId=0,W=1000,H=650,C=0,R=0,cw=0,ch=0,scale=1,ox=0,oy=0,vw=0,vh=0,drag=null,showGuide=true,started=0,finished=false,seed=0,currentUser=null,currentPuzzleId=null,currentImagePath=null,saveTimer=null,saveInFlight=false,saveQueued=false,lastSavedAt=0,autoRestoreUserId=null,startupResolved=false;
function renderLocalCollection(items,galleryId,countId,countLabel){
 const gallery=$(galleryId);$(countId).textContent=`${items.length} ${countLabel}`;if(!items.length)return;gallery.replaceChildren();
 for(const item of items){const button=document.createElement('button');button.className='photo';const imageElement=document.createElement('img');imageElement.src=item.src;imageElement.alt=item.name;imageElement.loading='lazy';const label=document.createElement('span');label.textContent=item.name;button.append(imageElement,label);button.onclick=()=>choose(item.src,item.name,button,'예제');gallery.append(button);}
}
renderLocalCollection(originalPhotos,'gallery','originalCount','PHOTOS');
function renderPosterGroups(groups){
 const container=$('posterGallery');const total=groups.reduce((sum,group)=>sum+group.items.length,0);$('posterCount').textContent=`${total} POSTERS`;container.replaceChildren();
 for(const group of groups){const details=document.createElement('details');details.className='poster-group';const summary=document.createElement('summary');const title=document.createElement('span');title.textContent=group.name;const count=document.createElement('span');count.className='subtle';count.textContent=`${group.items.length}개`;summary.append(title,count);const gallery=document.createElement('div');gallery.className='photo-gallery';for(const item of group.items){const button=document.createElement('button');button.className='photo';const imageElement=document.createElement('img');imageElement.src=item.src;imageElement.alt=item.name;imageElement.loading='lazy';const label=document.createElement('span');label.textContent=item.name;button.append(imageElement,label);button.onclick=()=>choose(item.src,item.name,button,'영화 포스터');gallery.append(button);}details.append(summary,gallery);container.append(details);}
}
renderPosterGroups(moviePosterGroups);
function selectionStatus(){
 $('start').disabled=!image||!countChosen;
 if(!image)return;
 $('notice').textContent=countChosen?selectedName+' · '+$('count').value+'피스 준비됨. 만들기를 눌러주세요.':'사진을 선택했습니다. 피스 수를 선택해주세요.';
}
async function choose(url,name,button,kind='예제',file=null){
 const id=++loadId;image=null;countChosen=false;$('start').disabled=true;$('pieceSettings').disabled=true;$('selection').hidden=true;$('selectionEmpty').hidden=false;
 $('notice').textContent='사진을 불러오는 중입니다…';
 document.querySelectorAll('.photo').forEach(b=>b.classList.toggle('selected',b===button));
 document.querySelectorAll('[data-n]').forEach(b=>b.setAttribute('aria-pressed','false'));
 const im=new Image();im.onload=()=>{if(id!==loadId)return;image=im;selectedName=name;selectedUrl=url;selectedKind=kind;selectedFile=file;$('selectedPhoto').src=url;$('selectedName').textContent=name;$('selection').hidden=false;$('selectionEmpty').hidden=true;$('pieceSettings').disabled=false;selectionStatus();};
 im.onerror=()=>{if(id!==loadId)return;$('notice').textContent='사진을 불러오지 못했습니다. 다른 예제나 내 사진을 선택해주세요.';};im.src=url;
}
$('upload').onchange=e=>{const f=e.target.files[0];if(!f)return;if(!['image/jpeg','image/png','image/webp'].includes(f.type)){$('notice').textContent='JPG, PNG, WebP 이미지를 선택해주세요.';return;}if(f.size>10*1024*1024){$('notice').textContent='이미지는 10MB 이하만 저장할 수 있습니다.';return;}const old=blobUrl;blobUrl=URL.createObjectURL(f);choose(blobUrl,f.name,null,'업로드',f);if(old)URL.revokeObjectURL(old);};
document.querySelector('.upload').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('upload').click();}};
function count(n){n=Math.max(50,Math.min(1000,Math.round(Number(n)||100)));$('count').value=n;$('range').value=n;return n;}
function selectCount(n){if(!image)return;const value=count(n);countChosen=true;document.querySelectorAll('[data-n]').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.n)===value)));selectionStatus();}
$('count').oninput=e=>{const n=Number(e.target.value);if(Number.isInteger(n)&&n>=50&&n<=1000){selectCount(n);}else{countChosen=false;$('start').disabled=true;$('notice').textContent='피스 수는 50~1000 사이의 정수로 입력해주세요.';}};$('count').onchange=e=>selectCount(e.target.value);$('range').oninput=e=>selectCount(e.target.value);document.querySelectorAll('[data-n]').forEach(b=>b.onclick=()=>selectCount(b.dataset.n));
function rand(k){const x=Math.sin(k*127.1+seed)*43758.5453;return x-Math.floor(x);}
function edge(x1,y1,x2,y2,k,outer){
 const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L;
 if(outer)return [[x1,y1],[x2,y2]];
 const style=Math.floor(rand(k+19)*4),sign=rand(k+17)>.5?1:-1;
 const depth=Math.min(L*(.18+rand(k+23)*.1),cw*.25,ch*.25)*sign;
 const center=(rand(k+29)-.5)*.14,neck=.055+rand(k+31)*.018,head=.12+rand(k+37)*.055,slant=(rand(k+41)-.5)*.22;
 const point=(t,u)=>{const s=.5+center+t+slant*u,a=depth*u;return [x1+dx*s+nx*a,y1+dy*s+ny*a];};
 const points=[point(-.5,0)],push=(t,u)=>points.push(point(t,u));
 const line=(a,b,steps=1)=>{for(let j=1;j<=steps;j++){const f=j/steps;push(a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f);}};
 for(let j=1;j<=8;j++)push(-.5+(.5-neck*1.45)*j/8,0);
 if(style<2){
  line([ -neck*1.45,0],[-neck,.14],6);
  line([-neck,.14],[-neck*.72,.23],5);
  line([-neck*.72,.23],[-head,.48],7);
  const steps=style===0?32:20,power=style===0?1:.72;
  for(let j=1;j<=steps;j++){const a=Math.PI-Math.PI*j/steps,s=Math.max(0,Math.sin(a));push(head*Math.cos(a),.48+.52*Math.pow(s,power));}
  line([neck*.72,.23],[neck,.14],5);
  line([neck,.14],[neck*1.45,0],6);
 }else if(style===2){
  line([-neck*1.5,0],[-neck,.18],5);
  line([-neck,.18],[-head,.34],2);
  line([-head,.34],[-head*.82,.86],3);
  line([-head*.82,.86],[-head*.42,1],2);
  line([-head*.42,1],[head*.48,.96],4);
  line([head*.48,.96],[head,.78],2);
  line([head,.78],[head*.9,.34],3);
  line([head*.9,.34],[neck,.18],2);
  line([neck,.18],[neck*1.5,0],5);
 }else{
  line([-neck*1.4,0],[-neck,.16],5);
  line([-neck,.16],[-head*.92,.3],3);
  line([-head*.92,.3],[-head*.72,.73],4);
  line([-head*.72,.73],[-head*.15,1],3);
  line([-head*.15,1],[head*.62,.88],4);
  line([head*.62,.88],[head,.48],3);
  line([head,.48],[neck,.16],4);
  line([neck,.16],[neck*1.4,0],5);
 }
 for(let j=1;j<=8;j++)push(neck*1.45+(.5-neck*1.45)*j/8,0);
 points.push([x2,y2]);
 return points;
}
function createPieces(n,ratio){
 W=1000;H=W/ratio;R=Math.max(2,Math.min(Math.floor(n/2),Math.round(Math.sqrt(n/ratio))));C=Math.ceil(n/R);cw=W/(n/R);ch=H/R;
 const base=Math.floor(n/R),extra=n%R,counts=Array.from({length:R},(_,r)=>base+(r<extra?1:0));
 const widths=new Map();
 for(const c of new Set(counts)){const weights=Array.from({length:c},(_,j)=>.85+rand(c*133+j)*.3),total=weights.reduce((a,b)=>a+b,0);let x=0;const xs=[0];weights.forEach(v=>{x+=v/total*W;xs.push(x);});xs[c]=W;widths.set(c,xs);}
 const weights=Array.from({length:R},(_,r)=>.88+rand(70000+r)*.24),total=weights.reduce((a,b)=>a+b,0),ys=[0];let y=0;weights.forEach(v=>{y+=v/total*H;ys.push(y);});ys[R]=H;
 const boundaries=Array.from({length:R+1},(_,r)=>[...new Set([...(r>0?widths.get(counts[r-1]):[]),...(r<R?widths.get(counts[r]):[])])].sort((a,b)=>a-b));
 const vertex=(x,r)=>{const key=Math.round(x*100)+r*100003;return [x,ys[r]+(r===0||r===R||x===0||x===W?0:(rand(key)-.5)*ch*.16)];};
 const sharedEdges=new Map();
 const getEdge=(x1,r1,x2,r2,outer)=>{const key=[x1.toFixed(6),r1,x2.toFixed(6),r2].join(':');if(!sharedEdges.has(key)){const a=vertex(x1,r1),b=vertex(x2,r2);let k=0;for(const c of key)k=(k*31+c.charCodeAt(0))>>>0;sharedEdges.set(key,edge(...a,...b,k,outer));}return sharedEdges.get(key);};
 const paths=[];
 for(let r=0;r<R;r++){const xs=widths.get(counts[r]);for(let c=0;c<counts[r];c++){
 const left=xs[c],right=xs[c+1];let pts=[];
 const horizontal=(boundary,reverse)=>{const xs=boundaries[boundary].filter(v=>v>=left-1e-7&&v<=right+1e-7);let points=[];for(let j=0;j<xs.length-1;j++)points.push(...getEdge(xs[j],boundary,xs[j+1],boundary,boundary===0||boundary===R));return reverse?points.reverse():points;};
 pts.push(...horizontal(r,false));pts.push(...getEdge(right,r,right,r+1,c===counts[r]-1));pts.push(...horizontal(r+1,true));pts.push(...getEdge(left,r,left,r+1,c===0).slice().reverse());
 const path=new Path2D();path.moveTo(...pts[0]);for(const p of pts.slice(1))path.lineTo(...p);path.closePath();
 const minX=Math.min(...pts.map(p=>p[0])),minY=Math.min(...pts.map(p=>p[1])),maxX=Math.max(...pts.map(p=>p[0])),maxY=Math.max(...pts.map(p=>p[1]));
 paths.push({id:paths.length,tx:minX,ty:minY,w:maxX-minX,h:maxY-minY,path,x:0,y:0,locked:false});
 }}return paths;
}
function scatter(list){
 const order=[...list];for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
 const outsideCount=order.length,maxw=Math.max(...order.map(p=>p.w)),maxh=Math.max(...order.map(p=>p.h));
 const mx=Math.max(W*.4,maxw*3),my=Math.max(H*.4,maxh*3),gap=Math.min(mx,my)*.12;
 const regions=[
  {name:'NW',x:-mx,y:-my,w:mx-gap,h:my-gap},
  {name:'N',x:0,y:-my,w:W,h:my-gap},
  {name:'NE',x:W+gap,y:-my,w:mx-gap,h:my-gap},
  {name:'E',x:W+gap,y:0,w:mx-gap,h:H},
  {name:'SE',x:W+gap,y:H+gap,w:mx-gap,h:my-gap},
  {name:'S',x:0,y:H+gap,w:W,h:my-gap},
  {name:'SW',x:-mx,y:H+gap,w:mx-gap,h:my-gap},
  {name:'W',x:-mx,y:0,w:mx-gap,h:H}
 ];
 const totalArea=regions.reduce((sum,r)=>sum+r.w*r.h,0),slots=[];
 const quotas=regions.map(r=>1+Math.floor((outsideCount-8)*r.w*r.h/totalArea));
 let remaining=outsideCount-quotas.reduce((a,b)=>a+b,0);
 for(let i=0;remaining>0;i=(i+1)%8,remaining--)quotas[i]++;
 regions.forEach((r,i)=>{for(let n=0;n<quotas[i];n++)slots.push(r);});
 const cell=Math.max(maxw,maxh),buckets=new Map(),pad=Math.min(cw,ch)*.1;
 const keys=b=>{const result=[];for(let y=Math.floor((b.y-pad)/cell);y<=Math.floor((b.y+b.h+pad)/cell);y++)for(let x=Math.floor((b.x-pad)/cell);x<=Math.floor((b.x+b.w+pad)/cell);x++)result.push(x+':'+y);return result;};
 const score=b=>{const seen=new Set();let sum=0;for(const k of keys(b))for(const q of buckets.get(k)||[]){if(seen.has(q.id))continue;seen.add(q.id);sum+=Math.max(0,Math.min(b.x+b.w+pad,q.x+q.w+pad)-Math.max(b.x,q.x))*Math.max(0,Math.min(b.y+b.h+pad,q.y+q.h+pad)-Math.max(b.y,q.y));}return sum;};
 order.forEach((p,i)=>{
  p.outside=i<outsideCount;const region=p.outside?slots[i]:{name:'inside',x:0,y:0,w:W,h:H};p.spawnRegion=region.name;
  let best=null,bestScore=Infinity;
  for(let trial=0;trial<32;trial++){
   const candidate={x:region.x+Math.random()*Math.max(0,region.w-p.w),y:region.y+Math.random()*Math.max(0,region.h-p.h),w:p.w,h:p.h};
   const value=score(candidate);if(value<bestScore){best=candidate;bestScore=value;}if(value===0)break;
  }
  p.x=best.x;p.y=best.y;
  for(const k of keys(p)){if(!buckets.has(k))buckets.set(k,[]);buckets.get(k).push(p);}
 });
 for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]];}
 return order;
}
function stopSpawning(){generationId++;if(spawnTimer!==null)clearTimeout(spawnTimer);spawnTimer=null;spawning=false;}
function openPanel(panel){$('authPanel').hidden=panel!=='auth';$('libraryPanel').hidden=panel!=='library';$('panelBackdrop').hidden=false;}
function closePanels(){$('authPanel').hidden=true;$('libraryPanel').hidden=true;$('panelBackdrop').hidden=true;}
function setMessage(id,text,success=false){const el=$(id);el.textContent=text;el.classList.toggle('success',success);}
function showAuthView(view){
 $('signedOutView').hidden=view!=='login';$('signedInView').hidden=view!=='account';
 $('authTitle').textContent=view==='account'?'내 계정':'로그인';setMessage('authMessage','');
}
function refreshAuthUI(){
 const signedIn=Boolean(currentUser);showAuthView(signedIn?'account':'login');$('libraryButton').hidden=!signedIn;$('saveState').hidden=!signedIn||!allPieces.length;
 $('authButton').textContent=signedIn?'계정':'로그인';$('accountEmail').textContent=currentUser?.email||'';
 if(!signedIn){currentPuzzleId=null;currentImagePath=null;}
}
function activePuzzleKey(){return currentUser?ACTIVE_PUZZLE_PREFIX+currentUser.id:null;}
function rememberActivePuzzle(id){const key=activePuzzleKey();if(key&&id)localStorage.setItem(key,id);}
function forgetActivePuzzle(){const key=activePuzzleKey();if(key)localStorage.setItem(key,'__none__');}
async function restoreLastPuzzle(){
 if(!currentUser||currentPuzzleId||document.body.dataset.screen==='play'||autoRestoreUserId===currentUser.id)return false;autoRestoreUserId=currentUser.id;
 const key=activePuzzleKey(),id=key?localStorage.getItem(key):null;if(id==='__none__')return false;
 $('notice').textContent='마지막 퍼즐을 불러오는 중입니다…';
 let query=db.from('퍼즐저장').select('아이디,퍼즐이름,이미지종류,이미지주소,이미지파일경로,원본파일이름,조각수,맞춘조각수,플레이시간밀리초,완성여부,수정시각,난수값,가로세로비율,퍼즐상태');query=id?query.eq('아이디',id):query.order('수정시각',{ascending:false}).limit(1);const {data,error}=await query.maybeSingle();
 if(error){console.error('마지막 퍼즐 복원 실패',error);$('notice').textContent='마지막 퍼즐을 불러오지 못했습니다. 내 퍼즐에서 다시 열어주세요.';return false;}
 if(!data){localStorage.removeItem(key);return false;}rememberActivePuzzle(data['아이디']);return restorePuzzle(data);
}
function finishStartup(restored=false){if(startupResolved)return;startupResolved=true;$('startupLoading').hidden=true;if(!restored){$('play').hidden=true;$('setup').hidden=false;document.body.dataset.screen='setup';}}
async function createPuzzleRecord(){
 if(!currentUser||currentPuzzleId)return currentPuzzleId;
 const id=crypto.randomUUID();let imagePath=null;
 if(selectedKind==='업로드'){
  if(!selectedFile)throw new Error('업로드할 원본 이미지를 찾을 수 없습니다. 사진을 다시 선택해주세요.');
  const ext={"image/jpeg":"jpg","image/png":"png","image/webp":"webp"}[selectedFile.type]||'jpg';imagePath=`${currentUser.id}/${id}/original.${ext}`;
  const {error:uploadError}=await db.storage.from('puzzle-images').upload(imagePath,selectedFile,{contentType:selectedFile.type,upsert:false});if(uploadError)throw uploadError;
 }
 const row={'아이디':id,'사용자아이디':currentUser.id,'퍼즐이름':selectedName,'이미지종류':selectedKind,'이미지주소':selectedKind==='예제'?selectedUrl:null,'이미지파일경로':imagePath,'원본파일이름':selectedKind==='업로드'?selectedFile?.name||null:null,'조각수':count($('count').value),'난수값':seed,'가로세로비율':image.naturalWidth/image.naturalHeight,'생성기버전':1,'퍼즐상태':{'버전':1,'조각들':[],'순서':[]}};
 const {error}=await db.from('퍼즐저장').insert(row);if(error){if(imagePath)await db.storage.from('puzzle-images').remove([imagePath]);throw error;}
 currentPuzzleId=id;currentImagePath=imagePath;rememberActivePuzzle(id);$('saveState').hidden=false;return id;
}
function puzzleState(){return{'버전':1,'조각들':allPieces.map(p=>({'번호':p.id,'x좌표':p.x,'y좌표':p.y,'맞춤여부':p.locked})),'순서':pieces.map(p=>p.id),'화면':{'확대비율':scale,'가로이동':ox,'세로이동':oy},'가이드':showGuide};}
async function savePuzzleNow(){
 if(!currentUser||!allPieces.length)return;clearTimeout(saveTimer);saveTimer=null;
 if(saveInFlight){saveQueued=true;return;}saveInFlight=true;saveQueued=false;
 try{
  if(!currentPuzzleId)await createPuzzleRecord();
  const placed=allPieces.filter(p=>p.locked).length,elapsed=started?Math.max(0,Date.now()-started):0;
  const changes={'퍼즐상태':puzzleState(),'맞춘조각수':placed,'플레이시간밀리초':elapsed,'완성여부':finished,'완성시각':finished?new Date().toISOString():null};
  const {error}=await db.from('퍼즐저장').update(changes).eq('아이디',currentPuzzleId);if(error)throw error;
  lastSavedAt=Date.now();$('saveState').textContent='저장됨';$('saveState').classList.add('save-pulse');setTimeout(()=>{$('saveState').textContent='저장';$('saveState').classList.remove('save-pulse');},1200);
 }catch(error){console.error(error);$('gameHint').textContent='저장하지 못했습니다. 인터넷 연결을 확인하고 다시 저장해주세요.';$('saveState').textContent='저장 재시도';}
 finally{saveInFlight=false;if(saveQueued)savePuzzleNow();}
}
function scheduleSave(delay=900){if(!currentUser||!allPieces.length)return;clearTimeout(saveTimer);saveTimer=setTimeout(savePuzzleNow,delay);}
async function imageUrlForPuzzle(row){if(row['이미지종류']==='예제')return row['이미지주소'];const {data,error}=await db.storage.from('puzzle-images').createSignedUrl(row['이미지파일경로'],3600);if(error)throw error;return data.signedUrl;}
async function loadLibrary(){
 if(!currentUser)return;openPanel('library');$('puzzleList').replaceChildren();setMessage('libraryMessage','불러오는 중…');
 const {data,error}=await db.from('퍼즐저장').select('아이디,퍼즐이름,이미지종류,이미지주소,이미지파일경로,원본파일이름,조각수,맞춘조각수,플레이시간밀리초,완성여부,수정시각,난수값,가로세로비율,퍼즐상태').order('수정시각',{ascending:false});
 if(error){setMessage('libraryMessage','목록을 불러오지 못했습니다.');return;}setMessage('libraryMessage','');
 if(!data.length){const empty=document.createElement('p');empty.className='empty-list';empty.textContent='아직 저장한 퍼즐이 없습니다.';$('puzzleList').append(empty);return;}
 for(const row of data){
  const card=document.createElement('article');card.className='puzzle-card';const img=document.createElement('img');img.className='puzzle-thumb';img.alt='';try{img.src=await imageUrlForPuzzle(row);}catch{img.alt='이미지를 불러오지 못함';}
  const body=document.createElement('div'),title=document.createElement('h3'),meta=document.createElement('p'),actions=document.createElement('div'),resume=document.createElement('button'),remove=document.createElement('button');
  title.textContent=row['퍼즐이름'];meta.className='puzzle-meta';meta.textContent=`${row['조각수']}피스 · ${row['맞춘조각수']}/${row['조각수']} · ${row['완성여부']?'완성':'진행 중'} · ${new Date(row['수정시각']).toLocaleDateString('ko-KR')}`;
  actions.className='puzzle-actions';resume.textContent=row['완성여부']?'다시 보기':'이어하기';resume.onclick=()=>restorePuzzle(row);remove.textContent='삭제';remove.className='danger';remove.onclick=()=>deletePuzzle(row);
  actions.append(resume,remove);body.append(title,meta,actions);card.append(img,body);$('puzzleList').append(card);
 }
}
async function deletePuzzle(row){
 if(!confirm(`'${row['퍼즐이름']}' 퍼즐을 삭제할까요?`))return;
 const {error}=await db.from('퍼즐저장').delete().eq('아이디',row['아이디']);if(error){setMessage('libraryMessage','퍼즐 삭제에 실패했습니다.');return;}
 if(row['이미지파일경로']){const {error:fileError}=await db.storage.from('puzzle-images').remove([row['이미지파일경로']]);if(fileError)console.error('고아 이미지 정리 실패',fileError);}
 if(currentPuzzleId===row['아이디']){forgetActivePuzzle();currentPuzzleId=null;$('saveState').hidden=true;}loadLibrary();
}
async function loadImage(url){return new Promise((resolve,reject)=>{const im=new Image();im.onload=()=>resolve(im);im.onerror=()=>reject(new Error('저장된 이미지를 불러오지 못했습니다.'));im.src=url;});}
async function restorePuzzle(row){
 setMessage('libraryMessage','퍼즐을 여는 중…');try{const url=await imageUrlForPuzzle(row);image=await loadImage(url);selectedName=row['퍼즐이름'];selectedUrl=url;selectedKind=row['이미지종류'];selectedFile=null;currentPuzzleId=row['아이디'];currentImagePath=row['이미지파일경로']||null;rememberActivePuzzle(currentPuzzleId);$('count').value=row['조각수'];$('range').value=row['조각수'];countChosen=true;seed=row['난수값'];closePanels();await beginPuzzle(row);return true;}catch(error){console.error(error);setMessage('libraryMessage',error.message||'퍼즐을 열지 못했습니다.');return false;}
}
async function beginPuzzle(saved=null){
 if(!image||!countChosen)return;stopSpawning();const id=generationId,n=count($('count').value),chosenImage=image;
 drag=null;releaseRenderCache();pieces=[];allPieces=[];spawnIndex=0;finished=false;started=0;if(!saved){currentPuzzleId=null;currentImagePath=null;seed=Math.random()*10000;}
 puzzleImage=chosenImage;$('preview').src=selectedUrl;$('preview').hidden=true;$('reference').setAttribute('aria-pressed','false');$('time').textContent='00:00';$('title').textContent=selectedName;
 $('setup').hidden=true;$('play').hidden=false;document.body.dataset.screen='play';$('spawnStatus').hidden=false;$('spawnText').textContent='퍼즐을 준비하고 있습니다…';$('spawnProgress').value=0;$('spawnProgress').max=n;$('gameHint').textContent=saved?'저장된 퍼즐을 복원하고 있습니다.':'조각을 드래그해 퍼즐을 맞춰보세요.';$('progress').textContent='0 / '+n+' 조각';resize();refreshAuthUI();
 await new Promise(resolve=>requestAnimationFrame(()=>setTimeout(resolve,0)));if(id!==generationId)return;
 allPieces=createPieces(n,chosenImage.naturalWidth/chosenImage.naturalHeight);
 if(saved){
  const state=saved['퍼즐상태']||{},byId=new Map(allPieces.map(p=>[p.id,p]));for(const pieceState of state['조각들']||[]){const p=byId.get(pieceState['번호']);if(p){p.x=pieceState['x좌표'];p.y=pieceState['y좌표'];p.locked=Boolean(pieceState['맞춤여부']);}}
  pieces=(state['순서']||[]).map(pieceId=>byId.get(pieceId)).filter(Boolean);for(const p of allPieces)if(!pieces.includes(p))pieces.push(p);
  buildRenderCache();for(const p of allPieces)if(p.locked)cacheLockedPiece(p);spawning=false;$('spawnStatus').hidden=true;finished=Boolean(saved['완성여부']);started=Date.now()-Number(saved['플레이시간밀리초']||0);$('time').textContent=formatTime(Number(saved['플레이시간밀리초']||0));if(state['화면']){scale=state['화면']['확대비율'];ox=state['화면']['가로이동'];oy=state['화면']['세로이동'];}showGuide=state['가이드']!==false;$('guide').setAttribute('aria-pressed',String(showGuide));$('guide').textContent=showGuide?'가이드 켜짐':'가이드 꺼짐';update();
 }else{
  spawning=true;spawnStartedAt=performance.now();allPieces=scatter(allPieces);buildRenderCache();resize();fitAll();started=Date.now();spawnNext(id);canvas.focus({preventScroll:true});if(currentUser){try{await createPuzzleRecord();scheduleSave(0);}catch(error){console.error(error);$('gameHint').textContent='퍼즐은 시작됐지만 계정 저장 준비에 실패했습니다. 저장 버튼으로 다시 시도해주세요.';}}
 }
}
function spawnNext(id){
 if(id!==generationId||!spawning)return;
 const elapsed=Math.max(0,performance.now()-spawnStartedAt);
 const target=Math.min(allPieces.length,Math.floor(allPieces.length*elapsed/SPAWN_DURATION_MS));
 while(spawnIndex<target)pieces.push(allPieces[spawnIndex++]);
 if(spawnIndex>=allPieces.length){spawning=false;spawnTimer=null;$('gameHint').textContent='조각을 정답 위치로 끌어 옮겨보세요.';$('spawnStatus').hidden=true;}
 else spawnTimer=setTimeout(()=>spawnNext(id),Math.max(1,Math.min(16,SPAWN_DURATION_MS-elapsed)));
 update();
}
$('start').onclick=()=>beginPuzzle();
async function goHome(){if(currentPuzzleId)await savePuzzleNow();forgetActivePuzzle();stopSpawning();drag=null;releaseRenderCache();started=0;pieces=[];allPieces=[];currentPuzzleId=null;currentImagePath=null;$('startupLoading').hidden=true;$('play').hidden=true;$('setup').hidden=false;document.body.dataset.screen='setup';$('progress').textContent='사진 한 장으로 시작하세요';$('time').textContent='00:00';selectionStatus();refreshAuthUI();window.scrollTo({top:0,behavior:'instant'});}
$('newPuzzle').onclick=goHome;
$('homeLogo').onclick=e=>{e.preventDefault();goHome();};
function update(){
 const n=pieces.filter(p=>p.locked).length,total=allPieces.length;
 $('progress').textContent=total?n+' / '+total+' 조각':'';
 if(spawning){$('spawnText').textContent='조각 생성 중 · '+spawnIndex+' / '+total;$('spawnProgress').value=spawnIndex;}
 if(total&&!spawning&&n===total){const justFinished=!finished;finished=true;$('gameHint').textContent='완성했습니다! 멋진 한 장이 되었습니다.';$('progress').textContent='퍼즐 완성 · '+total+'피스';if(justFinished)scheduleSave(0);}
 draw();
}
function resize(){const rect=canvas.getBoundingClientRect();vw=rect.width;vh=rect.height;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=Math.round(vw*dpr);canvas.height=Math.round(vh*dpr);draw();}new ResizeObserver(resize).observe($('table'));
function fitBox(x,y,w,h){scale=Math.min(vw/(w+100),vh/(h+100));ox=vw/2-(x+w/2)*scale;oy=vh/2-(y+h/2)*scale;draw();}
function fitAll(){if(!allPieces.length)return;let x=0,y=0,x2=W,y2=H;allPieces.forEach(p=>{x=Math.min(x,p.x-25);y=Math.min(y,p.y-25);x2=Math.max(x2,p.x+p.w+25);y2=Math.max(y2,p.y+p.h+25);});fitBox(x,y,x2-x,y2-y);}
$('all').onclick=fitAll;$('fit').onclick=()=>{if(pieces.length)fitBox(0,0,W,H);};
function zoom(f,cx=vw/2,cy=vh/2){const wx=(cx-ox)/scale,wy=(cy-oy)/scale;scale=Math.max(.008,Math.min(12,scale*f));ox=cx-wx*scale;oy=cy-wy*scale;draw();}$('plus').onclick=()=>zoom(1.4);$('minus').onclick=()=>zoom(1/1.4);canvas.onwheel=e=>{if(!pieces.length)return;e.preventDefault();const rect=canvas.getBoundingClientRect();zoom(Math.exp(-e.deltaY*.0015),e.clientX-rect.left,e.clientY-rect.top);};
let spriteAtlas=null,guideCache=null,lockedCache=null,cacheScale=1,drawFrame=0;
function releaseRenderCache(){for(const c of [spriteAtlas,guideCache,lockedCache])if(c){c.width=0;c.height=0;}spriteAtlas=guideCache=lockedCache=null;}
function makeLayer(width,height){const layer=document.createElement('canvas');layer.width=Math.max(1,Math.ceil(width));layer.height=Math.max(1,Math.ceil(height));return layer;}
function buildRenderCache(){
 releaseRenderCache();
 // Limit both raster resolution and total atlas memory on integrated GPUs.
 const area=allPieces.reduce((sum,p)=>sum+(p.w+4)*(p.h+4),0);
 cacheScale=Math.min(2,2048/Math.max(W,H),Math.sqrt(6000000/area));
 const source=makeLayer(W*cacheScale,H*cacheScale),sc=source.getContext('2d');sc.drawImage(puzzleImage,0,0,source.width,source.height);
 const sorted=[...allPieces].sort((a,b)=>b.h-a.h);let ax=0,ay=0,rowH=0;const atlasWidth=2048;
 for(const p of sorted){const w=Math.ceil(p.w*cacheScale)+4,h=Math.ceil(p.h*cacheScale)+4;if(ax+w>atlasWidth){ax=0;ay+=rowH;rowH=0;}p.sprite={x:ax,y:ay,w,h};ax+=w;rowH=Math.max(rowH,h);}
 spriteAtlas=makeLayer(atlasWidth,ay+rowH);const ac=spriteAtlas.getContext('2d');
 for(const p of allPieces){const s=p.sprite;ac.save();ac.translate(s.x+2,s.y+2);ac.scale(cacheScale,cacheScale);ac.translate(-p.tx,-p.ty);ac.save();ac.clip(p.path);ac.drawImage(source,p.tx*cacheScale,p.ty*cacheScale,p.w*cacheScale,p.h*cacheScale,p.tx,p.ty,p.w,p.h);ac.restore();ac.strokeStyle='#161015bb';ac.lineWidth=.75/cacheScale;ac.stroke(p.path);ac.restore();}
 guideCache=makeLayer(source.width,source.height);const gc=guideCache.getContext('2d');gc.globalAlpha=.12;gc.drawImage(source,0,0);gc.globalAlpha=1;gc.scale(cacheScale,cacheScale);gc.strokeStyle='#cfabb038';gc.lineWidth=.7/cacheScale;for(const p of allPieces)gc.stroke(p.path);
 lockedCache=makeLayer(source.width,source.height);lockedCache.getContext('2d').scale(cacheScale,cacheScale);
 source.width=source.height=0;
}
function paintSprite(target,p){const s=p.sprite;target.drawImage(spriteAtlas,s.x,s.y,s.w,s.h,p.x-2/cacheScale,p.y-2/cacheScale,s.w/cacheScale,s.h/cacheScale);}
function cacheLockedPiece(p){if(lockedCache)paintSprite(lockedCache.getContext('2d'),p);}
function draw(){if(drawFrame)return;drawFrame=requestAnimationFrame(()=>{drawFrame=0;render();});}
function render(){
 if(!vw||!vh)return;const dpr=Math.min(devicePixelRatio||1,1.5);ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,vw,vh);$('zoom').textContent=Math.round(scale*100)+'%';
 if(!allPieces.length||!spriteAtlas)return;
 ctx.translate(ox,oy);ctx.scale(scale,scale);ctx.fillStyle='#252329';ctx.fillRect(-8,-8,W+16,H+16);
 if(showGuide)ctx.drawImage(guideCache,0,0,W,H);ctx.drawImage(lockedCache,0,0,W,H);
 const left=-ox/scale,top=-oy/scale,right=(vw-ox)/scale,bottom=(vh-oy)/scale;
 const paint=p=>{if(p.x+p.w<left||p.y+p.h<top||p.x>right||p.y>bottom)return;paintSprite(ctx,p);};
 for(const p of pieces)if(!p.locked&&p!==drag?.piece)paint(p);
 if(drag?.piece){const p=drag.piece;paint(p);ctx.save();ctx.translate(p.x-p.tx,p.y-p.ty);ctx.strokeStyle='#ff4657';ctx.lineWidth=2/scale;ctx.stroke(p.path);ctx.restore();}
}
function point(e){const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left-ox)/scale,y:(e.clientY-r.top-oy)/scale,sx:e.clientX-r.left,sy:e.clientY-r.top};}
function findPieceAt(q){for(let i=pieces.length-1;i>=0;i--){const p=pieces[i];if(p.locked||q.x<p.x||q.y<p.y||q.x>p.x+p.w||q.y>p.y+p.h)continue;if(ctx.isPointInPath(p.path,q.x-p.x+p.tx,q.y-p.y+p.ty))return p;}return null;}
canvas.onpointerdown=e=>{
 if(!pieces.length||drag)return;e.preventDefault();canvas.focus();canvas.setPointerCapture(e.pointerId);const q=point(e);ctx.save();ctx.setTransform(1,0,0,1,0,0);
 const p=findPieceAt(q);ctx.restore();
 if(p){drag={piece:p,dx:q.x-p.x,dy:q.y-p.y,id:e.pointerId,oldX:p.x,oldY:p.y};pieces.splice(pieces.indexOf(p),1);pieces.push(p);}
 else drag={pan:true,sx:q.sx,sy:q.sy,ox,oy,id:e.pointerId};canvas.style.cursor=p?'grabbing':'move';draw();
};
canvas.onpointermove=e=>{if(!drag||drag.id!==e.pointerId)return;e.preventDefault();const q=point(e);if(drag.piece){drag.piece.x=q.x-drag.dx;drag.piece.y=q.y-drag.dy;}else{ox=drag.ox+q.sx-drag.sx;oy=drag.oy+q.sy-drag.sy;}draw();};
function autoFitPieceAt(e){
 if(drag||!pieces.length)return false;e.preventDefault();const q=point(e);
 // Hit testing must ignore the canvas' current zoom/pan transform.
 ctx.save();ctx.setTransform(1,0,0,1,0,0);const p=findPieceAt(q);ctx.restore();
 if(!p)return false;p.x=p.tx;p.y=p.ty;p.locked=true;cacheLockedPiece(p);update();scheduleSave();return true;
}
canvas.onclick=e=>{if(e.detail>=2)autoFitPieceAt(e);};
canvas.ondblclick=e=>autoFitPieceAt(e);
function end(e,cancel=false){if(!drag||drag.id!==e.pointerId)return;if(drag.piece){const p=drag.piece;if(cancel){p.x=drag.oldX;p.y=drag.oldY;}else if(Math.hypot(p.x-p.tx,p.y-p.ty)<Math.min(cw,ch)*.4){p.x=p.tx;p.y=p.ty;p.locked=true;cacheLockedPiece(p);}}drag=null;canvas.style.cursor='grab';update();if(!cancel)scheduleSave();}canvas.onpointerup=e=>end(e);canvas.onpointercancel=e=>end(e,true);
canvas.onkeydown=e=>{if(e.key==='+'||e.key==='='){zoom(1.3);e.preventDefault();}if(e.key==='-'){zoom(1/1.3);e.preventDefault();}const moves={ArrowLeft:[40,0],ArrowRight:[-40,0],ArrowUp:[0,40],ArrowDown:[0,-40]};if(moves[e.key]){e.preventDefault();ox+=moves[e.key][0];oy+=moves[e.key][1];draw();}};
$('reference').onclick=()=>{const hidden=$('preview').hidden;$('preview').hidden=!hidden;$('reference').setAttribute('aria-pressed',String(hidden));};$('guide').onclick=()=>{showGuide=!showGuide;$('guide').setAttribute('aria-pressed',String(showGuide));$('guide').textContent=showGuide?'가이드 켜짐':'가이드 꺼짐';draw();};
[['검정','#19191d'],['빨강','#481c25'],['회색','#303036'],['남색','#202432'],['보라','#302232']].forEach(([name,color],i)=>{const b=document.createElement('button');b.style.background=color;b.setAttribute('aria-label',name+' 배경');b.classList.toggle('selected',i===0);b.onclick=()=>{$('table').style.backgroundColor=color;[...$('colors').children].forEach(el=>el.classList.toggle('selected',el===b));};$('colors').append(b);});
function formatTime(ms){const s=Math.floor(ms/1000);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');}
$('authButton').onclick=()=>{setMessage('authMessage','');openPanel('auth');};$('libraryButton').onclick=loadLibrary;$('openLibrary').onclick=loadLibrary;$('panelBackdrop').onclick=closePanels;document.querySelectorAll('[data-close-panel]').forEach(b=>b.onclick=closePanels);
$('togglePassword').onclick=()=>{const password=$('authPassword'),show=password.type==='password';password.type=show?'text':'password';$('togglePassword').setAttribute('aria-pressed',String(show));$('togglePassword').setAttribute('aria-label',show?'비밀번호 숨기기':'비밀번호 표시');};
function hasSequentialDigits(password){return (password.match(/\d+/g)||[]).some(run=>{for(let i=0;i<run.length-2;i++){const a=Number(run[i]),b=Number(run[i+1]),c=Number(run[i+2]);if((b===a+1&&c===b+1)||(b===a-1&&c===b-1))return true;}return false;});}
function validNewPassword(password){if(password.length<8){setMessage('authMessage','비밀번호는 8자 이상 입력해주세요.');return false;}if(hasSequentialDigits(password)){setMessage('authMessage','비밀번호에 연속된 숫자 3개 이상은 사용할 수 없습니다.');return false;}return true;}
$('authForm').onsubmit=async e=>{e.preventDefault();setMessage('authMessage','로그인 중…');const email=$('authEmail').value.trim(),password=$('authPassword').value;const {error}=await db.auth.signInWithPassword({email,password});if(error){setMessage('authMessage','이메일 또는 비밀번호를 확인해주세요.');return;}setMessage('authMessage','로그인했습니다.',true);setTimeout(closePanels,500);};
const googleLoginButton=document.createElement('button');googleLoginButton.id='googleLoginButton';googleLoginButton.className='google-login';googleLoginButton.type='button';googleLoginButton.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.5-.2-2.2H12v4.3h5.4a4.6 4.6 0 0 1-2 3v2.8h3.2c1.9-1.8 3-4.4 3-7.9Z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.8c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.9A10 10 0 0 0 12 22Z"/><path fill="#FBBC05" d="M6.4 13.7a6 6 0 0 1 0-3.5V7.4H3.1a10 10 0 0 0 0 9.2l3.3-2.9Z"/><path fill="#EA4335" d="M12 6.2c1.5 0 2.8.5 3.8 1.5l2.9-2.8A9.7 9.7 0 0 0 3.1 7.4l3.3 2.8c.8-2.3 3-4 5.6-4Z"/></svg><span>Google로 계속하기</span>';const authDivider=document.createElement('div');authDivider.className='auth-divider';authDivider.innerHTML='<span>또는</span>';$('authForm').before(googleLoginButton,authDivider);googleLoginButton.onclick=async()=>{setMessage('authMessage','Google 로그인 페이지로 이동합니다…');const {error}=await db.auth.signInWithOAuth({provider:'google',options:{redirectTo:`${window.location.origin}/`,queryParams:{prompt:'select_account'}}});if(error)setMessage('authMessage','Google 로그인을 시작하지 못했습니다. 잠시 후 다시 시도해주세요.');};
$('signupButton').onclick=async()=>{const email=$('authEmail').value.trim(),password=$('authPassword').value;if(!$('authEmail').reportValidity())return;if(!validNewPassword(password)){$('authPassword').focus();return;}setMessage('authMessage','계정을 만드는 중…');const {data,error}=await db.auth.signUp({email,password,options:{data:{service_name:'퍼즐 스튜디오'}}});if(error){setMessage('authMessage',error.message);return;}if(!data.session){setMessage('authMessage','이메일 확인이 켜져 있어 바로 로그인할 수 없습니다. 수파베이스에서 이메일 확인을 꺼주세요.');return;}setMessage('authMessage','계정을 만들고 로그인했습니다.',true);setTimeout(closePanels,500);};
$('logoutButton').onclick=async()=>{if(currentPuzzleId)await savePuzzleNow();const {error}=await db.auth.signOut();if(error){setMessage('authMessage','로그아웃하지 못했습니다.');return;}closePanels();};
$('saveState').onclick=savePuzzleNow;
db.auth.onAuthStateChange((event,session)=>{currentUser=session?.user||null;refreshAuthUI();if(currentUser)setTimeout(()=>{if(startupResolved&&event==='SIGNED_IN')restoreLastPuzzle();},0);else autoRestoreUserId=null;});
db.auth.getSession().then(async({data})=>{currentUser=data.session?.user||null;refreshAuthUI();let restored=false;if(currentUser)restored=await restoreLastPuzzle();finishStartup(restored);}).catch(error=>{console.error('시작 상태 확인 실패',error);finishStartup(false);});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&currentPuzzleId)scheduleSave(0);});
setInterval(()=>{if(!started||finished)return;$('time').textContent=formatTime(Date.now()-started);},1000);resize();refreshAuthUI();
