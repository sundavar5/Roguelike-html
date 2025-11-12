// Dungeons of Eldoria - Medieval Roguelike Game
// Main Game Engine

// ============================================================================
// CONSTANTS & CONFIGURATION
// ============================================================================

const TILE_SIZE = 32;
const WORLD_WIDTH = 120;
const WORLD_HEIGHT = 80;
const VISION_RANGE = 8;

const TILE_TYPES = {
    VOID: 0,
    GRASS: 1,
    WATER: 2,
    TREE: 3,
    MOUNTAIN: 4,
    SAND: 5,
    STONE: 6,
    TOWN: 7,
    SHOP: 8,
    SHRINE: 9,
    TREASURE: 10,
    DUNGEON_ENTRANCE: 11,
    ROAD: 12,
    BRIDGE: 13,
    CAVE: 14,
    RUINS: 15
};

const BIOME_TYPES = {
    PLAINS: 'plains',
    FOREST: 'forest',
    MOUNTAINS: 'mountains',
    DESERT: 'desert',
    SWAMP: 'swamp',
    TUNDRA: 'tundra',
    DARK_FOREST: 'dark_forest'
};

const RARITY = {
    COMMON: 'common',
    UNCOMMON: 'uncommon',
    RARE: 'rare',
    EPIC: 'epic',
    LEGENDARY: 'legendary'
};

