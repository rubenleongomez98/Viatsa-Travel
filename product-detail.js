/* Product presentation only; catalogue and quote API remain authoritative. */
(() => {
  'use strict';
  const {t,esc,name,regions,duration,photo,route,description}=VIATSA_UI;
  const p=VIATSA_CATALOG.bySlug(document.body.dataset.product);
  if(!p||p.status!=='active'){location.replace('/aventuras.html');return}
  const tx=s=>VIATSA_UI.lang==='en'?(p.editorial?.translations?.[s]||VIATSA_CATALOG.translations?.[s]||s):s;
  const list=items=>'<ul>'+items.map(x=>'<li>'+esc(tx(x))+'</li>').join('')+'</ul>';
  const section=(heading,html,cls='')=>html?'<section class="vd-section '+cls+'"><h2>'+heading+'</h2><div class="vd-section-content">'+html+'</div></section>':'';
  const gallery=(p.images||[]).flatMap(src=>Array.from({length:VIATSA_CATALOG.mediaFrames[src]||1},(_,frame)=>({src,frame})));
  const galleryHtml=gallery.length>1?'<div class="v-gallery-controls"><button type="button" data-gallery="-1" aria-label="'+t('Foto anterior','Previous photo')+'">←</button><button type="button" data-gallery="1" aria-label="'+t('Foto siguiente','Next photo')+'">→</button></div><div class="v-gallery" tabindex="0" role="region" aria-label="'+t('Galería de fotos','Photo gallery')+'">'+gallery.map((f,i)=>'<figure>'+photo(f.src,name(p)+' — '+(i+1),'',true,f.frame)+'<figcaption>'+String(i+1).padStart(2,'0')+' / '+String(gallery.length).padStart(2,'0')+'</figcaption></figure>').join('')+'</div>':'';
  // Render only a supplied itinerary. Never infer a schedule from destination order.
  const itinerary=(p.itinerary||[]).map((day,i)=>{
    const title=typeof day==='string'?day:day.title;
    const body=typeof day==='object'?day.description:'';
    return '<li><span class="v-kicker">'+t('Día ','Day ')+(i+1)+'</span><div>'+(title?'<h3>'+esc(tx(title))+'</h3>':'')+(body?'<p>'+esc(tx(body))+'</p>':'')+'</div></li>';
  }).join('');
  const related=VIATSA_CATALOG.active('adventure').filter(x=>x.id!==p.id);
  const contact='https://wa.me/'+VIATSA_CATALOG.contact.whatsapp.replace(/\D/g,'')+'?text='+encodeURIComponent(t('Hola, quisiera información sobre ','Hello, I would like information about ')+name(p));
  document.title=name(p)+' — VIATSA Travel';
  document.querySelector('#product').innerHTML=
    '<nav class="v-crumbs" aria-label="'+t('Ruta de navegación','Breadcrumbs')+'"><a href="/"> '+t('Inicio','Home')+'</a><span>/</span><a href="/aventuras.html">'+t('Aventuras','Adventures')+'</a><span aria-current="page">/ '+esc(name(p))+'</span></nav>'+
    '<section class="v-product-hero"><div class="vd-hero-copy"><span class="v-kicker">'+esc(regions[p.region])+' · '+t('Viaje privado','Private trip')+'</span><h1>'+esc(name(p))+'</h1><div class="v-facts"><span>'+duration(p)+'</span></div><p>'+esc(description(p))+'</p><a class="v-button" href="#booking">'+t('Configura tu viaje','Make this trip yours')+'</a></div>'+photo(p.heroImage,name(p),'',false)+'</section>'+
    '<div class="v-product-copy">'+
    section(t('La esencia de esta aventura','The spirit of this adventure'),p.highlights?.length?'<ul class="v-highlights">'+p.highlights.map((x,i)=>'<li><span>'+String(i+1).padStart(2,'0')+'</span>'+esc(tx(x))+'</li>').join('')+'</ul>':'')+
    section(t('Día a día','Day by day'),itinerary?'<ol class="vd-itinerary">'+itinerary+'</ol>':'')+
    section(t('Los lugares que nos esperan','Places along the way'),p.destinations?.length?'<ul class="vd-places">'+p.destinations.map(x=>'<li>'+esc(tx(x))+'</li>').join('')+'</ul>':'')+
    section(t('Una mirada al viaje','A glimpse of the journey'),galleryHtml,'vd-photography')+
    section(t('Tu viaje, preparado','Your trip, arranged'),(p.included?.length||p.notIncluded?.length)?'<div class="v-inclusions">'+(p.included?.length?'<div><h3>'+t('Incluye','Included')+'</h3>'+list(p.included)+'</div>':'')+(p.notIncluded?.length?'<div><h3>'+t('No incluye','Not included')+'</h3>'+list(p.notIncluded)+'</div>':'')+'</div>':'')+
    section(t('Antes de salir','Before you go'),'<div class="v-practical">'+(p.pickup?'<details><summary>'+t('Recogida y salida','Pickup and departure')+'</summary><p>'+esc(tx(p.pickup))+'</p></details>':'')+(p.whatToBring?.length?'<details><summary>'+t('Qué llevar','What to bring')+'</summary>'+list(p.whatToBring)+'</details>':'')+(p.restrictions?'<details><summary>'+t('Accesibilidad y condiciones','Accessibility and conditions')+'</summary><p>'+esc(tx(p.restrictions))+'</p></details>':'')+'<details><summary>'+t('Reserva, cambios y cancelación','Booking, changes and cancellation')+'</summary><p>'+t('Confirmamos fechas y condiciones contigo antes de reservar. Puedes consultar nuestra política completa.','We confirm dates and conditions with you before booking. Read our full policy.')+'</p><a class="v-link" href="/terminos.html">'+t('Términos y condiciones','Terms and conditions')+'</a></details></div>')+'</div>'+
    '<section id="booking" class="v-booking" aria-labelledby="booking-heading"><span class="v-kicker">'+esc(name(p))+'</span><h2 id="booking-heading">'+t('Configura tu viaje','Make this trip yours')+'</h2><p>'+t('Organizamos tu aventura privada desde Santo Domingo. Nuestro equipo confirmará disponibilidad y preparará tu reserva.','We arrange your private adventure from Santo Domingo. Our team will confirm availability and prepare your reservation.')+'</p><a class="v-button" href="'+esc(contact)+'" target="_blank" rel="noopener">'+t('Solicitar cotización','Request a quote')+'</a></section>'+
    '<section class="v-section vd-related"><div class="v-section-head"><h2>'+t('Otros caminos por la isla','Other paths around the island')+'</h2></div><div class="v-related">'+related.map(x=>'<a href="'+route(x)+'">'+photo(x.heroImage,name(x))+'<span class="v-kicker">'+regions[x.region]+' / '+duration(x)+'</span><h3>'+esc(name(x))+'</h3></a>').join('')+'</div></section>'+
    '<section class="vd-final"><div><span class="v-kicker">'+esc(name(p))+'</span><h2>'+t('Tu próxima historia empieza aquí.','Your next story starts here.')+'</h2></div><a class="v-button" href="#booking">'+t('Configura tu viaje','Make this trip yours')+'</a></section>'+
    '<div class="v-bottom"><span>'+t('Tu viaje privado','Your private trip')+'<br><b>'+t('Precio a consultar','Price on request')+'</b></span><button class="v-button" id="mobile-plan" type="button">'+t('Configurar viaje','Configure trip')+'</button></div>';
  document.querySelector('#mobile-plan').onclick=()=>document.querySelector('#booking').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
  document.querySelectorAll('[data-gallery]').forEach(b=>b.onclick=()=>{const g=document.querySelector('.v-gallery');g.scrollBy({left:Number(b.dataset.gallery)*(g.querySelector('figure').getBoundingClientRect().width+24),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})});
})();
