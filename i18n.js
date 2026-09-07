const translations={
'Aventuras':'Adventures','Experiencias':'Experiences','Excursiones grupales':'Group excursions','Destinos':'Destinations','A tu medida':'Tailor-made','Sobre Viatsa':'About Viatsa','Diseña tu viaje':'Design your trip','Explorar excursiones':'Explore excursions','Viajes privados por República Dominicana':'Private travel across the Dominican Republic','Descubre la otra cara de República Dominicana.':'Discover the other side of the Dominican Republic.','Rutas privadas, paisajes escondidos y experiencias auténticas, diseñadas de principio a fin.':'Private routes, hidden landscapes and authentic experiences, designed from beginning to end.','Experiencias para vivir en un día.':'Experiences to enjoy in one day.','Aventuras para recorrer la isla.':'Adventures to explore the island.','¿Qué parte de la isla quieres conocer?':'Which part of the island would you like to discover?','Toda la isla':'Whole island','Este':'East','Norte':'North','Sur':'South','Ver todos los detalles':'View all details','Solicitar disponibilidad':'Check availability','Crear un viaje a medida':'Create a tailor-made trip','Términos y condiciones':'Terms and conditions','Consultar por WhatsApp':'Contact via WhatsApp'};
function applyLanguage(lang){
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-es][data-en]').forEach(el=>el.textContent=el.dataset[lang]);
  if(lang==='en'){
    const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
    while(n=walker.nextNode()){const k=n.nodeValue.trim();if(translations[k])n.nodeValue=n.nodeValue.replace(k,translations[k]);}
    document.title=document.title.replace('Excursiones','Excursions').replace('Aventuras','Adventures').replace('Términos y Condiciones','Terms and Conditions');
  }
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('selected',b.dataset.lang===lang));
  localStorage.setItem('viatsa-lang',lang);
}
function setupMobileNav(){
  const header=document.querySelector('.top'),nav=header?.querySelector('nav');
  if(!header||!nav||nav.querySelector('.mobile-toggle'))return;
  const style=document.createElement('style');
  style.textContent='.viatsa-mobile-toggle{display:none;border:0;background:transparent;color:inherit;padding:10px 0;font:700 11px Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}.viatsa-mobile-panel{display:none}@media(max-width:850px){.top nav{gap:12px}.top nav>a:first-child{margin-right:auto}.top nav>a:first-child img{width:125px}.top .links,.top .cta{display:none}.viatsa-mobile-toggle{display:block}.viatsa-mobile-panel{position:absolute;z-index:20;top:80px;left:0;right:0;background:#606042;color:#E7E0D2;padding:24px 16px 30px;border-top:1px solid #e7e0d23d;box-shadow:0 16px 28px #20201433}.viatsa-mobile-panel.open{display:grid;gap:19px}.viatsa-mobile-panel a{font:400 27px/1.1 Georgia,serif}.viatsa-mobile-panel .mobile-cta{margin-top:8px;padding-top:20px;border-top:1px solid #e7e0d24a;font:700 12px Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase}}';
  document.head.append(style);
  const toggle=document.createElement('button');
  toggle.className='viatsa-mobile-toggle';toggle.type='button';toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-controls','viatsa-mobile-menu');toggle.textContent='Menú';
  const panel=document.createElement('div');
  panel.className='viatsa-mobile-panel';panel.id='viatsa-mobile-menu';panel.innerHTML='<a href="aventuras.html">Aventuras</a><a href="experiencias.html">Experiencias</a><a href="grupales.html">Excursiones grupales</a><a href="index.html#destinations">Destinos</a><a href="index.html#private">Sobre Viatsa</a><a class="mobile-cta" href="index.html#tailor">Diseña tu viaje</a>';
  const close=()=>{panel.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menú'};
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';if(open)close();else{panel.classList.add('open');toggle.setAttribute('aria-expanded','true');toggle.textContent='Cerrar'}});
  panel.querySelectorAll('a').forEach(link=>link.addEventListener('click',close));
  document.addEventListener('keydown',event=>{if(event.key==='Escape')close()});
  nav.append(toggle);header.append(panel);
}
document.addEventListener('DOMContentLoaded',()=>{setupMobileNav();document.querySelectorAll('.lang-btn').forEach(b=>b.onclick=()=>{localStorage.setItem('viatsa-lang',b.dataset.lang);location.reload()});applyLanguage(localStorage.getItem('viatsa-lang')||'es')});
