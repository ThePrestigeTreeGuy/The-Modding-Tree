addLayer("M", {
    name: ".", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "U", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
        colour_tokens: new Decimal(0),
        red: new Decimal(0),
        orange: new Decimal(0),
        yellow: new Decimal(0),
        green: new Decimal(0),
        blue: new Decimal(0),
        indigo: new Decimal(0),
        violet: new Decimal(0),
    }},
    update(diff) {
    if (hasUpgrade('M', 422)) {
        let colourTokenGain = Decimal.dOne;
        if (hasUpgrade('M', 511)) colourTokenGain = colourTokenGain.times(2);
        if (hasUpgrade('M', 512)) colourTokenGain = colourTokenGain.times(2);
        if (hasUpgrade('M', 513)) colourTokenGain = colourTokenGain.times(2);
        if (hasUpgrade('M', 514)) colourTokenGain = colourTokenGain.times(2);
        if (hasUpgrade('M', 515)) colourTokenGain = colourTokenGain.times(2);
        if (hasUpgrade('M', 521)) colourTokenGain = colourTokenGain.times(2);
        if (hasUpgrade('M', 522)) colourTokenGain = colourTokenGain.times(2);
        if (hasUpgrade('M', 523)) colourTokenGain = colourTokenGain.times(1.41421356237);
        if (hasUpgrade('M', 524)) colourTokenGain = colourTokenGain.times(1.3);
        if (hasUpgrade('M', 525)) colourTokenGain = colourTokenGain.times(1.5);
        if (hasUpgrade('M', 531)) colourTokenGain = colourTokenGain.times(1.5);
        if (hasUpgrade('M', 532)) colourTokenGain = colourTokenGain.times(1.7);
        if (hasUpgrade('M', 533)) colourTokenGain = colourTokenGain.times(1.8);
        if (hasUpgrade('M', 534)) colourTokenGain = colourTokenGain.times(1.9);
        if (hasUpgrade('M', 535)) colourTokenGain = colourTokenGain.times(2);
        player[this.layer].colour_tokens = player[this.layer].colour_tokens.plus(colourTokenGain.times(diff));
    }
    },
    color: "#ff4040",
    requires: new Decimal(2.6944002e25), // Can be a function that takes requirement increases into account
    resource: "", // Name of prestige currency
    baseResource: "m^3", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.33333333333333, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    tabFormat: {
        "Matter": {
            content: [
                'main-display',
                'prestige-button',
                ['buyables', [1, 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]]
            ],
        },
        "Upgrades": {
            content: ['main-display','prestige-button',
                ['upgrades', [1,2,3,4,5,11,12,13,14,15,21,22,23,24,25,31,32,33,34,35,41,42,43,44,45]]
            ],
        },
        "Levels": {
            content: [
                ['bar','bigBar'],
                ['bar','redBar'],
                ['bar','orangeBar'],
                ['bar','yellowBar'],
                ['bar','greenBar'],
                ['bar','blueBar'],
                ['bar','indigoBar'],
                ['bar','violetBar'],
            ],
        },
        "Colours": {
            content: [["display-text", function() {return `You have ` + format(player[this.layer].colour_tokens) + ` colour tokens`}],
            ["display-text", function() {return `You have ` + format(player[this.layer].red) + ` red`}],
            ["display-text", function() {return `You have ` + format(player[this.layer].orange) + ` orange`}],
            ["display-text", function() {return `You have ` + format(player[this.layer].yellow) + ` yellow`}],
            ["display-text", function() {return `You have ` + format(player[this.layer].green) + ` green`}],
            ["display-text", function() {return `You have ` + format(player[this.layer].blue) + ` blue`}],
            ["display-text", function() {return `You have ` + format(player[this.layer].indigo) + ` indigo`}],
            ["display-text", function() {return `You have ` + format(player[this.layer].violet) + ` violet`}], 
            'clickables',
            ['upgrades', [51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70]],
            ['buyables', [1001,1002,1003]]
        ],
        },
        "Info": {
            content: [
                ['infobox','lore'],
                ['infobox','lore2'],
            ]
        }
    },
    infoboxes: {
        lore: {
            title: "Info",
            body() { return "The first upgrade will be unlocked once you buy 50 Planck Volumes." },
        },
        lore2: {
            title: "Colours",
            body() { return "When you click on the colour clickables, you will get a random amount of that colour. That amount never decreases (unless you reset)." },
            unlocked () {return hasUpgrade('M',422)}
        }
    },
    upgrades: {
        11: {
            title: "Doubler",
            description: "Double Planck Volume effect.",
            cost: new Decimal(1e-101),
            unlocked() {return getBuyableAmount(this.layer,11).gte(50)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        12: {
            title: "Another Doubler",
            description: "Double Planck Volume effect.",
            cost: new Decimal(2.5e-101),
            unlocked() {return hasUpgrade('M',11)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        13: {
            title: "More Doublers!",
            description: "Double Planck Volume effect, and unlock a new feature.",
            cost: new Decimal(5e-101),
            unlocked() {return hasUpgrade('M',12)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        14: {
            title: "Even More Doublers!",
            description: "Double Planck Volume effect.",
            cost: new Decimal(1e-99),
            unlocked() {return hasUpgrade('M',13)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        15: {
            title: "New Matter?",
            description: "Double Planck Volume effect, and unlock new matter.",
            cost: new Decimal(5e-99),
            unlocked() {return hasUpgrade('M',14)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        21: {
            title: "Yay! Synergy!",
            description: "Every Million Planck Volume boosts Planck Volume effect by +25%.",
            cost: new Decimal(1e-96),
            unlocked() {return hasUpgrade('M',15)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        22: {
            title: "Planks",
            description: "Double Planck Volume effect.",
            cost: new Decimal(3e-96),
            unlocked() {return hasUpgrade('M',21)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        23: {
            title: "Plankton",
            description: "Double Planck Volume effect.",
            cost: new Decimal(9e-96),
            unlocked() {return hasUpgrade('M',22)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        24: {
            title: "Plan",
            description: "Double Planck Volume effect.",
            cost: new Decimal(2.7e-95),
            unlocked() {return hasUpgrade('M',23)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        25: {
            title: "Planning",
            description: "Double Planck Volume effect.",
            cost: new Decimal(6e-95),
            unlocked() {return hasUpgrade('M',24)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        31: {
            title: "Planner",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(1.5e-94),
            unlocked() {return hasUpgrade('M',25)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        32: {
            title: "Planned",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(5e-94),
            unlocked() {return hasUpgrade('M',31)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        33: {
            title: "Plans",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(2e-93),
            unlocked() {return hasUpgrade('M',32)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        34: {
            title: "Play",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(8e-93),
            unlocked() {return hasUpgrade('M',33)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        35: {
            title: "Platinum",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(3.2e-92),
            unlocked() {return hasUpgrade('M',34)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        41: {
            title: "Plentiful",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(2e-91),
            unlocked() {return hasUpgrade('M',35)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        42: {
            title: "Placid",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(1e-90),
            unlocked() {return hasUpgrade('M',41)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        43: {
            title: "Acid",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(1e-89),
            unlocked() {return hasUpgrade('M',42)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        44: {
            title: "Where did the planck go???",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(5e-89),
            unlocked() {return hasUpgrade('M',43)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        45: {
            title: "Oh well",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(1e-88),
            unlocked() {return hasUpgrade('M',44)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        51: {
            title: "One Boost",
            description: "x1000 Planck Volume effect.",
            cost: new Decimal(5e-85),
            unlocked() {return hasUpgrade('M',45)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        52: {
            title: "One Boost Again",
            description: "x50000 Planck Volume effect.",
            cost: new Decimal(1e-78),
            unlocked() {return hasUpgrade('M',51)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        53: {
            title: "One Boost Yet Again",
            description: "x100 Planck Volume effect.",
            cost: new Decimal(7.5e-75),
            unlocked() {return hasUpgrade('M',52)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        54: {
            title: "Weak One Boost",
            description: "Quadruple Planck Volume effect.",
            cost: new Decimal(3e-74),
            unlocked() {return hasUpgrade('M',53)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        55: {
            title: "Weaker One Boost",
            description: "Double Planck Volume effect.",
            cost: new Decimal(7.5e-74),
            unlocked() {return hasUpgrade('M',53)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        111: {
            title: "Million-Doubler!",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(1e-96),
            unlocked() {return hasUpgrade('M',15)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        112: {
            title: "More Million-Doublers!",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(2.5e-96),
            unlocked() {return hasUpgrade('M',111)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        113: {
            title: "Even More Million-Doublers!",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(6.25e-96),
            unlocked() {return hasUpgrade('M',112)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        114: {
            title: "So Large Yet So Small",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(1.56e-95),
            unlocked() {return hasUpgrade('M',113)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        115: {
            title: "Even Larger Yet So Small",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(3.9e-95),
            unlocked() {return hasUpgrade('M',114)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        121: {
            title: "Yay! More Synergy!",
            description: "Every Planck Volume boosts Million Planck Volume effect by +1%.",
            cost: new Decimal(2e-94),
            unlocked() {return hasUpgrade('M',115)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        122: {
            title: "Increasing Within The Void",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(5e-94),
            unlocked() {return hasUpgrade('M',121)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        123: {
            title: "New Matter??",
            description: "Double Million Planck Volume effect, and unlock new matter.",
            cost: new Decimal(1e-93),
            unlocked() {return hasUpgrade('M',122)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        124: {
            title: "Still Increasing Within The Void",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(2e-93),
            unlocked() {return hasUpgrade('M',123)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        125: {
            title: "Endless... Void...",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(5e-93),
            unlocked() {return hasUpgrade('M',124)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        131: {
            title: "Approaching the Quectometre I",
            description: "Triple Million Planck Volume effect.",
            cost: new Decimal(1.5e-92),
            unlocked() {return hasUpgrade('M',125)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        132: {
            title: "Approaching the Quectometre II",
            description: "Triple Million Planck Volume effect.",
            cost: new Decimal(7.5e-92),
            unlocked() {return hasUpgrade('M',131)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        133: {
            title: "Approaching the Quectometre III",
            description: "Triple Million Planck Volume effect.",
            cost: new Decimal(3.75e-91),
            unlocked() {return hasUpgrade('M',132)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        134: {
            title: "Quectometre Boost",
            description: "x2 volume gain.",
            cost: new Decimal(1e-90),
            unlocked() {return hasUpgrade('M',133)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        135: {
            title: "OP boost",
            description: "Decuple Million Planck Volume effect.",
            cost: new Decimal(5e-89),
            unlocked() {return hasUpgrade('M',134)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        141: {
            title: "Million Boost",
            description: "x500 Million Planck Volume effect.",
            cost: new Decimal(5e-85),
            unlocked() {return hasUpgrade('M',135)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        142: {
            title: "Million Boost Again",
            description: "x25000 Million Planck Volume effect.",
            cost: new Decimal(1e-78),
            unlocked() {return hasUpgrade('M',141)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        143: {
            title: "Million Boost Yet Again",
            description: "x100 Million Planck Volume effect.",
            cost: new Decimal(1.5e-74),
            unlocked() {return hasUpgrade('M',142)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        144: {
            title: "Approaching The Yoctometre I",
            description: "Octuple Million Planck Volume effect.",
            cost: new Decimal(2e-73),
            unlocked() {return hasUpgrade('M',143)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        145: {
            title: "Approaching The Yoctometre II",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(5e-73),
            unlocked() {return hasUpgrade('M',144)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        211: {
            title: "Trillions upon Trillions",
            description: "Double Trillion Planck Volume effect.",
            cost: new Decimal(5e-92),
            unlocked() {return hasUpgrade('M',123)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        212: {
            title: "Trillions upon Trillions upon Trillions",
            description: "Double Trillion Planck Volume effect.",
            cost: new Decimal(1.25e-91),
            unlocked() {return hasUpgrade('M',211)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        213: {
            title: "Trillions upon Trillions...?",
            description: "Double Trillion Planck Volume effect.",
            cost: new Decimal(3e-91),
            unlocked() {return hasUpgrade('M',212)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        214: {
            title: "Trillions upon Trillions...!",
            description: "Double Trillion Planck Volume effect.",
            cost: new Decimal(7.5e-91),
            unlocked() {return hasUpgrade('M',213)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        215: {
            title: "Not Trillions upon Trillions...",
            description: "Double Trillion Planck Volume effect.",
            cost: new Decimal(5e-90),
            unlocked() {return hasUpgrade('M',214)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        221: {
            title: "Self-Synergy",
            description: "Million Planck Volumes and Trillion Planck Volumes boost themselves by +1% for each buyable level.",
            cost: new Decimal(2.5e-88),
            unlocked() {return hasUpgrade('M',215)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        222: {
            title: "Upgrade Booster",
            description: "Each upgrade gives a +1% boost to volume production.",
            cost: new Decimal(5e-88),
            unlocked() {return hasUpgrade('M',221)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points",
            effect() {
                return new Decimal(player[this.layer].upgrades.length).mul(0.01).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        223: {
            title: "Different Synergy",
            description: "Million Planck Volumes and Trillion Planck Volumes boost each other by +1% for each buyable level.",
            cost: new Decimal(7e-88),
            unlocked() {return hasUpgrade('M',222)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        224: {
            title: "New Matter???",
            description: "Unlock new matter, and double Trillion Planck Volume effect.",
            cost: new Decimal(1.25e-87),
            unlocked() {return hasUpgrade('M',223)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        225: {
            title: "Trillion Is A Small Number",
            description: "Double Trillion Planck Volume effect.",
            cost: new Decimal(2e-87),
            unlocked() {return hasUpgrade('M',224)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        231: {
            title: "Trillion Boost",
            description: "x100 Trillion Planck Volume effect.",
            cost: new Decimal(5e-85),
            unlocked() {return hasUpgrade('M',225)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        232: {
            title: "Another Synergy",
            description: "Every Quintillion Planck Volume boosts Trillion Planck Volume by +20%.",
            cost: new Decimal(5e-85),
            unlocked() {return hasUpgrade('M',231)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        233: {
            title: "Trillion Boost Again",
            description: "x1000 Trillion Planck Volume effect.",
            cost: new Decimal(1e-78),
            unlocked() {return hasUpgrade('M',232)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        311: {
            title: "Approaching The Rontometre I",
            description: "Triple Quintillion Planck Lengths effect.",
            cost: new Decimal(3e-84),
            unlocked() {return hasUpgrade('M',225)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        312: {
            title: "Approaching The Rontometre II",
            description: "Double Quintillion Planck Lengths effect.",
            cost: new Decimal(7.5e-84),
            unlocked() {return hasUpgrade('M',311)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        313: {
            title: "Approaching The Rontometre III",
            description: "Every Trillion Planck Volume boosts Quintillion Planck Volume by +0.5%.",
            cost: new Decimal(4e-83),
            unlocked() {return hasUpgrade('M',312)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        314: {
            title: "Approaching The Rontometre IV",
            description: "Double Quintillion Planck Lengths effect.",
            cost: new Decimal(7.5e-83),
            unlocked() {return hasUpgrade('M',313)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        315: {
            title: "Approaching The Rontometre V",
            description: "Double Quintillion Planck Lengths effect.",
            cost: new Decimal(1.25e-82),
            unlocked() {return hasUpgrade('M',314)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        321: {
            title: "Approaching The Rontometre VI",
            description: "Double Quintillion Planck Lengths effect.",
            cost: new Decimal(2e-82),
            unlocked() {return hasUpgrade('M',315)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        322: {
            title: "Approaching The Rontometre VII",
            description: "Triple Quintillion Planck Lengths effect.",
            cost: new Decimal(4e-82),
            unlocked() {return hasUpgrade('M',321)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        323: {
            title: "Rontometre Boost",
            description: "Quadruple Volume gain, and unlock new matter.",
            cost: new Decimal(1e-81),
            unlocked() {return hasUpgrade('M',322)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        324: {
            title: "Quintillion Boost",
            description: "x50 Quintillion Planck Lengths effect.",
            cost: new Decimal(1e-78),
            unlocked() {return hasUpgrade('M',323)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        411: {
            title: "Septillion!",
            description: "Quadruple Septillion Planck Lengths effect.",
            cost: new Decimal(1e-77),
            unlocked() {return hasUpgrade('M',323)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        412: {
            title: "But Still Small.",
            description: "Double Septillion Planck Lengths effect.",
            cost: new Decimal(2e-77),
            unlocked() {return hasUpgrade('M',411)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        413: {
            title: "A Speck?",
            description: "Double Septillion Planck Lengths effect.",
            cost: new Decimal(3e-77),
            unlocked() {return hasUpgrade('M',412)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        414: {
            title: "Light At The End Of The Tunnel?",
            description: "Double Septillion Planck Lengths effect.",
            cost: new Decimal(6e-77),
            unlocked() {return hasUpgrade('M',413)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        415: {
            title: "Light At The End Of The Tunnel!",
            description: "Double Septillion Planck Lengths effect.",
            cost: new Decimal(1e-76),
            unlocked() {return hasUpgrade('M',414)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        421: {
            title: "Thank Me Later",
            description: "Volume boosts itself. [Hardcapped at 66,666x]",
            cost: new Decimal(3e-76),
            unlocked() {return hasUpgrade('M',415)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points",
            effect() {
                return player.points.mul(1e80).pow(0.2).min(66666)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        422: {
            title: "The End of The Void",
            description: "Double Volume gain, unlock new matter, and unlock a new feature.",
            cost: new Decimal(1e-72),
            unlocked() {return hasUpgrade('M',421)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        511: {
            title: "Colour Era",
            description: "Double colour token gain.",
            cost: new Decimal(1e-71),
            unlocked() {return hasUpgrade('M',422)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        512: {
            title: "More tokens",
            description: "Double colour token gain.",
            cost: new Decimal(1e-70),
            unlocked() {return hasUpgrade('M',511)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        513: {
            title: "Even more tokens",
            description: "Double colour token gain.",
            cost: new Decimal(1e-69),
            unlocked() {return hasUpgrade('M',512)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        514: {
            title: "Flooding with tokens",
            description: "Double colour token gain, and double Neutrino effect.",
            cost: new Decimal(1e-68),
            unlocked() {return hasUpgrade('M',513)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        515: {
            title: "Powerful Tokens",
            description: "Double colour token gain, colour tokens now boost volume gain, and unlock new matter.",
            cost: new Decimal(1e-67),
            unlocked() {return hasUpgrade('M',514)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points",
            effect() {
                return player[this.layer].colour_tokens.pow(0.142857142857)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        521: {
            title: "Approaching The Zeptometre I",
            description: "Double colour token gain and top quark effect.",
            cost: new Decimal(2.5e-66),
            unlocked() {return hasUpgrade('M',515)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points",
        },
        522: {
            title: "Approaching The Zeptometre II",
            description: "Double colour token gain and top quark effect.",
            cost: new Decimal(2e-65),
            unlocked() {return hasUpgrade('M',521)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points",
        },
        523: {
            title: "Approaching The Zeptometre III",
            description: "x1.41421356237 colour token gain and top quark effect.",
            cost: new Decimal(4e-64),
            unlocked() {return hasUpgrade('M',522)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points",
        },
        524: {
            title: "Zeptometre Boost",
            description: "x1.3 colour token gain, x2 volume gain, and unlock new matter.",
            cost: new Decimal(1e-63),
            unlocked() {return hasUpgrade('M',523)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points",
        },
        525: {
            title: "Another Quark?",
            description: "x1.5 colour token gain, and double Bottom Quark effect.",
            cost: new Decimal(5e-59),
            unlocked() {return hasUpgrade('M',524)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points",
        },
        531: {
            title: "Yet Another Quark?",
            description: "x1.5 colour token gain, and double Charm Quark effect.",
            cost: new Decimal(1e-56),
            unlocked() {return hasUpgrade('M',525)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points",
        },
        532: {
            title: "Approaching The Attometre I",
            description: "x1.7 colour token gain, and double Charm Quark effect.",
            cost: new Decimal(1e-55),
            unlocked() {return hasUpgrade('M',531)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points",
        },
        533: {
            title: "Approaching The Attometre II",
            description: "x1.8 colour token gain, and double Charm Quark effect.",
            cost: new Decimal(2e-55),
            unlocked() {return hasUpgrade('M',532)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points",
        },
        534: {
            title: "Approaching The Attometre II",
            description: "x1.9 colour token gain.",
            cost: new Decimal(6e-55),
            unlocked() {return hasUpgrade('M',533)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points",
        },
        535: {
            title: "Attometre Boost",
            description: "x2 colour token gain.",
            cost: new Decimal(1e-54),
            unlocked() {return hasUpgrade('M',534)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points",
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(4.22e-105).mul(new Decimal(1.1).pow(x)) },
            title: "Planck Volume",
            display() { return `+4.22e-105 m^3 per second.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + '+' + formatSmall(this.effect()) + '/sec'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){
                let mult = new Decimal(1)
                if (hasUpgrade('M',11)) mult = mult.times(2)
                if (hasUpgrade('M',12)) mult = mult.times(2)
                if (hasUpgrade('M',13)) mult = mult.times(2)
                if (hasUpgrade('M',14)) mult = mult.times(2)
                if (hasUpgrade('M',15)) mult = mult.times(2)
                if (hasUpgrade('M',21)) mult = mult.times(getBuyableAmount(this.layer,12).mul(0.25).add(1))
                if (hasUpgrade('M',22)) mult = mult.times(2)
                if (hasUpgrade('M',23)) mult = mult.times(2)
                if (hasUpgrade('M',24)) mult = mult.times(2)
                if (hasUpgrade('M',25)) mult = mult.times(2)
                if (hasUpgrade('M',31)) mult = mult.times(3)
                if (hasUpgrade('M',32)) mult = mult.times(3)
                if (hasUpgrade('M',33)) mult = mult.times(3)
                if (hasUpgrade('M',34)) mult = mult.times(3)
                if (hasUpgrade('M',35)) mult = mult.times(3)
                if (hasUpgrade('M',41)) mult = mult.times(3)
                if (hasUpgrade('M',42)) mult = mult.times(3)
                if (hasUpgrade('M',43)) mult = mult.times(3)
                if (hasUpgrade('M',44)) mult = mult.times(3)
                if (hasUpgrade('M',45)) mult = mult.times(3)
                if (hasUpgrade('M',51)) mult = mult.times(1000)
                if (hasUpgrade('M',52)) mult = mult.times(50000)
                if (hasUpgrade('M',53)) mult = mult.times(100)
                if (hasUpgrade('M',54)) mult = mult.times(4)
                if (hasUpgrade('M',54)) mult = mult.times(2)
                return getBuyableAmount(this.layer,this.id).mul(4.22e-105).mul(mult)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return true},
        },
        12: {
            cost(x) { return new Decimal(4.22e-99).mul(new Decimal(1.1).pow(x)) },
            title: "Million Planck Volumes",
            display() { return `+4.22e-102 m^3 per second.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + '+' + formatSmall(this.effect()) + '/sec'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){
                let mult = new Decimal(1)
                if (hasUpgrade('M',111)) mult = mult.times(2)
                if (hasUpgrade('M',112)) mult = mult.times(2)
                if (hasUpgrade('M',113)) mult = mult.times(2)
                if (hasUpgrade('M',114)) mult = mult.times(2)
                if (hasUpgrade('M',115)) mult = mult.times(2)
                if (hasUpgrade('M',121)) mult = mult.times(getBuyableAmount(this.layer,11).mul(0.01).add(1))
                if (hasUpgrade('M',122)) mult = mult.times(2)
                if (hasUpgrade('M',123)) mult = mult.times(2)
                if (hasUpgrade('M',124)) mult = mult.times(2)
                if (hasUpgrade('M',125)) mult = mult.times(2)
                if (hasUpgrade('M',131)) mult = mult.times(3)
                if (hasUpgrade('M',132)) mult = mult.times(3)
                if (hasUpgrade('M',133)) mult = mult.times(3)
                if (hasUpgrade('M',135)) mult = mult.times(10)
                if (hasUpgrade('M',221)) mult = mult.times(getBuyableAmount(this.layer,this.id).mul(0.01).add(1))
                if (hasUpgrade('M',223)) mult = mult.times(getBuyableAmount(this.layer,13).mul(0.01).add(1))
                if (hasUpgrade('M',141)) mult = mult.times(500)
                if (hasUpgrade('M',142)) mult = mult.times(25000)
                if (hasUpgrade('M',143)) mult = mult.times(100)
                if (hasUpgrade('M',144)) mult = mult.times(8)
                if (hasUpgrade('M',145)) mult = mult.times(2)
                return getBuyableAmount(this.layer,this.id).mul(4.22e-102).mul(mult)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (hasUpgrade('M',15))},
        },
        13: {
            cost(x) { return new Decimal(4.22e-93).mul(new Decimal(1.1).pow(x)) },
            title: "Trillion Planck Volumes",
            display() { return `+2e-97 m^3 per second.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + '+' + formatSmall(this.effect()) + '/sec'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){
                let mult = new Decimal(1)
                if (hasUpgrade('M',211)) mult = mult.times(2)
                if (hasUpgrade('M',212)) mult = mult.times(2)
                if (hasUpgrade('M',213)) mult = mult.times(2)
                if (hasUpgrade('M',214)) mult = mult.times(2)
                if (hasUpgrade('M',215)) mult = mult.times(2)
                if (hasUpgrade('M',221)) mult = mult.times(getBuyableAmount(this.layer,this.id).mul(0.01).add(1))
                if (hasUpgrade('M',223)) mult = mult.times(getBuyableAmount(this.layer,12).mul(0.01).add(1))
                if (hasUpgrade('M',224)) mult = mult.times(2)
                if (hasUpgrade('M',225)) mult = mult.times(2)
                if (hasUpgrade('M',231)) mult = mult.times(100)
                if (hasUpgrade('M',232)) mult = mult.times(getBuyableAmount(this.layer,21).mul(0.2).add(1))
                if (hasUpgrade('M',233)) mult = mult.times(1000)
                return getBuyableAmount(this.layer,this.id).mul(2e-97).mul(mult)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (hasUpgrade('M',123))},
        },
        21: {
            cost(x) { return new Decimal(4.22e-87).mul(new Decimal(1.1).pow(x)) },
            title: "Quintillion Planck Volumes",
            display() { return `+1.5e-91 m^3 per second.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + '+' + formatSmall(this.effect()) + '/sec'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){
                let mult = new Decimal(1)
                if (hasUpgrade('M',311)) mult = mult.times(3)
                if (hasUpgrade('M',312)) mult = mult.times(2)
                if (hasUpgrade('M',313)) mult = mult.times(getBuyableAmount(this.layer,13).mul(0.005).add(1))
                if (hasUpgrade('M',314)) mult = mult.times(2)
                if (hasUpgrade('M',315)) mult = mult.times(2)
                if (hasUpgrade('M',321)) mult = mult.times(2)
                if (hasUpgrade('M',322)) mult = mult.times(3)
                if (hasUpgrade('M',324)) mult = mult.times(50)
                return getBuyableAmount(this.layer,this.id).mul(1.5e-91).mul(mult)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (hasUpgrade('M',224))},
        },
        22: {
            cost(x) { return new Decimal(4.22e-81).mul(new Decimal(1.1).pow(x)) },
            title: "Septillion Planck Volumes",
            display() { return `+1e-86 m^3 per second.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + '+' + formatSmall(this.effect()) + '/sec'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){
                let mult = new Decimal(1)
                if (hasUpgrade('M',411)) mult = mult.times(4)
                if (hasUpgrade('M',412)) mult = mult.times(2)
                if (hasUpgrade('M',413)) mult = mult.times(2)
                if (hasUpgrade('M',414)) mult = mult.times(2)
                if (hasUpgrade('M',415)) mult = mult.times(2)
                return getBuyableAmount(this.layer,this.id).mul(1e-86).mul(mult)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (hasUpgrade('M',323))},
        },
        23: {
            cost(x) { return new Decimal(1e-72).mul(new Decimal(1.1).pow(x)) },
            title: "Neutrino",
            display() { return `+1e-81 m^3 per second.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + '+' + formatSmall(this.effect()) + '/sec'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){
                let mult = new Decimal(1)
                if (hasUpgrade('M',514)) mult = mult.times(2)
                return getBuyableAmount(this.layer,this.id).mul(1e-81).mul(mult).mul(new Decimal(2).pow(getBuyableAmount(this.layer,this.id).mul(0.04).floor()))},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (hasUpgrade('M',422))},
        },
        31: {
            cost(x) { return new Decimal(1e-66).mul(new Decimal(1.1).pow(x)) },
            title: "Top Quark",
            display() { return `+7.5e-79 m^3 per second.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + '+' + formatSmall(this.effect()) + '/sec'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){
                let mult = new Decimal(1)
                if (hasUpgrade('M',521)) mult = mult.times(2)
                if (hasUpgrade('M',522)) mult = mult.times(2)
                if (hasUpgrade('M',523)) mult = mult.times(1.41421356237)
                return getBuyableAmount(this.layer,this.id).mul(7.5e-79).mul(mult).mul(new Decimal(2).pow(getBuyableAmount(this.layer,this.id).mul(0.04).floor()))},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (hasUpgrade('M',515))},
        },
        32: {
            cost(x) { return new Decimal(4e-63).mul(new Decimal(1.1).pow(x)) },
            title: "Preon",
            display() { return `+4e-77 m^3 per second.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + '+' + formatSmall(this.effect()) + '/sec'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){
                let mult = new Decimal(1)
                return getBuyableAmount(this.layer,this.id).mul(4e-77).mul(mult).mul(new Decimal(2).pow(getBuyableAmount(this.layer,this.id).mul(0.04).floor()))},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (hasUpgrade('M',524))},
        },
        33: {
            cost(x) { return new Decimal(1.5e-59).mul(new Decimal(1.1).pow(x)) },
            title: "Bottom Quark",
            display() { return `+2.5e-75 m^3 per second.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + '+' + formatSmall(this.effect()) + '/sec'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){
                let mult = new Decimal(1)
                if (hasUpgrade('M',525)) mult = mult.times(2)
                return getBuyableAmount(this.layer,this.id).mul(2.5e-75).mul(mult).mul(new Decimal(2).pow(getBuyableAmount(this.layer,this.id).mul(0.04).floor()))},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (getBuyableAmount(this.layer, 32).gte(1))},
        },
        41: {
            cost(x) { return new Decimal(5e-58).mul(new Decimal(1.1).pow(x)) },
            title: "Charm Quark",
            display() { return `+3e-74 m^3 per second.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + '+' + formatSmall(this.effect()) + '/sec'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){
                let mult = new Decimal(1)
                if (hasUpgrade('M',531)) mult = mult.times(2)
                if (hasUpgrade('M',532)) mult = mult.times(2)
                if (hasUpgrade('M',533)) mult = mult.times(2)
                return getBuyableAmount(this.layer,this.id).mul(3e-74).mul(mult).mul(new Decimal(2).pow(getBuyableAmount(this.layer,this.id).mul(0.04).floor()))},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (getBuyableAmount(this.layer, 33).gte(1))},
        },
        10011: {
            cost(x) { return new Decimal(3).mul(new Decimal(3).pow(x)) },
            title: "Red Boost",
            display() { return `x2 red on roll.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + 'x' + formatSmall(this.effect())},
            canAfford() { return player[this.layer].red.gte(this.cost()) },
            effect(){
                return new Decimal(2).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (new Decimal(player[this.layer].red.gte(1)))},
            style() {
                let style = {
                }
                if(this.canAfford() == true) {
                    return {"background-color": "#ff0000", ...style}
                } 
                return {...style}
            },
        },
        10012: {
            cost(x) { return new Decimal(3).mul(new Decimal(3).pow(x)) },
            title: "Orange Boost",
            display() { return `x2 orange on roll.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + 'x' + formatSmall(this.effect())},
            canAfford() { return player[this.layer].orange.gte(this.cost()) },
            effect(){
                return new Decimal(2).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (new Decimal(player[this.layer].orange.gte(1)))},
            style() {
                let style = {
                }
                if(this.canAfford() == true) {
                    return {"background-color": "#ff6600", ...style}
                } 
                return {...style}
            },
        },
        10013: {
            cost(x) { return new Decimal(3).mul(new Decimal(3).pow(x)) },
            title: "Yellow Boost",
            display() { return `x2 yellow on roll.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + 'x' + formatSmall(this.effect())},
            canAfford() { return player[this.layer].yellow.gte(this.cost()) },
            effect(){
                return new Decimal(2).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (new Decimal(player[this.layer].yellow.gte(1)))},
            style() {
                let style = {
                }
                if(this.canAfford() == true) {
                    return {"background-color": "#ffff00", ...style}
                } 
                return {...style}
            },
        },
        10021: {
            cost(x) { return new Decimal(3).mul(new Decimal(3).pow(x)) },
            title: "Green Boost",
            display() { return `x2 green on roll.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + 'x' + formatSmall(this.effect())},
            canAfford() { return player[this.layer].green.gte(this.cost()) },
            effect(){
                return new Decimal(2).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (new Decimal(player[this.layer].green.gte(1)))},
            style() {
                let style = {
                }
                if(this.canAfford() == true) {
                    return {"background-color": "#00ff00", ...style}
                } 
                return {...style}
            },
        },
        10022: {
            cost(x) { return new Decimal(3).mul(new Decimal(3).pow(x)) },
            title: "Blue Boost",
            display() { return `x2 blue on roll.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + 'x' + formatSmall(this.effect())},
            canAfford() { return player[this.layer].blue.gte(this.cost()) },
            effect(){
                return new Decimal(2).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (new Decimal(player[this.layer].blue.gte(1)))},
            style() {
                let style = {
                }
                if(this.canAfford() == true) {
                    return {"background-color": "#0099ff", ...style}
                } 
                return {...style}
            },
        },
        10023: {
            cost(x) { return new Decimal(3).mul(new Decimal(3).pow(x)) },
            title: "Indigo Boost",
            display() { return `x2 indigo on roll.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + 'x' + formatSmall(this.effect())},
            canAfford() { return player[this.layer].indigo.gte(this.cost()) },
            effect(){
                return new Decimal(2).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (new Decimal(player[this.layer].indigo.gte(1)))},
            style() {
                let style = {
                }
                if(this.canAfford() == true) {
                    return {"background-color": "#4400ff", ...style}
                } 
                return {...style}
            },
        },
        10031: {
            cost(x) { return new Decimal(3).mul(new Decimal(3).pow(x)) },
            title: "Violet Boost",
            display() { return `x2 violet on roll.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + 'x' + formatSmall(this.effect())},
            canAfford() { return player[this.layer].violet.gte(this.cost()) },
            effect(){
                return new Decimal(2).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (new Decimal(player[this.layer].violet.gte(1)))},
            style() {
                let style = {
                }
                if(this.canAfford() == true) {
                    return {"background-color": "#9900ff", ...style}
                } 
                return {...style}
            },
        },
    },
    bars: {
        bigBar: {
            direction: RIGHT,
            width: 400,
            height: 50,
            progress() { return new Decimal(player.points).mul(2e100).div(new Decimal(2).pow(new Decimal(player.points).mul(2e100).log(2).floor().add(1)).max(1)) },
            display() {return format(new Decimal(player.points).mul(1e100).log(2).floor().add(1).max(0)) + ` Volume Level, which gives a ` + format(new Decimal(1.05).pow(new Decimal(player.points).mul(1e100).log(2).floor().add(1).max(0)).mul(new Decimal(player.points).mul(1e100).log(2).floor().add(2).max(1)).floor()) + `x boost to volume gain.`},
            fillStyle: {
                backgroundColor: "#ff4040"
            },
            unlocked () {return hasUpgrade('M',13)}
        },
        redBar: {
            direction: RIGHT,
            width: 400,
            height: 50,
            progress() { return new Decimal(player[this.layer].red).div(new Decimal(2).pow(new Decimal(player[this.layer].red).add(0.0000001).log(2).ceil().max(1)))},
            display() {return format(new Decimal(player[this.layer].red).add(0.0000001).log(2).ceil().max(0)) + ` Red Level, which gives a ` + format(new Decimal(1.1).pow(new Decimal(player[this.layer].red).add(0.0000001).log(2).ceil().max(0))) + `x boost to volume gain.`},
            fillStyle: {
                backgroundColor: "#ff0000"
            },
            unlocked () {return hasUpgrade('M',422)}
        },
        orangeBar: {
            direction: RIGHT,
            width: 400,
            height: 50,
            progress() { return new Decimal(player[this.layer].orange).div(new Decimal(2).pow(new Decimal(player[this.layer].orange).add(0.0000001).log(2).ceil().max(1)))},
            display() {return format(new Decimal(player[this.layer].orange).add(0.0000001).log(2).ceil().max(0)) + ` Orange Level, which gives a ` + format(new Decimal(1.1).pow(new Decimal(player[this.layer].orange).add(0.0000001).log(2).ceil().max(0))) + `x boost to volume gain.`},
            fillStyle: {
                backgroundColor: "#ff6600"
            },
            unlocked () {return hasUpgrade('M',422)}
        },
        yellowBar: {
            direction: RIGHT,
            width: 400,
            height: 50,
            progress() { return new Decimal(player[this.layer].yellow).div(new Decimal(2).pow(new Decimal(player[this.layer].yellow).add(0.0000001).log(2).ceil().max(1)))},
            display() {return format(new Decimal(player[this.layer].yellow).add(0.0000001).log(2).ceil().max(0)) + ` Yellow Level, which gives a ` + format(new Decimal(1.1).pow(new Decimal(player[this.layer].yellow).add(0.0000001).log(2).ceil().max(0))) + `x boost to volume gain.`},
            fillStyle: {
                backgroundColor: "#ffff00"
            },
            unlocked () {return hasUpgrade('M',422)}
        },
        greenBar: {
            direction: RIGHT,
            width: 400,
            height: 50,
            progress() { return new Decimal(player[this.layer].green).div(new Decimal(2).pow(new Decimal(player[this.layer].green).add(0.0000001).log(2).ceil().max(1)))},
            display() {return format(new Decimal(player[this.layer].green).add(0.0000001).log(2).ceil().max(0)) + ` Green Level, which gives a ` + format(new Decimal(1.1).pow(new Decimal(player[this.layer].green).add(0.0000001).log(2).ceil().max(0))) + `x boost to volume gain.`},
            fillStyle: {
                backgroundColor: "#00ff00"
            },
            unlocked () {return hasUpgrade('M',422)}
        },
        blueBar: {
            direction: RIGHT,
            width: 400,
            height: 50,
            progress() { return new Decimal(player[this.layer].blue).div(new Decimal(2).pow(new Decimal(player[this.layer].blue).add(0.0000001).log(2).ceil().max(1)))},
            display() {return format(new Decimal(player[this.layer].blue).add(0.0000001).log(2).ceil().max(0)) + ` Blue Level, which gives a ` + format(new Decimal(1.1).pow(new Decimal(player[this.layer].blue).add(0.0000001).log(2).ceil().max(0))) + `x boost to volume gain.`},
            fillStyle: {
                backgroundColor: "#0099ff"
            },
            unlocked () {return hasUpgrade('M',422)}
        },
        indigoBar: {
            direction: RIGHT,
            width: 400,
            height: 50,
            progress() { return new Decimal(player[this.layer].indigo).div(new Decimal(2).pow(new Decimal(player[this.layer].indigo).add(0.0000001).log(2).ceil().max(1)))},
            display() {return format(new Decimal(player[this.layer].indigo).add(0.0000001).log(2).ceil().max(0)) + ` Indigo Level, which gives a ` + format(new Decimal(1.1).pow(new Decimal(player[this.layer].indigo).add(0.0000001).log(2).ceil().max(0))) + `x boost to volume gain.`},
            fillStyle: {
                backgroundColor: "#4400ff"
            },
            unlocked () {return hasUpgrade('M',422)}
        },
        violetBar: {
            direction: RIGHT,
            width: 400,
            height: 50,
            progress() { return new Decimal(player[this.layer].violet).div(new Decimal(2).pow(new Decimal(player[this.layer].violet).add(0.0000001).log(2).ceil().max(1)))},
            display() {return format(new Decimal(player[this.layer].violet).add(0.0000001).log(2).ceil().max(0)) + ` Violet Level, which gives a ` + format(new Decimal(1.1).pow(new Decimal(player[this.layer].violet).add(0.0000001).log(2).ceil().max(0))) + `x boost to volume gain.`},
            fillStyle: {
                backgroundColor: "#9900ff"
            },
            unlocked () {return hasUpgrade('M',422)}
        },
    },
    clickables: {
        11: {
            title: "Red",
            display: "Click this to get a random amount of red.<br><br>Cost: 50 colour tokens",
            canClick() {
                if (new Decimal(player[this.layer].colour_tokens).gte(50)) return true
                else return false
            },
            onClick() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(50)
                player[this.layer].red = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10011)).max(player[this.layer].red)
            },
            onHold() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(50)
                player[this.layer].red = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10011)).max(player[this.layer].red)
            },
            style() {
                let style = {
                }
                if(this.canClick() == true) {
                    return {"background-color": "#ff0000", ...style}
                } 
                return {...style}
            },
        },
        12: {
            title: "Orange",
            display: "Click this to get a random amount of orange.<br><br>Cost: 150 colour tokens",
            canClick() {
                if (new Decimal(player[this.layer].colour_tokens).gte(150)) return true
                else return false
            },
            onClick() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(150)
                player[this.layer].orange = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10012)).max(player[this.layer].orange)
            },
            onHold() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(150)
                player[this.layer].orange = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10012)).max(player[this.layer].orange)
            },
            style() {
                let style = {
                }
                if(this.canClick() == true) {
                    return {"background-color": "#ff6600", ...style}
                } 
                return {...style}
            },
        },
        13: {
            title: "Yellow",
            display: "Click this to get a random amount of yellow.<br><br>Cost: 500 colour tokens",
            canClick() {
                if (new Decimal(player[this.layer].colour_tokens).gte(500)) return true
                else return false
            },
            onClick() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(500)
                player[this.layer].yellow = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10013)).max(player[this.layer].yellow)
            },
            onHold() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(500)
                player[this.layer].yellow = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10013)).max(player[this.layer].yellow)
            },
            style() {
                let style = {
                }
                if(this.canClick() == true) {
                    return {"background-color": "#ffff00", ...style}
                } 
                return {...style}
            },
        },
        14: {
            title: "Green",
            display: "Click this to get a random amount of green.<br><br>Cost: 1800 colour tokens",
            canClick() {
                if (new Decimal(player[this.layer].colour_tokens).gte(1800)) return true
                else return false
            },
            onClick() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(1800)
                player[this.layer].green = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10021)).max(player[this.layer].green)
            },
            onHold() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(1800)
                player[this.layer].green = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10021)).max(player[this.layer].green)
            },
            style() {
                let style = {
                }
                if(this.canClick() == true) {
                    return {"background-color": "#00ff00", ...style}
                } 
                return {...style}
            },
        },
        15: {
            title: "Blue",
            display: "Click this to get a random amount of blue.<br><br>Cost: 7000 colour tokens",
            canClick() {
                if (new Decimal(player[this.layer].colour_tokens).gte(7000)) return true
                else return false
            },
            onClick() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(7000)
                player[this.layer].blue = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10022)).max(player[this.layer].blue)
            },
            onHold() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(7000)
                player[this.layer].blue = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10022)).max(player[this.layer].blue)
            },
            style() {
                let style = {
                }
                if(this.canClick() == true) {
                    return {"background-color": "#0099ff", ...style}
                } 
                return {...style}
            },
        },
        21: {
            title: "Indigo",
            display: "Click this to get a random amount of indigo.<br><br>Cost: 30000 colour tokens",
            canClick() {
                if (new Decimal(player[this.layer].colour_tokens).gte(30000)) return true
                else return false
            },
            onClick() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(30000)
                player[this.layer].indigo = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10023)).max(player[this.layer].indigo)
            },
            onHold() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(30000)
                player[this.layer].indigo = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10023)).max(player[this.layer].indigo)
            },
            style() {
                let style = {
                }
                if(this.canClick() == true) {
                    return {"background-color": "#4400ff", ...style}
                } 
                return {...style}
            },
        },
        22: {
            title: "Violet",
            display: "Click this to get a random amount of violet.<br><br>Cost: 125000 colour tokens",
            canClick() {
                if (new Decimal(player[this.layer].colour_tokens).gte(125000)) return true
                else return false
            },
            onClick() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(125000)
                player[this.layer].violet = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10031)).max(player[this.layer].violet)
            },
            onHold() {
                player[this.layer].colour_tokens = new Decimal(player[this.layer].colour_tokens).sub(125000)
                player[this.layer].violet = new Decimal(Math.random()).pow(-1).sqrt().mul(buyableEffect('M',10031)).max(player[this.layer].violet)
            },
            style() {
                let style = {
                }
                if(this.canClick() == true) {
                    return {"background-color": "#9900ff", ...style}
                } 
                return {...style}
            },
        },
    }
})