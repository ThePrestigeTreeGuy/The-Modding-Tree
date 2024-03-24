let modInfo = {
	name: "The Doors Tree",
	id: "37258649213278",
	author: "ThePrestigeTreeGuy/Gaming And Walkthroughs on discord",
	pointsName: "studs",
	modFiles: ["layers.js", "tree.js"],

	discordName: "random57854",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.6.1",
	name: "capitalism(realer)",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.6.1</h3><br>
		- added 35 upgrades<br>
		- added a challenge<br>
		- Endgame: e13600 points (Dupe 10, pre-??? <- new layer)<br>
	<h3>v0.6</h3><br>
		- added 2 LAYERS????<br>
		- Added 18 upgrades!!!<br>
		- automation.<br>
		- Endgame: e215 studs.<br>
	<h3>v0.5.1.1</h3><br>
		- fixed a bug<br>
	<h3>v0.5.1</h3><br>
		- an update for sure<br>
		- More content in dupe layer.<br>
		- Added 4 upgrades.<br>
		- Endgame: Dupe 4.<br>
		- Bug fixing!<br>
	<h3>v0.5</h3><br>
		- smaller update here<br>
		- Added  5th layer, dupe<br>
		- 6 more upgrades<br>
		- More milestones<br>
		- Endgame: Dupe Milestone 2<br>
	<h3>v0.4</h3><br>
		- Added the fourth layer, RUSH<br>
		- Added 10 upgrades!<br>
		- Some design improvements!<br>
		- Expanded 1st row!<br>
		- Endgame: e30 studs.<br>
	<h3>v0.3</h3><br>
		- Added the third layer, knobs.<br>
		- Added 5 upgrades!<br>
		- Endgame: Knob Upgrade 3.<br>
	<h3>v0.2</h3><br>
		- Added the second layer, closets.<br>
		- Added an upgrade.<br>
		- Endgame: 10 closets.<br>
	<h3>v0.1</h3><br>
		- Added the first layer, doors.<br>
		- Added an upgrade.<br>
		- Endgame: 5 doors.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints()
		)return new Decimal(0)
	let gain = new Decimal(1)
	if (hasUpgrade('d', 11)) gain = gain.times(upgradeEffect('d', 11))
	if (hasUpgrade('d', 12)) gain = gain.times(upgradeEffect('d', 12))
	if (hasUpgrade('d', 13)) gain = gain.times(upgradeEffect('d', 13))
	if (hasUpgrade('d', 14)) gain = gain.times(upgradeEffect('d', 14))
	if (hasUpgrade('d', 15)) gain = gain.times(upgradeEffect('d', 15))
	if (hasUpgrade('d', 34)) gain = gain.times(1e5)
	if (hasUpgrade('c', 11)) gain = gain.times(10)
	if (hasUpgrade('c', 12)) gain = gain.times(upgradeEffect('c', 12))
	if (hasUpgrade('c', 13)) gain = gain.times(upgradeEffect('c', 13))
	if (hasUpgrade('c', 22)) gain = gain.times(upgradeEffect('c', 22))
	if (hasUpgrade('c', 23)) gain = gain.times(upgradeEffect('c', 23))
	if (hasUpgrade('c', 25)) gain = gain.times(100)
	if (hasUpgrade('c', 35)) gain = gain.times(100)
	if (hasUpgrade('k', 11)) gain = gain.times(10)
	if (hasUpgrade('k', 12)) gain = gain.times(upgradeEffect('k', 12))
	if (hasUpgrade('k', 13)) gain = gain.times(upgradeEffect('k', 13))
	if (hasUpgrade('k', 14)) gain = gain.times(upgradeEffect('k', 14))
	if (hasUpgrade('k', 15)) gain = gain.times(upgradeEffect('k', 15))
	if (hasUpgrade('k', 34)) gain = gain.times(upgradeEffect('k', 34))
	if (hasUpgrade('r', 11)) gain = gain.times(10)
	if (hasUpgrade('r', 12)) gain = gain.times(upgradeEffect('r', 12))
	if (hasUpgrade('r', 15)) gain = gain.times(upgradeEffect('r', 15))
	if (hasUpgrade('r', 22)) gain = gain.times(upgradeEffect('r', 22))
	if (hasUpgrade('r', 23)) gain = gain.times(upgradeEffect('r', 23))
	if (hasUpgrade('r', 31)) gain = gain.times(1e20)
	if (hasMilestone('du', 1)) gain = gain.times(100)
	if (hasUpgrade('du', 12)) gain = gain.times(upgradeEffect('du', 12))
	if (hasUpgrade('du', 13)) gain = gain.times(upgradeEffect('du', 13))
	if (hasUpgrade('du', 14)) gain = gain.times(upgradeEffect('du', 14))
	if (hasUpgrade('du', 15)) gain = gain.times(upgradeEffect('du', 15))
	if (hasUpgrade('du', 21)) gain = gain.times(upgradeEffect('du', 21))
	if (hasMilestone('f', 1)) gain = gain.times(100)
	if (hasMilestone('f', 4)) gain = gain.times(tmp['f'].milestones[4].effect)
	if (hasUpgrade('f', 15)) gain = gain.times(upgradeEffect('f', 15))
	if (hasMilestone('g', 1)) gain = gain.times(100)
	if (hasUpgrade('g', 12)) gain = gain.pow(1.05)
	if (hasUpgrade('g', 13)) gain = gain.pow(1.05)
	if (hasUpgrade('g', 14)) gain = gain.pow(1.05)
	if (hasUpgrade('g', 15)) gain = gain.pow(upgradeEffect('g', 15))
	if (hasUpgrade('k', 24)) gain = gain.pow(1.05)
	if (hasUpgrade('k', 25)) gain = gain.pow(1.05)
	if (hasUpgrade('d', 31)) gain = gain.pow(1.05)
	if (hasUpgrade('c', 31)) gain = gain.pow(1.05)
	if (hasUpgrade('f', 11)) gain = gain.pow(1.05)
	if (hasUpgrade('f', 13)) gain = gain.pow(1.05)
	if (hasUpgrade('c', 34)) gain = gain.pow(upgradeEffect('c', 34))
	if (inChallenge('r',11)) gain = gain.pow(0.5)
	if (hasChallenge('r',11)) gain = gain.pow(1.05)
	if (hasUpgrade('du',22)) gain = gain.pow(1.03)
	if (hasUpgrade('du',23)) gain = gain.pow(1.03)
	if (hasUpgrade('du',24)) gain = gain.pow(1.03)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e13600"))
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