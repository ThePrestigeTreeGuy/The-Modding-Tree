addLayer("S", {
    name: "succession points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#fff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "succession points", // Name of prestige currency
    baseResource: "googology points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
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
    passiveGeneration() {
        return 0
    },
    autoUpgrade() {return false},
    automate() {
    },
    tabFormat: {
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
        },
    },
    upgrades: {
        11: {
        title: "1",
        description: "x2 atomic particle gain",
        cost: new Decimal(50),
        },
    },
    buyables: {
    },
})