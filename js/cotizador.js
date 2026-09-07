(() => {
  'use strict';

  const COPY = {
    es: { kicker:'Cotización personalizada', example:'Datos ficticios de demostración', start:'Fecha de inicio', end:'Fecha de regreso', chooseDate:'Seleccionar fecha', people:'Personas', rooms:'Habitaciones', capacity:(a,b)=>`${a} plazas para ${b} personas`, missing:n=>`Te faltan plazas para ${n} ${n===1?'persona':'personas'}`, departure:'Lugar de salida', chooseDeparture:'Selecciona una salida', quote:'Cotizar', incomplete:'Completa la fecha, la salida y las habitaciones para continuar.', unavailable:'No pudimos calcular esta ruta. Escríbenos y te ayudaremos personalmente.', consult:'Consúltanos', stale:'Cotización desactualizada. Pulsa Cotizar para actualizarla.', total:'Total estimado', perPerson:'por persona', base:'Ruta base', lodging:'Habitaciones', departureFee:'Suplemento de salida', reserve:'Reservar', whatsapp:'Reservar por WhatsApp', prev:'Mes anterior', next:'Mes siguiente', close:'Cerrar calendario', loading:'Preparando cotizador…', nights:n=>`${n} ${n===1?'noche':'noches'}` },
    en: { kicker:'Personal quote', example:'Fictitious demonstration data', start:'Start date', end:'Return date', chooseDate:'Select date', people:'Travelers', rooms:'Rooms', capacity:(a,b)=>`${a} places for ${b} travelers`, missing:n=>`You need ${n} more ${n===1?'place':'places'}`, departure:'Departure point', chooseDeparture:'Select a departure point', quote:'Get quote', incomplete:'Complete the date, departure and rooms to continue.', unavailable:'We could not calculate this route. Contact us and we will help you personally.', consult:'Contact us', stale:'Quote out of date. Select Get quote to update it.', total:'Estimated total', perPerson:'per person', base:'Base route', lodging:'Rooms', departureFee:'Departure supplement', reserve:'Book', whatsapp:'Book via WhatsApp', prev:'Previous month', next:'Next month', close:'Close calendar', loading:'Preparing quote…', nights:n=>`${n} ${n===1?'night':'nights'}` }
  };

  const parseDate = value => { const [y,m,d]=value.split('-').map(Number); return new Date(y,m-1,d); };
  const isoDate = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  const addDays = (value, days) => { const d=parseDate(value); d.setDate(d.getDate()+days); return isoDate(d); };
  const todayIso = () => isoDate(new Date());
  const localizedDate = (value, lang) => value ? new Intl.DateTimeFormat(lang==='en'?'en-US':'es-DO',{day:'numeric',month:'long',year:'numeric'}).format(parseDate(value)) : '';
  const money = (value, currency='USD', lang='es') => currency==='USD' ? `US$ ${Math.round(value).toLocaleString(lang==='en'?'en-US':'en-US')}` : new Intl.NumberFormat(lang==='en'?'en-US':'es-DO',{style:'currency',currency,maximumFractionDigits:0}).format(Math.round(value));
  const validNumber = value => Number.isFinite(Number(value)) && Number(value)>=0;

  function validateData(data) {
    if (!data || !data.id || !data.nombre || !Number.isInteger(data.noches) || data.noches<0) throw new Error('invalid product');
    if (!data.personas || !Number.isInteger(data.personas.min) || !Number.isInteger(data.personas.max) || data.personas.min>data.personas.max) throw new Error('invalid people');
    if (!data.precioBase || !Array.isArray(data.habitaciones) || !Array.isArray(data.salidas) || !data.contacto) throw new Error('missing fields');
    for(let n=data.personas.min;n<=data.personas.max;n++) if(!validNumber(data.precioBase[String(n)])) throw new Error('missing price');
    if(data.habitaciones.some(r=>!r.id||!r.nombre||!Number.isInteger(r.capacidad)||r.capacidad<1||!validNumber(r.precioNoche))) throw new Error('invalid rooms');
    if(data.salidas.some(s=>!s.id||!s.nombre||!validNumber(s.suplemento)||typeof s.porPersona!=='boolean')) throw new Error('invalid departures');
    return data;
  }

  function calculate(data, state) {
    if (state.people>data.personas.max) return { consult:true };
    const rawBase=Number(data.precioBase[String(state.people)]);
    if(!Number.isFinite(rawBase)) throw new Error('price unavailable');
    const season=(data.temporadas||[]).find(s=>state.start>=s.desde&&state.start<=s.hasta);
    const factor=season&&validNumber(season.factor)?Number(season.factor):1;
    const base=rawBase*factor;
    const rooms=data.habitaciones.reduce((sum,room)=>sum+(state.rooms[room.id]||0)*Number(room.precioNoche)*data.noches,0);
    const departure=data.salidas.find(s=>s.id===state.departure);
    if(!departure) throw new Error('departure unavailable');
    const departureFee=Number(departure.suplemento)*(departure.porPersona?state.people:1);
    const total=Math.round(base+rooms+departureFee);
    return {base:Math.round(base),rooms:Math.round(rooms),departureFee:Math.round(departureFee),total,perPerson:Math.round(total/state.people),departure};
  }

  class QuoteWidget {
    constructor(root,data){
      if(root._vqInstance) root._vqInstance.destroy();
      this.root=root; this.data=data; this.lang=root.dataset.lang==='en'?'en':'es'; this.copy=COPY[this.lang];
      this.controller=new AbortController(); root._vqInstance=this;
      this.state={start:'',people:data.personas.min,rooms:Object.fromEntries(data.habitaciones.map(r=>[r.id,0])),departure:''};
      this.calendarMonth=new Date(); this.hasQuote=false; this.render(); this.bind(); this.update();
    }
    render(){
      const d=this.data,c=this.copy;
      this.root.classList.add('viatsa-quote');
      this.root.innerHTML=`<section class="vq-shell" aria-labelledby="vq-title-${d.id}">
        <span class="vq-kicker">${c.kicker}</span><h2 class="vq-title" id="vq-title-${d.id}">${d.nombre[this.lang]||d.nombre.es}</h2>
        ${d.ejemplo?`<span class="vq-example">${c.example}</span>`:''}
        <div class="vq-grid">
          <div class="vq-dates"><div class="vq-field"><label class="vq-label" id="vq-start-label-${d.id}">${c.start}</label><button class="vq-date-button" type="button" aria-labelledby="vq-start-label-${d.id}" aria-haspopup="dialog" aria-expanded="false">${c.chooseDate}</button><div class="vq-calendar" role="dialog" aria-modal="false" aria-label="${c.start}" hidden></div></div><div><label class="vq-label">${c.end}</label><div class="vq-input vq-date-end" aria-live="polite">—</div></div></div>
          <div><span class="vq-legend">${c.people}</span><div class="vq-counter-row"><div class="vq-counter-label"><strong>${c.people}</strong><small>${d.personas.min}–${d.personas.max}</small></div>${this.counter('people',d.personas.min)}</div></div>
          <div><span class="vq-legend">${c.rooms}</span><div class="vq-room-list">${d.habitaciones.map(r=>`<div class="vq-counter-row"><div class="vq-counter-label"><strong>${r.nombre[this.lang]||r.nombre.es}</strong><small>${r.capacidad} · ${money(r.precioNoche,d.moneda,this.lang)} / ${c.nights(1)}</small></div>${this.counter(`room-${r.id}`,0)}</div>`).join('')}</div><div class="vq-capacity" aria-live="polite"></div></div>
          <div><label class="vq-label" for="vq-departure-${d.id}">${c.departure}</label><select class="vq-select" id="vq-departure-${d.id}"><option value="">${c.chooseDeparture}</option>${d.salidas.map(s=>`<option value="${s.id}">${s.nombre[this.lang]||s.nombre.es}${Number(s.suplemento)?` · +${money(s.suplemento,d.moneda,this.lang)}`:''}</option>`).join('')}</select></div>
          <div class="vq-actions"><button class="vq-submit" type="button" disabled>${c.quote}</button><div class="vq-message" aria-live="polite"></div></div>
        </div><div class="vq-result" aria-live="polite" hidden></div></section>`;
      this.els={date:this.root.querySelector('.vq-date-button'),calendar:this.root.querySelector('.vq-calendar'),end:this.root.querySelector('.vq-date-end'),capacity:this.root.querySelector('.vq-capacity'),departure:this.root.querySelector('.vq-select'),submit:this.root.querySelector('.vq-submit'),message:this.root.querySelector('.vq-message'),result:this.root.querySelector('.vq-result')};
    }
    counter(key,value){return `<div class="vq-counter" data-counter="${key}"><button type="button" data-step="-1" aria-label="−">−</button><span class="vq-count" aria-live="polite">${value}</span><button type="button" data-step="1" aria-label="+">+</button></div>`}
    bind(){
      const signal=this.controller.signal;
      this.root.addEventListener('click',e=>{const step=e.target.closest('[data-step]');if(step){this.changeCount(step);return}if(e.target===this.els.date){this.toggleCalendar();return}if(e.target===this.els.submit)this.showQuote();},{signal});
      this.els.departure.addEventListener('change',()=>{this.state.departure=this.els.departure.value;this.changed()},{signal});
      document.addEventListener('click',e=>{if(!this.els.calendar.hidden&&!e.target.closest('.vq-field'))this.closeCalendar()},{signal});
      this.root.addEventListener('keydown',e=>{if(e.key==='Escape')this.closeCalendar(true)},{signal});
      this.languageObserver=new MutationObserver(()=>{const l=document.documentElement.lang==='en'?'en':'es';if(l!==this.lang){this.root.dataset.lang=l;new QuoteWidget(this.root,this.data)}});
      this.languageObserver.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
    }
    destroy(){this.controller.abort();this.languageObserver?.disconnect()}
    changeCount(button){
      const holder=button.closest('[data-counter]'),key=holder.dataset.counter,step=Number(button.dataset.step);
      if(key==='people') this.state.people=Math.min(this.data.personas.max,Math.max(this.data.personas.min,this.state.people+step));
      else {const id=key.slice(5);this.state.rooms[id]=Math.max(0,(this.state.rooms[id]||0)+step)}
      holder.querySelector('.vq-count').textContent=key==='people'?this.state.people:this.state.rooms[key.slice(5)]; this.changed();
    }
    capacity(){return this.data.habitaciones.reduce((sum,r)=>sum+(this.state.rooms[r.id]||0)*r.capacidad,0)}
    isBlocked(value){return (this.data.fechasBloqueadas||[]).includes(value)||value<todayIso()}
    valid(){return Boolean(this.state.start&&this.state.departure&&this.state.people>=this.data.personas.min&&this.state.people<=this.data.personas.max&&this.capacity()>=this.state.people)}
    changed(){if(this.hasQuote){this.els.result.classList.add('is-stale');let s=this.els.result.querySelector('.vq-stale');if(!s)this.els.result.insertAdjacentHTML('afterbegin',`<div class="vq-stale">${this.copy.stale}</div>`)}this.update()}
    update(){
      const cap=this.capacity(),missing=Math.max(0,this.state.people-cap); this.els.capacity.textContent=missing?this.copy.missing(missing):this.copy.capacity(cap,this.state.people);this.els.capacity.classList.toggle('is-error',missing>0);
      this.els.end.textContent=this.state.start?localizedDate(addDays(this.state.start,this.data.noches),this.lang):'—';
      this.els.submit.disabled=!this.valid();this.els.message.textContent=this.valid()?'':this.copy.incomplete;
      this.root.querySelectorAll('[data-counter="people"] button').forEach(b=>b.disabled=(b.dataset.step==='-1'&&this.state.people<=this.data.personas.min)||(b.dataset.step==='1'&&this.state.people>=this.data.personas.max));
    }
    toggleCalendar(){if(this.els.calendar.hidden)this.openCalendar();else this.closeCalendar()}
    openCalendar(){if(this.state.start)this.calendarMonth=parseDate(this.state.start);else this.calendarMonth=new Date();this.drawCalendar();this.els.calendar.hidden=false;this.els.date.setAttribute('aria-expanded','true');setTimeout(()=>this.els.calendar.querySelector('.vq-day:not([disabled]):not(.is-empty)')?.focus(),0)}
    closeCalendar(returnFocus=false){this.els.calendar.hidden=true;this.els.date.setAttribute('aria-expanded','false');if(returnFocus)this.els.date.focus()}
    drawCalendar(){
      const c=this.copy,y=this.calendarMonth.getFullYear(),m=this.calendarMonth.getMonth(),first=new Date(y,m,1),last=new Date(y,m+1,0),week=this.lang==='en'?['Su','Mo','Tu','We','Th','Fr','Sa']:['Do','Lu','Ma','Mi','Ju','Vi','Sá'];
      const blanks=Array.from({length:first.getDay()},()=>'<button class="vq-day is-empty" tabindex="-1" disabled></button>').join('');
      const days=Array.from({length:last.getDate()},(_,i)=>{const value=isoDate(new Date(y,m,i+1)),blocked=this.isBlocked(value),selected=value===this.state.start;return `<button type="button" class="vq-day${selected?' is-selected':''}" data-date="${value}" ${blocked?'disabled':''} aria-label="${localizedDate(value,this.lang)}" aria-selected="${selected}">${i+1}</button>`}).join('');
      this.els.calendar.innerHTML=`<div class="vq-cal-head"><button type="button" data-month="-1" aria-label="${c.prev}">‹</button><span class="vq-cal-title">${new Intl.DateTimeFormat(this.lang==='en'?'en-US':'es-DO',{month:'long',year:'numeric'}).format(first)}</span><button type="button" data-month="1" aria-label="${c.next}">›</button></div><div class="vq-week">${week.map(x=>`<span>${x}</span>`).join('')}</div><div class="vq-days">${blanks}${days}</div>`;
      this.els.calendar.querySelectorAll('[data-month]').forEach(b=>b.onclick=()=>{this.calendarMonth.setMonth(this.calendarMonth.getMonth()+Number(b.dataset.month));this.drawCalendar()});
      this.els.calendar.querySelectorAll('[data-date]').forEach(b=>{b.onclick=()=>this.selectDate(b.dataset.date);b.onkeydown=e=>this.calendarKeys(e,b)});
    }
    calendarKeys(e,button){const moves={ArrowLeft:-1,ArrowRight:1,ArrowUp:-7,ArrowDown:7};if(!(e.key in moves))return;e.preventDefault();let next=addDays(button.dataset.date,moves[e.key]);while(this.isBlocked(next))next=addDays(next,moves[e.key]>0?1:-1);const d=parseDate(next);if(d.getMonth()!==this.calendarMonth.getMonth()){this.calendarMonth=new Date(d.getFullYear(),d.getMonth(),1);this.drawCalendar()}this.els.calendar.querySelector(`[data-date="${next}"]`)?.focus()}
    selectDate(value){this.state.start=value;this.els.date.textContent=localizedDate(value,this.lang);this.closeCalendar(true);this.changed()}
    showQuote(){
      if(!this.valid())return;let result;try{result=calculate(this.data,this.state)}catch(e){this.showFallback();return}
      if(result.consult){this.showFallback(this.copy.consult);return}
      const c=this.copy,d=this.data,end=addDays(this.state.start,d.noches),rooms=d.habitaciones.filter(r=>this.state.rooms[r.id]).map(r=>`${this.state.rooms[r.id]}× ${r.nombre[this.lang]||r.nombre.es}`).join(', ');
      const message=this.lang==='en'?`Hello, I would like to book ${d.nombre.en||d.nombre.es}. Dates: ${this.state.start} to ${end}. Travelers: ${this.state.people}. Rooms: ${rooms}. Departure: ${result.departure.nombre.en||result.departure.nombre.es}. Quoted total: ${money(result.total,d.moneda,this.lang)}.`:`Hola, quiero reservar ${d.nombre.es}. Fechas: ${this.state.start} al ${end}. Personas: ${this.state.people}. Habitaciones: ${rooms}. Salida: ${result.departure.nombre.es}. Total cotizado: ${money(result.total,d.moneda,this.lang)}.`;
      const phone=String(d.contacto.whatsapp||'').replace(/\D/g,''),href=d.contacto.urlReserva||`https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      this.els.result.innerHTML=`<span class="vq-kicker">${c.total}</span><div class="vq-total">${money(result.total,d.moneda,this.lang)}</div><div class="vq-per-person">${money(result.perPerson,d.moneda,this.lang)} ${c.perPerson}</div><table class="vq-breakdown"><tr><td>${c.base}</td><td>${money(result.base,d.moneda,this.lang)}</td></tr><tr><td>${c.lodging}</td><td>${money(result.rooms,d.moneda,this.lang)}</td></tr><tr><td>${c.departureFee}</td><td>${money(result.departureFee,d.moneda,this.lang)}</td></tr></table><a class="vq-action" href="${href}" target="_blank" rel="noopener">${d.contacto.urlReserva?c.reserve:c.whatsapp}</a>`;
      this.els.result.hidden=false;this.els.result.classList.remove('is-stale');this.hasQuote=true;this.els.result.scrollIntoView({behavior:'smooth',block:'nearest'});
    }
    showFallback(title){const phone=String(this.data.contacto.whatsapp||'').replace(/\D/g,'');this.els.result.innerHTML=`<div class="vq-total">${title||this.copy.consult}</div><p>${this.copy.unavailable}</p><a class="vq-action" href="https://wa.me/${phone}" target="_blank" rel="noopener">${this.copy.whatsapp}</a>`;this.els.result.hidden=false;this.hasQuote=true}
  }

  async function mount(root){
    root.classList.add('viatsa-quote');root.innerHTML=`<div class="vq-shell">${COPY[root.dataset.lang==='en'?'en':'es'].loading}</div>`;
    try{const id=root.dataset.cotizador;if(!/^[a-z0-9-]+$/i.test(id||''))throw new Error('invalid id');const response=await fetch(`data/cotizador/${id}.json`,{credentials:'same-origin'});if(!response.ok)throw new Error('load failed');new QuoteWidget(root,validateData(await response.json()))}catch(e){const lang=root.dataset.lang==='en'?'en':'es',phone='18099723232';root.innerHTML=`<div class="vq-shell"><h2 class="vq-title">${COPY[lang].consult}</h2><p>${COPY[lang].unavailable}</p><a class="vq-action" href="https://wa.me/${phone}" target="_blank" rel="noopener">${COPY[lang].whatsapp}</a></div>`}
  }
  document.querySelectorAll('[data-cotizador]').forEach(mount);
  window.ViatsaCotizador={calculate,validateData};
})();
