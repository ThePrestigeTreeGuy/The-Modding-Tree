let modInfo = {
	name: "The Googology Tree",
	author: "ThePrestigeTreeGuy/GamingAndWalkthoughs on discord",
	pointsName: "googology points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new MetaNum (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.11",
	name: "Based Comeback",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.11: Based Comeback</h3><br>
		- Added a lot of buyables, two challenges, and three milestones. <br>
		- Added the base feature.<br>
		- Endgame: 1.000 x 10^30, 1e177 subexponentiation points.<br>
	<h3>v0.10.1</h3><br>
		- Achievements are now visible, even if they are not unlocked.<br>
		- Endgame: The same as v0.9.<br>
	<h3>v0.10: Preparations</h3><br>
		- Changed the big number library to MetaNum.<br>
		- Added achievements.<br>
		- Added a new theme.<br>
		- Endgame: The same as v0.9.<br>
	<h3>v0.9.1</h3><br>
		- Added some clarification.<br>
		- Endgame: The same as v0.9.<br>
	<h3>v0.9: The Radical Update</h3><br>
		- Added a lot of buyables, three challenges, and four milestones. <br>
		- Added the root feature. <br>
		- Changed the changelog. <br>
		- Added a thumbnail on galaxy.click. <br>
		- Endgame: 100,000,000,000,000,000,000, 1e44 power.<br>
	<h3>v0.8: Revamp</h3><br>
		- Changed the succession, addition, division, and nullology reset layers. <br>
		- Slightly changed the UI. <br>
		- Fixed a bug. <br>
		- Endgame: The same as v0.7.<br>
	<h3>v0.7.1</h3><br>
		- Fixed a bug.<br>
		- Endgame: The same as v0.7.<br>
	<h3>v0.7: Exponentiation</h3><br>
		- Added a lot of buyables and five milestones.<br>
		- Added exponentiation points, power, and Exponential Multiplier.<br>
		- Endgame: 7,625,597,484,987, 1e12 exponentiation points<br>
	<h3>v0.6: Subexponentiation</h3><br>
		- Added a bunch of upgrades and buyables.<br>
		- Added subexponentiation points.<br>
		- Endgame: 10,000,000,000, 1e11 subexponentiation points<br>
	<h3>v0.5: Upgrade Spam</h3><br>
		- Added a bunch of upgrades.<br>
		- Endgame: 999,999, 5e65 addition points<br>
	<h3>v0.4: Goin' Down</h3><br>
		- Added 2 layers (division & nullology).<br>
		- Endgame: 7,744, 3e27 nullology points<br>
	<h3>v0.3: Multiplication</h3><br>
		- Added 1 layer (multiplication).<br>
		- Endgame: 486, 9.99e99 googology points<br>
	<h3>v0.2: Addition and Subtraction</h3><br>
		- Added 2 layers (addition & subtraction).<br>
		- Endgame: 100, 21 subtraction points<br>
	<h3>v0.1: Succession</h3><br>
		- Added 1 layer (succession).<br>
		- Endgame: 10, 7.5e14 succession points`

let winText = `Congratulations! You have reached the end and beaten this game, for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new MetaNum(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new MetaNum(0)

	let gain = new MetaNum(1)
    if (hasUpgrade('S', 11)) gain = gain.times(upgradeEffect('S', 11))
    if (hasUpgrade('S', 12)) gain = gain.times(upgradeEffect('S', 12))
    if (hasUpgrade('S', 44)) gain = gain.times(upgradeEffect('S', 44))
    if (hasUpgrade('S', 45)) gain = gain.times(upgradeEffect('S', 45))
    if (hasUpgrade('S', 51)) gain = gain.times(2.5)
    if (hasUpgrade('S', 52)) gain = gain.times(2.5)
    if (hasUpgrade('S', 53)) gain = gain.times(upgradeEffect('S', 53))
    if (hasUpgrade('S', 54)) gain = gain.times(upgradeEffect('S', 54))
    if (hasUpgrade('S', 55)) gain = gain.times(upgradeEffect('S', 55))
    gain = gain.times(buyableEffect('S', 11))
    if (hasUpgrade('S', 71)) gain = gain.times(3.2)
    if (hasUpgrade('S', 72)) gain = gain.times(3)
    if (hasUpgrade('S', 73)) gain = gain.times(2.8)
    if (hasUpgrade('S', 74)) gain = gain.times(2.7)
    if (hasUpgrade('S', 75)) gain = gain.times(2.3)
    if (hasUpgrade('S', 81)) gain = gain.times(2)
    if (hasUpgrade('S', 82)) gain = gain.times(1.2)
    if (hasUpgrade('S', 83)) gain = gain.times(4)
    if (hasUpgrade('S', 84)) gain = gain.times(3)
    if (hasUpgrade('S', 85)) gain = gain.times(2)
    if (hasUpgrade('+', 12)) gain = gain.times(upgradeEffect('+', 12))
    if (hasUpgrade('+', 14)) gain = gain.times(upgradeEffect('+', 14))
    gain = gain.times(tmp['-'].effect)
    if (hasUpgrade('+', 31)) gain = gain.times(1.8)
    if (hasUpgrade('+', 32)) gain = gain.times(1.75)
    if (hasUpgrade('+', 33)) gain = gain.times(1.8)
    if (hasUpgrade('+', 34)) gain = gain.times(1.85)
    if (hasUpgrade('+', 35)) gain = gain.times(1.9)
    if (hasUpgrade('+', 41)) gain = gain.times(1.85)
    if (hasUpgrade('x', 11)) gain = gain.times(4)
    if (hasUpgrade('+', 42)) gain = gain.times(10)
    if (hasUpgrade('x', 12)) gain = gain.times(7.5)
    if (hasUpgrade('x', 13)) gain = gain.times(7.75)
    if (hasUpgrade('x', 14)) gain = gain.times(8)
    if (hasUpgrade('x', 21)) gain = gain.times(8.25)
    if (hasUpgrade('x', 22)) gain = gain.times(8.5)
    if (hasUpgrade('x', 23)) gain = gain.times(8.75)
    if (hasUpgrade('x', 24)) gain = gain.times(9)
    if (hasUpgrade('x', 25)) gain = gain.times(9.25)
    if (hasUpgrade('x', 31)) gain = gain.times(9.5)
    if (hasUpgrade('x', 32)) gain = gain.times(9.75)
    if (hasUpgrade('x', 33)) gain = gain.times(10)
    gain = gain.times(buyableEffect('x', 11))
    if (hasUpgrade('x', 34)) gain = gain.times(10)
    if (hasUpgrade('x', 35)) gain = gain.times(10)
    if (!hasMilestone('^',1)) gain = gain.div(tmp['÷'].effect)
    if (hasUpgrade('-', 35) && !hasMilestone('^',1)) gain = gain.div(1000)
    if (hasUpgrade('x', 45) && !hasMilestone('^',1)) gain = gain.div(1000)
    if (hasUpgrade('÷', 11) && !hasUpgrade('x',121) && !hasMilestone('^',1)) gain = gain.div(1e10)
    if (hasUpgrade('x', 53)) gain = gain.times(25.753)
    if (hasUpgrade('x', 54)) gain = gain.times(27.777)
    if (hasUpgrade('x', 55)) gain = gain.times(20.847)
    if (hasUpgrade('÷', 12) && !hasUpgrade('x',121) && !hasMilestone('^',1)) gain = gain.div(1e10)
    if (hasUpgrade('÷', 13) && !hasUpgrade('x',121) && !hasMilestone('^',1)) gain = gain.div(1e10)
    if (hasUpgrade('n', 15)) gain = gain.times(12)
    if (hasUpgrade('n', 25)) gain = gain.times(13.85)
    if (hasUpgrade('n', 35)) gain = gain.times(upgradeEffect('n',35))
    if (hasUpgrade('n', 45)) gain = gain.times(5.2197)
    if (hasUpgrade('n', 55)) gain = gain.times(7.314)
    if (hasUpgrade('n', 65)) gain = gain.times(5.4098)
    if (hasUpgrade('n', 75)) gain = gain.times(5.4913)
    if (hasUpgrade('n', 85)) gain = gain.times(8.5346)
    if (hasUpgrade('n', 95)) gain = gain.times(5.6666)
    if (hasUpgrade('n', 105)) gain = gain.times(6.7744)
    if (hasUpgrade('n', 115)) gain = gain.times(7)
    if (hasUpgrade('n', 125)) gain = gain.times(7)
    if (hasUpgrade('n', 135)) gain = gain.times(7)
    if (hasUpgrade('n', 145)) gain = gain.times(7)
    if (hasUpgrade('x', 63)) gain = gain.times(20)
    if (hasUpgrade('x', 64)) gain = gain.times(5)
    if (hasUpgrade('x', 65)) gain = gain.times(10)
    if (hasUpgrade('x', 71)) gain = gain.times(20)
    if (hasUpgrade('÷', 14) && !hasUpgrade('x',121) && !hasMilestone('^',1) && !hasMilestone('^',1)) gain = gain.div(1e10)
    if (hasUpgrade('n', 151)) gain = gain.times(7)
    if (hasUpgrade('n', 152)) gain = gain.times(7)
    if (hasUpgrade('n', 153)) gain = gain.times(10)
    if (hasUpgrade('n', 154)) gain = gain.times(10)
    if (hasUpgrade('n', 155)) gain = gain.times(10)
    if (hasUpgrade('n', 161)) gain = gain.times(10)
    if (hasUpgrade('n', 162)) gain = gain.times(10)
    if (hasUpgrade('n', 163)) gain = gain.times(10)
    if (hasUpgrade('n', 164)) gain = gain.times(10)
    if (hasUpgrade('x', 72)) gain = gain.times(5)
    if (hasUpgrade('x', 73)) gain = gain.times(20)
    if (hasUpgrade('x', 74)) gain = gain.times(5)
    if (hasUpgrade('x', 75)) gain = gain.times(20)
    if (hasUpgrade('x', 81)) gain = gain.times(5)
    if (hasUpgrade('x', 82)) gain = gain.times(15)
    if (hasUpgrade('x', 83)) gain = gain.times(6.666)
    if (hasUpgrade('x', 84)) gain = gain.times(15)
    if (hasUpgrade('x', 85)) gain = gain.times(6.666)
    if (hasUpgrade('x', 91)) gain = gain.times(15)
    if (hasUpgrade('x', 92)) gain = gain.times(6.666)
    if (hasUpgrade('x', 93)) gain = gain.times(15)
    if (hasUpgrade('x', 94)) gain = gain.times(6.666)
    if (hasUpgrade('x', 95)) gain = gain.times(10)
    if (hasUpgrade('÷', 15) && !hasUpgrade('x',121) && !hasMilestone('^',1)) gain = gain.div(1e3)
    if (hasMilestone('^',3)) gain = gain.times(1000)
    gain = gain.times(player['^'].expmult)
    if (hasMilestone('^',1)) gain = gain.pow(1.01)
    gain = gain.min(new MetaNum(9.99e99).sub(player.points))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function () {if (inChallenge('^',31)) return `Your number is √∜` + String(player['S'].number)
        else if (inChallenge('^',22)) return `Your number is √∛` + String(player['S'].number)
        else if (inChallenge('^',21)) return `Your number is ∜` + String(player['S'].number)
        else if (inChallenge('^',12)) return `Your number is ∛` + String(player['S'].number)
        else if (inChallenge('^',11)) return `Your number is √` + String(player['S'].number)
        else return `Your number is ` + String(player['S'].number)}
]

// Determines when the game "ends"
function isEndgame() {
	return player['x'].sp.gte(1e177)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}