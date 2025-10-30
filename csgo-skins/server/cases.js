// server/cases.js
const MEDIA_BASE = 'https://media.csgo-skins.com/container/';

const MakeCase = ({ name, displayName, price, banner, items = [] }) => ({
  name,
  displayName,
  price,
  banner: banner ?? `${MEDIA_BASE}${name}.png`,
  items,
});

const Cases = [
  MakeCase({
    name: 'low-case',
    displayName: 'Low Case',
    price: '1.26',
    banner: `${MEDIA_BASE}low-case.png`,
    items: [
      { id: 'm4a4-desolate-space',  name: 'M4A4 | Desolate Space', rarity: 'mythic',    prob: 0.0022, market: 'M4A4 | Desolate Space' },
      { id: 'five-seven-monkey',    name: 'Five-SeveN | Monkey Business', rarity: 'legendary', prob: 0.006,  market: 'Five-SeveN | Monkey Business' },
      { id: 'm4a1s-leaded-glass',   name: 'M4A1-S | Leaded Glass', rarity: 'legendary',  prob: 0.012,  market: 'M4A1-S | Leaded Glass' },
      { id: 'm4a4-spider-lily',     name: 'M4A4 | Spider Lily', rarity: 'legendary',     prob: 0.012,  market: 'M4A4 | Spider Lily' },
      { id: 'awp-atheris',          name: 'AWP | Atheris', rarity: 'legendary',          prob: 0.023,  market: 'AWP | Atheris' },
      { id: 'usp-cortex',           name: 'USP-S | Cortex', rarity: 'legendary',         prob: 0.029,  market: 'USP-S | Cortex' },

      { id: 'famas-zx',             name: 'FAMAS | ZX Spectron', rarity: 'rare',         prob: 0.028,  market: 'FAMAS | ZX Spectron' },
      { id: 'five-seven-boost',     name: 'Five-SeveN | Boost Protocol', rarity: 'rare', prob: 0.023,  market: 'Five-SeveN | Boost Protocol' },
      { id: 'm4a4-evil',            name: 'M4A4 | Evil Daimyo', rarity: 'rare',          prob: 0.017,  market: 'M4A4 | Evil Daimyo' },
      { id: 'cz75-tigris',          name: 'CZ75-Auto | Tigris', rarity: 'rare',          prob: 0.028,  market: 'CZ75-Auto | Tigris' },
      { id: 'glock-bunsen',         name: 'Glock-18 | Bunsen Burner', rarity: 'rare',    prob: 0.4,    market: 'Glock-18 | Bunsen Burner' },
      { id: 'mp7-cirrus',           name: 'MP7 | Cirrus', rarity: 'rare',                prob: 3.48,   market: 'MP7 | Cirrus' },

      { id: 'galil-rocket-pop',     name: 'Galil AR | Rocket Pop', rarity: 'common',     prob: 3.478,  market: 'Galil AR | Rocket Pop' },
      { id: 'ppbizon-photic',       name: 'PP-Bizon | Photic Zone', rarity: 'common',     prob: 0.35,   market: 'PP-Bizon | Photic Zone' },
      { id: 'glock-weasel',         name: 'Glock-18 | Weasel', rarity: 'common',         prob: 1.77,   market: 'Glock-18 | Weasel' },
      { id: 'sg553-dragon',         name: 'SG 553 | Dragon Tech', rarity: 'common',      prob: 6.48,   market: 'SG 553 | Dragon Tech' },
      { id: 'p250-valence',         name: 'P250 | Valence', rarity: 'common',            prob: 3.46,   market: 'P250 | Valence' },
      { id: 'sg553-heavy',          name: 'SG 553 | Heavy Metal', rarity: 'common',      prob: 7.63,   market: 'SG 553 | Heavy Metal' },

      { id: 'mac10-ensnared',       name: 'MAC-10 | Ensnared', rarity: 'common',         prob: 12.5,   market: 'MAC-10 | Ensnared' },
      { id: 'five-seven-scrawl',    name: 'Five-SeveN | Scrawl', rarity: 'common',       prob: 12.49,  market: 'Five-SeveN | Scrawl' },
      { id: 'mp5sd-necro',          name: 'MP5-SD | Necro Jr.', rarity: 'common',        prob: 10.06,  market: 'MP5-SD | Necro Jr.' },
      { id: 'p2000-lifted',         name: 'P2000 | Lifted Spirits', rarity: 'common',    prob: 12.5,   market: 'P2000 | Lifted Spirits' },
      { id: 'm4a4-poly-mag',        name: 'M4A4 | Poly Mag', rarity: 'common',           prob: 12.49,  market: 'M4A4 | Poly Mag' },
      { id: 'mp7-motherboard',      name: 'MP7 | Motherboard', rarity: 'common',         prob: 12.49,  market: 'MP7 | Motherboard' },
    ],
  }),

  MakeCase({ name: 'indirect-case', displayName: 'Indirect Case', price: '2.10' }),
  MakeCase({ name: 'medium-case', displayName: 'Medium Case', price: '3.15' }),
  MakeCase({ name: 'ultra-case', displayName: 'Ultra Case', price: '4.20' }),
  MakeCase({ name: 'ammo-case', displayName: 'Ammo Case', price: '4.41' }),
  MakeCase({ name: 'rust-case', displayName: 'Rust Case', price: '4.62' }),
  MakeCase({ name: 'c4-case', displayName: 'C4 Case', price: '5.04', banner: `${MEDIA_BASE}final-countdown.png` }),
  MakeCase({ name: 'chocolate-case', displayName: 'Chocolate Case', price: '5.88', banner: `${MEDIA_BASE}114.png` }),
  MakeCase({ name: 'ember-case', displayName: 'Ember Case', price: '6.30' }),
  MakeCase({ name: 'neon-case', displayName: 'Neon Case', price: '8.40' }),
  MakeCase({ name: 'plague-case', displayName: 'Plague Case', price: '8.40' }),
  MakeCase({ name: 'toolbox-case', displayName: 'Toolbox Case', price: '8.40' }),
  MakeCase({ name: 'wasteland-case', displayName: 'Wasteland Case', price: '10.50' }),
  MakeCase({ name: 'lovely-case', displayName: 'Lovely Case', price: '12.60', banner: `${MEDIA_BASE}24.png` }),
  MakeCase({ name: 'steampunk-case', displayName: 'Steampunk Case', price: '12.60' }),
  MakeCase({ name: 'autumn-case', displayName: 'Autumn Case', price: '16.76' }),
  MakeCase({ name: 'giga-bula-case', displayName: 'GigaBuła Case', price: '16.80' }),
  MakeCase({ name: 'slime-case', displayName: 'Slime Case', price: '16.80' }),
  MakeCase({ name: 'striking-ninja-case', displayName: 'Striking Ninja Case', price: '16.80' }),
];

function GetCaseByName(Name) {
  return Cases.find((c) => c.name === Name);
}

export { Cases, GetCaseByName };
export default Cases;
