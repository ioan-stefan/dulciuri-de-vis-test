// Edit these in one place. Everything marked MOCK is a placeholder to replace with real data.
export const PHONE = '+40 700 000 000' // MOCK
export const PHONE_HREF = 'tel:+40700000000' // MOCK
export const WA_NUMBER = '40700000000' // MOCK, international format, no +
export const HERO_RATING = '4,9' // MOCK
export const HERO_REVIEWS = '240+' // MOCK
export const GOOGLE_RATING = '5,0' // MOCK
export const GOOGLE_REVIEWS = '200+' // MOCK
export const INSTAGRAM_HANDLE = '@dulciuridevis' // MOCK
export const INSTAGRAM_URL = 'https://www.instagram.com/dulciuridevis' // MOCK

// Several of the originally supplied Unsplash IDs are dead or show other subjects
// (cupcakes, bread, cookies, 404), so each slot uses a verified photo that matches its label.
const u = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`
export const IMAGES = {
  pistachio: u('photo-1565958011703-44f9829ba187', 1000),
  chocolate: u('photo-1578985545062-69928b1d9587', 800),
  macaronStack: u('photo-1558326567-98ae2405596b', 800),
  macaronPile: u('photo-1569864358642-9d1684040f43', 900),
  macaronRibbon: u('photo-1612201142855-7873bc1661b4', 600),
  weddingTier: u('photo-1535254973040-607b474cb50d', 600),
  weddingTierLarge: u('photo-1535254973040-607b474cb50d', 1200),
  festive: u('photo-1464347744102-11db6282f854', 600),
  kids: u('photo-1621303837174-89787a7d4729', 600),
  blackForest: u('photo-1606890737304-57a1ca8a5b62', 900),
  mango: u('photo-1542826438-bd32f43d626f', 900),
  trio: u('photo-1602351447937-745cb720612f', 900),
  miniTarts: u('photo-1495147466023-ac5c588e2e94', 900),
  story: u('photo-1464349095431-e9a21285b5f3', 900),
  piping: u('photo-1586985289688-ca3cf47d3e6e', 700),
  mousseJars: u('photo-1488477181946-6428a0291777', 700),
  blackberry: u('photo-1559620192-032c4bc4674e', 700),
  pinkDrip: u('photo-1562440499-64c9a111f713', 700),
}

export const MARQUEE = [
  'Ciocolată veritabilă Callebaut 70%',
  'Unt artizanal 82% grăsime',
  'Fistic pur de Bronte',
  'Vanilie Bourbon de Madagascar',
  'Fără premixuri sau aditivi',
  'Decor lucrat manual',
]

export const EVENTS = [
  { name: 'Nuntă', tag: 'Etajat & Rafinat', img: IMAGES.weddingTier, tiered: true },
  { name: 'Aniversare', tag: 'Festiv & Personalizat', img: IMAGES.festive },
  { name: 'Botez', tag: 'Delicat & Elegant', img: IMAGES.macaronRibbon },
  { name: 'Petrecere Copii', tag: 'Jucăuș & Tematic', img: IMAGES.kids },
]

export const FLAVORS = [
  {
    name: 'Mousse Fistic & Zmeură Proaspătă',
    short: 'Fistic & Zmeură',
    profile: 'Cremos, fructat și ușor sărat de fistic.',
    parts: ['Pistachio Bronte', 'Jeleu de zmeură', 'Blat de vanilie'],
    badge: 'Favorit',
    preview: IMAGES.pistachio,
  },
  {
    name: 'Ciocolată Belgiană Callebaut & Vișine',
    short: 'Ciocolată & Vișine',
    profile: 'Intens, adânc, cu acidulatul vișinelor.',
    parts: ['Ganache 70%', 'Vișine confiate', 'Inserție crocantă'],
    preview: IMAGES.blackForest,
  },
  {
    name: 'Mango Exotic & Fructul Pasiunii',
    short: 'Mango & Pasiune',
    profile: 'Lejer, răcoritor, cu o notă tropicală.',
    parts: ['Mousse lejer', 'Coulis de pasiune', 'Blat de cocos'],
    preview: IMAGES.mango,
  },
  {
    name: 'Trio Ciocolată & Caramel Sărat',
    short: 'Trio Ciocolată',
    profile: 'Catifelat, dulce-sărat, cu praline care trosnesc.',
    parts: ['Trei straturi catifelate', 'Praline crocant'],
    preview: IMAGES.trio,
  },
]

// tiers = how many cake tiers the preview indicator shows for this size
export const SIZES = [
  { label: '10-14 porții', kg: '2.0', range: '280 - 320 RON', level: 1, tiers: 1 },
  { label: '18-24 porții', kg: '3.5', range: '490 - 560 RON', level: 2, tiers: 2 },
  { label: '30-40 porții', kg: '5.0', range: '700 - 850 RON', level: 3, tiers: 3 },
]

export const CEREMONY = {
  title: 'Torturi de Ceremonie & Nunți',
  price: 'De la 140 lei / kg',
  text: 'Etaje fine, flori de zahăr și decor lucrat manual, gândite după povestea voastră.',
  img: IMAGES.weddingTierLarge,
  alt: 'Tort de nuntă cu trei etaje și trandafiri',
  details: [
    'Etaje de la 2 la 4, în funcție de numărul de invitați',
    'Flori de zahăr și decor lucrat manual',
    'Cutie de degustare cu 4 compoziții, la cerere',
    'Comandă cu minim 3-5 zile lucrătoare înainte',
  ],
}

export const FINE = {
  title: 'Monoporții & Prăjituri Fine',
  text: 'Coapte în fiecare dimineață, pentru masa de duminică sau pentru un colț dulce la birou.',
  img: IMAGES.miniTarts,
  alt: 'Tarte mici cu fructe',
  items: ['Ecleruri artizanale', 'Tarte caramel sărat', 'Mousse cu fructe'],
}

export const CANDY = {
  title: 'Candy Bar Personalizat',
  text: 'Bifează ce vrei să includă setup-ul tău. Pachete începând de la 30 de persoane.',
  img: IMAGES.macaronPile,
  alt: 'Macarons pastelate pentru candy bar',
  items: ['Shot-uri mousse', 'Macarons', 'Minitarte', 'Decor tematic'],
}

// likes are MOCK
export const GALLERY = [
  { img: IMAGES.piping, alt: 'Decorarea unui tort cu cremă, în laborator', likes: 1284 },
  { img: IMAGES.mousseJars, alt: 'Mousse cu căpșuni la pahar', likes: 436 },
  { img: IMAGES.blackberry, alt: 'Tort cu mure și flori comestibile', likes: 927 },
  { img: IMAGES.pinkDrip, alt: 'Tort roz cu macarons', likes: 651 },
]

export const REVIEWS = [
  {
    quote: 'Fistic adevărat, nu aromă. Tortul de nuntă a fost lăudat de toți invitații, iar prezentarea a arătat exact ca în poze.',
    name: 'Raluca Tudorache',
    role: 'Mireasă, Balotești',
  },
  {
    quote: 'Livrarea a ajuns la Otopeni cu 30 de minute înainte de ora stabilită, perfect păstrat la rece.',
    name: 'Cătălin Marinescu',
    role: 'Client fidel, Otopeni',
  },
  {
    quote: 'Candy bar-ul pentru botez a fost o bijuterie: macarons proaspete, cremele deloc prea dulci și un aranjament impecabil.',
    name: 'Ioana Stanciu',
    role: 'București, Sector 1',
  },
]

export const FAQ = [
  {
    q: 'Cu cât timp înainte trebuie comandat un tort personalizat?',
    a: 'Minim 3-5 zile lucrătoare înainte de eveniment. Scrieți-ne pe WhatsApp cu data și vă confirmăm disponibilitatea.',
  },
  {
    q: 'Oferiți degustare pentru torturile de nuntă?',
    a: 'Da, organizăm cutii de degustare cu 4 compoziții, ca să alegeți aroma potrivită pentru nunta voastră.',
  },
  {
    q: 'Cum se realizează livrarea?',
    a: 'Livrare specializată cu mașină frigorifică în tot județul Ilfov și în București, ca tortul să ajungă perfect păstrat.',
  },
  {
    q: 'Care este comanda minimă pentru Candy Bar?',
    a: 'Pachetele încep de la 30 de persoane.',
  },
]
