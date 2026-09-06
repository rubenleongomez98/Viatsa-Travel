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
document.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('.lang-btn').forEach(b=>b.onclick=()=>{localStorage.setItem('viatsa-lang',b.dataset.lang);location.reload()});applyLanguage(localStorage.getItem('viatsa-lang')||'es')});
