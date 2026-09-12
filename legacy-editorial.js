document.addEventListener('DOMContentLoaded',()=>{
  const {t,photo}=VIATSA_UI;
  if(document.body.dataset.page==='about'){
    const hero=document.querySelector('.page-hero');
    const image=document.createElement('div');image.className='v-container';image.style.cssText='height:clamp(290px,42vw,520px);margin-bottom:35px';
    image.innerHTML=photo('hero-portada-viatsa.jpeg',t('Mirando la costa de República Dominicana','Looking over the Dominican coast'),'');
    hero.after(image);
  }
  if(document.getElementById('catalog')&&typeof P!=='undefined'){
    const params=new URLSearchParams(location.search),region=params.get('region');
    if(region){const b=[...document.querySelectorAll('[data-zone]')].find(x=>x.dataset.zone===region);if(b)b.click()}
    const selected=VIATSA_CATALOG.products.find(p=>p.id===params.get('producto')&&p.status==='active');
    if(selected){const entry=P.find(x=>x[3]===selected.name.es);if(entry)openP(entry)}
    const dialog=document.querySelector('dialog');if(dialog){dialog.setAttribute('aria-label',t('Detalles de la experiencia','Experience details'));dialog.addEventListener('close',()=>document.querySelector('.more')?.focus())}
  }
});