const ITEM_TYPES = {
    WEAPON: 'weapon',
    ARMOR: 'armor',
    SHIELD: 'shield',
    RING: 'ring',
    AMULET: 'amulet',
    POTION: 'potion',
    SCROLL: 'scroll',
    CONSUMABLE: 'consumable'
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(array) {
    return array[random(0, array.length - 1)];
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// ============================================================================
// ITEM TEMPLATES
// ============================================================================

const ITEM_TEMPLATES = {
    // Weapons
    rusty_sword: {
        name: 'Rusty Sword',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.COMMON,
        icon: '🗡️',
        stats: { str: 3, damage: 5 },
        value: 10
    },
    iron_sword: {
        name: 'Iron Sword',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.UNCOMMON,
        icon: '⚔️',
        stats: { str: 5, damage: 10 },
        value: 50
    },
    steel_greatsword: {
        name: 'Steel Greatsword',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.RARE,
        icon: '⚔️',
        stats: { str: 10, damage: 18 },
        value: 150
    },
    dagger: {
        name: 'Dagger',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.COMMON,
        icon: '🗡️',
        stats: { agi: 3, damage: 4, crit: 5 },
        value: 15
    },
    assassin_blade: {
        name: 'Assassin\'s Blade',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.EPIC,
        icon: '🗡️',
        stats: { agi: 12, damage: 15, crit: 15 },
        value: 300
    },
    wooden_staff: {
        name: 'Wooden Staff',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.COMMON,
        icon: '🪄',
        stats: { mag: 5, mana: 10 },
        value: 20
    },
    arcane_staff: {
        name: 'Arcane Staff',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.RARE,
        icon: '🔮',
        stats: { mag: 15, mana: 30, damage: 8 },
        value: 200
    },
    dragon_slayer: {
        name: 'Dragon Slayer',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.LEGENDARY,
        icon: '⚔️',
        stats: { str: 20, damage: 35, crit: 10 },
        value: 1000
    },

    // Armor
    leather_armor: {
        name: 'Leather Armor',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.COMMON,
        icon: '🦺',
        stats: { def: 3, hp: 10 },
        value: 25
    },
    chainmail: {
        name: 'Chainmail',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.UNCOMMON,
        icon: '🛡️',
        stats: { def: 7, hp: 20 },
        value: 75
    },
    plate_armor: {
        name: 'Plate Armor',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.RARE,
        icon: '🛡️',
        stats: { def: 15, hp: 40 },
        value: 250
    },
    dragon_armor: {
        name: 'Dragon Scale Armor',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.LEGENDARY,
        icon: '🛡️',
        stats: { def: 25, hp: 80, str: 5 },
        value: 1500
    },

    // Shields
    wooden_shield: {
        name: 'Wooden Shield',
        type: ITEM_TYPES.SHIELD,
        rarity: RARITY.COMMON,
        icon: '🔰',
        stats: { def: 2 },
        value: 15
    },
    iron_shield: {
        name: 'Iron Shield',
        type: ITEM_TYPES.SHIELD,
        rarity: RARITY.UNCOMMON,
        icon: '🛡️',
        stats: { def: 5, hp: 10 },
        value: 60
    },
    tower_shield: {
        name: 'Tower Shield',
        type: ITEM_TYPES.SHIELD,
        rarity: RARITY.RARE,
        icon: '🛡️',
        stats: { def: 12, hp: 25 },
        value: 200
    },

    // Rings
    ring_of_strength: {
        name: 'Ring of Strength',
        type: ITEM_TYPES.RING,
        rarity: RARITY.UNCOMMON,
        icon: '💍',
        stats: { str: 5 },
        value: 100
    },
    ring_of_agility: {
        name: 'Ring of Agility',
        type: ITEM_TYPES.RING,
        rarity: RARITY.UNCOMMON,
        icon: '💍',
        stats: { agi: 5 },
        value: 100
    },
    ring_of_power: {
        name: 'Ring of Power',
        type: ITEM_TYPES.RING,
        rarity: RARITY.EPIC,
        icon: '💍',
        stats: { str: 8, mag: 8 },
        value: 300
    },
    vampiric_ring: {
        name: 'Vampiric Ring',
        type: ITEM_TYPES.RING,
        rarity: RARITY.LEGENDARY,
        icon: '💍',
        stats: { str: 10, lifesteal: 15 },
        value: 800
    },

    // Amulets
    amulet_of_health: {
        name: 'Amulet of Health',
        type: ITEM_TYPES.AMULET,
        rarity: RARITY.UNCOMMON,
        icon: '📿',
        stats: { hp: 30 },
        value: 80
    },
    amulet_of_mana: {
        name: 'Amulet of Mana',
        type: ITEM_TYPES.AMULET,
        rarity: RARITY.UNCOMMON,
        icon: '📿',
        stats: { mana: 40 },
        value: 80
    },
    phoenix_pendant: {
        name: 'Phoenix Pendant',
        type: ITEM_TYPES.AMULET,
        rarity: RARITY.LEGENDARY,
        icon: '📿',
        stats: { hp: 50, revive: 1 },
        value: 1000
    },

    // Potions
    health_potion: {
        name: 'Health Potion',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.COMMON,
        icon: '🧪',
        effect: { heal: 30 },
        value: 25,
        stackable: true
    },
    greater_health_potion: {
        name: 'Greater Health Potion',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.UNCOMMON,
        icon: '🧪',
        effect: { heal: 60 },
        value: 60,
        stackable: true
    },
    mana_potion: {
        name: 'Mana Potion',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.COMMON,
        icon: '🧪',
        effect: { mana: 25 },
        value: 25,
        stackable: true
    },
    elixir_of_strength: {
        name: 'Elixir of Strength',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.RARE,
        icon: '🧪',
        effect: { buff_str: 5, duration: 10 },
        value: 100,
        stackable: true
    },

    // Scrolls
    scroll_fireball: {
        name: 'Scroll of Fireball',
        type: ITEM_TYPES.SCROLL,
        rarity: RARITY.UNCOMMON,
        icon: '📜',
        effect: { damage: 40, aoe: true },
        value: 75,
        stackable: true
    },
    scroll_teleport: {
        name: 'Scroll of Teleport',
        type: ITEM_TYPES.SCROLL,
        rarity: RARITY.RARE,
        icon: '📜',
        effect: { teleport: true },
        value: 150,
        stackable: true
    },
    scroll_identify: {
        name: 'Scroll of Identify',
        type: ITEM_TYPES.SCROLL,
        rarity: RARITY.COMMON,
        icon: '📜',
        effect: { identify: true },
        value: 50,
        stackable: true
    },

    // === EXPANDED WEAPON ARSENAL ===
    // Bows
    short_bow: {
        name: 'Short Bow',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.COMMON,
        icon: '🏹',
        stats: { agi: 3, damage: 6, crit: 3 },
        value: 30
    },
    longbow: {
        name: 'Longbow',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.UNCOMMON,
        icon: '🏹',
        stats: { agi: 6, damage: 12, crit: 5 },
        value: 90
    },
    elven_bow: {
        name: 'Elven Bow',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.RARE,
        icon: '🏹',
        stats: { agi: 12, damage: 18, crit: 10 },
        value: 280
    },

    // Spears
    wooden_spear: {
        name: 'Wooden Spear',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.COMMON,
        icon: '🔱',
        stats: { str: 4, agi: 2, damage: 7 },
        value: 25
    },
    iron_spear: {
        name: 'Iron Spear',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.UNCOMMON,
        icon: '🔱',
        stats: { str: 7, agi: 4, damage: 13 },
        value: 70
    },
    trident_of_the_sea: {
        name: 'Trident of the Sea',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.EPIC,
        icon: '🔱',
        stats: { str: 14, agi: 8, damage: 22, mana: 20 },
        value: 450
    },

    // Axes
    hand_axe: {
        name: 'Hand Axe',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.COMMON,
        icon: '🪓',
        stats: { str: 5, damage: 8 },
        value: 35
    },
    battle_axe: {
        name: 'Battle Axe',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.UNCOMMON,
        icon: '🪓',
        stats: { str: 9, damage: 16 },
        value: 95
    },
    executioners_axe: {
        name: 'Executioner\'s Axe',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.RARE,
        icon: '🪓',
        stats: { str: 15, damage: 25, crit: 8 },
        value: 320
    },

    // Hammers
    war_hammer: {
        name: 'War Hammer',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.UNCOMMON,
        icon: '🔨',
        stats: { str: 10, def: 3, damage: 14 },
        value: 85
    },
    thunder_hammer: {
        name: 'Thunder Hammer',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.EPIC,
        icon: '🔨',
        stats: { str: 16, mag: 8, damage: 23 },
        value: 500
    },

    // Mage Weapons
    apprentice_wand: {
        name: 'Apprentice Wand',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.COMMON,
        icon: '🪄',
        stats: { mag: 3, mana: 5, damage: 3 },
        value: 15
    },
    crystal_wand: {
        name: 'Crystal Wand',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.UNCOMMON,
        icon: '🪄',
        stats: { mag: 8, mana: 15, damage: 6 },
        value: 65
    },
    scepter_of_flames: {
        name: 'Scepter of Flames',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.RARE,
        icon: '🔮',
        stats: { mag: 13, mana: 25, damage: 12 },
        value: 220
    },
    staff_of_eternity: {
        name: 'Staff of Eternity',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.LEGENDARY,
        icon: '🔮',
        stats: { mag: 22, mana: 60, damage: 20, crit: 12 },
        value: 1200
    },

    // Daggers & Assassin Weapons
    throwing_knife: {
        name: 'Throwing Knife',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.COMMON,
        icon: '🔪',
        stats: { agi: 2, damage: 3, crit: 4 },
        value: 12
    },
    poison_dagger: {
        name: 'Poison Dagger',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.RARE,
        icon: '🗡️',
        stats: { agi: 10, damage: 11, crit: 12 },
        value: 190
    },
    shadow_blade: {
        name: 'Shadow Blade',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.EPIC,
        icon: '🗡️',
        stats: { agi: 16, damage: 18, crit: 20 },
        value: 550
    },

    // === EXPANDED ARMOR COLLECTION ===
    // Light Armor
    cloth_robe: {
        name: 'Cloth Robe',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.COMMON,
        icon: '👘',
        stats: { def: 2, mana: 10 },
        value: 18
    },
    mystic_robe: {
        name: 'Mystic Robe',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.UNCOMMON,
        icon: '👘',
        stats: { def: 4, mag: 5, mana: 20 },
        value: 65
    },
    archmage_robes: {
        name: 'Archmage Robes',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.RARE,
        icon: '👘',
        stats: { def: 8, mag: 12, mana: 40 },
        value: 240
    },
    celestial_vestments: {
        name: 'Celestial Vestments',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.LEGENDARY,
        icon: '👘',
        stats: { def: 18, mag: 20, mana: 80, hp: 30 },
        value: 1400
    },

    // Medium Armor
    hide_armor: {
        name: 'Hide Armor',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.COMMON,
        icon: '🦺',
        stats: { def: 4, agi: 2, hp: 15 },
        value: 30
    },
    studded_leather: {
        name: 'Studded Leather',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.UNCOMMON,
        icon: '🦺',
        stats: { def: 6, agi: 4, hp: 25 },
        value: 80
    },
    ranger_armor: {
        name: 'Ranger Armor',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.RARE,
        icon: '🦺',
        stats: { def: 10, agi: 8, hp: 35, crit: 5 },
        value: 260
    },

    // Heavy Armor
    bronze_armor: {
        name: 'Bronze Armor',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.COMMON,
        icon: '🛡️',
        stats: { def: 6, hp: 20 },
        value: 45
    },
    steel_armor: {
        name: 'Steel Armor',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.UNCOMMON,
        icon: '🛡️',
        stats: { def: 10, hp: 35 },
        value: 110
    },
    knights_armor: {
        name: 'Knight\'s Armor',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.RARE,
        icon: '🛡️',
        stats: { def: 18, hp: 55, str: 3 },
        value: 300
    },
    titan_plate: {
        name: 'Titan Plate',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.EPIC,
        icon: '🛡️',
        stats: { def: 24, hp: 90, str: 8 },
        value: 700
    },
    godsteel_armor: {
        name: 'Godsteel Armor',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.LEGENDARY,
        icon: '🛡️',
        stats: { def: 30, hp: 120, str: 12, mag: 5 },
        value: 1800
    },

    // === EXPANDED SHIELDS ===
    buckler: {
        name: 'Buckler',
        type: ITEM_TYPES.SHIELD,
        rarity: RARITY.COMMON,
        icon: '🔰',
        stats: { def: 3, agi: 1 },
        value: 20
    },
    steel_shield: {
        name: 'Steel Shield',
        type: ITEM_TYPES.SHIELD,
        rarity: RARITY.UNCOMMON,
        icon: '🛡️',
        stats: { def: 7, hp: 15 },
        value: 75
    },
    kite_shield: {
        name: 'Kite Shield',
        type: ITEM_TYPES.SHIELD,
        rarity: RARITY.RARE,
        icon: '🛡️',
        stats: { def: 10, hp: 30, str: 2 },
        value: 180
    },
    aegis: {
        name: 'Aegis',
        type: ITEM_TYPES.SHIELD,
        rarity: RARITY.LEGENDARY,
        icon: '🛡️',
        stats: { def: 20, hp: 60, mag: 8 },
        value: 1100
    },

    // === EXPANDED RINGS ===
    ring_of_defense: {
        name: 'Ring of Defense',
        type: ITEM_TYPES.RING,
        rarity: RARITY.UNCOMMON,
        icon: '💍',
        stats: { def: 5 },
        value: 100
    },
    ring_of_magic: {
        name: 'Ring of Magic',
        type: ITEM_TYPES.RING,
        rarity: RARITY.UNCOMMON,
        icon: '💍',
        stats: { mag: 5, mana: 15 },
        value: 105
    },
    ring_of_the_bear: {
        name: 'Ring of the Bear',
        type: ITEM_TYPES.RING,
        rarity: RARITY.RARE,
        icon: '💍',
        stats: { str: 6, hp: 25 },
        value: 180
    },
    ring_of_the_falcon: {
        name: 'Ring of the Falcon',
        type: ITEM_TYPES.RING,
        rarity: RARITY.RARE,
        icon: '💍',
        stats: { agi: 8, crit: 5 },
        value: 190
    },
    ring_of_regeneration: {
        name: 'Ring of Regeneration',
        type: ITEM_TYPES.RING,
        rarity: RARITY.EPIC,
        icon: '💍',
        stats: { hp: 40, regen: 2 },
        value: 350
    },
    ring_of_shadows: {
        name: 'Ring of Shadows',
        type: ITEM_TYPES.RING,
        rarity: RARITY.EPIC,
        icon: '💍',
        stats: { agi: 10, crit: 12 },
        value: 400
    },
    ring_of_the_archmage: {
        name: 'Ring of the Archmage',
        type: ITEM_TYPES.RING,
        rarity: RARITY.LEGENDARY,
        icon: '💍',
        stats: { mag: 15, mana: 50 },
        value: 900
    },
    ring_of_eternity: {
        name: 'Ring of Eternity',
        type: ITEM_TYPES.RING,
        rarity: RARITY.LEGENDARY,
        icon: '💍',
        stats: { str: 10, agi: 10, mag: 10, def: 10 },
        value: 1500
    },

    // === EXPANDED AMULETS ===
    simple_amulet: {
        name: 'Simple Amulet',
        type: ITEM_TYPES.AMULET,
        rarity: RARITY.COMMON,
        icon: '📿',
        stats: { hp: 10 },
        value: 25
    },
    amulet_of_protection: {
        name: 'Amulet of Protection',
        type: ITEM_TYPES.AMULET,
        rarity: RARITY.UNCOMMON,
        icon: '📿',
        stats: { def: 5, hp: 20 },
        value: 90
    },
    amulet_of_power: {
        name: 'Amulet of Power',
        type: ITEM_TYPES.AMULET,
        rarity: RARITY.RARE,
        icon: '📿',
        stats: { str: 8, damage: 5 },
        value: 170
    },
    amulet_of_wisdom: {
        name: 'Amulet of Wisdom',
        type: ITEM_TYPES.AMULET,
        rarity: RARITY.RARE,
        icon: '📿',
        stats: { mag: 10, mana: 30 },
        value: 180
    },
    dragon_tooth_necklace: {
        name: 'Dragon Tooth Necklace',
        type: ITEM_TYPES.AMULET,
        rarity: RARITY.EPIC,
        icon: '📿',
        stats: { str: 12, hp: 40, crit: 8 },
        value: 480
    },
    amulet_of_the_void: {
        name: 'Amulet of the Void',
        type: ITEM_TYPES.AMULET,
        rarity: RARITY.EPIC,
        icon: '📿',
        stats: { mag: 15, mana: 50, damage: 10 },
        value: 520
    },
    heart_of_the_mountain: {
        name: 'Heart of the Mountain',
        type: ITEM_TYPES.AMULET,
        rarity: RARITY.LEGENDARY,
        icon: '📿',
        stats: { def: 15, hp: 80, str: 10 },
        value: 1100
    },
    star_of_azura: {
        name: 'Star of Azura',
        type: ITEM_TYPES.AMULET,
        rarity: RARITY.LEGENDARY,
        icon: '📿',
        stats: { mag: 20, mana: 80, allstats: 5 },
        value: 1600
    },

    // === EXPANDED POTIONS ===
    minor_health_potion: {
        name: 'Minor Health Potion',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.COMMON,
        icon: '🧪',
        effect: { heal: 15 },
        value: 12,
        stackable: true
    },
    superior_health_potion: {
        name: 'Superior Health Potion',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.RARE,
        icon: '🧪',
        effect: { heal: 100 },
        value: 120,
        stackable: true
    },
    ultimate_health_potion: {
        name: 'Ultimate Health Potion',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.EPIC,
        icon: '🧪',
        effect: { heal: 200 },
        value: 250,
        stackable: true
    },
    minor_mana_potion: {
        name: 'Minor Mana Potion',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.COMMON,
        icon: '🧪',
        effect: { mana: 15 },
        value: 15,
        stackable: true
    },
    greater_mana_potion: {
        name: 'Greater Mana Potion',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.UNCOMMON,
        icon: '🧪',
        effect: { mana: 40 },
        value: 50,
        stackable: true
    },
    supreme_mana_potion: {
        name: 'Supreme Mana Potion',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.RARE,
        icon: '🧪',
        effect: { mana: 80 },
        value: 110,
        stackable: true
    },
    elixir_of_agility: {
        name: 'Elixir of Agility',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.RARE,
        icon: '🧪',
        effect: { buff_agi: 5, duration: 10 },
        value: 100,
        stackable: true
    },
    elixir_of_defense: {
        name: 'Elixir of Defense',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.RARE,
        icon: '🧪',
        effect: { buff_def: 5, duration: 10 },
        value: 100,
        stackable: true
    },
    elixir_of_magic: {
        name: 'Elixir of Magic',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.RARE,
        icon: '🧪',
        effect: { buff_mag: 5, duration: 10 },
        value: 100,
        stackable: true
    },
    potion_of_regeneration: {
        name: 'Potion of Regeneration',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.UNCOMMON,
        icon: '🧪',
        effect: { regen: 5, duration: 20 },
        value: 80,
        stackable: true
    },
    potion_of_swiftness: {
        name: 'Potion of Swiftness',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.UNCOMMON,
        icon: '🧪',
        effect: { buff_agi: 8, duration: 15 },
        value: 90,
        stackable: true
    },
    potion_of_iron_skin: {
        name: 'Potion of Iron Skin',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.RARE,
        icon: '🧪',
        effect: { buff_def: 10, duration: 20 },
        value: 140,
        stackable: true
    },
    potion_of_giants: {
        name: 'Potion of Giants',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.EPIC,
        icon: '🧪',
        effect: { buff_str: 10, buff_hp: 50, duration: 15 },
        value: 220,
        stackable: true
    },
    potion_of_invisibility: {
        name: 'Potion of Invisibility',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.EPIC,
        icon: '🧪',
        effect: { invisible: true, duration: 10 },
        value: 280,
        stackable: true
    },
    elixir_of_life: {
        name: 'Elixir of Life',
        type: ITEM_TYPES.POTION,
        rarity: RARITY.LEGENDARY,
        icon: '🧪',
        effect: { heal: 300, buff_all: 5, duration: 30 },
        value: 500,
        stackable: true
    },

    // === EXPANDED SCROLLS ===
    scroll_lightning: {
        name: 'Scroll of Lightning',
        type: ITEM_TYPES.SCROLL,
        rarity: RARITY.UNCOMMON,
        icon: '📜',
        effect: { damage: 35, chain: 3 },
        value: 70,
        stackable: true
    },
    scroll_ice_storm: {
        name: 'Scroll of Ice Storm',
        type: ITEM_TYPES.SCROLL,
        rarity: RARITY.RARE,
        icon: '📜',
        effect: { damage: 50, aoe: true, slow: true },
        value: 130,
        stackable: true
    },
    scroll_meteor: {
        name: 'Scroll of Meteor',
        type: ITEM_TYPES.SCROLL,
        rarity: RARITY.EPIC,
        icon: '📜',
        effect: { damage: 80, aoe: true },
        value: 250,
        stackable: true
    },
    scroll_healing: {
        name: 'Scroll of Healing',
        type: ITEM_TYPES.SCROLL,
        rarity: RARITY.UNCOMMON,
        icon: '📜',
        effect: { heal: 50 },
        value: 60,
        stackable: true
    },
    scroll_protection: {
        name: 'Scroll of Protection',
        type: ITEM_TYPES.SCROLL,
        rarity: RARITY.RARE,
        icon: '📜',
        effect: { buff_def: 15, duration: 10 },
        value: 110,
        stackable: true
    },
    scroll_town_portal: {
        name: 'Scroll of Town Portal',
        type: ITEM_TYPES.SCROLL,
        rarity: RARITY.RARE,
        icon: '📜',
        effect: { teleport_town: true },
        value: 100,
        stackable: true
    },
    scroll_summon: {
        name: 'Scroll of Summoning',
        type: ITEM_TYPES.SCROLL,
        rarity: RARITY.EPIC,
        icon: '📜',
        effect: { summon: true, duration: 20 },
        value: 200,
        stackable: true
    },
    scroll_resurrection: {
        name: 'Scroll of Resurrection',
        type: ITEM_TYPES.SCROLL,
        rarity: RARITY.LEGENDARY,
        icon: '📜',
        effect: { revive: true },
        value: 800,
        stackable: true
    },

    // === CRAFTING MATERIALS ===
    iron_ore: {
        name: 'Iron Ore',
        type: 'material',
        rarity: RARITY.COMMON,
        icon: '⛏️',
        value: 5,
        stackable: true
    },
    steel_ingot: {
        name: 'Steel Ingot',
        type: 'material',
        rarity: RARITY.UNCOMMON,
        icon: '⚙️',
        value: 20,
        stackable: true
    },
    mithril_ore: {
        name: 'Mithril Ore',
        type: 'material',
        rarity: RARITY.RARE,
        icon: '💎',
        value: 80,
        stackable: true
    },
    dragon_scale: {
        name: 'Dragon Scale',
        type: 'material',
        rarity: RARITY.EPIC,
        icon: '🐉',
        value: 200,
        stackable: true
    },
    leather: {
        name: 'Leather',
        type: 'material',
        rarity: RARITY.COMMON,
        icon: '🦴',
        value: 8,
        stackable: true
    },
    hardened_leather: {
        name: 'Hardened Leather',
        type: 'material',
        rarity: RARITY.UNCOMMON,
        icon: '🦴',
        value: 25,
        stackable: true
    },
    thread: {
        name: 'Thread',
        type: 'material',
        rarity: RARITY.COMMON,
        icon: '🧵',
        value: 3,
        stackable: true
    },
    silk: {
        name: 'Silk',
        type: 'material',
        rarity: RARITY.UNCOMMON,
        icon: '🧵',
        value: 15,
        stackable: true
    },
    wood: {
        name: 'Wood',
        type: 'material',
        rarity: RARITY.COMMON,
        icon: '🪵',
        value: 4,
        stackable: true
    },
    ironwood: {
        name: 'Ironwood',
        type: ITEM_TYPES.COMMON,
        rarity: RARITY.UNCOMMON,
        icon: '🪵',
        value: 18,
        stackable: true
    },
    crystal_shard: {
        name: 'Crystal Shard',
        type: 'material',
        rarity: RARITY.UNCOMMON,
        icon: '💎',
        value: 30,
        stackable: true
    },
    magic_essence: {
        name: 'Magic Essence',
        type: 'material',
        rarity: RARITY.RARE,
        icon: '✨',
        value: 50,
        stackable: true
    },
    soul_gem: {
        name: 'Soul Gem',
        type: 'material',
        rarity: RARITY.EPIC,
        icon: '💎',
        value: 150,
        stackable: true
    },
    phoenix_feather: {
        name: 'Phoenix Feather',
        type: 'material',
        rarity: RARITY.LEGENDARY,
        icon: '🪶',
        value: 400,
        stackable: true
    },

    // === FOOD ITEMS ===
    bread: {
        name: 'Bread',
        type: 'food',
        rarity: RARITY.COMMON,
        icon: '🍞',
        effect: { heal: 10 },
        value: 5,
        stackable: true
    },
    cheese: {
        name: 'Cheese',
        type: 'food',
        rarity: RARITY.COMMON,
        icon: '🧀',
        effect: { heal: 12 },
        value: 6,
        stackable: true
    },
    apple: {
        name: 'Apple',
        type: 'food',
        rarity: RARITY.COMMON,
        icon: '🍎',
        effect: { heal: 8 },
        value: 3,
        stackable: true
    },
    meat: {
        name: 'Cooked Meat',
        type: 'food',
        rarity: RARITY.COMMON,
        icon: '🍖',
        effect: { heal: 20, buff_str: 1, duration: 5 },
        value: 12,
        stackable: true
    },
    fish: {
        name: 'Cooked Fish',
        type: 'food',
        rarity: RARITY.COMMON,
        icon: '🐟',
        effect: { heal: 18, buff_agi: 1, duration: 5 },
        value: 10,
        stackable: true
    },
    mushroom_stew: {
        name: 'Mushroom Stew',
        type: 'food',
        rarity: RARITY.UNCOMMON,
        icon: '🍄',
        effect: { heal: 25, mana: 15 },
        value: 20,
        stackable: true
    },

    // === UNIQUE LEGENDARY ITEMS ===
    excalibur: {
        name: 'Excalibur',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.LEGENDARY,
        icon: '⚔️',
        stats: { str: 25, damage: 40, crit: 15, allstats: 5 },
        value: 2000
    },
    shadowmourne: {
        name: 'Shadowmourne',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.LEGENDARY,
        icon: '⚔️',
        stats: { str: 22, agi: 10, damage: 38, lifesteal: 20 },
        value: 1800
    },
    frostmourne: {
        name: 'Frostmourne',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.LEGENDARY,
        icon: '⚔️',
        stats: { str: 20, mag: 15, damage: 36, mana: 40 },
        value: 1700
    },
    infinity_bow: {
        name: 'Infinity Bow',
        type: ITEM_TYPES.WEAPON,
        rarity: RARITY.LEGENDARY,
        icon: '🏹',
        stats: { agi: 25, damage: 35, crit: 25 },
        value: 1900
    },
    demon_armor: {
        name: 'Demon Plate',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.LEGENDARY,
        icon: '🛡️',
        stats: { def: 28, hp: 100, str: 15, lifesteal: 10 },
        value: 2200
    },
    angels_grace: {
        name: 'Angel\'s Grace',
        type: ITEM_TYPES.ARMOR,
        rarity: RARITY.LEGENDARY,
        icon: '👘',
        stats: { def: 20, mag: 25, mana: 100, regen: 5 },
        value: 2100
    }
};

// ============================================================================
// ENEMY TEMPLATES
// ============================================================================

const ENEMY_TEMPLATES = {
    // Plains enemies
    slime: {
        name: 'Slime',
        icon: '💧',
        level: 1,
        hp: 12,
        damage: 2,
        defense: 1,
        agility: 3,
        xp: 8,
        gold: 5,
        biome: BIOME_TYPES.PLAINS
    },
    boar: {
        name: 'Wild Boar',
        icon: '🐗',
        level: 2,
        hp: 25,
        damage: 6,
        defense: 4,
        agility: 5,
        xp: 15,
        gold: 10,
        biome: BIOME_TYPES.PLAINS
    },
    goblin: {
        name: 'Goblin Scout',
        icon: '👺',
        level: 2,
        hp: 20,
        damage: 5,
        defense: 3,
        agility: 7,
        xp: 20,
        gold: 15,
        biome: BIOME_TYPES.PLAINS
    },

    // Forest enemies
    wolf: {
        name: 'Grey Wolf',
        icon: '🐺',
        level: 3,
        hp: 30,
        damage: 8,
        defense: 3,
        agility: 9,
        xp: 25,
        gold: 12,
        biome: BIOME_TYPES.FOREST
    },
    bandit: {
        name: 'Forest Bandit',
        icon: '🏹',
        level: 3,
        hp: 35,
        damage: 10,
        defense: 5,
        agility: 8,
        xp: 30,
        gold: 35,
        biome: BIOME_TYPES.FOREST
    },
    treant: {
        name: 'Treant',
        icon: '🌲',
        level: 4,
        hp: 50,
        damage: 12,
        defense: 10,
        agility: 2,
        xp: 40,
        gold: 25,
        biome: BIOME_TYPES.FOREST
    },

    // Mountain enemies
    harpy: {
        name: 'Harpy',
        icon: '🦅',
        level: 4,
        hp: 35,
        damage: 12,
        defense: 4,
        agility: 12,
        xp: 45,
        gold: 30,
        biome: BIOME_TYPES.MOUNTAINS
    },
    stone_golem: {
        name: 'Stone Golem',
        icon: '🗿',
        level: 5,
        hp: 70,
        damage: 15,
        defense: 15,
        agility: 3,
        xp: 60,
        gold: 50,
        biome: BIOME_TYPES.MOUNTAINS
    },
    griffin: {
        name: 'Griffin',
        icon: '🦅',
        level: 6,
        hp: 60,
        damage: 18,
        defense: 8,
        agility: 11,
        xp: 80,
        gold: 70,
        biome: BIOME_TYPES.MOUNTAINS
    },

    // Desert enemies
    scorpion: {
        name: 'Giant Scorpion',
        icon: '🦂',
        level: 3,
        hp: 28,
        damage: 9,
        defense: 6,
        agility: 6,
        xp: 28,
        gold: 20,
        biome: BIOME_TYPES.DESERT
    },
    mummy: {
        name: 'Mummy',
        icon: '🧟',
        level: 5,
        hp: 45,
        damage: 14,
        defense: 7,
        agility: 4,
        xp: 55,
        gold: 45,
        biome: BIOME_TYPES.DESERT
    },
    sand_worm: {
        name: 'Sand Worm',
        icon: '🪱',
        level: 6,
        hp: 80,
        damage: 20,
        defense: 10,
        agility: 5,
        xp: 90,
        gold: 60,
        biome: BIOME_TYPES.DESERT
    },

    // Dark Forest enemies
    skeleton: {
        name: 'Skeleton Warrior',
        icon: '💀',
        level: 4,
        hp: 35,
        damage: 11,
        defense: 5,
        agility: 6,
        xp: 40,
        gold: 30,
        biome: BIOME_TYPES.DARK_FOREST
    },
    wraith: {
        name: 'Wraith',
        icon: '👻',
        level: 6,
        hp: 50,
        damage: 18,
        defense: 4,
        agility: 10,
        xp: 75,
        gold: 65,
        biome: BIOME_TYPES.DARK_FOREST,
        special: 'phase'
    },
    dark_knight: {
        name: 'Dark Knight',
        icon: '⚔️',
        level: 7,
        hp: 90,
        damage: 24,
        defense: 16,
        agility: 7,
        xp: 110,
        gold: 100,
        biome: BIOME_TYPES.DARK_FOREST
    },
    necromancer: {
        name: 'Necromancer',
        icon: '🧙',
        level: 8,
        hp: 70,
        damage: 28,
        defense: 8,
        agility: 6,
        xp: 140,
        gold: 120,
        biome: BIOME_TYPES.DARK_FOREST,
        special: 'summon'
    },

    // === MORE PLAINS ENEMIES ===
    giant_rat: {
        name: 'Giant Rat',
        icon: '🐀',
        level: 1,
        hp: 15,
        damage: 3,
        defense: 2,
        agility: 6,
        xp: 10,
        gold: 7,
        biome: BIOME_TYPES.PLAINS
    },
    kobold: {
        name: 'Kobold',
        icon: '👹',
        level: 2,
        hp: 22,
        damage: 5,
        defense: 4,
        agility: 6,
        xp: 18,
        gold: 12,
        biome: BIOME_TYPES.PLAINS
    },
    wild_dog: {
        name: 'Wild Dog',
        icon: '🐕',
        level: 2,
        hp: 20,
        damage: 7,
        defense: 3,
        agility: 8,
        xp: 16,
        gold: 10,
        biome: BIOME_TYPES.PLAINS
    },
    plains_troll: {
        name: 'Plains Troll',
        icon: '👹',
        level: 4,
        hp: 60,
        damage: 14,
        defense: 8,
        agility: 4,
        xp: 50,
        gold: 40,
        biome: BIOME_TYPES.PLAINS
    },

    // === MORE FOREST ENEMIES ===
    giant_spider: {
        name: 'Giant Spider',
        icon: '🕷️',
        level: 3,
        hp: 28,
        damage: 9,
        defense: 4,
        agility: 10,
        xp: 28,
        gold: 18,
        biome: BIOME_TYPES.FOREST,
        special: 'poison'
    },
    forest_ogre: {
        name: 'Forest Ogre',
        icon: '👹',
        level: 5,
        hp: 65,
        damage: 16,
        defense: 9,
        agility: 4,
        xp: 55,
        gold: 45,
        biome: BIOME_TYPES.FOREST
    },
    dryad: {
        name: 'Evil Dryad',
        icon: '🧚',
        level: 4,
        hp: 40,
        damage: 11,
        defense: 6,
        agility: 10,
        xp: 45,
        gold: 30,
        biome: BIOME_TYPES.FOREST,
        special: 'magic'
    },
    dire_wolf: {
        name: 'Dire Wolf',
        icon: '🐺',
        level: 5,
        hp: 50,
        damage: 15,
        defense: 6,
        agility: 12,
        xp: 60,
        gold: 35,
        biome: BIOME_TYPES.FOREST
    },
    forest_witch: {
        name: 'Forest Witch',
        icon: '🧙‍♀️',
        level: 6,
        hp: 45,
        damage: 18,
        defense: 5,
        agility: 8,
        xp: 75,
        gold: 60,
        biome: BIOME_TYPES.FOREST,
        special: 'curse'
    },

    // === MORE MOUNTAIN ENEMIES ===
    mountain_lion: {
        name: 'Mountain Lion',
        icon: '🦁',
        level: 4,
        hp: 40,
        damage: 13,
        defense: 5,
        agility: 13,
        xp: 48,
        gold: 32,
        biome: BIOME_TYPES.MOUNTAINS
    },
    rock_elemental: {
        name: 'Rock Elemental',
        icon: '🪨',
        level: 6,
        hp: 80,
        damage: 18,
        defense: 18,
        agility: 2,
        xp: 70,
        gold: 55,
        biome: BIOME_TYPES.MOUNTAINS
    },
    griffin: {
        name: 'Griffin',
        icon: '🦅',
        level: 7,
        hp: 75,
        damage: 22,
        defense: 10,
        agility: 15,
        xp: 90,
        gold: 70,
        biome: BIOME_TYPES.MOUNTAINS
    },
    frost_giant: {
        name: 'Frost Giant',
        icon: '❄️',
        level: 8,
        hp: 120,
        damage: 28,
        defense: 15,
        agility: 6,
        xp: 120,
        gold: 100,
        biome: BIOME_TYPES.MOUNTAINS,
        special: 'freeze'
    },
    wyvern: {
        name: 'Wyvern',
        icon: '🐉',
        level: 9,
        hp: 110,
        damage: 30,
        defense: 12,
        agility: 14,
        xp: 150,
        gold: 120,
        biome: BIOME_TYPES.MOUNTAINS,
        special: 'poison'
    },

    // === MORE DESERT ENEMIES ===
    sand_wurm: {
        name: 'Sand Wurm',
        icon: '🪱',
        level: 5,
        hp: 55,
        damage: 14,
        defense: 7,
        agility: 11,
        xp: 58,
        gold: 40,
        biome: BIOME_TYPES.DESERT
    },
    desert_raider: {
        name: 'Desert Raider',
        icon: '🏹',
        level: 5,
        hp: 50,
        damage: 16,
        defense: 8,
        agility: 10,
        xp: 60,
        gold: 50,
        biome: BIOME_TYPES.DESERT
    },
    dust_devil: {
        name: 'Dust Devil',
        icon: '🌪️',
        level: 6,
        hp: 40,
        damage: 17,
        defense: 3,
        agility: 18,
        xp: 65,
        gold: 45,
        biome: BIOME_TYPES.DESERT,
        special: 'whirlwind'
    },
    fire_scorpion: {
        name: 'Fire Scorpion',
        icon: '🦂',
        level: 7,
        hp: 65,
        damage: 20,
        defense: 12,
        agility: 9,
        xp: 80,
        gold: 65,
        biome: BIOME_TYPES.DESERT,
        special: 'burn'
    },
    sand_golem: {
        name: 'Sand Golem',
        icon: '🗿',
        level: 8,
        hp: 100,
        damage: 24,
        defense: 16,
        agility: 4,
        xp: 110,
        gold: 85,
        biome: BIOME_TYPES.DESERT
    },

    // === MORE DARK FOREST ENEMIES ===
    shadow_wolf: {
        name: 'Shadow Wolf',
        icon: '🐺',
        level: 7,
        hp: 70,
        damage: 20,
        defense: 8,
        agility: 14,
        xp: 85,
        gold: 65,
        biome: BIOME_TYPES.DARK_FOREST,
        special: 'shadow'
    },
    demon: {
        name: 'Lesser Demon',
        icon: '😈',
        level: 8,
        hp: 85,
        damage: 25,
        defense: 12,
        agility: 11,
        xp: 100,
        gold: 80,
        biome: BIOME_TYPES.DARK_FOREST,
        special: 'fire'
    },
    ghost: {
        name: 'Tormented Ghost',
        icon: '👻',
        level: 7,
        hp: 60,
        damage: 22,
        defense: 5,
        agility: 16,
        xp: 90,
        gold: 70,
        biome: BIOME_TYPES.DARK_FOREST,
        special: 'drain'
    },
    vampire: {
        name: 'Vampire',
        icon: '🧛',
        level: 9,
        hp: 95,
        damage: 28,
        defense: 10,
        agility: 15,
        xp: 130,
        gold: 110,
        biome: BIOME_TYPES.DARK_FOREST,
        special: 'lifesteal'
    },
    dark_knight: {
        name: 'Dark Knight',
        icon: '⚔️',
        level: 10,
        hp: 130,
        damage: 35,
        defense: 22,
        agility: 10,
        xp: 160,
        gold: 140,
        biome: BIOME_TYPES.DARK_FOREST,
        special: 'curse'
    },

    // === MORE SWAMP ENEMIES ===
    bog_troll: {
        name: 'Bog Troll',
        icon: '👹',
        level: 6,
        hp: 75,
        damage: 18,
        defense: 11,
        agility: 5,
        xp: 70,
        gold: 55,
        biome: BIOME_TYPES.SWAMP
    },
    swamp_serpent: {
        name: 'Swamp Serpent',
        icon: '🐍',
        level: 7,
        hp: 60,
        damage: 21,
        defense: 8,
        agility: 12,
        xp: 82,
        gold: 60,
        biome: BIOME_TYPES.SWAMP,
        special: 'poison'
    },
    rot_zombie: {
        name: 'Rot Zombie',
        icon: '🧟',
        level: 6,
        hp: 70,
        damage: 16,
        defense: 10,
        agility: 3,
        xp: 65,
        gold: 45,
        biome: BIOME_TYPES.SWAMP,
        special: 'plague'
    },
    swamp_witch: {
        name: 'Swamp Witch',
        icon: '🧙‍♀️',
        level: 8,
        hp: 65,
        damage: 24,
        defense: 8,
        agility: 10,
        xp: 95,
        gold: 75,
        biome: BIOME_TYPES.SWAMP,
        special: 'poison'
    },
    hydra: {
        name: 'Lesser Hydra',
        icon: '🐍',
        level: 9,
        hp: 110,
        damage: 27,
        defense: 13,
        agility: 8,
        xp: 135,
        gold: 100,
        biome: BIOME_TYPES.SWAMP,
        special: 'regenerate'
    },

    // === MORE TUNDRA ENEMIES ===
    snow_leopard: {
        name: 'Snow Leopard',
        icon: '🐆',
        level: 6,
        hp: 55,
        damage: 17,
        defense: 7,
        agility: 16,
        xp: 72,
        gold: 55,
        biome: BIOME_TYPES.TUNDRA
    },
    frost_wolf: {
        name: 'Frost Wolf',
        icon: '🐺',
        level: 7,
        hp: 68,
        damage: 19,
        defense: 9,
        agility: 13,
        xp: 85,
        gold: 65,
        biome: BIOME_TYPES.TUNDRA,
        special: 'freeze'
    },
    ice_troll: {
        name: 'Ice Troll',
        icon: '❄️',
        level: 8,
        hp: 95,
        damage: 23,
        defense: 14,
        agility: 5,
        xp: 105,
        gold: 80,
        biome: BIOME_TYPES.TUNDRA,
        special: 'freeze'
    },
    frost_drake: {
        name: 'Frost Drake',
        icon: '🐉',
        level: 10,
        hp: 125,
        damage: 32,
        defense: 16,
        agility: 11,
        xp: 155,
        gold: 130,
        biome: BIOME_TYPES.TUNDRA,
        special: 'breath'
    },

    // === BOSS MONSTERS ===
    dragon: {
        name: 'Ancient Dragon',
        icon: '🐉',
        level: 10,
        hp: 250,
        damage: 45,
        defense: 25,
        agility: 8,
        xp: 500,
        gold: 500,
        special: 'breath',
        boss: true
    },
    demon_lord: {
        name: 'Demon Lord',
        icon: '😈',
        level: 12,
        hp: 300,
        damage: 50,
        defense: 20,
        agility: 10,
        xp: 750,
        gold: 800,
        special: 'fire',
        boss: true
    },
    lich_king: {
        name: 'Lich King',
        icon: '💀',
        level: 13,
        hp: 280,
        damage: 55,
        defense: 18,
        agility: 9,
        xp: 850,
        gold: 900,
        special: 'necromancy',
        boss: true
    },
    titan: {
        name: 'Stone Titan',
        icon: '🗿',
        level: 14,
        hp: 400,
        damage: 60,
        defense: 35,
        agility: 5,
        xp: 1000,
        gold: 1000,
        special: 'earthquake',
        boss: true
    },
    phoenix: {
        name: 'Phoenix Lord',
        icon: '🔥',
        level: 15,
        hp: 320,
        damage: 65,
        defense: 22,
        agility: 18,
        xp: 1200,
        gold: 1200,
        special: 'rebirth',
        boss: true
    },
    kraken: {
        name: 'Kraken',
        icon: '🐙',
        level: 16,
        hp: 450,
        damage: 70,
        defense: 28,
        agility: 12,
        xp: 1500,
        gold: 1500,
        special: 'tentacles',
        boss: true
    },
    world_serpent: {
        name: 'World Serpent',
        icon: '🐍',
        level: 18,
        hp: 500,
        damage: 80,
        defense: 30,
        agility: 15,
        xp: 2000,
        gold: 2000,
        special: 'poison',
        boss: true
    },
    celestial_guardian: {
        name: 'Celestial Guardian',
        icon: '👼',
        level: 20,
        hp: 600,
        damage: 100,
        defense: 40,
        agility: 20,
        xp: 3000,
        gold: 3000,
        special: 'divine',
        boss: true
    }
};

// ============================================================================
// SKILL TEMPLATES
// ============================================================================

const SKILL_TEMPLATES = {
    // Warrior Skills
    power_strike: {
        name: 'Power Strike',
        icon: '💥',
        description: 'Devastating melee attack dealing 200% damage',
        manaCost: 10,
        cooldown: 3,
        class: 'warrior',
        effect: (game) => {
            const damage = game.player.calculateDamage() * 2;
            return { damage, message: 'unleashes a Power Strike!' };
        }
    },
    shield_bash: {
        name: 'Shield Bash',
        icon: '🛡️',
        description: 'Bash enemy with shield, dealing damage and stunning',
        manaCost: 15,
        cooldown: 4,
        class: 'warrior',
        effect: (game) => {
            const damage = game.player.stats.defense * 2;
            return { damage, stun: 1, message: 'bashes with their shield!' };
        }
    },
    berserker_rage: {
        name: 'Berserker Rage',
        icon: '😡',
        description: 'Enter rage mode: +50% damage, -25% defense for 5 turns',
        manaCost: 20,
        cooldown: 8,
        class: 'warrior',
        effect: (game) => {
            game.player.buffs.push({
                name: 'Berserker Rage',
                duration: 5,
                strMod: 1.5,
                defMod: 0.75
            });
            return { message: 'enters a berserker rage!' };
        }
    },
    cleave: {
        name: 'Cleave',
        icon: '⚔️',
        description: 'Powerful swing damaging nearby enemies',
        manaCost: 18,
        cooldown: 5,
        class: 'warrior',
        effect: (game) => {
            const damage = game.player.calculateDamage() * 1.5;
            return { damage, aoe: 2, message: 'cleaves in a wide arc!' };
        }
    },
    iron_wall: {
        name: 'Iron Wall',
        icon: '🛡️',
        description: 'Massive defense boost for 3 turns',
        manaCost: 15,
        cooldown: 7,
        class: 'warrior',
        effect: (game) => {
            game.player.buffs.push({
                name: 'Iron Wall',
                duration: 3,
                defMod: 2.0
            });
            return { message: 'becomes an iron wall!' };
        }
    },
    war_cry: {
        name: 'War Cry',
        icon: '📢',
        description: 'Intimidating shout reducing enemy damage by 30%',
        manaCost: 12,
        cooldown: 6,
        class: 'warrior',
        effect: (game) => {
            return { enemyDebuff: 'weakened', duration: 3, message: 'lets out a war cry!' };
        }
    },
    execute: {
        name: 'Execute',
        icon: '💀',
        description: 'Finishing blow dealing 300% damage to enemies below 30% HP',
        manaCost: 25,
        cooldown: 10,
        class: 'warrior',
        effect: (game) => {
            const enemyHpPercent = (game.currentEnemy.hp / game.currentEnemy.maxHp) * 100;
            const multiplier = enemyHpPercent < 30 ? 3 : 1.2;
            const damage = game.player.calculateDamage() * multiplier;
            return { damage, message: enemyHpPercent < 30 ? 'executes the enemy!' : 'strikes hard!' };
        }
    },
    whirlwind: {
        name: 'Whirlwind',
        icon: '🌪️',
        description: 'Spin attack hitting all nearby enemies',
        manaCost: 30,
        cooldown: 8,
        class: 'warrior',
        effect: (game) => {
            const damage = game.player.calculateDamage() * 1.3;
            return { damage, aoe: 3, message: 'spins in a deadly whirlwind!' };
        }
    },
    last_stand: {
        name: 'Last Stand',
        icon: '⚡',
        description: 'Survive fatal damage with 1 HP and gain massive buffs',
        manaCost: 50,
        cooldown: 15,
        class: 'warrior',
        effect: (game) => {
            game.player.buffs.push({
                name: 'Last Stand',
                duration: 5,
                strMod: 2.0,
                defMod: 1.5,
                lastStand: true
            });
            return { message: 'refuses to fall!' };
        }
    },

    // Rogue Skills
    backstab: {
        name: 'Backstab',
        icon: '🗡️',
        description: 'Sneak attack with guaranteed critical hit',
        manaCost: 15,
        cooldown: 4,
        class: 'rogue',
        effect: (game) => {
            const damage = game.player.calculateDamage() * 3;
            return { damage, crit: true, message: 'backstabs the enemy!' };
        }
    },
    shadow_step: {
        name: 'Shadow Step',
        icon: '👥',
        description: 'Become untargetable for 2 turns',
        manaCost: 20,
        cooldown: 6,
        class: 'rogue',
        effect: (game) => {
            game.player.buffs.push({
                name: 'Shadow Step',
                duration: 2,
                evasion: 100
            });
            return { message: 'steps into the shadows!' };
        }
    },
    poison_strike: {
        name: 'Poison Strike',
        icon: '☠️',
        description: 'Attack that poisons enemy for 10 damage per turn',
        manaCost: 12,
        cooldown: 5,
        class: 'rogue',
        effect: (game) => {
            const damage = game.player.calculateDamage();
            return { damage, poison: 10, poisonTurns: 5, message: 'strikes with poison!' };
        }
    },
    smoke_bomb: {
        name: 'Smoke Bomb',
        icon: '💨',
        description: 'Escape combat and teleport to random nearby location',
        manaCost: 20,
        cooldown: 10,
        class: 'rogue',
        effect: (game) => {
            return { flee: true, message: 'throws a smoke bomb and escapes!' };
        }
    },
    dual_strike: {
        name: 'Dual Strike',
        icon: '⚔️',
        description: 'Lightning-fast double attack',
        manaCost: 18,
        cooldown: 4,
        class: 'rogue',
        effect: (game) => {
            const damage = game.player.calculateDamage() * 0.7;
            return { damage, hits: 2, message: 'strikes twice in rapid succession!' };
        }
    },
    evasion: {
        name: 'Evasion',
        icon: '💨',
        description: 'Increase dodge chance by 50% for 4 turns',
        manaCost: 15,
        cooldown: 7,
        class: 'rogue',
        effect: (game) => {
            game.player.buffs.push({
                name: 'Evasion',
                duration: 4,
                dodgeBonus: 50
            });
            return { message: 'becomes incredibly evasive!' };
        }
    },
    assassinate: {
        name: 'Assassinate',
        icon: '🗡️',
        description: 'Instant kill enemies below 20% HP, otherwise deal 250% damage',
        manaCost: 35,
        cooldown: 12,
        class: 'rogue',
        effect: (game) => {
            const enemyHpPercent = (game.currentEnemy.hp / game.currentEnemy.maxHp) * 100;
            if (enemyHpPercent < 20) {
                return { instakill: true, message: 'assassinates the weakened enemy!' };
            } else {
                const damage = game.player.calculateDamage() * 2.5;
                return { damage, crit: true, message: 'attempts an assassination!' };
            }
        }
    },
    blade_flurry: {
        name: 'Blade Flurry',
        icon: '🌪️',
        description: 'Rapid attacks hitting 5 times for reduced damage',
        manaCost: 25,
        cooldown: 8,
        class: 'rogue',
        effect: (game) => {
            const damage = game.player.calculateDamage() * 0.4;
            return { damage, hits: 5, message: 'unleashes a blade flurry!' };
        }
    },
    vanish: {
        name: 'Vanish',
        icon: '👤',
        description: 'Become invisible, next attack deals 400% damage',
        manaCost: 30,
        cooldown: 10,
        class: 'rogue',
        effect: (game) => {
            game.player.buffs.push({
                name: 'Vanish',
                duration: 2,
                nextAttackMod: 4.0,
                invisible: true
            });
            return { message: 'vanishes from sight!' };
        }
    },
    fan_of_knives: {
        name: 'Fan of Knives',
        icon: '🔪',
        description: 'Throw knives in all directions',
        manaCost: 22,
        cooldown: 6,
        class: 'rogue',
        effect: (game) => {
            const damage = game.player.calculateDamage() * 0.8;
            return { damage, aoe: 3, message: 'throws a fan of knives!' };
        }
    },

    // Mage Skills
    fireball: {
        name: 'Fireball',
        icon: '🔥',
        description: 'Hurl a fireball dealing massive magic damage',
        manaCost: 25,
        cooldown: 3,
        class: 'mage',
        effect: (game) => {
            const damage = game.player.stats.magic * 3;
            return { damage, magical: true, message: 'hurls a fireball!' };
        }
    },
    ice_shield: {
        name: 'Ice Shield',
        icon: '❄️',
        description: 'Conjure ice shield absorbing 50 damage',
        manaCost: 20,
        cooldown: 5,
        class: 'mage',
        effect: (game) => {
            game.player.buffs.push({
                name: 'Ice Shield',
                duration: 5,
                shield: 50
            });
            return { message: 'conjures an ice shield!' };
        }
    },
    lightning_bolt: {
        name: 'Lightning Bolt',
        icon: '⚡',
        description: 'Strike with lightning, ignoring defense',
        manaCost: 30,
        cooldown: 4,
        class: 'mage',
        effect: (game) => {
            const damage = game.player.stats.magic * 4;
            return { damage, ignoreDefense: true, magical: true, message: 'calls down lightning!' };
        }
    },
    mana_drain: {
        name: 'Mana Drain',
        icon: '💫',
        description: 'Restore 30 mana and deal magic damage',
        manaCost: 0,
        cooldown: 6,
        class: 'mage',
        effect: (game) => {
            const damage = game.player.stats.magic * 2;
            const manaGain = 30;
            game.player.mana = Math.min(game.player.maxMana, game.player.mana + manaGain);
            return { damage, magical: true, message: 'drains magical energy!' };
        }
    },
    meteor_storm: {
        name: 'Meteor Storm',
        icon: '☄️',
        description: 'Rain meteors dealing massive AOE damage',
        manaCost: 50,
        cooldown: 12,
        class: 'mage',
        effect: (game) => {
            const damage = game.player.stats.magic * 5;
            return { damage, aoe: 4, magical: true, message: 'calls down a meteor storm!' };
        }
    },
    arcane_missiles: {
        name: 'Arcane Missiles',
        icon: '✨',
        description: 'Fire 6 arcane missiles at the enemy',
        manaCost: 28,
        cooldown: 5,
        class: 'mage',
        effect: (game) => {
            const damage = game.player.stats.magic * 0.8;
            return { damage, hits: 6, magical: true, message: 'fires arcane missiles!' };
        }
    },
    time_warp: {
        name: 'Time Warp',
        icon: '⏰',
        description: 'Slow time, reducing enemy attack speed',
        manaCost: 35,
        cooldown: 10,
        class: 'mage',
        effect: (game) => {
            return { enemyDebuff: 'slowed', duration: 5, message: 'warps time itself!' };
        }
    },
    teleport: {
        name: 'Teleport',
        icon: '🌀',
        description: 'Instantly escape from combat',
        manaCost: 40,
        cooldown: 15,
        class: 'mage',
        effect: (game) => {
            return { flee: true, guaranteed: true, message: 'teleports away!' };
        }
    },
    mana_shield: {
        name: 'Mana Shield',
        icon: '🔮',
        description: 'Convert damage to mana cost for 5 turns',
        manaCost: 45,
        cooldown: 14,
        class: 'mage',
        effect: (game) => {
            game.player.buffs.push({
                name: 'Mana Shield',
                duration: 5,
                manaShield: true
            });
            return { message: 'activates a mana shield!' };
        }
    },
    frost_nova: {
        name: 'Frost Nova',
        icon: '❄️',
        description: 'Freeze all nearby enemies',
        manaCost: 32,
        cooldown: 8,
        class: 'mage',
        effect: (game) => {
            const damage = game.player.stats.magic * 2;
            return { damage, aoe: 3, freeze: 2, magical: true, message: 'unleashes a frost nova!' };
        }
    },
    chain_lightning: {
        name: 'Chain Lightning',
        icon: '⚡',
        description: 'Lightning that bounces between enemies',
        manaCost: 38,
        cooldown: 7,
        class: 'mage',
        effect: (game) => {
            const damage = game.player.stats.magic * 3;
            return { damage, chain: 4, magical: true, message: 'casts chain lightning!' };
        }
    },
    arcane_power: {
        name: 'Arcane Power',
        icon: '💠',
        description: 'Massively boost magic power for 4 turns',
        manaCost: 40,
        cooldown: 11,
        class: 'mage',
        effect: (game) => {
            game.player.buffs.push({
                name: 'Arcane Power',
                duration: 4,
                magMod: 2.5
            });
            return { message: 'channels arcane power!' };
        }
    },
    blizzard: {
        name: 'Blizzard',
        icon: '🌨️',
        description: 'Summon a blizzard dealing damage over time in large area',
        manaCost: 45,
        cooldown: 13,
        class: 'mage',
        effect: (game) => {
            const damage = game.player.stats.magic * 2.5;
            return { damage, aoe: 5, dot: 3, magical: true, message: 'summons a devastating blizzard!' };
        }
    }
};

// ============================================================================
// CLASS DEFINITIONS
// ============================================================================

class Player {
    constructor(className) {
        this.className = className;
        this.level = 1;
        this.xp = 0;
        this.xpToLevel = 100;

        // Initialize stats based on class
        this.initializeClass(className);

        // Store BASE max values (never modified directly)
        this.baseMaxHp = this.maxHp;
        this.baseMaxMana = this.maxMana;

        this.hp = this.maxHp;
        this.mana = this.maxMana;

        this.x = 0;
        this.y = 0;
        this.gold = 0;
        this.score = 0;
        this.kills = 0;

        this.inventory = [];
        this.maxInventorySize = 20;

        this.equipment = {
            weapon: null,
            armor: null,
            shield: null,
            ring: null,
            amulet: null
        };

        this.skills = [];
        this.skillCooldowns = {};
        this.skillPoints = 0;
        this.unlockedSkills = [];

        this.buffs = [];
        this.defending = false;
        this.statusEffects = [];
    }

    initializeClass(className) {
        const classData = {
            warrior: {
                icon: '🛡️',
                maxHp: 120,
                maxMana: 20,
                stats: { strength: 15, defense: 12, agility: 8, magic: 5 }
            },
            rogue: {
                icon: '🗡️',
                maxHp: 80,
                maxMana: 30,
                stats: { strength: 10, defense: 8, agility: 16, magic: 8 }
            },
            mage: {
                icon: '🔮',
                maxHp: 70,
                maxMana: 100,
                stats: { strength: 6, defense: 6, agility: 10, magic: 18 }
            }
        };

        const data = classData[className];
        this.icon = data.icon;
        this.maxHp = data.maxHp;
        this.maxMana = data.maxMana;
        this.stats = {
            strength: data.stats.strength,
            defense: data.stats.defense,
            agility: data.stats.agility,
            magic: data.stats.magic,
            critChance: 5,
            vision: 5
        };

        // Add starting skills based on class
        this.initializeSkills();

        // Add starting equipment
        this.giveStartingEquipment();
    }

    giveStartingEquipment() {
        // All classes start with basic equipment
        const startingEquipment = {
            warrior: {
                weapon: { ...ITEM_TEMPLATES.rusty_sword },
                armor: { ...ITEM_TEMPLATES.leather_armor },
                shield: { ...ITEM_TEMPLATES.wooden_shield }
            },
            rogue: {
                weapon: { ...ITEM_TEMPLATES.dagger },
                armor: { ...ITEM_TEMPLATES.leather_armor }
            },
            mage: {
                weapon: { ...ITEM_TEMPLATES.wooden_staff },
                armor: { ...ITEM_TEMPLATES.leather_armor }
            }
        };

        const gear = startingEquipment[this.className];
        for (const slot in gear) {
            this.equipment[slot] = gear[slot];
        }

        // Start with 3 health potions
        for (let i = 0; i < 3; i++) {
            this.addItem({ ...ITEM_TEMPLATES.health_potion });
        }
    }

    initializeSkills() {
        const startingSkills = {
            warrior: ['power_strike'],
            rogue: ['backstab'],
            mage: ['fireball']
        };

        this.unlockedSkills = startingSkills[this.className];
        this.skills = this.unlockedSkills.map(id => SKILL_TEMPLATES[id]);
    }

    getTotalStats() {
        const total = { ...this.stats };

        // Calculate max HP and mana from base + equipment (without modifying base values)
        let equipHpBonus = 0;
        let equipManaBonus = 0;

        // Add equipment bonuses
        for (const slot in this.equipment) {
            const item = this.equipment[slot];
            if (item && item.stats) {
                for (const stat in item.stats) {
                    if (stat === 'hp') {
                        equipHpBonus += item.stats[stat];
                    } else if (stat === 'mana') {
                        equipManaBonus += item.stats[stat];
                    } else if (stat === 'str') {
                        total.strength += item.stats[stat];
                    } else if (stat === 'def') {
                        total.defense += item.stats[stat];
                    } else if (stat === 'agi') {
                        total.agility += item.stats[stat];
                    } else if (stat === 'mag') {
                        total.magic += item.stats[stat];
                    } else if (stat === 'crit') {
                        total.critChance += item.stats[stat];
                    }
                }
            }
        }

        // Update maxHp and maxMana based on base + bonuses
        this.maxHp = this.baseMaxHp + equipHpBonus;
        this.maxMana = this.baseMaxMana + equipManaBonus;

        // Apply buff modifiers
        for (const buff of this.buffs) {
            if (buff.strMod) total.strength *= buff.strMod;
            if (buff.defMod) total.defense *= buff.defMod;
            if (buff.agiMod) total.agility *= buff.agiMod;
            if (buff.magMod) total.magic *= buff.magMod;
        }

        return total;
    }

    calculateDamage() {
        const stats = this.getTotalStats();
        let baseDamage = stats.strength;

        // Add weapon damage
        if (this.equipment.weapon && this.equipment.weapon.stats.damage) {
            baseDamage += this.equipment.weapon.stats.damage;
        }

        // Random variance
        baseDamage = random(Math.floor(baseDamage * 0.8), Math.ceil(baseDamage * 1.2));

        return baseDamage;
    }

    takeDamage(damage) {
        // Check for shield buff
        for (let i = this.buffs.length - 1; i >= 0; i--) {
            if (this.buffs[i].shield) {
                const absorbed = Math.min(this.buffs[i].shield, damage);
                this.buffs[i].shield -= absorbed;
                damage -= absorbed;

                if (this.buffs[i].shield <= 0) {
                    this.buffs.splice(i, 1);
                }
            }
        }

        // Apply defense
        const stats = this.getTotalStats();
        const reduction = Math.floor(stats.defense * 0.5);
        damage = Math.max(1, damage - reduction);

        // Defending reduces damage by 50%
        if (this.defending) {
            damage = Math.floor(damage * 0.5);
        }

        this.hp -= damage;
        return damage;
    }

    heal(amount) {
        const healed = Math.min(amount, this.maxHp - this.hp);
        this.hp += healed;
        return healed;
    }

    restoreMana(amount) {
        const restored = Math.min(amount, this.maxMana - this.mana);
        this.mana += restored;
        return restored;
    }

    gainXp(amount) {
        this.xp += amount;
        this.score += amount;

        const levelsGained = [];
        while (this.xp >= this.xpToLevel) {
            this.levelUp();
            levelsGained.push(this.level);
        }

        return levelsGained;
    }

    levelUp() {
        this.level++;
        this.xp -= this.xpToLevel;
        this.xpToLevel = Math.floor(this.xpToLevel * 1.5);

        // Stat increases based on class
        const statGains = {
            warrior: { strength: 3, defense: 2, agility: 1, magic: 1 },
            rogue: { strength: 2, defense: 1, agility: 3, magic: 1 },
            mage: { strength: 1, defense: 1, agility: 1, magic: 4 }
        };

        const gains = statGains[this.className];
        this.stats.strength += gains.strength;
        this.stats.defense += gains.defense;
        this.stats.agility += gains.agility;
        this.stats.magic += gains.magic;

        // Increase BASE max HP and mana
        this.baseMaxHp += 10;
        this.baseMaxMana += 5;

        // Recalculate total stats to update maxHp/maxMana
        this.getTotalStats();

        // Full heal on level up
        this.hp = this.maxHp;
        this.mana = this.maxMana;

        // Gain skill point
        this.skillPoints++;
    }

    addItem(item) {
        if (this.inventory.length >= this.maxInventorySize) {
            return false;
        }

        // Check if stackable
        if (item.stackable) {
            const existing = this.inventory.find(i => i.name === item.name);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
                return true;
            }
        }

        item.quantity = item.quantity || 1;
        this.inventory.push(item);
        return true;
    }

    equipItem(item) {
        const slot = item.type;

        // Unequip current item
        if (this.equipment[slot]) {
            this.addItem(this.equipment[slot]);
        }

        // Equip new item
        this.equipment[slot] = item;

        // Remove from inventory
        const index = this.inventory.indexOf(item);
        if (index > -1) {
            this.inventory.splice(index, 1);
        }
    }

    unequipItem(slot) {
        const item = this.equipment[slot];
        if (item) {
            if (this.addItem(item)) {
                this.equipment[slot] = null;
                return true;
            }
        }
        return false;
    }

    useItem(item) {
        if (item.effect) {
            const effect = item.effect;
            const results = [];

            if (effect.heal) {
                const healed = this.heal(effect.heal);
                results.push(`Healed ${healed} HP`);
            }

            if (effect.mana) {
                const restored = this.restoreMana(effect.mana);
                results.push(`Restored ${restored} mana`);
            }

            if (effect.buff_str) {
                this.buffs.push({
                    name: item.name,
                    duration: effect.duration,
                    strMod: 1 + (effect.buff_str / this.stats.strength)
                });
                results.push(`Strength increased for ${effect.duration} turns`);
            }

            // Remove from inventory
            if (item.stackable) {
                item.quantity--;
                if (item.quantity <= 0) {
                    const index = this.inventory.indexOf(item);
                    if (index > -1) {
                        this.inventory.splice(index, 1);
                    }
                }
            } else {
                const index = this.inventory.indexOf(item);
                if (index > -1) {
                    this.inventory.splice(index, 1);
                }
            }

            return results.join(', ');
        }

        return 'Item has no effect';
    }

    updateBuffs() {
        this.defending = false;

        for (let i = this.buffs.length - 1; i >= 0; i--) {
            this.buffs[i].duration--;
            if (this.buffs[i].duration <= 0) {
                this.buffs.splice(i, 1);
            }
        }
    }

    updateCooldowns() {
        for (const skill in this.skillCooldowns) {
            if (this.skillCooldowns[skill] > 0) {
                this.skillCooldowns[skill]--;
            }
        }
    }
}

class Enemy {
    constructor(template, level) {
        Object.assign(this, JSON.parse(JSON.stringify(template)));

        // Scale with level
        const scaling = 1 + (level - this.level) * 0.3;
        this.level = level;
        this.hp *= scaling;
        this.maxHp = this.hp;
        this.damage *= scaling;
        this.defense *= scaling;
        this.xp = Math.floor(this.xp * scaling);
        this.gold = Math.floor(this.gold * scaling);

        this.hp = Math.floor(this.hp);
        this.maxHp = this.hp;
        this.damage = Math.floor(this.damage);
        this.defense = Math.floor(this.defense);

        this.buffs = [];
        this.poison = 0;
        this.poisonTurns = 0;
    }

    takeDamage(damage, ignoreDefense = false) {
        if (!ignoreDefense) {
            const reduction = Math.floor(this.defense * 0.5);
            damage = Math.max(1, damage - reduction);
        }

        this.hp -= damage;
        return damage;
    }

    calculateDamage() {
        return random(Math.floor(this.damage * 0.8), Math.ceil(this.damage * 1.2));
    }

    updatePoison() {
        if (this.poisonTurns > 0) {
            this.hp -= this.poison;
            this.poisonTurns--;
            return this.poison;
        }
        return 0;
    }
}

// ============================================================================
// WORLD GENERATION
// ============================================================================

class World {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tiles = [];
        this.biomes = [];
        this.enemies = [];
        this.items = [];
        this.towns = [];
        this.poi = []; // Points of interest

        this.generate();
    }

    generate() {
        console.log('Generating open world...');

        // Initialize with grass (base terrain)
        for (let y = 0; y < this.height; y++) {
            this.tiles[y] = [];
            this.biomes[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.tiles[y][x] = TILE_TYPES.GRASS;
                this.biomes[y][x] = BIOME_TYPES.PLAINS;
            }
        }

        // Generate biomes using simple noise-like patterns
        this.generateBiomes();

        // Place terrain features based on biomes
        this.generateTerrain();

        // Place starting town
        this.placeStartingTown();

        // Place other towns
        this.placeTowns();

        // Place enemies
        this.placeEnemies();

        // Place items and treasures
        this.placeItems();

        // Place points of interest
        this.placePointsOfInterest();

        console.log('World generation complete!');
    }

    generateBiomes() {
        // Create biome regions
        const biomeSeeds = [];

        // Plains (center, safe starting area)
        biomeSeeds.push({ x: Math.floor(this.width / 2), y: Math.floor(this.height / 2), type: BIOME_TYPES.PLAINS, radius: 25 });

        // Forest regions
        for (let i = 0; i < 3; i++) {
            biomeSeeds.push({ x: random(15, this.width - 15), y: random(15, this.height - 15), type: BIOME_TYPES.FOREST, radius: random(15, 25) });
        }

        // Mountain regions
        for (let i = 0; i < 2; i++) {
            biomeSeeds.push({ x: random(15, this.width - 15), y: random(15, this.height - 15), type: BIOME_TYPES.MOUNTAINS, radius: random(12, 20) });
        }

        // Desert regions
        biomeSeeds.push({ x: random(20, this.width - 20), y: random(20, this.height - 20), type: BIOME_TYPES.DESERT, radius: random(15, 22) });

        // Dark Forest (dangerous area)
        biomeSeeds.push({ x: random(30, this.width - 30), y: random(30, this.height - 30), type: BIOME_TYPES.DARK_FOREST, radius: random(18, 25) });

        // Apply biomes
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                let closestSeed = biomeSeeds[0];
                let closestDist = distance(x, y, closestSeed.x, closestSeed.y);

                for (const seed of biomeSeeds) {
                    const dist = distance(x, y, seed.x, seed.y);
                    if (dist < closestDist && dist < seed.radius) {
                        closestSeed = seed;
                        closestDist = dist;
                    }
                }

                this.biomes[y][x] = closestSeed.type;
            }
        }
    }

    generateTerrain() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const biome = this.biomes[y][x];

                switch(biome) {
                    case BIOME_TYPES.PLAINS:
                        this.tiles[y][x] = TILE_TYPES.GRASS;
                        // Occasional trees
                        if (random(1, 100) < 5) {
                            this.tiles[y][x] = TILE_TYPES.TREE;
                        }
                        break;

                    case BIOME_TYPES.FOREST:
                        if (random(1, 100) < 60) {
                            this.tiles[y][x] = TILE_TYPES.TREE;
                        } else {
                            this.tiles[y][x] = TILE_TYPES.GRASS;
                        }
                        break;

                    case BIOME_TYPES.MOUNTAINS:
                        if (random(1, 100) < 70) {
                            this.tiles[y][x] = TILE_TYPES.MOUNTAIN;
                        } else {
                            this.tiles[y][x] = TILE_TYPES.STONE;
                        }
                        // Caves
                        if (random(1, 100) < 3) {
                            this.tiles[y][x] = TILE_TYPES.CAVE;
                        }
                        break;

                    case BIOME_TYPES.DESERT:
                        this.tiles[y][x] = TILE_TYPES.SAND;
                        // Ruins
                        if (random(1, 100) < 2) {
                            this.tiles[y][x] = TILE_TYPES.RUINS;
                        }
                        break;

                    case BIOME_TYPES.DARK_FOREST:
                        if (random(1, 100) < 80) {
                            this.tiles[y][x] = TILE_TYPES.TREE;
                        } else {
                            this.tiles[y][x] = TILE_TYPES.GRASS;
                        }
                        break;
                }
            }
        }

        // Add some water bodies
        this.generateWater();
    }

    generateWater() {
        const numLakes = random(3, 6);
        for (let i = 0; i < numLakes; i++) {
            const centerX = random(10, this.width - 10);
            const centerY = random(10, this.height - 10);
            const radius = random(3, 7);

            for (let y = centerY - radius; y <= centerY + radius; y++) {
                for (let x = centerX - radius; x <= centerX + radius; x++) {
                    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                        if (distance(x, y, centerX, centerY) <= radius) {
                            this.tiles[y][x] = TILE_TYPES.WATER;
                        }
                    }
                }
            }
        }
    }

    placeStartingTown() {
        const x = Math.floor(this.width / 2);
        const y = Math.floor(this.height / 2);

        // Clear area for town
        for (let ty = y - 3; ty <= y + 3; ty++) {
            for (let tx = x - 3; tx <= x + 3; tx++) {
                if (tx >= 0 && tx < this.width && ty >= 0 && ty < this.height) {
                    this.tiles[ty][tx] = TILE_TYPES.GRASS;
                }
            }
        }

        // Place town marker
        this.tiles[y][x] = TILE_TYPES.TOWN;

        this.towns.push({
            x, y,
            name: 'Starter Village',
            type: 'starting',
            hasShop: true,
            hasInn: true
        });
    }

    placeTowns() {
        // Place 3-5 additional towns in different biomes
        const numTowns = random(3, 5);

        for (let i = 0; i < numTowns; i++) {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 50) {
                const x = random(20, this.width - 20);
                const y = random(20, this.height - 20);

                // Check if far enough from other towns
                let tooClose = false;
                for (const town of this.towns) {
                    if (distance(x, y, town.x, town.y) < 30) {
                        tooClose = true;
                        break;
                    }
                }

                if (!tooClose && this.isWalkable(x, y)) {
                    // Clear small area
                    for (let ty = y - 2; ty <= y + 2; ty++) {
                        for (let tx = x - 2; tx <= x + 2; tx++) {
                            if (tx >= 0 && tx < this.width && ty >= 0 && ty < this.height) {
                                this.tiles[ty][tx] = TILE_TYPES.GRASS;
                            }
                        }
                    }

                    this.tiles[y][x] = TILE_TYPES.TOWN;

                    const biome = this.biomes[y][x];
                    const townNames = {
                        [BIOME_TYPES.PLAINS]: ['Meadowbrook', 'Greenfield', 'Pleasant Valley'],
                        [BIOME_TYPES.FOREST]: ['Forestkeep', 'Woodland', 'Oakshire'],
                        [BIOME_TYPES.MOUNTAINS]: ['Highpeak', 'Mountain Rest', 'Stone Haven'],
                        [BIOME_TYPES.DESERT]: ['Oasis Town', 'Sandport', 'Dune City'],
                        [BIOME_TYPES.DARK_FOREST]: ['Shadow Village', 'Dark Hollow', 'Grimwood']
                    };

                    const nameList = townNames[biome] || townNames[BIOME_TYPES.PLAINS];
                    const townName = randomChoice(nameList);

                    this.towns.push({
                        x, y,
                        name: townName,
                        type: biome,
                        hasShop: random(1, 100) > 30,
                        hasInn: true
                    });

                    placed = true;
                }

                attempts++;
            }
        }
    }

    placeEnemies() {
        // Spread enemies across the world based on biomes
        const totalEnemies = 150;

        for (let i = 0; i < totalEnemies; i++) {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 50) {
                const x = random(5, this.width - 5);
                const y = random(5, this.height - 5);

                // Don't place enemies near towns or on unwalkable tiles
                let nearTown = false;
                for (const town of this.towns) {
                    if (distance(x, y, town.x, town.y) < 10) {
                        nearTown = true;
                        break;
                    }
                }

                if (!nearTown && this.isWalkable(x, y)) {
                    const biome = this.biomes[y][x];

                    // Get enemies for this biome
                    const biomeEnemies = Object.entries(ENEMY_TEMPLATES)
                        .filter(([key, template]) => template.biome === biome)
                        .map(([key, template]) => key);

                    if (biomeEnemies.length > 0) {
                        const enemyType = randomChoice(biomeEnemies);
                        const enemy = new Enemy(ENEMY_TEMPLATES[enemyType], 1);
                        enemy.x = x;
                        enemy.y = y;
                        this.enemies.push(enemy);
                        placed = true;
                    }
                }

                attempts++;
            }
        }
    }

    placeItems() {
        // Place random items scattered across the world
        const numItems = 50;

        for (let i = 0; i < numItems; i++) {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 30) {
                const x = random(5, this.width - 5);
                const y = random(5, this.height - 5);

                if (this.isWalkable(x, y)) {
                    const item = this.generateRandomItem();
                    item.x = x;
                    item.y = y;
                    this.items.push(item);
                    placed = true;
                }

                attempts++;
            }
        }
    }

    placePointsOfInterest() {
        // Shrines
        for (let i = 0; i < 5; i++) {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 30) {
                const x = random(10, this.width - 10);
                const y = random(10, this.height - 10);

                if (this.isWalkable(x, y)) {
                    this.tiles[y][x] = TILE_TYPES.SHRINE;
                    this.poi.push({ x, y, type: 'shrine' });
                    placed = true;
                }

                attempts++;
            }
        }

        // Dungeon entrances
        for (let i = 0; i < 3; i++) {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 30) {
                const x = random(20, this.width - 20);
                const y = random(20, this.height - 20);

                // Place in darker biomes
                if (this.biomes[y][x] === BIOME_TYPES.DARK_FOREST ||
                    this.biomes[y][x] === BIOME_TYPES.MOUNTAINS) {
                    if (this.tiles[y][x] === TILE_TYPES.GRASS || this.tiles[y][x] === TILE_TYPES.STONE) {
                        this.tiles[y][x] = TILE_TYPES.DUNGEON_ENTRANCE;
                        this.poi.push({ x, y, type: 'dungeon' });
                        placed = true;
                    }
                }

                attempts++;
            }
        }
    }

    generateRandomItem() {
        // Simple random item generation
        const rarityRoll = random(1, 100);
        let rarity;

        if (rarityRoll > 95) {
            rarity = RARITY.LEGENDARY;
        } else if (rarityRoll > 85) {
            rarity = RARITY.EPIC;
        } else if (rarityRoll > 70) {
            rarity = RARITY.RARE;
        } else if (rarityRoll > 50) {
            rarity = RARITY.UNCOMMON;
        } else {
            rarity = RARITY.COMMON;
        }

        const validItems = Object.values(ITEM_TEMPLATES).filter(item => item.rarity === rarity);

        if (validItems.length > 0) {
            return { ...randomChoice(validItems) };
        }

        return { ...ITEM_TEMPLATES.health_potion };
    }

    getStartPosition() {
        // Start in the center town
        return {
            x: Math.floor(this.width / 2),
            y: Math.floor(this.height / 2)
        };
    }

    getBiomeAt(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return BIOME_TYPES.PLAINS;
        }
        return this.biomes[y][x];
    }

    getTownAt(x, y) {
        return this.towns.find(t => t.x === x && t.y === y);
    }

    isWalkable(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false;
        }

        const tile = this.tiles[y][x];
        return tile === TILE_TYPES.GRASS ||
               tile === TILE_TYPES.SAND ||
               tile === TILE_TYPES.STONE ||
               tile === TILE_TYPES.ROAD ||
               tile === TILE_TYPES.TOWN ||
               tile === TILE_TYPES.SHRINE ||
               tile === TILE_TYPES.DUNGEON_ENTRANCE ||
               tile === TILE_TYPES.CAVE ||
               tile === TILE_TYPES.RUINS;
    }

    getEnemyAt(x, y) {
        return this.enemies.find(e => e.x === x && e.y === y && e.hp > 0);
    }

    getItemAt(x, y) {
        return this.items.find(i => i.x === x && i.y === y);
    }
}

