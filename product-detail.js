(() => {
  'use strict';
  const {t,esc,name,regions,duration,photo,route,description}=VIATSA_UI;
  const p=VIATSA_CATALOG.bySlug(document.body.dataset.product);
  if(!p||p.status!=='active'){location.replace('/aventuras.html');return}
  const tx=s=>VIATSA_UI.lang==='en'?(p.editorial?.translations?.[s]||VIATSA_CATALOG.translations?.[s]||s):s;
  const list=items=>`<ul>${items.map(x=>`<li>${esc(tx(x))}</li>`).join('')}</ul>`;
  const section=(heading,html)=>html?`<section><h2>${heading}</h2>${html}</section>`:'';
  const gallery=p.images.flatMap(src=>Array.from({length:VIATSA_CATALOG.mediaFrames[src]||1},(_,frame)=>({src,frame})));
  const galleryHtml=gallery.length>1?`<div class="v-gallery-controls"><button type="button" data-gallery="-1" aria-label="${t('Foto anterior','Previous photo')}">←</button><button type="button" data-gallery="1" aria-label="${t('Foto siguiente','Next photo')}">→</button></div><div class="v-gallery" tabindex="0" role="region" aria-label="${t('Galería de fotos','Photo gallery')}">${gallery.map((f,i)=>`<figure>${photo(f.src,name(p)+' — '+(i+1),'',true,f.frame)}<figcaption>${String(i+1).padStart(2,'0')} / ${String(gallery.length).padStart(2,'0')}</figcaption></figure>`).join('')}</div>`:'';
  const related=VIATSA_CATALOG.active('adventure').filter(x=>x.id!==p.id);
  document.title=name(p)+' — VIATSA Travel';
  document.querySelector('#product').innerHTML=`
    <nav class="v-crumbs" aria-label="${t('Ruta de navegación','Breadcrumbs')}"><a href="/">${t('Inicio','Home')}</a><span>/</span><a href="/aventuras.html">${t('Aventuras','Adventures')}</a><span>/ ${esc(name(p))}</span></nav>
    <section class="v-product-hero"><div><span class="v-kicker">${regions[p.region]} · ${t('Viaje privado','Private trip')}</span><h1>${esc(name(p))}</h1><p>${esc(description(p))}</p><div class="v-facts"><span>${duration(p)}</span><span>${t('Español e inglés','Spanish & English')}</span></div><a class="v-link" href="#booking">${t('Planificar esta ruta','Plan this route')} ↗</a></div>${photo(p.heroImage,name(p),'',false)}</section>
    <div class="v-product-layout"><div class="v-product-copy">
      ${section(t('Así se vive la ruta','A feel for the journey'),p.highlights?.length?`<ul class="v-highlights">${p.highlights.map(x=>`<li>${esc(tx(x))}</li>`).join('')}</ul>`:'')}
      ${section(t('En imágenes','In pictures'),galleryHtml)}
      ${section(t('Los lugares que nos esperan','Places along the way'),p.destinations?.length?list(p.destinations):'')}
      ${section(t('El itinerario','The itinerary'),p.itinerary?.length?list(p.itinerary):'')}
      ${section(t('Tu viaje, preparado','Your trip, arranged'),`<div class="v-inclusions"><div><h3>${t('Incluye','Included')}</h3>${list(p.included||[])}</div>${p.notIncluded?.length?`<div><h3>${t('No incluye','Not included')}</h3>${list(p.notIncluded)}</div>`:''}</div>`)}
      ${section(t('Antes de salir','Before you go'),`<div class="v-practical">${p.pickup?`<details><summary>${t('Recogida y salida','Pickup and departure')}</summary><p>${esc(tx(p.pickup))}</p></details>`:''}${p.whatToBring?.length?`<details><summary>${t('Qué llevar','What to bring')}</summary>${list(p.whatToBring)}</details>`:''}${p.restrictions?`<details><summary>${t('Accesibilidad y condiciones','Accessibility and conditions')}</summary><p>${esc(tx(p.restrictions))}</p></details>`:''}<details><summary>${t('Reserva, cambios y cancelación','Booking, changes and cancellation')}</summary><p>${t('Confirmamos fechas y condiciones contigo antes de reservar. Puedes consultar nuestra política completa.','We confirm dates and conditions with you before booking. Read our full policy.')}</p><a class="v-link" href="/terminos.html">${t('Términos y condiciones','Terms and conditions')} ↗</a></details></div>`)}
    </div>
    <aside id="booking" class="v-booking" aria-labelledby="booking-heading"><span class="v-kicker">${t('Tu próxima aventura','Your next adventure')}</span><h2 id="booking-heading">${t('Vamos a organizarla.','Let’s plan it.')}</h2><p class="v-small">${t('Cuéntanos cuántos sois y cuándo os gustaría venir.','Tell us how many are travelling and when you would like to come.')}</p>
      <form id="quote-form"><div class="v-field"><label for="travelers">${t('Viajeros','Travelers')}</label><div class="v-stepper"><button type="button" data-step="-1" aria-label="${t('Quitar un viajero','Remove a traveler')}">−</button><input id="travelers" name="travelers" type="number" inputmode="numeric" min="${p.minimumGuests||1}" step="1" value="${p.minimumGuests||1}" required aria-describedby="traveler-hint form-error"><button type="button" data-step="1" aria-label="${t('Añadir un viajero','Add a traveler')}">+</button></div><p id="traveler-hint" class="v-small">${t('Desde','From')} ${p.minimumGuests||1} ${t('viajeros','travelers')}.</p></div>
      <div class="v-field"><label for="travel-date">${t('Fecha deseada · opcional','Preferred date · optional')}</label><input id="travel-date" name="date" type="date" aria-describedby="date-hint"><p id="date-hint" class="v-small">${t('Confirmaremos la disponibilidad personalmente.','We will confirm availability personally.')}</p></div>
      ${p.pickup?`<details class="v-pickup"><summary>${t('Añadir punto de recogida','Add a pickup point')}</summary><div class="v-field"><label for="pickup">${t('Hotel, ciudad o aeropuerto','Hotel, city or airport')}</label><input id="pickup" name="pickup" type="text" maxlength="200" autocomplete="off"></div></details>`:''}
      ${p.extras?.length?`<details><summary>${t('Opciones adicionales','Additional options')}</summary>${p.extras.map(x=>`<label style="display:flex;min-height:44px;gap:10px;align-items:center"><input type="checkbox" name="extras" value="${esc(x.id)}">${esc(tx(x.name))}</label>`).join('')}</details>`:''}
      <div class="v-quote-state" aria-live="polite"><strong>${t('Precio a consultar','Price on request')}</strong><span id="quote-copy">${t('Recibirás una propuesta para tu grupo.','You will receive a proposal for your group.')}</span></div><p id="form-error" class="v-form-error" role="alert"></p><button class="v-button" type="submit">${t('Solicitar cotización','Request a quote')} ↗</button><p class="v-small">${t('Sin pago ni reserva automática.','No payment or automatic booking.')}</p></form>
    </aside></div>
    <section class="v-section">${section(t('Otros caminos por la isla','Other paths around the island'),`<div class="v-related">${related.map(x=>`<a href="${route(x)}">${photo(x.heroImage,name(x))}<span class="v-kicker" style="margin:18px 0 0">${regions[x.region]} / ${duration(x)}</span><h3>${esc(name(x))} ↗</h3></a>`).join('')}</div>`)}</section>
    <div class="v-bottom"><span>${t('Tu viaje privado','Your private trip')}<br><b>${t('Precio a consultar','Price on request')}</b></span><button class="v-button" id="mobile-plan" type="button">${t('Planificar mi viaje','Plan my trip')} ↗</button></div>`;
  const form=document.querySelector('#quote-form'),travelers=form.elements.travelers,date=form.elements.date;
  const today=new Date();date.min=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
  function state(){return {productId:p.id,product:name(p),travelers:travelers.value,date:date.value,pickup:form.elements.pickup?.value||'',extras:[...form.querySelectorAll('[name=extras]:checked')].map(el=>el.value)}}
  function update(){
    const n=Number(travelers.value);
    document.querySelector('[data-step="-1"]').disabled=!Number.isSafeInteger(n)||n<=(p.minimumGuests||1);
    document.querySelector('#form-error').textContent=travelers.value&&(!Number.isSafeInteger(n)||n<(p.minimumGuests||1))?t('Indica al menos '+(p.minimumGuests||1)+' viajeros.','Enter at least '+(p.minimumGuests||1)+' travelers.'):'';
    document.querySelector('#quote-copy').textContent=n>4?t('Este tamaño de grupo requiere una cotización personalizada.','This group size requires a personalised quote.'):t('Recibirás una propuesta para tu grupo.','You will receive a proposal for your group.');
    try{sessionStorage.setItem('viatsa-quote-'+p.id,JSON.stringify(state()))}catch{}
  }
  try{const saved=JSON.parse(sessionStorage.getItem('viatsa-quote-'+p.id)||'null');if(saved){travelers.value=saved.travelers;date.value=saved.date;if(form.elements.pickup)form.elements.pickup.value=saved.pickup;if(saved.pickup)form.querySelector('.v-pickup').open=true}}catch{}
  form.addEventListener('input',update);
  form.querySelectorAll('[data-step]').forEach(b=>b.onclick=()=>{travelers.value=Math.max(p.minimumGuests||1,(Number(travelers.value)||p.minimumGuests||1)+Number(b.dataset.step));update()});
  form.addEventListener('submit',e=>{e.preventDefault();update();if(!form.reportValidity())return;const s=state();const q=new URLSearchParams({...s,extras:s.extras.join(',')});location.href='/viajes-a-medida.html?'+q});
  document.querySelector('#mobile-plan').onclick=()=>{document.querySelector('#booking').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});travelers.focus({preventScroll:true})};
  document.querySelectorAll('[data-gallery]').forEach(b=>b.onclick=()=>{const g=document.querySelector('.v-gallery');g.scrollBy({left:Number(b.dataset.gallery)*(g.querySelector('figure').getBoundingClientRect().width+14),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});
  update();
})();
