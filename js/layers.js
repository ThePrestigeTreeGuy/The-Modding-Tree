addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
    }},
    color: "#FFFF00",
    resource: "achievements", // Name of prestige currency
    row: "side", // Row the layer is in on the tree (0 is the first row)
    achievements: {
        11: {
            name: "Start.",
            tooltip: "Get 1 hydrogen",
            done() {return player.H.points.gte(1)}
        },
    },
        layerShown(){return true}
})
addLayer("H", {
    name: "hydrogen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FF0000",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "hydrogen", // Name of prestige currency
    baseResource: "atomic particles", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    effect() {
        return player[this.layer].points.add(1)
    },
    effectDescription() { return 'multiplying atomic particle gain by ' + format(tmp['H'].effect)},
    upgrades: {
        11: {
        title: "Basic Boost",
        description: "x2 atomic particle gain",
        cost: new Decimal(100),
        },
        12: {
        title: "Intermediate Boost",
        description: "x2 atomic particle gain for every upgrade bought",
        cost: new Decimal(250),
        effect() {
            return new Decimal(2).pow(player.H.upgrades.length)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
})
