addLayer("a", {
    name: "achievements", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "A", // This appears on the layer's node. Default is the id with the first letter capitalized
    startData() { return {
        unlocked: true,
        points: new MetaNum(0)
    }},
    color: "#FFFF00",
    resource: "achievements", // Name of prestige currency
    row: "side", // Row the layer is in on the tree (0 is the first row)
    achievements: {
        11: {
            name: "The Start",
            tooltip: "Get 1 succession point.",
            done() {return player['S'].points.gte(1)},
            effect() {player[this.layer].points = player[this.layer].achievements.length}
        },
        12: {
            name: "Hey guys!",
            tooltip: "Buy One.",
            done() {return hasUpgrade('S',44)}
        },
        13: {
            name: "The Fast-Growing Start",
            tooltip: "Buy f0(n)",
            done() {return getBuyableAmount('S',11).gte(1)}
        },
        14: {
            name: "Add-icted",
            tooltip: "Get 1 addition point.",
            done() {return player['+'].points.gte(1)}
        },
        15: {
            name: "D minus",
            tooltip: "Get 1 subtraction point.",
            done() {return player['-'].points.gte(1)}
        },
        16: {
            name: "A plus",
            tooltip: "Get 250 addition points.",
            done() {return player['+'].points.gte(250)}
        },
        17: {
            name: "The Repeated Fast-Growing Start",
            tooltip: "Buy f0^m(n).",
            done() {return getBuyableAmount('+',11).gte(1)}
        },
        18: {
            name: "Count to (Negative) Ten",
            tooltip: "Get 10 subtraction points.",
            done() {return player['-'].points.gte(10)}
        },
        21: {
            name: "Multiplied",
            tooltip: "Get 1 multiplication point.",
            done() {return player['x'].points.gte(1)}
        },
        22: {
            name: "Let's go somewhere more casual!",
            tooltip: "Get f1(n).",
            done() {return getBuyableAmount('x',11).gte(1)}
        },
        23: {
            name: "Just Short of Googol",
            tooltip: "Get 1 division point.",
            done() {return player['÷'].points.gte(1)}
        },
        24: {
            name: "Nullification I",
            tooltip: "Buy Very Unreasonable.",
            done() {return hasUpgrade('÷',13)}
        },
        25: {
            name: "Nullification II",
            tooltip: "Get 10,000,000,000 nullology points.",
            done() {return player['n'].points.gte(1e10)}
        },
        26: {
            name: "Nullification III",
            tooltip: "Get 100,000,000,000,000,000,000 nullology points.",
            done() {return player['n'].points.gte(1e20)}
        },
        27: {
            name: "Nullification IV",
            tooltip: "Get 1e30 nullology points.",
            done() {return player['n'].points.gte(1e30)}
        },
        28: {
            name: "Nullification V",
            tooltip: "Get 1e50 nullology points.",
            done() {return player['n'].points.gte(1e50)}
        },
        31: {
            name: "Subexponentiated",
            tooltip: "Get 1 subexponentiation point.",
            done() {return player['x'].sp.gte(1)}
        },
        32: {
            name: "Elongated Runs",
            tooltip: "Get Exponentiation Tier 1.",
            done() {return hasMilestone('^',1)}
        },
        33: {
            name: "Medium Runs",
            tooltip: "Get Exponentiation Tier 2.",
            done() {return hasMilestone('^',2)}
        },
        34: {
            name: "Short Runs",
            tooltip: "Get Exponentiation Tier 3.",
            done() {return hasMilestone('^',3)}
        },
        35: {
            name: "Radical",
            tooltip: "Get Exponentiation Tier 5.",
            done() {return hasMilestone('^',5)}
        },
        36: {
            name: "More Radical",
            tooltip: "Get Exponentiation Tier 6.",
            done() {return hasMilestone('^',6)}
        },
        37: {
            name: "Not yet!",
            tooltip: "Get Exponentiation Tier 7.",
            done() {return hasMilestone('^',7)}
        },
        38: {
            name: "It's time for the... Fourth Root!",
            tooltip: "Get Exponentiation Tier 8.",
            done() {return hasMilestone('^',8)}
        },
    },
    layerShown() {return true}
})
addLayer("S", {
    name: "succession points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    nodeStyle() { return {
        background: "radial-gradient( #ffffff, #dddddd)",
    }},
    startData() { return {
        unlocked: true,
		points: new MetaNum(0),
        number: "-1",
    }},
    update(diff) {
        if (hasUpgrade('S',11)) player[this.layer].number = "0"
        if (hasUpgrade('S',12)) player[this.layer].number = "ε"
        if (getBuyableAmount('S',13).gte(1)) player[this.layer].number = "0.000001"
        if (getBuyableAmount('S',14).gte(1)) player[this.layer].number = "0.000002"
        if (getBuyableAmount('S',15).gte(1)) player[this.layer].number = "0.000005"
        if (getBuyableAmount('S',21).gte(1)) player[this.layer].number = "0.000008"
        if (getBuyableAmount('S',22).gte(1)) player[this.layer].number = "0.00001"
        if (getBuyableAmount('S',23).gte(1)) player[this.layer].number = "0.00002"
        if (getBuyableAmount('S',24).gte(1)) player[this.layer].number = "0.0000508"
        if (getBuyableAmount('S',25).gte(1)) player[this.layer].number = "0.0001"
        if (getBuyableAmount('S',31).gte(1)) player[this.layer].number = "0.001"
        if (getBuyableAmount('S',32).gte(1)) player[this.layer].number = "0.00129"
        if (getBuyableAmount('S',33).gte(1)) player[this.layer].number = "0.01"
        if (getBuyableAmount('S',34).gte(1)) player[this.layer].number = "0.1"
        if (getBuyableAmount('S',35).gte(1)) player[this.layer].number = "0.2"
        if (getBuyableAmount('S',41).gte(1)) player[this.layer].number = "0.425"
        if (getBuyableAmount('S',42).gte(1)) player[this.layer].number = "0.5"
        if (getBuyableAmount('S',43).gte(1)) player[this.layer].number = "0.8"
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
        if (hasUpgrade('S',111)) player[this.layer].number = "7,776"
        if (hasUpgrade('S',112)) player[this.layer].number = "8,000"
        if (hasUpgrade('n',111)) player[this.layer].number = "8,910"
        if (hasUpgrade('n',112)) player[this.layer].number = "9,653"
        if (hasUpgrade('n',113)) player[this.layer].number = "9,999"
        if (hasUpgrade('n',114)) player[this.layer].number = "10,240"
        if (hasUpgrade('n',115)) player[this.layer].number = "10,432"
        if (hasUpgrade('S',113)) player[this.layer].number = "12,340"
        if (hasUpgrade('S',114)) player[this.layer].number = "12,800"
        if (hasUpgrade('S',115)) player[this.layer].number = "13,824"
        if (hasUpgrade('+',51)) player[this.layer].number = "15,625"
        if (hasUpgrade('n',121)) player[this.layer].number = "19,683"
        if (hasUpgrade('n',122)) player[this.layer].number = "20,000"
        if (hasUpgrade('n',123)) player[this.layer].number = "20,480"
        if (hasUpgrade('n',124)) player[this.layer].number = "20,736"
        if (hasUpgrade('n',125)) player[this.layer].number = "21,845"
        if (hasUpgrade('+',52)) player[this.layer].number = "23,401"
        if (hasUpgrade('+',53)) player[this.layer].number = "25,600"
        if (hasUpgrade('+',54)) player[this.layer].number = "30,000"
        if (hasUpgrade('+',55)) player[this.layer].number = "31,416"
        if (hasUpgrade('n',131)) player[this.layer].number = "31,700"
        if (hasUpgrade('n',132)) player[this.layer].number = "32,104"
        if (hasUpgrade('n',133)) player[this.layer].number = "32,768"
        if (hasUpgrade('n',134)) player[this.layer].number = "34,012"
        if (hasUpgrade('n',135)) player[this.layer].number = "35,937"
        if (hasUpgrade('+',61)) player[this.layer].number = "38,241"
        if (hasUpgrade('+',62)) player[this.layer].number = "40,000"
        if (hasUpgrade('n',141)) player[this.layer].number = "40,585"
        if (hasUpgrade('n',142)) player[this.layer].number = "41,382"
        if (hasUpgrade('n',143)) player[this.layer].number = "42,875"
        if (hasUpgrade('n',144)) player[this.layer].number = "43,200"
        if (hasUpgrade('n',145)) player[this.layer].number = "43,210"
        if (hasUpgrade('+',63)) player[this.layer].number = "46,656"
        if (hasUpgrade('+',64)) player[this.layer].number = "50,000"
        if (hasUpgrade('+',65)) player[this.layer].number = "54,321"
        if (hasUpgrade('x',63)) player[this.layer].number = "59,049"
        if (hasUpgrade('x',64)) player[this.layer].number = "65,432"
        if (hasUpgrade('x',65)) player[this.layer].number = "65,536"
        if (hasUpgrade('x',71)) player[this.layer].number = "80,000"
        if (hasUpgrade('÷',14)) player[this.layer].number = "82,413"
        if (hasUpgrade('n',151)) player[this.layer].number = "83,521"
        if (hasUpgrade('n',152)) player[this.layer].number = "85,321"
        if (hasUpgrade('n',153)) player[this.layer].number = "86,400"
        if (hasUpgrade('n',154)) player[this.layer].number = "87,381"
        if (hasUpgrade('n',155)) player[this.layer].number = "97,531"
        if (hasUpgrade('n',161)) player[this.layer].number = "99,999"
        if (hasUpgrade('n',162)) player[this.layer].number = "100,000"
        if (hasUpgrade('n',163)) player[this.layer].number = "110,592"
        if (hasUpgrade('x',72)) player[this.layer].number = "142,857"
        if (hasUpgrade('x',73)) player[this.layer].number = "160,000"
        if (hasUpgrade('x',74)) player[this.layer].number = "161,051"
        if (hasUpgrade('x',75)) player[this.layer].number = "166,375"
        if (hasUpgrade('x',81)) player[this.layer].number = "172,800"
        if (hasUpgrade('x',82)) player[this.layer].number = "198,532"
        if (hasUpgrade('x',83)) player[this.layer].number = "200,000"
        if (hasUpgrade('x',84)) player[this.layer].number = "221,985"
        if (hasUpgrade('x',85)) player[this.layer].number = "238,144"
        if (hasUpgrade('x',91)) player[this.layer].number = "248,832"
        if (hasUpgrade('x',92)) player[this.layer].number = "259,200"
        if (hasUpgrade('x',93)) player[this.layer].number = "262,144"
        if (hasUpgrade('x',94)) player[this.layer].number = "279,936"
        if (hasUpgrade('x',95)) player[this.layer].number = "285,888"
        if (hasUpgrade('x',101)) player[this.layer].number = "287,496"
        if (hasUpgrade('x',102)) player[this.layer].number = "295,245"
        if (hasUpgrade('x',103)) player[this.layer].number = "345,600"
        if (hasUpgrade('x',104)) player[this.layer].number = "349,525"
        if (hasUpgrade('x',105)) player[this.layer].number = "390,625"
        if (hasUpgrade('x',111)) player[this.layer].number = "400,000"
        if (hasUpgrade('x',112)) player[this.layer].number = "432,000"
        if (hasUpgrade('x',113)) player[this.layer].number = "491,520"
        if (hasUpgrade('x',114)) player[this.layer].number = "500,000"
        if (hasUpgrade('x',115)) player[this.layer].number = "518,400"
        if (hasUpgrade('÷',15)) player[this.layer].number = "524,288"
        if (hasUpgrade('+',71)) player[this.layer].number = "604,800"
        if (hasUpgrade('+',72)) player[this.layer].number = "750,000"
        if (hasUpgrade('+',73)) player[this.layer].number = "762,022"
        if (hasUpgrade('+',74)) player[this.layer].number = "763,991"
        if (hasUpgrade('+',75)) player[this.layer].number = "800,000"
        if (hasUpgrade('+',81)) player[this.layer].number = "823,543"
        if (hasUpgrade('+',82)) player[this.layer].number = "912,673"
        if (hasUpgrade('+',83)) player[this.layer].number = "913,001"
        if (hasUpgrade('+',84)) player[this.layer].number = "985,321"
        if (hasUpgrade('+',85)) player[this.layer].number = "999,999"
        if (hasUpgrade('x',121)) player[this.layer].number = "1,000,000"
        if (hasUpgrade('S',121)) player[this.layer].number = "1,004,020"
        if (hasUpgrade('S',122)) player[this.layer].number = "1,048,576"
        if (hasUpgrade('S',123)) player[this.layer].number = "1,132,021"
        if (hasUpgrade('S',124)) player[this.layer].number = "1,273,262"
        if (hasUpgrade('S',125)) player[this.layer].number = "1,338,227"
        if (hasUpgrade('S',131)) player[this.layer].number = "1,345,986"
        if (hasUpgrade('S',132)) player[this.layer].number = "1,398,101"
        if (hasUpgrade('S',133)) player[this.layer].number = "1,419,857"
        if (hasUpgrade('S',134)) player[this.layer].number = "1,500,625"
        if (hasUpgrade('S',135)) player[this.layer].number = "1,679,616"
        if (hasUpgrade('S',141)) player[this.layer].number = "1,953,125"
        if (hasUpgrade('S',142)) player[this.layer].number = "2,000,000"
        if (hasUpgrade('S',143)) player[this.layer].number = "2,097,152"
        if (hasUpgrade('S',144)) player[this.layer].number = "2,419,200"
        if (hasUpgrade('S',145)) player[this.layer].number = "2,985,984"
        if (hasUpgrade('S',151)) player[this.layer].number = "2,985,991"
        if (hasUpgrade('S',152)) player[this.layer].number = "2,986,031"
        if (hasUpgrade('S',153)) player[this.layer].number = "2,986,037"
        if (hasUpgrade('S',154)) player[this.layer].number = "3,628,800"
        if (hasUpgrade('S',155)) player[this.layer].number = "4,000,000"
        if (hasUpgrade('S',161)) player[this.layer].number = "4,194,304"
        if (hasUpgrade('S',162)) player[this.layer].number = "4,222,025"
        if (hasUpgrade('S',163)) player[this.layer].number = "4,838,400"
        if (hasUpgrade('S',164)) player[this.layer].number = "5,302,022"
        if (hasUpgrade('S',165)) player[this.layer].number = "5,308,416"
        if (hasUpgrade('S',171)) player[this.layer].number = "7,257,600"
        if (hasUpgrade('S',172)) player[this.layer].number = "9,676,800"
        if (hasUpgrade('S',173)) player[this.layer].number = "9,765,625"
        if (hasUpgrade('S',174)) player[this.layer].number = "9,870,123"
        if (hasUpgrade('S',175)) player[this.layer].number = "10,000,000"
        if (hasUpgrade('S',181)) player[this.layer].number = "12,096,000"
        if (hasUpgrade('S',182)) player[this.layer].number = "14,348,907"
        if (hasUpgrade('S',183)) player[this.layer].number = "14,515,200"
        if (hasUpgrade('S',184)) player[this.layer].number = "15,893,760"
        if (hasUpgrade('S',185)) player[this.layer].number = "16,711,680"
        if (hasUpgrade('S',191)) player[this.layer].number = "16,777,216"
        if (hasUpgrade('S',192)) player[this.layer].number = "16,934,400"
        if (hasUpgrade('S',193)) player[this.layer].number = "19,353,600"
        if (hasUpgrade('S',194)) player[this.layer].number = "21,772,800"
        if (hasUpgrade('S',195)) player[this.layer].number = "24,137,569"
        if (hasUpgrade('S',201)) player[this.layer].number = "24,192,000"
        if (hasUpgrade('S',202)) player[this.layer].number = "26,611,200"
        if (hasUpgrade('S',203)) player[this.layer].number = "29,030,400"
        if (hasUpgrade('S',204)) player[this.layer].number = "31,449,600"
        if (hasUpgrade('S',205)) player[this.layer].number = "31,622,777"
        if (getBuyableAmount('+',91).gte(1)) player[this.layer].number = "33,554,432"
        if (getBuyableAmount('+',92).gte(1)) player[this.layer].number = "52,521,875"
        if (getBuyableAmount('+',93).gte(1)) player[this.layer].number = "64,000,000"
        if (getBuyableAmount('+',94).gte(1)) player[this.layer].number = "100,000,000"
        if (getBuyableAmount('+',95).gte(1)) player[this.layer].number = "105,413,513"
        if (getBuyableAmount('+',101).gte(1)) player[this.layer].number = "124,944,347"
        if (getBuyableAmount('+',102).gte(1)) player[this.layer].number = "134,217,728"
        if (getBuyableAmount('+',103).gte(1)) player[this.layer].number = "254,803,968"
        if (getBuyableAmount('+',104).gte(1)) player[this.layer].number = "299,792,458"
        if (getBuyableAmount('+',105).gte(1)) player[this.layer].number = "387,420,489"
        if (getBuyableAmount('+',111).gte(1)) player[this.layer].number = "500,000,000"
        if (getBuyableAmount('+',112).gte(1)) player[this.layer].number = "750,000,000"
        if (getBuyableAmount('+',113).gte(1)) player[this.layer].number = "777,600,000"
        if (getBuyableAmount('+',114).gte(1)) player[this.layer].number = "987,654,321"
        if (getBuyableAmount('+',115).gte(1)) player[this.layer].number = "1,000,000,000"
        if (getBuyableAmount('+',121).gte(1)) player[this.layer].number = "1,000,000,001"
        if (getBuyableAmount('+',122).gte(1)) player[this.layer].number = "1,013,480,278"
        if (getBuyableAmount('+',123).gte(1)) player[this.layer].number = "1,073,741,824"
        if (getBuyableAmount('+',124).gte(1)) player[this.layer].number = "1,162,261,467"
        if (getBuyableAmount('+',125).gte(1)) player[this.layer].number = "1,621,609,416"
        if (getBuyableAmount('+',131).gte(1)) player[this.layer].number = "2,000,000,000"
        if (getBuyableAmount('+',132).gte(1)) player[this.layer].number = "2,176,782,336"
        if (getBuyableAmount('+',133).gte(1)) player[this.layer].number = "3,486,784,401"
        if (getBuyableAmount('+',134).gte(1)) player[this.layer].number = "4,000,000,000"
        if (getBuyableAmount('+',135).gte(1)) player[this.layer].number = "4,294,967,296"
        if (getBuyableAmount('+',141).gte(1)) player[this.layer].number = "5,000,000,000"
        if (getBuyableAmount('+',142).gte(1)) player[this.layer].number = "5,159,780,352"
        if (getBuyableAmount('+',143).gte(1)) player[this.layer].number = "5,368,709,120"
        if (getBuyableAmount('+',144).gte(1)) player[this.layer].number = "8,000,000,000"
        if (getBuyableAmount('+',145).gte(1)) player[this.layer].number = "10,000,000,000"
        if (getBuyableAmount('^',11).gte(1)) player[this.layer].number = "12,230,590,464"
        if (getBuyableAmount('^',12).gte(1)) player[this.layer].number = "12,586,269,025"
        if (getBuyableAmount('^',13).gte(1)) player[this.layer].number = "17,179,869,184"
        if (getBuyableAmount('^',14).gte(1)) player[this.layer].number = "20,000,000,000"
        if (getBuyableAmount('^',15).gte(1)) player[this.layer].number = "34,359,738,368"
        if (getBuyableAmount('x',131).gte(1)) player[this.layer].number = "46,656,000,000"
        if (getBuyableAmount('^',21).gte(1)) player[this.layer].number = "50,000,000,000"
        if (getBuyableAmount('x',132).gte(1)) player[this.layer].number = "56,712,564,736"
        if (getBuyableAmount('^',22).gte(1)) player[this.layer].number = "61,917,364,224"
        if (getBuyableAmount('^',23).gte(1)) player[this.layer].number = "100,000,000,000"
        if (getBuyableAmount('^',24).gte(1)) player[this.layer].number = "200,000,000,000"
        if (getBuyableAmount('^',25).gte(1)) player[this.layer].number = "282,429,536,481"
        if (getBuyableAmount('^',31).gte(1)) player[this.layer].number = "587,068,342,272"
        if (getBuyableAmount('^',32).gte(1)) player[this.layer].number = "847,288,609,443"
        if (getBuyableAmount('^',33).gte(1)) player[this.layer].number = "1,000,000,000,000"
        if (getBuyableAmount('^',34).gte(1)) player[this.layer].number = "1,000,000,000,001"
        if (getBuyableAmount('^',35).gte(1)) player[this.layer].number = "1,099,511,627,776"
        if (getBuyableAmount('^',41).gte(1)) player[this.layer].number = "1,307,674,368,000"
        if (getBuyableAmount('^',42).gte(1)) player[this.layer].number = "2,000,000,000,000"
        if (getBuyableAmount('^',43).gte(1)) player[this.layer].number = "2,821,109,907,456"
        if (getBuyableAmount('^',44).gte(1)) player[this.layer].number = "6,046,617,600,000"
        if (getBuyableAmount('x',133).gte(1)) player[this.layer].number = "6,704,425,700,000"
        if (getBuyableAmount('^',45).gte(1)) player[this.layer].number = "7,625,597,484,987"
        if (getBuyableAmount('^',111).gte(1)) player[this.layer].number = "8,916,100,448,256"
        if (getBuyableAmount('^',112).gte(1)) player[this.layer].number = "10,000,000,000,000"
        if (getBuyableAmount('^',113).gte(1)) player[this.layer].number = "17,592,186,044,416"
        if (getBuyableAmount('^',114).gte(1)) player[this.layer].number = "28,179,280,429,056"
        if (getBuyableAmount('^',115).gte(1)) player[this.layer].number = "35,184,372,088,832"
        if (getBuyableAmount('^',121).gte(1)) player[this.layer].number = "95,367,431,640,625"
        if (getBuyableAmount('^',122).gte(1)) player[this.layer].number = "100,000,000,000,000"
        if (getBuyableAmount('^',123).gte(1)) player[this.layer].number = "101,559,956,668,416"
        if (getBuyableAmount('^',124).gte(1)) player[this.layer].number = "141,167,095,653,376"
        if (getBuyableAmount('^',125).gte(1)) player[this.layer].number = "200,000,000,000,000"
        if (getBuyableAmount('^',131).gte(1)) player[this.layer].number = "205,891,132,094,649"
        if (getBuyableAmount('^',132).gte(1)) player[this.layer].number = "500,000,000,000,000"
        if (getBuyableAmount('^',133).gte(1)) player[this.layer].number = "562,949,953,421,312"
        if (getBuyableAmount('^',134).gte(1)) player[this.layer].number = "588,235,294,117,647"
        if (getBuyableAmount('^',135).gte(1)) player[this.layer].number = "800,000,000,000,000"
        if (getBuyableAmount('^',141).gte(1)) player[this.layer].number = "1,000,000,000,000,000"
        if (getBuyableAmount('^',142).gte(1)) player[this.layer].number = "1,000,000,000,000,001"
        if (getBuyableAmount('^',143).gte(1)) player[this.layer].number = "1,125,899,906,842,624"
        if (getBuyableAmount('^',144).gte(1)) player[this.layer].number = "1,352,605,460,594,688"
        if (getBuyableAmount('^',145).gte(1)) player[this.layer].number = "2,000,000,000,000,000"
        if (getBuyableAmount('^',51).gte(1)) player[this.layer].number = "3,656,158,440,062,976"
        if (getBuyableAmount('^',52).gte(1)) player[this.layer].number = "10,000,000,000,000,000"
        if (getBuyableAmount('^',53).gte(1)) player[this.layer].number = "15,407,021,574,586,368"
        if (getBuyableAmount('^',54).gte(1)) player[this.layer].number = "16,677,181,699,666,569"
        if (getBuyableAmount('^',55).gte(1)) player[this.layer].number = "21,042,141,113,214,300"
        if (getBuyableAmount('^',61).gte(1)) player[this.layer].number = "36,520,347,436,056,576"
        if (getBuyableAmount('^',62).gte(1)) player[this.layer].number = "50,031,545,098,999,707"
        if (getBuyableAmount('^',63).gte(1)) player[this.layer].number = "52,631,578,947,368,421"
        if (getBuyableAmount('^',64).gte(1)) player[this.layer].number = "64,925,062,108,545,024"
        if (getBuyableAmount('^',65).gte(1)) player[this.layer].number = "100,000,000,000,000,000"
        if (getBuyableAmount('^',71).gte(1)) player[this.layer].number = "144,115,188,075,855,872"
        if (getBuyableAmount('^',72).gte(1)) player[this.layer].number = "262,537,412,640,768,744"
        if (getBuyableAmount('^',73).gte(1)) player[this.layer].number = "604,661,760,000,000,000"
        if (getBuyableAmount('^',74).gte(1)) player[this.layer].number = "1,000,000,000,000,000,000"
        if (getBuyableAmount('^',75).gte(1)) player[this.layer].number = "1,000,000,000,000,000,001"
        if (getBuyableAmount('^',151).gte(1)) player[this.layer].number = "1,152,921,504,606,846,976"
        if (getBuyableAmount('^',152).gte(1)) player[this.layer].number = "1,234,567,890,123,456,789"
        if (getBuyableAmount('^',153).gte(1)) player[this.layer].number = "2,305,843,009,213,693,951"
        if (getBuyableAmount('^',154).gte(1)) player[this.layer].number = "2,432,902,008,176,640,000"
        if (getBuyableAmount('^',155).gte(1)) player[this.layer].number = "3,116,402,981,210,161,152"
        if (getBuyableAmount('^',161).gte(1)) player[this.layer].number = "4,738,381,338,321,616,896"
        if (getBuyableAmount('^',162).gte(1)) player[this.layer].number = "7,072,222,596,574,547,372"
        if (getBuyableAmount('^',163).gte(1)) player[this.layer].number = "10,000,000,000,000,000,000"
        if (getBuyableAmount('^',164).gte(1)) player[this.layer].number = "10,101,010,101,010,101,010"
        if (getBuyableAmount('^',165).gte(1)) player[this.layer].number = "12,157,665,459,056,928,801"
        if (getBuyableAmount('^',81).gte(1)) player[this.layer].number = "18,446,744,073,709,551,616"
        if (getBuyableAmount('^',82).gte(1)) player[this.layer].number = "22,222,222,222,222,222,222"
        if (getBuyableAmount('^',83).gte(1)) player[this.layer].number = "26,623,333,280,885,243,904"
        if (getBuyableAmount('^',84).gte(1)) player[this.layer].number = "34,867,844,010,000,000,000"
        if (getBuyableAmount('^',85).gte(1)) player[this.layer].number = "36,893,488,147,419,103,232"
        if (getBuyableAmount('^',91).gte(1)) player[this.layer].number = "44,444,444,444,444,444,444"
        if (getBuyableAmount('^',92).gte(1)) player[this.layer].number = "73,786,976,294,838,206,464"
        if (getBuyableAmount('^',93).gte(1)) player[this.layer].number = "98,545,646,747,949,848,242"
        if (getBuyableAmount('^',94).gte(1)) player[this.layer].number = "99,999,999,999,999,999,999"
        if (getBuyableAmount('^',95).gte(1)) player[this.layer].number = "100,000,000,000,000,000,000"
    },
    color: "#fff",
    requires: new MetaNum(10), // Can be a function that takes requirement increases into account
    resource: "succession points", // Name of prestige currency
    baseResource: "googology points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(1)
        mult = mult.times(buyableEffect('S',13))
        mult = mult.times(buyableEffect('S',14))
        mult = mult.times(buyableEffect('S',15))
        mult = mult.times(buyableEffect('S',21))
        mult = mult.times(buyableEffect('S',22))
        mult = mult.times(buyableEffect('S',23))
        mult = mult.times(buyableEffect('S',24))
        mult = mult.times(buyableEffect('S',25))
        mult = mult.times(buyableEffect('S',31))
        mult = mult.times(buyableEffect('S',32))
        mult = mult.times(buyableEffect('S',33))
        mult = mult.times(buyableEffect('S',34))
        mult = mult.times(buyableEffect('S',35))
        mult = mult.times(buyableEffect('S',41))
        mult = mult.times(buyableEffect('S',42))
        mult = mult.times(buyableEffect('S',43))
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
        if (hasUpgrade('S', 111)) mult = mult.times(upgradeEffect('S', 111))
        if (hasUpgrade('S', 112)) mult = mult.times(upgradeEffect('S', 112))
        if (hasUpgrade('S', 113)) mult = mult.times(upgradeEffect('S', 113))
        if (hasUpgrade('S', 114)) mult = mult.times(upgradeEffect('S', 114))
        if (hasUpgrade('S', 115)) mult = mult.times(upgradeEffect('S', 115))
        if (hasUpgrade('+', 51)) mult = mult.times(upgradeEffect('+', 51))
        if (hasUpgrade('+', 52)) mult = mult.times(upgradeEffect('+', 52))
        if (hasUpgrade('+', 53)) mult = mult.times(upgradeEffect('+', 53))
        if (hasUpgrade('+', 54)) mult = mult.times(upgradeEffect('+', 54))
        if (hasUpgrade('+', 55)) mult = mult.times(upgradeEffect('+', 55))
        if (hasUpgrade('+', 61)) mult = mult.times(upgradeEffect('+', 51))
        if (hasUpgrade('+', 62)) mult = mult.times(upgradeEffect('+', 52))
        if (hasUpgrade('+', 63)) mult = mult.times(upgradeEffect('+', 53))
        if (hasUpgrade('+', 64)) mult = mult.times(upgradeEffect('+', 54))
        if (hasUpgrade('+', 65)) mult = mult.times(upgradeEffect('+', 55))
        if (hasUpgrade('x', 63)) mult = mult.times(20)
        if (hasUpgrade('x', 64)) mult = mult.times(5)
        if (hasUpgrade('x', 65)) mult = mult.times(10)
        if (hasUpgrade('x', 71)) mult = mult.times(40)
        if (hasUpgrade('x', 72)) mult = mult.times(10)
        if (hasUpgrade('÷', 14)) mult = mult.times(1000)
        if (hasUpgrade('x', 73)) mult = mult.times(40)
        if (hasUpgrade('x', 74)) mult = mult.times(10)
        if (hasUpgrade('x', 75)) mult = mult.times(40)
        if (hasUpgrade('x', 81)) mult = mult.times(10)
        if (hasUpgrade('x', 82)) mult = mult.times(30)
        if (hasUpgrade('x', 83)) mult = mult.times(13.333)
        if (hasUpgrade('x', 84)) mult = mult.times(30)
        if (hasUpgrade('x', 85)) mult = mult.times(13.333)
        if (hasUpgrade('x', 91)) mult = mult.times(30)
        if (hasUpgrade('x', 92)) mult = mult.times(13.333)
        if (hasUpgrade('x', 93)) mult = mult.times(30)
        if (hasUpgrade('x', 94)) mult = mult.times(13.333)
        if (hasUpgrade('x', 95)) mult = mult.times(20)
        if (hasUpgrade('x', 101)) mult = mult.times(40)
        if (hasUpgrade('x', 102)) mult = mult.times(10)
        if (hasUpgrade('x', 103)) mult = mult.times(40)
        if (hasUpgrade('x', 104)) mult = mult.times(10)
        if (hasUpgrade('x', 105)) mult = mult.times(20)
        if (hasUpgrade('x', 111)) mult = mult.times(50)
        if (hasUpgrade('x', 112)) mult = mult.times(12.5)
        if (hasUpgrade('x', 113)) mult = mult.times(50)
        if (hasUpgrade('x', 114)) mult = mult.times(12.5)
        if (hasUpgrade('x', 115)) mult = mult.times(625)
        if (hasUpgrade('÷', 15)) mult = mult.times(100)
        if (hasUpgrade('+', 71)) mult = mult.times(upgradeEffect('+', 71))
        if (hasUpgrade('+', 72)) mult = mult.times(upgradeEffect('+', 72))
        if (hasUpgrade('+', 73)) mult = mult.times(upgradeEffect('+', 73))
        if (hasUpgrade('+', 74)) mult = mult.times(upgradeEffect('+', 74))
        if (hasUpgrade('+', 75)) mult = mult.times(upgradeEffect('+', 75))
        if (hasUpgrade('+', 81)) mult = mult.times(upgradeEffect('+', 71))
        if (hasUpgrade('+', 82)) mult = mult.times(upgradeEffect('+', 72))
        if (hasUpgrade('+', 83)) mult = mult.times(upgradeEffect('+', 73))
        if (hasUpgrade('+', 84)) mult = mult.times(upgradeEffect('+', 74))
        if (hasUpgrade('+', 85)) mult = mult.times(upgradeEffect('+', 75))
        mult = mult.times(buyableEffect('x',22))
        if (hasUpgrade('S', 124)) mult = mult.times(10)
        if (hasUpgrade('S', 125)) mult = mult.times(10)
        if (hasUpgrade('S', 131)) mult = mult.times(10)
        if (hasUpgrade('S', 132)) mult = mult.times(10)
        if (hasUpgrade('S', 133)) mult = mult.times(10)
        if (hasUpgrade('S', 134)) mult = mult.times(10)
        if (hasUpgrade('S', 135)) mult = mult.times(10)
        if (hasUpgrade('S', 141)) mult = mult.times(10)
        if (hasUpgrade('S', 142)) mult = mult.times(10)
        if (hasUpgrade('S', 143)) mult = mult.times(10)
        if (hasUpgrade('S', 144)) mult = mult.times(10)
        if (hasUpgrade('S', 145)) mult = mult.times(10)
        if (hasUpgrade('S', 151)) mult = mult.times(10)
        if (hasUpgrade('S', 152)) mult = mult.times(10)
        if (hasUpgrade('S', 153)) mult = mult.times(10)
        if (hasUpgrade('S', 154)) mult = mult.times(10)
        if (hasUpgrade('S', 155)) mult = mult.times(10)
        if (hasUpgrade('S', 161)) mult = mult.times(10)
        if (hasUpgrade('S', 162)) mult = mult.times(10)
        if (hasUpgrade('S', 163)) mult = mult.times(10)
        if (hasUpgrade('S', 164)) mult = mult.times(10)
        if (hasUpgrade('S', 165)) mult = mult.times(10)
        if (hasUpgrade('S', 171)) mult = mult.times(10)
        if (hasUpgrade('S', 172)) mult = mult.times(10)
        if (hasUpgrade('S', 173)) mult = mult.times(10)
        if (hasUpgrade('S', 174)) mult = mult.times(10)
        if (hasUpgrade('S', 175)) mult = mult.times(10)
        if (hasUpgrade('S', 181)) mult = mult.times(10)
        if (hasUpgrade('S', 182)) mult = mult.times(10)
        if (hasUpgrade('S', 183)) mult = mult.times(10)
        if (hasUpgrade('S', 184)) mult = mult.times(10)
        if (hasUpgrade('S', 185)) mult = mult.times(10)
        if (hasUpgrade('S', 191)) mult = mult.times(10)
        if (hasUpgrade('S', 192)) mult = mult.times(10)
        if (hasUpgrade('S', 193)) mult = mult.times(10)
        if (hasUpgrade('S', 194)) mult = mult.times(10)
        if (hasUpgrade('S', 195)) mult = mult.times(10)
        if (hasUpgrade('S', 201)) mult = mult.times(100)
        if (hasUpgrade('S', 202)) mult = mult.times(100)
        if (hasUpgrade('S', 203)) mult = mult.times(100)
        if (hasUpgrade('S', 204)) mult = mult.times(100)
        if (hasUpgrade('S', 205)) mult = mult.times(1000)
        mult = mult.times(buyableEffect('+',91))
        mult = mult.times(buyableEffect('+',92))
        mult = mult.times(buyableEffect('+',93))
        mult = mult.times(buyableEffect('+',94))
        mult = mult.times(buyableEffect('+',95))
        mult = mult.times(buyableEffect('+',101))
        mult = mult.times(buyableEffect('+',102))
        mult = mult.times(buyableEffect('+',103))
        mult = mult.times(buyableEffect('+',104))
        mult = mult.times(buyableEffect('+',105))
        mult = mult.times(buyableEffect('+',111))
        mult = mult.times(buyableEffect('+',112))
        mult = mult.times(buyableEffect('+',113))
        mult = mult.times(buyableEffect('+',114))
        mult = mult.times(buyableEffect('+',115))
        mult = mult.times(buyableEffect('+',121))
        mult = mult.times(buyableEffect('+',122))
        mult = mult.times(buyableEffect('+',123))
        mult = mult.times(buyableEffect('+',124))
        mult = mult.times(buyableEffect('+',125))
        mult = mult.times(buyableEffect('+',131))
        mult = mult.times(buyableEffect('+',132))
        mult = mult.times(buyableEffect('+',133))
        mult = mult.times(buyableEffect('+',134))
        mult = mult.times(buyableEffect('+',135))
        mult = mult.times(buyableEffect('+',141))
        mult = mult.times(buyableEffect('+',142))
        mult = mult.times(buyableEffect('+',143))
        mult = mult.times(buyableEffect('+',144))
        mult = mult.times(buyableEffect('^',10001))
        mult = mult.times(player['^'].expmult)
        mult = mult.times(buyableEffect('x',131))
        mult = mult.times(buyableEffect('x',132))
        mult = mult.times(buyableEffect('x',133))
        if (hasMilestone('^',8)) mult = mult.times(new MetaNum(player['^'].sqrtp).pow(1.4))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new MetaNum(1)
        if (inChallenge('^', 12)) exp = exp.mul(0.8)
        if (inChallenge('^', 21)) exp = exp.mul(0.64)
        return exp
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return true},
    hotkeys: [
        {key: "s", description: "s: succession reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        return (hasUpgrade('S',45)) || hasUpgrade('-',11) || (hasUpgrade('x',13) || hasMilestone('^',2))
    },
    autoUpgrade() {return false},
    automate() {
        if (hasMilestone("-", 1) || hasUpgrade('x',21) || hasMilestone('^',1)) {
            for (let i = 1; i < 6; i++) {
                buyUpgrade('S',i+10)
                buyBuyable('S',13)
                buyBuyable('S',14)
                buyBuyable('S',15)
                buyBuyable('S',i+20)
                buyBuyable('S',i+30)
                buyBuyable('S',41)
                buyBuyable('S',42)
                buyBuyable('S',43)
                buyUpgrade('S',i+40)
                buyUpgrade('S',i+50)
                buyUpgrade('S',i+60)
                buyUpgrade('S',i+70)
                buyUpgrade('S',i+80)
                if (hasUpgrade('x',41) || hasMilestone('^',1)) {buyUpgrade('S',i+90)}
                if (hasUpgrade('x',41) || hasMilestone('^',1)) {buyUpgrade('S',i+100)}
                if (hasUpgrade('x',75) || hasMilestone('^',1)) {buyUpgrade('S',i+110)}
                if (hasMilestone('÷',1) || hasMilestone('^',1)) {buyUpgrade('S',i+120)}
                if (hasMilestone('÷',1) || hasMilestone('^',1)) {buyUpgrade('S',i+130)}
                if (hasMilestone('÷',1) || hasMilestone('^',1)) {buyUpgrade('S',i+140)}
                if (hasMilestone('÷',1) || hasMilestone('^',1)) {buyUpgrade('S',i+150)}
                if (hasMilestone('÷',1) || hasMilestone('^',1)) {buyUpgrade('S',i+160)}
                if (hasMilestone('÷',1) || hasMilestone('^',1)) {buyUpgrade('S',i+170)}
                if (hasMilestone('÷',1) || hasMilestone('^',1)) {buyUpgrade('S',i+180)}
                if (hasMilestone('÷',1) || hasMilestone('^',1)) {buyUpgrade('S',i+190)}
                if (hasMilestone('÷',1) || hasMilestone('^',1)) {buyUpgrade('S',i+200)}
            }
        }
        if (hasUpgrade("-", 12) || hasUpgrade('x',22)) {
            buyBuyable('S',11)
        }
    },
    tabFormat: {
        "Numbers": {
            content: ['main-display','prestige-button',['row', [['upgrade',11], ['upgrade',12], ['buyable',13], ['buyable', 14], ['buyable', 15]]],['row', [['buyable',21], ['buyable',22], ['buyable',23], ['buyable', 24], ['buyable', 25]]],['row', [['buyable',31], ['buyable',32], ['buyable',33], ['buyable', 34], ['buyable', 35]]],['row', [['buyable',41], ['buyable',42], ['buyable',43], ['upgrade', 44], ['upgrade', 45]]],['upgrades',[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]]],
        },
        "Functions": {
            content: ['main-display','prestige-button',['buyable',11]],
        },
    },
    upgrades: {
        11: {
        title: "Zero",
        description: "Succession points boost googology points gain.",
        cost: new MetaNum(1),
        effect() {
            return player[this.layer].points.add(1).pow(0.5).div(player[this.layer].points.add(1).pow(0.5).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        12: {
        title: "Infinitesimal",
        description: "Succession points boost googology points gain again.",
        cost: new MetaNum(3),
        effect() {
            return player[this.layer].points.add(1).pow(0.25).div(player[this.layer].points.add(1).pow(0.25).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        44: {
        title: "One",
        description: "Googology points boost their own gain.",
        cost: new MetaNum(4000),
        effect() {
            return player.points.add(1).pow(0.15).div(player.points.add(1).pow(0.15).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        45: {
        title: "Mills' Constant",
        description: "Googology points boost their own gain again, and gain 100% of succession points per second.",
        cost: new MetaNum(7500),
        effect() {
            return player.points.add(1).pow(0.1).div(player.points.add(1).pow(0.1).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        51: {
        title: "Yiutu",
        description: "First softcap, eh? x2.5 googology point gain.",
        cost: new MetaNum(1500000),
        unlocked(){return (hasUpgrade("S",44))}
        },
        52: {
        title: "Golden Ratio",
        description: "Another x2.5 googology point gain. Ykw, we might need a buyable to repeat that!",
        cost: new MetaNum(5000000),
        unlocked(){return (hasUpgrade("S",44))}
        },
        53: {
        title: "Clover mite-crumb",
        description: "Googology points boost their own gain again.",
        cost: new MetaNum(25000000),
        effect() {
            return player.points.add(1).pow(0.05).div(player.points.add(1).pow(0.05).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        54: {
        title: "Sierpinski's Constant",
        description: "Googology points boost their own gain again.",
        cost: new MetaNum(100000000),
        effect() {
            return player.points.add(1).pow(0.04).div(player.points.add(1).pow(0.04).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        55: {
        title: "Euler's Number",
        description: "Googology points boost their own gain again.",
        cost: new MetaNum(400000000),
        effect() {
            return player.points.add(1).pow(0.03).div(player.points.add(1).pow(0.03).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        61: {
        title: "Ternary-Goonol",
        description: "Googology points boost succession point gain.",
        cost: new MetaNum(2.5e9),
        effect() {
            return player.points.add(1).pow(0.0275).div(player.points.add(1).pow(0.0275).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        62: {
        title: "Pi",
        description: "Googology points boost succession point gain again.",
        cost: new MetaNum(1.5e10),
        effect() {
            return player.points.add(1).pow(0.0225).div(player.points.add(1).pow(0.0225).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        63: {
        title: "Binary-Goonolplex",
        description: "Googology points boost succession point gain again.",
        cost: new MetaNum(5e10),
        effect() {
            return player.points.add(1).pow(0.0175).div(player.points.add(1).pow(0.0175).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        64: {
        title: "Trigintiprimis",
        description: "Googology points boost succession point gain again.",
        cost: new MetaNum(2e11),
        effect() {
            return player.points.add(1).pow(0.0125).div(player.points.add(1).pow(0.0125).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        65: {
        title: "Sjyp",
        description: "Googology points boost succession point gain again.",
        cost: new MetaNum(3e11),
        effect() {
            return player.points.add(1).pow(0.01).div(player.points.add(1).pow(0.01).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("S",44))}
        },
        71: {
        title: "Yibase",
        description: "x3.2 googology point gain.",
        cost: new MetaNum(5e11),
        unlocked(){return (hasUpgrade("S",44))}
        },
        72: {
        title: "Blue bilby",
        description: "x3 googology point gain.",
        cost: new MetaNum(2e12),
        unlocked(){return (hasUpgrade("S",44))}
        },
        73: {
        title: "Tau",
        description: "x2.8 googology point gain.",
        cost: new MetaNum(6e12),
        unlocked(){return (hasUpgrade("S",44))}
        },
        74: {
        title: "Gagtwo",
        description: "x2.7 googology point gain.",
        cost: new MetaNum(2.5e13),
        unlocked(){return (hasUpgrade("S",44))}
        },
        75: {
        title: "Octal-Goonol",
        description: "x2.3 googology point gain.",
        cost: new MetaNum(7.5e13),
        unlocked(){return (hasUpgrade("S",44))}
        },
        81: {
        title: "Ternary-Goodol",
        description: "x2 googology point gain.",
        cost: new MetaNum(2.5e14),
        unlocked(){return (hasUpgrade("S",44))}
        },
        82: {
        title: "Onety",
        description: "x1.2 googology point gain, and unlock a new layer.",
        cost: new MetaNum(7.5e14),
        unlocked(){return (hasUpgrade("S",44))}
        },
        83: {
        title: "Dozen",
        description: "x4 googology point gain.",
        cost: new MetaNum(1),
        unlocked(){return (hasUpgrade("+",11))}
        },
        84: {
        title: "Baker's Dozen",
        description: "x3 googology point gain.",
        cost: new MetaNum(1e5),
        unlocked(){return (hasUpgrade("+",11))}
        },
        85: {
        title: "Poulter's Dozen",
        description: "x2 googology point gain.",
        cost: new MetaNum(1e10),
        unlocked(){return (hasUpgrade("+",11))}
        },
        91: {
        title: "Sesquiwonx",
        description: "x3 succession point gain.",
        cost: new MetaNum(1e6),
        unlocked(){return (hasUpgrade("x",11))}
        },
        92: {
        title: "Twelfty",
        description: "x3 succession point gain.",
        cost: new MetaNum(1e15),
        unlocked(){return (hasUpgrade("x",11))}
        },
        93: {
        title: "Thirteenty",
        description: "x3 succession point gain.",
        cost: new MetaNum(1e45),
        unlocked(){return (hasUpgrade("x",11))}
        },
        94: {
        title: "Ternary-eyelash mite",
        description: "x3 succession point gain.",
        cost: new MetaNum(1e60),
        unlocked(){return (hasUpgrade("x",11))}
        },
        95: {
        title: "End run",
        description: "x3 succession point gain.",
        cost: new MetaNum(1e65),
        unlocked(){return (hasUpgrade("x",11))}
        },
        101: {
        title: "Ternary-gooqnol",
        description: "x3 succession point gain.",
        cost: new MetaNum(1e70),
        unlocked(){return (hasUpgrade("x",11))}
        },
        102: {
        title: "Dancing dragon",
        description: "x3 succession point gain.",
        cost: new MetaNum(1e75),
        unlocked(){return (hasUpgrade("x",11))}
        },
        103: {
        title: "Centzontli",
        description: "x3 succession point gain.",
        cost: new MetaNum(1e80),
        unlocked(){return (hasUpgrade("x",11))}
        },
        104: {
        title: "Ternary-clover mite",
        description: "x3 succession point gain.",
        cost: new MetaNum(1e85),
        unlocked(){return (hasUpgrade("x",11))}
        },
        105: {
        title: "Tho",
        description: "x3 succession point gain.",
        cost: new MetaNum(1e90),
        unlocked(){return (hasUpgrade("x",11))}
        },
        111: {
        title: "Wärämäkä",
        description: "Succession points boost succession point gain.",
        cost: new MetaNum(5e123),
        effect() {
            return player[this.layer].points.add(1).pow(0.0025).div(player[this.layer].points.add(1).pow(0.0025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        112: {
        title: "Cenxiquipilli",
        description: "Succession points boost succession point gain again.",
        cost: new MetaNum(1e124),
        effect() {
            return player[this.layer].points.add(1).pow(0.0025).div(player[this.layer].points.add(1).pow(0.0025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        113: {
        title: "Ycibelc",
        description: "Succession points boost succession point gain again.",
        cost: new MetaNum(5e126),
        effect() {
            return player[this.layer].points.add(1).pow(0.0025).div(player[this.layer].points.add(1).pow(0.0025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        114: {
        title: "Petadollaxul",
        description: "Succession points boost succession point gain again.",
        cost: new MetaNum(1.5e127),
        effect() {
            return player[this.layer].points.add(1).pow(0.0025).div(player[this.layer].points.add(1).pow(0.0025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        115: {
        title: "Supercube",
        description: "Succession points boost succession point gain again.",
        cost: new MetaNum(1e128),
        effect() {
            return player[this.layer].points.add(1).pow(0.0025).div(player[this.layer].points.add(1).pow(0.0025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        121: {
        title: "Welkillillion",
        description: "Succession points boost subexponential point gain.",
        cost: new MetaNum(1e229),
        effect() {
            if (hasMilestone('^',4)) return player[this.layer].points.add(1).div(1e150).pow(0.0025).max(1).pow(2.4).min(1000)
            else return player[this.layer].points.add(1).div(1e150).pow(0.0025).max(1).min(1000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("x",121))}
        },
        122: {
        title: "Guppybit",
        description: "Addition points boost subexponential point gain.",
        cost: new MetaNum(1e230),
        effect() {
            return player['+'].points.add(1).div(1e60).pow(0.02).max(1).min(1000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("x",121))}
        },
        123: {
        title: "Killer",
        description: "Multiplication points boost subexponential point gain. No more subexponential point upgrades (for now)...",
        cost: new MetaNum(1e231),
        effect() {
            return player['x'].points.add(1).div(1e19).pow(0.05).max(1).min(1000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("x",121))}
        },
        124: {
        title: "Wściekłość",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e233),
        unlocked(){return (hasUpgrade("x",121))}
        },
        125: {
        title: "Aspirin",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e234),
        unlocked(){return (hasUpgrade("x",121))}
        },
        131: {
        title: "Ruin",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e235),
        unlocked(){return (hasUpgrade("x",121))}
        },
        132: {
        title: "Kyran",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e237),
        unlocked(){return (hasUpgrade("x",121))}
        },
        133: {
        title: "Iaq",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e238),
        unlocked(){return (hasUpgrade("x",121))}
        },
        134: {
        title: "Algardome",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e240),
        unlocked(){return (hasUpgrade("x",121))}
        },
        135: {
        title: "Biexian",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e242),
        unlocked(){return (hasUpgrade("x",121))}
        },
        141: {
        title: "Heads-Tri-1-primol",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e243),
        unlocked(){return (hasUpgrade("x",121))}
        },
        142: {
        title: "Clover mite-bunch",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e245),
        unlocked(){return (hasUpgrade("x",121))}
        },
        143: {
        title: "Octal-pipsqueak",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e247),
        unlocked(){return (hasUpgrade("x",121))}
        },
        144: {
        title: "Januaryillion",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e249),
        unlocked(){return (hasUpgrade("x",121))}
        },
        145: {
        title: "Kilogross",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e251),
        unlocked(){return (hasUpgrade("x",121))}
        },
        151: {
        title: "Gooprovi",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e253),
        unlocked(){return (hasUpgrade("x",121))}
        },
        152: {
        title: "Trooprovi",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e255),
        unlocked(){return (hasUpgrade("x",121))}
        },
        153: {
        title: "Quadrooprovi",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e256),
        unlocked(){return (hasUpgrade("x",121))}
        },
        154: {
        title: "Texclamation",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e257),
        unlocked(){return (hasUpgrade("x",121))}
        },
        155: {
        title: "Nalowale",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e259),
        unlocked(){return (hasUpgrade("x",121))}
        },
        161: {
        title: "Curry",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e261),
        unlocked(){return (hasUpgrade("x",121))}
        },
        162: {
        title: "Krwawa podłoga w świetle księżyca dwóch tysięcy dwudziestu pięciu (samobójcze)",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e263),
        unlocked(){return (hasUpgrade("x",121))}
        },
        163: {
        title: "Februaryillion",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e264),
        unlocked(){return (hasUpgrade("x",121))}
        },
        164: {
        title: "Left",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e266),
        unlocked(){return (hasUpgrade("x",121))}
        },
        165: {
        title: "Tetrus",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e267),
        unlocked(){return (hasUpgrade("x",121))}
        },
        171: {
        title: "Marchillion",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e269),
        unlocked(){return (hasUpgrade("x",121))}
        },
        172: {
        title: "Aprilillion",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e271),
        unlocked(){return (hasUpgrade("x",121))}
        },
        173: {
        title: "Fablo",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e272),
        unlocked(){return (hasUpgrade("x",121))}
        },
        174: {
        title: "Vazhil",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e274),
        unlocked(){return (hasUpgrade("x",121))}
        },
        175: {
        title: "Crore",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e276),
        unlocked(){return (hasUpgrade("x",121))}
        },
        181: {
        title: "Mayillion",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e277),
        unlocked(){return (hasUpgrade("x",121))}
        },
        182: {
        title: "Ternary-small fry",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e278),
        unlocked(){return (hasUpgrade("x",121))}
        },
        183: {
        title: "Juneillion",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e280),
        unlocked(){return (hasUpgrade("x",121))}
        },
        184: {
        title: "Tangerine",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e282),
        unlocked(){return (hasUpgrade("x",121))}
        },
        185: {
        title: "Czerwony sznur losu",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e284),
        unlocked(){return (hasUpgrade("x",121))}
        },
        191: {
        title: "Binary-minnowchunk",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e286),
        unlocked(){return (hasUpgrade("x",121))}
        },
        192: {
        title: "Julyillion",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e287),
        unlocked(){return (hasUpgrade("x",121))}
        },
        193: {
        title: "Augustillion",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e289),
        unlocked(){return (hasUpgrade("x",121))}
        },
        194: {
        title: "Septemberillion",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e291),
        unlocked(){return (hasUpgrade("x",121))}
        },
        195: {
        title: "Klos",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e292),
        unlocked(){return (hasUpgrade("x",121))}
        },
        201: {
        title: "Octoberillion",
        description: "x100 succession point gain.",
        cost: new MetaNum(1e294),
        unlocked(){return (hasUpgrade("x",121))}
        },
        202: {
        title: "Novemberillion",
        description: "x100 succession point gain.",
        cost: new MetaNum(1e297),
        unlocked(){return (hasUpgrade("x",121))}
        },
        203: {
        title: "Decemberillion",
        description: "x100 succession point gain.",
        cost: new MetaNum(1e300),
        unlocked(){return (hasUpgrade("x",121))}
        },
        204: {
        title: "Love",
        description: "x100 succession point gain.",
        cost: new MetaNum(1e302),
        unlocked(){return (hasUpgrade("x",121))}
        },
        205: {
        title: "Sesquillion",
        description: "This is the last one-time upgrade for now. x1,000 succession point gain.",
        cost: new MetaNum(1e306),
        unlocked(){return (hasUpgrade("x",121))}
        },
    },
    buyables: {
        11: {
            cost(x) { return new MetaNum(10000000).mul(new MetaNum(100).pow(x)) },
            title: "f0(n)",
            display() { return `x2.5 googology point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(2.5).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                if (!hasUpgrade('-',13)) player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 25,
            unlocked(){return (hasUpgrade("S",52))}
        },
        13: {
            cost(x) { return new MetaNum(1) },
            title: "Plasmarillion",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 10,
            unlocked(){return (hasUpgrade("S",12))}
        },
        14: {
            cost(x) { return new MetaNum(1.2) },
            title: "Eyelash mite-speck",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 10,
            unlocked(){return (hasUpgrade("S",12))}
        },
        15: {
            cost(x) { return new MetaNum(1.4) },
            title: "Dust mite-speck",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 11,
            unlocked(){return (hasUpgrade("S",12))}
        },
        21: {
            cost(x) { return new MetaNum(1.6) },
            title: "Cheese mite-speck",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 12,
            unlocked(){return (hasUpgrade("S",12))}
        },
        22: {
            cost(x) { return new MetaNum(1.8) },
            title: "Plasmillion",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 13,
            unlocked(){return (hasUpgrade("S",12))}
        },
        23: {
            cost(x) { return new MetaNum(2) },
            title: "Clover mite-speck",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 14,
            unlocked(){return (hasUpgrade("S",12))}
        },
        24: {
            cost(x) { return new MetaNum(2.2) },
            title: "Affordable",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 15,
            unlocked(){return (hasUpgrade("S",12))}
        },
        25: {
            cost(x) { return new MetaNum(2.5) },
            title: "Polaritillion",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 16,
            unlocked(){return (hasUpgrade("S",12))}
        },
        31: {
            cost(x) { return new MetaNum(3) },
            title: "Polarillion",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 17,
            unlocked(){return (hasUpgrade("S",12))}
        },
        32: {
            cost(x) { return new MetaNum(3.5) },
            title: "One-leaf Clover",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 18,
            unlocked(){return (hasUpgrade("S",12))}
        },
        33: {
            cost(x) { return new MetaNum(4) },
            title: "Rotillion",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 19,
            unlocked(){return (hasUpgrade("S",12))}
        },
        34: {
            cost(x) { return new MetaNum(4.5) },
            title: "Triollion",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
            unlocked(){return (hasUpgrade("S",12))}
        },
        35: {
            cost(x) { return new MetaNum(5.5) },
            title: "Eyelash mite-crumb",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 21,
            unlocked(){return (hasUpgrade("S",12))}
        },
        41: {
            cost(x) { return new MetaNum(7) },
            title: "Aarex's Funny Number",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 23,
            unlocked(){return (hasUpgrade("S",12))}
        },
        42: {
            cost(x) { return new MetaNum(10) },
            title: "Dust mite-crumb",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 25,
            unlocked(){return (hasUpgrade("S",12))}
        },
        43: {
            cost(x) { return new MetaNum(15) },
            title: "Cheese mite-crumb",
            display() { return `+1% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer,this.id)).mul(0.01).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 28,
            unlocked(){return (hasUpgrade("S",12))}
        },
    },
})
addLayer("+", {
    name: "addition points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    nodeStyle() { return {
        background: "radial-gradient( #70FF75, #B8FFBA)",
    }},
    branches: ['S'],
    startData() { return {
        unlocked: true,
		points: new MetaNum(0),
        total: new MetaNum(0),
    }},
    color: "#70FF75",
    requires: new MetaNum(1e15), // Can be a function that takes requirement increases into account
    resource: "addition points", // Name of prestige currency
    baseResource: "succession points", // Name of resource prestige is based on
    baseAmount() {return player.S.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(1)
        if (hasUpgrade('x', 11)) mult = mult.times(2)
        if (hasUpgrade('+', 43)) mult = mult.times(2)
        if (hasUpgrade('+', 44)) mult = mult.times(2)
        if (hasUpgrade('+', 45)) mult = mult.times(2)
        if (hasUpgrade('-', 34)) mult = mult.times(2.5)
        mult = mult.times(buyableEffect('^',10002))
        mult = mult.times(player['^'].expmult)
        if (hasMilestone('^',8)) mult = mult.times(new MetaNum(player['^'].sqrtp).pow(0.9))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new MetaNum(1)
        if (inChallenge('^', 12)) exp = exp.mul(0.8)
        if (inChallenge('^', 21)) exp = exp.mul(0.64)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('S',82) || player[this.layer].total.gte(1))},
    hotkeys: [
        {key: "+", description: "+: addition reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        return hasUpgrade('x',15) || hasMilestone('^',3)
    },
    autoUpgrade() {return false},
    automate() {
        if (hasUpgrade('x',33) || hasMilestone('^', 1)) {
            for (let i = 1; i < 6; i++) {
                buyUpgrade(this.layer,i+10)
                buyUpgrade(this.layer,i+20)
                buyUpgrade(this.layer,i+30)
                buyUpgrade(this.layer,i+40)
                if (hasUpgrade('x',75) || hasMilestone('^', 1)) {buyUpgrade(this.layer,i+50)}
                if (hasUpgrade('x',75) || hasMilestone('^', 1)) {buyUpgrade(this.layer,i+60)}
                if (hasMilestone('^', 1)) {buyUpgrade(this.layer,i+70)}
                if (hasMilestone('^', 1)) {buyUpgrade(this.layer,i+80)}
                if (hasMilestone('^', 2)) {buyBuyable(this.layer,i+90)}
                if (hasMilestone('^', 2)) {buyBuyable(this.layer,i+100)}
                if (hasMilestone('^', 2)) {buyBuyable(this.layer,i+110)}
                if (hasMilestone('^', 2)) {buyBuyable(this.layer,i+120)}
                if (hasMilestone('^', 2)) {buyBuyable(this.layer,i+130)}
                if (hasMilestone('^', 2)) {buyBuyable(this.layer,i+140)}
            }
        }
        if (hasUpgrade('x',24)) {
            buyBuyable(this.layer,11)
        }
    },
    tabFormat: {
        "Numbers": {
            content: ['main-display','prestige-button','upgrades',['row', [['buyable',91], ['buyable',92], ['buyable',93], ['buyable', 94], ['buyable', 95]]],['row', [['buyable',101], ['buyable',102], ['buyable',103], ['buyable', 104], ['buyable', 105]]],['row', [['buyable',111], ['buyable',112], ['buyable',113], ['buyable', 114], ['buyable', 115]]],['row', [['buyable',121], ['buyable',122], ['buyable',123], ['buyable', 124], ['buyable', 125]]],['row', [['buyable',131], ['buyable',132], ['buyable',133], ['buyable', 134], ['buyable', 135]]],['row', [['buyable',141], ['buyable',142], ['buyable',143], ['buyable', 144], ['buyable', 145]]]],
        },
        "Functions": {
            content: ['main-display','prestige-button',['buyable',11]],
        },
    },
    upgrades: {
        11: {
        title: "Zeralum",
        description: "Unlock new succession upgrades.",
        cost: new MetaNum(1),
        },
        12: {
        title: "Hex",
        description: "Total addition points boost googology point gain.",
        cost: new MetaNum(2),
        effect() {
            return player['+'].total.pow(0.75).add(2).div(player['+'].total.pow(0.75).add(2).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        13: {
        title: "Tus",
        description: "Total addition points boost succession point gain.",
        cost: new MetaNum(3),
        effect() {
            return player['+'].total.pow(0.4).add(2).div(player['+'].total.pow(0.4).add(2).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        14: {
        title: "Thirsy",
        description: "Unspent addition points boost googology point gain.",
        cost: new MetaNum(9),
        effect() {
            return player['+'].points.pow(0.4).add(2).div(player['+'].points.pow(0.4).add(2).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        15: {
        title: "Twoty",
        description: "Unspent addition points boost succession point gain, and unlock a new layer.",
        cost: new MetaNum(20),
        effect() {
            return player['+'].points.pow(0.2).add(2).div(player['+'].points.pow(0.2).add(2).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        },
        21: {
        title: "Long Score",
        description: "x1.75 succession point gain.",
        cost: new MetaNum(75),
        },
        22: {
        title: "Dumevalka",
        description: "x1.8 succession point gain.",
        cost: new MetaNum(150),
        },
        23: {
        title: "King's dozen",
        description: "x1.85 succession point gain.",
        cost: new MetaNum(450),
        },
        24: {
        title: "Gaz",
        description: "x1.8 succession point gain.",
        cost: new MetaNum(1500),
        },
        25: {
        title: "Foursy",
        description: "x1.75 succession point gain, and unlock new stuff.",
        cost: new MetaNum(3000),
        },
        31: {
        title: "Binary-eyelash mite",
        description: "x1.8 googology point and succession point gain.",
        cost: new MetaNum(200000),
        unlocked(){return (hasUpgrade("+",25))}
        },
        32: {
        title: "Sevensy",
        description: "x1.75 googology point and succession point gain.",
        cost: new MetaNum(500000),
        unlocked(){return (hasUpgrade("+",25))}
        },
        33: {
        title: "Fibonax",
        description: "x1.8 googology point and succession point gain.",
        cost: new MetaNum(25000000),
        unlocked(){return (hasUpgrade("+",25))}
        },
        34: {
        title: "Gag-three",
        description: "x1.85 googology point and succession point gain.",
        cost: new MetaNum(300000000),
        unlocked(){return (hasUpgrade("+",25))}
        },
        35: {
        title: "Elevensy",
        description: "x1.9 googology point and succession point gain.",
        cost: new MetaNum(1500000000),
        unlocked(){return (hasUpgrade("+",25))}
        },
        41: {
        title: "Garnine",
        description: "x1.85 googology point and succession point gain.",
        cost: new MetaNum(5e9),
        unlocked(){return (hasUpgrade("+",25))}
        },
        42: {
        title: "Binary-cheese mite",
        description: "x10 googology point gain.",
        cost: new MetaNum(1000),
        unlocked(){return (hasUpgrade("x",11))}
        },
        43: {
        title: "Long gross",
        description: "x2 addition point gain.",
        cost: new MetaNum(1e15),
        unlocked(){return (hasUpgrade("x",11))}
        },
        44: {
        title: "Sesquibuckles",
        description: "x2 addition point gain.",
        cost: new MetaNum(1e18),
        unlocked(){return (hasUpgrade("x",11))}
        },
        45: {
        title: "Sesquitreys",
        description: "x2 addition point gain.",
        cost: new MetaNum(1e21),
        unlocked(){return (hasUpgrade("x",11))}
        },
        51: {
        title: "Falen",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(4e37),
        effect() {
            return player[this.layer].points.add(1).pow(0.025).div(player[this.layer].points.add(1).pow(0.025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        52: {
        title: "Cibelcy",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(1e38),
        effect() {
            return player[this.layer].points.add(1).pow(0.025).div(player[this.layer].points.add(1).pow(0.025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        53: {
        title: "Exadollaxul",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(2e38),
        effect() {
            return player[this.layer].points.add(1).pow(0.025).div(player[this.layer].points.add(1).pow(0.025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        54: {
        title: "Heads-Hexprimol",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(7e38),
        effect() {
            return player[this.layer].points.add(1).pow(0.025).div(player[this.layer].points.add(1).pow(0.025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        55: {
        title: "Pi-ty thousand",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(2e39),
        effect() {
            return player[this.layer].points.add(1).pow(0.025).div(player[this.layer].points.add(1).pow(0.025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        61: {
        title: "Cubesuper",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(2e40),
        effect() {
            return player[this.layer].points.add(1).pow(0.025).div(player[this.layer].points.add(1).pow(0.025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        62: {
        title: "Kini",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(4e40),
        effect() {
            return player[this.layer].points.add(1).pow(0.025).div(player[this.layer].points.add(1).pow(0.025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        63: {
        title: "Fzsix",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(2e41),
        effect() {
            return player[this.layer].points.add(1).pow(0.025).div(player[this.layer].points.add(1).pow(0.025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        64: {
        title: "Dust mite",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(5e41),
        effect() {
            return player[this.layer].points.add(1).pow(0.025).div(player[this.layer].points.add(1).pow(0.025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        65: {
        title: "Little Straight",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(1.5e42),
        effect() {
            return player[this.layer].points.add(1).pow(0.025).div(player[this.layer].points.add(1).pow(0.025).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("n",105))}
        },
        71: {
        title: "One weekillion",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(1e62),
        effect() {
            return player[this.layer].points.add(1).pow(0.015).div(player[this.layer].points.add(1).pow(0.015).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("÷",15))}
        },
        72: {
        title: "Dreiviertelmillion",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(2.5e62),
        effect() {
            return player[this.layer].points.add(1).pow(0.015).div(player[this.layer].points.add(1).pow(0.015).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("÷",15))}
        },
        73: {
        title: "Aopz pz aol luk, pzu'a pa?",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(4e62),
        effect() {
            return player[this.layer].points.add(1).pow(0.015).div(player[this.layer].points.add(1).pow(0.015).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("÷",15))}
        },
        74: {
        title: "Wilkillion",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(8e62),
        effect() {
            return player[this.layer].points.add(1).pow(0.015).div(player[this.layer].points.add(1).pow(0.015).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("÷",15))}
        },
        75: {
        title: "Cheese mite-bunch",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(3e63),
        effect() {
            return player[this.layer].points.add(1).pow(0.015).div(player[this.layer].points.add(1).pow(0.015).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("÷",15))}
        },
        81: {
        title: "Fzseven",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(1.25e64),
        effect() {
            return player[this.layer].points.add(1).pow(0.015).div(player[this.layer].points.add(1).pow(0.015).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("÷",15))}
        },
        82: {
        title: "Ads",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(2.5e64),
        effect() {
            return player[this.layer].points.add(1).pow(0.015).div(player[this.layer].points.add(1).pow(0.015).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("÷",15))}
        },
        83: {
        title: "Welkillion",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(5e64),
        effect() {
            return player[this.layer].points.add(1).pow(0.015).div(player[this.layer].points.add(1).pow(0.015).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("÷",15))}
        },
        84: {
        title: "Srae",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(1e65),
        effect() {
            return player[this.layer].points.add(1).pow(0.015).div(player[this.layer].points.add(1).pow(0.015).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("÷",15))}
        },
        85: {
        title: "Zeus",
        description: "Addition points boost succession point gain.",
        cost: new MetaNum(5e65),
        effect() {
            return player[this.layer].points.add(1).pow(0.015).div(player[this.layer].points.add(1).pow(0.015).max(1000).div(1000).pow(0.9)).min(1000000)
        },
        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
        unlocked(){return (hasUpgrade("÷",15))}
        },
    },
    buyables: {
        11: {
            cost(x) { return new MetaNum(5000).mul(new MetaNum(2.5).pow(new MetaNum(x).pow(1.5))) },
            title: "f0^m(n)",
            display() { return `x(Succession point^0.01) succession point gain.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
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
        91: {
            cost(x) { return new MetaNum(1e91).mul(new MetaNum(2).pow(new MetaNum(x))) },
            title: "Minnowbit",
            display() { return `+100% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 99,
            unlocked(){return (hasUpgrade("S",205))}
        },
        92: {
            cost(x) { return new MetaNum(3e91).mul(new MetaNum(2).pow(new MetaNum(x))) },
            title: "Ametrillion",
            display() { return `+100% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 99,
            unlocked(){return (hasUpgrade("S",205))}
        },
        93: {
            cost(x) { return new MetaNum(9e91).mul(new MetaNum(2).pow(new MetaNum(x))) },
            title: "Alau",
            display() { return `+100% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 99,
            unlocked(){return (hasUpgrade("S",205))}
        },
        94: {
            cost(x) { return new MetaNum(3e92).mul(new MetaNum(2).pow(new MetaNum(x))) },
            title: "Yi",
            display() { return `+100% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 99,
            unlocked(){return (hasUpgrade("S",205))}
        },
        95: {
            cost(x) { return new MetaNum(1.5e93).mul(new MetaNum(2).pow(new MetaNum(x))) },
            title: "Gooprovij",
            display() { return `+100% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 99,
            unlocked(){return (hasUpgrade("S",205))}
        },
        101: {
            cost(x) { return new MetaNum(3.5e93).mul(new MetaNum(2).pow(new MetaNum(x))) },
            title: "(II–)Sulfatrillion",
            display() { return `+100% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 99,
            unlocked(){return (hasUpgrade("S",205))}
        },
        102: {
            cost(x) { return new MetaNum(8e93).mul(new MetaNum(2).pow(new MetaNum(x))) },
            title: "Till",
            display() { return `+100% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 99,
            unlocked(){return (hasUpgrade("S",205))}
        },
        103: {
            cost(x) { return new MetaNum(2e94).mul(new MetaNum(2).pow(new MetaNum(x))) },
            title: "Pentus",
            display() { return `+100% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 99,
            unlocked(){return (hasUpgrade("S",205))}
        },
        104: {
            cost(x) { return new MetaNum(8e94).mul(new MetaNum(2).pow(new MetaNum(x))) },
            title: "The speed of light",
            display() { return `+100% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 99,
            unlocked(){return (hasUpgrade("S",205))}
        },
        105: {
            cost(x) { return new MetaNum(4e95).mul(new MetaNum(2).pow(new MetaNum(x))) },
            title: "Fznine",
            display() { return `+100% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 99,
            unlocked(){return (hasUpgrade("S",205))}
        },
        111: {
            cost(x) { return new MetaNum(1.5e97).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Nogil",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        112: {
            cost(x) { return new MetaNum(7e97).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Dreiviertelmilliarde",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        113: {
            cost(x) { return new MetaNum(2e98).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Sexagesimal-qoonol",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        114: {
            cost(x) { return new MetaNum(8e98).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Cyanide",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        115: {
            cost(x) { return new MetaNum(1.5e100).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Billion",
            display() { return `WOW! A BILLION??? You're getting closer to a new operation! +300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        121: {
            cost(x) { return new MetaNum(2e101).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Giga-Zeralum",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        122: {
            cost(x) { return new MetaNum(5e101).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Chciwość",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        123: {
            cost(x) { return new MetaNum(1e102).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Binary-gobycrumb",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        124: {
            cost(x) { return new MetaNum(5e102).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Ternary-guppychunk",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        125: {
            cost(x) { return new MetaNum(2e104).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Dramala",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        131: {
            cost(x) { return new MetaNum(2e106).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Eyelash mite-crowd",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        132: {
            cost(x) { return new MetaNum(5e106).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Triexian",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        133: {
            cost(x) { return new MetaNum(2e107).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Ternary-guppy",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        134: {
            cost(x) { return new MetaNum(5e107).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Sagan",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        135: {
            cost(x) { return new MetaNum(1.5e108).mul(new MetaNum(4).pow(new MetaNum(x))) },
            title: "Binary-Gooqnolplex",
            display() { return `+300% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(3).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 33,
            unlocked(){return (hasUpgrade("S",205))}
        },
        141: {
            cost(x) { return new MetaNum(5e109).mul(new MetaNum(6).pow(new MetaNum(x))) },
            title: "Dust mite-crowd",
            display() { return `+900% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(9).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 11,
            unlocked(){return (hasUpgrade("S",205))}
        },
        142: {
            cost(x) { return new MetaNum(1e111).mul(new MetaNum(6).pow(new MetaNum(x))) },
            title: "Thrian",
            display() { return `+900% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(9).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 11,
            unlocked(){return (hasUpgrade("S",205))}
        },
        143: {
            cost(x) { return new MetaNum(2e112).mul(new MetaNum(6).pow(new MetaNum(x))) },
            title: "Octal-squeaker",
            display() { return `+900% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(9).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 11,
            unlocked(){return (hasUpgrade("S",205))}
        },
        144: {
            cost(x) { return new MetaNum(4e113).mul(new MetaNum(6).pow(new MetaNum(x))) },
            title: "Cheese mite-crowd",
            display() { return `+900% succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(9).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 11,
            unlocked(){return (hasUpgrade("S",205))}
        },
        145: {
            cost(x) { return new MetaNum(1e115).mul(new MetaNum(10).pow(new MetaNum(x))) },
            title: "Dialogue",
            display() { return `The first level unlocks the next layer. +100% subexponential point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).add(1)},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 99,
            unlocked(){return (hasUpgrade("S",205))}
        },
    },
})
addLayer("-", {
    name: "subtraction points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "-", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    nodeStyle() { return {
        background: "radial-gradient( #FF7570, #b80500)",
    }},
    branches: ['S'],
    startData() { return {
        unlocked: true,
		points: new MetaNum(0),
        total: new MetaNum(0),
    }},
    color: "#FF7570",
    requires: new MetaNum(1e20), // Can be a function that takes requirement increases into account
    resource: "subtraction points", // Name of prestige currency
    baseResource: "succession points", // Name of resource prestige is based on
    baseAmount() {return player.S.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 5,
    exponent: 1.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new MetaNum(1)
        return exp
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('+',15) || player[this.layer].total.gte(1))},
    hotkeys: [
        {key: "-", description: "-: subtraction reset", onPress(){if (canReset(this.layer) && !hasUpgrade('x',25) && !hasMilestone('^',1)) doReset(this.layer)}},
    ],
    effect() {if (hasUpgrade('-',11)) return new MetaNum(new MetaNum(2).add(new MetaNum(player[this.layer].upgrades.length).mul(0.25))).pow(player[this.layer].points)
        else return new MetaNum(2).pow(player[this.layer].points)
    },
    effectDescription() { return 'multiplying googology point gain by ' + format(tmp['-'].effect)},
    autoUpgrade() {return hasMilestone('^',2)},
    autoPrestige() {return hasUpgrade('x',42) || hasMilestone('^',2)},
    canBuyMax() {return hasUpgrade('-',22) || hasUpgrade('x',14) || hasMilestone('^',1)},
    automate() {
        if (hasUpgrade('x',41)) {
            for (let i = 1; i < 6; i++) {
                buyUpgrade(this.layer,i+10)
                buyUpgrade(this.layer,i+20)
                buyUpgrade(this.layer,i+30)
            }
        }
    },
    resetsNothing() {return hasUpgrade('x',25) || hasMilestone('^',2)},
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
        cost: new MetaNum(7),
        unlocked(){return (hasUpgrade("+",25))}
        },
        12: {
        title: "Hypertri",
        description: "Automate the f0(n) buyable.",
        cost: new MetaNum(8),
        unlocked(){return (hasUpgrade("+",25))}
        },
        13: {
        title: "Fifsy",
        description: "The f0(n) buyable costs nothing.",
        cost: new MetaNum(10),
        unlocked(){return (hasUpgrade("+",25))}
        },
        14: {
        title: "Garsix",
        description: "No effect! Or is there?",
        cost: new MetaNum(11),
        unlocked(){return (hasUpgrade("+",25))}
        },
        15: {
        title: "Eightsy",
        description: "No effect! Or is there?",
        cost: new MetaNum(12),
        unlocked(){return (hasUpgrade("+",25))}
        },
        21: {
        title: "Garseven",
        description: "No effect! Or is there?",
        cost: new MetaNum(13),
        unlocked(){return (hasUpgrade("+",25))}
        },
        22: {
        title: "Ninesy",
        description: "You can buy max subtraction points.",
        cost: new MetaNum(15),
        unlocked(){return (hasUpgrade("+",25))}
        },
        23: {
        title: "Kopa",
        description: "No effect! Or is there?",
        cost: new MetaNum(16),
        unlocked(){return (hasUpgrade("+",25))}
        },
        24: {
        title: "Binary-clover mite",
        description: "No effect! Or is there?",
        cost: new MetaNum(18),
        unlocked(){return (hasUpgrade("+",25))}
        },
        25: {
        title: "Binary-dust mite",
        description: "No effect! Or is there?",
        cost: new MetaNum(19),
        unlocked(){return (hasUpgrade("+",25))}
        },
        31: {
        title: "Myul",
        description: "No effect! Or is there?",
        cost: new MetaNum(20),
        unlocked(){return (hasUpgrade("+",25))}
        },
        32: {
        title: "Goodol",
        description: "Unlock a new layer.",
        cost: new MetaNum(21),
        unlocked(){return (hasUpgrade("+",25))}
        },
        33: {
        title: "Short ream",
        description: "No effect! Or is there?",
        cost: new MetaNum(38),
        unlocked(){return (hasUpgrade("x",35))}
        },
        34: {
        title: "Ream",
        description: "Finally, an effect!!! x2.5 addition point gain.",
        cost: new MetaNum(40),
        unlocked(){return (hasUpgrade("x",35))}
        },
        35: {
        title: "Linear",
        description: "÷1,000 googology point gain (also divides your current googology points), and x32 succession point gain.",
        cost: new MetaNum(41),
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
    nodeStyle() { return {
        background: "radial-gradient( #87F9FF, #c3fcff)",
    }},
    branches: ['+'],
    startData() { return {
        unlocked: true,
		points: new MetaNum(0),
        total: new MetaNum(0),
        sp: new MetaNum(0),
    }},
    update(diff) {
        if (hasUpgrade('x', 121) || (player['^'].total.gte(1) && !inChallenge('^',11) && !inChallenge('^',12) && !inChallenge('^',21))) {
            let spGain = decimalOne;
            spGain = spGain.times(buyableEffect('x',21));
            if (hasUpgrade('S',121)) spGain = spGain.times(upgradeEffect('S',121));
            if (hasUpgrade('S',122)) spGain = spGain.times(upgradeEffect('S',122));
            if (hasUpgrade('S',123)) spGain = spGain.times(upgradeEffect('S',123));
            spGain = spGain.times(buyableEffect('+',145));
            if (hasMilestone('^',1) && player[this.layer].sp.lte(1e11)) spGain = spGain.times(5);
            spGain = spGain.times(buyableEffect('^',10004));
            spGain = spGain.times(buyableEffect('^',11));
            spGain = spGain.times(buyableEffect('^',12));
            spGain = spGain.times(buyableEffect('^',13));
            spGain = spGain.times(buyableEffect('^',14));
            spGain = spGain.times(buyableEffect('^',15));
            spGain = spGain.times(player['^'].expmult)
            player[this.layer].sp = player[this.layer].sp.plus(spGain.times(diff));
        }
    },
    color: "#87F9FF",
    requires: new MetaNum(1e11), // Can be a function that takes requirement increases into account
    resource: "multiplication points", // Name of prestige currency
    baseResource: "addition points", // Name of resource prestige is based on
    baseAmount() {return player['+'].points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(1)
        mult = mult.times(buyableEffect('^',10003))
        mult = mult.times(player['^'].expmult)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new MetaNum(1)
        if (inChallenge('^', 12)) exp = exp.mul(0.8)
        if (inChallenge('^', 21)) exp = exp.mul(0.64)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (hasUpgrade('-',32) || player[this.layer].total.gte(1) || player['^'].total.gte(1))},
    hotkeys: [
        {key: "x", description: "x: multiplication reset", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    passiveGeneration() {
        return hasMilestone('÷',1)
    },
    autoUpgrade() {return false},
    canBuyMax() {return false},
    automate() {
        if (hasMilestone('^',2)) {
            for (let i = 1; i < 6; i++) {
                buyUpgrade(this.layer,i+10)
                buyUpgrade(this.layer,i+20)
                buyUpgrade(this.layer,i+30)
                buyUpgrade(this.layer,i+40)
                buyUpgrade(this.layer,i+50)
                buyUpgrade(this.layer,i+60)
                buyUpgrade(this.layer,i+70)
                buyUpgrade(this.layer,i+80)
                buyUpgrade(this.layer,i+90)
                buyUpgrade(this.layer,i+100)
                buyUpgrade(this.layer,i+110)
                buyUpgrade(this.layer,121)
                buyBuyable(this.layer,11)
            }
        }
        if (hasMilestone('^',3)) buyBuyable(this.layer,21)
        if (hasMilestone('^',3)) buyBuyable(this.layer,22)
    },
    tabFormat: {
        "Numbers": {
            content: ['main-display','prestige-button','upgrades',['buyables',[9,10,11,12,13,14,15,16,17,18,19,20]]],
        },
        "Functions": {
            content: ['main-display','prestige-button',['buyable','11']],
        },
        "Lore": {
            content: [
                ['infobox','1'],
                ['infobox','2'],
                ['infobox','3'],
                ['infobox','4'],
            ],
        },
        "Subexponential Points": {
            content: [
            ["display-text", function() {return `You have ` + format(player[this.layer].sp) + ` subexponential points`}],
            ['buyables',[2]],
            ],
            unlocked() {return hasUpgrade('x',121) || player['^'].total.gte(1)}
        },
    },
    upgrades: {
        11: {
        title: "Eleventy",
        description: "x4 googology point gain, x3 succession point gain, and x2 addition point gain! Unlock new succession and addition upgrades.",
        cost: new MetaNum(1),
        },
        12: {
        title: "Fourteenty",
        description: "x7.5 googology point gain.",
        cost: new MetaNum(10),
        },
        13: {
        title: "Gross",
        description: "x7.75 googology point gain, and passively generate 100% of succession point gain per second.",
        cost: new MetaNum(20),
        },
        14: {
        title: "Baker's gross",
        description: "x8 googology point gain, and buy max subtraction points.",
        cost: new MetaNum(30),
        },
        15: {
        title: "Poulter's gross",
        description: "Gain 100% of addition points per second.",
        cost: new MetaNum(60),
        },
        21: {
        title: "Tarumba",
        description: "x8.25 googology point gain, and autobuy the first 8 rows of succession upgrades.",
        cost: new MetaNum(500),
        },
        22: {
        title: "King's gross",
        description: "x8.5 googology point gain, and autobuy the f0(n) buyable.",
        cost: new MetaNum(1250),
        },
        23: {
        title: "Fzfour",
        description: "x8.75 googology point gain, and the f0^m(n) buyable costs nothing.",
        cost: new MetaNum(2500),
        },
        24: {
        title: "Flah",
        description: "x9 googology point gain, and automate the f0^m(n) buyable.",
        cost: new MetaNum(3500),
        },
        25: {
        title: "Pedupi",
        description: "x9.25 googology point gain, and subtraction resets nothing. [This also disables the subtraction reset hotkey]",
        cost: new MetaNum(5000),
        },
        31: {
        title: "Idiot's array",
        description: "x9.5 googology point gain.",
        cost: new MetaNum(8000),
        },
        32: {
        title: "Tjega",
        description: "x9.75 googology point gain.",
        cost: new MetaNum(12000),
        },
        33: {
        title: "Kinoctove",
        description: "x10 googology point gain, autobuy the first 4 rows of addition upgrades, and unlock a buyable.",
        cost: new MetaNum(20000),
        },
        34: {
        title: "Ternary-dust mite",
        description: "x10 googology point gain.",
        cost: new MetaNum(75000),
        },
        35: {
        title: "Owch",
        description: "x10 googology point gain, and unlock more subtraction upgrades.",
        cost: new MetaNum(125000),
        },
        41: {
        title: "Eulerplex",
        description: "xe succession point gain, autobuy rows 9 and 10 of succession upgrades, and autobuy the first 3 rows of subtraction upgrades.",
        cost: new MetaNum(3000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        42: {
        title: "Chow",
        description: "x4 succession point gain, and automate subtraction point gain.",
        cost: new MetaNum(3500000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        43: {
        title: "Aniquilación",
        description: "x4 succession point gain.",
        cost: new MetaNum(4000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        44: {
        title: "Vulgate number",
        description: "x4 succession point gain.",
        cost: new MetaNum(5000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        45: {
        title: "Fara",
        description: "÷1,000 googology point gain, and x10 succession point gain.",
        cost: new MetaNum(10000000),
        unlocked() {return player['÷'].total.gte(1)},
        onPurchase() { player.points = player.points.div(1000)}
        },
        51: {
        title: "Musashi",
        description: "x5 succession point gain.",
        cost: new MetaNum(11500000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        52: {
        title: "Ternary-cheese mite",
        description: "x5 succession point gain.",
        cost: new MetaNum(13000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        53: {
        title: "Valles",
        description: "x25.753 googology point gain.",
        cost: new MetaNum(17000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        54: {
        title: "Jackpot number",
        description: "x27.777 googology point gain.",
        cost: new MetaNum(35000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        55: {
        title: "Yimum",
        description: "x20.847 googology point gain.",
        cost: new MetaNum(40000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        61: {
        title: "Thousand",
        description: "WOW! A THOUSAND??? Anyway, here's a x10 succession point gain boost!",
        cost: new MetaNum(125000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        62: {
        title: "Märchenzahl",
        description: "x6.001 succession point gain.",
        cost: new MetaNum(150000000),
        unlocked() {return player['÷'].total.gte(1)}
        },
        63: {
        title: "Ternary-guppyspeck",
        description: "x20 googology and succession point gain and x40 nullology point gain.",
        cost: new MetaNum(5e12),
        unlocked() {return hasUpgrade('÷',13)}
        },
        64: {
        title: "Ontwo",
        description: "x5 googology and succession point gain and x10 nullology point gain.",
        cost: new MetaNum(8e12),
        unlocked() {return hasUpgrade('÷',13)}
        },
        65: {
        title: "Octal-clover mite",
        description: "x10 googology and succession point gain, x20 nullology point gain, and autobuy the first 14 rows of nullology upgrades.",
        cost: new MetaNum(1.3e13),
        unlocked() {return hasUpgrade('÷',13)}
        },
        71: {
        title: "Cheese mite",
        description: "x20 googology point gain and x40 nullology and succession point gain.",
        cost: new MetaNum(1.6e13),
        unlocked() {return hasUpgrade('÷',13)}
        },
        72: {
        title: "Integral-megaseptile",
        description: "x5 googology point gain and x10 nullology and succession point gain.",
        cost: new MetaNum(1e14),
        unlocked() {return hasUpgrade('÷',13)}
        },
        73: {
        title: "Jã:cʰe",
        description: "x20 googology point gain and x40 nullology and succession point gain.",
        cost: new MetaNum(2.25e14),
        unlocked() {return hasUpgrade('÷',13)}
        },
        74: {
        title: "Brokillion",
        description: "x5 googology point gain and x10 nullology and succession point gain.",
        cost: new MetaNum(3.5e14),
        unlocked() {return hasUpgrade('÷',13)}
        },
        75: {
        title: "Rootbeer on the rocks",
        description: "x20 googology point gain, x40 nullology and succession point gain, and autobuy succession row 11 and addition rows 5 and 6.",
        cost: new MetaNum(9e14),
        unlocked() {return hasUpgrade('÷',13)}
        },
        81: {
        title: "Tueslakh",
        description: "x5 googology point gain and x10 nullology and succession point gain.",
        cost: new MetaNum(1.6e15),
        unlocked() {return hasUpgrade('÷',13)}
        },
        82: {
        title: "Esra",
        description: "x15 googology point gain and x30 nullology and succession point gain.",
        cost: new MetaNum(2.5e15),
        unlocked() {return hasUpgrade('÷',13)}
        },
        83: {
        title: "Clover mite",
        description: "x6.666 googology point gain and x13.333 nullology and succession point gain.",
        cost: new MetaNum(5e15),
        unlocked() {return hasUpgrade('÷',13)}
        },
        84: {
        title: "🠅🠅🠇🠇🠄🠆🠄🠆BA",
        description: "x15 googology point gain and x30 nullology and succession point gain.",
        cost: new MetaNum(7e15),
        unlocked() {return hasUpgrade('÷',13)}
        },
        85: {
        title: "Anika",
        description: "x6.666 googology point gain and x13.333 nullology and succession point gain.",
        cost: new MetaNum(1.25e16),
        unlocked() {return hasUpgrade('÷',13)}
        },
        91: {
        title: "Duodecimal-qoonol",
        description: "x15 googology point gain and x30 nullology and succession point gain.",
        cost: new MetaNum(3e16),
        unlocked() {return hasUpgrade('÷',14)}
        },
        92: {
        title: "Wedneslakh",
        description: "x6.666 googology point gain and x13.333 nullology and succession point gain.",
        cost: new MetaNum(4.5e16),
        unlocked() {return hasUpgrade('÷',14)}
        },
        93: {
        title: "Mor",
        description: "x15 googology point gain and x30 nullology and succession point gain.",
        cost: new MetaNum(7e16),
        unlocked() {return hasUpgrade('÷',14)}
        },
        94: {
        title: "Meemee wemb",
        description: "x6.666 googology point gain and x13.333 nullology and succession point gain.",
        cost: new MetaNum(1.5e17),
        unlocked() {return hasUpgrade('÷',14)}
        },
        95: {
        title: "Viewed",
        description: "x10 googology point gain and x20 nullology and succession point gain.",
        cost: new MetaNum(2e17),
        unlocked() {return hasUpgrade('÷',14)}
        },
        101: {
        title: "New Jerusalem",
        description: "x40 succession point gain.",
        cost: new MetaNum(3e17),
        unlocked() {return hasUpgrade('÷',14)}
        },
        102: {
        title: "Ternary-squeaker",
        description: "x10 succession point gain.",
        cost: new MetaNum(5e17),
        unlocked() {return hasUpgrade('÷',14)}
        },
        103: {
        title: "Thurslakh",
        description: "x40 succession point gain.",
        cost: new MetaNum(7.5e17),
        unlocked() {return hasUpgrade('÷',14)}
        },
        104: {
        title: "Ma'adjega",
        description: "x10 succession point gain.",
        cost: new MetaNum(1e18),
        unlocked() {return hasUpgrade('÷',14)}
        },
        105: {
        title: "Famel",
        description: "x20 succession point gain.",
        cost: new MetaNum(3e18),
        unlocked() {return hasUpgrade('÷',14)}
        },
        111: {
        title: "Lehu",
        description: "x50 succession point gain.",
        cost: new MetaNum(5e18),
        unlocked() {return hasUpgrade('÷',14)}
        },
        112: {
        title: "Frilakh",
        description: "x12.5 succession point gain.",
        cost: new MetaNum(7.5e18),
        unlocked() {return hasUpgrade('÷',14)}
        },
        113: {
        title: "Quindecimal-balum",
        description: "x50 succession point gain.",
        cost: new MetaNum(1.125e19),
        unlocked() {return hasUpgrade('÷',14)}
        },
        114: {
        title: "Dust mite-bunch",
        description: "x12.5 succession point gain.",
        cost: new MetaNum(2.25e19),
        unlocked() {return hasUpgrade('÷',14)}
        },
        115: {
        title: "Saturlakh",
        description: "x625 succession point gain.",
        cost: new MetaNum(3.5e19),
        unlocked() {return hasUpgrade('÷',14)}
        },
        121: {
        title: "Million",
        description: "WOW! A MILLION??? Division upgrades no longer divide succession point gain, the exponent of nullology points is 1 instead of -1, and unlock a new feature.",
        cost: new MetaNum(1e22),
        unlocked() {return hasUpgrade('÷',14)}
        },
    },
    buyables: {
        11: {
            cost(x) { return new MetaNum(25000).mul(new MetaNum(2).pow(x)) },
            title: "f1(n)",
            display() { return `x10 googology point gain.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(10).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 15,
            unlocked(){return (hasUpgrade("x",33))}
        },
        21: {
            cost(x) { return new MetaNum(10).mul(new MetaNum(1.4).pow(x)) },
            title: "x^log(x)",
            display() { return `x1.2 subexponential point gain.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sp.gte(this.cost()) },
            effect(){
                return new MetaNum(1.2).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].sp = player[this.layer].sp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 100,
            unlocked(){return (hasUpgrade("x",121) || player['^'].total.gte(1))}
        },
        22: {
            cost(x) { return new MetaNum(10).mul(new MetaNum(1.5).pow(x)) },
            title: "x^√x",
            display() { return `x2 succession point gain.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sp.gte(this.cost()) },
            effect(){
                return new MetaNum(2).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].sp = player[this.layer].sp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 100,
            unlocked(){return (hasUpgrade("x",121) || player['^'].total.gte(1))}
        },
        131: {
            cost(x) { return new MetaNum(2.5e49).mul(new MetaNum(10).pow(x)) },
            title: "Carrot",
            display() { return `Succession points boost themselves by +^0.005.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(player['S'].points).add(1).pow(0.005).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                player['S'].points = new MetaNum(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 10,
            unlocked() {return hasMilestone('^',2)}
        },
        132: {
            cost(x) { return new MetaNum(1e63).mul(new MetaNum(1e3).pow(x)) },
            title: "Banika",
            display() { return `Succession points boost themselves by +^0.005.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(player['S'].points).add(1).pow(0.005).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                player['S'].points = new MetaNum(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 10,
            unlocked() {return hasMilestone('^',2)}
        },
        133: {
            cost(x) { return new MetaNum(1e102).mul(new MetaNum(1e9).pow(x)) },
            title: "Factoriup",
            display() { return `Succession points boost themselves by +^0.005.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(player['S'].points).add(1).pow(0.005).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                player['S'].points = new MetaNum(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 10,
            unlocked() {return hasMilestone('^',2)}
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
        body() { return "You... can't get to a googol googology points? Is it because they are called googology points? Maybe you should try increasing your number in some way? It seems like a new layer has appeared..." },
        unlocked() {return player.points.gte(9.99e99)}
        },
        4: {
        title: "Ascension",
        body() { return "Your numbers are climbing higher and higher. You have also discovered a new type of growth, which is faster than multiplication, but slower than exponentiation." },
        unlocked() {return hasUpgrade('x',121)}
        },
    }
})
addLayer("÷", {
    name: "division points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "÷", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    nodeStyle() { return {
        background: "radial-gradient( #F9FF87, #bfc400)",
    }},
    branches: ['+','-'],
    startData() { return {
        unlocked: true,
		points: new MetaNum(0),
        total: new MetaNum(0),
    }},
    color: "#F9FF87",
    requires: new MetaNum(1e24), // Can be a function that takes requirement increases into account
    resource: "division points", // Name of prestige currency
    baseResource: "addition points", // Name of resource prestige is based on
    baseAmount() {return player['+'].points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    base: 5,
    exponent: 1.25, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new MetaNum(1)
        return exp
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (player.points.gte('9.98e99') || player[this.layer].total.gte(1) || hasMilestone('^',2))},
    hotkeys: [
        {key: "/", description: "/: division reset", onPress(){if (canReset(this.layer) && !hasUpgrade('÷',15) && !hasMilestone('^',1)) doReset(this.layer)}},
    ],
    effect() {return new MetaNum(10).pow(player[this.layer].points)},
    effectDescription() { return 'dividing googology point gain by ' + format(tmp['÷'].effect) + ' and multiplying succession point gain by '+ format(tmp['÷'].effect)},
    autoUpgrade() {return false},
    autoPrestige() {return hasMilestone('^',3)},
    canBuyMax() {return hasUpgrade('÷',15) || hasMilestone('^',1)},
    autoUpgrade() {return hasMilestone('^',2)},
    resetsNothing() {return hasMilestone('÷',1)},
    doReset(resettingLayer) {
        // Stage 1, almost always needed, makes resetting this layer not delete your progress
        if (layers[resettingLayer].row <= this.row) return;

        // Stage 2, track which specific subfeatures you want to keep, e.g. Upgrade 11, Challenge 32, Buyable 12
        let keptMilestones = []
        if (hasMilestone("^", 1)) keptMilestones.push(1)

        // Stage 3, track which main features you want to keep - all upgrades, total points, specific toggles, etc.
        let keep = [];

        // Stage 4, do the actual data reset
        layerDataReset(this.layer, keep);

        // Stage 5, add back in the specific subfeatures you saved earlier
        player[this.layer].milestones.push(...keptMilestones)
    },
    tabFormat: {
        "Numbers": {
            content: ['main-display','prestige-button','upgrades'],
        },
        "Milestones": {
            content: ['main-display','prestige-button','milestones'],
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
        cost: new MetaNum(6),
        onPurchase() { player.points = player.points.div(1e10)}
        },
        12: {
        title: "Unreasonable",
        description: "÷10,000,000,000 googology point gain, and x750,000 succession point gain.",
        cost: new MetaNum(8),
        onPurchase() { player.points = player.points.div(1e10)}
        },
        13: {
        title: "Very unreasonable",
        description: "÷10,000,000,000 googology point gain, and x980,000 succession point gain.",
        cost: new MetaNum(9),
        unlocked() {return new MetaNum(getBuyableAmount('x',11)).gte(15)},
        onPurchase() { player.points = player.points.div(1e10)}
        },
        14: {
        title: "Ubesuperc",
        description: "÷10,000,000,000 googology point gain, and x1,000 succession point gain.",
        cost: new MetaNum(16),
        unlocked() {return new MetaNum(getBuyableAmount('x',11)).gte(15) && hasUpgrade('x',71)},
        onPurchase() { player.points = player.points.div(1e10)}
        },
        15: {
        title: "Binary-guppychunk",
        description: "÷1,000 googology point gain, and x100 succession point gain. Also, buy max division points. [This disables the division reset hotkey]",
        cost: new MetaNum(25),
        unlocked() {return new MetaNum(getBuyableAmount('x',11)).gte(15) && hasUpgrade('x',115)},
        onPurchase() { player.points = player.points.div(1e3)}
        },
    },
    milestones: {
        1: {
            requirementDescription: "40 division points",
            effectDescription: "Division points reset nothing, passively generate 100% of multiplication points per second, autobuy succession rows 12-20, and autobuy nullology rows 15-16.",
            done() { return player[this.layer].points.gte(40) },
            unlocked() {return (hasUpgrade('x',121))}
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
            background: "radial-gradient(circle, #800000 0%, #000000 100%)"
    }},
    branches: ['S','-'],
    startData() { return {
        unlocked: true,
		points: new MetaNum(0),
        total: new MetaNum(0),
    }},
    color: "#800000",
    requires: new MetaNum(1e-100), // Can be a function that takes requirement increases into account
    resource: "nullology points", // Name of prestige currency
    baseResource: "googology points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() {if (hasUpgrade('x',121) || hasMilestone('^',1)) return 1
        else return -1
    }, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(1e82)
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
        if (hasUpgrade('n', 111)) mult = mult.times(1.58)
        if (hasUpgrade('n', 112)) mult = mult.times(1.59)
        if (hasUpgrade('n', 113)) mult = mult.times(1.59)
        if (hasUpgrade('n', 114)) mult = mult.times(1.6)
        if (hasUpgrade('n', 115)) mult = mult.times(7)
        if (hasUpgrade('n', 121)) mult = mult.times(2)
        if (hasUpgrade('n', 122)) mult = mult.times(2)
        if (hasUpgrade('n', 123)) mult = mult.times(2)
        if (hasUpgrade('n', 124)) mult = mult.times(2)
        if (hasUpgrade('n', 125)) mult = mult.times(7)
        if (hasUpgrade('n', 131)) mult = mult.times(2)
        if (hasUpgrade('n', 132)) mult = mult.times(2)
        if (hasUpgrade('n', 133)) mult = mult.times(2)
        if (hasUpgrade('n', 134)) mult = mult.times(2)
        if (hasUpgrade('n', 135)) mult = mult.times(7)
        if (hasUpgrade('n', 141)) mult = mult.times(upgradeEffect('n',141))
        if (hasUpgrade('n', 142)) mult = mult.times(upgradeEffect('n',142))
        if (hasUpgrade('n', 143)) mult = mult.times(upgradeEffect('n',143))
        if (hasUpgrade('n', 144)) mult = mult.times(upgradeEffect('n',144))
        if (hasUpgrade('n', 145)) mult = mult.times(7)
        if (hasUpgrade('x', 63)) mult = mult.times(40)
        if (hasUpgrade('x', 64)) mult = mult.times(10)
        if (hasUpgrade('x', 65)) mult = mult.times(20)
        if (hasUpgrade('x', 71)) mult = mult.times(40)
        if (hasUpgrade('n', 151)) mult = mult.times(7)
        if (hasUpgrade('n', 152)) mult = mult.times(7)
        if (hasUpgrade('n', 153)) mult = mult.times(10)
        if (hasUpgrade('n', 154)) mult = mult.times(10)
        if (hasUpgrade('n', 155)) mult = mult.times(10)
        if (hasUpgrade('n', 161)) mult = mult.times(10)
        if (hasUpgrade('n', 162)) mult = mult.times(10)
        if (hasUpgrade('n', 163)) mult = mult.times(10)
        if (hasUpgrade('n', 164)) mult = mult.times(10)
        if (hasUpgrade('x', 72)) mult = mult.times(10)
        if (hasUpgrade('x', 73)) mult = mult.times(40)
        if (hasUpgrade('x', 74)) mult = mult.times(10)
        if (hasUpgrade('x', 75)) mult = mult.times(40)
        if (hasUpgrade('x', 81)) mult = mult.times(10)
        if (hasUpgrade('x', 82)) mult = mult.times(30)
        if (hasUpgrade('x', 83)) mult = mult.times(13.333)
        if (hasUpgrade('x', 84)) mult = mult.times(30)
        if (hasUpgrade('x', 85)) mult = mult.times(13.333)
        if (hasUpgrade('x', 91)) mult = mult.times(30)
        if (hasUpgrade('x', 92)) mult = mult.times(13.333)
        if (hasUpgrade('x', 93)) mult = mult.times(30)
        if (hasUpgrade('x', 94)) mult = mult.times(13.333)
        if (hasUpgrade('x', 95)) mult = mult.times(20)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new MetaNum(1)
        return exp
    },
    layerShown(){return (hasUpgrade('÷',13) || player[this.layer].total.gte(1))},
    hotkeys: [
        {key: "n", description: "n: nullology reset", onPress(){if (canReset(this.layer) && hasUpgrade('÷',13)) doReset(this.layer)}},
    ],
    autoUpgrade() {return false},
    automate() {
        if (hasUpgrade('x',65) || hasMilestone('^',1)) {
            for (let i = 1; i < 6; i++) {
                buyUpgrade(this.layer,i+10)
                buyUpgrade(this.layer,i+20)
                buyUpgrade(this.layer,i+30)
                buyUpgrade(this.layer,i+40)
                buyUpgrade(this.layer,i+50)
                buyUpgrade(this.layer,i+60)
                buyUpgrade(this.layer,i+70)
                buyUpgrade(this.layer,i+80)
                buyUpgrade(this.layer,i+90)
                buyUpgrade(this.layer,i+100)
                buyUpgrade(this.layer,i+110)
                buyUpgrade(this.layer,i+120)
                buyUpgrade(this.layer,i+130)
                buyUpgrade(this.layer,i+140)
                if (hasMilestone('÷',1) || hasMilestone('^',1)) {buyUpgrade('n',i+150)}
                if (hasMilestone('÷',1) || hasMilestone('^',1)) {buyUpgrade('n',i+160)}
            }
        }
    },
    passiveGeneration() {return hasMilestone('^', 1) && hasUpgrade('÷',13)},
    tabFormat: {
        "Numbers": {
            content: ['main-display','prestige-button','clickables','upgrades'],
        },
        "Lore": {
            content: [
                ['infobox','1'],
                ['infobox','2'],
            ],
        },
    },
    clickables: {
        11: {
            display() {return "Click/hold to do nullology reset"},
            onClick() {return doReset('n')},
            onHold() {return doReset('n')},
            canClick() {return true}
        }
    },
    upgrades: {
            11: {
                title: "Gum",
                description: "x2 nullology point gain.",
                cost: new MetaNum(100),
            },
            12: {
                title: "Binary-guppyspeck",
                description: "x2 nullology point gain.",
                cost: new MetaNum(500),
            },
            13: {
                title: "Lily",
                description: "x2 nullology point gain.",
                cost: new MetaNum(1500),
            },
            14: {
                title: "Gartreys",
                description: "x2 nullology point gain.",
                cost: new MetaNum(3000),
            },
            15: {
                title: "Long thousand",
                description: "x12 nullology and googology point gain.",
                cost: new MetaNum(10000),
            },
            21: {
                title: "Actintrinyllion",
                description: "x1.5 nullology point gain.",
                cost: new MetaNum(100000),
            },
            22: {
                title: "Unexian",
                description: "Nullology points boost themselves.",
                cost: new MetaNum(150000),
                effect() {
                    return player['n'].points.add(1).pow(0.1).div(player['n'].points.add(1).pow(0.1).max(1000).div(1000).pow(0.9)).min(1000000)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            23: {
                title: "Maha",
                description: "Nullology points boost themselves again.",
                cost: new MetaNum(600000),
                effect() {
                    return player['n'].points.add(1).pow(0.1).div(player['n'].points.add(1).pow(0.1).max(1000).div(1000).pow(0.9)).min(1000000)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            24: {
                title: "Piplex",
                description: "Nullology points boost themselves again.",
                cost: new MetaNum(2500000),
                effect() {
                    return player['n'].points.add(1).pow(0.1).div(player['n'].points.add(1).pow(0.1).max(1000).div(1000).pow(0.9)).min(1000000)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            25: {
                title: "Vatican City",
                description: "x13.85 nullology and googology point gain.",
                cost: new MetaNum(10000000),
            },
            31: {
                title: "Megadollaxul",
                description: "x2 nullology point gain.",
                cost: new MetaNum(300000000),
            },
            32: {
                title: "Hyper fixation Number",
                description: "x2.009 nullology point gain.",
                cost: new MetaNum(1000000000),
            },
            33: {
                title: "Great gross",
                description: "x2.028 nullology point gain.",
                cost: new MetaNum(2000000000),
            },
            34: {
                title: "Hardy-Ramanujan Number",
                description: "x2.029 nullology point gain.",
                cost: new MetaNum(5000000000),
            },
            35: {
                title: "Eyelash mite-chunk",
                description: "2,000 already? Nullology points boost themselves and googology point gain.",
                cost: new MetaNum(1e10),
                effect() {
                    return player['n'].points.add(1).pow(0.075).div(player['n'].points.add(1).pow(0.075).max(1000).div(1000).pow(0.9)).min(1000000)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            41: {
                title: "Retrillion",
                description: "x1.52 nullology point gain.",
                cost: new MetaNum(3e11),
            },
            42: {
                title: "New Chromoluem",
                description: "x1.523 nullology point gain.",
                cost: new MetaNum(6e11),
            },
            43: {
                title: "Giga",
                description: "x1.52048 nullology point gain.",
                cost: new MetaNum(1e12),
            },
            44: {
                title: "Ternary-pipsqueak",
                description: "x1.52187 nullology point gain.",
                cost: new MetaNum(2e12),
            },
            45: {
                title: "Great baker's gross",
                description: "x5.2197 nullology and googology point gain.",
                cost: new MetaNum(3e12),
            },
            51: {
                title: "Planus",
                description: "x1.52304 nullology point gain.",
                cost: new MetaNum(1e14),
            },
            52: {
                title: "Heads-pentprimol",
                description: "x1.5231 nullology point gain.",
                cost: new MetaNum(2.5e14),
            },
            53: {
                title: "Poulter's great gross",
                description: "x1.52744 nullology point gain.",
                cost: new MetaNum(4e14),
            },
            54: {
                title: "Fzfive",
                description: "x1.53125 nullology point gain.",
                cost: new MetaNum(7e14),
            },
            55: {
                title: "Petripi",
                description: "x7.314 nullology and googology point gain.",
                cost: new MetaNum(1e15),
            },
            61: {
                title: "Coxeyes",
                description: "x1.5321 nullology point gain.",
                cost: new MetaNum(2e16),
            },
            62: {
                title: "Obragsracx",
                description: "x1.53465 nullology point gain.",
                cost: new MetaNum(3.5e16),
            },
            63: {
                title: "Bree",
                description: "x1.5352 nullology point gain.",
                cost: new MetaNum(6e16),
            },
            64: {
                title: "Shar",
                description: "x1.536 nullology point gain.",
                cost: new MetaNum(1e17),
            },
            65: {
                title: "White whale",
                description: "4,000 already? x5.4098 nullology and googology point gain.",
                cost: new MetaNum(1.5e17),
            },
            71: {
                title: "Fibonaxix",
                description: "x1.54181 nullology point gain.",
                cost: new MetaNum(5e18),
            },
            72: {
                title: "Garboxcars",
                description: "x1.54356 nullology point gain.",
                cost: new MetaNum(8e18),
            },
            73: {
                title: "Lox",
                description: "x1.54422 nullology point gain.",
                cost: new MetaNum(1.5e19),
            },            
            74: {
                title: "Irspa",
                description: "x1.54477 nullology point gain.",
                cost: new MetaNum(2.5e19),
            },
            75: {
                title: "Juun",
                description: "x5.4913 nullology and googology point gain.",
                cost: new MetaNum(6e19),
            },
            81: {
                title: "Dust mite-chunk",
                description: "x1.55 nullology point gain.",
                cost: new MetaNum(2e21),
            },
            82: {
                title: "Beauty",
                description: "x1.55053 nullology point gain.",
                cost: new MetaNum(3.5e21),
            },
            83: {
                title: "Binary-squeaker",
                description: "x1.5512 nullology point gain.",
                cost: new MetaNum(6e21),
            },            
            84: {
                title: "Second qlaco's number",
                description: "x1.55314 nullology point gain.",
                cost: new MetaNum(1e22),
            },
            85: {
                title: "Ragsracxob",
                description: "x8.5346 nullology and googology point gain.",
                cost: new MetaNum(2e22),
            },
            91: {
                title: "Ma'asjyp",
                description: "x1.55461 nullology point gain.",
                cost: new MetaNum(5e23),
            },
            92: {
                title: "Kaprekar's constant",
                description: "6,000 already? x1.56174 nullology point gain.",
                cost: new MetaNum(8e23),
            },
            93: {
                title: "Teradollaxul",
                description: "x1.564 nullology point gain.",
                cost: new MetaNum(1.5e24),
            },            
            94: {
                title: "Tetrafact",
                description: "x1.56561 nullology point gain.",
                cost: new MetaNum(2.5e24),
            },
            95: {
                title: "Clickety-clix",
                description: "x5.6666 nullology and googology point gain.",
                cost: new MetaNum(6e24),
            },
            101: {
                title: "Fibonaxx",
                description: "x1.56765 nullology point gain.",
                cost: new MetaNum(3e26),
            },
            102: {
                title: "Zero-septingenol",
                description: "x1.57 nullology point gain.",
                cost: new MetaNum(5e26),
            },
            103: {
                title: "The iPad",
                description: "x1.57577 nullology point gain.",
                cost: new MetaNum(1e27),
            },            
            104: {
                title: "Menilles",
                description: "x1.57722 nullology point gain.",
                cost: new MetaNum(1.75e27),
            },
            105: {
                title: "Garpo",
                description: "x6.7744 nullology and googology point gain.",
                cost: new MetaNum(3e27),
            },
            111: {
                title: "Ysgartre",
                description: "x1.58 nullology point gain.",
                cost: new MetaNum(1e29),
            },
            112: {
                title: "Right bucket",
                description: "x1.59 nullology point gain.",
                cost: new MetaNum(1.75e29),
            },
            113: {
                title: "Quadrix",
                description: "x1.59 nullology point gain.",
                cost: new MetaNum(3e29),
            },            
            114: {
                title: "Balum",
                description: "10,000 already? x1.6 nullology point gain.",
                cost: new MetaNum(5.5e29),
            },
            115: {
                title: "Lebicyc",
                description: "x7 nullology and googology point gain.",
                cost: new MetaNum(1e30),
            },
            121: {
                title: "Fugathree",
                description: "x2 nullology point gain.",
                cost: new MetaNum(1e31),
            },
            122: {
                title: "Eyelash mite",
                description: "x2 nullology point gain.",
                cost: new MetaNum(2e31),
            },
            123: {
                title: "Octal-dust mite",
                description: "x2 nullology point gain.",
                cost: new MetaNum(5e31),
            },            
            124: {
                title: "Glerint",
                description: "x2 nullology point gain.",
                cost: new MetaNum(1e32),
            },
            125: {
                title: "Ma'akaŋ",
                description: "x7 nullology and googology point gain.",
                cost: new MetaNum(2e32),
            },
            131: {
                title: "Lake Superior",
                description: "x2 nullology point gain.",
                cost: new MetaNum(2.5e33),
            },
            132: {
                title: "Yclebic",
                description: "x2 nullology point gain.",
                cost: new MetaNum(5e33),
            },
            133: {
                title: "Octal-cheese mite",
                description: "x2 nullology point gain.",
                cost: new MetaNum(1e34),
            },            
            134: {
                title: "Ibelcyc",
                description: "x2 nullology point gain.",
                cost: new MetaNum(2e34),
            },
            135: {
                title: "Cherry cola on the rocks",
                description: "x7 nullology and googology point gain.",
                cost: new MetaNum(5e34),
            },
            141: {
                title: "Pinky",
                description: "Nullology points boost themselves.",
                cost: new MetaNum(5e35),
                effect() {
                    return player['n'].points.add(1).pow(0.01).div(player['n'].points.add(1).pow(0.01).max(1000).div(1000).pow(0.9)).min(1000000)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            142: {
                title: "Esupercub",
                description: "Nullology points boost themselves again.",
                cost: new MetaNum(1e36),
                effect() {
                    return player['n'].points.add(1).pow(0.01).div(player['n'].points.add(1).pow(0.01).max(1000).div(1000).pow(0.9)).min(1000000)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            143: {
                title: "Agatone",
                description: "Nullology points boost themselves again.",
                cost: new MetaNum(2e36),
                effect() {
                    return player['n'].points.add(1).pow(0.01).div(player['n'].points.add(1).pow(0.01).max(1000).div(1000).pow(0.9)).min(1000000)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            144: {
                title: "Twelve o'clousand",
                description: "Nullology points boost themselves again.",
                cost: new MetaNum(4e36),
                effect() {
                    return player['n'].points.add(1).pow(0.01).div(player['n'].points.add(1).pow(0.01).max(1000).div(1000).pow(0.9)).min(1000000)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            145: {
                title: "Bicycle",
                description: "x7 nullology and googology point gain.",
                cost: new MetaNum(1e37),
            },
            151: {
                title: "Ttit",
                description: "x7 nullology and googology point gain.",
                cost: new MetaNum(1e44),
            },
            152: {
                title: "Fibonacci Straight",
                description: "x7 nullology and googology point gain.",
                cost: new MetaNum(1e45),
            },
            153: {
                title: "Monlakh",
                description: "x10 nullology and googology point gain.",
                cost: new MetaNum(1e46),
            },
            154: {
                title: "Ma'amul",
                description: "x10 nullology and googology point gain.",
                cost: new MetaNum(1e47),
            },
            155: {
                title: "Odd John",
                description: "x10 nullology and googology point gain.",
                cost: new MetaNum(1e48),
            },
            161: {
                title: "Quinine",
                description: "x10 nullology and googology point gain.",
                cost: new MetaNum(2e49),
            },
            162: {
                title: "Lakh",
                description: "100,000 already? x10 nullology and googology point gain.",
                cost: new MetaNum(2e50),
            },
            163: {
                title: "Spacus",
                description: "x10 nullology and googology point gain.",
                cost: new MetaNum(3e51),
            },
        },
        
    infoboxes: {
        1: {
        title: "Here we are...",
        body() { return "Your divisive shenanigans have caused you to enter the underworld of the numbers! The hotkey is extremely recommended for this layer! Something isn't right here though..." },
        },
    }
})
addLayer("^", {
    name: "exponentiation points", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "^", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    nodeStyle() { return {
        background: "radial-gradient( #9692FF, #cbc9ff)",
    }},
    branches: ['x'],
    startData() { return {
        unlocked: true,
		points: new MetaNum(0),
        total: new MetaNum(0),
        power: new MetaNum(0),
        expmult: new MetaNum(1),
        sqrtp: new MetaNum(0),
    }},
    update(diff) {
        if (hasMilestone('^', 1)) {
            let powerGain = decimalOne;
            powerGain = powerGain.times(buyableEffect('^',10005))
            powerGain = powerGain.times(buyableEffect('^',11));
            powerGain = powerGain.times(buyableEffect('^',12));
            powerGain = powerGain.times(buyableEffect('^',13));
            powerGain = powerGain.times(buyableEffect('^',14));
            powerGain = powerGain.times(buyableEffect('^',15));
            powerGain = powerGain.times(player['^'].expmult);
            player[this.layer].power = player[this.layer].power.plus(powerGain.times(diff));
            let expmultone = decimalOne;
            expmultone = expmultone.times(buyableEffect('^',21))
            expmultone = expmultone.times(buyableEffect('^',22))
            expmultone = expmultone.times(buyableEffect('^',23))
            expmultone = expmultone.times(buyableEffect('^',24))
            expmultone = expmultone.times(buyableEffect('^',25))
            expmultone = expmultone.times(buyableEffect('^',31))
            expmultone = expmultone.times(buyableEffect('^',32))
            expmultone = expmultone.times(buyableEffect('^',33))
            expmultone = expmultone.times(buyableEffect('^',34))
            expmultone = expmultone.times(buyableEffect('^',35))
            expmultone = expmultone.times(buyableEffect('^',41))
            expmultone = expmultone.times(buyableEffect('^',42))
            expmultone = expmultone.times(buyableEffect('^',43))
            expmultone = expmultone.times(buyableEffect('^',44))
            expmultone = expmultone.times(buyableEffect('^',45))
            expmultone = expmultone.times(buyableEffect('^',111))
            expmultone = expmultone.times(buyableEffect('^',112))
            expmultone = expmultone.times(buyableEffect('^',113))
            expmultone = expmultone.times(buyableEffect('^',114))
            expmultone = expmultone.times(buyableEffect('^',115))
            expmultone = expmultone.times(buyableEffect('^',121))
            expmultone = expmultone.times(buyableEffect('^',122))
            expmultone = expmultone.times(buyableEffect('^',123))
            expmultone = expmultone.times(buyableEffect('^',124))
            expmultone = expmultone.times(buyableEffect('^',125))
            expmultone = expmultone.times(buyableEffect('^',131))
            expmultone = expmultone.times(buyableEffect('^',132))
            expmultone = expmultone.times(buyableEffect('^',133))
            expmultone = expmultone.times(buyableEffect('^',134))
            expmultone = expmultone.times(buyableEffect('^',135))
            expmultone = expmultone.times(buyableEffect('^',141))
            expmultone = expmultone.times(buyableEffect('^',142))
            expmultone = expmultone.times(buyableEffect('^',143))
            expmultone = expmultone.times(buyableEffect('^',144))
            expmultone = expmultone.times(buyableEffect('^',145))
            expmultone = expmultone.times(buyableEffect('^',10006))
            expmultone = expmultone.times(buyableEffect('^',51))
            expmultone = expmultone.times(buyableEffect('^',52))
            expmultone = expmultone.times(buyableEffect('^',53))
            expmultone = expmultone.times(buyableEffect('^',54))
            expmultone = expmultone.times(buyableEffect('^',55))
            expmultone = expmultone.times(buyableEffect('^',61))
            expmultone = expmultone.times(buyableEffect('^',62))
            expmultone = expmultone.times(buyableEffect('^',63))
            expmultone = expmultone.times(buyableEffect('^',64))
            expmultone = expmultone.times(buyableEffect('^',65))
            expmultone = expmultone.times(buyableEffect('^',71))
            expmultone = expmultone.times(buyableEffect('^',72))
            expmultone = expmultone.times(buyableEffect('^',73))
            expmultone = expmultone.times(buyableEffect('^',74))
            expmultone = expmultone.times(buyableEffect('^',75))
            expmultone = expmultone.times(buyableEffect('^',151))
            expmultone = expmultone.times(buyableEffect('^',152))
            expmultone = expmultone.times(buyableEffect('^',153))
            expmultone = expmultone.times(buyableEffect('^',154))
            expmultone = expmultone.times(buyableEffect('^',155))
            expmultone = expmultone.times(buyableEffect('^',161))
            expmultone = expmultone.times(buyableEffect('^',162))
            expmultone = expmultone.times(buyableEffect('^',163))
            expmultone = expmultone.times(buyableEffect('^',164))
            expmultone = expmultone.times(buyableEffect('^',165))
            expmultone = expmultone.times(buyableEffect('^',81))
            expmultone = expmultone.times(buyableEffect('^',82))
            expmultone = expmultone.times(buyableEffect('^',83))
            expmultone = expmultone.times(buyableEffect('^',84))
            expmultone = expmultone.times(buyableEffect('^',85))
            expmultone = expmultone.times(buyableEffect('^',91))
            expmultone = expmultone.times(buyableEffect('^',92))
            expmultone = expmultone.times(buyableEffect('^',93))
            expmultone = expmultone.times(buyableEffect('^',94))
            expmultone = expmultone.times(buyableEffect('^',95))
            if (inChallenge('^', 11)) expmultone = expmultone.pow(0.5)
            if (inChallenge('^', 11)) expmultone = expmultone.div(1e15)
            if (inChallenge('^', 12)) expmultone = expmultone.pow(0.3333333333333)
            if (inChallenge('^', 12)) expmultone = expmultone.div(1e15)
            if (inChallenge('^', 21)) expmultone = expmultone.pow(0.25)
            if (inChallenge('^', 21)) expmultone = expmultone.div(1e15)
            player[this.layer].expmult = expmultone;
        }
        if (inChallenge('^', 11) || inChallenge('^', 12) || inChallenge('^', 21)) {
            if (inChallenge('^', 11)) sqrtpGain = new MetaNum(player['x'].sp).pow(0.2).div(1e6);
            if (inChallenge('^', 12)) sqrtpGain = new MetaNum(player['x'].sp).pow(0.3).div(1e5);
            if (inChallenge('^', 21)) sqrtpGain = new MetaNum(player['x'].sp).pow(0.45).div(1e6);
            sqrtpGain = sqrtpGain.times(buyableEffect('^',111))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',112))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',113))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',114))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',115))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',121))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',122))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',123))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',124))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',125))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',131))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',132))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',133))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',134))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',135))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',141))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',142))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',143))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',144))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',145))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',151))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',152))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',153))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',154))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',155))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',161))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',162))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',163))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',164))
            sqrtpGain = sqrtpGain.times(buyableEffect('^',165))
            player[this.layer].sqrtp = player[this.layer].sqrtp.plus(sqrtpGain.times(diff));
        }
    },
    color: "#9692FF",
    requires: new MetaNum(1e11), // Can be a function that takes requirement increases into account
    resource: "exponentiation points", // Name of prestige currency
    baseResource: "subexponentiation points", // Name of resource prestige is based on
    baseAmount() {return player['x'].sp}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new MetaNum(10)
        mult = mult.times(player['^'].expmult)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        exp = new MetaNum(1)
        return exp
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    layerShown(){return (new MetaNum(getBuyableAmount('+',145)).gte(1) || player[this.layer].total.gte(1))},
    passiveGeneration() {return false},
    autoUpgrade() {return false},
    canBuyMax() {return false},
    automate() {
    },
    tabFormat: {
        "Numbers": {
            content: ['main-display','prestige-button',["display-text", function() {return `You have ` + format(player[this.layer].power) + ` power`}],["display-text", function() {if (hasMilestone('^',2)) return `You have ` + formatSmall(player[this.layer].expmult) + ` Exponential Multiplier`}],'upgrades',['buyables',[1,2,3,4,5,6,7,8,9,10]]],
        },
        "Functions": {
            content: ['main-display','prestige-button',['buyables',[1000,1001,1002,1003,1004]]],
        },
        "Exponential Tiers": {
            content: ['main-display','prestige-button','milestones'],
        },
        "Root": {
            content: ['main-display','prestige-button',["display-text", function() {return `You have ` + format(player[this.layer].sqrtp) + ` root points`}],'challenges',['buyables',[11,12,13,14,15,16,17,18,19,20]]],
            unlocked() {return hasMilestone('^',5)}
        },
        "Lore": {
            content: [
                ['infobox','1'],
                ['infobox','2'],
            ],
        },
    },
    upgrades: {
    },
    buyables: {
        11: {
            cost(x) { return new MetaNum(100).mul(new MetaNum(1.5).pow(new MetaNum(x))) },
            title: "Hexus",
            display() { return `+10% subexponential point and power gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.1).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 90,
        },
        12: {
            cost(x) { return new MetaNum(300).mul(new MetaNum(1.5).pow(new MetaNum(x))) },
            title: "Fibonal",
            display() { return `+10% subexponential point and power gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.1).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 90,
        },
        13: {
            cost(x) { return new MetaNum(900).mul(new MetaNum(1.5).pow(new MetaNum(x))) },
            title: "Binary-gobychunk",
            display() { return `+10% subexponential point and power gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.1).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 90,
        },
        14: {
            cost(x) { return new MetaNum(2700).mul(new MetaNum(1.5).pow(new MetaNum(x))) },
            title: "Clover mite-crowd",
            display() { return `+10% subexponential point and power gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.1).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 90,
        },
        15: {
            cost(x) { return new MetaNum(8100).mul(new MetaNum(1.5).pow(new MetaNum(x))) },
            title: "Gobybit",
            display() { return `+10% subexponential point and power gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.1).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 90,
        },
        21: {
            cost(x) { return new MetaNum(15000).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Little squeaker",
            display() { return `+5% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
            unlocked() {return hasMilestone('^',2)}
        },
        22: {
            cost(x) { return new MetaNum(500000).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Duodecimal-doocol",
            display() { return `+5% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
            unlocked() {return hasMilestone('^',2)}
        },
        23: {
            cost(x) { return new MetaNum(1500000).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Undoocol",
            display() { return `+5% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
            unlocked() {return hasMilestone('^',2)}
        },
        24: {
            cost(x) { return new MetaNum(1e7).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Fünftelbillion",
            display() { return `What a jump (in both ways)! +5% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
            unlocked() {return hasMilestone('^',2)}
        },
        25: {
            cost(x) { return new MetaNum(5e9).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Ternary-minnowchunk",
            display() { return `+5% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
            unlocked() {return hasMilestone('^',2)}
        },
        31: {
            cost(x) { return new MetaNum(1e10).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Heptus",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',2)}
        },
        32: {
            cost(x) { return new MetaNum(2e10).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Ternary-minnow",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',2)}
        },
        33: {
            cost(x) { return new MetaNum(3.5e10).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Trillion",
            display() { return `WOW! A TRILLION??? +3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',2)}
        },
        34: {
            cost(x) { return new MetaNum(1e11).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Tera-Zeralum",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',2)}
        },
        35: {
            cost(x) { return new MetaNum(1.5e11).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Binary-gogolspeck",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',2)}
        },
        41: {
            cost(x) { return new MetaNum(3e11).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Fifteenbang",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',2)}
        },
        42: {
            cost(x) { return new MetaNum(1e12).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Tera-Unalum",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',2)}
        },
        43: {
            cost(x) { return new MetaNum(2e12).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Quadexiaa",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',2)}
        },
        44: {
            cost(x) { return new MetaNum(5e12).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Bit360",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',2)}
        },
        45: {
            cost(x) { return new MetaNum(3e17).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Megafugathree",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',2)}
        },
        51: {
            cost(x) { return new MetaNum(2e26).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Pentexian",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',7)}
        },
        52: {
            cost(x) { return new MetaNum(4e26).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Byllion",
            display() { return `Another jump! +3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',7)}
        },
        53: {
            cost(x) { return new MetaNum(6e26).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Fifan",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',7)}
        },
        54: {
            cost(x) { return new MetaNum(8e26).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Ternary-gobychunk",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',7)}
        },
        55: {
            cost(x) { return new MetaNum(1e27).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Onion",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',7)}
        },
        61: {
            cost(x) { return new MetaNum(2e27).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Bocchillion",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',7)}
        },
        62: {
            cost(x) { return new MetaNum(6e27).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Ternary-goby",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',7)}
        },
        63: {
            cost(x) { return new MetaNum(3.5e28).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Integral-exaundevigintile",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',7)}
        },
        64: {
            cost(x) { return new MetaNum(3.5e29).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Decus",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',7)}
        },
        65: {
            cost(x) { return new MetaNum(5e30).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Sptdoocol",
            display() { return `+3.125% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.03125).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 32,
            unlocked() {return hasMilestone('^',7)}
        },
        71: {
            cost(x) { return new MetaNum(5e35).mul(new MetaNum(2.5).pow(new MetaNum(x))) },
            title: "Octal-guppychunk",
            display() { return `+20% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.2).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 5,
            unlocked() {return hasMilestone('^',7)}
        },
        72: {
            cost(x) { return new MetaNum(1e36).mul(new MetaNum(2.5).pow(new MetaNum(x))) },
            title: "Ramanujan constant",
            display() { return `+20% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.2).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 5,
            unlocked() {return hasMilestone('^',7)}
        },
        73: {
            cost(x) { return new MetaNum(2e36).mul(new MetaNum(2.5).pow(new MetaNum(x))) },
            title: "Sexagesimal-doocol",
            display() { return `+20% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.2).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 5,
            unlocked() {return hasMilestone('^',7)}
        },
        74: {
            cost(x) { return new MetaNum(4e36).mul(new MetaNum(2.5).pow(new MetaNum(x))) },
            title: "Quintillion",
            display() { return `+20% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.2).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 5,
            unlocked() {return hasMilestone('^',7)}
        },
        75: {
            cost(x) { return new MetaNum(8e36).mul(new MetaNum(2.5).pow(new MetaNum(x))) },
            title: "Exa-Zeralum",
            display() { return `+20% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.2).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 5,
            unlocked() {return hasMilestone('^',7)}
        },
        81: {
            cost(x) { return new MetaNum(7.5e40).mul(new MetaNum(25).pow(new MetaNum(x))) },
            title: "Long",
            display() { return `+50% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.5).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 2,
            unlocked() {return hasMilestone('^',9)}
        },
        82: {
            cost(x) { return new MetaNum(1.6e41).mul(new MetaNum(25).pow(new MetaNum(x))) },
            title: "Twenty-twos",
            display() { return `+50% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.5).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 2,
            unlocked() {return hasMilestone('^',9)}
        },
        83: {
            cost(x) { return new MetaNum(3.4e41).mul(new MetaNum(25).pow(new MetaNum(x))) },
            title: "Gigagross",
            display() { return `+50% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.5).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 2,
            unlocked() {return hasMilestone('^',9)}
        },
        84: {
            cost(x) { return new MetaNum(8e41).mul(new MetaNum(25).pow(new MetaNum(x))) },
            title: "Eastillion",
            display() { return `+50% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.5).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 2,
            unlocked() {return hasMilestone('^',9)}
        },
        85: {
            cost(x) { return new MetaNum(1.8e42).mul(new MetaNum(25).pow(new MetaNum(x))) },
            title: "Binary-prawn",
            display() { return `+50% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.5).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 2,
            unlocked() {return hasMilestone('^',9)}
        },
        91: {
            cost(x) { return new MetaNum(4e42).mul(new MetaNum(25).pow(new MetaNum(x))) },
            title: "Vigintiv",
            display() { return `+50% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.5).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 2,
            unlocked() {return hasMilestone('^',9)}
        },
        92: {
            cost(x) { return new MetaNum(8e42).mul(new MetaNum(25).pow(new MetaNum(x))) },
            title: "The amount of possible URL'S youtube can have",
            display() { return `+50% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.5).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 2,
            unlocked() {return hasMilestone('^',9)}
        },
        93: {
            cost(x) { return new MetaNum(1.6e43).mul(new MetaNum(25).pow(new MetaNum(x))) },
            title: "Olofa",
            display() { return `+50% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.5).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 2,
            unlocked() {return hasMilestone('^',9)}
        },
        94: {
            cost(x) { return new MetaNum(3e43).mul(new MetaNum(25).pow(new MetaNum(x))) },
            title: "Vigesine",
            display() { return `+50% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.5).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 2,
            unlocked() {return hasMilestone('^',9)}
        },
        95: {
            cost(x) { return new MetaNum(6e43).mul(new MetaNum(25).pow(new MetaNum(x))) },
            title: "Guppy",
            display() { return `+50% Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].power.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.5).add(1)},
            buy() {
                player[this.layer].power = player[this.layer].power.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 2,
            unlocked() {return hasMilestone('^',9)}
        },
        111: {
            cost(x) { return new MetaNum(0.25).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Megagross",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        112: {
            cost(x) { return new MetaNum(0.4).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Trdoocol",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        113: {
            cost(x) { return new MetaNum(0.55).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Juice",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        114: {
            cost(x) { return new MetaNum(0.75).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Octus",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        115: {
            cost(x) { return new MetaNum(1.25).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Octal-small fry",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        121: {
            cost(x) { return new MetaNum(3).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Quinary-guppy",
            display() { return `Another big jump! +5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        122: {
            cost(x) { return new MetaNum(6).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Qdrdoocol",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        123: {
            cost(x) { return new MetaNum(12).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Trishadara",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        124: {
            cost(x) { return new MetaNum(50).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "10 Letters",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        125: {
            cost(x) { return new MetaNum(200).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Eyelash mite-swarm",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        131: {
            cost(x) { return new MetaNum(25000).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Ternary-gobycrumb",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        132: {
            cost(x) { return new MetaNum(40000).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Dust mite-swarm",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        133: {
            cost(x) { return new MetaNum(55000).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Binary-gogolchunk",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        134: {
            cost(x) { return new MetaNum(70000).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Integral-dekapetaseptemdecile",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        135: {
            cost(x) { return new MetaNum(85000).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Cheese mite-swarm",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        141: {
            cost(x) { return new MetaNum(100000).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Quadrillion",
            display() { return `WOW! A QUADRILLION??? +5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        142: {
            cost(x) { return new MetaNum(125000).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Peta-Zeralum",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        143: {
            cost(x) { return new MetaNum(150000).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Gogolbit",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        144: {
            cost(x) { return new MetaNum(175000).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Nonus",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        145: {
            cost(x) { return new MetaNum(200000).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Clover mite-swarm",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        151: {
            cost(x) { return new MetaNum(2.5e9).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Guppybyte",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        152: {
            cost(x) { return new MetaNum(6.25e9).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Redhead",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        153: {
            cost(x) { return new MetaNum(1.5e10).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Pervushin's number",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        154: {
            cost(x) { return new MetaNum(3e10).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Byn-zeroptol",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        155: {
            cost(x) { return new MetaNum(5e10).mul(new MetaNum(1.2).pow(new MetaNum(x))) },
            title: "Undecus",
            display() { return `+5% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.05).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 20,
        },
        161: {
            cost(x) { return new MetaNum(1.5e11).mul(new MetaNum(1.4).pow(new MetaNum(x))) },
            title: "Unnilexian",
            display() { return `+10% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.1).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 10,
        },
        162: {
            cost(x) { return new MetaNum(3e11).mul(new MetaNum(1.4).pow(new MetaNum(x))) },
            title: "Glemmillion",
            display() { return `+10% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.1).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 10,
        },
        163: {
            cost(x) { return new MetaNum(6e11).mul(new MetaNum(1.4).pow(new MetaNum(x))) },
            title: "Guppychunk",
            display() { return `+10% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.1).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 10,
        },
        164: {
            cost(x) { return new MetaNum(1.5e12).mul(new MetaNum(1.4).pow(new MetaNum(x))) },
            title: "Decamel",
            display() { return `+10% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.1).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 10,
        },
        165: {
            cost(x) { return new MetaNum(5e12).mul(new MetaNum(1.4).pow(new MetaNum(x))) },
            title: "Ternary-gogolspeck",
            display() { return `+10% root point gain and exponential multiplier.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].sqrtp.gte(this.cost()) },
            effect(){
                return new MetaNum(getBuyableAmount(this.layer, this.id)).mul(0.1).add(1)},
            buy() {
                player[this.layer].sqrtp = player[this.layer].sqrtp.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 10,
        },
        10001: {
            cost(x) { return new MetaNum(1).mul(new MetaNum(2).pow(x)) },
            title: "Cardinality of the Power set of n",
            display() { return `x5 succession point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(5).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 50,
        },
        10002: {
            cost(x) { return new MetaNum(1.5).mul(new MetaNum(2).pow(x)) },
            title: "f2(n)",
            display() { return `x5 addition point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(5).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 50,
        },
        10003: {
            cost(x) { return new MetaNum(2).mul(new MetaNum(2).pow(x)) },
            title: "n!",
            display() { return `x5 multiplication point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(5).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 50,
        },
        10004: {
            cost(x) { return new MetaNum(3).mul(new MetaNum(2).pow(x)) },
            title: "n$ (Sloane and Plouffe)",
            display() { return `x2 subexponentiation point gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(2).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 50,
        },
        10005: {
            cost(x) { return new MetaNum(5).mul(new MetaNum(3).pow(x)) },
            title: "T(n)",
            display() { return `x2 power gain per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(2).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 50,
        },
        10006: {
            cost(x) { return new MetaNum(1e16).mul(new MetaNum(100).pow(x)) },
            title: "H(n)",
            display() { return `x1.5 Exponential Multiplier per level.
            <b>Cost: </b>` + format(this.cost()) + `
            <b>Amount: </b>` + format(getBuyableAmount(this.layer,this.id)) + "/" + format(tmp[this.layer].buyables[this.id].purchaseLimit) +`
            <b>Effect: </b>` + format(this.effect()) + 'x'},
            canAfford() { return player[this.layer].points.gte(this.cost()) },
            effect(){
                return new MetaNum(1.5).pow(getBuyableAmount(this.layer,this.id))},
            buy() {
                player[this.layer].points = player[this.layer].points.sub(this.cost()).max(0)
                setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
            },
            purchaseLimit: 100,
            unlocked() {return hasMilestone('^',6)}
        },
    },
    milestones: {
        1: {
            requirementDescription: "Exponential Tier 1 [10 exponential points]",
            effectDescription: `Unlock power. <br> 
            ^1.01 googology points. <br> 
            x5 subexponential points when your subexponential points are below 1e11. <br> 
            The nullology point exponent is permanently 1. <br> 
            All googology point gain divisions are removed. <br> 
            Autobuy all succession and nullology upgrades. <br> 
            Subexponential points are already unlocked. <br> 
            You can get multiple subtraction and division points at once. <br> 
            If you have 'Very Unreasonable', you gain 100% of nullology points per second. <br> 
            Automate the first 8 rows of addition upgrades.`,
            done() { return player[this.layer].points.gte(10) },
        },
        2: {
            requirementDescription: "Exponential Tier 2 [100 exponential points]",
            effectDescription: `Unlock the Exponential Multiplier. <br>
            Unlock more multiplication buyables. <br>
            Autobuy addition rows 9-14. <br>
            Passively generate 100% of succession points per second. <br>
            Keep division milestone 1. <br>
            Autobuy all multiplication upgrades until Million. <br>
            Autobuy the f1(n) buyable. <br>
            Autobuy all division upgrades. <br>
            Division is always unlocked. <br>
            Automate all of the subtraction layer.`,
            done() { return player[this.layer].points.gte(100) },
        },
        3: {
            requirementDescription: "Exponential Tier 3 [1,000 exponential points]",
            effectDescription: `x1,000 googology point gain. <br>
            Passively generate 100% of addition points per second. <br>
            Autobuy division points. <br>
            Autobuy all subexponentiation point buyables.`,
            done() { return player[this.layer].points.gte(1000) },
        },
        4: {
            requirementDescription: "Exponential Tier 4 [10,000 exponential points]",
            effectDescription: `^2.4 the Welkillillion effect.`,
            done() { return player[this.layer].points.gte(10000) },
        },
        5: {
            requirementDescription: "Exponential Tier 5 [1,000,000,000,000 exponential points]",
            effectDescription: `Unlock root points (located within a new tab in this layer).`,
            done() { return player[this.layer].points.gte(1e12) },
        },
        6: {
            requirementDescription: "Exponential Tier 6 [10,000,000,000,000,000 exponential points]",
            effectDescription: `Unlock Cube Root. <br>
            Unlock a new function.`,
            done() { return player[this.layer].points.gte(1e16) },
            unlocked() {return hasMilestone('^',5)}
        },
        7: {
            requirementDescription: "Exponential Tier 7 [1,000,000,000,000,000,000 exponential points]",
            effectDescription: `Unlock Fourth Root. <br>
            Unlock more power buyables.`,
            done() { return player[this.layer].points.gte(1e18) },
            unlocked() {return hasMilestone('^',6)}
        },
        8: {
            requirementDescription: "Exponential Tier 8 [10^26 exponential points]",
            effectDescription: `Root points^0.9 boost addition point gain. <br>
            Root points^1.4 boost succession point gain.`,
            done() { return player[this.layer].points.gte(1e26) },
            unlocked() {return hasMilestone('^',7)}
        },
        9: {
            requirementDescription: "Exponential Tier 9 [10^31 exponential points]",
            effectDescription: `Unlock more power buyables.`,
            done() { return player[this.layer].points.gte(1e31) },
            unlocked() {return hasMilestone('^',8)}
        },
    },
    challenges: {
        11: {
        name: "Square Root",
        challengeDescription: "Square root, then /1e15 Exponential Multiplier.",
        rewardDescription: "While in the challenge, based on subexponential points, you can generate root points.",
        canComplete: function() {return false},
        },
        12: {
        name: "Cube Root",
        challengeDescription: "Cube root, then /1e15 Exponential Multiplier. ^0.8 succession, addition, and multiplication points.",
        rewardDescription: "You can get more root points here than in Square Root.",
        canComplete: function() {return false},
        unlocked() {return hasMilestone('^',6)}
        },
        21: {
        name: "Fourth Root",
        challengeDescription: "Fourth root, then /1e15 Exponential Multiplier. ^0.64 succession, addition, and multiplication points.",
        rewardDescription: "You can get more root points here than in Cube Root.",
        canComplete: function() {return false},
        unlocked() {return hasMilestone('^',7)}
        },
    },
    infoboxes: {
        1: {
        title: "Number Goes Up",
        body() { return "You have reached new heights in your journey. Ten, one thousand, one million, and now ten billion. You might be able to go up forever at this rate. Maybe you can even reach the point where no one has gotten to before... infinity. I highly doubt it though." },
        },
        2: {
        title: "Exponential Multiplier",
        body() { return "Exponential Multiplier boosts googology points, succession points, addition points, multiplication points, subexponentiation points, exponentiation points, and power." },
        unlocked() {return hasMilestone('^',2)}
        },
    }
})