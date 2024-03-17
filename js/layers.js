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
        if (hasUpgrade('r', 13)) mult = mult.times(upgradeEffect('r', 13))
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
            unlocked(){return hasUpgrade("d",11)},
            effect() {
                return player[this.layer].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Doors 3",
            description: "x (rush+1)^2 stud gain",
            cost: new Decimal(25),
            unlocked(){return hasUpgrade("r",13)},
            effect() {
                return player["r"].points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Doors 4",
            description: "x (doors+1)^2 stud gain",
            cost: new Decimal(36),
            unlocked(){return hasUpgrade("k",15)},
            effect() {
                return player[this.layer].points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Doors 5",
            description: "x (doors+1) knob and stud gain and unlock more closet and knob upgrades",
            cost: new Decimal(67),
            unlocked(){return hasUpgrade("c",23)},
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
        if (hasUpgrade('r', 14)) mult = mult.times(upgradeEffect('r', 14))
        return mult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    canBuyMax() {return hasUpgrade("r",14)},
    autoPrestige() {return hasMilestone("du",2)},
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
        unlocked(){return hasUpgrade("c",11)},
        effect() {
            return player[this.layer].points.add(1).pow(3)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Closets 3",
            description: "x log2(closets+1)+1 knob gain",
            cost: new Decimal(20),
            unlocked(){return hasUpgrade("c",12)},
            effect() {
                return player[this.layer].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Closets 4",
            description: "x (closets+1)^0.2 rush gain",
            cost: new Decimal(25),
            unlocked(){return hasUpgrade("r",11)},
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Closets 5",
            description: "haha knob go brrr anyway, x (closets+1) knob gain and unlock more knob upgrades",
            cost: new Decimal(35),
            unlocked(){return hasUpgrade("c",14)},
            effect() {
                return player[this.layer].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Closets 6",
            description: "x log(knobs+1)+1 rush and unlock a rush upgrade",
            cost: new Decimal(69),
            unlocked(){return hasUpgrade("c",15)},
            effect() {
                return player["k"].points.add(1).log10().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Closets 7",
            description: "x(Closets+1)^2 stud gain",
            cost: new Decimal(78),
            unlocked(){return hasUpgrade("c",21)},
            effect() {
                return player["c"].points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Closets 8",
            description: "xlog2(closets+1)+1 stud gain and unlock more door upgrades",
            cost: new Decimal(91),
            unlocked(){return hasUpgrade("c",22)},
            effect() {
                return player["c"].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "Closets 9",
            description: "xlog2(log(knob+1)+1)+1 rush gain",
            cost: new Decimal(100),
            unlocked(){return hasUpgrade("d",15)},
            effect() {
                return player["k"].points.add(1).log10().add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
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
        if (hasUpgrade('d', 15)) mult = mult.times(upgradeEffect('d', 15))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "k", description: "K: Reset for knobs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
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
            unlocked(){return hasUpgrade("k",11)},
            effect() {
                return player[this.layer].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
        13: {
            title: "Knobs 3",
            description: "x (ln(knobs+1)+1)*2 stud gain",
            cost: new Decimal(250),
            unlocked(){return hasUpgrade("k",12)},
            effect() {
                return player[this.layer].points.add(1).ln().add(1).mul(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Knobs 4",
            description: "x (doors+1) stud gain",
            cost: new Decimal(1e8),
            unlocked(){return hasUpgrade("c",15)},
            effect() {
                return player["d"].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Knobs 5",
            description: "Unlock more door upgrades and x log2(knobs+1)+1 stud gain",
            cost: new Decimal(1e9),
            unlocked(){return hasUpgrade("k",14)},
            effect() {
                return player["k"].points.add(1).log10().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    branches: ["k","r"],
    layerShown(){return true},
})
addLayer("r", {
    name: "rush", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
        if (hasUpgrade('c', 14)) mult = mult.times(upgradeEffect('c', 14))
        if (hasUpgrade('c', 21)) mult = mult.times(upgradeEffect('c', 21))
        if (hasUpgrade('c', 24)) mult = mult.times(upgradeEffect('c', 24))
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
        return 0; // default value, only here for clarity
      },
    milestones: {
        1: {
            requirementDescription: "Requires: 500 Rush",
            effectDescription: "Gain 100% of rush per second",
            done() { return player.r.points.gte(500) }
        },
        2: {
            requirementDescription: "Requires: 2.5e8 Rush",
            effectDescription: "Unlock a new layer. Some doors are not what they seem...",
            done() { return player.r.points.gte(2.5e8) }
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
            description: "x (log2(closets+1)+1)^0.1 door gain and unlock a door and a closet upgrade",
            cost: new Decimal(5),
            unlocked(){return hasUpgrade("r",12)},
            effect() {
                return player["c"].points.add(1).log2().add(1).pow(0.1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Rush 4",
            description: "yay another log boost, anyway x (log10(door+1)+1)^0.1 closet gain, and you can bulk buy closets",
            cost: new Decimal(1e5),
            unlocked(){return hasUpgrade("c",21)},
            effect() {
                return player["d"].points.add(1).log10().add(1).pow(0.1)
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
    layerShown(){return hasMilestone ('r',2)},
    milestones: {
        1: {
            requirementDescription: "Requires: 1 Dupe",
            effectDescription: "x100 studs and you can bulk buy doors",
            done() { return player.r.points.gte(1) }
        },
        2: {
            requirementDescription: "Requires: 2 Dupes",
            effectDescription: "Autobuy closets",
            done() { return player.r.points.gte(2) }
        },
    },
})