// ============================================================================
// MAIN GAME CLASS
// ============================================================================

class Game {
    constructor() {
        this.state = 'title';
        this.player = null;
        this.world = null;
        this.selectedClass = null;
        this.inCombat = false;
        this.currentEnemy = null;
        this.messageLog = [];
        this.damageNumbers = [];
        this.floatingTexts = [];
        this.shakeAmount = 0;
        this.lastRenderTime = 0;

        this.canvas = document.getElementById('dungeon-canvas');
        this.ctx = this.canvas.getContext('2d');

        this.setupEventListeners();
        this.initializeUI();
        this.startRenderLoop();
    }

    startRenderLoop() {
        const loop = (timestamp) => {
            if (this.state === 'playing') {
                const deltaTime = timestamp - this.lastRenderTime;
                this.lastRenderTime = timestamp;
                this.updateAnimations(deltaTime);
                this.render();
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    updateAnimations(deltaTime) {
        // Update floating damage numbers
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            const text = this.floatingTexts[i];
            text.life += deltaTime;
            text.y -= deltaTime * 0.03;
            text.alpha = Math.max(0, 1 - text.life / text.duration);

            if (text.life >= text.duration) {
                this.floatingTexts.splice(i, 1);
            }
        }

        // Update screen shake
        if (this.shakeAmount > 0) {
            this.shakeAmount -= deltaTime * 0.01;
            if (this.shakeAmount < 0) this.shakeAmount = 0;
        }
    }

    showFloatingText(x, y, text, color = '#ff4444', isCrit = false) {
        this.floatingTexts.push({
            x, y,
            text,
            color,
            isCrit,
            life: 0,
            duration: 1000,
            alpha: 1
        });
    }

    screenShake(amount = 10) {
        this.shakeAmount = amount;
    }

    setupEventListeners() {
        // Class selection
        document.querySelectorAll('.class-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.selectedClass = card.dataset.class;
                document.getElementById('start-game-btn').disabled = false;
            });
        });

