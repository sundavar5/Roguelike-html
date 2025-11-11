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

    // Boss monsters
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

        this.generateDungeon();

        document.getElementById('title-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');

        this.state = 'playing';

        this.addMessage('Welcome to the Dungeons of Eldoria!', 'info');
        this.addMessage('Use arrow keys or WASD to move. Press R to rest.', 'info');

        this.updateUI();
        this.render();
    }

    generateDungeon() {
        this.world = new World(WORLD_WIDTH, WORLD_HEIGHT, this.floor);
        const startPos = this.world.getStartPosition();
        this.player.x = startPos.x;
        this.player.y = startPos.y;

        this.addMessage(`You descend to floor ${this.floor}...`, 'warning');
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

        // Check for stairs
        if (this.world.tiles[newY][newX] === TILE_TYPES.STAIRS_DOWN) {
            this.descendStairs();
            return;
        }

        // Check for chest
        if (this.world.tiles[newY][newX] === TILE_TYPES.CHEST) {
            this.openChest(newX, newY);
        }

        // Check for shrine
        if (this.world.tiles[newY][newX] === TILE_TYPES.SHRINE) {
            this.useShrine(newX, newY);
        }

        // Check for treasure room
        if (this.world.tiles[newY][newX] === TILE_TYPES.TREASURE) {
            this.openTreasureRoom(newX, newY);
        }

        // Check for item
        const item = this.world.getItemAt(newX, newY);
        if (item) {
            this.pickupItem(item);
        }

        // Move player
        this.player.x = newX;
        this.player.y = newY;

        // Enemy turn
        this.enemyTurn();

        // Update cooldowns and buffs
        this.player.updateCooldowns();
        this.player.updateBuffs();

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

        this.endCombat();
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
                    case TILE_TYPES.FLOOR:
                        color = '#4a4a4a';
                        break;
                    case TILE_TYPES.WALL:
                        color = '#8b7355';
                        symbol = '#';
                        break;
                    case TILE_TYPES.STAIRS_DOWN:
                        color = '#4a4a4a';
                        symbol = '>';
                        break;
                    case TILE_TYPES.CHEST:
                        color = '#4a4a4a';
                        symbol = '📦';
                        break;
                    case TILE_TYPES.SHRINE:
                        color = '#6a5acd';
                        symbol = '⛩️';
                        break;
                    case TILE_TYPES.TREASURE:
                        color = '#ffd700';
                        symbol = '💎';
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
}

// ============================================================================
// INITIALIZE GAME
// ============================================================================

let game;

window.addEventListener('load', () => {
    game = new Game();
});
