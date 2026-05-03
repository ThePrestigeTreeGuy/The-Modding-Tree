addLayer("am", {
    name: "antimatter", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "AM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		total: new Decimal(0),
    }},
    color: "#555555",
    requires: new Decimal(1e75), // Can be a function that takes requirement increases into account
    resource: "antimatter", // Name of prestige currency
    baseResource: "atomic particles", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    canBuyMax() {return hasMilestone('am',5)},
    resetsNothing() {return hasMilestone('Li',2)},
    base: 1e75,
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    displayRow: 'side', // Row the layer is in on the tree (0 is the first row)
    layerShown(){if (hasUpgrade('H',55)) return true 
        else if (player[this.layer].total.gte(1)) return true},
    tabFormat: {
        "Buyables": {
            content: ['main-display','prestige-button','buyables'],
        },
        "Milestones": {
            content: ['main-display','prestige-button','milestones'],
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1).add(new Decimal(x)) },
            title: "Anti-atomic-particles",
            display() { return `x1,000 atomic particle gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new Decimal(1000).pow(getBuyableAmount(this.layer,this.id)).pow(buyableEffect('He',21))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        12: {
            cost(x) { return new Decimal(1).add(new Decimal(x)) },
            title: "Anti-hydrogen",
            display() { return `x10 hydrogen gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new Decimal(10).pow(getBuyableAmount(this.layer,this.id)).pow(buyableEffect('He',21))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
        13: {
            cost(x) { return new Decimal(1).add(new Decimal(x)) },
            title: "Anti-helium",
            display() { return `x2 helium gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new Decimal(2).pow(getBuyableAmount(this.layer,this.id)).pow(buyableEffect('He',21))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
        },
    },
    milestones: {
        1: {
            requirementDescription: "Requires: 1 total antimatter",
            effectDescription: "^1.01 atomic particles and hydrogen, automate hydrogen upgrades, and ^1.2 the effect of the first hydrogen buyable.",
            done() { return player[this.layer].total.gte(1) }
        },
        2: {
            requirementDescription: "Requires: 4 total antimatter",
            effectDescription: "Unlock a new hydrogen buyable, keep the first 5 helium milestones.",
            done() { return player[this.layer].total.gte(4) }
        },
        3: {
            requirementDescription: "Requires: 5 total antimatter",
            effectDescription: "1.3 ^ total antimatter now boosts hydrogen gain.",
            done() { return player[this.layer].total.gte(5) },
            effect() {
                return new Decimal(1.3).pow(player[this.layer].total)
            },
        },
        4: {
            requirementDescription: "Requires: 11 total antimatter",
            effectDescription: "Remove the single exponent from Dihydrogen cation (H2+), and buy max the buyable/the buyable costs nothing. Also, keep hydrogen challenge completions, and autobuy the first 6 hydrogen buyables.",
            done() { return player[this.layer].total.gte(11) }
        },
        5: {
            requirementDescription: "Requires: 12 total antimatter",
            effectDescription: "Buy max antimatter.",
            done() { return player[this.layer].total.gte(12) }
        },
    }
})
addLayer("H", {
    name: "hydrogen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff4040",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "hydrogen", // Name of prestige currency
    baseResource: "atomic particles", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
	    mult = mult.times(tmp['H'].challenges[21].rewardEffect)
        if (hasUpgrade('H',14)) mult = mult.times(upgradeEffect('H',14))
	    mult = mult.times(tmp['He'].effect)
        if (hasUpgrade('H',23)) mult = mult.times(upgradeEffect('H',23))
        if (hasUpgrade('H',34)) mult = mult.times(1.404)
	    mult = mult.times(buyableEffect('am', 12))
	    if (hasMilestone('am',3)) mult = mult.times(tmp['am'].milestones[3].effect)
	    mult = mult.times(buyableEffect('H', 33))
	    mult = mult.times(tmp['Li'].effect)
	    mult = mult.times(buyableEffect('He', 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
	    if (hasMilestone('am',1)) exp = exp.pow(1.01)
        exp = exp.pow(tmp['H'].challenges[22].rewardEffect)
        exp = exp.mul(new Decimal(player.points).pow(0.25).add(1).log10().div(100).pow(-0.5).min(1))
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    effect() {if (inChallenge('H',21)) return 1
        else {return player[this.layer].points.add(1)}
    },
    effectDescription() { return 'multiplying atomic particle gain by ' + format(tmp['H'].effect)},
    passiveGeneration() {
        if (hasMilestone('He',4)) return 2.5
        else if (hasMilestone('He',2)) return 0.5
    },
    autoUpgrade() {return hasMilestone('am',1) && player[this.layer].points.gte(0)},
    automate() {
        if (hasMilestone("am", 4)) {
            buyBuyable("H", 11);
            buyBuyable("H", 12);
            buyBuyable("H", 13);
            buyBuyable("H", 21);
            buyBuyable("H", 22);
            buyBuyable("H", 23);
        }
        if (hasMilestone("Li", 1)) {
            buyBuyable("H", 31);
            buyBuyable("H", 32);
            buyBuyable("H", 33);
        }
    },
    doReset(resettingLayer) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[resettingLayer].row <= this.row) return;

        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 11, Challenge 32, Buyable 12
        let keptChallenges = {}
        if (hasMilestone("am", 4)) {
            [11, 12, 21, 22].forEach(id => keptChallenges[id] = challengeCompletions(this.layer, id));
        }

        layerDataReset(this.layer);

        Object.assign(player[this.layer].challenges, keptChallenges);
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
        title: "1",
        description: "x2 atomic particle gain",
        cost: new Decimal(50),
        },
        12: {
        title: "2",
        description: "x1.5 atomic particle gain for every upgrade bought",
        cost: new Decimal(100),
        unlocked() {return hasUpgrade('H',11)},
        effect() {
            return new Decimal(1.5).pow(player.H.upgrades.length)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
        title: "3",
        description: "Atomic particles boost themselves.",
        cost: new Decimal(150),
        unlocked() {return hasUpgrade('H',12)},
        effect() {
            power = 1
            if (hasUpgrade('H',45)) power = 1.75
            return player.points.add(1).log10().add(1).cbrt().pow(power)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
        title: "4",
        description: "Hydrogen boosts itself.",
        cost: new Decimal(200),
        unlocked() {return hasUpgrade('H',13)},
        effect() {
            power = 1
            if (hasUpgrade('H',44)) power = 1.5
            return player.H.points.add(1).log10().add(1).cbrt().pow(power)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
        title: "5",
        description: "Unlock a buyable and a new layer.",
        cost: new Decimal(250),
        unlocked() {return hasUpgrade('H',14)},
        },
        21: {
        title: "6",
        description: "x2 atomic particle gain.",
        cost: new Decimal(10000),
        unlocked() {return hasUpgrade('H',15)},
        },
        22: {
        title: "7",
        description: "Hydrogen boosts atomic particle gain.",
        cost: new Decimal(20000),
        unlocked() {return hasUpgrade('H',21)},
        effect() {
            return player.H.points.add(1).log10().add(1).sqrt()
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
        title: "8",
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
        title: "9",
        description: "^2 the effect of hydrogen upgrade 8.",
        cost: new Decimal(100000),
        unlocked() {return hasUpgrade('H',23)},
        },
        25: {
        title: "10",
        description: "Unlock a new buyable.",
        cost: new Decimal(200000),
        unlocked() {return hasUpgrade('H',24)},
        },
        31: {
        title: "11",
        description: "x2.001 atomic particles.",
        cost: new Decimal(1500000),
        unlocked() {return hasUpgrade('H',25)},
        },
        32: {
        title: "12",
        description: "x2.002 atomic particles.",
        cost: new Decimal(3000000),
        unlocked() {return hasUpgrade('H',31)},
        },
        33: {
        title: "13",
        description: "x2.003 atomic particles.",
        cost: new Decimal(6700000),
        unlocked() {return hasUpgrade('H',32)},
        },
        34: {
        title: "14",
        description: "x1.404 hydrogen.",
        cost: new Decimal(67000000),
        unlocked() {return hasUpgrade('H',33)},
        },
        35: {
        title: "15",
        description: "x1.305 helium.",
        cost: new Decimal(125000000),
        unlocked() {return hasUpgrade('H',34)},
        },
        41: {
        title: "16",
        description: "^1.15 the effect of the first buyable.",
        cost: new Decimal(670000000),
        unlocked() {return hasUpgrade('H',35)},
        },
        42: {
        title: "17",
        description: "Unlock a new buyable.",
        cost: new Decimal(3000000000),
        unlocked() {return hasUpgrade('H',41)},
        },
        43: {
        title: "18",
        description: "^1.15 the effect of the first buyable again.",
        cost: new Decimal(10000000000),
        unlocked() {return hasUpgrade('H',42)},
        },
        44: {
        title: "19",
        description: "^1.5 the effect of hydrogen upgrade 4.",
        cost: new Decimal(1e12),
        unlocked() {return hasUpgrade('H',43)},
        },
        45: {
        title: "20",
        description: "^1.75 the effect of hydrogen upgrade 3.",
        cost: new Decimal(1e16),
        unlocked() {return hasUpgrade('H',44)},
        },
        51: {
        title: "21",
        description: "Atomic particles boost helium gain.",
        cost: new Decimal(1e17),
        unlocked() {return hasUpgrade('H',45)},
        effect() {
            return player.points.add(1).log10().add(1).pow(0.1)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        52: {
        title: "22",
        description: "Helium boosts its own gain.",
        cost: new Decimal(1e18),
        unlocked() {return hasUpgrade('H',51)},
        effect() {
            return player.He.points.add(1).log10().add(1).cbrt()
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        53: {
        title: "23",
        description: "Unlock a hydrogen challenge.",
        cost: new Decimal(6.7e19),
        unlocked() {return hasUpgrade('H',52)},
        },
        54: {
        title: "24",
        description: "Unlock a hydrogen buyable.",
        cost: new Decimal(6.7e21),
        unlocked() {return hasUpgrade('H',53)},
        },
        55: {
        title: "25",
        description: "Unlock a hydrogen challenge and a new layer.",
        cost: new Decimal(6.7e22),
        unlocked() {return hasUpgrade('H',54)},
        },
    },
    buyables: {
        11: {
            cost(x) { if (hasMilestone('He',7)) return new Decimal(1.1).pow(x)
                else return new Decimal(500).mul(new Decimal(1.1).pow(x)) },
            title: "Proton (H+)",
            display() { return `+100% atomic particle gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                power = new Decimal(1).mul(buyableEffect(this.layer, 23))
                if (hasUpgrade('H',41)) power = new Decimal(1.15).mul(buyableEffect(this.layer, 23))
                if (hasUpgrade('H',43)) power = new Decimal(1.15).pow(2).mul(buyableEffect(this.layer, 23))
                if (hasMilestone('am',1)) power = new Decimal(1.15).pow(2).mul(1.2).mul(buyableEffect(this.layer, 23))
                return getBuyableAmount(this.layer,this.id).add(1).pow(power)},
            buy() {
                if (hasMilestone("He",3)) {this.buyMax()} 
                else  player[this.layer].points = player[this.layer].points.sub(this.cost()).abs()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
                let bulk = player[this.layer].points.div(500).log(1.1).floor()
                if (hasMilestone('He',7)) bulk = player[this.layer].points.log(1.1).floor()
                setBuyableAmount(this.layer, this.id, bulk)
            },
            unlocked(){return true},
        },
        12: {
            cost(x) { if (hasMilestone('He',7)) return new Decimal(1.1).pow(x)
                else return new Decimal(250000).mul(new Decimal(1.1).pow(x)) },
            title: "Dihydrogen (H2)",
            display() { return `+100% atomic particle gain, x2 atomic particles every 25 levels.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp['H'].buyables[12].purchaseLimit) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return getBuyableAmount(this.layer,this.id).mul(new Decimal(2).add(buyableEffect(this.layer, 22)).pow(getBuyableAmount(this.layer,this.id).mul(0.04).floor())).add(1)},
            buy() {
                if (hasMilestone("He",5)) {this.buyMax()} 
                else player[this.layer].points = player[this.layer].points.sub(this.cost()).abs()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1).min(tmp['H'].buyables[12].purchaseLimit))
            },
            buyMax() {
                let bulk = player[this.layer].points.div(250000).log(1.1).floor()
                if (hasMilestone('He',7)) bulk = player[this.layer].points.log(1.1).floor()
                setBuyableAmount(this.layer, this.id, bulk)
            },
            unlocked(){return hasUpgrade('H',25)},
            purchaseLimit() {return Number(new Decimal(player['Li'].milestones.length).mul(250).add(1500))}
        },
        13: {
            cost(x) { if (hasMilestone('He',7)) return new Decimal(1.01).pow((x).pow(2))
                else if (hasMilestone('am',4)) return new Decimal(1e10).mul(new Decimal(1.01).pow((x).pow(2)))
                else return new Decimal(1e10).mul(new Decimal(1.15).pow(x)).mul(new Decimal(1.01).pow((x).pow(2))) },
            title: "Dihydrogen cation (H2+)",
            display() { return `x1.5 atomic particle gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                if (hasUpgrade('He',24)) return new Decimal(1.5).pow(getBuyableAmount(this.layer,this.id)).pow(2)
                else return new Decimal(1.5).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                if (hasMilestone("am",4)) {this.buyMax()}
                else player[this.layer].points = player[this.layer].points.sub(this.cost()).abs()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
                let bulk = player[this.layer].points.div(1e10).log(1.01).pow(0.5).floor()
                if (hasMilestone('He',7)) bulk = player[this.layer].points.log(1.01).pow(0.5).floor()
                setBuyableAmount(this.layer, this.id, bulk)
            },
            unlocked(){return hasUpgrade('H',42)},
        },
        21: {
            cost(x) { if (hasMilestone('He',8)) return new Decimal(1.01).pow((x).pow(2))
                else if (hasMilestone('He',6)) return new Decimal(6.7e21).mul(new Decimal(1.01).pow((x).pow(2)))
                else return new Decimal(6.7e21).mul(new Decimal(1.2).pow(x)).mul(new Decimal(1.01).pow((x).pow(2))) },
            title: "Trihydrogen cation (H3+)",
            display() { return `x1.75 atomic particle gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new Decimal(1.75).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                if (hasMilestone("He",6)) {this.buyMax()}
                else player[this.layer].points = player[this.layer].points.sub(this.cost()).abs()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
                let bulk = player[this.layer].points.div(6.7e21).log(1.01).pow(0.5).floor()
                if (hasMilestone('He',8)) bulk = player[this.layer].points.log(1.01).pow(0.5).floor()
                setBuyableAmount(this.layer, this.id, bulk)
            },
            unlocked(){return hasUpgrade('H',54)},
        },
        22: {
            cost(x) { if (hasMilestone('He',13)) return new Decimal(1.01).pow((x).pow(2))
                else return new Decimal(x).mul(0.01).add(3).tetrate(3) },
            title: "Deuterium (2H)",
            display() { return `+0.01 the secondary effect of Dihydrogen (H2).
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + '+' + format(this.effect())},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new Decimal(0.01).mul(getBuyableAmount(this.layer,this.id))},
            buy() {
                if (hasMilestone("He",13)) {this.buyMax()}
                player[this.layer].points = player[this.layer].points.sub(this.cost()).abs()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
                let bulk = player[this.layer].points.log(1.01).pow(0.5).floor()
                setBuyableAmount(this.layer, this.id, bulk)
            },
            unlocked(){return hasMilestone('am',2)},
        },
        23: {
            cost(x) { if (hasMilestone('He',9)) return new Decimal(1.01).pow((x).pow(2))
                return new Decimal(1e45).mul(new Decimal(1.25).pow(x)).mul(new Decimal(1.01).pow((x).pow(2))) },
            title: "Tritium (3H)",
            display() { return `+^0.05 the effect of Proton (H+).
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + '^' + format(this.effect())},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new Decimal(0.05).mul(getBuyableAmount(this.layer,this.id)).add(1)},
            buy() {
                if (hasMilestone("He",9)) {this.buyMax()}
                else player[this.layer].points = player[this.layer].points.sub(this.cost()).abs()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
                let bulk = player[this.layer].points.log(1.01).pow(0.5).floor()
                setBuyableAmount(this.layer, this.id, bulk)
            },
            unlocked(){return hasUpgrade('He',11)},
        },
        31: {
            cost(x) { if (hasMilestone('He',11)) return new Decimal(1.01).pow((x).pow(2))
                else if (hasMilestone('He',10)) return new Decimal(1.35).pow(x).mul(new Decimal(1.01).pow((x).pow(2)))
                else return new Decimal(1e87).mul(new Decimal(1.35).pow(x)).mul(new Decimal(1.01).pow((x).pow(2))) },
            title: "Deuteron (2H+)",
            display() { return `xlog(Atomic Particles)^0.125 atomic particle gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return player.points.add(10).log10().pow(0.125).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                if (hasMilestone("He",11)) {this.buyMax()}
                player[this.layer].points = player[this.layer].points.sub(this.cost()).abs()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
                let bulk = player[this.layer].points.log(1.01).pow(0.5).floor()
                setBuyableAmount(this.layer, this.id, bulk)
            },
            unlocked(){return hasUpgrade('He',12)},
        },
        32: {
            cost(x) { if (hasMilestone("He",19)) return new Decimal(1.01).pow((x).pow(2))
                else if (hasMilestone("He",12)) return new Decimal(1e95).mul(new Decimal(1.01).pow((x).pow(2)))
                else return new Decimal(1e145).mul(new Decimal(1.5).pow(x)).mul(new Decimal(1.01).pow((x).pow(2))) },
            title: "Triton (3H+)",
            display() { return `xlog(Hydrogen)^0.3 atomic particle gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return player.H.points.add(10).log10().pow(0.3).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                if (hasMilestone("He",12)) {this.buyMax()}
                player[this.layer].points = player[this.layer].points.sub(this.cost()).abs()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            buyMax() {
                let bulk = player[this.layer].points.div(1e95).log(1.01).pow(0.5).floor()
                if (hasMilestone("He",19)) bulk = player[this.layer].points.log(1.01).pow(0.5).floor()
                setBuyableAmount(this.layer, this.id, bulk)
            },
            unlocked(){return hasUpgrade('He',13)},
        },
        33: {
            cost(x) { return new Decimal(1e147).mul(new Decimal(5).pow(x)).mul(new Decimal(1.05).pow((x).pow(2))) },
            title: "Triatomic Hydrogen (H3)",
            display() { return `x(Antimatter) atomic particle and hydrogen gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return player.am.points.add(1).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).abs()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return hasUpgrade('He',14)},
        },
    },
    challenges: {
        11: {
            name: "Hydrogen-4",
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
            name: "Hydrogen-5",
            challengeDescription: "^0.01 atomic particle gain",
            rewardDescription: "x3 atomic particle gain",
            goalDescription: function() {return format(new Decimal(250).mul(new Decimal(1.5).pow(new Decimal(player[this.layer].challenges[this.id]).pow(2)))) + " atomic particles"},
            canComplete: function() {return player.points.gte(new Decimal(250).mul(new Decimal(1.5).pow(new Decimal(player[this.layer].challenges[this.id]).pow(2))))},
            completionLimit: 10,
            unlocked(){return hasUpgrade('H',55)},
            rewardEffect() {
                if (hasMilestone('Li',2)) return new Decimal(3).pow(player[this.layer].challenges[this.id]).pow(3)
                else return new Decimal(3).pow(player[this.layer].challenges[this.id])
            },
            rewardDisplay() { return format(tmp[this.layer].challenges[this.id].rewardEffect)+"x" }, // Add formatting to the effect
        },
        21: {
            name: "Hydrogen-6",
            challengeDescription: "Hydrogen effect is disabled",
            rewardDescription: "x2 hydrogen gain",
            goalDescription: function() {return format(new Decimal(1e88).mul(new Decimal(10).pow(new Decimal(player[this.layer].challenges[this.id]).pow(2)))) + " atomic particles"},
            canComplete: function() {return player.points.gte(new Decimal(1e88).mul(new Decimal(10).pow(new Decimal(player[this.layer].challenges[this.id]).pow(2))))},
            completionLimit: 10,
            unlocked(){return hasUpgrade('He',11)},
            rewardEffect() {
                return new Decimal(2).pow(player[this.layer].challenges[this.id])
            },
            rewardDisplay() { return format(tmp[this.layer].challenges[this.id].rewardEffect)+"x" }, // Add formatting to the effect
        },
        22: {
            name: "Hydrogen-7",
            challengeDescription: "Challenges 1 and 3 at the same time",
            rewardDescription: "^1.01 atomic particle and hydrogen gain",
            countsAs: [11,21],
            goalDescription: function() {return format(new Decimal(1e77).pow(new Decimal(1.03).pow(new Decimal(player[this.layer].challenges[this.id])))) + " atomic particles"},
            canComplete: function() {return player.points.gte(new Decimal(1e77).pow(new Decimal(1.03).pow(new Decimal(player[this.layer].challenges[this.id]))))},
            completionLimit: 5,
            unlocked(){return hasUpgrade('He',12)},
            rewardEffect() {
                return new Decimal(1.01).pow(player[this.layer].challenges[this.id])
            },
            rewardDisplay() { return "^"+format(tmp[this.layer].challenges[this.id].rewardEffect) }, // Add formatting to the effect
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
    color: "#f26a20",
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
    	mult = mult.times(buyableEffect('am', 13))
    	mult = mult.times(buyableEffect('He', 13))
	    mult = mult.times(tmp['Li'].effect)
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
    doReset(resettingLayer) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[resettingLayer].row <= this.row) return;

        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 11, Challenge 32, Buyable 12
        let keptMilestones = []
        if (hasMilestone("am", 2)) keptMilestones.push(1,2,3,4,5)

        // Stage 3, track which main features you want to keep - all upgrades, total points, specific toggles, etc.
        let keep = [];

        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);

        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].milestones.push(...keptMilestones)
    },
    tabFormat: {
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
            unlocked() {return hasUpgrade('H',55)},
        },
        "Buyables": {
            content: ['main-display','prestige-button','buyables'],
            unlocked() {return (hasUpgrade('He',21))}
        },
        "Milestones": {
            content: ['main-display','prestige-button','milestones'],
        },
    },
    upgrades: {
        11: {
        title: "26",
        description: "Unlock a hydrogen buyable and a hydrogen challenge.",
        cost: new Decimal(2e9),
        },
        12: {
        title: "27",
        description: "Unlock a hydrogen buyable and a hydrogen challenge. Also, unlock a few more helium milestones.",
        cost: new Decimal(6.7e17),
        unlocked() {return hasUpgrade('He',11)}, 
        },
        13: {
        title: "28",
        description: "Unlock a hydrogen buyable.",
        cost: new Decimal(1e31),
        unlocked() {return hasUpgrade('He',12)}, 
        },
        14: {
        title: "29",
        description: "Unlock a hydrogen buyable.",
        cost: new Decimal(6.7e32),
        unlocked() {return hasUpgrade('He',13)}, 
        },
        15: {
        title: "30",
        description: "Unlock a new layer, and every helium upgade multiplies atomic particle gain by 10.",
        cost: new Decimal(1e35),
        unlocked() {return hasUpgrade('He',14)}, 
        effect() {
            return new Decimal(10).pow(player[this.layer].upgrades.length)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
        title: "31",
        description: "Unlock a helium buyable.",
        cost: new Decimal(3e39),
        unlocked() {return hasUpgrade('He',15)}, 
        },
        22: {
        title: "32",
        description: "Unlock a helium buyable.",
        cost: new Decimal(3e40),
        unlocked() {return hasUpgrade('He',21)}, 
        },
        23: {
        title: "33",
        description: "Unlock a helium buyable. (It is powerful but expensive!), and ^1.1 the effect of Alpha particle (He 2+).",
        cost: new Decimal(2.5e52),
        unlocked() {return hasUpgrade('He',22)}, 
        },
        24: {
        title: "34",
        description: "Unlock a helium buyable, and square the effect of Dihydrogen cation (H2+)",
        cost: new Decimal(1e60),
        unlocked() {return hasUpgrade('He',23)}, 
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(1e39).mul(new Decimal(1.5).pow(x)).mul(new Decimal(1.01).pow((x).pow(2))) },
            title: "Helium cation (He+)",
            display() { return `x10 atomic particle gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new Decimal(10).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).abs()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return hasUpgrade('He',21)},
        },
        12: {
            cost(x) { return new Decimal(1e40).mul(new Decimal(1.5).pow(x)).mul(new Decimal(1.01).pow((x).pow(2))) },
            title: "Alpha particle (He 2+)",
            display() { return `x10 hydrogen gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                if (hasMilestone('He',19)) return new Decimal(10).pow(getBuyableAmount(this.layer,this.id)).pow(1.1).pow(1.1).pow(1.09).pow(1.08).pow(1.07).pow(1.06)
                else if (hasMilestone('He',17)) return new Decimal(10).pow(getBuyableAmount(this.layer,this.id)).pow(1.1).pow(1.1).pow(1.09).pow(1.08).pow(1.07)
                else if (hasMilestone('He',16)) return new Decimal(10).pow(getBuyableAmount(this.layer,this.id)).pow(1.1).pow(1.1).pow(1.09).pow(1.08)
                else if (hasMilestone('He',15)) return new Decimal(10).pow(getBuyableAmount(this.layer,this.id)).pow(1.1).pow(1.1).pow(1.09)
                else if (hasMilestone('He',14)) return new Decimal(10).pow(getBuyableAmount(this.layer,this.id)).pow(1.1).pow(1.1)
                else if (hasUpgrade('He',23)) return new Decimal(10).pow(getBuyableAmount(this.layer,this.id)).pow(1.1)
                else return new Decimal(10).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).abs()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return hasUpgrade('He',22)},
        },
        13: {
            cost(x) { return new Decimal(6.7e53).mul(new Decimal(75).pow(x)).mul(new Decimal(1.75).pow((x).pow(2))) },
            title: "Helium anion (He-)",
            display() { return `x10 helium gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new Decimal(10).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).abs()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return hasUpgrade('He',23)},
        },
        21: {
            cost(x) { return new Decimal(1e61).mul(new Decimal(100).pow(x)).mul(new Decimal(2).pow((x).pow(2))) },
            title: "Helium-3 (3He)",
            display() { return `+^0.25 the effects of the first 3 antimatter buyables.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + '^' + format(this.effect())},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new Decimal(getBuyableAmount(this.layer,this.id)).mul(0.25).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).abs()
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return hasUpgrade('He',24)},
        },
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
        6: {
            requirementDescription: "Requires: 1e22 helium",
            effectDescription: "Remove the single exponent from the Trihydrogen cation (H3+) cost formula, buy max the buyable, and it costs nothing.",
            done() { return player[this.layer].points.gte(1e22) },
            unlocked() {return (hasUpgrade('He',12))}
        },
        7: {
            requirementDescription: "Requires: 1e23 helium",
            effectDescription: "Remove the cost base from the cost formulas of the first 3 buyables.",
            done() { return player[this.layer].points.gte(1e23) },
            unlocked() {return (hasUpgrade('He',12))}
        },
        8: {
            requirementDescription: "Requires: 1e25 helium",
            effectDescription: "Remove the cost base from the cost formula of Trihydrogen Cation (H3+).",
            done() { return player[this.layer].points.gte(1e25) },
            unlocked() {return (hasUpgrade('He',12))}
        },
        9: {
            requirementDescription: "Requires: 2.5e32 helium",
            effectDescription: "Remove the cost base/single exponent from the cost formula of Tritium (3H), and buy max the buyable/it costs nothing.",
            done() { return player[this.layer].points.gte(2.5e32) },
            unlocked() {return (hasUpgrade('He',12))}
        },
        10: {
            requirementDescription: "Requires: 1.5e40 helium",
            effectDescription: "Remove the cost base of Deuteron (2H+).",
            done() { return player[this.layer].points.gte(1.5e40) },
            unlocked() {return (hasMilestone('Li',1))}
        },
        11: {
            requirementDescription: "Requires: 6.7e40 helium",
            effectDescription: "Remove the single exponent of Deuteron (2H+), and buy max the buyable/it costs nothing.",
            done() { return player[this.layer].points.gte(6.7e40) },
            unlocked() {return (hasMilestone('Li',1))}
        },
        12: {
            requirementDescription: "Requires: 1e51 helium",
            effectDescription: "Remove the single exponent of Triton (3H+), divide the cost base by 1e50, and buy max the buyable/it costs nothing.",
            done() { return player[this.layer].points.gte(1e51) },
            unlocked() {return (hasMilestone('Li',1))}
        },
        13: {
            requirementDescription: "Requires: 1e58 helium",
            effectDescription: "Buy max Deuterium (2H), and the cost scaling is reduced.",
            done() { return player[this.layer].points.gte(1e58) },
            unlocked() {return (hasMilestone('Li',1))}
        },
        14: {
            requirementDescription: "Requires: 5e64 helium",
            effectDescription: "^1.1 the effect of Alpha particle (He 2+).",
            done() { return player[this.layer].points.gte(5e64) },
            unlocked() {return (hasMilestone('Li',1))}
        },
        15: {
            requirementDescription: "Requires: 2e71 helium",
            effectDescription: "^1.09 the effect of Alpha particle (He 2+).",
            done() { return player[this.layer].points.gte(2e71) },
            unlocked() {return (hasMilestone('Li',1))}
        },
        16: {
            requirementDescription: "Requires: 1e73 helium",
            effectDescription: "^1.08 the effect of Alpha particle (He 2+).",
            done() { return player[this.layer].points.gte(1e73) },
            unlocked() {return (hasMilestone('Li',1))}
        },
        17: {
            requirementDescription: "Requires: 2.5e78 helium",
            effectDescription: "^1.07 the effect of Alpha particle (He 2+).",
            done() { return player[this.layer].points.gte(2.5e78) },
            unlocked() {return (hasMilestone('Li',1))}
        },
        18: {
            requirementDescription: "Requires: 1e82 helium",
            effectDescription: "x1e5 atomic particles.",
            done() { return player[this.layer].points.gte(1e82) },
            unlocked() {return (hasMilestone('Li',1))}
        },
        19: {
            requirementDescription: "Requires: 5e87 helium",
            effectDescription: "^1.06 the effect of Alpha particle (He 2+), and remove the cost base of Triton (3H+)",
            done() { return player[this.layer].points.gte(5e87) },
            unlocked() {return (hasMilestone('Li',1))}
        },
    }
})
addLayer("Li", {
    name: "lithium", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Li", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ['He'],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#df8b00",
    requires: new Decimal(1e36), // Can be a function that takes requirement increases into account
    resource: "lithium", // Name of prestige currency
    baseResource: "helium", // Name of resource prestige is based on
    baseAmount() {return player.He.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.02, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){if (hasUpgrade('He',15)) return true 
        else if (player[this.layer].points.gte(1)) return true},
    effect() {
        return player[this.layer].points.add(1).pow(2)
    },
    effectDescription() { return 'multiplying atomic particle/hydrogen/helium gain by ' + format(tmp['Li'].effect)},
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
            requirementDescription: "Requires: 1 lithium",
            effectDescription: "Every lithium milestone gives ^1.01 atomic particles and +250 Dihydrogen cap. Autobuy the last 3 hydrogen buyables, and unlock more helium milestones.",
            done() { return player[this.layer].points.gte(1) },
            effect() {
                return new Decimal(1.01).pow(player[this.layer].milestones.length)
            },
        },
        2: {
            requirementDescription: "Requires: 3 lithium",
            effectDescription: "Cube the effect of Hydrogen-5, and antimatter resets nothing.",
            done() { return player[this.layer].points.gte(3) },
        },
    }
})