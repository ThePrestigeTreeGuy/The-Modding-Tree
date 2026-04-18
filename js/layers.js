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
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('H',14)) mult = mult.times(upgradeEffect('H',14))
	    mult = mult.times(tmp['He'].effect)
        if (hasUpgrade('H',23)) mult = mult.times(upgradeEffect('H',23))
        if (hasUpgrade('H',34)) mult = mult.times(1.404)
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
    passiveGeneration() {
        if (hasMilestone('He',4)) return 2.5
        else if (hasMilestone('He',2)) return 0.5
    },
    tabFormat: {
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Buyables": {
            content: ['main-display','prestige-button','buyables'],
            unlocked(){return (hasUpgrade("H",15))}
        },
        "Challenges": {
            content: ['main-display','prestige-button','challenges'],
            unlocked(){return (hasUpgrade("H",53))}
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
        description: "x1.5 atomic particle gain for every upgrade bought",
        cost: new Decimal(150),
        unlocked() {return hasUpgrade('H',11)},
        effect() {
            return new Decimal(1.5).pow(player.H.upgrades.length)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
        title: "Advanced Boost",
        description: "Atomic particles boost themselves.",
        cost: new Decimal(200),
        unlocked() {return hasUpgrade('H',12)},
        effect() {
            power = 1
            if (hasUpgrade('H',45)) power = 1.75
            return player.points.add(1).log10().add(1).cbrt().pow(power)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
        title: "Psychologically Unsafe Boost",
        description: "Hydrogen boosts itself.",
        cost: new Decimal(250),
        unlocked() {return hasUpgrade('H',13)},
        effect() {
            power = 1
            if (hasUpgrade('H',44)) power = 1.5
            return player.H.points.add(1).log10().add(1).cbrt().pow(power)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
        title: "New Path Forward",
        description: "Unlock a buyable and a new layer.",
        cost: new Decimal(400),
        unlocked() {return hasUpgrade('H',14)},
        },
        21: {
        title: "generic boost lol",
        description: "x2 atomic particle gain.",
        cost: new Decimal(10000),
        unlocked() {return hasUpgrade('H',15)},
        },
        22: {
        title: "ungeneric boost lol",
        description: "Hydrogen boosts atomic particle gain.",
        cost: new Decimal(20000),
        unlocked() {return hasUpgrade('H',21)},
        effect() {
            return player.H.points.add(1).log10().add(1).sqrt()
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
        title: "yay more hydrogen",
        description: "Atomic particles boost hydrogen gain.",
        cost: new Decimal(30000),
        unlocked() {return hasUpgrade('H',22)},
        effect() {
            power = 1
            if (hasUpgrade('H',24)) power = 2
            return player.points.add(1).log10().add(1).pow(0.2).pow(power)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
        title: "yay even more hydrogen",
        description: "^2 the effect of hydrogen upgrade 8.",
        cost: new Decimal(100000),
        unlocked() {return hasUpgrade('H',23)},
        },
        25: {
        title: "New Buyable",
        description: "Unlock a new buyable.",
        cost: new Decimal(200000),
        unlocked() {return hasUpgrade('H',24)},
        },
        31: {
        title: "this",
        description: "x2.001 atomic particles.",
        cost: new Decimal(1500000),
        unlocked() {return hasUpgrade('H',25)},
        },
        32: {
        title: "is",
        description: "x2.002 atomic particles.",
        cost: new Decimal(3000000),
        unlocked() {return hasUpgrade('H',31)},
        },
        33: {
        title: "the",
        description: "x2.003 atomic particles.",
        cost: new Decimal(6700000),
        unlocked() {return hasUpgrade('H',32)},
        },
        34: {
        title: "atomic",
        description: "x1.404 hydrogen.",
        cost: new Decimal(67000000),
        unlocked() {return hasUpgrade('H',33)},
        },
        35: {
        title: "tree",
        description: "x1.305 helium.",
        cost: new Decimal(125000000),
        unlocked() {return hasUpgrade('H',34)},
        },
        41: {
        title: "pg132 time :)",
        description: "^1.15 the effect of the first buyable.",
        cost: new Decimal(670000000),
        unlocked() {return hasUpgrade('H',35)},
        },
        42: {
        title: "idk how to name these tbh but here is a new buyable have fun",
        description: "Unlock a new buyable.",
        cost: new Decimal(6700000000),
        unlocked() {return hasUpgrade('H',41)},
        },
        43: {
        title: "Hydrogen 18",
        description: "^1.15 the effect of the first buyable again.",
        cost: new Decimal(25000000000),
        unlocked() {return hasUpgrade('H',42)},
        },
        44: {
        title: "Hydrogen 19",
        description: "^1.5 the effect of hydrogen upgrade 4.",
        cost: new Decimal(4e12),
        unlocked() {return hasUpgrade('H',43)},
        },
        45: {
        title: "Hydrogen 20",
        description: "^1.75 the effect of hydrogen upgrade 3.",
        cost: new Decimal(1e16),
        unlocked() {return hasUpgrade('H',44)},
        },
        51: {
        title: "Hydrogen 21",
        description: "Atomic particles boost helium gain.",
        cost: new Decimal(1e17),
        unlocked() {return hasUpgrade('H',45)},
        effect() {
            return player.points.add(1).log10().add(1).pow(0.1)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        52: {
        title: "Hydrogen 22",
        description: "Helium boosts its own gain.",
        cost: new Decimal(1e18),
        unlocked() {return hasUpgrade('H',51)},
        effect() {
            return player.He.points.add(1).log10().add(1).cbrt()
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        53: {
        title: "The First of Many",
        description: "Unlock a hydrogen challenge.",
        cost: new Decimal(6.7e19),
        unlocked() {return hasUpgrade('H',52)},
        },
        54: {
        title: "Another one!",
        description: "Unlock a hydrogen buyable.",
        cost: new Decimal(6.7e21),
        unlocked() {return hasUpgrade('H',53)},
        },
        55: {
        title: "Last hydrogen upgrade",
        description: "Unlock a hydrogen challenge.",
        cost: new Decimal(6.7e22),
        unlocked() {return hasUpgrade('H',54)},
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(500).mul(new Decimal(1.1).pow(x)) },
            title: "Proton (H+)",
            display() { return `+100% atomic particle gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                power = new Decimal(1)
                if (hasUpgrade('H',41)) power = new Decimal(1.15)
                if (hasUpgrade('H',43)) power = new Decimal(1.15).pow(2)
                return getBuyableAmount(this.layer,this.id).add(1).pow(power)},
            buy() {
                if (hasMilestone("He",3)) {this.buyMax()} 
                else  player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
                let bulk = player[this.layer].points.div(500).log(1.1).floor()
                setBuyableAmount(this.layer, this.id, bulk)
            },
            unlocked(){return true},
        },
        12: {
            cost(x) { return new Decimal(250000).mul(new Decimal(1.1).pow(x)) },
            title: "Dihydrogen (H2)",
            display() { return `+100% atomic particle gain, x2 atomic particles every 25 levels.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return getBuyableAmount(this.layer,this.id).mul(new Decimal(2).pow(getBuyableAmount(this.layer,this.id).mul(0.04).floor())).add(1)},
            buy() {
                if (hasMilestone("He",5)) {this.buyMax()} 
                else  player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
                let bulk = player[this.layer].points.div(250000).log(1.1).floor()
                setBuyableAmount(this.layer, this.id, bulk)
            },
            unlocked(){return hasUpgrade('H',25)},
        },
        13: {
            cost(x) { return new Decimal(1e10).mul(new Decimal(1.15).pow(x)).mul(new Decimal(1.01).pow((x).pow(2))) },
            title: "Dihydrogen cation (H2+)",
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
            unlocked(){return hasUpgrade('H',42)},
        },
        21: {
            cost(x) { return new Decimal(6.7e21).mul(new Decimal(1.2).pow(x)).mul(new Decimal(1.01).pow((x).pow(2))) },
            title: "Trihydrogen cation (H3+)",
            display() { return `x1.75 atomic particle gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new Decimal(1.75).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return hasUpgrade('H',54)},
        },
    },
    challenges: {
        11: {
            name: "Triatomic Hydrogen",
            challengeDescription: "^0.5 atomic particle gain",
            rewardDescription: "x2 atomic particle gain",
            goalDescription: function() {return format(new Decimal(1e27).mul(new Decimal(2).pow(new Decimal(player[this.layer].challenges[this.id]).pow(2)))) + " atomic particles"},
            canComplete: function() {return player.points.gte(new Decimal(1e27).mul(new Decimal(2).pow(new Decimal(player[this.layer].challenges[this.id]).pow(2))))},
            completionLimit: 10,
            rewardEffect() {
                return new Decimal(2).pow(player[this.layer].challenges[this.id])
            },
            rewardDisplay() { return format(tmp[this.layer].challenges[this.id].rewardEffect)+"x" }, // Add formatting to the effect
        },
        12: {
            name: "Hydrogen-4",
            challengeDescription: "^0.01 atomic particle gain",
            rewardDescription: "x3 atomic particle gain",
            goalDescription: function() {return format(new Decimal(250).mul(new Decimal(1.5).pow(new Decimal(player[this.layer].challenges[this.id]).pow(2)))) + " atomic particles"},
            canComplete: function() {return player.points.gte(new Decimal(250).mul(new Decimal(1.5).pow(new Decimal(player[this.layer].challenges[this.id]).pow(2))))},
            completionLimit: 10,
            unlocked(){return hasUpgrade('H',55)},
            rewardEffect() {
                return new Decimal(3).pow(player[this.layer].challenges[this.id])
            },
            rewardDisplay() { return format(tmp[this.layer].challenges[this.id].rewardEffect)+"x" }, // Add formatting to the effect
        },
    }
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
    requires: new Decimal(1000), // Can be a function that takes requirement increases into account
    resource: "helium", // Name of prestige currency
    baseResource: "hydrogen", // Name of resource prestige is based on
    baseAmount() {return player.H.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('H',35)) mult = mult.times(1.305)
        if (hasUpgrade('H',51)) mult = mult.times(upgradeEffect('H',51))
        if (hasUpgrade('H',52)) mult = mult.times(upgradeEffect('H',52))
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
            done() { return player[this.layer].points.gte(1) }
        },
        2: {
            requirementDescription: "Requires: 2 helium",
            effectDescription: "Gain 50% of hydrogen per second.",
            done() { return player[this.layer].points.gte(2) }
        },
        3: {
            requirementDescription: "Requires: 20 helium",
            effectDescription: "Buy max the Proton (H+) buyable, and it costs nothing.",
            done() { return player[this.layer].points.gte(20) }
        },
        4: {
            requirementDescription: "Requires: 100 helium",
            effectDescription: "Gain 250% of hydrogen per second.",
            done() { return player[this.layer].points.gte(100) }
        },
        5: {
            requirementDescription: "Requires: 1,000 helium",
            effectDescription: "Buy max the Dihydrogen (H2) buyable, and it costs nothing.",
            done() { return player[this.layer].points.gte(1000) }
        },
    }
})