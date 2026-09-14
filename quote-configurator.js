/* Presentation only. All prices and transport/boat allocations come from /api/quote. */
(() => {
  'use strict';
  const p = VIATSA_CATALOG.bySlug(document.body.dataset.product);
  const box = document.querySelector('#booking');
  if (!p || p.type !== 'adventure' || !box) return;
  const { t, esc, name, lang } = VIATSA_UI;
  const perla = p.id === 'perla-del-sur';
  const tents = [
    { id: 'double', capacity: 2, label: t('Carpa doble', 'Double tent') },
    { id: 'quadruple', capacity: 4, label: t('Carpa cuádruple', 'Quadruple tent') },
    { id: 'sextuple', capacity: 6, label: t('Carpa séxtuple', 'Six-person tent') }
  ];
  const counts = { double: 0, quadruple: 0, sextuple: 0 };
  const money = cents => 'US$ ' + (cents / 100).toLocaleString('en-US', {
    minimumFractionDigits: cents % 100 ? 2 : 0, maximumFractionDigits: 2
  });
  const dateLabel = value => value
    ? new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-DO', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(value + 'T12:00:00'))
    : t('Por confirmar', 'To be confirmed');
  const row = o => '<div class="qc-option"><div><strong>' + o.label + '</strong><small>' +
    o.capacity + ' ' + t('personas por carpa', 'people per tent') + '</small></div><div class="qc-counter">' +
    '<button type="button" data-tent="' + o.id + '" data-d="-1" aria-label="' + t('Quitar ', 'Remove ') + o.label + '">−</button>' +
    '<output data-count="' + o.id + '" aria-label="' + o.label + '">0</output>' +
    '<button type="button" data-tent="' + o.id + '" data-d="1" aria-label="' + t('Añadir ', 'Add ') + o.label + '">+</button></div></div>';
  box.innerHTML = '<span class="v-kicker">' + esc(name(p)) + '</span><h2 id="booking-heading">' +
    t('Configura tu viaje', 'Make this trip yours') + '</h2><p class="qc-intro">' +
    t('A tu ritmo, con tu gente. Empezamos por aquí.', 'Your pace, your people. Let’s start here.') +
    '</p><form id="qc-form"><div class="qc-fields"><section class="qc-step"><label for="qc-n">' +
    t('¿Cuántos viajáis?', 'How many are travelling?') + '</label><div class="v-stepper">' +
    '<button type="button" data-n="-1" aria-label="' + t('Quitar un viajero', 'Remove a traveler') + '">−</button>' +
    '<input id="qc-n" name="travelers" type="number" inputmode="numeric" min="1" step="1" required value="' +
    Math.max(1, p.minimumGuests || 1) + '" aria-describedby="qc-error">' +
    '<button type="button" data-n="1" aria-label="' + t('Añadir un viajero', 'Add a traveler') + '">+</button></div></section>' +
    '<section class="qc-step qc-journey"><h3>' + t('Salida desde Santo Domingo', 'Departure from Santo Domingo') + '</h3>' +
    '<p id="qc-transport">' + t('Transporte según tu grupo', 'Transport for your group') + '</p></section>' +
    (perla ? '<details class="qc-lodging" open><summary>' + t('Vuestras carpas', 'Your tents') +
    '</summary><p class="qc-note">' + t('Proponemos una distribución. Puedes ajustarla a vuestro gusto.', 'We suggest a layout. Adjust it to suit your group.') +
    '</p>' + tents.map(row).join('') + '<p id="qc-capacity" role="status"></p></details>' : '') +
    '<p id="qc-activity" class="qc-note" hidden></p><section class="qc-step"><label for="qc-date">' +
    t('Fecha preferida', 'Preferred date') + '</label><input id="qc-date" name="date" type="date" aria-describedby="qc-date-note qc-error">' +
    '<p id="qc-date-note" class="qc-note">' + t('Fecha preferida. Confirmaremos disponibilidad antes de reservar.', 'Preferred date. We confirm availability before booking.') +
    '</p></section></div><aside class="qc-summary" aria-labelledby="qc-summary-heading"><h3 id="qc-summary-heading">' + t('Tu viaje, a tu manera', 'Your journey, your way') + '</h3><dl id="qc-selection" class="qc-selection"></dl><div id="qc-result" class="qc-result" aria-live="polite" aria-atomic="true"></div>' +
    '<p id="qc-error" class="v-form-error" role="alert"></p><button id="qc-submit" class="v-button" type="submit">' +
    t('Solicitar reserva', 'Request reservation') + ' ↗</button><a id="qc-wa" class="v-link" target="_blank" rel="noopener">' +
    t('Consultar por WhatsApp', 'Ask via WhatsApp') + ' ↗</a><p class="qc-note qc-reassurance">' +
    t('Esta solicitud no realiza ningún cobro ni confirma una reserva.', 'This request does not charge you or confirm a booking.') + '</p></aside></form>';

  const f = box.querySelector('form'), n = f.elements.travelers, date = f.elements.date;
  const result = f.querySelector('#qc-result'), error = f.querySelector('#qc-error');
  const action = f.querySelector('#qc-submit'), wa = f.querySelector('#qc-wa');
  const now = new Date();
  date.min = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, '0'), String(now.getDate()).padStart(2, '0')].join('-');
  let last = null, sequence = 0, controller, pending = false;
  const validCount = () => Number.isSafeInteger(Number(n.value)) && Number(n.value) >= 1;
  const state = () => ({ productId: p.id, travelers: Number(n.value), date: date.value, accommodation: { ...counts } });
  // Preserve the existing suggested distribution; prices are never calculated here.
  function recommend(x) {
    counts.double = counts.quadruple = counts.sextuple = 0;
    if (!Number.isSafeInteger(x) || x < 1 || x > 28) return;
    while (x > 0) {
      if (x > 4) { counts.sextuple++; x -= 6; }
      else if (x > 2) { counts.quadruple++; x -= 4; }
      else { counts.double++; x -= 2; }
    }
  }
  const transportLabel = value => ({
    'Vehículo privado': t('Vehículo privado', 'Private vehicle'),
    'Transporte para grupo': t('Transporte para grupo', 'Group transport'),
    'Autobús': t('Autobús', 'Bus')
  })[value] || t('Por confirmar con nuestro equipo', 'To be confirmed with our team');
  const bedsLabel = () => tents.filter(o => counts[o.id]).map(o => counts[o.id] + ' × ' + o.label).join(', ') ||
    t('Por confirmar', 'To be confirmed');
  function contactLink(quote) {
    const lines = [
      t('Hola, quisiera consultar disponibilidad para ', 'Hello, I would like to check availability for ') + name(p) + '.',
      t('Viajeros: ', 'Travelers: ') + (validCount() ? n.value : t('Por confirmar', 'To be confirmed')),
      t('Duración: ', 'Duration: ') + VIATSA_UI.duration(p),
      t('Salida: Santo Domingo', 'Departure: Santo Domingo'),
      t('Fecha preferida: ', 'Preferred date: ') + dateLabel(date.value)
    ];
    if (perla) lines.push(t('Hospedaje: ', 'Accommodation: ') + bedsLabel());
    if (quote) {
      lines.push(t('Transporte: ', 'Transport: ') + transportLabel(quote.transport));
      if (quote.activity) lines.push(activityLabel(quote.activity));
      lines.push(t('Total cotizado: ', 'Quoted total: ') + money(quote.retailPrice),
        t('Depósito: ', 'Deposit: ') + money(quote.deposit),
        t('Saldo: ', 'Balance: ') + money(quote.remainingBalance));
      if (quote.balanceDueDate) lines.push(t('Pago del saldo hasta: ', 'Balance due by: ') + dateLabel(quote.balanceDueDate));
    }
    const phone = VIATSA_CATALOG.contact.whatsapp.replace(/\D/g, '');
    wa.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(lines.join('\n'));
  }
  function activityLabel(value) {
    return value ? t('Embarcaciones organizadas para tu grupo.', 'Boats arranged for your group.') : '';
  }
  function selectionSummary() {
    const values = [
      [t('Aventura', 'Adventure'), name(p)],
      [t('Duración', 'Duration'), VIATSA_UI.duration(p)],
      [t('Viajeros', 'Travelers'), validCount() ? n.value : '—'],
      [t('Salida', 'Departure'), 'Santo Domingo'],
      ...(perla ? [[t('Alojamiento', 'Accommodation'), bedsLabel()]] : []),
      [t('Fecha preferida', 'Preferred date'), dateLabel(date.value)]
    ];
    f.querySelector('#qc-selection').innerHTML = values.map(([label,value]) => '<div><dt>' + esc(label) + '</dt><dd>' + esc(value) + '</dd></div>').join('');
  }
  function updateCounters() {
    f.querySelector('[data-n="-1"]').disabled = !validCount() || Number(n.value) <= 1;
    if (!perla) return;
    f.querySelectorAll('[data-count]').forEach(el => { el.textContent = counts[el.dataset.count]; });
    f.querySelectorAll('[data-tent][data-d="-1"]').forEach(el => { el.disabled = counts[el.dataset.tent] === 0; });
    const cap = tents.reduce((sum, o) => sum + counts[o.id] * o.capacity, 0);
    const missing = Math.max(0, Number(n.value) - cap);
    const capacity = f.querySelector('#qc-capacity');
    capacity.classList.toggle('qc-capacity-short', validCount() && missing > 0);
    capacity.textContent = !validCount() ? '' : missing
      ? t('Te faltan plazas para ', 'You need places for ') + missing + t(' personas.', ' more people.')
      : cap + t(' plazas para ', ' places for ') + n.value + t(' personas.', ' people.');
  }
  function bottom(label) {
    const price = document.querySelector('.v-bottom b');
    if (price) price.textContent = label;
  }
  function render(response) {
    last = response;
    const calculated = response.status === 'calculated';
    f.querySelector('#qc-transport').textContent = calculated ? transportLabel(response.transport) :
      t('Por confirmar con nuestro equipo', 'To be confirmed with our team');
    const activity = f.querySelector('#qc-activity');
    activity.textContent = calculated && response.activity ? activityLabel(response.activity) : '';
    activity.hidden = !activity.textContent;
    if (calculated) {
      result.innerHTML = '<span class="qc-caption">' + t('Tu cotización', 'Your quote') +
        '</span><div class="qc-total"><span>' + t('Total del grupo', 'Group total') + '</span><strong>' +
        money(response.retailPrice) + '</strong></div><dl><div><dt>' + t('Para confirmar · 50%', 'To confirm · 50%') +
        '</dt><dd>' + money(response.deposit) + '</dd></div><div><dt>' + t('Saldo restante', 'Remaining balance') +
        '</dt><dd>' + money(response.remainingBalance) + '</dd></div></dl>';
      result.innerHTML += '<p class="qc-note qc-due">' + t('Pago del saldo hasta: ', 'Balance due by: ') +
        (response.balanceDueDate ? '<strong>' + esc(dateLabel(response.balanceDueDate)) + '</strong>' : t('elige tu fecha preferida.', 'choose your preferred date.')) + '</p>';
      bottom(money(response.retailPrice));
    } else {
      const message = response.status === 'incomplete'
        ? t('Ajusta las carpas para que todos tengáis una plaza.', 'Adjust the tents so everyone has a place.')
        : response.status === 'quote_required'
          ? t('Este tamaño de grupo requiere una propuesta personalizada. Conservaremos los detalles que has elegido.', 'This group size needs a personalised proposal. We will keep your selected details.')
          : t('Ahora no podemos calcular el precio. Nuestro equipo puede preparar tu propuesta.', 'We cannot calculate a price right now. Our team can prepare your proposal.');
      result.innerHTML = '<strong>' + t('Hablemos de vuestro viaje', 'Let’s talk about your trip') + '</strong><p>' + message + '</p>';
      bottom(t('Precio a consultar', 'Price on request'));
    }
    action.textContent = calculated ? t('Solicitar reserva ↗', 'Request reservation ↗') : t('Solicitar cotización ↗', 'Request a quote ↗');
    contactLink(calculated ? response : null);
  }
  async function update() {
    const request = ++sequence;
    controller?.abort();
    last = null; pending = false; action.disabled = true;
    updateCounters(); selectionSummary(); contactLink(null);
    error.textContent = '';
    n.setAttribute('aria-invalid', String(!validCount()));
    date.setAttribute('aria-invalid', String(!!date.value && date.value < date.min));
    if (!validCount() || (date.value && date.value < date.min)) {
      result.setAttribute('aria-busy', 'false');
      result.classList.remove('is-updating');
      error.textContent = !validCount() ? t('Indica una cantidad entera de viajeros, desde 1.', 'Enter a whole number of travelers, starting at 1.') :
        t('Elige una fecha de hoy en adelante.', 'Choose today or a future date.');
      result.innerHTML = '';
      bottom(t('Revisa tu selección', 'Check your selection'));
      return;
    }
    pending = true;
    result.setAttribute('aria-busy', 'true');
    result.querySelector('.qc-updating')?.remove();
    result.insertAdjacentHTML('afterbegin', '<p class="qc-updating">' + t('Actualizando tu propuesta…', 'Updating your proposal…') + '</p>');
    result.classList.add('is-updating');
    bottom(t('Actualizando…', 'Updating…'));
    const snapshot = state();
    controller = new AbortController();
    const currentController = controller;
    const timer = setTimeout(() => currentController.abort(), 12000);
    let response;
    try {
      const res = await fetch('/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(snapshot), signal: currentController.signal });
      if (!res.ok) throw new Error('quote unavailable');
      response = await res.json();
      if (response.status === 'calculated' && (!['retailPrice', 'deposit', 'remainingBalance'].every(k => Number.isSafeInteger(response[k]) && response[k] >= 0) ||
          response.deposit + response.remainingBalance !== response.retailPrice || response.travelers !== snapshot.travelers)) throw new Error('invalid quote');
    } catch { response = { status: 'unavailable' }; }
    finally { clearTimeout(timer); }
    if (request !== sequence) return;
    pending = false;
    result.classList.remove('is-updating');
    result.setAttribute('aria-busy', 'false');
    render(response);
    action.disabled = response.status === 'incomplete';
  }
  if (perla) recommend(Number(n.value));
  f.querySelectorAll('[data-n]').forEach(b => b.onclick = () => {
    const next = Number(n.value) + Number(b.dataset.n);
    n.value = Math.max(1, Number.isSafeInteger(next) ? next : 1);
    if (perla) recommend(Number(n.value));
    update();
  });
  f.querySelectorAll('[data-tent]').forEach(b => b.onclick = () => {
    counts[b.dataset.tent] = Math.max(0, counts[b.dataset.tent] + Number(b.dataset.d));
    update();
  });
  n.addEventListener('input', () => { if (perla) recommend(Number(n.value)); update(); });
  date.addEventListener('input', update);
  f.onsubmit = e => {
    e.preventDefault();
    if (pending || !validCount() || !f.reportValidity()) return;
    if (last?.status === 'calculated' && !date.value) {
      error.textContent = t('Elige una fecha preferida para solicitar disponibilidad.', 'Choose a preferred date to request availability.');
      date.focus(); return;
    }
    if (last?.status === 'incomplete') return;
    location.href = wa.href;
  };
  const mobile = document.querySelector('#mobile-plan');
  if (mobile) mobile.onclick = () => {
    box.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    n.focus({ preventScroll: true });
  };
  const summary = f.querySelector('.qc-summary');
  if ('ResizeObserver' in window) new ResizeObserver(() => {
    box.style.setProperty('--summary-height', summary.offsetHeight + 'px');
  }).observe(summary);
  // Hide the bottom shortcut while the primary action or mobile keyboard is in view.
  const bar = document.querySelector('.v-bottom');
  let actionVisible = false;
  const syncBar = () => {
    const keyboard = window.visualViewport && innerHeight - visualViewport.height > 140 && box.contains(document.activeElement);
    if (bar) bar.hidden = actionVisible || !!keyboard;
  };
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { actionVisible = entries[0].isIntersecting; syncBar(); }, { threshold: 0 }).observe(action);
  window.visualViewport?.addEventListener('resize', syncBar);
  f.addEventListener('focusout', () => setTimeout(syncBar, 0));
  update();
})();
