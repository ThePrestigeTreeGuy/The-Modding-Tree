addLayer("d", {
    name: "doors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🚪", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#49261A",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "doors", // Name of prestige currency
    baseResource: "studs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('d', 23)) mult = mult.times(upgradeEffect('d', 23))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for doors", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    canBuyMax() {return hasMilestone("du",1)},
    autoPrestige() {if (hasMilestone("f",1))
{return true}
else if (hasMilestone("g",3))
{return true}},
    resetsNothing() {if (hasMilestone ('g',1))
    {return true}},
    upgrades: {
        11: {
        title: "Doors 1",
        description: "x (doors+1)^1.5 stud gain",
        cost: new Decimal(1),
        effect() {
            return player[this.layer].points.add(1).pow(1.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Doors 2",
            description: "x log2(doors+1)+1 stud gain",
            cost: new Decimal(12),
            unlocked(){if (hasUpgrade("d",11))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player[this.layer].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Doors 3",
            description: "x (rush+1)^2 stud gain",
            cost: new Decimal(25),
            unlocked(){if (hasUpgrade("r",13))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player["r"].points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Doors 4",
            description: "x (doors+1)^2 stud gain",
            cost: new Decimal(36),
            unlocked(){if (hasUpgrade("k",15))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player[this.layer].points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Doors 5",
            description: "x (doors+1) knob and stud gain and unlock a closet upgrade",
            cost: new Decimal(65),
            unlocked(){if (hasUpgrade("c",23))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player[this.layer].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Doors 6",
            description: "x (doors+1) rush",
            cost: new Decimal(155),
            unlocked(){return hasUpgrade("g",15)},
            effect() {
                return player[this.layer].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Doors 7",
            description: "x (doors+1)^0.5 gold",
            cost: new Decimal(162),
            unlocked(){return hasUpgrade("d",21)},
            effect() {
                return player[this.layer].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Doors 8",
            description: "/(log10(studs+1)+1)^3 door requirement",
            cost: new Decimal(174),
            unlocked(){return hasUpgrade("d",22)},
            effect() {
                return player.points.add(1).log10().add(1).pow(-3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "Doors 9",
            description: "random nothing here! log10(studs+1) rush gain?",
            cost: new Decimal(184),
            unlocked(){return hasUpgrade("d",23)},
            effect() {
                return player.points.add(1).log10()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        25: {
            title: "Doors 10",
            description: "ohio upgrade (doors+1) gold gain... (check floors)",
            cost: new Decimal(193),
            unlocked(){return hasUpgrade("d",24)},
            effect() {
                return player[this.layer].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    branches: ["d","r"]
})
addLayer("c", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#3F0D06",                       // The color for this layer, which affects many elements.
    resource: "closets",            // The name of this layer's main prestige resource.
    row: 0, // The row this layer is on (0 is the first row).
    position: 1,                                
    hotkeys: [
        {key: "c", description: "C: Reset for closets", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    baseResource: "studs",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(250),           // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "static",                         // Determines the formula used for calculating prestige currency.
    exponent: 1.1,                         // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1)
        return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    canBuyMax() {if (hasUpgrade ('r',14))
    {return true}
    else if (hasMilestone ('g',4))
    {return true}},
    autoPrestige() {return hasMilestone("du",2)},
    resetsNothing() {if (hasMilestone ('du',3))
                {return true}},
    milestones: {
        1: {
            requirementDescription: "Requires: 22 Closets",
            effectDescription: "You can reset for the new layer.",
            done() { return player.c.points.gte(22) }
        },
    },
    upgrades: {
        11: {
        title: "Closets 1",
        description: "x10 stud gain!",
        cost: new Decimal(1),
        },
        12: {
        title: "Closets 2",
        description: "x (closets+1)^3 stud gain",
        cost: new Decimal(2),
        unlocked(){if (hasUpgrade("c",11))
        {return true}
            else if (hasMilestone('g',3))
        {return true}},
        effect() {
            return player[this.layer].points.add(1).pow(3)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Closets 3",
            description: "x log2(closets+1)+1 knob gain",
            cost: new Decimal(20),
            unlocked(){if (hasUpgrade("c",12))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player[this.layer].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Closets 4",
            description: "x (closets+1)^0.2 rush gain",
            cost: new Decimal(25),
            unlocked(){if (hasUpgrade("r",11))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Closets 5",
            description: "haha knob go brrr anyway, x (closets+1) knob gain and unlock more knob upgrades",
            cost: new Decimal(35),
            unlocked(){if (hasUpgrade("c",14))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player[this.layer].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Closets 6",
            description: "x log(knobs+1)+1 rush and unlock a rush upgrade",
            cost: new Decimal(69),
            unlocked(){if (hasUpgrade("c",15))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player["k"].points.add(1).log10().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Closets 7",
            description: "x(Closets+1)^2 stud gain",
            cost: new Decimal(78),
            unlocked(){if (hasUpgrade("c",21))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player["c"].points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Closets 8",
            description: "xlog2(closets+1)+1 stud gain and unlock a door upgrade",
            cost: new Decimal(89),
            unlocked(){if (hasUpgrade("c",22))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player["c"].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "Closets 9",
            description: "xlog2(log(knob+1)+1)+1 rush gain",
            cost: new Decimal(98),
            unlocked(){if (hasUpgrade("d",15))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player["k"].points.add(1).log10().add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        25: {
            title: "Closets 10",
            description: "Unlock a new layer, x100 studs.",
            cost: new Decimal(143),
            unlocked(){if (hasUpgrade("r",15))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
        },
    },
    branches: ["c","r"]
})
addLayer("k", {
    name: "knobs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "K", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFDDBB",
    requires: new Decimal(1e8), // Can be a function that takes requirement increases into account
    resource: "knobs", // Name of prestige currency
    baseResource: "studs", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('c', 13)) mult = mult.times(upgradeEffect('c', 13))
        if (hasUpgrade('c', 15)) mult = mult.times(upgradeEffect('c', 15))
        if (hasUpgrade('k', 21)) mult = mult.times(upgradeEffect('k', 21))
        if (hasUpgrade('k', 22)) mult = mult.times(upgradeEffect('k', 22))
        if (hasUpgrade('d', 15)) mult = mult.times(upgradeEffect('d', 15))
        if (hasUpgrade('du', 14)) mult = mult.times(upgradeEffect('d', 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "k", description: "K: Reset for knobs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        if (hasMilestone("du",4)) return 1;
      },
    upgrades: {
        11: {
            title: "Knobs 1",
            description: "x10 stud gain!",
            cost: new Decimal(1),
            },
        12: {
            title: "Knobs 2",
            description: "x log2(knobs+1)+1 stud gain",
            cost: new Decimal(10),
            unlocked(){if (hasUpgrade("k",11))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player[this.layer].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
        13: {
            title: "Knobs 3",
            description: "x (ln(knobs+1)+1)*2 stud gain",
            cost: new Decimal(250),
            unlocked(){if (hasUpgrade("k",12))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player[this.layer].points.add(1).ln().add(1).mul(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Knobs 4",
            description: "x (doors+1) stud gain",
            cost: new Decimal(1e8),
            unlocked(){if (hasUpgrade("c",15))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player["d"].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Knobs 5",
            description: "Unlock more door upgrades and x log2(knobs+1)+1 stud gain",
            cost: new Decimal(1e9),
            unlocked(){if (hasUpgrade("k",14))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}},
            effect() {
                return player["k"].points.add(1).log10().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Knobs 6",
            description: "xlog10(knobs+1)+1 knobs",
            cost: new Decimal(1e98),
            unlocked(){return (hasMilestone("f",2))},
            effect() {
                return player[this.layer].points.add(1).log10().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Knobs 7",
            description: "Googol knobs! Anyway, (dupe+1)^3 knobs",
            cost: new Decimal(1e100),
            unlocked(){return (hasUpgrade("k",21))},
            effect() {
                return player["du"].points.add(1).pow(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Knobs 8",
            description: "x(log10(knobs+1)+1) gold gain!",
            cost: new Decimal(1e106),
            unlocked(){return (hasUpgrade("k",22))},
            effect() {
                return player[this.layer].points.add(1).log10().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "Knobs 9",
            description: "^1.05 studs:D",
            cost: new Decimal(1e112),
            unlocked(){return (hasUpgrade("k",23))},
        },
        25: {
            title: "Knobs 10",
            description: "^1.05 studs AGAIN?????",
            cost: new Decimal(1e117),
            unlocked(){return (hasUpgrade("k",24))},
        },
    },
    branches: ["k","r"],
    layerShown(){return true},
})
addLayer("r", {
    name: "rush", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#333333",
    requires: new Decimal(22), // Can be a function that takes requirement increases into account
    resource: "rush", // Name of prestige currency
    baseResource: "closets", // Name of resource prestige is based on
    baseAmount() {return player["c"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('d', 21)) mult = mult.times(upgradeEffect('d', 21))
        if (hasUpgrade('d', 24)) mult = mult.times(upgradeEffect('d', 24))
        if (hasUpgrade('c', 14)) mult = mult.times(upgradeEffect('c', 14))
        if (hasUpgrade('c', 21)) mult = mult.times(upgradeEffect('c', 21))
        if (hasUpgrade('c', 24)) mult = mult.times(upgradeEffect('c', 24))
        if (hasUpgrade('du', 11)) mult = mult.times(upgradeEffect('du', 11))
        if (hasUpgrade('du', 15)) mult = mult.times(upgradeEffect('du', 15))
        mult = mult.times(tmp["g"].effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for rush", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration() {
        if (player.r.points.gte(500)) return 1;
        else if (player.g.points.gte(2)) return 1;
      },
    milestones: {
        1: {
            requirementDescription: "Requires: 500 Rush",
            effectDescription: "Gain 100% of rush per second",
            done() { return player.r.points.gte(500) }
        },
        2: {
            requirementDescription: "Requires: 5e7 Rush",
            effectDescription: "Unlock a new layer. Some doors are not what they seem...",
            done() { return player.r.points.gte(5e7) }
        },
    },
    upgrades: {
        11: {
            title: "Rush 1",
            description: "x10 stud gain and unlocks more closet upgrades",
            cost: new Decimal(1),
            },
        12: {
            title: "Rush 2",
            description: "x closets+1 stud gain",
            cost: new Decimal(2),
            unlocked(){return hasUpgrade("r",11)},
            effect() {
                return player["c"].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Rush 3",
            description: "Unlock a door and a closet upgrade",
            cost: new Decimal(5),
            unlocked(){return hasUpgrade("r",12)},
        },
        14: {
            title: "Rush 4",
            description: "You can bulk buy closets",
            cost: new Decimal(1e5),
            unlocked(){return hasUpgrade("c",21)},
        },
        15: {
            title: "Rush 5",
            description: "x(log10(rush+1)+1)^3 stud gain and unlock a closet upgrade",
            cost: new Decimal(2.5e10),
            unlocked(){return hasMilestone("du",5)},
            effect() {
                return player["r"].points.add(1).log10().add(1).pow(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        },
})
addLayer("du", {
    name: "dupes", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🚪?", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#880000",
    requires: new Decimal(72), // Can be a function that takes requirement increases into account
    resource: "dupes", // Name of prestige currency
    baseResource: "doors", // Name of resource prestige is based on
    baseAmount() {return player["d"].points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 1.01,
    exponent: 1.13, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    branches: ["d","du"],
    hotkeys: [
        {key: "u", description: "U: Reset for dupe", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown() {if (hasMilestone ('r',2))
    {return true}
                else if (hasMilestone ('g',3))
    {return true}},
    canBuyMax() {if (hasMilestone ('du',4))
    {return true}
    else if (hasMilestone ('g',4))
    {return true}},
    resetsNothing() {if (hasMilestone ('g',5))
    {return true}},
    milestones: {
        1: {
            requirementDescription: "Requires: 1 Dupe",
            effectDescription: "x100 studs and you can bulk buy doors",
            done() { return player.du.points.gte(1) }
        },
        2: {
            requirementDescription: "Requires: 2 Dupes",
            effectDescription: "Autobuy closets",
            done() { return player.du.points.gte(2) },
            unlocked(){return hasMilestone("du",1)},
        },
        3: {
            requirementDescription: "Requires: 3 Dupes",
            effectDescription: "Closets reset nothing!",
            done() { return player.du.points.gte(3) },
            unlocked(){return hasMilestone("du",2)},
        },
        4: {
            requirementDescription: "Requires: 5 Dupes",
            effectDescription: "Unlocks Dupe upgrades, gain 100% of knobs per second, you can bulk buy dupes",
            done() { return player.du.points.gte(5) },
            unlocked(){return hasMilestone("du",3)},
        },
        5: {
            requirementDescription: "Requires: 16 Dupes",
            effectDescription: "Unlock a rush upgrade",
            done() { return player.du.points.gte(16) },
            unlocked(){return hasUpgrade("du",15)},
        },
    },
    upgrades: {
        11: {
            title: "Dupe 1",
            description: "x (dupe+1)^0.5 rush gain",
            cost: new Decimal(5),
            unlocked(){return hasMilestone("du",4)},
            effect() {
                return player["du"].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Dupe 2",
            description: "x (dupe+1)^2 stud gain",
            cost: new Decimal(6),
            unlocked(){return hasUpgrade("du",11)},
            effect() {
                return player["du"].points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Dupe 3",
            description: "x (log10(doors+1)+1)^5 stud gain",
            cost: new Decimal(7),
            unlocked(){return hasUpgrade("du",12)},
            effect() {
                return player["d"].points.add(1).log10().add(1).pow(5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Dupe 4",
            description: "x log2(knobs+1)+1 stud and knob gain",
            cost: new Decimal(11),
            unlocked(){return hasUpgrade("du",13)},
            effect() {
                return player["k"].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Dupe 5",
            description: "Unlock a dupe milestone and x(dupe+1) studs and rush",
            cost: new Decimal(14),
            unlocked(){return hasUpgrade("du",14)},
            effect() {
                return player["du"].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
})
addLayer("f", {
    name: "floors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🚪🚪", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#555555",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "floors", // Name of prestige currency
    baseResource: "doors", // Name of resource prestige is based on
    baseAmount() {return player["d"].points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    resetsNothing() {if (hasUpgrade ('g',15))
    {return true}},
    hotkeys: [
        {key: "f", description: "F: Reset for floors", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (hasUpgrade ('c',25))
                {return true}
                else if (hasMilestone ('f',1))
                {return true}},
    milestones: {
        1: {
            requirementDescription: "Requires: 1 Floor",
            effectDescription: "x100 studs, you can autobuy doors, and unlock a new layer that resets everything before it",
            done() { return player.f.points.gte(1) }
        },
        2: {
            requirementDescription: "Requires: 2 Floors",
            effectDescription: "x(floors+1)^^2 gold gain (OMG TETRATION), also add more knob upgrades",
            done() { return player.f.points.gte(2) },
            unlocked(){return hasUpgrade("d",25)},
            effect() {
                return player[this.layer].points.add(1).tetrate(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    upgrades: {

    },
    branches: ["d","f"]
})
addLayer("g", {
    name: "gold", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFEE80",
    requires: new Decimal(1e45), // Can be a function that takes requirement increases into account
    resource: "gold", // Name of prestige currency
    baseResource: "knobs", // Name of resource prestige is based on
    baseAmount() {return player["k"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.05, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('g', 11)) mult = mult.times(upgradeEffect('g', 11))
        if (hasUpgrade('d', 22)) mult = mult.times(upgradeEffect('d', 22))
        if (hasUpgrade('d', 25)) mult = mult.times(upgradeEffect('d', 25))
        if (hasUpgrade('k', 23)) mult = mult.times(upgradeEffect('k', 23))
        if (hasMilestone('f', 2)) mult = mult.times(tmp['f'].milestones[2].effect)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    effect() {
        return player[this.layer].points.add(1)
    },
    effectDescription() { return 'multiplying rush gain by ' + format(tmp['g'].effect)},
    row: 2, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0, //changes which row the layer appears on
    hotkeys: [
        {key: "g", description: "G: Reset for gold", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (hasMilestone ('f',1))
                {return true}
                else if (hasMilestone ('g',1))
                {return true}},
    milestones: {
        1: {
            requirementDescription: "Requires: 1 gold",
            effectDescription: "x100 studs, doors reset nothing",
            done() { return player.g.points.gte(1) }
        },
        2: {
            requirementDescription: "Requires: 2 gold",
            effectDescription: "Keep the effect of Rush Milestone 1",
            done() { return player.g.points.gte(2) }
        },
        3: {
            requirementDescription: "Requires: 3 gold",
            effectDescription: "Keep Dupe layer and all row 1 pre-gold upgrades unlocked, keep door automation",
            done() { return player.g.points.gte(3) }
        },
        4: {
            requirementDescription: "Requires: 4 gold",
            effectDescription: "Keep the ability to bulk buy Dupes and Closets",
            done() { return player.g.points.gte(4) }
        },
        5: {
            requirementDescription: "Requires: 5 gold",
            effectDescription: "Unlock gold upgrades, dupe resets nothing.",
            done() { return player.g.points.gte(5) }
        },
    },
    upgrades: {
        11: {
            title: "Gold 1",
            description: "x (log10(rush+1)+1)^2 stud and gold gain",
            cost: new Decimal(5),
            unlocked(){return hasMilestone("g",5)},
            effect() {
                return player["r"].points.add(1).log10().add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Gold 2",
            description: "^1.05 studs (FIRST EXPONENTIAL UPGRADE)",
            cost: new Decimal(1e3),
            unlocked(){return hasUpgrade("g",11)},
        },
        13: {
            title: "Gold 3",
            description: "^1.05 studs again",
            cost: new Decimal(1e3),
            unlocked(){return hasUpgrade("g",12)},
        },
        14: {
            title: "Gold 4",
            description: "^1.05 studs yet again...",
            cost: new Decimal(1e3),
            unlocked(){return hasUpgrade("g",13)},
        },
        15: {
            title: "Gold 5",
            description: "^(log10(log10(gold+1)+1)+1)^0.3 studs (ok this is the last one for a while) also unlock more door upgrades, floors reset nothing",
            cost: new Decimal(1e3),
            unlocked(){return hasUpgrade("g",14)},
            effect() {
                return player["g"].points.add(1).log10().add(1).log10().add(1).pow(0.3)
            },
            effectDisplay() {return "^" + format (upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
    },
    branches: ["k","g"]
})