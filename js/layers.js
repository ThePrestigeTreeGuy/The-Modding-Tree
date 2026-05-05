addLayer("M", {
    name: "seconds", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "M/T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#ff4040",
    requires: new Decimal(2.6944002e25), // Can be a function that takes requirement increases into account
    resource: "seconds", // Name of prestige currency
    baseResource: "m^3", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.33333333333333, // Prestige currency exponent
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
    tabFormat: {
        "Matter": {
            content: ['main-display','prestige-button','buyables'],
        },
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Levels": {
            content: [
                ['bar','bigBar']
            ],
        },
        "Info": {
            content: [
                ['infobox','lore']
            ]
        }
    },
    infoboxes: {
        lore: {
            title: "ACT 0: ENDLESS VOID",
            body() { return "You start with an unimaginably tiny amount of volume. You can buy the Planck Length, but since everything around you is so much bigger, you'll need to progress through the emptiness of the void for now. The first upgrade will be unlocked once you buy 50 Planck Volumes." },
        }
    },
    upgrades: {
        11: {
            title: "Doubler",
            description: "Double Planck Volume effect.",
            cost: new Decimal(1e-101),
            unlocked() {return getBuyableAmount(this.layer,11).gte(50)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        12: {
            title: "Another Doubler",
            description: "Double Planck Volume effect.",
            cost: new Decimal(2.5e-101),
            unlocked() {return hasUpgrade('M',11)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        13: {
            title: "More Doublers!",
            description: "Double Planck Volume effect, and unlock a new feature.",
            cost: new Decimal(5e-101),
            unlocked() {return hasUpgrade('M',12)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        14: {
            title: "Even More Doublers!",
            description: "Double Planck Volume effect.",
            cost: new Decimal(1e-99),
            unlocked() {return hasUpgrade('M',13)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        15: {
            title: "New Matter?",
            description: "Double Planck Volume effect, and unlock new matter.",
            cost: new Decimal(5e-99),
            unlocked() {return hasUpgrade('M',14)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        21: {
            title: "Yay! Synergy!",
            description: "Every Million Planck Volume boosts Planck Volume effect by +25%.",
            cost: new Decimal(1e-96),
            unlocked() {return hasUpgrade('M',15)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        22: {
            title: "Planks",
            description: "Double Planck Volume effect.",
            cost: new Decimal(3e-96),
            unlocked() {return hasUpgrade('M',21)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        23: {
            title: "Plankton",
            description: "Double Planck Volume effect.",
            cost: new Decimal(9e-96),
            unlocked() {return hasUpgrade('M',22)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        24: {
            title: "Plan",
            description: "Double Planck Volume effect.",
            cost: new Decimal(2.7e-95),
            unlocked() {return hasUpgrade('M',23)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        25: {
            title: "Planning",
            description: "Double Planck Volume effect.",
            cost: new Decimal(6e-95),
            unlocked() {return hasUpgrade('M',24)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        31: {
            title: "Planner",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(1.5e-94),
            unlocked() {return hasUpgrade('M',25)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        32: {
            title: "Planned",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(5e-94),
            unlocked() {return hasUpgrade('M',31)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        33: {
            title: "Plans",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(2e-93),
            unlocked() {return hasUpgrade('M',32)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        34: {
            title: "Play",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(8e-93),
            unlocked() {return hasUpgrade('M',33)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        35: {
            title: "Platinum",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(3.2e-92),
            unlocked() {return hasUpgrade('M',34)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        41: {
            title: "Plentiful",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(2e-91),
            unlocked() {return hasUpgrade('M',35)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        42: {
            title: "Placid",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(1e-90),
            unlocked() {return hasUpgrade('M',41)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        43: {
            title: "Acid",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(1e-89),
            unlocked() {return hasUpgrade('M',42)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        44: {
            title: "Where did the planck go???",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(5e-89),
            unlocked() {return hasUpgrade('M',43)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        45: {
            title: "Oh well",
            description: "Triple Planck Volume effect.",
            cost: new Decimal(2.5e-88),
            unlocked() {return hasUpgrade('M',44)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        111: {
            title: "Million-Doubler!",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(1e-96),
            unlocked() {return hasUpgrade('M',15)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        112: {
            title: "More Million-Doublers!",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(2.5e-96),
            unlocked() {return hasUpgrade('M',111)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        113: {
            title: "Even More Million-Doublers!",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(6.25e-96),
            unlocked() {return hasUpgrade('M',112)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        114: {
            title: "So Large Yet So Small",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(1.56e-95),
            unlocked() {return hasUpgrade('M',113)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        115: {
            title: "Even Larger Yet So Small",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(3.9e-95),
            unlocked() {return hasUpgrade('M',114)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        121: {
            title: "Yay! More Synergy!",
            description: "Every Planck Volume boosts Million Planck Volume effect by +1%.",
            cost: new Decimal(2e-94),
            unlocked() {return hasUpgrade('M',115)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        122: {
            title: "Increasing Within The Void",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(5e-94),
            unlocked() {return hasUpgrade('M',121)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        123: {
            title: "New Matter??",
            description: "Double Million Planck Volume effect, and unlock new matter.",
            cost: new Decimal(1e-93),
            unlocked() {return hasUpgrade('M',122)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        124: {
            title: "Still Increasing Within The Void",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(2e-93),
            unlocked() {return hasUpgrade('M',123)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        125: {
            title: "Endless... Void...",
            description: "Double Million Planck Volume effect.",
            cost: new Decimal(5e-93),
            unlocked() {return hasUpgrade('M',124)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        131: {
            title: "Approaching the Quectometre I",
            description: "Triple Million Planck Volume effect.",
            cost: new Decimal(1.5e-92),
            unlocked() {return hasUpgrade('M',125)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        132: {
            title: "Approaching the Quectometre II",
            description: "Triple Million Planck Volume effect.",
            cost: new Decimal(7.5e-92),
            unlocked() {return hasUpgrade('M',131)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        133: {
            title: "Approaching the Quectometre III",
            description: "Triple Million Planck Volume effect.",
            cost: new Decimal(3.75e-91),
            unlocked() {return hasUpgrade('M',132)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        134: {
            title: "Quectometre Boost",
            description: "x2 volume gain.",
            cost: new Decimal(1e-90),
            unlocked() {return hasUpgrade('M',132)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        211: {
            title: "Trillions upon Trillions",
            description: "Double Trillion Planck Volume effect.",
            cost: new Decimal(5e-92),
            unlocked() {return hasUpgrade('M',123)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        212: {
            title: "Trillions upon Trillions upon Trillions",
            description: "Double Trillion Planck Volume effect.",
            cost: new Decimal(1.25e-91),
            unlocked() {return hasUpgrade('M',211)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        213: {
            title: "Trillions upon Trillions...?",
            description: "Double Trillion Planck Volume effect.",
            cost: new Decimal(3e-91),
            unlocked() {return hasUpgrade('M',212)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        214: {
            title: "Trillions upon Trillions...!",
            description: "Double Trillion Planck Volume effect.",
            cost: new Decimal(7.5e-91),
            unlocked() {return hasUpgrade('M',213)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
        215: {
            title: "Not Trillions upon Trillions...",
            description: "Double Trillion Planck Volume effect.",
            cost: new Decimal(5e-90),
            unlocked() {return hasUpgrade('M',214)},
            currencyDisplayName: "m^3",
            currencyInternalName: "points"
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(4.22e-105).mul(new Decimal(1.1).pow(x)) },
            title: "Planck Volume",
            display() { return `+4.22e-105 m^3 per second.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + '+' + formatSmall(this.effect()) + '/sec'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){
                let mult = new Decimal(1)
                if (hasUpgrade('M',11)) mult = mult.times(2)
                if (hasUpgrade('M',12)) mult = mult.times(2)
                if (hasUpgrade('M',13)) mult = mult.times(2)
                if (hasUpgrade('M',14)) mult = mult.times(2)
                if (hasUpgrade('M',15)) mult = mult.times(2)
                if (hasUpgrade('M',21)) mult = mult.times(getBuyableAmount(this.layer,12).mul(0.25).add(1))
                if (hasUpgrade('M',22)) mult = mult.times(2)
                if (hasUpgrade('M',23)) mult = mult.times(2)
                if (hasUpgrade('M',24)) mult = mult.times(2)
                if (hasUpgrade('M',25)) mult = mult.times(2)
                if (hasUpgrade('M',31)) mult = mult.times(3)
                if (hasUpgrade('M',32)) mult = mult.times(3)
                if (hasUpgrade('M',33)) mult = mult.times(3)
                if (hasUpgrade('M',34)) mult = mult.times(3)
                if (hasUpgrade('M',35)) mult = mult.times(3)
                if (hasUpgrade('M',41)) mult = mult.times(3)
                if (hasUpgrade('M',42)) mult = mult.times(3)
                if (hasUpgrade('M',43)) mult = mult.times(3)
                if (hasUpgrade('M',44)) mult = mult.times(3)
                if (hasUpgrade('M',45)) mult = mult.times(3)
                return getBuyableAmount(this.layer,this.id).mul(4.22e-105).mul(mult)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return true},
        },
        12: {
            cost(x) { return new Decimal(4.22e-99).mul(new Decimal(1.1).pow(x)) },
            title: "Million Planck Volumes",
            display() { return `+4.22e-102 m^3 per second.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + '+' + formatSmall(this.effect()) + '/sec'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){
                let mult = new Decimal(1)
                if (hasUpgrade('M',111)) mult = mult.times(2)
                if (hasUpgrade('M',112)) mult = mult.times(2)
                if (hasUpgrade('M',113)) mult = mult.times(2)
                if (hasUpgrade('M',114)) mult = mult.times(2)
                if (hasUpgrade('M',115)) mult = mult.times(2)
                if (hasUpgrade('M',121)) mult = mult.times(getBuyableAmount(this.layer,11).mul(0.01).add(1))
                if (hasUpgrade('M',122)) mult = mult.times(2)
                if (hasUpgrade('M',123)) mult = mult.times(2)
                if (hasUpgrade('M',124)) mult = mult.times(2)
                if (hasUpgrade('M',125)) mult = mult.times(2)
                if (hasUpgrade('M',131)) mult = mult.times(3)
                if (hasUpgrade('M',132)) mult = mult.times(3)
                if (hasUpgrade('M',133)) mult = mult.times(3)
                return getBuyableAmount(this.layer,this.id).mul(4.22e-102).mul(mult)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (hasUpgrade('M',15))},
        },
        13: {
            cost(x) { return new Decimal(4.22e-93).mul(new Decimal(1.1).pow(x)) },
            title: "Trillion Planck Volumes",
            display() { return `+2e-97 m^3 per second.
            <b>Cost: </b>` + formatSmall(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + '+' + formatSmall(this.effect()) + '/sec'},
            canAfford() { return player.points.gte(this.cost()) },
            effect(){
                let mult = new Decimal(1)
                if (hasUpgrade('M',211)) mult = mult.times(2)
                if (hasUpgrade('M',212)) mult = mult.times(2)
                if (hasUpgrade('M',213)) mult = mult.times(2)
                if (hasUpgrade('M',214)) mult = mult.times(2)
                if (hasUpgrade('M',215)) mult = mult.times(2)
                return getBuyableAmount(this.layer,this.id).mul(2e-97).mul(mult)},
            buy() {
                player.points = player.points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){return (hasUpgrade('M',123))},
        },
    },
    bars: {
        bigBar: {
            direction: RIGHT,
            width: 400,
            height: 50,
            progress() { return new Decimal(player.points).mul(2e100).div(new Decimal(2).pow(new Decimal(player.points).mul(2e100).log(2).floor().add(1)).max(1)) },
            display() {return format(new Decimal(player.points).mul(1e100).log(2).floor().add(1).max(0)) + ` Volume Level, which gives a ` + format(new Decimal(1.05).pow(new Decimal(player.points).mul(1e100).log(2).floor().add(1).max(0)).mul(new Decimal(player.points).mul(1e100).log(2).floor().add(2).max(1)).floor()) + `x boost to volume gain.`},
            fillStyle: {
                backgroundColor: "#ff4040"
            },
            unlocked () {return hasUpgrade('M',13)}
        },
    },
})