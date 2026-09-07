const adventureDetails = {
  'Vuelta a la Isla': {
    duration: '6 días / 5 noches', schedule: 'Salida aproximada a las 5:00 a. m. El último día, regreso con salida máxima a las 5:00 p. m.',
    pickup: 'Recogida disponible en cualquier punto. Fuera de Santo Domingo puede aplicar un costo adicional.', availability: 'Todos los días, sujeto a disponibilidad.',
    excluded: ['Cenas', 'Propinas', 'Bebidas alcohólicas'], capacity: 'Mínimo 2 personas.', languages: 'Español e inglés.',
    pricing: 'Tarifa publicada: US$1,250 p/p. La información de modalidad indica precio total para 1–4 viajeros y precio por persona desde 5 viajeros; se valida al cotizar.'
  },
  'Sur Profundo': {
    duration: '2 días / 1 noche', schedule: 'Salida aproximada a las 5:00 a. m. El último día, regreso con salida máxima a las 2:30 p. m.',
    pickup: 'Recogida disponible en cualquier punto. Fuera de Santo Domingo puede aplicar un costo adicional.', availability: 'Todos los días, sujeto a disponibilidad.',
    excluded: ['Cenas', 'Propinas', 'Bebidas alcohólicas'], capacity: 'Mínimo 2 personas.', languages: 'Español e inglés.', pricing: 'US$1,240 total para 1–4 viajeros. Desde 5 viajeros: US$340 por persona.'
  },
  'Entre Cascadas y Palmeras': {
    duration: '2 días / 1 noche', schedule: 'Salida aproximada a las 5:00 a. m. El último día, regreso con salida máxima a las 5:00 p. m.',
    pickup: 'Recogida disponible en cualquier punto. Fuera de Santo Domingo puede aplicar un costo adicional.', availability: 'Todos los días, sujeto a disponibilidad.',
    excluded: ['Cenas', 'Propinas', 'Bebidas alcohólicas'], capacity: 'Mínimo 2 personas.', languages: 'Español e inglés.', pricing: 'US$1,270 total para 1–4 viajeros. Desde 5 viajeros: US$350 por persona.'
  }
};
const sharedTripDetails = {
  bring: 'Ropa ligera y cómoda, mínimo dos trajes de baño, zapatillas cerradas para senderos o cascadas, sandalias de agua, gorra, gafas de sol, protector solar y repelente. Mochila pequeña, botella reutilizable, toalla de microfibra, funda impermeable para el móvil, cargador o power bank, medicación personal, documento de identidad o pasaporte y efectivo en pesos para compras pequeñas.',
  restrictions: 'El vehículo y varias paradas no son accesibles para silla de ruedas. Cualquier condición médica debe informarse al reservar.',
  booking: 'Requiere confirmación previa. Verificamos fechas y alojamientos y respondemos en un máximo de 24 horas. La reserva queda firme con un depósito del 50%; el resto se paga hasta 3 días antes de la salida.',
  cancellation: 'Más de 30 días antes: reembolso del depósito menos gastos no recuperables. Entre 15 y 30 días: se retiene el 50% del total. Menos de 15 días o no presentación: sin reembolso. Se permite un cambio de fecha sin costo, sujeto a disponibilidad. Si VIATSA cancela por causa mayor, se ofrece nueva fecha o reembolso íntegro.'
};
function updateAdventure(name, changes) { const trip=P.find(p=>p[3]===name); if(trip) Object.entries(changes).forEach(([index,value])=>trip[Number(index)]=value); }
updateAdventure('Recorrido por el Sur',{2:'2 días · 1 noche',3:'Sur Profundo',5:'Una aventura privada por el sur profundo entre playas, balnearios y paisajes costeros.',8:'US$1,240 total · US$340 p/p desde 5',9:'Cotización y confirmación previa.'});
updateAdventure('Entre Cascadas y Palmeras',{2:'2 días · 1 noche',8:'US$1,270 total · US$350 p/p desde 5',9:'Cotización y confirmación previa.'});
updateAdventure('Vuelta a la Isla',{2:'6 días · 5 noches',8:'US$1,250 p/p',9:'Cotización y confirmación previa.'});
const surPhotos=['perla-15.webp','perla-05.webp','perla-10.webp','perla-11.webp','perla-14.webp','perla-16.webp'];
const vueltaPhotos={src:'vuelta-strip.webp',count:4};
const adventurePhotos={'Sur Profundo':surPhotos,'Perla del Sur':surPhotos,'Vuelta a la Isla':vueltaPhotos};
const adventurePhotoStyle=document.createElement('style');
adventurePhotoStyle.textContent='.photo-frame{display:block;flex:0 0 100%;width:100%;height:100%;background-image:var(--photo);background-size:calc(var(--frames)*100%) 100%;background-position:var(--pos) center;background-repeat:no-repeat;scroll-snap-align:start}.trip-gallery .photo-frame{height:190px}.trip-gallery .photo-frame:first-child{grid-row:span 2;height:388px}';
document.head.appendChild(adventurePhotoStyle);
function adventurePhotoMarkup(set,name){if(Array.isArray(set))return set.map((src,i)=>`<img src="${src}" alt="${name} ${i+1}" loading="${i?'lazy':'eager'}">`).join('');return Array.from({length:set.count},(_,i)=>`<span class="photo-frame" role="img" aria-label="${name} ${i+1}" style="--photo:url('${set.src}');--frames:${set.count};--pos:${set.count===1?0:i/(set.count-1)*100}%"></span>`).join('')}
draw=function(){
  const items=P.filter(p=>p[0]===T&&(Z==='todas'||p[1]===Z||p[1]==='todas'));
  count.textContent=`${items.length} aventuras de 2 a 6 días`;
  C.innerHTML=items.length?items.map(p=>`<article class="card">
    ${adventurePhotos[p[3]]?`<div class="card-carousel" data-carousel><div class="carousel-track">${adventurePhotoMarkup(adventurePhotos[p[3]],p[3])}</div><button class="carousel-arrow prev" type="button" aria-label="Foto anterior">‹</button><button class="carousel-arrow next" type="button" aria-label="Foto siguiente">›</button><span class="carousel-count">1 / ${Array.isArray(adventurePhotos[p[3]])?adventurePhotos[p[3]].length:adventurePhotos[p[3]].count}</span></div>`:''}
    <div class="meta"><span>${p[2]}</span><span>${p[4]}</span></div><h3>${p[3]}</h3><p>${p[5]}</p><div class="places">${p[6].split('|').slice(0,3).join(' · ')}</div><div class="price">${p[8]}</div><button class="more" data-i="${P.indexOf(p)}">Ver todos los detalles</button></article>`).join(''):'<div class="empty">No hay propuestas publicadas en esta zona todavía.</div>';
  C.querySelectorAll('.carousel-track').forEach(track=>track.addEventListener('scroll',()=>{const current=Math.round(track.scrollLeft/track.clientWidth)+1;track.closest('[data-carousel]').querySelector('.carousel-count').textContent=`${current} / ${track.children.length}`},{passive:true}));
};
C.addEventListener('click',e=>{
  const arrow=e.target.closest('.carousel-arrow'); if(!arrow)return;
  const carousel=arrow.closest('[data-carousel]'),track=carousel.querySelector('.carousel-track');
  const direction=arrow.classList.contains('next')?1:-1; track.scrollBy({left:direction*track.clientWidth,behavior:'smooth'});
  setTimeout(()=>{const current=Math.round(track.scrollLeft/track.clientWidth)+1;carousel.querySelector('.carousel-count').textContent=`${current} / ${track.children.length}`},380);
});
const originalOpenP=openP;
openP=function(p){
  const x=adventureDetails[p[3]]; if(!x) return originalOpenP(p);
  const gallery=adventurePhotos[p[3]]||[];
  D.innerHTML=`<span class="eyebrow">${x.duration} · ${p[4]}</span><h2>${p[3]}</h2><p class="lead">${p[5]}</p>${gallery&&(Array.isArray(gallery)?gallery.length:gallery.count)?`<div class="trip-gallery">${adventurePhotoMarkup(gallery,p[3])}</div>`:''}
  <div class="cols"><div><h4>Lugares de la ruta</h4><ul>${p[6].split('|').map(v=>`<li>${v}</li>`).join('')}</ul></div><div><h4>Incluye</h4><ul>${p[7].split('|').map(v=>`<li>${v}</li>`).join('')}</ul></div></div>
  <div class="info-grid"><section><h4>Horario</h4><p>${x.schedule}</p></section><section><h4>Recogida</h4><p>${x.pickup}</p></section><section><h4>Disponibilidad</h4><p>${x.availability}</p></section><section><h4>Precio y capacidad</h4><p>${x.pricing}<br>${x.capacity}</p></section><section><h4>No incluido</h4><p>${x.excluded.join(', ')}.</p></section><section><h4>Idiomas</h4><p>${x.languages}</p></section></div>
  <h4>Qué llevar</h4><p>${sharedTripDetails.bring}</p><h4>Restricciones</h4><p>${sharedTripDetails.restrictions}</p>
  <div class="note"><strong>Reserva:</strong> ${sharedTripDetails.booking}</div><h4>Cancelación</h4><p>${sharedTripDetails.cancellation}</p>
  <div class="contact-line">WhatsApp: +1 809 972 3232 · viatsatravel@gmail.com</div><div class="foot"><strong>${p[8]}</strong><a class="wa" target="_blank" rel="noopener" href="https://wa.me/18099723232?text=${encodeURIComponent('Hola, quiero cotizar '+p[3])}">Solicitar disponibilidad</a></div>`; M.showModal();
};
draw();
