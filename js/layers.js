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
        if (hasUpgrade('S',41)) player[this.layer].number = "0.425"
        if (hasUpgrade('S',42)) player[this.layer].number = "0.5"
        if (hasUpgrade('S',43)) player[this.layer].number = "0.8"
        if (hasUpgrade('S',44)) player[this.layer].number = "1"
        if (hasUpgrade('S',45)) player[this.layer].number = "1.30"
        if (hasUpgrade('S',51)) player[this.layer].number = "1.4"
        if (hasUpgrade('S',52)) player[this.layer].number = "1.61"
        if (hasUpgrade('S',53)) player[this.layer].number = "2"
        if (hasUpgrade('S',54)) player[this.layer].number = "2.58"
        if (hasUpgrade('S',55)) player[this.layer].number = "2.71"
        if (hasUpgrade('S',61)) player[this.layer].number = "3"
        if (hasUpgrade('S',62)) player[this.layer].number = "3.14"
        if (hasUpgrade('S',63)) player[this.layer].number = "4"
        if (hasUpgrade('S',64)) player[this.layer].number = "4.96"
        if (hasUpgrade('S',65)) player[this.layer].number = "5"
        if (hasUpgrade('S',71)) player[this.layer].number = "5.92"
        if (hasUpgrade('S',72)) player[this.layer].number = "6"
        if (hasUpgrade('S',73)) player[this.layer].number = "6.28"
        if (hasUpgrade('S',74)) player[this.layer].number = "7"
        if (hasUpgrade('S',75)) player[this.layer].number = "8"
        if (hasUpgrade('S',81)) player[this.layer].number = "9"
        if (hasUpgrade('S',82)) player[this.layer].number = "10"
        if (hasUpgrade('+',11)) player[this.layer].number = "11"
        if (hasUpgrade('S',83)) player[this.layer].number = "12"
        if (hasUpgrade('S',84)) player[this.layer].number = "13"
        if (hasUpgrade('S',85)) player[this.layer].number = "14"
        if (hasUpgrade('+',12)) player[this.layer].number = "16"
        if (hasUpgrade('+',13)) player[this.layer].number = "17"
        if (hasUpgrade('+',14)) player[this.layer].number = "18"
        if (hasUpgrade('+',15)) player[this.layer].number = "20"
        if (hasUpgrade('+',21)) player[this.layer].number = "21"
        if (hasUpgrade('+',22)) player[this.layer].number = "22"
        if (hasUpgrade('+',23)) player[this.layer].number = "23"
        if (hasUpgrade('+',24)) player[this.layer].number = "23.6"
        if (hasUpgrade('+',25)) player[this.layer].number = "24"
        if (hasUpgrade('-',11)) player[this.layer].number = "25"
        if (hasUpgrade('-',12)) player[this.layer].number = "27"
        if (hasUpgrade('-',13)) player[this.layer].number = "30"
        if (hasUpgrade('+',31)) player[this.layer].number = "32"
        if (hasUpgrade('-',14)) player[this.layer].number = "36"
        if (hasUpgrade('+',32)) player[this.layer].number = "42"
        if (hasUpgrade('-',15)) player[this.layer].number = "48"
        if (hasUpgrade('-',21)) player[this.layer].number = "49"
        if (hasUpgrade('-',22)) player[this.layer].number = "54"
        if (hasUpgrade('+',33)) player[this.layer].number = "55"
        if (hasUpgrade('-',23)) player[this.layer].number = "60"
        if (hasUpgrade('+',34)) player[this.layer].number = "61"
        if (hasUpgrade('-',24)) player[this.layer].number = "64"
        if (hasUpgrade('+',35)) player[this.layer].number = "66"
        if (hasUpgrade('-',25)) player[this.layer].number = "80"
        if (hasUpgrade('+',41)) player[this.layer].number = "81"
        if (hasUpgrade('-',31)) player[this.layer].number = "85"
        if (hasUpgrade('-',32)) player[this.layer].number = "100"
        if (hasUpgrade('x',11)) player[this.layer].number = "110"
        if (hasUpgrade('S',91)) player[this.layer].number = "111"
        if (hasUpgrade('S',92)) player[this.layer].number = "120"
        if (hasUpgrade('+',42)) player[this.layer].number = "128"
        if (hasUpgrade('S',93)) player[this.layer].number = "130"
        if (hasUpgrade('x',12)) player[this.layer].number = "140"
        if (hasUpgrade('x',13)) player[this.layer].number = "144"
        if (hasUpgrade('S',94)) player[this.layer].number = "162"
        if (hasUpgrade('x',14)) player[this.layer].number = "169"
        if (hasUpgrade('+',43)) player[this.layer].number = "180"
        if (hasUpgrade('x',15)) player[this.layer].number = "196"
        if (hasUpgrade('S',95)) player[this.layer].number = "210"
        if (hasUpgrade('x',21)) player[this.layer].number = "216"
        if (hasUpgrade('+',44)) player[this.layer].number = "222"
        if (hasUpgrade('x',22)) player[this.layer].number = "223"
        if (hasUpgrade('S',101)) player[this.layer].number = "243"
        if (hasUpgrade('x',23)) player[this.layer].number = "256"
        if (hasUpgrade('x',24)) player[this.layer].number = "289"
        if (hasUpgrade('x',25)) player[this.layer].number = "314"
        if (hasUpgrade('x',31)) player[this.layer].number = "320"
        if (hasUpgrade('S',102)) player[this.layer].number = "321"
        if (hasUpgrade('+',45)) player[this.layer].number = "333"
        if (hasUpgrade('x',32)) player[this.layer].number = "341"
        if (hasUpgrade('x',33)) player[this.layer].number = "360"
        if (hasUpgrade('S',103)) player[this.layer].number = "400"
        if (hasUpgrade('x',34)) player[this.layer].number = "405"
        if (hasUpgrade('x',35)) player[this.layer].number = "435"
        if (hasUpgrade('-',33)) player[this.layer].number = "480"
        if (hasUpgrade('S',104)) player[this.layer].number = "486"
        if (hasUpgrade('-',34)) player[this.layer].number = "500"
        if (hasUpgrade('S',105)) player[this.layer].number = "512"
        if (hasUpgrade('-',35)) player[this.layer].number = "517"
        if (hasUpgrade('x',41)) player[this.layer].number = "523"
        if (hasUpgrade('x',42)) player[this.layer].number = "543"
        if (hasUpgrade('x',43)) player[this.layer].number = "589"
        if (hasUpgrade('x',44)) player[this.layer].number = "616"
        if (hasUpgrade('x',45)) player[this.layer].number = "625"
        if (hasUpgrade('x',51)) player[this.layer].number = "634"
        if (hasUpgrade('x',52)) player[this.layer].number = "648"
        if (hasUpgrade('÷',11)) player[this.layer].number = "666"
        if (hasUpgrade('x',53)) player[this.layer].number = "753"
        if (hasUpgrade('x',54)) player[this.layer].number = "777"
        if (hasUpgrade('x',55)) player[this.layer].number = "847"
        if (hasUpgrade('x',61)) player[this.layer].number = "1,000"
        if (hasUpgrade('x',62)) player[this.layer].number = "1,001"
        if (hasUpgrade('÷',12)) player[this.layer].number = "1,011"
        if (hasUpgrade('÷',13)) player[this.layer].number = "1,012"
        if (hasUpgrade('n',11)) player[this.layer].number = "1,014"
        if (hasUpgrade('n',12)) player[this.layer].number = "1,024"
        if (hasUpgrade('n',13)) player[this.layer].number = "1,075"
        if (hasUpgrade('n',14)) player[this.layer].number = "1,089"
        if (hasUpgrade('n',15)) player[this.layer].number = "1,200"
        if (hasUpgrade('n',21)) player[this.layer].number = "1,225"
        if (hasUpgrade('n',22)) player[this.layer].number = "1,296"
        if (hasUpgrade('n',23)) player[this.layer].number = "1,365"
        if (hasUpgrade('n',24)) player[this.layer].number = "1,385"
        if (hasUpgrade('n',25)) player[this.layer].number = "1,458"
        if (hasUpgrade('n',31)) player[this.layer].number = "1,600"
        if (hasUpgrade('n',32)) player[this.layer].number = "1,609"
        if (hasUpgrade('n',33)) player[this.layer].number = "1,728"
        if (hasUpgrade('n',34)) player[this.layer].number = "1,729"
        if (hasUpgrade('n',35)) player[this.layer].number = "2,000"
        if (hasUpgrade('n',41)) player[this.layer].number = "2,020"
        if (hasUpgrade('n',42)) player[this.layer].number = "2,023"
        if (hasUpgrade('n',43)) player[this.layer].number = "2,048"
        if (hasUpgrade('n',44)) player[this.layer].number = "2,187"
        if (hasUpgrade('n',45)) player[this.layer].number = "2,197"
        if (hasUpgrade('n',51)) player[this.layer].number = "2,304"
        if (hasUpgrade('n',52)) player[this.layer].number = "2,310"
        if (hasUpgrade('n',53)) player[this.layer].number = "2,744"
        if (hasUpgrade('n',54)) player[this.layer].number = "3,125"
        if (hasUpgrade('n',55)) player[this.layer].number = "3,142"
        if (hasUpgrade('n',61)) player[this.layer].number = "3,210"
        if (hasUpgrade('n',62)) player[this.layer].number = "3,465"
        if (hasUpgrade('n',63)) player[this.layer].number = "3,520"
        if (hasUpgrade('n',64)) player[this.layer].number = "3,600"
        if (hasUpgrade('n',65)) player[this.layer].number = "4,098"
        if (hasUpgrade('n',71)) player[this.layer].number = "4,181"
        if (hasUpgrade('n',72)) player[this.layer].number = "4,356"
        if (hasUpgrade('n',73)) player[this.layer].number = "4,422"
        if (hasUpgrade('n',74)) player[this.layer].number = "4,477"
        if (hasUpgrade('n',75)) player[this.layer].number = "4,913"
        if (hasUpgrade('n',81)) player[this.layer].number = "5,000"
        if (hasUpgrade('n',82)) player[this.layer].number = "5,053"
        if (hasUpgrade('n',83)) player[this.layer].number = "5,512"
        if (hasUpgrade('n',84)) player[this.layer].number = "5,314"
        if (hasUpgrade('n',85)) player[this.layer].number = "5,346"
        if (hasUpgrade('n',91)) player[this.layer].number = "5,461"
        if (hasUpgrade('n',92)) player[this.layer].number = "6,174"
        if (hasUpgrade('n',93)) player[this.layer].number = "6,400"
        if (hasUpgrade('n',94)) player[this.layer].number = "6,561"
        if (hasUpgrade('n',95)) player[this.layer].number = "6,666"
        if (hasUpgrade('n',101)) player[this.layer].number = "6,765"
        if (hasUpgrade('n',102)) player[this.layer].number = "7,000"
        if (hasUpgrade('n',103)) player[this.layer].number = "7,577"
        if (hasUpgrade('n',104)) player[this.layer].number = "7,722"
        if (hasUpgrade('n',105)) player[this.layer].number = "7,744"
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
        if (hasUpgrade('+', 13)) mult = mult.times(upgradeEffect('+', 13))
        if (hasUpgrade('+', 15)) mult = mult.times(upgradeEffect('+', 15))
        if (hasUpgrade('+', 21)) mult = mult.times(1.75)
        if (hasUpgrade('+', 22)) mult = mult.times(1.8)
        if (hasUpgrade('+', 23)) mult = mult.times(1.85)
        if (hasUpgrade('+', 24)) mult = mult.times(1.8)
        if (hasUpgrade('+', 25)) mult = mult.times(1.75)
        if (hasUpgrade('+', 31)) mult = mult.times(1.8)
        if (hasUpgrade('+', 32)) mult = mult.times(1.75)
        if (hasUpgrade('+', 33)) mult = mult.times(1.8)
        if (hasUpgrade('+', 34)) mult = mult.times(1.85)
        if (hasUpgrade('+', 35)) mult = mult.times(1.9)
        if (hasUpgrade('+', 41)) mult = mult.times(1.85)
        mult = mult.times(buyableEffect('+', 11))
        if (hasUpgrade('x', 11)) mult = mult.times(3)
        if (hasUpgrade('S', 91)) mult = mult.times(3)
        if (hasUpgrade('S', 92)) mult = mult.times(3)
        if (hasUpgrade('S', 93)) mult = mult.times(3)
        if (hasUpgrade('S', 94)) mult = mult.times(3)
        if (hasUpgrade('S', 95)) mult = mult.times(3)
        if (hasUpgrade('S', 101)) mult = mult.times(3)
        if (hasUpgrade('S', 102)) mult = mult.times(3)
        if (hasUpgrade('S', 103)) mult = mult.times(3)
        if (hasUpgrade('S', 104)) mult = mult.times(3)
        if (hasUpgrade('S', 105)) mult = mult.times(3)
        mult = mult.times(tmp['÷'].effect)
        if (hasUpgrade('-', 35)) mult = mult.times(32)
        if (hasUpgrade('x', 41)) mult = mult.times(2.71828)
        if (hasUpgrade('x', 42)) mult = mult.times(4)
        if (hasUpgrade('x', 43)) mult = mult.times(4)
        if (hasUpgrade('x', 44)) mult = mult.times(4)
        if (hasUpgrade('x', 45)) mult = mult.times(10)
        if (hasUpgrade('x', 51)) mult = mult.times(5)
        if (hasUpgrade('x', 52)) mult = mult.times(5)
        if (hasUpgrade('÷', 11)) mult = mult.times(300000)
        if (hasUpgrade('x', 61)) mult = mult.times(10)
        if (hasUpgrade('x', 62)) mult = mult.times(6.001)
        if (hasUpgrade('÷', 12)) mult = mult.times(750000)
        if (hasUpgrade('÷', 13)) mult = mult.times(980000)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    hotkeys: [
        {key: "s", description: "s: succession reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        return (hasUpgrade('S',45)) || (hasUpgrade('-',11) || (hasUpgrade('x',13)))
    },
    autoUpgrade() {return false},
    automate() {
        if (hasMilestone("-", 1) || hasUpgrade('x',21)) {
            for (let i = 1; i < 6; i++) {
                buyUpgrade('S',i+10)
                buyUpgrade('S',i+20)
                buyUpgrade('S',i+30)
                buyUpgrade('S',i+40)
                buyUpgrade('S',i+50)
                buyUpgrade('S',i+60)
                buyUpgrade('S',i+70)
                buyUpgrade('S',i+80)
                if (hasUpgrade('x',41)) {buyUpgrade('S',i+90)}
                if (hasUpgrade('x',41)) {buyUpgrade('S',i+100)}
            }
        }
        if (hasUpgrade("-", 12) || hasUpgrade('x',22)) {
            buyBuyable('S',11)
        }
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
        description: "Succession points boost googology points gain.",
        cost: new Decimal(1),
        effect() {
            return player[this.layer].points.add(1).pow(0.5).div(player[this.layer].points.add(1).pow(0.5).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
        title: "Infinitesimal",
        description: "Succession points boost googology points gain again.",
        cost: new Decimal(3),
        effect() {
            return player[this.layer].points.add(1).pow(0.25).div(player[this.layer].points.add(1).pow(0.25).max(1000).div(1000).pow(0.9)).min(1000000)
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
        description: "Googology points boost their own gain.",
        cost: new Decimal(4000),
        effect() {
            return player.points.add(1).pow(0.15).div(player.points.add(1).pow(0.15).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        45: {
        title: "Mills' Constant",
        description: "Googology points boost their own gain again, and gain 100% of succession points per second.",
        cost: new Decimal(7500),
        effect() {
            return player.points.add(1).pow(0.1).div(player.points.add(1).pow(0.1).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        51: {
        title: "Yiutu",
        description: "First softcap, eh? x2.5 googology point gain.",
        cost: new Decimal(1500000),
        unlocked(){return (hasUpgrade("S",44))}
        },
        52: {
        title: "Golden Ratio",
        description: "Another x2.5 googology point gain. Ykw, we might need a buyable to repeat that!",
        cost: new Decimal(5000000),
        unlocked(){return (hasUpgrade("S",44))}
        },
        53: {
        title: "Clover mite-crumb",
        description: "Googology points boost their own gain again.",
        cost: new Decimal(25000000),
        effect() {
            return player.points.add(1).pow(0.05).div(player.points.add(1).pow(0.05).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        54: {
        title: "Sierpinski's Constant",
        description: "Googology points boost their own gain again.",
        cost: new Decimal(100000000),
        effect() {
            return player.points.add(1).pow(0.04).div(player.points.add(1).pow(0.04).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        55: {
        title: "Euler's Number",
        description: "Googology points boost their own gain again.",
        cost: new Decimal(400000000),
        effect() {
            return player.points.add(1).pow(0.03).div(player.points.add(1).pow(0.03).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        61: {
        title: "Ternary-Goonol",
        description: "Googology points boost succession point gain.",
        cost: new Decimal(2.5e9),
        effect() {
            return player.points.add(1).pow(0.03).div(player.points.add(1).pow(0.03).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        62: {
        title: "Pi",
        description: "Googology points boost succession point gain again.",
        cost: new Decimal(1.5e10),
        effect() {
            return player.points.add(1).pow(0.02).div(player.points.add(1).pow(0.02).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        63: {
        title: "Binary-Goonolplex",
        description: "Googology points boost succession point gain again.",
        cost: new Decimal(5e10),
        effect() {
            return player.points.add(1).pow(0.02).div(player.points.add(1).pow(0.02).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        64: {
        title: "Trigintiprimis",
        description: "Googology points boost succession point gain again.",
        cost: new Decimal(2e11),
        effect() {
            return player.points.add(1).pow(0.01).div(player.points.add(1).pow(0.01).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        65: {
        title: "Sjyp",
        description: "Googology points boost succession point gain again.",
        cost: new Decimal(3e11),
        effect() {
            return player.points.add(1).pow(0.01).div(player.points.add(1).pow(0.01).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        71: {
        title: "Yibase",
        description: "x3 googology point gain.",
        cost: new Decimal(5e11),
        unlocked(){return (hasUpgrade("S",44))}
        },
        72: {
        title: "Blue bilby",
        description: "x3 googology point gain again.",
        cost: new Decimal(2e12),
        unlocked(){return (hasUpgrade("S",44))}
        },
        73: {
        title: "Tau",
        description: "x3 googology point gain again.",
        cost: new Decimal(6e12),
        unlocked(){return (hasUpgrade("S",44))}
        },
        74: {
        title: "Gagtwo",
        description: "x2.5 googology point gain.",
        cost: new Decimal(2.5e13),
        unlocked(){return (hasUpgrade("S",44))}
        },
        75: {
        title: "Octal-Goonol",
        description: "x2.5 googology point gain again.",
        cost: new Decimal(7.5e13),
        unlocked(){return (hasUpgrade("S",44))}
        },
        81: {
        title: "Ternary-Goodol",
        description: "x2 googology point gain again.",
        cost: new Decimal(2.5e14),
        unlocked(){return (hasUpgrade("S",44))}
        },
        82: {
        title: "Onety",
        description: "x1.2 googology point gain, and unlock a new layer.",
        cost: new Decimal(7.5e14),
        unlocked(){return (hasUpgrade("S",44))}
        },
        83: {
        title: "Dozen",
        description: "x4 googology point gain.",
        cost: new Decimal(1),
        unlocked(){return (hasUpgrade("+",11))}
        },
        84: {
        title: "Baker's Dozen",
        description: "x3 googology point gain.",
        cost: new Decimal(1e5),
        unlocked(){return (hasUpgrade("+",11))}
        },
        85: {
        title: "Poulter's Dozen",
        description: "x2 googology point gain.",
        cost: new Decimal(1e10),
        unlocked(){return (hasUpgrade("+",11))}
        },
        91: {
        title: "Sesquiwonx",
        description: "x3 succession point gain.",
        cost: new Decimal(1e6),
        unlocked(){return (hasUpgrade("x",11))}
        },
        92: {
        title: "Twelfty",
        description: "x3 succession point gain.",
        cost: new Decimal(1e15),
        unlocked(){return (hasUpgrade("x",11))}
        },
        93: {
        title: "Thirteenty",
        description: "x3 succession point gain.",
        cost: new Decimal(1e45),
        unlocked(){return (hasUpgrade("x",11))}
        },
        94: {
        title: "Ternary-eyelash mite",
        description: "x3 succession point gain.",
        cost: new Decimal(1e60),
        unlocked(){return (hasUpgrade("x",11))}
        },
        95: {
        title: "End run",
        description: "x3 succession point gain.",
        cost: new Decimal(1e65),
        unlocked(){return (hasUpgrade("x",11))}
        },
        101: {
        title: "Ternary-gooqnol",
        description: "x3 succession point gain.",
        cost: new Decimal(1e70),
        unlocked(){return (hasUpgrade("x",11))}
        },
        102: {
        title: "Dancing dragon",
        description: "x3 succession point gain.",
        cost: new Decimal(1e75),
        unlocked(){return (hasUpgrade("x",11))}
        },
        103: {
        title: "Centzontli",
        description: "x3 succession point gain.",
        cost: new Decimal(1e80),
        unlocked(){return (hasUpgrade("x",11))}
        },
        104: {
        title: "Ternary-clover mite",
        description: "x3 succession point gain.",
        cost: new Decimal(1e85),
        unlocked(){return (hasUpgrade("x",11))}
        },
        105: {
        title: "Tho",
        description: "x3 succession point gain.",
        cost: new Decimal(1e90),
        unlocked(){return (hasUpgrade("x",11))}
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
                if (!hasUpgrade('-',13)) player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 25,
            unlocked(){return (hasUpgrade("S",52))}
        },
    },
})
addLayer("+", {
    name: "addition points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ['S'],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#70FF75",
    requires: new Decimal(1e15), // Can be a function that takes requirement increases into account
    resource: "addition points", // Name of prestige currency
    baseResource: "succession points", // Name of resource prestige is based on
    baseAmount() {return player.S.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('x', 11)) mult = mult.times(2)
        if (hasUpgrade('+', 43)) mult = mult.times(2)
        if (hasUpgrade('+', 44)) mult = mult.times(2)
        if (hasUpgrade('+', 45)) mult = mult.times(2)
        if (hasUpgrade('-', 34)) mult = mult.times(2.5)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('S',82) || player[this.layer].total.gte(1))},
    hotkeys: [
        {key: "+", description: "+: addition reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        return hasUpgrade('x',15)
    },
    autoUpgrade() {return false},
    automate() {
        if (hasUpgrade('x',33)) {
            for (let i = 1; i < 6; i++) {
                buyUpgrade(this.layer,i+10)
                buyUpgrade(this.layer,i+20)
                buyUpgrade(this.layer,i+30)
                buyUpgrade(this.layer,i+40)
            }
        }
        if (hasUpgrade('x',24)) {
            buyBuyable(this.layer,11)
        }
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
        title: "Zeralum",
        description: "Unlock new succession upgrades.",
        cost: new Decimal(1),
        },
        12: {
        title: "Hex",
        description: "Total addition points boost googology point gain.",
        cost: new Decimal(2),
        effect() {
            return player['+'].total.add(1).pow(0.75).div(player['+'].total.add(1).pow(0.75).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
        title: "Tus",
        description: "Total addition points boost succession point gain.",
        cost: new Decimal(3),
        effect() {
            return player['+'].total.add(1).pow(0.4).div(player['+'].total.add(1).pow(0.4).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
        title: "Thirsy",
        description: "Unspent addition points boost googology point gain.",
        cost: new Decimal(9),
        effect() {
            return player['+'].points.add(1).pow(0.4).div(player['+'].points.add(1).pow(0.4).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
        title: "Twoty",
        description: "Unspent addition points boost succession point gain, and unlock a new layer.",
        cost: new Decimal(20),
        effect() {
            return player['+'].points.add(1).pow(0.2).div(player['+'].points.add(1).pow(0.2).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
        title: "Long Score",
        description: "x1.75 succession point gain.",
        cost: new Decimal(75),
        },
        22: {
        title: "Dumevalka",
        description: "x1.8 succession point gain.",
        cost: new Decimal(150),
        },
        23: {
        title: "King's dozen",
        description: "x1.85 succession point gain.",
        cost: new Decimal(450),
        },
        24: {
        title: "Gaz",
        description: "x1.8 succession point gain.",
        cost: new Decimal(1500),
        },
        25: {
        title: "Foursy",
        description: "x1.75 succession point gain, and unlock new stuff.",
        cost: new Decimal(3000),
        },
        31: {
        title: "Binary-eyelash mite",
        description: "x1.8 googology point and succession point gain.",
        cost: new Decimal(200000),
        unlocked(){return (hasUpgrade("+",25))}
        },
        32: {
        title: "Sevensy",
        description: "x1.75 googology point and succession point gain.",
        cost: new Decimal(500000),
        unlocked(){return (hasUpgrade("+",25))}
        },
        33: {
        title: "Fibonax",
        description: "x1.8 googology point and succession point gain.",
        cost: new Decimal(25000000),
        unlocked(){return (hasUpgrade("+",25))}
        },
        34: {
        title: "Gag-three",
        description: "x1.85 googology point and succession point gain.",
        cost: new Decimal(300000000),
        unlocked(){return (hasUpgrade("+",25))}
        },
        35: {
        title: "Elevensy",
        description: "x1.9 googology point and succession point gain.",
        cost: new Decimal(1500000000),
        unlocked(){return (hasUpgrade("+",25))}
        },
        41: {
        title: "Garnine",
        description: "x1.85 googology point and succession point gain.",
        cost: new Decimal(5e9),
        unlocked(){return (hasUpgrade("+",25))}
        },
        42: {
        title: "Binary-cheese mite",
        description: "x10 googology point gain.",
        cost: new Decimal(1000),
        unlocked(){return (hasUpgrade("x",11))}
        },
        43: {
        title: "Long gross",
        description: "x2 addition point gain.",
        cost: new Decimal(1e15),
        unlocked(){return (hasUpgrade("x",11))}
        },
        44: {
        title: "Sesquibuckles",
        description: "x2 addition point gain.",
        cost: new Decimal(1e18),
        unlocked(){return (hasUpgrade("x",11))}
        },
        45: {
        title: "Sesquitreys",
        description: "x2 addition point gain.",
        cost: new Decimal(1e21),
        unlocked(){return (hasUpgrade("x",11))}
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(5000).mul(new Decimal(2.5).pow(new Decimal(x).pow(1.5))) },
            title: "f0^m(n)",
            display() { return `x(Succession point^0.01) succession point gain.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return player['S'].points.add(1).pow(0.01).div(player['S'].points.add(1).pow(0.01).max(5).div(5).pow(0.9)).min(25).pow(getBuyableAmount(this.layer, this.id))},
            buy() {
                if (!hasUpgrade('x',23)) player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 25,
            unlocked(){return (hasUpgrade("+",25))}
        },
    },
})
addLayer("-", {
    name: "subtraction points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "-", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ['S'],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#FF7570",
    requires: new Decimal(1e20), // Can be a function that takes requirement increases into account
    resource: "subtraction points", // Name of prestige currency
    baseResource: "succession points", // Name of resource prestige is based on
    baseAmount() {return player.S.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 5,
    exponent: 1.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('+',15) || player[this.layer].total.gte(1))},
    hotkeys: [
        {key: "-", description: "-: subtraction reset", onPress(){if (canReset(this.layer) && !hasUpgrade('x',25)) doReset(this.layer)}},
    ],
    effect() {return new Decimal(new Decimal(2).add(new Decimal(player[this.layer].upgrades.length).mul(0.25))).pow(player[this.layer].points)},
    effectDescription() { return 'multiplying googology point gain by ' + format(tmp['-'].effect)},
    autoUpgrade() {return false},
    autoPrestige() {return hasUpgrade('x',42)},
    canBuyMax() {return hasUpgrade('-',22) || hasUpgrade('x',14)},
    automate() {
        if (hasUpgrade('x',41)) {
            for (let i = 1; i < 6; i++) {
                buyUpgrade(this.layer,i+10)
                buyUpgrade(this.layer,i+20)
                buyUpgrade(this.layer,i+30)
            }
        }
    },
    resetsNothing() {return hasUpgrade('x',25)},
    tabFormat: {
        "Numbers": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Milestones": {
            content: ['main-display','prestige-button','milestones'],
        },
    },
    upgrades: {
        11: {
        title: "Garfive",
        description: "Each subtraction point upgrade adds 0.25 to the subtraction point effect base, and passively generate 100% of succession points per second.",
        cost: new Decimal(7),
        unlocked(){return (hasUpgrade("+",25))}
        },
        12: {
        title: "Hypertri",
        description: "Automate the f0(n) buyable.",
        cost: new Decimal(8),
        unlocked(){return (hasUpgrade("+",25))}
        },
        13: {
        title: "Fifsy",
        description: "The f0(n) buyable costs nothing.",
        cost: new Decimal(10),
        unlocked(){return (hasUpgrade("+",25))}
        },
        14: {
        title: "Garsix",
        description: "No effect! Or is there?",
        cost: new Decimal(11),
        unlocked(){return (hasUpgrade("+",25))}
        },
        15: {
        title: "Eightsy",
        description: "No effect! Or is there?",
        cost: new Decimal(12),
        unlocked(){return (hasUpgrade("+",25))}
        },
        21: {
        title: "Garseven",
        description: "No effect! Or is there?",
        cost: new Decimal(13),
        unlocked(){return (hasUpgrade("+",25))}
        },
        22: {
        title: "Ninesy",
        description: "You can buy max subtraction points.",
        cost: new Decimal(15),
        unlocked(){return (hasUpgrade("+",25))}
        },
        23: {
        title: "Kopa",
        description: "No effect! Or is there?",
        cost: new Decimal(16),
        unlocked(){return (hasUpgrade("+",25))}
        },
        24: {
        title: "Binary-clover mite",
        description: "No effect! Or is there?",
        cost: new Decimal(18),
        unlocked(){return (hasUpgrade("+",25))}
        },
        25: {
        title: "Binary-dust mite",
        description: "No effect! Or is there?",
        cost: new Decimal(19),
        unlocked(){return (hasUpgrade("+",25))}
        },
        31: {
        title: "Myul",
        description: "No effect! Or is there?",
        cost: new Decimal(20),
        unlocked(){return (hasUpgrade("+",25))}
        },
        32: {
        title: "Goodol",
        description: "Unlock a new layer.",
        cost: new Decimal(21),
        unlocked(){return (hasUpgrade("+",25))}
        },
        33: {
        title: "Short ream",
        description: "No effect! Or is there?",
        cost: new Decimal(38),
        unlocked(){return (hasUpgrade("x",35))}
        },
        34: {
        title: "Ream",
        description: "Finally, an effect!!! x2.5 addition point gain.",
        cost: new Decimal(40),
        unlocked(){return (hasUpgrade("x",35))}
        },
        35: {
        title: "Linear",
        description: "÷1,000 googology point gain (also divides your current googology points), and x32 succession point gain.",
        cost: new Decimal(41),
        unlocked(){return (player['÷'].total.gte(1))},
        onPurchase() { player.points = player.points.div(1000)}
        },
    },
    milestones: {
        1: {
            requirementDescription: "1 subtraction points",
            effectDescription: "Autobuy the first 8 rows of succession upgrades.",
            done() { return player[this.layer].points.gte(1) }
        },
    },
})
addLayer("x", {
    name: "multiplication points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "x", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ['+'],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#87F9FF",
    requires: new Decimal(1e11), // Can be a function that takes requirement increases into account
    resource: "multiplication points", // Name of prestige currency
    baseResource: "addition points", // Name of resource prestige is based on
    baseAmount() {return player['+'].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('-',32) || player[this.layer].total.gte(1))},
    hotkeys: [
        {key: "x", description: "x: multiplication reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        return false
    },
    autoUpgrade() {return false},
    canBuyMax() {return false},
    automate() {
    },
    tabFormat: {
        "Numbers": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Functions": {
            content: ['main-display','prestige-button','buyables'],
        },
        "Lore": {
            content: [
                ['infobox','1'],
                ['infobox','2'],
                ['infobox','3'],
            ],
        },
    },
    upgrades: {
        11: {
        title: "Eleventy",
        description: "x4 googology point gain, x3 succession point gain, and x2 addition point gain! Unlock new succession and addition upgrades.",
        cost: new Decimal(1),
        },
        12: {
        title: "Fourteenty",
        description: "x7.5 googology point gain.",
        cost: new Decimal(10),
        },
        13: {
        title: "Gross",
        description: "x7.75 googology point gain, and passively generate 100% of succession point gain per second.",
        cost: new Decimal(20),
        },
        14: {
        title: "Baker's gross",
        description: "x8 googology point gain, and buy max subtraction points.",
        cost: new Decimal(30),
        },
        15: {
        title: "Poulter's gross",
        description: "Gain 100% of addition points per second.",
        cost: new Decimal(60),
        },
        21: {
        title: "Tarumba",
        description: "x8.25 googology point gain, and autobuy the first 8 rows of succession upgrades.",
        cost: new Decimal(500),
        },
        22: {
        title: "King's gross",
        description: "x8.5 googology point gain, and autobuy the f0(n) buyable.",
        cost: new Decimal(1250),
        },
        23: {
        title: "Fzfour",
        description: "x8.75 googology point gain, and the f0^m(n) buyable costs nothing.",
        cost: new Decimal(2500),
        },
        24: {
        title: "Flah",
        description: "x9 googology point gain, and automate the f0^m(n) buyable.",
        cost: new Decimal(3500),
        },
        25: {
        title: "Pedupi",
        description: "x9.25 googology point gain, and subtraction resets nothing. [This also disables the subtraction reset hotkey]",
        cost: new Decimal(5000),
        },
        31: {
        title: "Idiot's array",
        description: "x9.5 googology point gain.",
        cost: new Decimal(8000),
        },
        32: {
        title: "Tjega",
        description: "x9.75 googology point gain.",
        cost: new Decimal(12000),
        },
        33: {
        title: "Kinoctove",
        description: "x10 googology point gain, autobuy the first 4 rows of addition upgrades, and unlock a buyable.",
        cost: new Decimal(20000),
        },
        34: {
        title: "Ternary-dust mite",
        description: "x10 googology point gain.",
        cost: new Decimal(75000),
        },
        35: {
        title: "Owch",
        description: "x10 googology point gain, and unlock more subtraction upgrades.",
        cost: new Decimal(125000),
        },
        41: {
        title: "Eulerplex",
        description: "xe succession point gain, autobuy rows 9 and 10 of succession upgrades, and autobuy the first 3 rows of subtraction upgrades.",
        cost: new Decimal(3000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        42: {
        title: "Chow",
        description: "x4 succession point gain, and automate subtraction point gain.",
        cost: new Decimal(3500000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        43: {
        title: "Aniquilación",
        description: "x4 succession point gain.",
        cost: new Decimal(4000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        44: {
        title: "Vulgate number",
        description: "x4 succession point gain.",
        cost: new Decimal(5000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        45: {
        title: "Fara",
        description: "÷1,000 googology point gain, and x10 succession point gain.",
        cost: new Decimal(10000000),
        unlocked() {return player['÷'].total.gte(1)},
        onPurchase() { player.points = player.points.div(1000)}
        },
        51: {
        title: "Musashi",
        description: "x5 succession point gain.",
        cost: new Decimal(11500000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        52: {
        title: "Ternary-cheese mite",
        description: "x5 succession point gain.",
        cost: new Decimal(13000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        53: {
        title: "Valles",
        description: "x25.753 googology point gain.",
        cost: new Decimal(17000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        54: {
        title: "Jackpot number",
        description: "x27.777 googology point gain.",
        cost: new Decimal(35000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        55: {
        title: "Yimum",
        description: "x20.847 googology point gain.",
        cost: new Decimal(40000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        61: {
        title: "Thousand",
        description: "WOW! A THOUSAND??? Anyway, here's a x10 succession point gain boost!",
        cost: new Decimal(125000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        62: {
        title: "Märchenzahl",
        description: "x6.001 succession point gain.",
        cost: new Decimal(150000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
    },
    buyables: {
        11: {
            cost(x) { return new Decimal(25000).mul(new Decimal(2).pow(x)) },
            title: "f1(n)",
            display() { return `x10 googology point gain.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new Decimal(10).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 15,
            unlocked(){return (hasUpgrade("x",33))}
        },
    },
    infoboxes: {
        1: {
        title: "Larger and larger numbers!",
        body() { return "Your main number is getting larger and larger! Also, you are getting closer to having a googol googology points! Push through it! I'm sure you can get to a googol googology points!" },
        },
        2: {
        title: "Almost there...",
        body() { return "A duotrigintillion points already! 9 duotrigintillion more points to reach googol!" },
        unlocked() {return player.points.gte(1e99)}
        },
        3: {
        title: "OH NO!!!",
        body() { return "You... can't get to a googol googology points? Is it because they are called googology points? Maybe you should try increasing your number in some way? It seems like a new layer [coming soon] has appeared..." },
        unlocked() {return player.points.gte(9.99e99)}
        },
    }
})
addLayer("÷", {
    name: "division points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "÷", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    branches: ['+','-'],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#F9FF87",
    requires: new Decimal(1e24), // Can be a function that takes requirement increases into account
    resource: "division points", // Name of prestige currency
    baseResource: "addition points", // Name of resource prestige is based on
    baseAmount() {return player['+'].points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 5,
    exponent: 1.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (player.points.gte('9.99e99') || player[this.layer].total.gte(1))},
    hotkeys: [
        {key: "/", description: "/: division reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    effect() {return new Decimal(10).pow(player[this.layer].points)},
    effectDescription() { return 'dividing googology point gain by ' + format(tmp['÷'].effect) + ' and multiplying succession point gain by '+ format(tmp['÷'].effect)},
    autoUpgrade() {return false},
    canBuyMax() {return false},
    automate() {
    },
    tabFormat: {
        "Numbers": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Lore": {
            content: [
                ['infobox','1'],
                ['infobox','2'],
            ],
        },
    },
    upgrades: {
        11: {
        title: "Beast number",
        description: "÷10,000,000,000 googology point gain, and x300,000 succession point gain.",
        cost: new Decimal(6),
        onPurchase() { player.points = player.points.div(1e10)}
        },
        12: {
        title: "Unreasonable",
        description: "÷10,000,000,000 googology point gain, and x750,000 succession point gain.",
        cost: new Decimal(8),
        onPurchase() { player.points = player.points.div(1e10)}
        },
        13: {
        title: "Very unreasonable",
        description: "÷10,000,000,000 googology point gain, and x980,000 succession point gain.",
        cost: new Decimal(9),
        unlocked() {return new Decimal(getBuyableAmount('x',11)).gte(15)},
        onPurchase() { player.points = player.points.div(1e10)}
        },
    },
    infoboxes: {
        1: {
        title: "A new operation?",
        body() { return "Instead of increasing your googology point count, why not just improve what you already have? This should help with increasing your number even further!" },
        },
        2: {
        title: "This is dangerous...",
        body() { return "Did you feel that? It is getting harder and harder to get to 10 points. Division is powerful, but dangerous. I'd recommend you tread lightly going forward..." },
        unlocked() {return player[this.layer].total.gte(20)}
        },
    }
})
addLayer("n", {
    name: "nullology points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "N", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0, // Row the layer is in on the tree (0 is the first row)
    nodeStyle() { return {
            background: "radial-gradient(circle, #800000 45%, #000000 95%)"
    }},
    branches: ['S','-'],
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
        total: new Decimal(0),
    }},
    color: "#800000",
    requires: new Decimal(1e-100), // Can be a function that takes requirement increases into account
    resource: "nullology points", // Name of prestige currency
    baseResource: "googology points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: -1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1e82)
        mult = mult.times(buyableEffect('x',11))
        if (hasUpgrade('n', 11)) mult = mult.times(2)
        if (hasUpgrade('n', 12)) mult = mult.times(2)
        if (hasUpgrade('n', 13)) mult = mult.times(2)
        if (hasUpgrade('n', 14)) mult = mult.times(2)
        if (hasUpgrade('n', 15)) mult = mult.times(12)
        if (hasUpgrade('n', 21)) mult = mult.times(1.5)
        if (hasUpgrade('n', 22)) mult = mult.times(upgradeEffect('n',22))
        if (hasUpgrade('n', 23)) mult = mult.times(upgradeEffect('n',23))
        if (hasUpgrade('n', 24)) mult = mult.times(upgradeEffect('n',24))
        if (hasUpgrade('n', 25)) mult = mult.times(13.85)
        if (hasUpgrade('n', 31)) mult = mult.times(2)
        if (hasUpgrade('n', 32)) mult = mult.times(2.009)
        if (hasUpgrade('n', 33)) mult = mult.times(2.028)
        if (hasUpgrade('n', 34)) mult = mult.times(2.029)
        if (hasUpgrade('n', 35)) mult = mult.times(upgradeEffect('n',35))
        if (hasUpgrade('n', 41)) mult = mult.times(1.52)
        if (hasUpgrade('n', 42)) mult = mult.times(1.523)
        if (hasUpgrade('n', 43)) mult = mult.times(1.52048)
        if (hasUpgrade('n', 44)) mult = mult.times(1.52187)
        if (hasUpgrade('n', 45)) mult = mult.times(5.2197)
        if (hasUpgrade('n', 51)) mult = mult.times(1.52304)
        if (hasUpgrade('n', 52)) mult = mult.times(1.5231)
        if (hasUpgrade('n', 53)) mult = mult.times(1.52744)
        if (hasUpgrade('n', 54)) mult = mult.times(1.53125)
        if (hasUpgrade('n', 55)) mult = mult.times(7.314)
        if (hasUpgrade('n', 61)) mult = mult.times(1.5321)
        if (hasUpgrade('n', 62)) mult = mult.times(1.53465)
        if (hasUpgrade('n', 63)) mult = mult.times(1.5352)
        if (hasUpgrade('n', 64)) mult = mult.times(1.536)
        if (hasUpgrade('n', 65)) mult = mult.times(5.4098)
        if (hasUpgrade('n', 71)) mult = mult.times(1.54181)
        if (hasUpgrade('n', 72)) mult = mult.times(1.54356)
        if (hasUpgrade('n', 73)) mult = mult.times(1.54422)
        if (hasUpgrade('n', 74)) mult = mult.times(1.54477)
        if (hasUpgrade('n', 75)) mult = mult.times(5.4913)
        if (hasUpgrade('n', 81)) mult = mult.times(1.55)
        if (hasUpgrade('n', 82)) mult = mult.times(1.55053)
        if (hasUpgrade('n', 83)) mult = mult.times(1.5512)
        if (hasUpgrade('n', 84)) mult = mult.times(1.55314)
        if (hasUpgrade('n', 85)) mult = mult.times(8.5346)
        if (hasUpgrade('n', 91)) mult = mult.times(1.55461)
        if (hasUpgrade('n', 92)) mult = mult.times(1.56174)
        if (hasUpgrade('n', 93)) mult = mult.times(1.564)
        if (hasUpgrade('n', 94)) mult = mult.times(1.56561)
        if (hasUpgrade('n', 95)) mult = mult.times(5.6666)
        if (hasUpgrade('n', 101)) mult = mult.times(1.56765)
        if (hasUpgrade('n', 102)) mult = mult.times(1.57)
        if (hasUpgrade('n', 103)) mult = mult.times(1.57577)
        if (hasUpgrade('n', 104)) mult = mult.times(1.57722)
        if (hasUpgrade('n', 105)) mult = mult.times(6.7744)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new Decimal(1)
        return exp
    },
    layerShown(){return (hasUpgrade('÷',13) || player[this.layer].total.gte(1))},
    hotkeys: [
        {key: "n", description: "n: nullology reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    autoUpgrade() {return false},
    automate() {
    },
    tabFormat: {
        "Numbers": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Lore": {
            content: [
                ['infobox','1'],
                ['infobox','2'],
            ],
        },
    },
    upgrades: {
            11: {
                title: "Gum",
                description: "x2 nullology point gain.",
                cost: new Decimal(100),
            },
            12: {
                title: "Binary-guppyspeck",
                description: "x2 nullology point gain.",
                cost: new Decimal(500),
            },
            13: {
                title: "Lily",
                description: "x2 nullology point gain.",
                cost: new Decimal(1500),
            },
            14: {
                title: "Gartreys",
                description: "x2 nullology point gain.",
                cost: new Decimal(3000),
            },
            15: {
                title: "Long thousand",
                description: "x12 nullology and googology point gain.",
                cost: new Decimal(10000),
            },
            21: {
                title: "Actintrinyllion",
                description: "x1.5 nullology point gain.",
                cost: new Decimal(100000),
            },
            22: {
                title: "Unexian",
                description: "Nullology points boost themselves.",
                cost: new Decimal(150000),
                effect() {
                    return player['n'].points.add(1).pow(0.1).div(player['n'].points.add(1).pow(0.1).max(1000).div(1000).pow(0.9)).min(1000000)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            23: {
                title: "Maha",
                description: "Nullology points boost themselves again.",
                cost: new Decimal(600000),
                effect() {
                    return player['n'].points.add(1).pow(0.1).div(player['n'].points.add(1).pow(0.1).max(1000).div(1000).pow(0.9)).min(1000000)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            24: {
                title: "Piplex",
                description: "Nullology points boost themselves again.",
                cost: new Decimal(2500000),
                effect() {
                    return player['n'].points.add(1).pow(0.1).div(player['n'].points.add(1).pow(0.1).max(1000).div(1000).pow(0.9)).min(1000000)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            25: {
                title: "Vatican City",
                description: "x13.85 nullology and googology point gain.",
                cost: new Decimal(10000000),
            },
            31: {
                title: "Megadollaxul",
                description: "x2 nullology point gain.",
                cost: new Decimal(300000000),
            },
            32: {
                title: "Hyper fixation Number",
                description: "x2.009 nullology point gain.",
                cost: new Decimal(1000000000),
            },
            33: {
                title: "Great gross",
                description: "x2.028 nullology point gain.",
                cost: new Decimal(2000000000),
            },
            34: {
                title: "Hardy-Ramanujan Number",
                description: "x2.029 nullology point gain.",
                cost: new Decimal(5000000000),
            },
            35: {
                title: "Eyelash mite-chunk",
                description: "2,000 already? Nullology points boost themselves and googology point gain.",
                cost: new Decimal(1e10),
                effect() {
                    return player['n'].points.add(1).pow(0.075).div(player['n'].points.add(1).pow(0.075).max(1000).div(1000).pow(0.9)).min(1000000)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            41: {
                title: "Retrillion",
                description: "x1.52 nullology point gain.",
                cost: new Decimal(3e11),
            },
            42: {
                title: "New Chromoluem",
                description: "x1.523 nullology point gain.",
                cost: new Decimal(6e11),
            },
            43: {
                title: "Giga",
                description: "x1.52048 nullology point gain.",
                cost: new Decimal(1e12),
            },
            44: {
                title: "Ternary-pipsqueak",
                description: "x1.52187 nullology point gain.",
                cost: new Decimal(2e12),
            },
            45: {
                title: "Great baker's gross",
                description: "x5.2197 nullology and googology point gain.",
                cost: new Decimal(3e12),
            },
            51: {
                title: "Planus",
                description: "x1.52304 nullology point gain.",
                cost: new Decimal(1e14),
            },
            52: {
                title: "Heads-pentprimol",
                description: "x1.5231 nullology point gain.",
                cost: new Decimal(2.5e14),
            },
            53: {
                title: "Poulter's great gross",
                description: "x1.52744 nullology point gain.",
                cost: new Decimal(4e14),
            },
            54: {
                title: "Fzfive",
                description: "x1.53125 nullology point gain.",
                cost: new Decimal(7e14),
            },
            55: {
                title: "Petripi",
                description: "x7.314 nullology and googology point gain.",
                cost: new Decimal(1e15),
            },
            61: {
                title: "Coxeyes",
                description: "x1.5321 nullology point gain.",
                cost: new Decimal(2e16),
            },
            62: {
                title: "Obragsracx",
                description: "x1.53465 nullology point gain.",
                cost: new Decimal(3.5e16),
            },
            63: {
                title: "Bree",
                description: "x1.5352 nullology point gain.",
                cost: new Decimal(6e16),
            },
            64: {
                title: "Shar",
                description: "x1.536 nullology point gain.",
                cost: new Decimal(1e17),
            },
            65: {
                title: "White whale",
                description: "4,000 already? x5.4098 nullology and googology point gain.",
                cost: new Decimal(1.5e17),
            },
            71: {
                title: "Fibonaxix",
                description: "x1.54181 nullology point gain.",
                cost: new Decimal(5e18),
            },
            72: {
                title: "Garboxcars",
                description: "x1.54356 nullology point gain.",
                cost: new Decimal(8e18),
            },
            73: {
                title: "Lox",
                description: "x1.54422 nullology point gain.",
                cost: new Decimal(1.5e19),
            },            
            74: {
                title: "Irspa",
                description: "x1.54477 nullology point gain.",
                cost: new Decimal(2.5e19),
            },
            75: {
                title: "Juun",
                description: "x5.4913 nullology and googology point gain.",
                cost: new Decimal(6e19),
            },
            81: {
                title: "Dust mite-chunk",
                description: "x1.55 nullology point gain.",
                cost: new Decimal(2e21),
            },
            82: {
                title: "Beauty",
                description: "x1.55053 nullology point gain.",
                cost: new Decimal(3.5e21),
            },
            83: {
                title: "Binary-squeaker",
                description: "x1.5512 nullology point gain.",
                cost: new Decimal(6e21),
            },            
            84: {
                title: "Second qlaco's number",
                description: "x1.55314 nullology point gain.",
                cost: new Decimal(1e22),
            },
            85: {
                title: "Ragsracxob",
                description: "x8.5346 nullology and googology point gain.",
                cost: new Decimal(2e22),
            },
            91: {
                title: "Ma'asjyp",
                description: "x1.55461 nullology point gain.",
                cost: new Decimal(5e23),
            },
            92: {
                title: "Kaprekar's constant",
                description: "6,000 already? x1.56174 nullology point gain.",
                cost: new Decimal(8e23),
            },
            93: {
                title: "Teradollaxul",
                description: "x1.564 nullology point gain.",
                cost: new Decimal(1.5e24),
            },            
            94: {
                title: "Tetrafact",
                description: "x1.56561 nullology point gain.",
                cost: new Decimal(2.5e24),
            },
            95: {
                title: "Clickety-clix",
                description: "x5.6666 nullology and googology point gain.",
                cost: new Decimal(6e24),
            },
            101: {
                title: "Fibonaxx",
                description: "x1.56765 nullology point gain.",
                cost: new Decimal(3e26),
            },
            102: {
                title: "Zero-septingenol",
                description: "x1.57 nullology point gain.",
                cost: new Decimal(5e26),
            },
            103: {
                title: "The iPad",
                description: "x1.57577 nullology point gain.",
                cost: new Decimal(1e27),
            },            
            104: {
                title: "Menilles",
                description: "x1.57722 nullology point gain.",
                cost: new Decimal(1.75e27),
            },
            105: {
                title: "Garpo",
                description: "x6.7744 nullology and googology point gain.",
                cost: new Decimal(3e27),
            },
        },
        
    infoboxes: {
        1: {
        title: "Here we are...",
        body() { return "Your divisive shenanigans have caused you to enter the underworld of the numbers! The hotkey is extremely recommended for this layer! Something isn't right here though..." },
        },
    }
})