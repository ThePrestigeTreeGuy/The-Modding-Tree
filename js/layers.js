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
            name: "yay",
            tooltip: "Unlock achievements",
            done() {return hasMilestone('amb',1)}
        },
        21: {
            name: "Ambushed",
            tooltip: "Get 1 ambush. Reward: Doors, Closets, and Knobs permanently reset nothing. Also, keep door automation.",
            done() {return player.amb.points.gte(1)},
            unlocked(){return (hasAchievement('a',11))},
        },
        22: {
            name: "Closets are the guiding light now",
            tooltip: "Reach the door softcap. Reward: Keep all previous content unlocked.",
            done() {return player.d.points.gte(5e6)},
            unlocked(){return (hasAchievement('a',21))},
        },
        23: {
            name: "Yay a useful achievement!",
            tooltip: "Unlock rush milestone 4. Reward: Unlock an ambush challenge",
            done() {return player.r.points.gte("e2270")},
            unlocked(){return (hasAchievement('a',22))},
        },
    },
        layerShown(){if (hasUpgrade ('du',25))
                {return true}
                else if (hasAchievement ('a',11))
    {return true}},
})
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
    exponent() { // Calculate the multiplier for main currency from bonuses
        let exponent = new Decimal(1.2)
        if (player.d.points.gte(5e6)) exponent = 1.2
        else if (hasMilestone('d', 2)) exponent = 1.07
        else if (hasMilestone('c', 3)) exponent = 1.08
        else if (hasUpgrade('d', 55)) exponent = 1.09
        else if (hasUpgrade('d', 54)) exponent = 1.1
        else if (hasUpgrade('d', 53)) exponent = 1.11
        else if (hasUpgrade('d', 41)) exponent = 1.12
        else if (hasUpgrade('r', 35)) exponent = 1.13
        else if (hasUpgrade('f', 14)) exponent = 1.14
        else if (hasUpgrade('r', 22)) exponent = 1.15
        else if (hasUpgrade('f', 11)) exponent = 1.16
        else if (hasUpgrade('d', 35)) exponent = 1.17
        else if (hasUpgrade('k', 35)) exponent = 1.18
        return exponent
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('d', 23)) mult = mult.times(upgradeEffect('d', 23))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    directMult() { // Calculate the direct mult after softcap
        let dmult = new Decimal(1)
        if (hasUpgrade('c', 45)) dmult = dmult.times(1.03)
        dmult = dmult.times(buyableEffect('d', 11))
        return dmult
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for doors", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    canBuyMax() {return hasMilestone("du",1)},
    autoPrestige() {if (hasMilestone("f",1))
    {return true}
    else if (hasAchievement('a',11))
    {return true}},
    resetsNothing() {if (hasMilestone ('g',1))
    {return true}
    else if (hasAchievement('a',11))
    {return true}},
    tabFormat: {
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Milestones": {
            content: ['main-display','prestige-button','milestones'],
            unlocked(){return (hasUpgrade("f",22))}
        },
        "Buyables": {
            content: ['main-display','prestige-button','buyables'],
            unlocked(){return (hasMilestone("d",1))}
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(293000).add(x.pow(4)) },
            title: "Doored Doors",
            display() { return `x1.005 door gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                let thing = new Decimal(1.005)
                return thing.pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){if (hasMilestone("d",1))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        12: {
            cost(x) { return new Decimal(710000).add(x.pow(4)) },
            title: "Rebounding Doors",
            display() { return `x2 ambush gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                let thing = new Decimal(2)
                return thing.pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){if (hasMilestone("d",2))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        13: {
            cost(x) { return new Decimal(749000).add(x.pow(7)) },
            title: "Rushed Doors",
            display() { return `^1.05 rush gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + '^'+format(this.effect())},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                let thing = new Decimal(1.05)
                return thing.pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){if (hasMilestone("d",3))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
    },
    milestones: {
        1: {
            requirementDescription: "Requires: 293,000 Doors",
            effectDescription: "Each door milestone until 9 unlocks a door buyable.",
            done() { return player.d.points.gte(293000) },
            unlocked(){if (hasUpgrade("f",22))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        2: {
            requirementDescription: "Requires: 484,000 Doors",
            effectDescription: "^0.95 stud gain but door exponent is 1.07.",
            done() { return player.d.points.gte(484000) },
            unlocked(){if (hasMilestone("d",1))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        3: {
            requirementDescription: "Requires: 730,000 Doors",
            effectDescription: "Closet Power boosts Rebounded Closets. (WARNING: door exponent resets to 1.2 at 5,000,000 doors)",
            done() { return player.d.points.gte(730000) },
            unlocked(){if (hasMilestone("d",1))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
    },
    upgrades: {
        11: {
        title: "Doors 1",
        description: "x (doors+1)^1.5 stud gain",
        cost: new Decimal(1),
        effect() {
            let exponent = new Decimal(1)
            if (hasUpgrade('d',32)) exponent = exponent.times(upgradeEffect('d',32))
            return player[this.layer].points.add(1).pow(1.5).pow(exponent)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Doors 2",
            description: "x log2(doors+1)+1 stud gain",
            cost: new Decimal(12),
            unlocked(){if (hasUpgrade("d",11))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player[this.layer].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Doors 3",
            description: "x (rush+1)^2 stud gain",
            cost: new Decimal(25),
            unlocked(){if (hasUpgrade("r",13))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                let exponent = new Decimal(1)
                if (hasUpgrade('r',21)) exponent = exponent.times(upgradeEffect('r',21))
                let thing = new Decimal(1)
                if (hasUpgrade('d',42)) thing = thing.times(2)
                let stuf = new Decimal(1)
                if (hasUpgrade('d',45)) stuf = stuf.times(2)
                return player["r"].points.add(1).pow(2).pow(exponent).pow(thing).pow(stuf)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Doors 4",
            description: "x (doors+1)^2 stud gain",
            cost: new Decimal(36),
            unlocked(){if (hasUpgrade("k",15))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player[this.layer].points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Doors 5",
            description: "x (doors+1) knob and stud gain and unlock a closet upgrade",
            cost: new Decimal(65),
            unlocked(){if (hasUpgrade("c",23))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player[this.layer].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Doors 6",
            description: "x (doors+1) rush",
            cost: new Decimal(155),
            unlocked(){if (hasUpgrade("g",15))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player[this.layer].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Doors 7",
            description: "x (doors+1) gold",
            cost: new Decimal(162),
            unlocked(){if (hasUpgrade("d",21))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                let exponent = new Decimal(1)
                if (hasUpgrade('d',33)) exponent = exponent.times(upgradeEffect('d',33))
                return player[this.layer].points.add(1).pow(exponent)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Doors 8",
            description: "/(log10(studs+1)+1)^3 door requirement",
            cost: new Decimal(174),
            unlocked(){if (hasUpgrade("d",22))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player.points.add(1).log10().add(1).pow(-3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "Doors 9",
            description: "random nothing here! log10(studs+1) rush gain?",
            cost: new Decimal(184),
            unlocked(){if (hasUpgrade("d",23))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player.points.add(1).log10()
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        25: {
            title: "Doors 10",
            description: "ohio upgrade (doors+1) gold gain... (check floors)",
            cost: new Decimal(193),
            unlocked(){if (hasUpgrade("d",24))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player[this.layer].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        31: {
            title: "Doors 11",
            description: "MORE ^1.05 STUDS???",
            cost: new Decimal(328),
            unlocked(){if (hasMilestone("f",3))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        32: {
            title: "Doors 12",
            description: "^log10(doors+1)+1 Doors 1.",
            cost: new Decimal(344),
            unlocked(){if (hasUpgrade("d",31))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player[this.layer].points.add(1).log10().add(1)
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        33: {
            title: "Doors 13",
            description: "^log10(doors+1)+1 Doors 7.",
            cost: new Decimal(367),
            unlocked(){if (hasUpgrade("d",32))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player[this.layer].points.add(1).log10().add(1)
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        34: {
            title: "Doors 14",
            description: "A simple x1e5 stud gain.",
            cost: new Decimal(410),
            unlocked(){if (hasUpgrade("d",33))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        35: {
            title: "Doors 15",
            description: "^1.1 knobs and door exponent is 1.17(funny upgrade cost (real (not fake(funny(pg132(ohio(check floors)))))))",
            cost: new Decimal(420),
            unlocked(){if (hasUpgrade("d",34))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        41: {
            title: "Doors 16",
            description: "^0.9 studs but door exponent is 1.12.",
            cost: new Decimal(22500),
            unlocked(){if (hasMilestone("amb",4))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
        42: {
            title: "Doors 17",
            description: "^2 Doors 3 effect",
            cost: new Decimal(24500),
            unlocked(){if (hasUpgrade("d",41))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
        43: {
            title: "Doors 18",
            description: "Gain 10% of ambush per second, and x(ambush+1)^100 stud gain.",
            cost: new Decimal(26600),
            unlocked(){if (hasUpgrade("d",42))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
            effect() {
                return player['amb'].points.add(1).pow(100)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        44: {
            title: "Doors 19",
            description: "Closet exponent is 1.09.",
            cost: new Decimal(28000),
            unlocked(){if (hasUpgrade("d",43))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
        45: {
            title: "Doors 20",
            description: "^2 Doors 3 effect but ^0.9 studs.",
            cost: new Decimal(33333),
            unlocked(){if (hasUpgrade("d",44))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
        51: {
            title: "Doors 21",
            description: "help im PG132 NOW. Floor exponent is 0.6",
            cost: new Decimal(35300),
            unlocked(){if (hasUpgrade("d",45))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
        52: {
            title: "Doors 22",
            description: "=) xlog10(doors+1)+1 ambush gain bc why not??? =)",
            cost: new Decimal(39400),
            unlocked(){if (hasUpgrade("d",51))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
            effect() {
                return player['d'].points.add(1).log10().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        53: {
            title: "Doors 23",
            description: "Another reducing exponent upgrade. ^0.97 stud gain but door exponent is 1.11",
            cost: new Decimal(40000),
            unlocked(){if (hasUpgrade("d",52))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
        54: {
            title: "Doors 24",
            description: "Almost there! ^0.97 stud gain but door exponent is 1.1",
            cost: new Decimal(44500),
            unlocked(){if (hasUpgrade("d",53))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
        55: {
            title: "Doors 25",
            description: "No more door upgrades, but ^0.97 stud gain and door exponent is 1.09. yay now door and closet exponent are equal",
            cost: new Decimal(50000),
            unlocked(){if (hasUpgrade("d",54))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
    },  
    branches: ["d","c"]
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
    exponent() { // Calculate the multiplier for main currency from bonuses
        let exponent = new Decimal(1.1)
        if (hasMilestone('c', 3)) exponent = 1.08
        else if (hasUpgrade('d', 44)) exponent = 1.09
        return exponent
    },

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        let mult = new Decimal(1)
        return mult
    },
    directMult() { // Calculate the direct mult after softcap
        let dmult = new Decimal(1)
        if (hasUpgrade('c', 44)) dmult = dmult.times(1.03)
        if (hasUpgrade('g', 25)) dmult = dmult.times(1.03)
        dmult = dmult.times(buyableEffect('c', 21))
        return dmult
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },
    layerShown() { return true },          // Returns a bool for if this layer's node should be visible in the tree.
    canBuyMax() {if (hasUpgrade ('r',14))
    {return true}
    else if (hasMilestone ('g',4))
    {return true}},
    autoPrestige() {return hasMilestone("du",2)},
    resetsNothing() {if (hasMilestone ('du',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
    tabFormat: {
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Milestones": {
            content: ['main-display','prestige-button','milestones'],
            unlocked(){return (hasUpgrade("f",21))}
        },
        "Buyables": {
            content: ['main-display','prestige-button','buyables'],
            unlocked(){return (hasMilestone("c",1))}
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(59000).add(x.pow(3)) },
            title: "Rebounding Closets",
            display() {if (hasMilestone('d',3)) {return `x2 ambush gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id))+'+' +format(getBuyableAmount(this.layer,12))+`
            <b>Effect:</b>` + format(this.effect()) + 'x'}
                else {return `x2 ambush gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'}}, //     effectDescription() { return 'multiplying rush gain by ' + format(tmp['g'].effect)},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                let thing = new Decimal(2)
                if (hasMilestone('d',3)){return thing.pow(getBuyableAmount(this.layer,this.id).add(getBuyableAmount(this.layer,12)))}
                else {return thing.pow(getBuyableAmount(this.layer,this.id))}},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){if (hasMilestone("c",1))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        12: {
            cost(x) { return new Decimal(64000).add(x.pow(5)) },
            title: "Closet Power",
            display() { return `^1.001 studs.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + "^" + format(this.effect())}, //     effectDescription() { return 'multiplying rush gain by ' + format(tmp['g'].effect)},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                let thing = new Decimal(1.001)
                return thing.pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){if (hasMilestone("c",2))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        13: {
            cost(x) { return new Decimal(81000).add(x.pow(10)) },
            title: "Rushed Closets",
            display() { return `^1.05 rush.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + "^" + format(this.effect())}, //     effectDescription() { return 'multiplying rush gain by ' + format(tmp['g'].effect)},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                let thing = new Decimal(1.05)
                return thing.pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){if (hasMilestone("c",3))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        21: {
            cost(x) { return new Decimal(213000).add(x.pow(6)) },
            title: "Closeted Closets",
            display() { return `x1.005 closets.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect())+'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                let thing = new Decimal(1.005)
                return thing.pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){if (hasMilestone("c",4))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        22: {
            cost(x) { return new Decimal(238000).add(x.pow(3.5)) },
            title: "Golden Closets",
            display() { return `x2 Direct mult to gold.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect())+'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                let thing = new Decimal(2)
                thing = thing.add(buyableEffect('c',23))
                return thing.pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){if (hasMilestone("c",5))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        23: {
            cost(x) { return new Decimal(3.805e6).add(x.pow(5)) },
            title: "Goldener Closets",
            display() { return `+0.05 Golden Closets base.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + '+'+format(this.effect())},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                let thing = new Decimal(0.05)
                return thing.times(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){if (hasMilestone("c",6))
            {return true}
            else if (hasAchievement('a',23))
            {return true}},
        },
    },
    milestones: {
        1: {
            requirementDescription: "Requires: 59,000 Closets",
            effectDescription: "Each closet milestone until 9 unlocks a closet buyable.",
            done() { return player.c.points.gte(59000) },
            unlocked(){if (hasUpgrade("f",21))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        2: {
            requirementDescription: "Requires: 64,000 Closets",
            effectDescription: "x10 ambush gain.",
            done() { return player.c.points.gte(64000) },
            unlocked(){if (hasMilestone("c",1))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        3: {
            requirementDescription: "Requires: 67,500 Closets",
            effectDescription: "Unlock new closet upgrades, ^0.93 stud gain but door and closet exponent is 1.08.",
            done() { return player.c.points.gte(67500) },
            unlocked(){if (hasMilestone("c",2))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        4: {
            requirementDescription: "Requires: 153,000 Closets",
            effectDescription: "Floor exponent is 0.5.",
            done() { return player[this.layer].points.gte(153000) },
            unlocked(){if (hasMilestone("c",3))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        5: {
            requirementDescription: "Requires: 238,000 Closets",
            effectDescription: "Unlock more gold upgrades.",
            done() { return player[this.layer].points.gte(238000) },
            unlocked(){if (hasMilestone("c",4))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        6: {
            requirementDescription: "Requires: 3,800,000 Closets",
            effectDescription: "Unlock more gold upgrades. (btw no more dupe or floor upgrades in a while due to door softcap)",
            done() { return player[this.layer].points.gte(3.8e6) },
            unlocked(){if (hasMilestone("d",3))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
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
        unlocked(){if (hasUpgrade("c",11))
        {return true}
            else if (hasMilestone('g',3))
        {return true}
        else if (hasAchievement('a',11))
        {return true}},
        effect() {
            let exponent = new Decimal(1)
            if (hasUpgrade('c',33)) exponent = exponent.times(upgradeEffect('c',33))
            return player[this.layer].points.add(1).pow(3).pow(exponent)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Closets 3",
            description: "x log2(closets+1)+1 knob gain",
            cost: new Decimal(20),
            unlocked(){if (hasUpgrade("c",12))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player[this.layer].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Closets 4",
            description: "x (closets+1)^0.2 rush gain",
            cost: new Decimal(25),
            unlocked(){if (hasUpgrade("r",11))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player[this.layer].points.add(1).pow(0.2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Closets 5",
            description: "haha knob go brrr anyway, x (closets+1) knob gain and unlock more knob upgrades",
            cost: new Decimal(35),
            unlocked(){if (hasUpgrade("c",14))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player[this.layer].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Closets 6",
            description: "x log(knobs+1)+1 rush and unlock a rush upgrade",
            cost: new Decimal(69),
            unlocked(){if (hasUpgrade("r",13))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player["k"].points.add(1).log10().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Closets 7",
            description: "x(Closets+1)^2 stud gain",
            cost: new Decimal(78),
            unlocked(){if (hasUpgrade("c",21))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player["c"].points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Closets 8",
            description: "xlog2(closets+1)+1 stud gain and unlock a door upgrade",
            cost: new Decimal(89),
            unlocked(){if (hasUpgrade("c",22))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player["c"].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "Closets 9",
            description: "xlog2(log(knob+1)+1)+1 rush gain",
            cost: new Decimal(98),
            unlocked(){if (hasUpgrade("d",15))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player["k"].points.add(1).log10().add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        25: {
            title: "Closets 10",
            description: "Unlock a new layer, x100 studs.",
            cost: new Decimal(143),
            unlocked(){if (hasUpgrade("r",15))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
        },
        31: {
            title: "Closets 11",
            description: "^1.05 studs (the exponents...)",
            cost: new Decimal(690),
            unlocked(){if (hasMilestone("f",4))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        32: {
            title: "Closets 12",
            description: "100% of gold gain per second.",
            cost: new Decimal(732),
            unlocked(){if (hasUpgrade("c",31))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        33: {
            title: "Closets 13",
            description: "^log10(closets+1)+1 Closets 1.",
            cost: new Decimal(753),
            unlocked(){if (hasUpgrade("c",32))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player[this.layer].points.add(1).log10().add(1)
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        34: {
            title: "Closets 14",
            description: "^(log10(closets+1)+1)^0.05 studs.",
            cost: new Decimal(841),
            unlocked(){if (hasUpgrade("c",33))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player[this.layer].points.add(1).log10().add(1).pow(0.05)
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        35: {
            title: "Closets 15",
            description: "x100 studs, unlock a floor upgrade (VERY SERIOUS COST)",
            cost: new Decimal(911),
            unlocked(){if (hasUpgrade("c",34))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        41: {
            title: "Closets 16",
            description: "Floor exponent is 0.55.",
            cost: new Decimal(98000),
            unlocked(){if (hasMilestone("c",3))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
        42: {
            title: "Closets 17",
            description: "^1.005 studs",
            cost: new Decimal(115000),
            unlocked(){if (hasUpgrade("c",41))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
        43: {
            title: "Closets 18",
            description: "x1.5 direct mult to gold for every closet upgrade.",
            cost: new Decimal(120000),
            unlocked(){if (hasUpgrade("c",42))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
            effect() {
                let thing = new Decimal(1.5)
                return new Decimal (thing.pow(player.c.upgrades.length))
            },
            effectDisplay() {return format (upgradeEffect(this.layer, this.id))+"x"}, // Add formatting to the effect
        },
        44: {
            title: "Closets 19",
            description: "WOW! x1.03 closets.",
            cost: new Decimal(121000),
            unlocked(){if (hasUpgrade("c",43))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
        45: {
            title: "Closets 20",
            description: "WOWZERS! x1.03 doors",
            cost: new Decimal(135000),
            unlocked(){if (hasUpgrade("c",44))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
    },
    branches: ["c","r"] +["c","k"]
})
addLayer("k", {
    name: "knobs", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "K", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    softcap : new Decimal("e2000"),
    softcapPower: new Decimal(0.01),
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
        if (hasUpgrade('k', 21)) mult = mult.times(upgradeEffect('k', 21))
        if (hasUpgrade('k', 22)) mult = mult.times(upgradeEffect('k', 22))
        if (hasUpgrade('k', 31)) mult = mult.times(upgradeEffect('k', 31))
        if (hasUpgrade('k', 32)) mult = mult.times(upgradeEffect('k', 32))
        if (hasUpgrade('d', 15)) mult = mult.times(upgradeEffect('d', 15))
        if (hasUpgrade('du', 14)) mult = mult.times(upgradeEffect('d', 14))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exponent = new Decimal(1)
        if (hasUpgrade('k', 32)) exponent = exponent.times(0.5)
        if (hasUpgrade('d', 35)) exponent = exponent.times(1.1)
        if (hasUpgrade('r', 24)) exponent = exponent.times(2)
        if (hasUpgrade('amb', 11)) exponent = exponent.times(1.02)
        if (hasUpgrade('amb', 15)) exponent = exponent.times(1.01)
        return exponent
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "k", description: "K: Reset for knobs", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        if (hasMilestone("du",4)) return 1;
      },
    resetsNothing() {return (hasAchievement('a',11))},
    tabFormat: {
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
        },
    },
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
            unlocked(){if (hasUpgrade("k",11))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player[this.layer].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
        13: {
            title: "Knobs 3",
            description: "x (ln(knobs+1)+1)*2 stud gain",
            cost: new Decimal(250),
            unlocked(){if (hasUpgrade("k",12))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player[this.layer].points.add(1).ln().add(1).mul(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Knobs 4",
            description: "x (doors+1) stud gain",
            cost: new Decimal(1e8),
            unlocked(){if (hasUpgrade("c",15))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player["d"].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Knobs 5",
            description: "Unlock more door upgrades and x log2(knobs+1)+1 stud gain",
            cost: new Decimal(1e9),
            unlocked(){if (hasUpgrade("k",14))
                {return true}
                    else if (hasMilestone('g',3))
                {return true}
                else if (hasAchievement('a',11))
                {return true}},
            effect() {
                return player["k"].points.add(1).log10().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Knobs 6",
            description: "xlog10(knobs+1)+1 knobs",
            cost: new Decimal(1e98),
            unlocked(){if (hasMilestone("f",2))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player[this.layer].points.add(1).log10().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Knobs 7",
            description: "Googol knobs! Anyway, (dupe+1)^3 knobs",
            cost: new Decimal(1e100),
            unlocked(){if (hasUpgrade("k",21))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["du"].points.add(1).pow(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Knobs 8",
            description: "x(log10(knobs+1)+1) gold gain!",
            cost: new Decimal(1e106),
            unlocked(){if (hasUpgrade("k",22))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player[this.layer].points.add(1).log10().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "Knobs 9",
            description: "^1.05 studs:D",
            cost: new Decimal(1e112),
            unlocked(){if (hasUpgrade("k",23))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        25: {
            title: "Knobs 10",
            description: "^1.05 studs AGAIN?????",
            cost: new Decimal(1e117),
            unlocked(){if (hasUpgrade("k",24))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        31: {
            title: "Knobs 11",
            description: "x(log10(knobs+1)+1)^3 knobs gain!",
            cost: new Decimal(1e125),
            unlocked(){if (hasUpgrade("k",25))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player[this.layer].points.add(1).log10().add(1).pow(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        32: {
            title: "Knobs 12",
            description: "A double-edged sword. x(rush+1)^5 knobs gain but ^0.5 knobs gain.",
            cost: new Decimal(1e132),
            unlocked(){if (hasUpgrade("k",31))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["r"].points.add(1).pow(5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        33: {
            title: "Knobs 13",
            description: "^1.1 rush",
            cost: new Decimal(1e154),
            unlocked(){if (hasUpgrade("k",32))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        34: {
            title: "Knobs 14",
            description: "(log2(rush+1)+1)^2 studs gain",
            cost: new Decimal(1e176),
            unlocked(){if (hasUpgrade("k",33))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["r"].points.add(1).log2().add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        35: {
            title: "Knobs 15",
            description: "*becomes pg132* Doors exponent is now 1.18 (check floors again)",
            cost: new Decimal(1e180),
            unlocked(){if (hasUpgrade("k",34))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
    },
    layerShown(){return true},
})
addLayer("r", {
    name: "rush", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#333333",
    requires(){ // Calculate the multiplier for main currency from bonuses
        let base = new Decimal(22)
        if (hasUpgrade('r', 34)) base = 15
        return base
    },
    resource: "rush", // Name of prestige currency
    baseResource: "closets", // Name of resource prestige is based on
    baseAmount() {return player["c"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('d', 21)) mult = mult.times(upgradeEffect('d', 21))
        if (hasUpgrade('d', 24)) mult = mult.times(upgradeEffect('d', 24))
        if (hasUpgrade('c', 14)) mult = mult.times(upgradeEffect('c', 14))
        if (hasUpgrade('c', 21)) mult = mult.times(upgradeEffect('c', 21))
        if (hasUpgrade('c', 24)) mult = mult.times(upgradeEffect('c', 24))
        if (hasUpgrade('du', 11)) mult = mult.times(upgradeEffect('du', 11))
        if (hasUpgrade('du', 15)) mult = mult.times(upgradeEffect('du', 15))
        if (hasMilestone('f', 3)) mult = mult.times(tmp['f'].milestones[3].effect)
        mult = mult.times(tmp["g"].effect)
        mult = mult.times(buyableEffect('r', 11))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exponent = new Decimal(1)
        if (hasUpgrade('k', 33)) exponent = exponent.times(1.1)
        if (hasUpgrade('f', 12)) exponent = exponent.times(1.1)
        if (hasUpgrade('amb', 12)) exponent = exponent.times(1.02)
        if (hasUpgrade('amb', 15)) exponent = exponent.times(1.01)
        if (hasMilestone('r', 5)) exponent = exponent.times(1.05)
        exponent = exponent.times(buyableEffect('c', 13))
        exponent = exponent.times(buyableEffect('d', 13))
        return exponent
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "R: Reset for rush", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    passiveGeneration() {
        if (player.r.points.gte(500)) return 1;
        else if (player.g.points.gte(2)) return 1;
      },
    layerShown(){return true},
    tabFormat: {
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Milestones": {
            content: ['main-display','prestige-button','milestones'],
        },
        "Challenges": {
            content: ['main-display','prestige-button','challenges'],
            unlocked(){return hasUpgrade("r",33)},
        },
        "Buyables": {
            content: ['main-display','prestige-button','buyables'],
            unlocked(){return hasMilestone("r",3)},
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal("2.22e2222").mul(new Decimal(2).pow((x).pow(2))) },
            title: "Rushed Rushes",
            display() {if (hasMilestone('r',4)) {return `x10 rush gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id))+'+' +format(getBuyableAmount(this.layer,12))+`
            <b>Effect:</b>` + format(this.effect()) + 'x'}
                else {return `x10 rush gain.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'}},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                let thing = new Decimal(10)
                return thing.pow(getBuyableAmount(this.layer,this.id).add(getBuyableAmount(this.layer,12)))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){if (hasMilestone("c",1))
            {return true}
            else if (hasAchievement('a',22))
            {return true}},
        },
        12: {
            cost(x) { return new Decimal("1e2270").mul(new Decimal(10).pow((x).pow(5))) },
            title: "Rush Power",
            display() { return `^1.005 studs.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                let thing = new Decimal(1.005)
                return thing.pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){if (hasMilestone("r",4))
            {return true}
            else if (hasAchievement('a',23))
            {return true}},
        },
        13: {
            cost(x) { return new Decimal("1e2450").mul(new Decimal(10).pow((x).pow(2))) },
            title: "Golden Rushes",
            display() { return `x3 gold.
            <b>Cost:</b>` + format(this.cost()) + `
            <b>Amount:</b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect:</b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                let thing = new Decimal(3)
                return thing.pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost())
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            unlocked(){if (hasMilestone("r",5))
            {return true}
            else if (hasAchievement('a',24))
            {return true}},
        },
    },
    milestones: {
        1: {
            requirementDescription: "Requires: 500 Rush",
            effectDescription: "Gain 100% of rush per second",
            done() { return player.r.points.gte(500) }
        },
        2: {
            requirementDescription: "Requires: 5e7 Rush",
            effectDescription: "Unlock a new layer. Some doors are not what they seem...",
            done() { return player.r.points.gte(5e7) }
        },
        3: {
            requirementDescription: "Requires: 2.22e2222 Rush",
            effectDescription: "Milestones 3-11 each unlock a buyable.",
            done() { return player.r.points.gte("2.22e2222") },
            unlocked(){if (hasUpgrade("g",32))
            {return true}
                else if (hasAchievement('a',23))
            {return true}},
        },
        4: {
            requirementDescription: "Requires: 1e2270 Rush",
            effectDescription: "x(ambush+1)^10 stud gain.",
            done() { return player.r.points.gte("1e2270") },
            unlocked(){if (hasMilestone("r",3))
            {return true}
                else if (hasAchievement('a',23))
            {return true}},
            effect() {
                return player["amb"].points.add(1).pow(10)
            },
        },
        5: {
            requirementDescription: "Requires: 1e2310 Rush",
            effectDescription: "^1.05 rush gain.",
            done() { return player.r.points.gte("1e2310") },
            unlocked(){if (hasMilestone("r",4))
            {return true}
                else if (hasAchievement('a',24))
            {return true}},
            effect() {
                return player["amb"].points.add(1).pow(10)
            },
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
            unlocked(){if (hasUpgrade("r",11))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["c"].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Rush 3",
            description: "Unlock a door and a closet upgrade",
            cost: new Decimal(5),
            unlocked(){if (hasUpgrade("r",12))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        14: {
            title: "Rush 4",
            description: "You can bulk buy closets",
            cost: new Decimal(1e5),
            unlocked(){if (hasUpgrade("r",13))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        15: {
            title: "Rush 5",
            description: "x(log10(rush+1)+1)^3 stud gain and unlock a closet upgrade",
            cost: new Decimal(2.5e10),
            unlocked(){if (hasMilestone("du",5))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["r"].points.add(1).log10().add(1).pow(3)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Rush 6",
            description: "^(log10(rush+1)+1)^0.03 Doors 3 upgrade effect",
            cost: new Decimal(1e78),
            unlocked(){if (hasUpgrade("f",11))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["r"].points.add(1).log10().add(1).pow(0.03)
            },
            effectDisplay() { return "^"+format(upgradeEffect(this.layer, this.id)) }, // Add formatting to the effect
        },
        22: {
            title: "Rush 7",
            description: "Door exponent is 1.15, each door boosts stud gain by 1.02x compounding",
            cost: new Decimal(1e80),
            unlocked(){if (hasUpgrade("r",21))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                let thing = new Decimal(1.02)
                if (hasUpgrade('r',25)) thing = thing.times(upgradeEffect('r',25))
                return thing.pow(player["d"].points)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        23: {
            title: "Rush 8",
            description: "Each closet boosts stud gain by 1.02x compounding",
            cost: new Decimal(1e98),
            unlocked(){if (hasUpgrade("r",22))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                let thing = new Decimal(1.02)
                if (hasUpgrade('r',25)) thing = thing.times(upgradeEffect('r',25))
                return thing.pow(player["c"].points)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        24: {
            title: "Rush 9",
            description: "UNDO KNOBS 12'S NEGATIVE EFFECT BY SQUARING KNOBS GAIN! ALSO GOOGOL RUSH (WARNING: REAL INFLATION)",
            cost: new Decimal(1e100),
            unlocked(){if (hasUpgrade("r",23))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        25: {
            title: "Rush 10",
            description: "^(log10(rush+1)+1)^.05 Rush 7 and Rush 8 effect (Knobs softcap warning) (WARNING: REALER INFLATION)",
            cost: new Decimal(1e200),
            unlocked(){if (hasUpgrade("r",24))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return (player[this.layer].points).add(1).log10().add(1).pow(0.05)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        31: {
            title: "Rush 11",
            description: "Ok fine no more inflation (hopefully). A simple x1e20 stud gain.",
            cost: new Decimal(1e227),
            unlocked(){if (hasUpgrade("r",25))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        32: {
            title: "Rush 12",
            description: "^1.15 gold (not only studs/knobs/rush) (slight inflation)",
            cost: new Decimal(1e232),
            unlocked(){if (hasUpgrade("r",31))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        33: {
            title: "Rush 13",
            description: "UNLOCK A CHALLENGE (new feature)",
            cost: new Decimal(1e263),
            unlocked(){if (hasUpgrade("r",32))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        34: {
            title: "Rush 14",
            description: "Rush base is now 15",
            cost: new Decimal(1e266),
            unlocked(){if (hasUpgrade("r",33))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        35: {
            title: "Rush 15",
            description: "pg132 upgrade again -> 1.13 door exponent (real) also new dupe upgrades...",
            cost: new Decimal(1e269),
            unlocked(){if (hasUpgrade("r",34))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
    },
    challenges: {
        11: {
            name: "RUSHED",
            challengeDescription: "^0.5 stud gain",
            rewardDescription: "^1.05 stud gain",
            goalDescription: "1e1650 studs",
            canComplete: function() {return player.points.gte("1e1650")},
            unlocked(){return hasUpgrade("r",33)},
        },
    },
    branches: ["r","amb"]
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
    layerShown() {if (hasMilestone ('r',2))
    {return true}
                else if (hasMilestone ('g',3))
    {return true}
    else if (hasAchievement ('a',11))
    {return true}},
    canBuyMax() {if (hasMilestone ('du',4))
    {return true}
    else if (hasMilestone ('g',4))
    {return true}
    else if (hasMilestone ('amb',1))
    {return true}},
    resetsNothing() {if (hasMilestone ('g',5))
    {return true}
    else if (hasMilestone ('amb',3))
    {return true}},
    tabFormat: {
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Milestones": {
            content: ['main-display','prestige-button','milestones'],
        },
    },
    milestones: {
        1: {
            requirementDescription: "Requires: 1 Dupe",
            effectDescription: "x100 studs and you can bulk buy doors",
            done() { return player.du.points.gte(1) }
        },
        2: {
            requirementDescription: "Requires: 2 Dupes",
            effectDescription: "Autobuy closets",
            done() { return player.du.points.gte(2) },
        },
        3: {
            requirementDescription: "Requires: 3 Dupes",
            effectDescription: "Closets reset nothing!",
            done() { return player.du.points.gte(3) },
        },
        4: {
            requirementDescription: "Requires: 5 Dupes",
            effectDescription: "Unlocks Dupe upgrades, gain 100% of knobs per second, you can bulk buy dupes",
            done() { return player.du.points.gte(5) },
        },
        5: {
            requirementDescription: "Requires: 16 Dupes",
            effectDescription: "Unlock a rush upgrade",
            done() { return player.du.points.gte(16) },
        },
    },
    upgrades: {
        11: {
            title: "Dupe 1",
            description: "x (dupe+1)^0.5 rush gain",
            cost: new Decimal(5),
            unlocked(){if (hasMilestone('du',4))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["du"].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Dupe 2",
            description: "x (dupe+1)^2 stud gain",
            cost: new Decimal(6),
            unlocked(){if (hasUpgrade("du",11))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["du"].points.add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
            title: "Dupe 3",
            description: "x (log10(doors+1)+1)^5 stud gain",
            cost: new Decimal(7),
            unlocked(){if (hasUpgrade("du",12))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["d"].points.add(1).log10().add(1).pow(5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
            title: "Dupe 4",
            description: "x log2(knobs+1)+1 stud and knob gain",
            cost: new Decimal(11),
            unlocked(){if (hasUpgrade("du",13))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["k"].points.add(1).log2().add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
            title: "Dupe 5",
            description: "x(dupe+1) studs and rush",
            cost: new Decimal(14),
            unlocked(){if (hasUpgrade("du",14))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["du"].points.add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
            title: "Dupe 6",
            description: "x(dupe+1)^10 stud gain",
            cost: new Decimal(241),
            unlocked(){if (hasUpgrade("r",35))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["du"].points.add(1).pow(10)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        22: {
            title: "Dupe 7",
            description: "^1.03 stud gain",
            cost: new Decimal(242),
            unlocked(){if (hasUpgrade("du",21))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        23: {
            title: "Dupe 8",
            description: "^1.03 stud gain.",
            cost: new Decimal(246),
            unlocked(){if (hasUpgrade("du",22))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        24: {
            title: "Dupe 9",
            description: "^1.03 stud gain...",
            cost: new Decimal(250),
            unlocked(){if (hasUpgrade("du",23))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        25: {
            title: "Dupe 10",
            description: "Unlock a new layer",
            cost: new Decimal(255),
            unlocked(){if (hasUpgrade("du",24))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
    },
})
addLayer("f", {
    name: "floors", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "🚪🚪", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#555555",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "floors", // Name of prestige currency
    baseResource: "doors", // Name of resource prestige is based on
    baseAmount() {return player["d"].points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() { // Calculate the multiplier for main currency from bonuses
        let exponent = new Decimal(0.7)
        if (hasMilestone('c', 4)) exponent = 0.5
        else if (hasUpgrade('c', 41)) exponent = 0.55
        else if (hasUpgrade('d', 51)) exponent = 0.6
        return exponent
    },
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    resetsNothing() {if (hasUpgrade ('g',15))
    {return true}
    else if (hasMilestone ('amb',3))
    {return true}},
    hotkeys: [
        {key: "f", description: "F: Reset for floors", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (hasUpgrade ('c',25))
                {return true}
                else if (hasMilestone ('f',1))
                {return true}
                else if (hasAchievement ('a',11))
    {return true}},
    tabFormat: {
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Milestones": {
            content: ['main-display','prestige-button','milestones'],
        },
    },
    milestones: {
        1: {
            requirementDescription: "Requires: 1 Floor",
            effectDescription: "x100 studs, you can autobuy doors, and unlock a new layer that resets everything before it",
            done() { return player.f.points.gte(1) }
        },
        2: {
            requirementDescription: "Requires: 2 Floors",
            effectDescription: "x(floors+1)^^2 gold gain (OMG TETRATION), also add more knob upgrades",
            done() { return player.f.points.gte(2) },
            effect() {
                return player[this.layer].points.add(1).tetrate(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        3: {
            requirementDescription: "Requires: 3 Floors",
            effectDescription: "x(floors+1)^^2 rush gain (TETRATION 2) more door upgrades",
            done() { return player.f.points.gte(3) },
            effect() {
                return player[this.layer].points.add(1).tetrate(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        4: {
            requirementDescription: "Requires: 4 Floors",
            effectDescription: "x(floors+1)^^2 stud gain (TETRATION 3) more closet upgrades",
            done() { return player.f.points.gte(4) },
            effect() {
                return player[this.layer].points.add(1).tetrate(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
    },
    upgrades: {
        11: {
            title: "Floors 1",
            description: "^1.05 studs, door exponent is 1.16 <- PG132 AGAIN, new rush upgrades",
            cost: new Decimal(5),
            unlocked(){if (hasUpgrade("c",35))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        12: {
            title: "Floors 2",
            description: "^1.1 rush",
            cost: new Decimal(6),
            unlocked(){if (hasUpgrade("f",11))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        13: {
            title: "Floors 3",
            description: "^1.05 studs (yay filler exponent upgrade)",
            cost: new Decimal(8),
            unlocked(){if (hasUpgrade("f",12))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        14: {
            title: "Floors 4",
            description: "Doors exponent is now 1.14...",
            cost: new Decimal(13),
            unlocked(){if (hasUpgrade("f",13))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        15: {
            title: "Floors 5",
            description: "x10^floors stud gain",
            cost: new Decimal(15),
            unlocked(){if (hasUpgrade("f",14))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect(){
                let thing = new Decimal(10)
                return thing.pow(player[this.layer].points)},
            effectDisplay() {return format (upgradeEffect(this.layer, this.id))+"x"}, // Add formatting to the effect
        },
        21: {
            title: "Floors 6",
            description: "x(floors+1) ambush gain. Also closet milestones (yay)",
            cost: new Decimal(41),
            unlocked(){if (hasUpgrade("d",55))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
            effect(){
                return player[this.layer].points.add(1)},
            effectDisplay() {return format (upgradeEffect(this.layer, this.id))+"x"}, // Add formatting to the effect
        },
        22: {
            title: "Floors 7",
            description: "More door content! Yay!",
            cost: new Decimal(133),
            unlocked(){if (hasUpgrade("g",25))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
    },
    branches: ["d","f"]
})
addLayer("g", {
    name: "gold", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#FFEE80",
    requires: new Decimal(1e45), // Can be a function that takes requirement increases into account
    resource: "gold", // Name of prestige currency
    baseResource: "knobs", // Name of resource prestige is based on
    baseAmount() {return player["k"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.05, // Prestige currency exponent
    softcap : new Decimal(1e200),
    softcapPower: new Decimal(0.01),
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('g', 11)) mult = mult.times(upgradeEffect('g', 11))
        if (hasUpgrade('d', 22)) mult = mult.times(upgradeEffect('d', 22))
        if (hasUpgrade('d', 25)) mult = mult.times(upgradeEffect('d', 25))
        if (hasUpgrade('k', 23)) mult = mult.times(upgradeEffect('k', 23))
        if (hasMilestone('f', 2)) mult = mult.times(tmp['f'].milestones[2].effect)
        return mult
    },
    directMult() { // Calculate the direct mult after softcap
        let dmult = new Decimal(1)
        if (hasUpgrade('c', 43)) dmult = dmult.times(upgradeEffect('c', 43))
        dmult = dmult.times(buyableEffect('c', 22))
        dmult = dmult.times(buyableEffect('r', 13))
        if (hasUpgrade('g', 22)) dmult = dmult.times(upgradeEffect('g', 22))
        if (hasUpgrade('g', 33)) dmult = dmult.times(upgradeEffect('g', 33))
        return dmult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exponent = new Decimal(1)
        if (hasUpgrade('r', 32)) exponent = exponent.times(1.15)
        if (hasUpgrade('amb', 13)) exponent = exponent.times(1.02)
        if (hasUpgrade('amb', 15)) exponent = exponent.times(1.01)
        return exponent
    },
    effect() {
        return player[this.layer].points.add(1)
    },
    effectDescription() { return 'multiplying rush gain by ' + format(tmp['g'].effect)},
    passiveGeneration() {if (hasUpgrade('c',32)) return 1},
    resetsNothing() {return (hasMilestone('amb',1))},
    tabFormat: {
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Milestones": {
            content: ['main-display','prestige-button','milestones'],
        },
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    displayRow: 0, //changes which row the layer appears on
    hotkeys: [
        {key: "g", description: "G: Reset for gold", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (hasMilestone ('f',1))
                {return true}
                else if (hasMilestone ('g',1))
                {return true}
                else if (hasAchievement ('a',11))
                {return true}},
    milestones: {
        1: {
            requirementDescription: "Requires: 1 gold",
            effectDescription: "x100 studs, doors reset nothing",
            done() { return player.g.points.gte(1) }
        },
        2: {
            requirementDescription: "Requires: 2 gold",
            effectDescription: "Keep the effect of Rush Milestone 1",
            done() { return player.g.points.gte(2) },
        },
        3: {
            requirementDescription: "Requires: 3 gold",
            effectDescription: "Keep Dupe layer and all row 1 pre-gold upgrades unlocked, keep door automation",
            done() { return player.g.points.gte(3) }
        },
        4: {
            requirementDescription: "Requires: 4 gold",
            effectDescription: "Keep the ability to bulk buy Dupes and Closets",
            done() { return player.g.points.gte(4) }
        },
        5: {
            requirementDescription: "Requires: 5 gold",
            effectDescription: "Unlock gold upgrades, dupe resets nothing.",
            done() { return player.g.points.gte(5) }
        },
    },
    upgrades: {
        11: {
            title: "Gold 1",
            description: "x (log10(rush+1)+1)^2 stud and gold gain",
            cost: new Decimal(5),
            unlocked(){if (hasMilestone("g",5))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["r"].points.add(1).log10().add(1).pow(2)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
            title: "Gold 2",
            description: "^1.05 studs (FIRST EXPONENTIAL UPGRADE)",
            cost: new Decimal(1e3),
            unlocked(){if (hasUpgrade("g",11))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        13: {
            title: "Gold 3",
            description: "^1.05 studs again",
            cost: new Decimal(1e3),
            unlocked(){if (hasUpgrade("g",12))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        14: {
            title: "Gold 4",
            description: "^1.05 studs yet again...",
            cost: new Decimal(1e3),
            unlocked(){if (hasUpgrade("g",13))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
        },
        15: {
            title: "Gold 5",
            description: "^(log10(log10(gold+1)+1)+1)^0.3 studs (ok this is the last one for a while) also unlock more door upgrades, floors reset nothing",
            cost: new Decimal(1e3),
            unlocked(){if (hasUpgrade("g",14))
            {return true}
                else if (hasAchievement('a',11))
            {return true}},
            effect() {
                return player["g"].points.add(1).log10().add(1).log10().add(1).pow(0.3)
            },
            effectDisplay() {return "^"+format (upgradeEffect(this.layer, this.id))}, // Add formatting to the effect
        },
        21: {
            title: "Gold 6",
            description: "Time for generic stud boost upgrades. x(gold+1) stud gain",
            cost: new Decimal(1e212),
            unlocked(){if (hasMilestone("c",5))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
            effect() {
                return player[this.layer].points.add(1)
            },
            effectDisplay() {return format (upgradeEffect(this.layer, this.id)) +"x"}, // Add formatting to the effect
        },
        22: {
            title: "Gold 7",
            description: "x10 gold direct mult per gold upgrade.",
            cost: new Decimal(1e213),
            unlocked(){if (hasUpgrade("g",21))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
            effect() {
                let thing = new Decimal(10)
                return thing.pow(player[this.layer].upgrades.length)
            },
            effectDisplay() {return format (upgradeEffect(this.layer, this.id)) +"x"}, // Add formatting to the effect
        },
        23: {
            title: "Gold 8",
            description: "more generic stud upgrade. x1e20 stud gain per gold upgrade",
            cost: new Decimal(1e220),
            unlocked(){if (hasUpgrade("g",22))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
            effect() {
                let thing = new Decimal(1e20)
                return thing.pow(player[this.layer].upgrades.length)
            },
            effectDisplay() {return format (upgradeEffect(this.layer, this.id)) +"x"}, // Add formatting to the effect
        },
        24: {
            title: "Gold 9",
            description: "even more generic stud upgrade. x(doors+1)^100 stud gain.",
            cost: new Decimal(1e222),
            unlocked(){if (hasUpgrade("g",23))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
            effect() {
                return player["d"].points.add(1).pow(100)
            },
            effectDisplay() {return format (upgradeEffect(this.layer, this.id)) +"x"}, // Add formatting to the effect
        },
        25: {
            title: "Gold 10",
            description: "x1.03 closet gain! Wowzerszers!",
            cost: new Decimal(1e224),
            unlocked(){if (hasUpgrade("g",24))
            {return true}
                else if (hasAchievement('a',22))
            {return true}},
        },
        31: {
            title: "Gold 11",
            description: "Time for more generic stud boost upgrades. x(gold+1)^3 stud gain",
            cost: new Decimal(1e256),
            unlocked(){if (hasMilestone("c",6))
            {return true}
                else if (hasAchievement('a',23))
            {return true}},
            effect() {
                return player[this.layer].points.add(1).pow(3)
            },
            effectDisplay() {return format (upgradeEffect(this.layer, this.id)) +"x"}, // Add formatting to the effect
        },
        32: {
            title: "Gold 12",
            description: "^1.02 studs and unlock more rush milestones",
            cost: new Decimal(1e262),
            unlocked(){if (hasUpgrade('g',31))
            {return true}
                else if (hasAchievement('a',23))
            {return true}},
        },
        33: {
            title: "Gold 13",
            description: "x(rush milestones+1)^^2 gold gain (EVEN MORE TETRATION!!!)",
            cost: new Decimal(1e274),
            unlocked(){if (hasUpgrade('g',32))
            {return true}
                else if (hasAchievement('a',23))
            {return true}},
            effect() {
                return new Decimal(player.r.milestones.length).add(1).tetrate(2)
            },
        },
        34: {
            title: "Gold 14",
            description: "^(gold upgrades/1000+1) stud gain",
            cost: new Decimal(1e281),
            unlocked(){if (hasUpgrade('g',33))
            {return true}
                else if (hasAchievement('a',23))
            {return true}},
            effect() {
                return (new Decimal(player[this.layer].upgrades.length)).div(1000).add(1)
            },
        },
        35: {
            title: "Gold 15",
            description: "More closet content. (wip) Thanks for playing! (for now)",
            cost: new Decimal(1e284),
            unlocked(){if (hasUpgrade('g',34))
            {return true}
                else if (hasAchievement('a',23))
            {return true}},
            effect() {
                return (new Decimal(player[this.layer].upgrades.length)).div(1000).add(1)
            },
        },
    },
    branches: ["k","g"]
})
addLayer("amb", {
    name: "ambush", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#AAFFAA",
    requires: new Decimal(1e285), // Can be a function that takes requirement increases into account
    resource: "ambush", // Name of prestige currency
    baseResource: "rush", // Name of resource prestige is based on
    baseAmount() {return player["r"].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.01, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('d', 52)) mult = mult.times(upgradeEffect('d', 52))
        if (hasUpgrade('f', 21)) mult = mult.times(upgradeEffect('f', 21))
        if (hasMilestone('c', 2)) mult = mult.times(10)
        mult = mult.times(buyableEffect('c', 11))
        mult = mult.times(buyableEffect('d', 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exponent = new Decimal(1)
        return exponent
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    displayRow: 2, //changes which row the layer appears on
    hotkeys: [
        {key: "a", description: "A: Reset for ambush", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){if (hasUpgrade ('du',25))
                {return true}
                else if (hasAchievement ('a',11))
    {return true}},
    passiveGeneration() {
        if (hasUpgrade("d",43)) return 0.1;
      },
    tabFormat: {
        "Upgrades": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Milestones": {
            content: ['main-display','prestige-button','milestones'],
        },
        "Challenges": {
            content: ['main-display','prestige-button','challenges'],
            unlocked(){return hasAchievement("a",23)},
        },
    },
    milestones: {
        1: {
            requirementDescription: "Requires: 1 Total Ambush",
            effectDescription: "Unlock achievements, keep bulk buy of dupes, unlock ambush upgrades, gold resets nothing",
            done() { return player.amb.total.gte(1) }
        },
        2: {
            requirementDescription: "Requires: 2 Total Ambush",
            effectDescription: "x((ambush milestones+1)^1.5)^^2 stud gain",
            done() { return player.amb.total.gte(2) },
            effect() {
                return new Decimal(player.amb.milestones.length).add(1).pow(1.5).tetrate(2)
            },
        },
        3: {
            requirementDescription: "Requires: 3 Total Ambush",
            effectDescription: "Dupe and Floors reset nothing (WARNING: ^0.01 gold softcap at e200)",
            done() { return player.amb.total.gte(3) },
        },
        4: {
            requirementDescription: "Requires: 6 Total Ambush",
            effectDescription: "Unlock new door upgrades.",
            done() { return player.amb.total.gte(6) },
        },
    },
    challenges: {
        11: {
            name: "'nostalgia'",
            challengeDescription: "^0.1 stud gain",
            rewardDescription: "^1.02 stud gain",
            goalDescription: "1,000 studs",
            canComplete: function() {return player.points.gte(1000)},
            unlocked(){return hasAchievement("a",23)},
        },
    },
    upgrades: {
        11: {
            title: "Ambush 1",
            description: "^1.02 studs and knobs",
            cost: new Decimal(1),
            unlocked(){return hasMilestone("amb",1)},
        },
        12: {
            title: "Ambush 2",
            description: "^1.02 studs and rush",
            cost: new Decimal(1),
            unlocked(){return hasMilestone("amb",1)},
        },
        13: {
            title: "Ambush 3",
            description: "^1.02 studs and gold",
            cost: new Decimal(1),
            unlocked(){return hasMilestone("amb",1)},
        },
        14: {
            title: "Ambush 4",
            description: "^1.04 studs",
            cost: new Decimal(1),
            unlocked(){return hasMilestone("amb",1)},
        },
        15: {
            title: "Ambush 5",
            description: "^1.01 studs and all normal layers before ambush",
            cost: new Decimal(1),
            unlocked(){return hasMilestone("amb",1)},
        },
    },
})