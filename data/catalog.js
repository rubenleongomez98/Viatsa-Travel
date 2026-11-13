/*
 * Fuente única de verdad del catálogo público de VIATSA Travel.
 * Los componentes deben leer estos datos; no dupliques fichas en páginas HTML.
 */
(function () {
  const contact = {
    email: 'viatsatravel@gmail.com',
    whatsapp: '+18099723232',
    phone: '+1 809 972 3232',
    instagram: 'https://instagram.com/viatsa.travel',
    location: 'Santo Domingo, República Dominicana'
  };
  const common = {
    included: ['Alojamiento', 'Comidas indicadas', 'Transporte privado', 'Coordinación 24/7', 'Fotografías', 'Equipo para excursiones'],
    notIncluded: ['Cenas', 'Propinas', 'Bebidas alcohólicas'],
    whatToBring: ['Ropa ligera', 'Trajes de baño', 'Zapatillas cerradas', 'Protector solar y repelente', 'Documento de identidad'],
    restrictions: 'Varias paradas no son accesibles para silla de ruedas. Informa cualquier condición médica antes de reservar.',
    languages: ['Español', 'Inglés'],
    pickup: 'Recogida disponible en cualquier punto. Fuera de Santo Domingo puede aplicar un costo adicional.',
    bookingMode: 'availability_request'
  };
  const products = [
    {
      id: 'perla-del-sur', slug: 'perla-del-sur', type: 'adventure', status: 'active', featured: true,
      name: { es: 'Perla del Sur', en: 'Pearl of the South' }, shortDescription: 'Una aventura privada por playas, balnearios y paisajes costeros del sur.',
      longDescription: 'Una inmersión en el lado más virgen de República Dominicana.', duration: { days: 2, label: '2 días · 1 noche' }, nights: 1,
      region: 'sur', destinations: ['Arroyo Salado', 'Los Patos', 'San Rafael', 'Mirador San Rafael', 'Parque Eólico'], heroImage: 'perla-15.webp', images: ['perla-15.webp', 'perla-05.webp', 'perla-10.webp', 'perla-11.webp', 'perla-14.webp', 'perla-16.webp'],
      highlights: ['Costa sur', 'Paisajes naturales', 'Aventura privada'], itinerary: [], ...common, minimumGuests: 2, maximumGuests: null,
      pricingConfig: { display: 'Desde US$345 p/p', tiers: [{ min: 2, max: 2, perPerson: 420 }, { min: 3, max: 5, perPerson: 390 }, { min: 6, max: null, perPerson: 345 }] },
      seo: { title: 'Perla del Sur | VIATSA Travel', description: 'Aventura privada de 2 días por el sur de República Dominicana.' }
    },
    {
      id: 'vuelta-a-la-isla', slug: 'vuelta-a-la-isla', type: 'adventure', status: 'active', featured: true,
      name: { es: 'Vuelta a la Isla', en: 'Around the Island' }, shortDescription: 'Playas, naturaleza e historia en un gran recorrido privado.',
      longDescription: 'Un viaje por distintos paisajes y regiones de República Dominicana.', duration: { days: 6, label: '6 días · 5 noches' }, nights: 5,
      region: 'todas', destinations: ['Ciudad Colonial', 'Río San Juan', 'Laguna Gri Gri', 'Cabrera', 'Samaná', 'Playa Ermitaño'], heroImage: 'vuelta-01.webp', images: ['vuelta-01.webp', 'vuelta-02.webp', 'vuelta-03.webp', 'vuelta-04.webp'],
      highlights: ['Recorrido por la isla', 'Naturaleza', 'Viaje privado'], itinerary: [], ...common, minimumGuests: 2, maximumGuests: null,
      pricingConfig: { display: 'Desde US$895 p/p', tiers: [{ min: 2, max: 2, perPerson: 995 }, { min: 3, max: 5, perPerson: 940 }, { min: 6, max: null, perPerson: 895 }] },
      seo: { title: 'Vuelta a la Isla | VIATSA Travel', description: 'Aventura privada de 6 días por República Dominicana.' }
    },
    {
      id: 'entre-cascadas-y-palmeras', slug: 'entre-cascadas-y-palmeras', type: 'adventure', status: 'active', featured: true,
      name: { es: 'Entre Cascadas y Palmeras', en: 'Between Waterfalls and Palms' }, shortDescription: 'Cascadas, naturaleza exuberante y playas intactas en Samaná.',
      longDescription: 'Una escapada privada a la naturaleza de Samaná.', duration: { days: 2, label: '2 días · 1 noche' }, nights: 1,
      region: 'samana', destinations: ['Salto de Socoa', 'Laguna Cristal', 'Playa Ermitaño', 'Playa Onda', 'Playa El Valle', 'Las Galeras'], heroImage: 'samana-strip-drive.webp', images: ['samana-strip-drive.webp'],
      highlights: ['Cascadas', 'Playas escondidas', 'Samaná'], itinerary: [], ...common, minimumGuests: 2, maximumGuests: null,
      pricingConfig: { display: 'Desde US$385 p/p', tiers: [{ min: 2, max: 2, perPerson: 460 }, { min: 3, max: 5, perPerson: 395 }, { min: 6, max: null, perPerson: 385 }] },
      seo: { title: 'Entre Cascadas y Palmeras | VIATSA Travel', description: 'Aventura privada de 2 días por Samaná.' }
    },
    { id: 'isla-saona', slug: 'isla-saona', type: 'experience', status: 'active', featured: true, name: { es: 'Isla Saona', en: 'Saona Island' }, shortDescription: 'Navega por Cotubanamá, Palmilla y el Caribe de Isla Saona.', longDescription: '', duration: { days: 1, label: '8–10 horas' }, nights: 0, region: 'este', destinations: ['Parque Nacional Cotubanamá', 'Piscina Natural de Palmilla', 'Canal de Catuano', 'Isla Saona'], heroImage: 'saona-01.webp', images: ['saona-01.webp', 'saona-02.webp'], highlights: [], itinerary: [], included: ['Transporte', 'Catamarán', 'Almuerzo dominicano', 'Fotos y videos', 'Ron dominicano, cerveza y agua'], notIncluded: [], whatToBring: [], restrictions: '', languages: ['Español', 'Inglés'], pickup: 'Bayahíbe, Santo Domingo y Punta Cana.', minimumGuests: 1, maximumGuests: null, pricingConfig: { display: 'Adultos desde US$90', departureRates: { 'Santo Domingo': { adult: 90, child: 60 }, 'Bayahíbe': { adult: 90, child: 60 }, 'Punta Cana': { adult: 95, child: 60 } }, childAges: '3–10 años' }, bookingMode: 'availability_request', seo: {} },
    { id: 'buggies-punta-cana', slug: 'buggies-punta-cana', type: 'experience', status: 'active', featured: true, name: { es: 'Buggies Punta Cana', en: 'Punta Cana Buggies' }, shortDescription: 'Adrenalina por caminos rurales, comunidades locales y Playa Macao.', longDescription: '', duration: { days: 1, label: '4 horas' }, nights: 0, region: 'este', destinations: ['Casa típica dominicana', 'Manantial subterráneo', 'Playa Macao'], heroImage: 'buggies-01.webp', images: ['buggies-01.webp', 'buggies-02.webp'], highlights: [], itinerary: [], included: ['Transporte según ubicación', 'Guía multilingüe', 'Casco', 'Recorrido en buggy'], notIncluded: ['Desayuno'], whatToBring: [], restrictions: '', languages: ['Español', 'Inglés'], pickup: 'Punta Cana y Bávaro.', minimumGuests: 1, maximumGuests: 4, pricingConfig: { display: 'Desde US$75 por vehículo' }, bookingMode: 'availability_request', seo: {} },
    { id: 'playa-fronton', slug: 'playa-fronton', type: 'experience', status: 'active', featured: true, name: { es: 'Playa Frontón, Samaná', en: 'Frontón Beach, Samaná' }, shortDescription: 'Navegación por la costa y playas vírgenes de Las Galeras.', longDescription: '', duration: { days: 1, label: '1 día' }, nights: 0, region: 'samana', destinations: ['Playa Frontón', 'Playa Madama', 'La Playita'], heroImage: 'samana-strip-drive.webp', images: ['samana-strip-drive.webp'], highlights: [], itinerary: [], included: ['Transporte desde Santo Domingo', 'Almuerzo criollo', 'Guías locales', 'Navegación en lancha', 'Fotos y videos'], notIncluded: [], whatToBring: [], restrictions: '', languages: ['Español'], pickup: 'Santo Domingo.', minimumGuests: 2, maximumGuests: null, pricingConfig: { display: 'Desde US$150 p/p', tiers: [{ min: 2, max: 2, perPerson: 190 }, { min: 3, max: 5, perPerson: 170 }, { min: 6, max: null, perPerson: 150 }] }, bookingMode: 'availability_request', seo: {} },
    { id: 'jarabacoa', slug: 'escapada-a-la-montana-jarabacoa', type: 'experience', status: 'active', featured: false, name: { es: 'Escapada a la Montaña - Jarabacoa', en: 'Mountain Escape - Jarabacoa' }, shortDescription: 'Un recorrido entre montañas, ríos y cascadas de Jarabacoa.', longDescription: '', duration: { days: 1, label: '1 día' }, nights: 0, region: 'norte', destinations: ['Salto Baiguate', 'Salto de Jimenoa', 'La Confluencia', 'Jarabacoa'], heroImage: '', images: [], highlights: [], itinerary: [], included: ['Transporte desde Santo Domingo', 'Almuerzo criollo', 'Guías locales', 'Safari por el pueblo', 'Fotos y videos'], notIncluded: [], whatToBring: [], restrictions: '', languages: ['Español'], pickup: 'Santo Domingo.', minimumGuests: 2, maximumGuests: null, pricingConfig: { display: 'Desde US$115 p/p', tiers: [{ min: 2, max: 2, perPerson: 150 }, { min: 3, max: 5, perPerson: 125 }, { min: 6, max: null, perPerson: 115 }] }, bookingMode: 'availability_request', seo: {} },
    { id: 'salto-el-limon', slug: 'salto-el-limon', type: 'experience', status: 'active', featured: false, name: { es: 'Salto El Limón - Samaná', en: 'El Limón Waterfall - Samaná' }, shortDescription: 'Senderismo, caballo, cascada y tiempo libre en Playa Morón.', longDescription: '', duration: { days: 1, label: '1 día' }, nights: 0, region: 'samana', destinations: ['Salto El Limón', 'Playa Morón'], heroImage: 'samana-strip-drive.webp', images: ['samana-strip-drive.webp'], highlights: [], itinerary: [], included: ['Almuerzo criollo tipo buffet', 'Guías locales', 'Senderismo', 'Recorrido a caballo', 'Entrada al área protegida'], notIncluded: [], whatToBring: [], restrictions: '', languages: ['Español'], pickup: '', minimumGuests: 2, maximumGuests: null, pricingConfig: { display: 'Desde US$135 p/p', tiers: [{ min: 2, max: 2, perPerson: 195 }, { min: 3, max: 5, perPerson: 140 }, { min: 6, max: null, perPerson: 135 }] }, bookingMode: 'availability_request', seo: {} },
    { id: 'rio-partido', slug: 'rio-partido', type: 'experience', status: 'active', featured: false, name: { es: 'Río Partido, Salcedo', en: 'Río Partido, Salcedo' }, shortDescription: 'Una ruta para conocer uno de los ríos azules más sorprendentes del país.', longDescription: '', duration: { days: 1, label: '1 día' }, nights: 0, region: 'norte', destinations: ['Río Partido'], heroImage: 'rio-partido-strip.webp', images: ['rio-partido-strip.webp'], highlights: [], itinerary: [], included: ['Transporte', 'Almuerzo', 'Fotos y videos', 'Agua y merienda', 'Guía local', 'Chalecos salvavidas'], notIncluded: [], whatToBring: [], restrictions: '', languages: ['Español'], pickup: '', minimumGuests: 2, maximumGuests: null, pricingConfig: { display: 'Desde US$120 p/p', tiers: [{ min: 2, max: 2, perPerson: 175 }, { min: 3, max: 5, perPerson: 140 }, { min: 6, max: null, perPerson: 120 }] }, bookingMode: 'availability_request', seo: {} },
    { id: 'desierto-caribe', slug: 'desierto-en-el-caribe', type: 'experience', status: 'active', featured: false, name: { es: 'Desierto en el Caribe', en: 'Desert in the Caribbean' }, shortDescription: 'Dunas, salinas, iguanas y playa en Baní.', longDescription: '', duration: { days: 1, label: '1 día' }, nights: 0, region: 'sur', destinations: ['Salinas de Baní', 'Dunas de las Calderas', 'Playa Salinas', 'Santuario San Martín de Porres'], heroImage: '', images: [], highlights: [], itinerary: [], included: ['Transporte', 'Almuerzo criollo', 'Entrada a las dunas', 'Fotos y videos'], notIncluded: [], whatToBring: [], restrictions: '', languages: ['Español'], pickup: '', minimumGuests: 2, maximumGuests: null, pricingConfig: { display: 'Desde US$110 p/p', tiers: [{ min: 2, max: 2, perPerson: 170 }, { min: 3, max: 5, perPerson: 125 }, { min: 6, max: null, perPerson: 110 }] }, bookingMode: 'availability_request', seo: {} },
    { id: 'cascadas-virgenes', slug: 'cascadas-virgenes', type: 'experience', status: 'active', featured: false, name: { es: 'Cascadas Vírgenes', en: 'Virgin Waterfalls' }, shortDescription: 'Cascadas, charcos naturales y cultura local.', longDescription: '', duration: { days: 1, label: '1 día' }, nights: 0, region: 'sur', destinations: ['Cascada La Taina', 'Charco Dos Aguas', 'Casa típica dominicana'], heroImage: 'cascadas-virgenes-strip.webp', images: ['cascadas-virgenes-strip.webp'], highlights: [], itinerary: [], included: ['Transporte', 'Almuerzo local', 'Fotos y videos', 'Agua y merienda', 'Guía local', 'Equipos de protección'], notIncluded: [], whatToBring: [], restrictions: '', languages: ['Español'], pickup: '', minimumGuests: 2, maximumGuests: null, pricingConfig: { display: 'Desde US$160 p/p', tiers: [{ min: 2, max: 2, perPerson: 195 }, { min: 3, max: 5, perPerson: 185 }, { min: 6, max: null, perPerson: 160 }] }, bookingMode: 'availability_request', seo: {} },
    { id: 'rio-san-juan', slug: 'rio-san-juan', type: 'experience', status: 'active', featured: true, name: { es: 'Recorrido por Río San Juan', en: 'Río San Juan Tour' }, shortDescription: 'Lagunas, cuevas y playas especiales de la costa norte.', longDescription: '', duration: { days: 1, label: '1 día' }, nights: 0, region: 'norte', destinations: ['Laguna Gri Gri', 'Cueva de las Golondrinas', 'Piscina Natural', 'Playa Caletón', 'Playa Grande'], heroImage: 'rio-01.webp', images: ['rio-01.webp', 'rio-02.webp'], highlights: [], itinerary: [], included: ['Transporte', 'Bote', 'Almuerzo criollo', 'Fotos y videos', 'Guía local', 'Equipos de protección'], notIncluded: [], whatToBring: [], restrictions: '', languages: ['Español', 'Inglés'], pickup: '', minimumGuests: 2, maximumGuests: null, pricingConfig: { display: 'Desde US$130 p/p', tiers: [{ min: 2, max: 2, perPerson: 190 }, { min: 3, max: 5, perPerson: 160 }, { min: 6, max: null, perPerson: 130 }] }, bookingMode: 'availability_request', seo: {} },
    { id: 'cabrera', slug: 'recorrido-por-cabrera', type: 'experience', status: 'active', featured: false, name: { es: 'Recorrido por Cabrera', en: 'Cabrera Tour' }, shortDescription: 'Laguna, cascada y playas de la costa norte.', longDescription: '', duration: { days: 1, label: '1 día' }, nights: 0, region: 'norte', destinations: ['Laguna Dudú', 'Playa Diamante', 'Cascada El Saltadero', 'Playa Arroyo Salado'], heroImage: '', images: [], highlights: [], itinerary: [], included: ['Transporte ida y vuelta', 'Entrada a Laguna Dudú', 'Almuerzo criollo', 'Fotos y videos', 'Guía local', 'Equipos de protección'], notIncluded: [], whatToBring: [], restrictions: '', languages: ['Español'], pickup: '', minimumGuests: 2, maximumGuests: null, pricingConfig: { display: 'Desde US$140 p/p', tiers: [{ min: 2, max: 2, perPerson: 195 }, { min: 3, max: 5, perPerson: 165 }, { min: 6, max: null, perPerson: 140 }] }, bookingMode: 'availability_request', seo: {} },
    { id: 'santo-domingo', slug: 'santo-domingo', type: 'experience', status: 'active', featured: false, name: { es: 'La otra cara de Santo Domingo', en: 'The Other Side of Santo Domingo' }, shortDescription: 'Cuevas, patrimonio y rincones naturales de la primera ciudad de América.', longDescription: '', duration: { days: 1, label: '1 día' }, nights: 0, region: 'santo-domingo', destinations: ['Cueva del Huevo', 'Cueva Taína', 'Los Tres Ojos', 'Faro a Colón', 'Ciudad Colonial'], heroImage: 'santo-domingo-strip.webp', images: ['santo-domingo-strip.webp'], highlights: [], itinerary: [], included: ['Transporte', 'Fotos y videos', 'Guías locales'], notIncluded: [], whatToBring: [], restrictions: '', languages: ['Español'], pickup: 'Santo Domingo.', minimumGuests: 2, maximumGuests: null, pricingConfig: { display: 'Desde US$120 p/p', tiers: [{ min: 2, max: 2, perPerson: 180 }, { min: 3, max: 5, perPerson: 150 }, { min: 6, max: null, perPerson: 120 }] }, bookingMode: 'availability_request', seo: {} },
    { id: 'bavaro-adventure-park', slug: 'bavaro-adventure-park', type: 'experience', status: 'active', featured: false, name: { es: 'Bávaro Adventure Park', en: 'Bávaro Adventure Park' }, shortDescription: 'Un día de aventura en Punta Cana.', longDescription: '', duration: { days: 1, label: '8 horas' }, nights: 0, region: 'este', destinations: ['Punta Cana', 'Bávaro', 'Cap Cana'], heroImage: '', images: [], highlights: [], itinerary: [], included: ['Buggy VIP', 'Tour de caballos', 'Zip Line Mega Splash', 'Jungle River', 'Cenote Blue Lagoon', 'Sacred River', 'Piscina con cascada', 'Transporte ida y vuelta', 'Almuerzo', 'Bebidas'], notIncluded: [], whatToBring: [], restrictions: '', languages: ['Español', 'Inglés'], pickup: 'Punta Cana, Cap Cana y Bávaro.', minimumGuests: 1, maximumGuests: null, pricingConfig: { display: 'US$169 p/p', perPerson: 169 }, bookingMode: 'availability_request', seo: {} },
    { id: 'sacred-river', slug: 'sacred-river', type: 'experience', status: 'active', featured: false, name: { es: 'Cenote de Noche con Cena y Fiesta', en: 'Night Cenote, Dinner and Party' }, shortDescription: 'Cena, música en vivo y fiesta en la jungla.', longDescription: '', duration: { days: 1, label: '3½–4 horas' }, nights: 0, region: 'este', destinations: ['Sacred River', 'Cenotes', 'Piscina natural'], heroImage: '', images: [], highlights: [], itinerary: [], included: ['Transporte ida y vuelta', 'Cena con barra libre', 'Música en vivo', 'Fiesta en la jungla', 'Visita a cenotes', 'Equipo e instrucciones de seguridad', 'Guías bilingües'], notIncluded: [], whatToBring: [], restrictions: '', languages: ['Español', 'Inglés'], pickup: 'Punta Cana, Bávaro y Cap Cana; sujeto a ubicación.', minimumGuests: 1, maximumGuests: null, pricingConfig: { display: 'US$245 p/p', perPerson: 245 }, bookingMode: 'availability_request', seo: {} },
    { id: 'bayahibe-mar-cuevas', slug: 'bayahibe-mar-cuevas-y-esencia-caribena', type: 'experience', status: 'archived', name: { es: 'Bayahíbe: mar, cuevas y esencia caribeña', en: 'Bayahíbe: sea, caves and Caribbean essence' } }
  ];
  const translations = {
  "Alojamiento": "Accommodation",
  "Comidas indicadas": "Meals as specified",
  "Transporte privado": "Private transport",
  "Coordinación 24/7": "24/7 coordination",
  "Fotografías": "Photography",
  "Equipo para excursiones": "Excursion equipment",
  "Cenas": "Dinners",
  "Propinas": "Tips",
  "Bebidas alcohólicas": "Alcoholic drinks",
  "Ropa ligera": "Light clothing",
  "Trajes de baño": "Swimwear",
  "Zapatillas cerradas": "Closed-toe shoes",
  "Protector solar y repelente": "Sunscreen and insect repellent",
  "Documento de identidad": "ID document",
  "Costa sur": "Southern coast",
  "Paisajes naturales": "Natural landscapes",
  "Aventura privada": "Private adventure",
  "Recorrido por la isla": "Around the island",
  "Naturaleza": "Nature",
  "Viaje privado": "Private trip",
  "Cascadas": "Waterfalls",
  "Playas escondidas": "Hidden beaches",
  "Recogida disponible en cualquier punto. Fuera de Santo Domingo puede aplicar un costo adicional.": "Pickup can be arranged from any location. An additional charge may apply outside Santo Domingo.",
  "Varias paradas no son accesibles para silla de ruedas. Informa cualquier condición médica antes de reservar.": "Several stops are not wheelchair accessible. Tell us about any medical condition before booking."
};
  const descriptionsEn = {
  "perla-del-sur": "A private journey along the southern coast, through beaches, swimming spots and coastal landscapes.",
  "vuelta-a-la-isla": "Beaches, nature and history on a private trip around the island.",
  "entre-cascadas-y-palmeras": "Waterfalls, green landscapes and beaches in Samaná.",
  "isla-saona": "Sail along Cotubanamá, Palmilla and the Caribbean shores of Saona Island.",
  "buggies-punta-cana": "Rural roads, local communities and Macao Beach.",
  "rio-san-juan": "Lagoons, caves and beaches along the northern coast.",
  "samana": "Hidden beaches and green landscapes in Samaná."
};
  const parkGalleries = {
    'bavaro-adventure-park': { prefix: 'bavaro-park', count: 15 },
    'sacred-river': { prefix: 'sacred-river', count: 8 }
  };
  products.forEach(p=>{
    if(descriptionsEn[p.id]) p.editorial={descriptionEn:descriptionsEn[p.id]};
    const gallery=parkGalleries[p.id];
    if(gallery){
      p.images=Array.from({length:gallery.count},(_,i)=>`${gallery.prefix}-${String(i+1).padStart(2,'0')}.webp`);
      p.heroImage=p.images[0];
    }
  });
  const active = (type) => products.filter((p) => p.status === 'active' && (!type || p.type === type));
  const toLegacy = (type) => active(type).map((p) => [
    p.type === 'adventure' ? 'aventura' : 'experiencia', p.region, p.duration.label, p.name.es,
    p.region === 'todas' ? 'Toda la isla' : p.region === 'samana' ? 'Samaná' : p.region === 'santo-domingo' ? 'Santo Domingo' : p.region[0].toUpperCase() + p.region.slice(1),
    p.shortDescription, p.destinations.join('|'), (p.included || []).join('|'), p.pricingConfig.display, p.bookingMode === 'availability_request' ? 'Confirmación previa de disponibilidad.' : 'Pago en el lugar.'
  ]);
  const mediaFrames = { "samana-strip-drive.webp": 4, "rio-partido-strip.webp": 4, "cascadas-virgenes-strip.webp": 4, "santo-domingo-strip.webp": 2 };
  const catalog = { contact, products, active, mediaFrames, translations, bySlug: (slug) => products.find((p) => p.slug === slug), toLegacy };
  if (typeof window !== 'undefined') window.VIATSA_CATALOG = catalog;
  if (typeof module !== 'undefined') module.exports = catalog;
}());
