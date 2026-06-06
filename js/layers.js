addLayer("S", {
    name: "succession points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        number: "-1",
    }},
    update(diff) {
        if (hasUpgrade('S',11)) player[this.layer].number = "0"
        if (hasUpgrade('S',12)) player[this.layer].number = "ε"
        if (hasUpgrade('S',13)) player[this.layer].number = "0.000001"
        if (hasUpgrade('S',14)) player[this.layer].number = "0.000002"
        if (hasUpgrade('S',15)) player[this.layer].number = "0.000005"
        if (hasUpgrade('S',21)) player[this.layer].number = "0.000008"
        if (hasUpgrade('S',22)) player[this.layer].number = "0.00001"
        if (hasUpgrade('S',23)) player[this.layer].number = "0.00002"
        if (hasUpgrade('S',24)) player[this.layer].number = "0.0000508"
        if (hasUpgrade('S',25)) player[this.layer].number = "0.0001"
        if (hasUpgrade('S',31)) player[this.layer].number = "0.001"
        if (hasUpgrade('S',32)) player[this.layer].number = "0.00129"
        if (hasUpgrade('S',33)) player[this.layer].number = "0.01"
        if (hasUpgrade('S',34)) player[this.layer].number = "0.1"
        if (hasUpgrade('S',35)) player[this.layer].number = "0.2"
        if (hasUpgrade('S',41)) player[this.layer].number = "0.42513153135"
        if (hasUpgrade('S',42)) player[this.layer].number = "0.5"
        if (hasUpgrade('S',43)) player[this.layer].number = "0.8"
        if (hasUpgrade('S',44)) player[this.layer].number = "1"
        if (hasUpgrade('S',45)) player[this.layer].number = "1.306"
        if (hasUpgrade('S',51)) player[this.layer].number = "1.4"
        if (hasUpgrade('S',52)) player[this.layer].number = "1.618"
        if (hasUpgrade('S',53)) player[this.layer].number = "2"
        if (hasUpgrade('S',54)) player[this.layer].number = "2.585"
        if (hasUpgrade('S',55)) player[this.layer].number = "2.718"
        if (hasUpgrade('S',61)) player[this.layer].number = "3"
        if (hasUpgrade('S',62)) player[this.layer].number = "3.142"
        if (hasUpgrade('S',63)) player[this.layer].number = "4"
        if (hasUpgrade('S',64)) player[this.layer].number = "4.966"
        if (hasUpgrade('S',65)) player[this.layer].number = "5"
        if (hasUpgrade('S',71)) player[this.layer].number = "5.923"
        if (hasUpgrade('S',72)) player[this.layer].number = "6"
        if (hasUpgrade('S',73)) player[this.layer].number = "6.283"
        if (hasUpgrade('S',74)) player[this.layer].number = "7"
        if (hasUpgrade('S',75)) player[this.layer].number = "8"
        if (hasUpgrade('S',81)) player[this.layer].number = "9"
        if (hasUpgrade('S',82)) player[this.layer].number = "10"
    },
    color: "#fff",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "succession points", // Name of prestige currency
    baseResource: "googology points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('S', 13)) mult = mult.times(1.1)
        if (hasUpgrade('S', 14)) mult = mult.times(1.1)
        if (hasUpgrade('S', 15)) mult = mult.times(1.11)
        if (hasUpgrade('S', 21)) mult = mult.times(1.12)
        if (hasUpgrade('S', 22)) mult = mult.times(1.13)
        if (hasUpgrade('S', 23)) mult = mult.times(1.14)
        if (hasUpgrade('S', 24)) mult = mult.times(1.15)
        if (hasUpgrade('S', 25)) mult = mult.times(1.16)
        if (hasUpgrade('S', 31)) mult = mult.times(1.17)
        if (hasUpgrade('S', 32)) mult = mult.times(1.18)
        if (hasUpgrade('S', 33)) mult = mult.times(1.19)
        if (hasUpgrade('S', 34)) mult = mult.times(1.2)
        if (hasUpgrade('S', 35)) mult = mult.times(1.21)
        if (hasUpgrade('S', 41)) mult = mult.times(1.23)
        if (hasUpgrade('S', 42)) mult = mult.times(1.25)
        if (hasUpgrade('S', 43)) mult = mult.times(1.28)
        if (hasUpgrade('S', 61)) mult = mult.times(upgradeEffect('S', 61))
        if (hasUpgrade('S', 62)) mult = mult.times(upgradeEffect('S', 62))
        if (hasUpgrade('S', 63)) mult = mult.times(upgradeEffect('S', 63))
        if (hasUpgrade('S', 64)) mult = mult.times(upgradeEffect('S', 64))
        if (hasUpgrade('S', 65)) mult = mult.times(upgradeEffect('S', 65))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    passiveGeneration() {
        return (hasUpgrade('S',45))
    },
    autoUpgrade() {return false},
    automate() {
    },
    tabFormat: {
        "Numbers": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Functions": {
            content: ['main-display','prestige-button','buyables'],
        },
    },
    upgrades: {
        11: {
        title: "Zero",
        description: "Succession points boost googology points gain. [Softcap at 1,000x]",
        cost: new Decimal(1),
        effect() {
            return player[this.layer].points.add(1).pow(0.5).div(player[this.layer].points.add(1).pow(0.5).max(1000).div(1000).pow(0.9))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
        title: "Infinitesimal",
        description: "Succession points boost googology points gain again. [Softcap at 1,000x]",
        cost: new Decimal(3),
        effect() {
            return player[this.layer].points.add(1).pow(0.25).div(player[this.layer].points.add(1).pow(0.25).max(1000).div(1000).pow(0.9))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
        title: "Plasmarillion",
        description: "x1.1 succession point gain.",
        cost: new Decimal(10),
        },
        14: {
        title: "Eyelash mite-speck",
        description: "x1.1 succession point gain.",
        cost: new Decimal(12),
        },
        15: {
        title: "Dust mite-speck",
        description: "x1.11 succession point gain.",
        cost: new Decimal(14),
        },
        21: {
        title: "Cheese mite-speck",
        description: "x1.12 succession point gain.",
        cost: new Decimal(16),
        },
        22: {
        title: "Clover mite-speck",
        description: "x1.13 succession point gain.",
        cost: new Decimal(19),
        },
        23: {
        title: "Polaritillion",
        description: "x1.14 succession point gain.",
        cost: new Decimal(23),
        },
        24: {
        title: "Affordable",
        description: "x1.15 succession point gain.",
        cost: new Decimal(29),
        },
        25: {
        title: "Polaritillion",
        description: "x1.16 succession point gain.",
        cost: new Decimal(36),
        },
        31: {
        title: "Polarillion",
        description: "x1.17 succession point gain.",
        cost: new Decimal(46),
        },
        32: {
        title: "One-leaf Clover",
        description: "x1.18 succession point gain.",
        cost: new Decimal(59),
        },
        33: {
        title: "Rotillion",
        description: "x1.19 succession point gain.",
        cost: new Decimal(77),
        },
        34: {
        title: "Triollion",
        description: "x1.2 succession point gain.",
        cost: new Decimal(101),
        },
        35: {
        title: "Eyelash mite-crumb",
        description: "x1.21 succession point gain.",
        cost: new Decimal(136),
        },
        41: {
        title: "Aarex's Funny Number",
        description: "x1.23 succession point gain.",
        cost: new Decimal(184),
        },
        42: {
        title: "Dust mite-crumb",
        description: "x1.25 succession point gain.",
        cost: new Decimal(256),
        },
        43: {
        title: "Cheese mite-crumb",
        description: "x1.28 succession point gain.",
        cost: new Decimal(366),
        },
        44: {
        title: "One",
        description: "Googology points boost their own gain. [Softcap at 1,000x]",
        cost: new Decimal(4000),
        effect() {
            return player.points.add(1).pow(0.15).div(player[this.layer].points.add(1).pow(0.15).max(1000).div(1000).pow(0.9))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        45: {
        title: "Mills' Constant",
        description: "Googology points boost their own gain again, and gain 100% of succession points per second. [Softcap at 1,000x]",
        cost: new Decimal(7500),
        effect() {
            return player.points.add(1).pow(0.1).div(player[this.layer].points.add(1).pow(0.1).max(1000).div(1000).pow(0.9))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        51: {
        title: "Yiutu",
        description: "First softcap, eh? x2.5 googology point gain.",
        cost: new Decimal(1500000),
        },
        52: {
        title: "Golden Ratio",
        description: "Another x2.5 googology point gain. Ykw, we might need a buyable to repeat that!",
        cost: new Decimal(5000000),
        },
        53: {
        title: "Clover mite-crumb",
        description: "Googology points boost their own gain again. [Softcap at 1,000x]",
        cost: new Decimal(25000000),
        effect() {
            return player.points.add(1).pow(0.05).div(player[this.layer].points.add(1).pow(0.05).max(1000).div(1000).pow(0.9))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        54: {
        title: "Sierpinski's Constant",
        description: "Googology points boost their own gain again. [Softcap at 1,000x]",
        cost: new Decimal(100000000),
        effect() {
            return player.points.add(1).pow(0.04).div(player[this.layer].points.add(1).pow(0.04).max(1000).div(1000).pow(0.9))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        55: {
        title: "Euler's Number",
        description: "Googology points boost their own gain again. [Softcap at 1,000x]",
        cost: new Decimal(400000000),
        effect() {
            return player.points.add(1).pow(0.03).div(player[this.layer].points.add(1).pow(0.03).max(1000).div(1000).pow(0.9))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        61: {
        title: "Ternary-Goonol",
        description: "Googology points boost succession point gain. [Softcap at 1,000x]",
        cost: new Decimal(2.5e9),
        effect() {
            return player.points.add(1).pow(0.03).div(player[this.layer].points.add(1).pow(0.03).max(1000).div(1000).pow(0.9))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        62: {
        title: "Pi",
        description: "Googology points boost succession point gain again. [Softcap at 1,000x]",
        cost: new Decimal(1.5e10),
        effect() {
            return player.points.add(1).pow(0.02).div(player[this.layer].points.add(1).pow(0.02).max(1000).div(1000).pow(0.9))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        63: {
        title: "Binary-Goonolplex",
        description: "Googology points boost succession point gain again. [Softcap at 1,000x]",
        cost: new Decimal(5e10),
        effect() {
            return player.points.add(1).pow(0.02).div(player[this.layer].points.add(1).pow(0.02).max(1000).div(1000).pow(0.9))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        64: {
        title: "Trigintiprimis",
        description: "Googology points boost succession point gain again. [Softcap at 1,000x]",
        cost: new Decimal(2e11),
        effect() {
            return player.points.add(1).pow(0.01).div(player[this.layer].points.add(1).pow(0.01).max(1000).div(1000).pow(0.9))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        65: {
        title: "sjyp",
        description: "Googology points boost succession point gain again. [Softcap at 1,000x]",
        cost: new Decimal(3e11),
        effect() {
            return player.points.add(1).pow(0.01).div(player[this.layer].points.add(1).pow(0.01).max(1000).div(1000).pow(0.9))
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        71: {
        title: "Yibase",
        description: "x3 googology point gain.",
        cost: new Decimal(5e11),
        },
        72: {
        title: "Blue bilby",
        description: "x3 googology point gain again.",
        cost: new Decimal(2e12),
        },
        73: {
        title: "Tau",
        description: "x3 googology point gain again.",
        cost: new Decimal(6e12),
        },
        74: {
        title: "gagtwo",
        description: "x2.5 googology point gain.",
        cost: new Decimal(2.5e13),
        },
        75: {
        title: "Octal-Goonol",
        description: "x2.5 googology point gain again.",
        cost: new Decimal(7.5e13),
        },
        81: {
        title: "Ternary-Goodol",
        description: "x2 googology point gain again.",
        cost: new Decimal(2.5e14),
        },
        82: {
        title: "Onety",
        description: "x1.2 googology point gain, and unlock a new layer. [coming soon]",
        cost: new Decimal(7.5e14),
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(10000000).mul(new Decimal(100).pow(x)) },
            title: "f0(n)",
            display() { return `x2.5 googology point gain.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new Decimal(2.5).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (hasUpgrade("S",52))}
        },
    },
})