addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#00FFFF",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('p', 14)) mult = mult.times(upgradeEffect('p', 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
        11: {
        title: "The Beginning",
        description: "Triple Point Gain.",
        cost: new Decimal(1),
        },
        12: {
        title: "Improved Points",
        description: "Prestige Points boost Points.",
        cost: new Decimal(5),
        effect() {
            return player[this.layer].points.add(1).pow(0.5)
        }},
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"1" }, // Add formatting to the effect
        13: {
            title: "Point-Prestige Point Conversion",
            description: "Points boost Prestige Points.",
            cost: new Decimal(25),
            effect() {
                return player.points.add(1).pow(0.05)
        }},
        14: {
            title: "Wait What",
            description: "Points boost Prestige Points more.",
            cost: new Decimal(50),
            effect() {
                return player.points.add(1).pow(0.2)
        }},
        15: {
            title: "Attempted Inflation",
            description: "Prestige Points boost Points more.",
            cost: new Decimal(200),
            effect() {
                return player[this.layer].points.add(1).pow(0.4)
        }},
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"1" }, // Add formatting to the effect
        21: {
            title: "more inflation lol",
            description: "prestige boost point lol.",
            cost: new Decimal(5000),
            effect() {
                return player[this.layer].points.add(1).pow(0.6)
        }},
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"1" }, // Add formatting to the effect
        22: {
            title: "MORE inflation lol",
            description: "...",
            cost: new Decimal("1ee6"),
            effect() {
                return player[this.layer].points.add(1).pow(3.5)
        }},
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"1" }, // Add formatting to the effect
    }
 })