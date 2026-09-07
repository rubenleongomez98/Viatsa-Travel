const experiencePhotos={
  'Isla Saona':{src:'saona-strip.webp',count:4},
  'Buggies Punta Cana':{src:'buggies-strip.webp',count:4},
  'Recorrido por Río San Juan':{src:'rio-strip.webp',count:2},
  'Recorrido por Samaná':{src:'vuelta-strip.webp',count:4},
  'Río Partido, Salcedo':{src:'rio-strip.webp',count:2},
  'Cascadas Vírgenes':{src:'perla-15.webp',count:1}
};
const photoStyles=document.createElement('style');
photoStyles.textContent=`.card-carousel{height:210px;margin:-27px -27px 24px;position:relative;overflow:hidden}.carousel-track{display:flex;width:100%;height:100%;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}.carousel-track::-webkit-scrollbar{display:none}.photo-frame{display:block;flex:0 0 100%;width:100%;height:100%;background-image:var(--photo);background-size:calc(var(--frames)*100%) 100%;background-position:var(--pos) center;background-repeat:no-repeat;scroll-snap-align:start}.carousel-arrow{position:absolute;top:50%;transform:translateY(-50%);width:38px;height:38px;border:0;border-radius:50%;background:#fff;color:#29291f;font-size:25px;cursor:pointer;box-shadow:0 4px 16px #0003}.carousel-arrow.prev{left:12px}.carousel-arrow.next{right:12px}.carousel-count{position:absolute;right:12px;bottom:10px;background:#29291fcc;color:#fff;padding:5px 9px;font-size:10px}.card.has-photos h3{margin-top:12px}.trip-gallery{display:grid;grid-template-columns:2fr 1fr 1fr;gap:8px;margin:26px 0}.trip-gallery .photo-frame{height:190px}.trip-gallery .photo-frame:first-child{grid-row:span 2;height:388px}@media(max-width:650px){.trip-gallery{grid-template-columns:1fr 1fr}.trip-gallery .photo-frame,.trip-gallery .photo-frame:first-child{height:180px;grid-row:auto}}`;
document.head.appendChild(photoStyles);
function photoFrame(set,name,i){const pos=set.count===1?0:i/(set.count-1)*100;return `<span class="photo-frame" role="img" aria-label="${name}, foto ${i+1}" style="--photo:url('${set.src}');--frames:${set.count};--pos:${pos}%"></span>`}
function experienceCarousel(name,set){return `<div class="card-carousel" data-carousel><div class="carousel-track">${Array.from({length:set.count},(_,i)=>photoFrame(set,name,i)).join('')}</div><button class="carousel-arrow prev" type="button" aria-label="Foto anterior">‹</button><button class="carousel-arrow next" type="button" aria-label="Foto siguiente">›</button><span class="carousel-count">1 / ${set.count}</span></div>`}
draw=function(){
  const items=P.filter(p=>p[0]===T&&(Z==='todas'||p[1]===Z||p[1]==='todas'));
  count.textContent=`${items.length} experiencias de un día`;
  C.innerHTML=items.length?items.map(p=>{const photos=experiencePhotos[p[3]];return `<article class="card ${photos?'has-photos':''}">${photos?experienceCarousel(p[3],photos):''}<div class="meta"><span>${p[2]}</span><span>${p[4]}</span></div><h3>${p[3]}</h3><p>${p[5]}</p><div class="places">${p[6].split('|').slice(0,3).join(' · ')}</div><div class="price">${p[8]}</div><button class="more" data-i="${P.indexOf(p)}">Ver todos los detalles</button></article>`}).join(''):'<div class="empty">No hay propuestas publicadas en esta zona todavía.</div>';
};
C.addEventListener('click',e=>{const arrow=e.target.closest('.carousel-arrow');if(!arrow)return;const carousel=arrow.closest('[data-carousel]'),track=carousel.querySelector('.carousel-track');track.scrollBy({left:(arrow.classList.contains('next')?1:-1)*track.clientWidth,behavior:'smooth'});setTimeout(()=>{carousel.querySelector('.carousel-count').textContent=`${Math.round(track.scrollLeft/track.clientWidth)+1} / ${track.children.length}`},380)});
const baseExperienceOpen=openP;
openP=function(p){
  const photos=experiencePhotos[p[3]];
  if(!photos)return baseExperienceOpen(p);
  D.innerHTML=`<span class="eyebrow">${p[2]} · ${p[4]}</span><h2>${p[3]}</h2><p class="lead">${p[5]}</p><div class="trip-gallery">${Array.from({length:photos.count},(_,i)=>photoFrame(photos,p[3],i)).join('')}</div><div class="cols"><div><h4>Lugares de la ruta</h4><ul>${p[6].split('|').map(x=>`<li>${x}</li>`).join('')}</ul></div><div><h4>Incluye</h4><ul>${p[7].split('|').map(x=>`<li>${x}</li>`).join('')}</ul></div></div><div class="note">${p[9]} Horarios, disponibilidad y condiciones se confirman al preparar la propuesta.</div><div class="foot"><strong>${p[8]}</strong><a class="wa" target="_blank" rel="noopener" href="https://wa.me/18099723232?text=${encodeURIComponent('Hola, quiero conocer más sobre '+p[3])}">Consultar por WhatsApp</a></div>`;
  M.showModal();
};
draw();
