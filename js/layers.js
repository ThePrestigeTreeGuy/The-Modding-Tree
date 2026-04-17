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
        if (hasUpgrade('H',14)) mult = mult.times(upgradeEffect('H', 14))
        mult = mult.times(tmp['He'].effect)
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
    tabFormat: {
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Buyables": {
            content: ['main-display','prestige-button','buyables'],
            unlocked(){return (hasUpgrade("H",15))}
        },
    },
    upgrades: {
        11: {
        title: "Beginner Boost",
        description: "x2 atomic particle gain",
        cost: new Decimal(100),
        },
        12: {
        title: "Intermediate Boost",
        description: "x2 atomic particle gain for every upgrade bought",
        cost: new Decimal(250),
        unlocked() {return hasUpgrade('H',11)},
        effect() {
            return new Decimal(2).pow(player.H.upgrades.length)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
        title: "Advanced Boost",
        description: "Atomic particles boost themselves.",
        cost: new Decimal(1000),
        unlocked() {return hasUpgrade('H',12)},
        effect() {
            return player.points.add(1).log10().add(1).pow(0.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
        title: "Psychologically Unsafe Boost",
        description: "Hydrogen boosts itself.",
        cost: new Decimal(5000),
        unlocked() {return hasUpgrade('H',13)},
        effect() {
            return player.H.points.add(1).log10().add(1).pow(0.5)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
        title: "New Path Forward",
        description: "Unlock a buyable and a new layer.",
        cost: new Decimal(50000),
        unlocked() {return hasUpgrade('H',14)},
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(150000).mul(new Decimal(1.75).pow(x)).mul(new Decimal(1.05).pow(x.pow(2))) },
            title: "Proton (H+)",
            display() { return `x1.5 atomic particle gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new Decimal(1.5).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return true},
        },
    },
})
addLayer("He", {
    name: "helium", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "He", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ['H'],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#D72800",
    requires: new Decimal(1000000), // Can be a function that takes requirement increases into account
    resource: "helium", // Name of prestige currency
    baseResource: "hydrogen", // Name of resource prestige is based on
    baseAmount() {return player.H.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){if (hasUpgrade('H',15)) return true 
        else if (player[this.layer].points.gte(1)) return true},
    effect() {
        return player[this.layer].points.add(1)
    },
    effectDescription() { return 'multiplying atomic particle and hydrogen gain by ' + format(tmp['He'].effect)},
    tabFormat: {
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Buyables": {
            content: ['main-display','prestige-button','buyables'],
        },
        "Milestones": {
            content: ['main-display','prestige-button','milestones'],
        },
    },
    upgrades: {
    },
    buyables: {
    },
    milestones: {
        1: {
            requirementDescription: "Requires: 1 helium",
            effectDescription: "x2 atomic particles",
            done() { return player.g.points.gte(1) }
        },
    }
})