        // Start game
        document.getElementById('start-game-btn').addEventListener('click', () => {
            if (this.selectedClass) {
                this.startGame();
            }
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (this.state === 'playing' && !this.inCombat) {
                this.handleKeyPress(e);
            }
        });

        // Combat buttons
        document.querySelectorAll('.combat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleCombatAction(action);
            });
        });

        // Quick actions
        document.getElementById('rest-btn').addEventListener('click', () => this.rest());
        document.getElementById('search-btn').addEventListener('click', () => this.search());
        document.getElementById('skills-btn').addEventListener('click', () => this.openSkillsModal());

        // Restart
        document.getElementById('restart-btn').addEventListener('click', () => {
            this.returnToTitle();
        });

        // Modal close buttons
        document.querySelectorAll('.close-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.modal').classList.add('hidden');
            });
        });
    }

    initializeUI() {
        // Initialize inventory grid
        const inventoryGrid = document.getElementById('inventory-grid');
        for (let i = 0; i < 20; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot empty';
            slot.dataset.slot = i;
            inventoryGrid.appendChild(slot);
        }
    }

    startGame() {
        this.player = new Player(this.selectedClass);
        this.messageLog = [];
        this.initializeGameSystems();

        this.generateWorld();

        document.getElementById('title-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');

        this.state = 'playing';

        this.addMessage('⚔️ Welcome to Chronicles of Eldoria! ⚔️', 'success');
        this.addMessage('You have been summoned to this world as a hero...', 'info');
        this.addMessage('Use WASD or Arrow Keys to move. Press R to rest, I for inventory.', 'info');
        this.addMessage('Visit towns to trade, accept quests, and rest at inns!', 'warning');

        this.updateUI();
        this.render();
    }

    initializeGameSystems() {
        // Initialize all game systems
        this.activeQuests = [];
        this.completedQuests = [];
        this.reputation = {
            starter_village: 0,
            merchants_guild: 0,
            adventurers_guild: 0,
            mages_circle: 0
        };
        this.timeOfDay = 'day'; // day, dusk, night, dawn
        this.weather = 'clear'; // clear, rain, storm, snow, fog
        this.dayCount = 1;
        this.companion = null;
        this.randomEventCooldown = 0;

        // Initialize quests, crafting, cooking, and achievements
        this.initializeQuests();
        this.initializeCrafting();
        this.initializeCooking();
        this.initializeAchievements();
    }

    generateWorld() {
        this.world = new World(WORLD_WIDTH, WORLD_HEIGHT);
        const startPos = this.world.getStartPosition();
        this.player.x = startPos.x;
        this.player.y = startPos.y;

        this.addMessage('You awaken in the Starter Village...', 'success');
        this.updateCurrentBiome();
    }

    updateCurrentBiome() {
        const biome = this.world.getBiomeAt(this.player.x, this.player.y);
        this.currentBiome = biome;

        const biomeNames = {
            [BIOME_TYPES.PLAINS]: 'Plains',
            [BIOME_TYPES.FOREST]: 'Forest',
            [BIOME_TYPES.MOUNTAINS]: 'Mountains',
            [BIOME_TYPES.DESERT]: 'Desert',
            [BIOME_TYPES.DARK_FOREST]: 'Dark Forest',
            [BIOME_TYPES.SWAMP]: 'Swamp',
            [BIOME_TYPES.TUNDRA]: 'Tundra'
        };

        const biomeName = biomeNames[biome] || 'Unknown';
        document.getElementById('biome-name').textContent = biomeName;
    }

    handleKeyPress(e) {
        let dx = 0, dy = 0;

        switch(e.key.toLowerCase()) {
            case 'arrowup':
            case 'w':
                dy = -1;
                break;
            case 'arrowdown':
            case 's':
                dy = 1;
                break;
            case 'arrowleft':
            case 'a':
                dx = -1;
                break;
            case 'arrowright':
            case 'd':
                dx = 1;
                break;
            case 'r':
                this.rest();
                return;
            case ' ':
                this.search();
                return;
            default:
                return;
        }

        if (dx !== 0 || dy !== 0) {
            e.preventDefault();
            this.movePlayer(dx, dy);
        }
    }

    movePlayer(dx, dy) {
        const newX = this.player.x + dx;
        const newY = this.player.y + dy;

        // Check for enemy
        const enemy = this.world.getEnemyAt(newX, newY);
        if (enemy) {
            this.startCombat(enemy);
            return;
        }

        // Check if walkable
        if (!this.world.isWalkable(newX, newY)) {
            return;
        }

        // Check for town
        const town = this.world.getTownAt(newX, newY);
        if (town) {
            this.enterTown(town);
            return;
        }

        // Check for dungeon entrance
        if (this.world.tiles[newY][newX] === TILE_TYPES.DUNGEON_ENTRANCE) {
            this.enterDungeon(newX, newY);
            return;
        }

        // Check for shrine
        if (this.world.tiles[newY][newX] === TILE_TYPES.SHRINE) {
            this.useShrine(newX, newY);
        }

        // Check for cave
        if (this.world.tiles[newY][newX] === TILE_TYPES.CAVE) {
            this.exploreCave(newX, newY);
        }

        // Check for ruins
        if (this.world.tiles[newY][newX] === TILE_TYPES.RUINS) {
            this.exploreRuins(newX, newY);
        }

        // Check for item
        const item = this.world.getItemAt(newX, newY);
        if (item) {
            this.pickupItem(item);
        }

        // Move player
        this.player.x = newX;
        this.player.y = newY;

        // Update biome
        this.updateCurrentBiome();

        // Check for random events
        this.checkRandomEvent();

        // Enemy turn
        this.enemyTurn();

        // Update cooldowns and buffs
        this.player.updateCooldowns();
        this.player.updateBuffs();

        // Update time and weather
        this.updateTimeAndWeather();

        this.updateUI();
        this.render();
    }

    enemyTurn() {
        for (const enemy of this.world.enemies) {
            if (enemy.hp <= 0) continue;

            // Simple AI: move towards player if in range
            const dist = distance(enemy.x, enemy.y, this.player.x, this.player.y);

            if (dist < 8) {
                const dx = Math.sign(this.player.x - enemy.x);
                const dy = Math.sign(this.player.y - enemy.y);

                // Try to move towards player
                const newX = enemy.x + (Math.abs(dx) > Math.abs(dy) ? dx : 0);
                const newY = enemy.y + (Math.abs(dy) >= Math.abs(dx) ? dy : 0);

                // Check if adjacent to player
                if (Math.abs(this.player.x - newX) <= 1 && Math.abs(this.player.y - newY) <= 1 &&
                    (this.player.x === newX || this.player.y === newY)) {
                    // Attack player
                    const damage = enemy.calculateDamage();
                    const actualDamage = this.player.takeDamage(damage);
                    this.addMessage(`${enemy.name} attacks for ${actualDamage} damage!`, 'combat');

                    if (this.player.hp <= 0) {
                        this.gameOver();
                    }
                } else if (this.world.isWalkable(newX, newY) && !this.world.getEnemyAt(newX, newY)) {
                    enemy.x = newX;
                    enemy.y = newY;
                }
            }
        }
    }

    startCombat(enemy) {
        this.inCombat = true;
        this.currentEnemy = enemy;

        this.addMessage(`You encounter a ${enemy.name}!`, 'combat');

        document.getElementById('combat-overlay').classList.remove('hidden');
        this.updateCombatUI();
    }

    handleCombatAction(action) {
        if (!this.currentEnemy || this.currentEnemy.hp <= 0) {
            this.endCombat();
            return;
        }

        let playerAction = '';

        switch(action) {
            case 'attack':
                playerAction = this.combatAttack();
                break;
            case 'heavy':
                playerAction = this.combatHeavyStrike();
                break;
            case 'defend':
                playerAction = this.combatDefend();
                break;
            case 'skill':
                this.showSkillMenu();
                return;
            case 'item':
                this.showItemMenu();
                return;
            case 'flee':
                if (this.attemptFlee()) {
                    this.endCombat();
                    return;
                }
                playerAction = 'You failed to flee!';
                break;
        }

        this.addMessage(playerAction, 'combat');

        // Check if enemy defeated
        if (this.currentEnemy.hp <= 0) {
            this.defeatEnemy();
            return;
        }

        // Enemy turn
        const enemyDamage = this.currentEnemy.calculateDamage();
        const actualDamage = this.player.takeDamage(enemyDamage);
        this.showFloatingText(this.player.x, this.player.y, `-${actualDamage}`, '#ff0000', false);
        this.screenShake(6);
        this.addMessage(`${this.currentEnemy.name} attacks for ${actualDamage} damage!`, 'combat');

        // Apply poison
        const poisonDamage = this.currentEnemy.updatePoison();
        if (poisonDamage > 0) {
            this.addMessage(`${this.currentEnemy.name} takes ${poisonDamage} poison damage!`, 'success');
            if (this.currentEnemy.hp <= 0) {
                this.defeatEnemy();
                return;
            }
        }

        if (this.player.hp <= 0) {
            this.gameOver();
            return;
        }

        this.updateCombatUI();
        this.updateUI();
    }

    combatAttack() {
        const stats = this.player.getTotalStats();
        let damage = this.player.calculateDamage();

        // Check for critical hit
        const critRoll = random(1, 100);
        const isCrit = critRoll <= stats.critChance;

        if (isCrit) {
            damage *= 2;
            const actualDamage = this.currentEnemy.takeDamage(damage);
            this.showFloatingText(this.currentEnemy.x, this.currentEnemy.y, `-${actualDamage}`, '#ff8800', true);
            this.screenShake(8);
            return `Critical hit! You deal ${actualDamage} damage!`;
        } else {
            const actualDamage = this.currentEnemy.takeDamage(damage);
            this.showFloatingText(this.currentEnemy.x, this.currentEnemy.y, `-${actualDamage}`, '#ff4444', false);
            this.screenShake(4);
            return `You attack for ${actualDamage} damage!`;
        }
    }

    combatHeavyStrike() {
        if (this.player.mana < 5) {
            return 'Not enough mana!';
        }

        this.player.mana -= 5;
        let damage = this.player.calculateDamage() * 1.5;
        const actualDamage = this.currentEnemy.takeDamage(Math.floor(damage));
        this.showFloatingText(this.currentEnemy.x, this.currentEnemy.y, `-${actualDamage}`, '#ffaa00', false);
        this.screenShake(12);
        return `You perform a heavy strike for ${actualDamage} damage!`;
    }

    combatDefend() {
        this.player.defending = true;
        return 'You brace yourself and defend!';
    }

    showSkillMenu() {
        // Create temporary skill selection
        const buttonsDiv = document.getElementById('combat-buttons');
        const originalButtons = buttonsDiv.innerHTML;

        buttonsDiv.innerHTML = '<button class="combat-btn" data-action="back">⬅️ Back</button>';

        for (const skill of this.player.skills) {
            const skillId = Object.keys(SKILL_TEMPLATES).find(key => SKILL_TEMPLATES[key] === skill);
            const onCooldown = this.player.skillCooldowns[skillId] > 0;
            const canUse = this.player.mana >= skill.manaCost && !onCooldown;

            const btn = document.createElement('button');
            btn.className = 'combat-btn';
            btn.dataset.action = 'use-skill';
            btn.dataset.skill = skillId;
            btn.disabled = !canUse;
            btn.textContent = `${skill.icon} ${skill.name} (${skill.manaCost} mana)`;

            btn.addEventListener('click', () => {
                if (canUse) {
                    this.useSkill(skillId);
                    buttonsDiv.innerHTML = originalButtons;
                    this.setupCombatButtons();
                }
            });

            buttonsDiv.appendChild(btn);
        }

        buttonsDiv.querySelector('[data-action="back"]').addEventListener('click', () => {
            buttonsDiv.innerHTML = originalButtons;
            this.setupCombatButtons();
        });
    }

    setupCombatButtons() {
        document.querySelectorAll('.combat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleCombatAction(action);
            });
        });
    }

    useSkill(skillId) {
        const skill = SKILL_TEMPLATES[skillId];

        if (this.player.mana < skill.manaCost) {
            this.addMessage('Not enough mana!', 'warning');
            return;
        }

        this.player.mana -= skill.manaCost;
        this.player.skillCooldowns[skillId] = skill.cooldown;

        const result = skill.effect(this);

        this.addMessage(`You ${result.message}`, 'success');

        if (result.damage) {
            const actualDamage = this.currentEnemy.takeDamage(result.damage, result.ignoreDefense);
            this.addMessage(`Dealt ${actualDamage} ${result.magical ? 'magical' : ''} damage!`, 'combat');
        }

        if (result.poison) {
            this.currentEnemy.poison = result.poison;
            this.currentEnemy.poisonTurns = result.poisonTurns;
        }

        if (this.currentEnemy.hp <= 0) {
            this.defeatEnemy();
        }
    }

    showItemMenu() {
        // Show usable items
        const usableItems = this.player.inventory.filter(item =>
            item.type === ITEM_TYPES.POTION || item.type === ITEM_TYPES.SCROLL
        );

        if (usableItems.length === 0) {
            this.addMessage('No usable items!', 'warning');
            return;
        }

        // Similar to skill menu implementation
        this.addMessage('Item usage in combat coming soon!', 'info');
    }

    attemptFlee() {
        const stats = this.player.getTotalStats();
        const fleeChance = 50 + stats.agility - this.currentEnemy.agility;
        const roll = random(1, 100);

        if (roll <= fleeChance) {
            // Move player to random adjacent tile
            const directions = [[-1,0], [1,0], [0,-1], [0,1]];
            for (const [dx, dy] of directions) {
                const newX = this.player.x + dx;
                const newY = this.player.y + dy;
                if (this.world.isWalkable(newX, newY) && !this.world.getEnemyAt(newX, newY)) {
                    this.player.x = newX;
                    this.player.y = newY;
                    this.addMessage('You successfully fled!', 'success');
                    return true;
                }
            }
        }

        return false;
    }

    defeatEnemy() {
        this.addMessage(`You defeated the ${this.currentEnemy.name}!`, 'success');

        // Gain XP
        const levels = this.player.gainXp(this.currentEnemy.xp);
        if (levels.length > 0) {
            this.addMessage(`Level up! You are now level ${this.player.level}!`, 'success');
        }

        // Gain gold
        this.player.gold += this.currentEnemy.gold;
        this.player.score += this.currentEnemy.gold;
        this.addMessage(`+${this.currentEnemy.gold} gold`, 'success');

        // Random loot drop
        if (random(1, 100) > 60) {
            const item = this.world.generateRandomItem();
            item.x = this.currentEnemy.x;
            item.y = this.currentEnemy.y;
            this.world.items.push(item);
            this.addMessage(`${this.currentEnemy.name} dropped ${item.name}!`, 'info');
        }

        this.player.kills++;
        this.currentEnemy.hp = 0;

        // Update quest progress
        this.updateQuestProgress('kill', this.currentEnemy.type);
        this.updateQuestProgress('kill_biome', this.currentBiome);

        // Check achievements
        this.checkAchievement('first_blood');
        if (this.player.kills >= 100) this.checkAchievement('slayer');
        if (this.currentEnemy.boss) this.checkAchievement('dragon_slayer');

        // Update high scores
        this.updateHighScores();

        this.endCombat();
    }

    // Helper method for non-combat enemy kills (AOE, etc.)
    onEnemyKilled(enemy) {
        if (!enemy || enemy.hp > 0) return;

        // Gain XP and gold
        const levels = this.player.gainXp(enemy.xp);
        if (levels.length > 0) {
            this.addMessage(`Level up! You are now level ${this.player.level}!`, 'success');
        }

        this.player.gold += enemy.gold;
        this.player.score += enemy.gold;
        this.player.kills++;

        // Update quest progress
        this.updateQuestProgress('kill', enemy.type);
        this.updateQuestProgress('kill_biome', this.currentBiome);

        // Check achievements
        this.checkAchievement('first_blood');
        if (this.player.kills >= 100) this.checkAchievement('slayer');
        if (enemy.boss) this.checkAchievement('dragon_slayer');

        // Update high scores
        this.updateHighScores();

        // Random loot drop
        if (random(1, 100) > 70) {
            const item = this.world.generateRandomItem();
            item.x = enemy.x;
            item.y = enemy.y;
            this.world.items.push(item);
        }
    }

    endCombat() {
        this.inCombat = false;
        this.currentEnemy = null;
        document.getElementById('combat-overlay').classList.add('hidden');

        this.player.updateCooldowns();
        this.player.updateBuffs();

        this.updateUI();
        this.render();
    }

    pickupItem(item) {
        if (this.player.addItem(item)) {
            this.addMessage(`Picked up ${item.name}`, 'success');
            const index = this.world.items.indexOf(item);
            this.world.items.splice(index, 1);
        } else {
            this.addMessage('Inventory full!', 'warning');
        }
    }

    openChest(x, y) {
        this.world.tiles[y][x] = TILE_TYPES.FLOOR;

        // Generate 2-4 items
        const numItems = random(2, 4);
        for (let i = 0; i < numItems; i++) {
            const item = this.world.generateRandomItem();
            if (this.player.addItem(item)) {
                this.addMessage(`Found ${item.name} in chest!`, 'success');
            }
        }

        // Gold
        const gold = random(20, 50) * this.floor;
        this.player.gold += gold;
        this.addMessage(`Found ${gold} gold!`, 'success');
        this.showFloatingText(x, y, `+${gold}g`, '#ffd700', false);
    }

    useShrine(x, y) {
        this.world.tiles[y][x] = TILE_TYPES.FLOOR;

        const shrineType = random(1, 3);

        switch(shrineType) {
            case 1:
                // Healing shrine
                this.player.hp = this.player.maxHp;
                this.player.mana = this.player.maxMana;
                this.addMessage('The shrine fully restores your health and mana!', 'success');
                this.showFloatingText(x, y, 'RESTORED', '#44ff44', false);
                break;
            case 2:
                // Blessing shrine
                this.player.buffs.push({
                    name: 'Shrine Blessing',
                    duration: 20,
                    strMod: 1.2,
                    defMod: 1.2
                });
                this.addMessage('The shrine blesses you with increased power!', 'success');
                this.showFloatingText(x, y, 'BLESSED', '#ffff00', false);
                break;
            case 3:
                // XP shrine
                const xpGain = 50 * this.floor;
                const levels = this.player.gainXp(xpGain);
                this.addMessage(`The shrine grants you ${xpGain} experience!`, 'success');
                this.showFloatingText(x, y, `+${xpGain} XP`, '#00ffff', false);
                if (levels.length > 0) {
                    this.addMessage(`Level up! You are now level ${this.player.level}!`, 'success');
                }
                break;
        }
    }

    openTreasureRoom(x, y) {
        this.world.tiles[y][x] = TILE_TYPES.FLOOR;

        // Massive gold bonus
        const gold = random(100, 200) * this.floor;
        this.player.gold += gold;
        this.player.score += gold;
        this.addMessage(`Treasure room! You found ${gold} gold!`, 'success');
        this.showFloatingText(x, y, `+${gold}g`, '#ffd700', true);

        // Guarantee at least one rare item
        const rareItem = this.world.generateRandomItem();
        if (this.player.addItem(rareItem)) {
            this.addMessage(`Found legendary treasure: ${rareItem.name}!`, 'success');
        }
    }

    rest() {
        const healAmount = Math.floor(this.player.maxHp * 0.3);
        const manaAmount = Math.floor(this.player.maxMana * 0.5);

        this.player.heal(healAmount);
        this.player.restoreMana(manaAmount);

        this.addMessage(`You rest and recover ${healAmount} HP and ${manaAmount} mana`, 'success');

        // Enemies move
        this.enemyTurn();

        this.updateUI();
        this.render();
    }

    search() {
        // Find nearby hidden items
        const range = 3;
        let found = false;

        for (let dy = -range; dy <= range; dy++) {
            for (let dx = -range; dx <= range; dx++) {
                const x = this.player.x + dx;
                const y = this.player.y + dy;

                if (x >= 0 && x < this.world.width && y >= 0 && y < this.world.height) {
                    if (this.world.tiles[y][x] === TILE_TYPES.CHEST) {
                        this.addMessage(`You found a chest nearby!`, 'info');
                        found = true;
                    }
                }
            }
        }

        if (!found) {
            this.addMessage('You found nothing...', 'info');
        }

        this.render();
    }

    descendStairs() {
        this.floor++;
        this.addMessage(`Descending to floor ${this.floor}...`, 'warning');
        this.player.score += 100 * this.floor;

        this.generateDungeon();
        this.updateUI();
        this.render();
    }

    openSkillsModal() {
        const modal = document.getElementById('skills-modal');
        modal.classList.remove('hidden');

        document.getElementById('skill-points').textContent = this.player.skillPoints;

        this.renderSkillTree();
    }

    renderSkillTree() {
        const skillTree = document.getElementById('skill-tree');
        skillTree.innerHTML = '';

        const classSkills = Object.entries(SKILL_TEMPLATES).filter(([id, skill]) =>
            skill.class === this.player.className
        );

        for (const [id, skill] of classSkills) {
            const unlocked = this.player.unlockedSkills.includes(id);

            const div = document.createElement('div');
            div.className = `skill-tree-item ${unlocked ? 'unlocked' : 'locked'}`;

            div.innerHTML = `
                <div class="skill-tree-icon">${skill.icon}</div>
                <div class="skill-tree-name">${skill.name}</div>
                <div class="skill-tree-desc">${skill.description}</div>
                <div class="skill-tree-cost">Cost: ${unlocked ? 'Unlocked' : '1 Skill Point'}</div>
            `;

            if (!unlocked) {
                div.addEventListener('click', () => {
                    if (this.player.skillPoints > 0) {
                        this.player.skillPoints--;
                        this.player.unlockedSkills.push(id);
                        this.player.skills.push(skill);
                        this.renderSkillTree();
                        this.addMessage(`Unlocked ${skill.name}!`, 'success');
                    }
                });
            }

            skillTree.appendChild(div);
        }
    }

    updateCombatUI() {
        const enemy = this.currentEnemy;

        document.getElementById('enemy-name').textContent = enemy.name;
        document.getElementById('enemy-icon').textContent = enemy.icon;

        const hpPercent = (enemy.hp / enemy.maxHp) * 100;
        document.getElementById('enemy-hp-bar').style.width = hpPercent + '%';
        document.getElementById('enemy-hp-text').textContent = `${Math.max(0, Math.floor(enemy.hp))}/${enemy.maxHp}`;

        document.getElementById('enemy-stats').innerHTML = `
            Level ${enemy.level} | ATK: ${enemy.damage} | DEF: ${enemy.defense} | AGI: ${enemy.agility}
        `;
    }

    updateUI() {
        // Player stats
        document.getElementById('player-icon').textContent = this.player.icon;
        document.getElementById('player-level').textContent = this.player.level;
        document.getElementById('player-class').textContent = this.player.className.charAt(0).toUpperCase() + this.player.className.slice(1);

        // HP/Mana/XP bars
        const hpPercent = (this.player.hp / this.player.maxHp) * 100;
        document.getElementById('hp-bar').style.width = hpPercent + '%';
        document.getElementById('hp-text').textContent = `${Math.max(0, Math.floor(this.player.hp))}/${this.player.maxHp}`;

        const manaPercent = (this.player.mana / this.player.maxMana) * 100;
        document.getElementById('mana-bar').style.width = manaPercent + '%';
        document.getElementById('mana-text').textContent = `${Math.floor(this.player.mana)}/${this.player.maxMana}`;

        const xpPercent = (this.player.xp / this.player.xpToLevel) * 100;
        document.getElementById('xp-bar').style.width = xpPercent + '%';
        document.getElementById('xp-text').textContent = `${Math.floor(this.player.xp)}/${this.player.xpToLevel}`;

        // Stats
        const stats = this.player.getTotalStats();
        document.getElementById('stat-str').textContent = Math.floor(stats.strength);
        document.getElementById('stat-def').textContent = Math.floor(stats.defense);
        document.getElementById('stat-agi').textContent = Math.floor(stats.agility);
        document.getElementById('stat-mag').textContent = Math.floor(stats.magic);
        document.getElementById('stat-crit').textContent = Math.floor(stats.critChance) + '%';
        document.getElementById('stat-vision').textContent = stats.vision;

        // Equipment
        for (const slot in this.player.equipment) {
            const item = this.player.equipment[slot];
            const slotEl = document.querySelector(`[data-slot="${slot}"] .slot-item`);
            slotEl.textContent = item ? item.name : 'None';
        }

        // Inventory
        this.updateInventoryDisplay();

        // Game info
        document.getElementById('floor-number').textContent = this.floor;
        document.getElementById('gold-amount').textContent = this.player.gold;
        document.getElementById('score-amount').textContent = this.player.score;

        // Message log
        this.updateMessageLog();

        // Skills
        this.updateSkillsDisplay();
    }

    updateInventoryDisplay() {
        const slots = document.querySelectorAll('.inventory-slot');

        for (let i = 0; i < slots.length; i++) {
            const slot = slots[i];
            const item = this.player.inventory[i];

            if (item) {
                slot.className = `inventory-slot ${item.rarity}`;
                slot.textContent = item.icon;

                if (item.stackable && item.quantity > 1) {
                    const stackDiv = document.createElement('div');
                    stackDiv.className = 'item-stack';
                    stackDiv.textContent = item.quantity;
                    slot.appendChild(stackDiv);
                }

                slot.onclick = () => this.showItemDetails(item);
            } else {
                slot.className = 'inventory-slot empty';
                slot.textContent = '';
                slot.onclick = null;
            }
        }

        document.getElementById('inventory-count').textContent =
            `(${this.player.inventory.length}/${this.player.maxInventorySize})`;
    }

    showItemDetails(item) {
        const modal = document.getElementById('item-modal');
        modal.classList.remove('hidden');

        document.getElementById('item-modal-title').textContent = item.name;

        let content = `<div class="item-rarity ${item.rarity}">${item.rarity.toUpperCase()}</div>`;
        content += `<div class="item-icon" style="font-size: 3rem; text-align: center; margin: 1rem 0;">${item.icon}</div>`;
        content += `<div class="item-type">${item.type}</div>`;

        if (item.stats) {
            content += '<div class="item-stats"><h4>Stats:</h4><ul>';
            for (const stat in item.stats) {
                content += `<li>${stat.toUpperCase()}: +${item.stats[stat]}</li>`;
            }
            content += '</ul></div>';
        }

        if (item.effect) {
            content += '<div class="item-effect"><h4>Effect:</h4>';
            content += JSON.stringify(item.effect);
            content += '</div>';
        }

        content += `<div class="item-value">Value: ${item.value} gold</div>`;

        document.getElementById('item-modal-content').innerHTML = content;

        // Setup buttons
        const useBtn = document.getElementById('item-use-btn');
        const equipBtn = document.getElementById('item-equip-btn');
        const dropBtn = document.getElementById('item-drop-btn');

        useBtn.style.display = (item.type === ITEM_TYPES.POTION || item.type === ITEM_TYPES.SCROLL) ? 'inline-block' : 'none';
        equipBtn.style.display = (item.type === ITEM_TYPES.WEAPON || item.type === ITEM_TYPES.ARMOR ||
                                   item.type === ITEM_TYPES.SHIELD || item.type === ITEM_TYPES.RING ||
                                   item.type === ITEM_TYPES.AMULET) ? 'inline-block' : 'none';

        useBtn.onclick = () => {
            const result = this.player.useItem(item);
            this.addMessage(result, 'success');
            modal.classList.add('hidden');
            this.updateUI();
        };

        equipBtn.onclick = () => {
            this.player.equipItem(item);
            this.addMessage(`Equipped ${item.name}`, 'success');
            modal.classList.add('hidden');
            this.updateUI();
        };

        dropBtn.onclick = () => {
            const index = this.player.inventory.indexOf(item);
            this.player.inventory.splice(index, 1);
            this.addMessage(`Dropped ${item.name}`, 'info');
            modal.classList.add('hidden');
            this.updateUI();
        };
    }

    updateSkillsDisplay() {
        const container = document.getElementById('skills-container');
        container.innerHTML = '';

        for (const skill of this.player.skills) {
            const skillId = Object.keys(SKILL_TEMPLATES).find(key => SKILL_TEMPLATES[key] === skill);
            const cooldown = this.player.skillCooldowns[skillId] || 0;

            const div = document.createElement('div');
            div.className = `skill-slot ${cooldown > 0 ? 'on-cooldown' : ''}`;

            div.innerHTML = `
                <span class="skill-icon">${skill.icon}</span>
                <div class="skill-info">
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-cooldown">${cooldown > 0 ? `Cooldown: ${cooldown}` : 'Ready'}</div>
                </div>
            `;

            container.appendChild(div);
        }
    }

    addMessage(text, type = '') {
        this.messageLog.push({ text, type, time: Date.now() });

        // Keep only last 50 messages
        if (this.messageLog.length > 50) {
            this.messageLog.shift();
        }

        this.updateMessageLog();
    }

    updateMessageLog() {
        const logDiv = document.getElementById('message-log');
        logDiv.innerHTML = '';

        for (const msg of this.messageLog.slice(-15)) {
            const div = document.createElement('div');
            div.className = `message ${msg.type}`;
            div.textContent = msg.text;
            logDiv.appendChild(div);
        }

        logDiv.scrollTop = logDiv.scrollHeight;
    }

    render() {
        const vision = this.player.stats.vision;

        // Set canvas size
        const viewWidth = Math.min(25, this.world.width);
        const viewHeight = Math.min(19, this.world.height);

        this.canvas.width = viewWidth * TILE_SIZE;
        this.canvas.height = viewHeight * TILE_SIZE;

        // Calculate camera offset
        const cameraX = clamp(this.player.x - Math.floor(viewWidth / 2), 0, this.world.width - viewWidth);
        const cameraY = clamp(this.player.y - Math.floor(viewHeight / 2), 0, this.world.height - viewHeight);

        // Clear canvas
        this.ctx.fillStyle = '#000000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Render tiles
        for (let y = 0; y < viewHeight; y++) {
            for (let x = 0; x < viewWidth; x++) {
                const worldX = x + cameraX;
                const worldY = y + cameraY;

                if (worldX >= this.world.width || worldY >= this.world.height) continue;

                const dist = distance(worldX, worldY, this.player.x, this.player.y);

                if (dist > vision) {
                    // Fog of war
                    this.ctx.fillStyle = '#0a0a0a';
                    this.ctx.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    continue;
                }

                const tile = this.world.tiles[worldY][worldX];
                const screenX = x * TILE_SIZE;
                const screenY = y * TILE_SIZE;

                // Tile colors
                let color = '#000000';
                let symbol = '';

                switch(tile) {
                    case TILE_TYPES.GRASS:
                        color = '#4a7c2f';
                        if (random(1, 10) > 7) symbol = '🌿';
                        break;
                    case TILE_TYPES.WATER:
                        color = '#2b5f9e';
                        symbol = '💧';
                        break;
                    case TILE_TYPES.TREE:
                        color = '#2d5016';
                        symbol = '🌲';
                        break;
                    case TILE_TYPES.MOUNTAIN:
                        color = '#6b6b6b';
                        symbol = '⛰️';
                        break;
                    case TILE_TYPES.SAND:
                        color = '#daa520';
                        break;
                    case TILE_TYPES.STONE:
                        color = '#808080';
                        break;
                    case TILE_TYPES.TOWN:
                        color = '#8b4513';
                        symbol = '🏘️';
                        break;
                    case TILE_TYPES.SHOP:
                        color = '#cd853f';
                        symbol = '🏪';
                        break;
                    case TILE_TYPES.SHRINE:
                        color = '#6a5acd';
                        symbol = '⛩️';
                        break;
                    case TILE_TYPES.TREASURE:
                        color = '#ffd700';
                        symbol = '💎';
                        break;
                    case TILE_TYPES.DUNGEON_ENTRANCE:
                        color = '#2f2f2f';
                        symbol = '🚪';
                        break;
                    case TILE_TYPES.ROAD:
                        color = '#8b7355';
                        break;
                    case TILE_TYPES.BRIDGE:
                        color = '#a0522d';
                        symbol = '🌉';
                        break;
                    case TILE_TYPES.CAVE:
                        color = '#3d3d3d';
                        symbol = '🕳️';
                        break;
                    case TILE_TYPES.RUINS:
                        color = '#a9a9a9';
                        symbol = '🏛️';
                        break;
                    default:
                        color = '#1a1a1a';
                        break;
                }

                this.ctx.fillStyle = color;
                this.ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);

                if (symbol) {
                    this.ctx.fillStyle = '#f4e4c1';
                    this.ctx.font = `${TILE_SIZE - 8}px Arial`;
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillText(symbol, screenX + TILE_SIZE / 2, screenY + TILE_SIZE / 2);
                }

                // Draw grid
                this.ctx.strokeStyle = '#2d2418';
                this.ctx.strokeRect(screenX, screenY, TILE_SIZE, TILE_SIZE);
            }
        }

        // Render items
        for (const item of this.world.items) {
            const dist = distance(item.x, item.y, this.player.x, this.player.y);
            if (dist <= vision) {
                const screenX = (item.x - cameraX) * TILE_SIZE;
                const screenY = (item.y - cameraY) * TILE_SIZE;

                this.ctx.font = `${TILE_SIZE - 4}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(item.icon, screenX + TILE_SIZE / 2, screenY + TILE_SIZE / 2);
            }
        }

        // Render enemies
        for (const enemy of this.world.enemies) {
            if (enemy.hp <= 0) continue;

            const dist = distance(enemy.x, enemy.y, this.player.x, this.player.y);
            if (dist <= vision) {
                const screenX = (enemy.x - cameraX) * TILE_SIZE;
                const screenY = (enemy.y - cameraY) * TILE_SIZE;

                // Enemy background
                this.ctx.fillStyle = 'rgba(139, 0, 0, 0.5)';
                this.ctx.fillRect(screenX, screenY, TILE_SIZE, TILE_SIZE);

                this.ctx.font = `${TILE_SIZE - 4}px Arial`;
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                this.ctx.fillText(enemy.icon, screenX + TILE_SIZE / 2, screenY + TILE_SIZE / 2);
            }
        }

        // Apply screen shake
        let shakeX = 0, shakeY = 0;
        if (this.shakeAmount > 0) {
            shakeX = (Math.random() - 0.5) * this.shakeAmount;
            shakeY = (Math.random() - 0.5) * this.shakeAmount;
            this.ctx.save();
            this.ctx.translate(shakeX, shakeY);
        }

        // Render player
        const playerScreenX = (this.player.x - cameraX) * TILE_SIZE;
        const playerScreenY = (this.player.y - cameraY) * TILE_SIZE;

        this.ctx.fillStyle = 'rgba(212, 175, 55, 0.3)';
        this.ctx.fillRect(playerScreenX, playerScreenY, TILE_SIZE, TILE_SIZE);

        this.ctx.font = `${TILE_SIZE - 4}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(this.player.icon, playerScreenX + TILE_SIZE / 2, playerScreenY + TILE_SIZE / 2);

        // Restore from shake
        if (this.shakeAmount > 0) {
            this.ctx.restore();
        }

        // Render floating damage numbers
        for (const text of this.floatingTexts) {
            const screenX = (text.x - cameraX) * TILE_SIZE + TILE_SIZE / 2;
            const screenY = (text.y - cameraY) * TILE_SIZE;

            this.ctx.save();
            this.ctx.globalAlpha = text.alpha;
            this.ctx.font = text.isCrit ? 'bold 24px Arial' : 'bold 18px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            this.ctx.strokeStyle = '#000000';
            this.ctx.lineWidth = 3;
            this.ctx.strokeText(text.text, screenX, screenY);
            this.ctx.fillStyle = text.color;
            this.ctx.fillText(text.text, screenX, screenY);
            this.ctx.restore();
        }
    }

    // ========================================================================
    // TOWN & NPC SYSTEM
    // ========================================================================

    enterTown(town) {
        this.addMessage(`Welcome to ${town.name}!`, 'success');
        this.showTownMenu(town);
    }

    showTownMenu(town) {
        const modal = document.createElement('div');
        modal.className = 'modal town-modal';
        modal.innerHTML = `
            <div class="modal-content large-modal">
                <div class="modal-header">
                    <h2>${town.name}</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="town-description">
                        <p>${this.getTownDescription(town)}</p>
                    </div>
                    <div class="town-actions">
                        ${town.hasShop ? '<button class="action-btn large" data-action="shop">🏪 Visit Shop</button>' : ''}
                        ${town.hasInn ? '<button class="action-btn large" data-action="inn">🏨 Rest at Inn (50 gold)</button>' : ''}
                        <button class="action-btn large" data-action="quests">📜 Quest Board</button>
                        <button class="action-btn large" data-action="guild">⚔️ Adventurer's Guild</button>
                        <button class="action-btn large" data-action="npcs">💬 Talk to NPCs</button>
                        <button class="action-btn large" data-action="craft">🔨 Crafting Station</button>
                        <button class="action-btn large" data-action="cook">🍖 Cooking Pot</button>
                        <button class="action-btn large" data-action="leave">🚪 Leave Town</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelectorAll('.action-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                modal.remove();

                switch(action) {
                    case 'shop':
                        this.openShop(town);
                        break;
                    case 'inn':
                        this.restAtInn();
                        break;
                    case 'quests':
                        this.showQuestBoard(town);
                        break;
                    case 'guild':
                        this.showGuild(town);
                        break;
                    case 'npcs':
                        this.talkToNPCs(town);
                        break;
                    case 'craft':
                        this.openCraftingStation();
                        break;
                    case 'cook':
                        this.openCookingPot();
                        break;
                    case 'leave':
                        // Just close modal
                        break;
                }
            });
        });
    }

    getTownDescription(town) {
        const descriptions = {
            'starting': 'A peaceful village where heroes are summoned. The locals are friendly and welcoming.',
            [BIOME_TYPES.PLAINS]: 'A thriving settlement surrounded by fertile farmland.',
            [BIOME_TYPES.FOREST]: 'A town built among ancient trees, home to skilled woodworkers and rangers.',
            [BIOME_TYPES.MOUNTAINS]: 'A hardy mountain settlement known for its miners and smiths.',
            [BIOME_TYPES.DESERT]: 'An oasis town, a refuge in the endless sands.',
            [BIOME_TYPES.DARK_FOREST]: 'A mysterious village shrouded in shadows, home to dark mages and necromancers.'
        };
        return descriptions[town.type] || 'A settlement in the wilderness.';
    }

    restAtInn() {
        if (this.player.gold >= 50) {
            this.player.gold -= 50;
            this.player.hp = this.player.maxHp;
            this.player.mana = this.player.maxMana;
            this.player.buffs = [];
            this.addMessage('You rest at the inn and feel fully refreshed!', 'success');
            this.advanceTime();
        } else {
            this.addMessage('You need 50 gold to rest at the inn.', 'warning');
        }
        this.updateUI();
    }

    // ========================================================================
    // SHOP SYSTEM
    // ========================================================================

    openShop(town) {
        const shopItems = this.generateShopInventory(town);

        const modal = document.createElement('div');
        modal.className = 'modal shop-modal';
        modal.innerHTML = `
            <div class="modal-content large-modal">
                <div class="modal-header">
                    <h2>🏪 ${town.name} - General Store</h2>
                    <div class="player-gold">Your Gold: <span class="gold-amount">${this.player.gold}</span></div>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="shop-tabs">
                        <button class="shop-tab active" data-tab="buy">Buy</button>
                        <button class="shop-tab" data-tab="sell">Sell</button>
                    </div>
                    <div class="shop-content">
                        <div class="shop-panel buy-panel active">
                            <div class="shop-items" id="shop-buy-items"></div>
                        </div>
                        <div class="shop-panel sell-panel">
                            <div class="shop-items" id="shop-sell-items"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Populate buy items
        const buyPanel = modal.querySelector('#shop-buy-items');
        shopItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = `shop-item ${item.rarity}`;
            itemDiv.innerHTML = `
                <div class="item-icon">${item.icon}</div>
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${item.value} gold</div>
                </div>
                <button class="buy-btn" data-item="${item.id}">Buy</button>
            `;
            buyPanel.appendChild(itemDiv);

            itemDiv.querySelector('.buy-btn').addEventListener('click', () => {
                this.buyItem(item, modal);
            });
        });

        // Populate sell items
        const sellPanel = modal.querySelector('#shop-sell-items');
        this.player.inventory.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = `shop-item ${item.rarity}`;
            const sellPrice = Math.floor(item.value * 0.5);
            itemDiv.innerHTML = `
                <div class="item-icon">${item.icon}</div>
                <div class="item-info">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${sellPrice} gold</div>
                </div>
                <button class="sell-btn" data-index="${index}">Sell</button>
            `;
            sellPanel.appendChild(itemDiv);

            itemDiv.querySelector('.sell-btn').addEventListener('click', () => {
                this.sellItem(index, sellPrice, modal);
            });
        });

        // Tab switching
        modal.querySelectorAll('.shop-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                modal.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
                modal.querySelectorAll('.shop-panel').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                modal.querySelector(`.${tab.dataset.tab}-panel`).classList.add('active');
            });
        });

        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });
    }

    generateShopInventory(town) {
        const items = [];
        let id = 0;

        // Always have potions
        items.push({ ...ITEM_TEMPLATES.health_potion, id: id++ });
        items.push({ ...ITEM_TEMPLATES.health_potion, id: id++ });
        items.push({ ...ITEM_TEMPLATES.greater_health_potion, id: id++ });
        items.push({ ...ITEM_TEMPLATES.mana_potion, id: id++ });

        // Random equipment based on town type
        const equipmentPool = Object.values(ITEM_TEMPLATES).filter(item =>
            item.type === ITEM_TYPES.WEAPON ||
            item.type === ITEM_TYPES.ARMOR ||
            item.type === ITEM_TYPES.SHIELD
        );

        for (let i = 0; i < 5; i++) {
            const item = { ...randomChoice(equipmentPool), id: id++ };
            items.push(item);
        }

        // Add some accessories
        items.push({ ...ITEM_TEMPLATES.ring_of_strength, id: id++ });
        items.push({ ...ITEM_TEMPLATES.amulet_of_health, id: id++ });

        return items;
    }

    buyItem(item, modal) {
        if (this.player.gold >= item.value) {
            if (this.player.inventory.length < this.player.maxInventorySize) {
                this.player.gold -= item.value;
                const newItem = { ...item };
                delete newItem.id;
                this.player.addItem(newItem);
                this.addMessage(`Purchased ${item.name} for ${item.value} gold!`, 'success');
                modal.querySelector('.gold-amount').textContent = this.player.gold;
                this.updateUI();
            } else {
                this.addMessage('Inventory full!', 'warning');
            }
        } else {
            this.addMessage('Not enough gold!', 'warning');
        }
    }

    sellItem(index, price, modal) {
        const item = this.player.inventory[index];
        if (item) {
            this.player.inventory.splice(index, 1);
            this.player.gold += price;
            this.addMessage(`Sold ${item.name} for ${price} gold!`, 'success');
            modal.remove();
            this.updateUI();
        }
    }

    // ========================================================================
    // QUEST SYSTEM
    // ========================================================================

    initializeQuests() {
        this.allQuests = [
            {
                id: 'slime_slayer',
                name: 'Slime Slayer',
                description: 'Defeat 10 slimes in the plains.',
                type: 'kill',
                target: 'slime',
                required: 10,
                current: 0,
                rewards: { xp: 100, gold: 50, item: 'iron_sword' },
                repeatable: false
            },
            {
                id: 'forest_protector',
                name: 'Forest Protector',
                description: 'Clear the forest of 15 hostile creatures.',
                type: 'kill_biome',
                biome: BIOME_TYPES.FOREST,
                required: 15,
                current: 0,
                rewards: { xp: 200, gold: 100, reputation: 50 },
                repeatable: false
            },
            {
                id: 'treasure_hunter',
                name: 'Treasure Hunter',
                description: 'Find and open 5 treasure chests.',
                type: 'collect',
                target: 'chest',
                required: 5,
                current: 0,
                rewards: { xp: 150, gold: 200 },
                repeatable: true
            },
            {
                id: 'mountain_expedition',
                name: 'Mountain Expedition',
                description: 'Explore 3 caves in the mountains.',
                type: 'explore',
                target: 'cave',
                required: 3,
                current: 0,
                rewards: { xp: 250, gold: 150, item: 'stone_golem' },
                repeatable: false
            },
            {
                id: 'dark_forest_challenge',
                name: 'Dark Forest Challenge',
                description: 'Survive and defeat the Dark Knight in the Dark Forest.',
                type: 'boss',
                target: 'dark_knight',
                required: 1,
                current: 0,
                rewards: { xp: 500, gold: 300, item: 'dragon_slayer' },
                repeatable: false
            },
            {
                id: 'herb_gathering',
                name: 'Herb Gathering',
                description: 'Collect 20 herbs from the plains.',
                type: 'gather',
                target: 'herb',
                required: 20,
                current: 0,
                rewards: { xp: 75, gold: 30 },
                repeatable: true
            },
            {
                id: 'ancient_ruins',
                name: 'Ancient Ruins Explorer',
                description: 'Investigate all ruins in the desert.',
                type: 'explore',
                target: 'ruins',
                required: 3,
                current: 0,
                rewards: { xp: 300, gold: 250, item: 'phoenix_pendant' },
                repeatable: false
            },
            {
                id: 'master_craftsman',
                name: 'Master Craftsman',
                description: 'Craft 10 different items.',
                type: 'craft',
                required: 10,
                current: 0,
                rewards: { xp: 200, gold: 100 },
                repeatable: false
            }
        ];

        this.quests = [...this.allQuests];
    }

    showQuestBoard(town) {
        const modal = document.createElement('div');
        modal.className = 'modal quest-modal';

        const availableQuests = this.quests.filter(q => !this.activeQuests.includes(q) && !this.completedQuests.includes(q.id));

        modal.innerHTML = `
            <div class="modal-content large-modal">
                <div class="modal-header">
                    <h2>📜 Quest Board</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="quest-tabs">
                        <button class="quest-tab active" data-tab="available">Available (${availableQuests.length})</button>
                        <button class="quest-tab" data-tab="active">Active (${this.activeQuests.length})</button>
                        <button class="quest-tab" data-tab="completed">Completed (${this.completedQuests.length})</button>
                    </div>
                    <div class="quest-content">
                        <div class="quest-panel available-panel active" id="available-quests"></div>
                        <div class="quest-panel active-panel" id="active-quests"></div>
                        <div class="quest-panel completed-panel" id="completed-quests"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Populate available quests
        const availablePanel = modal.querySelector('#available-quests');
        availableQuests.forEach(quest => {
            const questDiv = this.createQuestElement(quest, 'accept');
            availablePanel.appendChild(questDiv);
        });

        // Populate active quests
        const activePanel = modal.querySelector('#active-quests');
        this.activeQuests.forEach(quest => {
            const questDiv = this.createQuestElement(quest, 'view');
            activePanel.appendChild(questDiv);
        });

        // Populate completed quests
        const completedPanel = modal.querySelector('#completed-quests');
        this.completedQuests.forEach(questId => {
            const quest = this.allQuests.find(q => q.id === questId);
            if (quest) {
                const questDiv = this.createQuestElement(quest, 'completed');
                completedPanel.appendChild(questDiv);
            }
        });

        // Tab switching
        modal.querySelectorAll('.quest-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                modal.querySelectorAll('.quest-tab').forEach(t => t.classList.remove('active'));
                modal.querySelectorAll('.quest-panel').forEach(p => p.classList.remove('active'));
                tab.classList.add('active');
                modal.querySelector(`.${tab.dataset.tab}-panel`).classList.add('active');
            });
        });

        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });
    }

    createQuestElement(quest, action) {
        const div = document.createElement('div');
        div.className = 'quest-item';

        const progress = action === 'view' ? `<div class="quest-progress">${quest.current}/${quest.required}</div>` : '';
        const rewardText = this.formatQuestRewards(quest.rewards);

        div.innerHTML = `
            <div class="quest-header">
                <h3>${quest.name}</h3>
                ${quest.repeatable ? '<span class="repeatable-tag">Repeatable</span>' : ''}
            </div>
            <p class="quest-description">${quest.description}</p>
            ${progress}
            <div class="quest-rewards">
                <strong>Rewards:</strong> ${rewardText}
            </div>
            ${action === 'accept' ? '<button class="accept-quest-btn">Accept Quest</button>' : ''}
            ${action === 'view' && quest.current >= quest.required ? '<button class="complete-quest-btn">Complete Quest</button>' : ''}
        `;

        if (action === 'accept') {
            div.querySelector('.accept-quest-btn').addEventListener('click', () => {
                this.acceptQuest(quest);
                div.remove();
            });
        } else if (action === 'view' && quest.current >= quest.required) {
            div.querySelector('.complete-quest-btn').addEventListener('click', () => {
                this.completeQuest(quest);
                div.remove();
            });
        }

        return div;
    }

    formatQuestRewards(rewards) {
        const parts = [];
        if (rewards.xp) parts.push(`${rewards.xp} XP`);
        if (rewards.gold) parts.push(`${rewards.gold} Gold`);
        if (rewards.item) parts.push(`Item: ${rewards.item}`);
        if (rewards.reputation) parts.push(`+${rewards.reputation} Reputation`);
        return parts.join(', ');
    }

    acceptQuest(quest) {
        this.activeQuests.push(quest);
        this.addMessage(`Quest accepted: ${quest.name}`, 'success');
    }

    completeQuest(quest) {
        const index = this.activeQuests.indexOf(quest);
        if (index > -1) {
            this.activeQuests.splice(index, 1);
        }

        // Give rewards
        if (quest.rewards.xp) {
            const levels = this.player.gainXp(quest.rewards.xp);
            this.addMessage(`+${quest.rewards.xp} XP`, 'success');
        }
        if (quest.rewards.gold) {
            this.player.gold += quest.rewards.gold;
            this.addMessage(`+${quest.rewards.gold} Gold`, 'success');
        }
        if (quest.rewards.item) {
            const item = ITEM_TEMPLATES[quest.rewards.item];
            if (item) {
                this.player.addItem({...item});
                this.addMessage(`Received: ${item.name}!`, 'success');
            }
        }
        if (quest.rewards.reputation) {
            this.reputation.starter_village += quest.rewards.reputation;
        }

        if (!quest.repeatable) {
            this.completedQuests.push(quest.id);
        } else {
            // Reset for repeatable quests
            quest.current = 0;
        }

        this.addMessage(`Quest completed: ${quest.name}!`, 'success');
        this.checkAchievement('quest_completer');
        this.updateUI();
    }

    updateQuestProgress(type, target, amount = 1) {
        for (const quest of this.activeQuests) {
            if (quest.type === type) {
                if (!target || quest.target === target || quest.biome === target) {
                    quest.current += amount;
                    if (quest.current >= quest.required) {
                        this.addMessage(`Quest ready to complete: ${quest.name}!`, 'warning');
                    }
                }
            }
        }
    }

    // ========================================================================
    // CRAFTING SYSTEM
    // ========================================================================

    initializeCrafting() {
        this.craftingRecipes = [
            {
                id: 'healing_salve',
                name: 'Healing Salve',
                result: { ...ITEM_TEMPLATES.health_potion },
                ingredients: [
                    { name: 'Herb', quantity: 3, icon: '🌿' },
                    { name: 'Water', quantity: 1, icon: '💧' }
                ],
                category: 'alchemy',
                level: 1
            },
            {
                id: 'iron_sword_craft',
                name: 'Iron Sword',
                result: { ...ITEM_TEMPLATES.iron_sword },
                ingredients: [
                    { name: 'Iron Ore', quantity: 5, icon: '⛏️' },
                    { name: 'Wood', quantity: 2, icon: '🪵' }
                ],
                category: 'smithing',
                level: 2
            },
            {
                id: 'leather_armor_craft',
                name: 'Leather Armor',
                result: { ...ITEM_TEMPLATES.leather_armor },
                ingredients: [
                    { name: 'Leather', quantity: 8, icon: '🦴' },
                    { name: 'Thread', quantity: 5, icon: '🧵' }
                ],
                category: 'leatherworking',
                level: 1
            },
            {
                id: 'mana_crystal',
                name: 'Mana Crystal',
                result: { ...ITEM_TEMPLATES.mana_potion },
                ingredients: [
                    { name: 'Crystal Shard', quantity: 2, icon: '💎' },
                    { name: 'Magic Essence', quantity: 3, icon: '✨' }
                ],
                category: 'alchemy',
                level: 3
            },
            {
                id: 'steel_greatsword_craft',
                name: 'Steel Greatsword',
                result: { ...ITEM_TEMPLATES.steel_greatsword },
                ingredients: [
                    { name: 'Steel Ingot', quantity: 10, icon: '⚙️' },
                    { name: 'Leather Grip', quantity: 3, icon: '🦴' },
                    { name: 'Gem', quantity: 1, icon: '💎' }
                ],
                category: 'smithing',
                level: 5
            }
        ];

        this.knownRecipes = ['healing_salve', 'iron_sword_craft', 'leather_armor_craft'];
        this.craftedItems = [];
    }

    openCraftingStation() {
        const modal = document.createElement('div');
        modal.className = 'modal crafting-modal';

        modal.innerHTML = `
            <div class="modal-content large-modal">
                <div class="modal-header">
                    <h2>🔨 Crafting Station</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="crafting-categories">
                        <button class="category-btn active" data-category="all">All</button>
                        <button class="category-btn" data-category="smithing">Smithing</button>
                        <button class="category-btn" data-category="alchemy">Alchemy</button>
                        <button class="category-btn" data-category="leatherworking">Leatherworking</button>
                    </div>
                    <div class="crafting-recipes" id="crafting-recipes"></div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        this.displayCraftingRecipes(modal, 'all');

        modal.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                modal.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.displayCraftingRecipes(modal, btn.dataset.category);
            });
        });

        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });
    }

    displayCraftingRecipes(modal, category) {
        const recipesDiv = modal.querySelector('#crafting-recipes');
        recipesDiv.innerHTML = '';

        const recipes = this.craftingRecipes.filter(r =>
            this.knownRecipes.includes(r.id) && (category === 'all' || r.category === category)
        );

        recipes.forEach(recipe => {
            const div = document.createElement('div');
            div.className = 'recipe-item';

            const ingredientsHtml = recipe.ingredients.map(ing => {
                const hasEnough = this.hasIngredient(ing.name, ing.quantity);
                return `<div class="ingredient ${hasEnough ? 'has' : 'missing'}">
                    ${ing.icon} ${ing.name} (${ing.quantity})
                </div>`;
            }).join('');

            const canCraft = recipe.ingredients.every(ing => this.hasIngredient(ing.name, ing.quantity));

            div.innerHTML = `
                <div class="recipe-result">
                    <div class="result-icon">${recipe.result.icon}</div>
                    <div class="result-name">${recipe.name}</div>
                </div>
                <div class="recipe-ingredients">
                    ${ingredientsHtml}
                </div>
                <button class="craft-btn" ${!canCraft ? 'disabled' : ''}>Craft</button>
            `;

            if (canCraft) {
                div.querySelector('.craft-btn').addEventListener('click', () => {
                    this.craftItem(recipe);
                    this.displayCraftingRecipes(modal, category);
                });
            }

            recipesDiv.appendChild(div);
        });
    }

    hasIngredient(name, quantity) {
        // For now, simulate having ingredients based on player level
        return this.player.level >= Math.floor(quantity / 2);
    }

    craftItem(recipe) {
        // Remove ingredients (simulated for now)
        // Add result
        if (this.player.addItem({...recipe.result})) {
            this.addMessage(`Crafted ${recipe.name}!`, 'success');
            this.craftedItems.push(recipe.id);
            this.updateQuestProgress('craft', null, 1);
            this.checkAchievement('master_crafter');
            this.updateUI();
        } else {
            this.addMessage('Inventory full!', 'warning');
        }
    }

    // ========================================================================
    // COOKING SYSTEM
    // ========================================================================

    initializeCooking() {
        this.cookingRecipes = [
            {
                id: 'grilled_meat',
                name: 'Grilled Meat',
                result: { name: 'Grilled Meat', icon: '🍖', type: 'food', effect: { heal: 40, buff_str: 2, duration: 5 }, stackable: true },
                ingredients: [
                    { name: 'Raw Meat', quantity: 1, icon: '🥩' }
                ]
            },
            {
                id: 'herb_soup',
                name: 'Herb Soup',
                result: { name: 'Herb Soup', icon: '🍲', type: 'food', effect: { heal: 30, buff_def: 3, duration: 10 }, stackable: true },
                ingredients: [
                    { name: 'Herb', quantity: 3, icon: '🌿' },
                    { name: 'Water', quantity: 1, icon: '💧' }
                ]
            },
            {
                id: 'energy_stew',
                name: 'Energy Stew',
                result: { name: 'Energy Stew', icon: '🥘', type: 'food', effect: { heal: 50, buff_agi: 3, duration: 8 }, stackable: true },
                ingredients: [
                    { name: 'Vegetable', quantity: 2, icon: '🥕' },
                    { name: 'Raw Meat', quantity: 1, icon: '🥩' },
                    { name: 'Herb', quantity: 1, icon: '🌿' }
                ]
            },
            {
                id: 'mage_bread',
                name: 'Mage Bread',
                result: { name: 'Mage Bread', icon: '🍞', type: 'food', effect: { mana: 40, buff_mag: 4, duration: 10 }, stackable: true },
                ingredients: [
                    { name: 'Wheat', quantity: 3, icon: '🌾' },
                    { name: 'Magic Essence', quantity: 1, icon: '✨' }
                ]
            },
            {
                id: 'dragon_feast',
                name: 'Dragon Feast',
                result: { name: 'Dragon Feast', icon: '🍗', type: 'food', effect: { heal: 100, buff_str: 5, buff_def: 5, duration: 20 }, stackable: true },
                ingredients: [
                    { name: 'Dragon Meat', quantity: 1, icon: '🐉' },
                    { name: 'Rare Herb', quantity: 3, icon: '🌺' },
                    { name: 'Magic Essence', quantity: 2, icon: '✨' }
                ]
            }
        ];
    }

    openCookingPot() {
        const modal = document.createElement('div');
        modal.className = 'modal cooking-modal';

        modal.innerHTML = `
            <div class="modal-content large-modal">
                <div class="modal-header">
                    <h2>🍖 Cooking Pot</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <p class="cooking-intro">Cook delicious meals to restore health and gain powerful buffs!</p>
                    <div class="cooking-recipes" id="cooking-recipes"></div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const recipesDiv = modal.querySelector('#cooking-recipes');
        this.cookingRecipes.forEach(recipe => {
            const div = document.createElement('div');
            div.className = 'recipe-item';

            const ingredientsHtml = recipe.ingredients.map(ing => {
                const hasEnough = this.hasIngredient(ing.name, ing.quantity);
                return `<div class="ingredient ${hasEnough ? 'has' : 'missing'}">
                    ${ing.icon} ${ing.name} (${ing.quantity})
                </div>`;
            }).join('');

            const canCook = recipe.ingredients.every(ing => this.hasIngredient(ing.name, ing.quantity));

            div.innerHTML = `
                <div class="recipe-result">
                    <div class="result-icon">${recipe.result.icon}</div>
                    <div class="result-name">${recipe.name}</div>
                </div>
                <div class="recipe-ingredients">
                    ${ingredientsHtml}
                </div>
                <div class="recipe-effects">
                    ${this.formatFoodEffects(recipe.result.effect)}
                </div>
                <button class="cook-btn" ${!canCook ? 'disabled' : ''}>Cook</button>
            `;

            if (canCook) {
                div.querySelector('.cook-btn').addEventListener('click', () => {
                    this.cookFood(recipe);
                    modal.remove();
                });
            }

            recipesDiv.appendChild(div);
        });

        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });
    }

    formatFoodEffects(effect) {
        const parts = [];
        if (effect.heal) parts.push(`Heal ${effect.heal} HP`);
        if (effect.mana) parts.push(`Restore ${effect.mana} Mana`);
        if (effect.buff_str) parts.push(`+${effect.buff_str} STR (${effect.duration} turns)`);
        if (effect.buff_def) parts.push(`+${effect.buff_def} DEF (${effect.duration} turns)`);
        if (effect.buff_agi) parts.push(`+${effect.buff_agi} AGI (${effect.duration} turns)`);
        if (effect.buff_mag) parts.push(`+${effect.buff_mag} MAG (${effect.duration} turns)`);
        return parts.join(', ');
    }

    cookFood(recipe) {
        // Remove ingredients (simulated)
        // Add result
        if (this.player.addItem({...recipe.result})) {
            this.addMessage(`Cooked ${recipe.name}!`, 'success');
            this.checkAchievement('master_chef');
            this.updateUI();
        } else {
            this.addMessage('Inventory full!', 'warning');
        }
    }

    // ========================================================================
    // COMPANION/PET & NPC SYSTEM
    // ========================================================================

    talkToNPCs(town) {
        const npcs = this.generateNPCs(town);

        const modal = document.createElement('div');
        modal.className = 'modal npc-modal';

        modal.innerHTML = `
            <div class="modal-content large-modal">
                <div class="modal-header">
                    <h2>💬 Town NPCs</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="npc-list" id="npc-list"></div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const npcList = modal.querySelector('#npc-list');
        npcs.forEach(npc => {
            const div = document.createElement('div');
            div.className = 'npc-item';
            div.innerHTML = `
                <div class="npc-portrait">${npc.icon}</div>
                <div class="npc-info">
                    <h3>${npc.name}</h3>
                    <p class="npc-role">${npc.role}</p>
                </div>
                <button class="talk-btn">Talk</button>
            `;

            div.querySelector('.talk-btn').addEventListener('click', () => {
                modal.remove();
                this.showNPCDialogue(npc);
            });

            npcList.appendChild(div);
        });

        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });
    }

    generateNPCs(town) {
        return [
            { name: 'Elder Marcus', icon: '👴', role: 'Village Elder', dialogue: 'elder' },
            { name: 'Merchant Sarah', icon: '👩', role: 'General Merchant', dialogue: 'merchant' },
            { name: 'Blacksmith Grom', icon: '👨', role: 'Master Smith', dialogue: 'blacksmith' },
            { name: 'Mystic Luna', icon: '🧙‍♀️', role: 'Fortune Teller', dialogue: 'mystic' },
            { name: 'Guard Captain', icon: '💂', role: 'Town Guard', dialogue: 'guard' },
            { name: 'Innkeeper Tom', icon: '🧔', role: 'Inn Owner', dialogue: 'innkeeper' }
        ];
    }

    showNPCDialogue(npc) {
        const dialogues = {
            elder: [
                "Welcome, brave hero! Our town needs your help.",
                "Dark forces are gathering in the Dark Forest. Be careful.",
                "You show great promise. Keep training and you'll become legendary!"
            ],
            merchant: [
                "Looking to buy or sell? I have the best prices!",
                "Rare items come through here sometimes. Check back often!",
                "I heard there's treasure in the old ruins to the east."
            ],
            blacksmith: [
                "Need your equipment repaired? I'm your dwarf!",
                "I can forge legendary weapons, but I need rare materials.",
                "The dragon scales make the finest armor. Bring me some!"
            ],
            mystic: [
                "I see great destiny in your future...",
                "The stars speak of a coming darkness. Prepare yourself.",
                "Would you like me to read your fortune? (10 gold)"
            ],
            guard: [
                "Stay safe out there, adventurer.",
                "Monsters have been spotted near the mountains.",
                "If you see any bandits, report back to me."
            ],
            innkeeper: [
                "Rest your weary bones here, friend!",
                "Heard any good adventure stories lately?",
                "The special tonight is dragon stew. Just kidding!"
            ]
        };

        const dialogue = randomChoice(dialogues[npc.dialogue] || dialogues.elder);

        const modal = document.createElement('div');
        modal.className = 'modal dialogue-modal';

        modal.innerHTML = `
            <div class="modal-content">
                <div class="dialogue-header">
                    <span class="npc-portrait-large">${npc.icon}</span>
                    <h3>${npc.name}</h3>
                </div>
                <div class="dialogue-body">
                    <p class="dialogue-text">"${dialogue}"</p>
                    <div class="dialogue-options">
                        <button class="dialogue-btn">Continue</button>
                        ${npc.dialogue === 'mystic' ? '<button class="dialogue-btn fortune-btn">Get Fortune (10 gold)</button>' : ''}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.dialogue-btn').addEventListener('click', () => {
            modal.remove();
        });

        const fortuneBtn = modal.querySelector('.fortune-btn');
        if (fortuneBtn) {
            fortuneBtn.addEventListener('click', () => {
                if (this.player.gold >= 10) {
                    this.player.gold -= 10;
                    this.getFortune();
                    modal.remove();
                } else {
                    this.addMessage('Not enough gold!', 'warning');
                }
            });
        }
    }

    getFortune() {
        const fortunes = [
            "You will find great treasure soon...",
            "Beware of the shadows in the forest.",
            "A powerful ally will join your journey.",
            "Your greatest challenge awaits in the mountains.",
            "The spirits favor your quest.",
            "Luck will be on your side in your next battle."
        ];

        const fortune = randomChoice(fortunes);
        this.addMessage(`🔮 Fortune: ${fortune}`, 'info');

        // Give small random buff
        this.player.buffs.push({
            name: 'Fortune Blessing',
            duration: 20,
            strMod: 1.1,
            agiMod: 1.1
        });
    }

    // ========================================================================
    // GUILD SYSTEM
    // ========================================================================

    showGuild(town) {
        const modal = document.createElement('div');
        modal.className = 'modal guild-modal';

        modal.innerHTML = `
            <div class="modal-content large-modal">
                <div class="modal-header">
                    <h2>⚔️ Adventurer's Guild</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="guild-info">
                        <h3>Guild Rank: ${this.getGuildRank()}</h3>
                        <div class="reputation-bar">
                            <div class="rep-fill" style="width: ${Math.min(100, (this.reputation.adventurers_guild / 10))}%"></div>
                        </div>
                        <p>Reputation: ${this.reputation.adventurers_guild}/1000</p>
                    </div>
                    <div class="guild-services">
                        <button class="guild-btn" data-service="training">⚔️ Combat Training (100 gold)</button>
                        <button class="guild-btn" data-service="bounty">💰 Bounty Board</button>
                        <button class="guild-btn" data-service="party">👥 Find Companions</button>
                        <button class="guild-btn" data-service="storage">📦 Guild Storage</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelectorAll('.guild-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const service = btn.dataset.service;
                modal.remove();

                switch(service) {
                    case 'training':
                        this.combatTraining();
                        break;
                    case 'bounty':
                        this.showBountyBoard();
                        break;
                    case 'party':
                        this.findCompanions();
                        break;
                    case 'storage':
                        this.showGuildStorage();
                        break;
                }
            });
        });

        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });
    }

    getGuildRank() {
        const rep = this.reputation.adventurers_guild;
        if (rep >= 1000) return 'Legendary Hero';
        if (rep >= 500) return 'Master Adventurer';
        if (rep >= 250) return 'Veteran';
        if (rep >= 100) return 'Skilled Fighter';
        if (rep >= 50) return 'Apprentice';
        return 'Novice';
    }

    combatTraining() {
        if (this.player.gold >= 100) {
            this.player.gold -= 100;
            const xpGain = 50;
            this.player.gainXp(xpGain);
            this.addMessage('You complete combat training and gain experience!', 'success');
            this.reputation.adventurers_guild += 5;
            this.updateUI();
        } else {
            this.addMessage('Training costs 100 gold.', 'warning');
        }
    }

    showBountyBoard() {
        this.addMessage('Bounty board coming soon! Hunt dangerous monsters for rewards.', 'info');
    }

    findCompanions() {
        if (!this.companion) {
            const companions = [
                { name: 'Wolf Pup', icon: '🐺', type: 'beast', bonus: { agi: 3, damage: 5 } },
                { name: 'Fairy', icon: '🧚', type: 'magical', bonus: { mag: 5, mana: 20 } },
                { name: 'Knight', icon: '⚔️', type: 'warrior', bonus: { str: 4, def: 3 } },
                { name: 'Slime', icon: '💧', type: 'pet', bonus: { hp: 20 } }
            ];

            const chosen = randomChoice(companions);
            this.companion = chosen;
            this.addMessage(`${chosen.icon} ${chosen.name} has joined you as a companion!`, 'success');
            this.checkAchievement('companion_acquired');
        } else {
            this.addMessage(`You already have ${this.companion.name} as a companion!`, 'info');
        }
    }

    showGuildStorage() {
        this.addMessage('Guild storage system coming soon!', 'info');
    }

    // ========================================================================
    // RANDOM EVENTS SYSTEM
    // ========================================================================

    checkRandomEvent() {
        if (this.randomEventCooldown > 0) {
            this.randomEventCooldown--;
            return;
        }

        // 5% chance per move
        if (random(1, 100) <= 5) {
            this.triggerRandomEvent();
            this.randomEventCooldown = 50; // Cooldown before next event
        }
    }

    triggerRandomEvent() {
        const events = [
            {
                name: 'Wandering Merchant',
                description: 'A traveling merchant offers you a rare item!',
                options: [
                    { text: 'Buy item (100 gold)', action: () => this.buyFromMerchant() },
                    { text: 'Decline', action: () => this.addMessage('The merchant continues on their way.', 'info') }
                ]
            },
            {
                name: 'Treasure Chest',
                description: 'You stumble upon a hidden treasure chest!',
                options: [
                    { text: 'Open it', action: () => this.openRandomChest() },
                    { text: 'Leave it', action: () => this.addMessage('You decide not to risk it.', 'info') }
                ]
            },
            {
                name: 'Injured Traveler',
                description: 'You find an injured traveler who needs help.',
                options: [
                    { text: 'Help them (1 Potion)', action: () => this.helpTraveler() },
                    { text: 'Ignore', action: () => this.addMessage('You walk past the traveler.', 'info') }
                ]
            },
            {
                name: 'Mysterious Shrine',
                description: 'You discover a mysterious shrine radiating power.',
                options: [
                    { text: 'Pray', action: () => this.prayAtShrine() },
                    { text: 'Leave', action: () => this.addMessage('You leave the shrine alone.', 'info') }
                ]
            },
            {
                name: 'Ambush!',
                description: 'Enemies ambush you from the shadows!',
                options: [
                    { text: 'Fight!', action: () => this.fightAmbush() }
                ]
            },
            {
                name: 'Lucky Find',
                description: 'You find some gold on the ground!',
                options: [
                    { text: 'Take it', action: () => this.findGold() }
                ]
            }
        ];

        const event = randomChoice(events);
        this.showEventDialog(event);
    }

    showEventDialog(event) {
        const modal = document.createElement('div');
        modal.className = 'modal event-modal';

        const optionsHtml = event.options.map((opt, i) =>
            `<button class="event-option-btn" data-index="${i}">${opt.text}</button>`
        ).join('');

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>⚡ ${event.name}</h2>
                </div>
                <div class="modal-body">
                    <p class="event-description">${event.description}</p>
                    <div class="event-options">
                        ${optionsHtml}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelectorAll('.event-option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                event.options[index].action();
                modal.remove();
            });
        });
    }

    buyFromMerchant() {
        if (this.player.gold >= 100) {
            this.player.gold -= 100;
            const rareItems = Object.values(ITEM_TEMPLATES).filter(i =>
                i.rarity === RARITY.RARE || i.rarity === RARITY.EPIC
            );
            const item = randomChoice(rareItems);
            this.player.addItem({...item});
            this.addMessage(`Purchased ${item.name}!`, 'success');
            this.updateUI();
        } else {
            this.addMessage('Not enough gold!', 'warning');
        }
    }

    openRandomChest() {
        const gold = random(50, 150);
        this.player.gold += gold;
        this.addMessage(`Found ${gold} gold in the chest!`, 'success');

        if (random(1, 100) > 50) {
            const item = this.world.generateRandomItem();
            this.player.addItem(item);
            this.addMessage(`Also found: ${item.name}!`, 'success');
        }

        this.updateUI();
    }

    helpTraveler() {
        const hasPotion = this.player.inventory.find(i => i.type === ITEM_TYPES.POTION);
        if (hasPotion) {
            const index = this.player.inventory.indexOf(hasPotion);
            this.player.inventory.splice(index, 1);
            this.addMessage('The traveler thanks you and gives you a blessing!', 'success');
            this.player.buffs.push({
                name: 'Traveler\'s Blessing',
                duration: 50,
                strMod: 1.15,
                defMod: 1.15
            });
            this.reputation.starter_village += 10;
        } else {
            this.addMessage('You don\'t have any potions to spare.', 'warning');
        }
    }

    prayAtShrine() {
        const outcomes = [
            () => {
                this.player.hp = this.player.maxHp;
                this.player.mana = this.player.maxMana;
                this.addMessage('The shrine fully heals you!', 'success');
            },
            () => {
                const xp = 100;
                this.player.gainXp(xp);
                this.addMessage(`The shrine grants you ${xp} experience!`, 'success');
            },
            () => {
                this.player.buffs.push({
                    name: 'Divine Protection',
                    duration: 100,
                    defMod: 1.3
                });
                this.addMessage('The shrine grants you divine protection!', 'success');
            },
            () => {
                const damage = 20;
                this.player.takeDamage(damage);
                this.addMessage('The shrine was cursed! You take damage!', 'combat');
            }
        ];

        randomChoice(outcomes)();
        this.updateUI();
    }

    fightAmbush() {
        const enemies = Object.entries(ENEMY_TEMPLATES).filter(([k, e]) =>
            e.biome === this.currentBiome && !e.boss
        );

        if (enemies.length > 0) {
            const [key, template] = randomChoice(enemies);
            const enemy = new Enemy(template, this.player.level);
            enemy.x = this.player.x;
            enemy.y = this.player.y;
            this.startCombat(enemy);
        }
    }

    findGold() {
        const gold = random(20, 80);
        this.player.gold += gold;
        this.addMessage(`Found ${gold} gold!`, 'success');
        this.updateUI();
    }

    // ========================================================================
    // WEATHER & TIME SYSTEM
    // ========================================================================

    updateTimeAndWeather() {
        // Update time every 10 moves
        if (random(1, 10) === 1) {
            this.advanceTime();
        }

        // Change weather randomly
        if (random(1, 50) === 1) {
            this.changeWeather();
        }
    }

    advanceTime() {
        const times = ['dawn', 'day', 'dusk', 'night'];
        const currentIndex = times.indexOf(this.timeOfDay);
        this.timeOfDay = times[(currentIndex + 1) % times.length];

        if (this.timeOfDay === 'dawn') {
            this.dayCount++;
            this.addMessage(`Day ${this.dayCount} begins...`, 'info');
        }

        // Night time effects
        if (this.timeOfDay === 'night') {
            this.addMessage('Night falls. Monsters grow stronger...', 'warning');
        }
    }

    changeWeather() {
        const weathers = ['clear', 'rain', 'storm', 'fog'];
        const oldWeather = this.weather;
        this.weather = randomChoice(weathers);

        if (this.weather !== oldWeather) {
            const messages = {
                rain: 'It begins to rain...',
                storm: 'A storm is brewing!',
                fog: 'Fog rolls in, reducing visibility.',
                clear: 'The weather clears up.'
            };
            this.addMessage(messages[this.weather], 'info');
        }
    }

    getWeatherEffect() {
        // Weather affects combat and movement
        switch(this.weather) {
            case 'rain':
                return { agiMod: 0.9 };
            case 'storm':
                return { agiMod: 0.8, defMod: 0.9 };
            case 'fog':
                return { vision: -2 };
            default:
                return {};
        }
    }

    getTimeEffect() {
        // Time affects enemy stats
        if (this.timeOfDay === 'night') {
            return { enemyStrMod: 1.2, enemyDefMod: 1.1 };
        }
        return {};
    }

    // ========================================================================
    // ACHIEVEMENT SYSTEM
    // ========================================================================

    initializeAchievements() {
        this.achievementsList = [
            { id: 'first_blood', name: 'First Blood', description: 'Defeat your first enemy', icon: '⚔️' },
            { id: 'level_5', name: 'Getting Stronger', description: 'Reach level 5', icon: '⭐' },
            { id: 'level_10', name: 'Veteran', description: 'Reach level 10', icon: '🌟' },
            { id: 'rich', name: 'Wealthy', description: 'Accumulate 1000 gold', icon: '💰' },
            { id: 'quest_completer', name: 'Quest Completer', description: 'Complete 5 quests', icon: '📜' },
            { id: 'explorer', name: 'Explorer', description: 'Visit all biomes', icon: '🗺️' },
            { id: 'slayer', name: 'Monster Slayer', description: 'Defeat 100 enemies', icon: '💀' },
            { id: 'master_crafter', name: 'Master Crafter', description: 'Craft 50 items', icon: '🔨' },
            { id: 'master_chef', name: 'Master Chef', description: 'Cook 30 meals', icon: '🍖' },
            { id: 'companion_acquired', name: 'Best Friend', description: 'Acquire a companion', icon: '🐾' },
            { id: 'dragon_slayer', name: 'Dragon Slayer', description: 'Defeat an Ancient Dragon', icon: '🐉' },
            { id: 'legendary', name: 'Legendary Hero', description: 'Reach max guild rank', icon: '👑' }
        ];

        this.unlockedAchievements = [];
    }

    checkAchievement(id) {
        if (this.unlockedAchievements.includes(id)) return;

        const achievement = this.achievementsList.find(a => a.id === id);
        if (!achievement) return;

        let unlocked = false;

        switch(id) {
            case 'first_blood':
                if (this.player.kills >= 1) unlocked = true;
                break;
            case 'level_5':
                if (this.player.level >= 5) unlocked = true;
                break;
            case 'level_10':
                if (this.player.level >= 10) unlocked = true;
                break;
            case 'rich':
                if (this.player.gold >= 1000) unlocked = true;
                break;
            case 'quest_completer':
                if (this.completedQuests.length >= 5) unlocked = true;
                break;
            case 'slayer':
                if (this.player.kills >= 100) unlocked = true;
                break;
            case 'master_crafter':
                if (this.craftedItems.length >= 50) unlocked = true;
                break;
            case 'companion_acquired':
                if (this.companion) unlocked = true;
                break;
            default:
                unlocked = true;
        }

        if (unlocked) {
            this.unlockedAchievements.push(id);
            this.showAchievementNotification(achievement);
        }
    }

    showAchievementNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-info">
                    <div class="achievement-title">Achievement Unlocked!</div>
                    <div class="achievement-name">${achievement.name}</div>
                    <div class="achievement-desc">${achievement.description}</div>
                </div>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 5000);
    }

    // ========================================================================
    // DUNGEON/CAVE/RUINS EXPLORATION
    // ========================================================================

    enterDungeon(x, y) {
        this.addMessage('You enter a dark dungeon...', 'warning');

        // Generate dungeon difficulty based on player level
        const dungeonLevel = Math.max(1, this.player.level - 2 + random(-1, 2));

        // Show dungeon entrance modal
        this.showDungeonModal(x, y, dungeonLevel);
    }

    showDungeonModal(x, y, dungeonLevel) {
        const modal = document.createElement('div');
        modal.className = 'modal dungeon-modal';

        const bossName = this.getBossForDungeon(dungeonLevel);
        const rewards = this.calculateDungeonRewards(dungeonLevel);

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>🏰 Dungeon Entrance</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="dungeon-info">
                        <p class="dungeon-level">Dungeon Level: ${dungeonLevel}</p>
                        <p class="dungeon-desc">A dark presence looms within these ancient halls...</p>
                        <p class="boss-warning">⚠️ Boss: ${bossName}</p>
                    </div>
                    <div class="dungeon-rewards">
                        <h3>Potential Rewards:</h3>
                        <ul>
                            <li>💰 ${rewards.gold} Gold</li>
                            <li>⭐ ${rewards.xp} Experience</li>
                            <li>📦 ${rewards.items} Guaranteed Items</li>
                            <li>✨ Chance for Legendary Loot</li>
                        </ul>
                    </div>
                    <div class="dungeon-actions">
                        <button class="dungeon-enter-btn">Enter Dungeon</button>
                        <button class="dungeon-leave-btn">Leave</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());
        modal.querySelector('.dungeon-leave-btn').addEventListener('click', () => modal.remove());

        modal.querySelector('.dungeon-enter-btn').addEventListener('click', () => {
            modal.remove();
            this.startDungeonRun(x, y, dungeonLevel);
        });
    }

    getBossForDungeon(level) {
        const bosses = [
            { minLevel: 1, name: 'Goblin King' },
            { minLevel: 5, name: 'Ancient Dragon' },
            { minLevel: 8, name: 'Demon Lord' },
            { minLevel: 10, name: 'Lich King' },
            { minLevel: 12, name: 'Stone Titan' },
            { minLevel: 14, name: 'Phoenix Lord' },
            { minLevel: 16, name: 'Kraken' },
            { minLevel: 18, name: 'World Serpent' },
            { minLevel: 20, name: 'Celestial Guardian' }
        ];

        for (let i = bosses.length - 1; i >= 0; i--) {
            if (level >= bosses[i].minLevel) {
                return bosses[i].name;
            }
        }
        return bosses[0].name;
    }

    calculateDungeonRewards(level) {
        return {
            gold: 100 * level + random(50, 200),
            xp: 150 * level,
            items: Math.floor(level / 3) + 2
        };
    }

    startDungeonRun(x, y, level) {
        // Spawn multiple waves of enemies
        const wavesCount = 2 + Math.floor(level / 3);
        let currentWave = 0;

        const spawnWave = () => {
            currentWave++;

            if (currentWave <= wavesCount) {
                // Regular enemies
                const enemyCount = 2 + random(1, 3);
                this.addMessage(`Wave ${currentWave}/${wavesCount}: ${enemyCount} enemies approach!`, 'warning');

                for (let i = 0; i < enemyCount; i++) {
                    setTimeout(() => {
                        this.spawnDungeonEnemy(x, y, level);
                    }, i * 500);
                }

                // Check for next wave after delay
                setTimeout(() => {
                    if (this.player.hp > 0) {
                        spawnWave();
                    }
                }, 5000);
            } else {
                // Boss wave
                setTimeout(() => {
                    if (this.player.hp > 0) {
                        this.spawnDungeonBoss(x, y, level);
                    }
                }, 3000);
            }
        };

        this.addMessage('The dungeon awakens...', 'combat');
        setTimeout(() => spawnWave(), 2000);
    }

    spawnDungeonEnemy(x, y, level) {
        // Get appropriate enemies for level
        const validEnemies = Object.entries(ENEMY_TEMPLATES).filter(([key, template]) =>
            !template.boss && template.level <= level + 2 && template.level >= level - 1
        );

        if (validEnemies.length === 0) return;

        const [key, template] = randomChoice(validEnemies);
        const enemy = new Enemy(template, level);

        // Spawn near dungeon entrance
        const offsetX = random(-3, 3);
        const offsetY = random(-3, 3);
        enemy.x = x + offsetX;
        enemy.y = y + offsetY;

        // Make sure spawn is valid
        if (this.world.isWalkable(enemy.x, enemy.y) && !this.world.getEnemyAt(enemy.x, enemy.y)) {
            this.world.enemies.push(enemy);
            this.addMessage(`${enemy.name} appears!`, 'combat');
            this.render();
        }
    }

    spawnDungeonBoss(x, y, level) {
        this.addMessage('💀 The boss has arrived! 💀', 'combat');

        // Get appropriate boss for level
        const validBosses = Object.entries(ENEMY_TEMPLATES).filter(([key, template]) =>
            template.boss && template.level <= level + 5
        );

        if (validBosses.length === 0) {
            // Fallback to dragon
            const boss = new Enemy(ENEMY_TEMPLATES.dragon, level + 2);
            boss.x = x;
            boss.y = y;
            this.world.enemies.push(boss);
            this.startCombat(boss);
            return;
        }

        const [key, template] = randomChoice(validBosses);
        const boss = new Enemy(template, level + 2);
        boss.x = x;
        boss.y = y;

        // Boss buffs
        boss.hp = Math.floor(boss.hp * 1.5);
        boss.maxHp = boss.hp;
        boss.damage = Math.floor(boss.damage * 1.2);

        this.world.enemies.push(boss);
        this.addMessage(`${boss.name} emerges from the depths!`, 'combat');

        // Give player a moment to prepare
        setTimeout(() => {
            if (this.player.hp > 0) {
                this.startCombat(boss);
            }
        }, 2000);

        // Grant dungeon rewards when boss is defeated
        this.dungeonBoss = boss;
        this.dungeonRewards = this.calculateDungeonRewards(level);
    }

    exploreCave(x, y) {
        this.world.tiles[y][x] = TILE_TYPES.STONE;

        const outcomes = [
            () => {
                const gold = random(100, 300);
                this.player.gold += gold;
                this.addMessage(`You explore the cave and find ${gold} gold!`, 'success');
            },
            () => {
                const item = this.world.generateRandomItem();
                this.player.addItem(item);
                this.addMessage(`You find ${item.name} in the cave!`, 'success');
            },
            () => {
                this.addMessage('You find a sleeping bear and carefully retreat!', 'warning');
            },
            () => {
                const enemy = new Enemy(ENEMY_TEMPLATES.stone_golem, this.player.level + 2);
                enemy.x = x;
                enemy.y = y;
                this.world.enemies.push(enemy);
                this.addMessage('A Stone Golem emerges from the cave!', 'combat');
                this.startCombat(enemy);
            }
        ];

        randomChoice(outcomes)();
        this.updateQuestProgress('explore', 'cave', 1);
        this.updateUI();
    }

    exploreRuins(x, y) {
        this.world.tiles[y][x] = TILE_TYPES.STONE;

        const outcomes = [
            () => {
                const item = { ...randomChoice(Object.values(ITEM_TEMPLATES).filter(i =>
                    i.rarity === RARITY.RARE || i.rarity === RARITY.EPIC
                ))};
                this.player.addItem(item);
                this.addMessage(`You discover ancient treasure: ${item.name}!`, 'success');
            },
            () => {
                const xp = 200;
                this.player.gainXp(xp);
                this.addMessage(`You decipher ancient texts and gain ${xp} experience!`, 'success');
            },
            () => {
                this.addMessage('The ruins are cursed! You feel weakened...', 'warning');
                this.player.buffs.push({
                    name: 'Ancient Curse',
                    duration: 20,
                    strMod: 0.8,
                    defMod: 0.8
                });
            },
            () => {
                const enemy = new Enemy(ENEMY_TEMPLATES.mummy, this.player.level + 3);
                enemy.x = x;
                enemy.y = y;
                this.world.enemies.push(enemy);
                this.addMessage('An ancient Mummy awakens!', 'combat');
                this.startCombat(enemy);
            }
        ];

        randomChoice(outcomes)();
        this.updateQuestProgress('explore', 'ruins', 1);
        this.updateUI();
    }

    gameOver() {
        this.state = 'gameover';

        document.getElementById('game-screen').classList.remove('active');
        document.getElementById('game-over-screen').classList.add('active');

        document.getElementById('final-level').textContent = this.player.level;
        document.getElementById('final-floor').textContent = this.floor;
        document.getElementById('final-kills').textContent = this.player.kills;
        document.getElementById('final-gold').textContent = this.player.gold;
        document.getElementById('final-score').textContent = this.player.score;
    }

    returnToTitle() {
        this.state = 'title';

        document.getElementById('game-over-screen').classList.remove('active');
        document.getElementById('title-screen').classList.add('active');

        // Reset selection
        document.querySelectorAll('.class-card').forEach(c => c.classList.remove('selected'));
        document.getElementById('start-game-btn').disabled = true;
        this.selectedClass = null;
    }

    // ========================================================================
    // SAVE/LOAD SYSTEM
    // ========================================================================

    saveGame(slotNumber = 1) {
        try {
            const saveData = {
                version: '1.0',
                timestamp: Date.now(),
                slotNumber: slotNumber,
                player: {
                    className: this.player.className,
                    level: this.player.level,
                    xp: this.player.xp,
                    xpToLevel: this.player.xpToLevel,
                    hp: this.player.hp,
                    maxHp: this.player.maxHp,
                    baseMaxHp: this.player.baseMaxHp,
                    mana: this.player.mana,
                    maxMana: this.player.maxMana,
                    baseMaxMana: this.player.baseMaxMana,
                    str: this.player.str,
                    def: this.player.def,
                    agi: this.player.agi,
                    mag: this.player.mag,
                    crit: this.player.crit,
                    gold: this.player.gold,
                    score: this.player.score,
                    kills: this.player.kills,
                    x: this.player.x,
                    y: this.player.y,
                    inventory: this.player.inventory,
                    equipment: this.player.equipment,
                    skills: this.player.skills,
                    buffs: this.player.buffs
                },
                world: {
                    width: this.world.width,
                    height: this.world.height,
                    seed: this.world.seed || Date.now()
                },
                game: {
                    currentBiome: this.currentBiome,
                    dayCount: this.dayCount,
                    timeOfDay: this.timeOfDay,
                    weather: this.weather
                },
                quests: {
                    active: this.activeQuests,
                    completed: this.completedQuests
                },
                reputation: this.reputation,
                companion: this.companion,
                achievements: this.unlockedAchievements,
                craftedItems: this.craftedItems,
                playTime: this.playTime || 0
            };

            const saveKey = `roguelike_save_slot_${slotNumber}`;
            localStorage.setItem(saveKey, JSON.stringify(saveData));
            this.addMessage(`Game saved to slot ${slotNumber}!`, 'success');
            return true;
        } catch (error) {
            console.error('Error saving game:', error);
            this.addMessage('Failed to save game!', 'warning');
            return false;
        }
    }

    loadGame(slotNumber = 1) {
        try {
            const saveKey = `roguelike_save_slot_${slotNumber}`;
            const saveDataString = localStorage.getItem(saveKey);

            if (!saveDataString) {
                this.addMessage(`No save found in slot ${slotNumber}!`, 'warning');
                return false;
            }

            const saveData = JSON.parse(saveDataString);

            // Restore player
            this.player = new Player(saveData.player.className);
            Object.assign(this.player, saveData.player);

            // Regenerate world (or restore if we saved tile data)
            this.world = new World(saveData.world.width, saveData.world.height, saveData.world.seed);
            this.player.x = saveData.player.x;
            this.player.y = saveData.player.y;

            // Restore game state
            this.currentBiome = saveData.game.currentBiome;
            this.dayCount = saveData.game.dayCount;
            this.timeOfDay = saveData.game.timeOfDay;
            this.weather = saveData.game.weather;

            // Restore quests
            this.activeQuests = saveData.quests.active;
            this.completedQuests = saveData.quests.completed;

            // Restore other systems
            this.reputation = saveData.reputation;
            this.companion = saveData.companion;
            this.unlockedAchievements = saveData.achievements;
            this.craftedItems = saveData.craftedItems;
            this.playTime = saveData.playTime || 0;

            // Update UI
            this.state = 'playing';
            document.getElementById('title-screen').classList.remove('active');
            document.getElementById('game-screen').classList.add('active');
            this.updateUI();
            this.render();

            this.addMessage(`Game loaded from slot ${slotNumber}!`, 'success');
            return true;
        } catch (error) {
            console.error('Error loading game:', error);
            this.addMessage('Failed to load game!', 'warning');
            return false;
        }
    }

    deleteSave(slotNumber) {
        try {
            const saveKey = `roguelike_save_slot_${slotNumber}`;
            localStorage.removeItem(saveKey);
            this.addMessage(`Save slot ${slotNumber} deleted!`, 'info');
            return true;
        } catch (error) {
            console.error('Error deleting save:', error);
            return false;
        }
    }

    getAllSaves() {
        const saves = [];
        for (let i = 1; i <= 3; i++) {
            const saveKey = `roguelike_save_slot_${i}`;
            const saveData = localStorage.getItem(saveKey);
            if (saveData) {
                try {
                    const parsed = JSON.parse(saveData);
                    saves.push({
                        slot: i,
                        exists: true,
                        timestamp: parsed.timestamp,
                        level: parsed.player.level,
                        className: parsed.player.className,
                        playTime: parsed.playTime || 0
                    });
                } catch (e) {
                    saves.push({ slot: i, exists: false });
                }
            } else {
                saves.push({ slot: i, exists: false });
            }
        }
        return saves;
    }

    showSaveMenu() {
        const saves = this.getAllSaves();

        const modal = document.createElement('div');
        modal.className = 'modal save-modal';

        const savesHTML = saves.map(save => {
            if (save.exists) {
                const date = new Date(save.timestamp).toLocaleString();
                const hours = Math.floor(save.playTime / 3600);
                const minutes = Math.floor((save.playTime % 3600) / 60);
                return `
                    <div class="save-slot filled">
                        <div class="save-info">
                            <h4>Slot ${save.slot}</h4>
                            <p>Level ${save.level} ${save.className}</p>
                            <p class="save-time">${date}</p>
                            <p class="play-time">Playtime: ${hours}h ${minutes}m</p>
                        </div>
                        <div class="save-actions">
                            <button class="save-btn" data-slot="${save.slot}">Save Here</button>
                            <button class="load-btn" data-slot="${save.slot}">Load</button>
                            <button class="delete-btn" data-slot="${save.slot}">Delete</button>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="save-slot empty">
                        <div class="save-info">
                            <h4>Slot ${save.slot}</h4>
                            <p>Empty Slot</p>
                        </div>
                        <div class="save-actions">
                            <button class="save-btn" data-slot="${save.slot}">Save Here</button>
                        </div>
                    </div>
                `;
            }
        }).join('');

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>💾 Save / Load Game</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    ${savesHTML}
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event listeners
        modal.querySelector('.close-btn').addEventListener('click', () => modal.remove());

        modal.querySelectorAll('.save-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const slot = parseInt(btn.dataset.slot);
                this.saveGame(slot);
                modal.remove();
                setTimeout(() => this.showSaveMenu(), 100);
            });
        });

        modal.querySelectorAll('.load-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const slot = parseInt(btn.dataset.slot);
                modal.remove();
                this.loadGame(slot);
            });
        });

        modal.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const slot = parseInt(btn.dataset.slot);
                if (confirm(`Delete save in slot ${slot}?`)) {
                    this.deleteSave(slot);
                    modal.remove();
                    setTimeout(() => this.showSaveMenu(), 100);
                }
            });
        });
    }

    autoSave() {
        if (this.state === 'playing' && this.player) {
            this.saveGame(0); // Slot 0 for autosave
        }
    }

    // ========================================================================
    // STATISTICS & LEADERBOARD SYSTEM
    // ========================================================================

    getStatistics() {
        return {
            totalPlayTime: this.playTime || 0,
            level: this.player.level,
            kills: this.player.kills,
            gold: this.player.gold,
            score: this.player.score,
            questsCompleted: this.completedQuests.length,
            achievementsUnlocked: this.unlockedAchievements.length,
            itemsCrafted: this.craftedItems.length,
            highestLevel: this.getHighScore('highestLevel') || this.player.level,
            mostKills: this.getHighScore('mostKills') || this.player.kills,
            mostGold: this.getHighScore('mostGold') || this.player.gold
        };
    }

    showStatistics() {
        const stats = this.getStatistics();
        const hours = Math.floor(stats.totalPlayTime / 3600);
        const minutes = Math.floor((stats.totalPlayTime % 3600) / 60);

        const modal = document.createElement('div');
        modal.className = 'modal statistics-modal';

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2>📊 Statistics</h2>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="stats-section">
                        <h3>Current Run</h3>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <span class="stat-icon">⭐</span>
                                <span class="stat-label">Level</span>
                                <span class="stat-value">${stats.level}</span>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">💀</span>
                                <span class="stat-label">Kills</span>
                                <span class="stat-value">${stats.kills}</span>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">💰</span>
                                <span class="stat-label">Gold</span>
                                <span class="stat-value">${stats.gold}</span>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">🏆</span>
                                <span class="stat-label">Score</span>
                                <span class="stat-value">${stats.score}</span>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">📜</span>
                                <span class="stat-label">Quests</span>
                                <span class="stat-value">${stats.questsCompleted}</span>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">🎖️</span>
                                <span class="stat-label">Achievements</span>
                                <span class="stat-value">${stats.achievementsUnlocked}</span>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">🔨</span>
                                <span class="stat-label">Items Crafted</span>
                                <span class="stat-value">${stats.itemsCrafted}</span>
                            </div>
                            <div class="stat-card">
                                <span class="stat-icon">⏰</span>
                                <span class="stat-label">Play Time</span>
                                <span class="stat-value">${hours}h ${minutes}m</span>
                            </div>
                        </div>
                    </div>
                    <div class="stats-section">
                        <h3>Personal Records</h3>
                        <div class="records-list">
                            <div class="record-item">
                                <span>🔝 Highest Level:</span>
                                <span class="record-value">${stats.highestLevel}</span>
                            </div>
                            <div class="record-item">
                                <span>💀 Most Kills:</span>
                                <span class="record-value">${stats.mostKills}</span>
                            </div>
                            <div class="record-item">
                                <span>💰 Most Gold:</span>
                                <span class="record-value">${stats.mostGold}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });
    }

    updateHighScores() {
        // Update high scores in localStorage
        if (!this.player) return;

        const currentHighest = this.getHighScore('highestLevel') || 0;
        if (this.player.level > currentHighest) {
            this.setHighScore('highestLevel', this.player.level);
        }

        const mostKills = this.getHighScore('mostKills') || 0;
        if (this.player.kills > mostKills) {
            this.setHighScore('mostKills', this.player.kills);
        }

        const mostGold = this.getHighScore('mostGold') || 0;
        if (this.player.gold > mostGold) {
            this.setHighScore('mostGold', this.player.gold);
        }
    }

    getHighScore(key) {
        try {
            return parseInt(localStorage.getItem(`roguelike_highscore_${key}`)) || 0;
        } catch (e) {
            return 0;
        }
    }

    setHighScore(key, value) {
        try {
            localStorage.setItem(`roguelike_highscore_${key}`, value.toString());
        } catch (e) {
            console.error('Error setting high score:', e);
        }
    }

    // ========================================================================
    // ADVANCED GAME MECHANICS
    // ========================================================================

    // Critical hit system
    calculateCriticalHit(baseDamage, critChance, critMultiplier = 2.0) {
        const roll = random(1, 100);
        if (roll <= critChance) {
            return {
                damage: Math.floor(baseDamage * critMultiplier),
                isCrit: true
            };
        }
        return {
            damage: baseDamage,
            isCrit: false
        };
    }

    // Dodge system
    attemptDodge(agiStat) {
        const dodgeChance = Math.min(30, agiStat * 0.5); // Max 30% dodge
        return random(1, 100) <= dodgeChance;
    }

    // Lifesteal system
    applyLifesteal(damage, lifestealPercent) {
        const healAmount = Math.floor(damage * (lifestealPercent / 100));
        this.player.hp = Math.min(this.player.maxHp, this.player.hp + healAmount);
        return healAmount;
    }

    // Status effect system
    applyStatusEffect(target, effect) {
        if (!target.statusEffects) {
            target.statusEffects = [];
        }

        const existingEffect = target.statusEffects.find(e => e.type === effect.type);
        if (existingEffect) {
            existingEffect.duration = Math.max(existingEffect.duration, effect.duration);
            existingEffect.power = Math.max(existingEffect.power, effect.power);
        } else {
            target.statusEffects.push({
                type: effect.type,
                duration: effect.duration,
                power: effect.power
            });
        }
    }

    processStatusEffects(entity) {
        if (!entity.statusEffects || entity.statusEffects.length === 0) return;

        for (let i = entity.statusEffects.length - 1; i >= 0; i--) {
            const effect = entity.statusEffects[i];

            switch(effect.type) {
                case 'poison':
                    entity.hp -= effect.power;
                    this.addMessage(`${entity.name || 'You'} takes ${effect.power} poison damage!`, 'combat');
                    break;
                case 'burn':
                    entity.hp -= effect.power;
                    this.addMessage(`${entity.name || 'You'} takes ${effect.power} burn damage!`, 'combat');
                    break;
                case 'regen':
                    entity.hp = Math.min(entity.maxHp, entity.hp + effect.power);
                    break;
                case 'slow':
                    // Reduce agility temporarily
                    break;
            }

            effect.duration--;
            if (effect.duration <= 0) {
                entity.statusEffects.splice(i, 1);
            }
        }
    }

    // Chain attack system
    performChainAttack(initialTarget, damage, chainCount) {
        const targets = [];
        targets.push(initialTarget);

        // Find nearby enemies to chain to
        for (let i = 1; i < chainCount; i++) {
            const nearbyEnemies = this.world.enemies.filter(e =>
                e.hp > 0 &&
                !targets.includes(e) &&
                Math.abs(e.x - this.player.x) <= 5 &&
                Math.abs(e.y - this.player.y) <= 5
            );

            if (nearbyEnemies.length > 0) {
                targets.push(randomChoice(nearbyEnemies));
            } else {
                break;
            }
        }

        // Apply damage to all targets
        targets.forEach((target, index) => {
            const chainDamage = Math.floor(damage * Math.pow(0.7, index)); // 70% each bounce
            target.hp -= chainDamage;
            this.showFloatingText(target.x, target.y, `-${chainDamage}⚡`, '#ffff00');
        });

        if (targets.length > 1) {
            this.addMessage(`Lightning chains to ${targets.length} enemies!`, 'combat');
        }
    }

    // Area of effect damage
    performAOEAttack(centerX, centerY, radius, damage) {
        const affectedEnemies = this.world.enemies.filter(e =>
            e.hp > 0 &&
            Math.abs(e.x - centerX) <= radius &&
            Math.abs(e.y - centerY) <= radius
        );

        affectedEnemies.forEach(enemy => {
            enemy.hp -= damage;
            this.showFloatingText(enemy.x, enemy.y, `-${damage}`, '#ff4444');
            if (enemy.hp <= 0) {
                this.onEnemyKilled(enemy);
            }
        });

        return affectedEnemies.length;
    }

    // Summon companion for combat
    summonCompanionForCombat(duration) {
        const summons = [
            { name: 'Shadow Clone', icon: '👤', damage: 15, hp: 50 },
            { name: 'Fire Elemental', icon: '🔥', damage: 20, hp: 40 },
            { name: 'Ice Golem', icon: '❄️', damage: 18, hp: 60 },
            { name: 'Lightning Spirit', icon: '⚡', damage: 22, hp: 35 }
        ];

        const summon = randomChoice(summons);
        this.activeSummon = {
            ...summon,
            duration: duration,
            currentHp: summon.hp
        };

        this.addMessage(`${summon.name} ${summon.icon} appears to aid you!`, 'success');
    }

    processSummonAttack(enemy) {
        if (!this.activeSummon || this.activeSummon.currentHp <= 0) {
            this.activeSummon = null;
            return 0;
        }

        const damage = this.activeSummon.damage;
        enemy.hp -= damage;
        this.addMessage(`${this.activeSummon.name} attacks for ${damage} damage!`, 'combat');
        this.showFloatingText(enemy.x, enemy.y, `-${damage}`, '#ffaa00');

        // Summon takes some damage
        if (enemy.hp > 0) {
            const counterDamage = Math.floor(enemy.damage * 0.3);
            this.activeSummon.currentHp -= counterDamage;
        }

        this.activeSummon.duration--;
        if (this.activeSummon.duration <= 0 || this.activeSummon.currentHp <= 0) {
            this.addMessage(`${this.activeSummon.name} disappears...`, 'info');
            this.activeSummon = null;
        }

        return damage;
    }
}

// ============================================================================
// INITIALIZE GAME
// ============================================================================

let game;

window.addEventListener('load', () => {
    game = new Game();
});
