/* Customer inquiries for day experiences. Prices come only from data/catalog.js. */
(() => {
  'use strict';
  const english = localStorage.getItem('viatsa-lang') === 'en';
  const t = (es, en) => english ? en : es;
  const phone = VIATSA_CATALOG.contact.whatsapp.replace(/\D/g, '');
  const products = VIATSA_CATALOG.active('experience');
  const byName = name => products.find(product => product.name.es === name);
  const money = value => `US$${Number(value).toLocaleString('en-US')}`;
  const rateFor = (product, travelers) => product.pricingConfig.tiers?.find(tier => travelers >= tier.min && (tier.max == null || travelers <= tier.max))?.perPerson ?? product.pricingConfig.perPerson ?? null;
  const tierText = product => {
    const pricing = product.pricingConfig;
    if (pricing.tiers) return pricing.tiers.map(tier => `${tier.max == null ? `${tier.min}+` : tier.min === tier.max ? tier.min : `${tier.min}–${tier.max}`} ${t('personas', 'people')}: ${money(tier.perPerson)} p/p`).join(' · ');
    if (pricing.departureRates) return Object.entries(pricing.departureRates).map(([place, rates]) => `${place}: ${t('adultos', 'adults')} ${money(rates.adult)} · ${t('niños', 'children')} ${money(rates.child)}`).join(' · ');
    if (product.id === 'buggies-punta-cana') return 'Buggy 1–2: US$75 · Buggy familiar 3–4: US$95 · ATV 1–2: US$75 · Honda DBL 1–2: US$110 · Honda familiar 3–4: US$170';
    return pricing.perPerson ? `${money(pricing.perPerson)} p/p` : pricing.display;
  };
  const departureOptions = product => {
    if (product.pricingConfig.departureRates) return Object.keys(product.pricingConfig.departureRates);
    if (product.id === 'buggies-punta-cana') return ['Punta Cana', 'Bávaro'];
    if (['bavaro-adventure-park', 'sacred-river'].includes(product.id)) return ['Punta Cana', 'Bávaro', 'Cap Cana'];
    return ['Santo Domingo'];
  };
  const whatsapp = (product, lines = []) => `https://wa.me/${phone}?text=${encodeURIComponent([t('Hola VIATSA, quiero cotizar esta experiencia:', 'Hello VIATSA, I would like a quote for this experience:'), product.name.es, ...lines].join('\n'))}`;

  const style = document.createElement('style');
  style.textContent = '.day-rates{padding:18px 0;border-block:1px solid #60604244;line-height:1.7}.day-group-link{display:inline-block;margin:12px 0 4px}.day-request{border-top:1px solid #60604255;margin-top:26px;padding-top:20px}.day-fields{display:grid;grid-template-columns:1fr 1fr;gap:16px}.day-request label{display:grid;gap:7px;font-size:14px}.day-request input,.day-request select{width:100%;min-height:48px;font:inherit;padding:10px;border:1px solid #60604288;background:#fff8ed;color:#29291f}.day-request button,.day-request .wa{display:inline-block;min-height:48px;border:0;margin-top:18px;cursor:pointer}.day-request :focus-visible{outline:3px solid #606042;outline-offset:3px}.day-quote{margin:18px 0 0;padding:16px;background:#B2B29055;line-height:1.55}.day-request [hidden]{display:none}.day-consent{display:flex!important;align-items:flex-start;margin-top:18px;line-height:1.5}.day-consent input{width:22px;min-height:22px;flex-shrink:0}@media(max-width:600px){.day-fields{grid-template-columns:1fr}}';
  document.head.append(style);

  const previousOpen = openP;
  openP = function (legacy) {
    const product = byName(legacy[3]);
    if (!product) return previousOpen(legacy);
    const gallery = experiencePhotos[product.name.es];
    const places = product.destinations.map(place => `<li>${place}</li>`).join('');
    const included = product.included.map(item => `<li>${item}</li>`).join('');
    const options = departureOptions(product);
    const saona = product.id === 'isla-saona';
    const buggies = product.id === 'buggies-punta-cana';
    D.innerHTML = `<span class="eyebrow">${product.duration.label} · ${legacy[4]}</span><h2>${product.name.es}</h2><p class="lead">${product.shortDescription}</p>${gallery ? `<div class="trip-gallery">${Array.from({ length: gallery.count }, (_, index) => photoFrame(gallery, product.name.es, index)).join('')}</div>` : ''}<h3>${t('Tarifas por cantidad', 'Rates by group size')}</h3><p class="day-rates">${tierText(product)}</p><a class="wa day-group-link" target="_blank" rel="noopener" href="${whatsapp(product)}">${t('Cotizar grupo por WhatsApp', 'Quote a group via WhatsApp')}</a><div class="cols"><div><h4>${t('Lugares de la ruta', 'Places')}</h4><ul>${places}</ul></div><div><h4>${t('Incluye', 'Included')}</h4><ul>${included}</ul></div></div><form class="day-request"><h3>${t('Prepara tu consulta', 'Prepare your inquiry')}</h3><p>${t('El precio se actualiza según la cantidad indicada. VIATSA confirmará disponibilidad antes de reservar.', 'The price updates for your group size. VIATSA confirms availability before booking.')}</p><div class="day-fields"><label>${t('Fecha deseada *', 'Preferred date *')}<input type="date" name="date" required></label><label>${t('Adultos / viajeros *', 'Adults / travelers *')}<input type="number" name="adults" min="1" step="1" value="${product.minimumGuests || 1}" required></label>${saona ? `<label>${t('Niños de 3 a 10 años', 'Children aged 3–10')}<input type="number" name="children" min="0" step="1" value="0"></label>` : ''}<label>${t('Zona de recogida *', 'Pickup area *')}<select name="area" required><option value="">${t('Selecciona', 'Select')}</option>${options.map(option => `<option>${option}</option>`).join('')}<option>${t('Otra zona: consultar', 'Other area: ask us')}</option></select></label>${buggies ? `<label>${t('Vehículo *', 'Vehicle *')}<select name="vehicle" required><option value="">${t('Selecciona', 'Select')}</option><option value="75">Buggy · 1–2 · US$75</option><option value="95">Buggy familiar · 3–4 · US$95</option><option value="75">ATV / 4 Wheels · 1–2 · US$75</option><option value="110">Honda DBL · 1–2 · US$110</option><option value="170">Honda familiar · 3–4 · US$170</option></select></label>` : ''}</div><div class="day-quote" role="status"></div><label class="day-consent"><input type="checkbox" name="privacy" required><span>${t('Acepto el uso de estos datos según la', 'I agree to the use of these details under the')} <a href="/privacidad.html" target="_blank" rel="noopener">${t('Política de privacidad', 'Privacy Policy')}</a>.</span></label><button class="wa" type="submit">${t('Preparar consulta por WhatsApp', 'Prepare WhatsApp inquiry')}</button><div class="day-result" hidden><p>${t('Revisa el mensaje y pulsa Enviar en WhatsApp. La consulta todavía no se ha enviado.', 'Review the message and press Send in WhatsApp. The inquiry has not been sent yet.')}</p><a class="wa day-send" target="_blank" rel="noopener">${t('Abrir WhatsApp', 'Open WhatsApp')}</a></div></form>`;
    const form = D.querySelector('form');
    const date = form.elements.date;
    const now = new Date();
    date.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const refresh = () => {
      const adults = Number(form.elements.adults.value) || 0;
      const children = Number(form.elements.children?.value) || 0;
      const area = form.elements.area.value;
      let total = null;
      let detail = '';
      if (buggies) {
        total = Number(form.elements.vehicle.value) || null;
        detail = total ? t('Precio total del vehículo seleccionado.', 'Total price for the selected vehicle.') : t('Selecciona un vehículo para ver el precio.', 'Select a vehicle to see the price.');
      } else if (saona) {
        const rates = product.pricingConfig.departureRates[area];
        if (rates) { total = adults * rates.adult + children * rates.child; detail = `${adults} × ${money(rates.adult)}${children ? ` + ${children} × ${money(rates.child)}` : ''}`; }
        else detail = t('Selecciona la salida para calcular.', 'Select the departure point to calculate.');
      } else {
        const rate = rateFor(product, adults);
        if (rate) { total = rate * adults; detail = `${adults} × ${money(rate)} p/p`; }
        else detail = `${t('Mínimo', 'Minimum')}: ${product.minimumGuests || 1} ${t('viajeros.', 'travelers.')}`;
      }
      form.querySelector('.day-quote').innerHTML = total == null ? `<strong>${t('Precio a cotizar por WhatsApp', 'Price via WhatsApp quote')}</strong><br>${detail}` : `<strong>${t('Total estimado', 'Estimated total')}: ${money(total)}</strong><br>${detail}`;
      form.querySelector('.day-result').hidden = true;
      return { adults, children, area, total };
    };
    form.addEventListener('input', refresh);
    form.addEventListener('change', refresh);
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const quote = refresh();
      const lines = [`${t('Fecha', 'Date')}: ${date.value}`, `${t('Viajeros adultos', 'Adult travelers')}: ${quote.adults}`, ...(saona ? [`${t('Niños', 'Children')}: ${quote.children}`] : []), `${t('Recogida', 'Pickup')}: ${quote.area}`, ...(buggies ? [`${t('Vehículo', 'Vehicle')}: ${form.elements.vehicle.selectedOptions[0].textContent}`] : []), quote.total == null ? t('Solicito una cotización personalizada.', 'I need a custom quote.') : `${t('Total mostrado', 'Displayed total')}: ${money(quote.total)}`];
      form.querySelector('.day-send').href = whatsapp(product, lines);
      form.querySelector('.day-result').hidden = false;
    });
    refresh();
    M.showModal();
  };
  draw();
})();
