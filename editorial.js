/* Shared presentation helpers. Only public catalogue data is consumed here. */
(() => {
  'use strict';
  if(!document.querySelector('link[rel="icon"]')){const icon=document.createElement('link');icon.rel='icon';icon.href='/brand-logo-white.png';document.head.append(icon)}
  let lang='es';try{lang=localStorage.getItem('viatsa-lang')==='en'?'en':'es'}catch{}
  const t=(es,en)=>lang==='en'?en:es;
  const esc=(s='')=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const name=p=>p.name[lang]||p.name.es;
  const regions={sur:t('Sur','South'),samana:'Samaná',norte:t('Costa norte','North coast'),este:t('Este','East'),'santo-domingo':'Santo Domingo',todas:t('Toda la isla','Across the island')};
  const duration=p=>lang==='es'?p.duration.label:`${p.duration.days} ${p.duration.days===1?'day':'days'}${p.nights?' · '+p.nights+' '+(p.nights===1?'night':'nights'):''}`;
  const route=p=>p.type==='adventure'?'/aventuras/'+p.slug+'/':'/experiencias.html?producto='+encodeURIComponent(p.id);
  const description=p=>lang==='en'?(p.editorial?.descriptionEn||p.shortDescription):p.shortDescription;
  const photo=(src,alt,cls='',lazy=true,frame=0)=>{
    if(!src)return '';
    const frames=window.VIATSA_CATALOG.mediaFrames?.[src]||1;
    return `<span class="v-photo ${frames>1?'strip ':''}${cls}" data-frames="${frames}"><img src="/${esc(src)}" alt="${esc(alt)}" ${lazy?'loading="lazy"':'fetchpriority="high"'} ${frames>1?`style="left:-${frame*100}%"`:''}></span>`;
  };
  const priceLabel=p=>p.type==='adventure'?t('Precio a consultar','Price on request'):(p.pricingConfig?.display||t('Consultar','Enquire'));
  const routeRow=(p,i=0)=>`<article class="v-route"><a class="v-route-photo" href="${route(p)}" aria-label="${esc(name(p))}">${photo(p.heroImage,name(p))}</a><div><span class="v-kicker">0${i+1} / ${regions[p.region]||p.region}</span><div class="v-meta">${duration(p)} · ${t('Viaje privado','Private trip')}</div><h2><a href="${route(p)}" style="text-decoration:none">${esc(name(p))}</a></h2><p>${esc(description(p))}</p><p class="v-route-places">${p.destinations.slice(0,4).map(esc).join(' · ')}</p><div class="v-price">${priceLabel(p)}</div><a class="v-link" href="${route(p)}">${t('Conocer la ruta','Explore the route')} <span aria-hidden="true">↗</span></a></div></article>`;
  function shell(){
    document.documentElement.lang=lang;
    document.body.classList.add('editorial');
    const header=document.querySelector('header')||document.body.insertBefore(document.createElement('header'),document.body.firstChild);
    const links=[['/aventuras.html',t('Aventuras','Adventures')],['/experiencias.html',t('Experiencias','Experiences')],['/grupales.html',t('Salidas grupales','Group departures')],['/viajes-a-medida.html',t('A tu medida','Tailor-made')]];
    header.className='v-header';
    header.innerHTML=`<a class="v-skip" href="#main-content">${t('Saltar al contenido','Skip to content')}</a><nav class="v-container v-nav" aria-label="${t('Principal','Main')}"><a class="v-logo" href="/" aria-label="VIATSA Travel — ${t('Inicio','Home')}"><img src="/brand-logo-white.png" width="168" height="56" alt="VIATSA TRAVEL"></a><div class="v-navlinks" id="v-navigation">${links.map(([url,label])=>`<a href="${url}" ${location.pathname===url?'aria-current="page"':''}>${label}</a>`).join('')}</div><div class="v-langs" aria-label="${t('Idioma','Language')}">${['es','en'].map(l=>`<button type="button" data-language="${l}" aria-pressed="${lang===l}" aria-label="${l==='es'?'Español':'English'}">${l.toUpperCase()}</button>`).join('')}</div><button type="button" class="v-menu" aria-controls="v-navigation" aria-expanded="false">${t('Menú','Menu')}</button></nav>`;
    const menu=header.querySelector('.v-menu'),panel=header.querySelector('#v-navigation');
    const close=()=>{panel.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent=t('Menú','Menu')};
    menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')==='true';if(open)close();else{panel.classList.add('open');menu.setAttribute('aria-expanded','true');menu.textContent=t('Cerrar','Close')}};
    header.onkeydown=e=>{if(e.key==='Escape'){close();menu.focus()}};
    header.querySelectorAll('[data-language]').forEach(b=>b.onclick=()=>{try{localStorage.setItem('viatsa-lang',b.dataset.language)}catch{}location.reload()});
    let main=document.querySelector('main');if(main&&!document.getElementById('main-content'))main.id='main-content';
    let footer=document.querySelector('footer');if(!footer){footer=document.createElement('footer');document.body.append(footer)}
    const c=VIATSA_CATALOG.contact;
    footer.className='v-footer';
    footer.innerHTML=`<div class="v-container"><div class="v-footer-grid"><div><a href="/"><img src="/brand-logo-white.png" alt="VIATSA Travel" width="205"></a><p>${t('Santo Domingo, República Dominicana','Santo Domingo, Dominican Republic')}</p><a href="https://wa.me/${c.whatsapp.replace(/\D/g,'')}" target="_blank" rel="noopener">WhatsApp · ${esc(c.phone)}</a><a href="mailto:${esc(c.email)}">${esc(c.email)}</a><a href="${esc(c.instagram)}" target="_blank" rel="noopener">Instagram ↗</a></div><div><h2>${t('Tu próximo viaje','Your next trip')}</h2>${links.map(([u,l])=>`<a href="${u}">${l}</a>`).join('')}<a href="/destinos.html">${t('Destinos','Destinations')}</a><a href="/travel-partners.html">Travel Partners</a></div><div><h2>${t('Conoce VIATSA','Meet VIATSA')}</h2><a href="/sobre-nosotros.html">${t('Sobre nosotros','About us')}</a><a href="/preguntas-frecuentes.html">${t('Preguntas frecuentes','Frequently asked questions')}</a><a href="/terminos.html">${t('Términos y condiciones','Terms and conditions')}</a><a href="/privacidad.html">${t('Política de privacidad','Privacy policy')}</a></div></div><div class="v-footer-bottom"><span>© ${new Date().getFullYear()} VIATSA TRAVEL</span><span>${t('La otra cara de República Dominicana.','The other side of the Dominican Republic.')}</span></div></div>`;
  }
  window.VIATSA_UI={t,esc,lang,name,regions,duration,route,description,photo,priceLabel,routeRow,shell};
  document.addEventListener('DOMContentLoaded',shell,{once:true});
})();
