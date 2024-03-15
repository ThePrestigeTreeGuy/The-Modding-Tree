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
    upgrades: {
        11: {
        title: "Doored Doors",
        description: "Doors boost your stud gain.",
        cost: new Decimal(2),
        effect() {
            return player[this.layer].points.add(1).pow(1.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Doored Doors 2",
            description: "Doors boost your stud gain.",
            cost: new Decimal(12),
            effect() {
                return player[this.layer].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
    },
})
addLayer("c", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#3F0D06",                       // The color for this layer, which affects many elements.
    resource: "closets",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).
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
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    upgrades: {
        11: {
        title: "Speed Boost",
        description: "x10 point gain!",
        cost: new Decimal(1),
        },
        12: {
        title: "Closeted Closets",
        description: "Closets boost your stud gain.",
        cost: new Decimal(2),
        effect() {
            return player[this.layer].points.add(1).pow(3)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },

    },
})
addLayer("k", {
    name: "knobs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "K", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
            title: "Vitamins",
            description: "x10 point gain!",
            cost: new Decimal(1),
            },
        12: {
            title: "Knobbed Knobs",
            description: "Knobs boost your stud gain.",
            cost: new Decimal(10),
            effect() {
                return player[this.layer].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
        13: {
            title: "Knobbed Knobs 2",
            description: "Knobs boost your stud gain.",
            cost: new Decimal(100),
            effect() {
                return player[this.layer].points.add(1).ln().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
        },
    layerShown(){return true},
})