let modInfo = {
	name: "The Doors Tree",
	id: "37258649213278",
	author: "ThePrestigeTreeGuy",
	pointsName: "studs",
	modFiles: ["layers.js", "tree.js"],

	discordName: "random57854",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 0,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.4",
	name: "Hide in the closet! Rush is coming!",
}

let changelog = `<h1>Changelog:</h1><br>
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
	if (hasUpgrade('c', 11)) gain = gain.times(10)
	if (hasUpgrade('c', 12)) gain = gain.times(upgradeEffect('c', 12))
	if (hasUpgrade('c', 13)) gain = gain.times(upgradeEffect('c', 13))
	if (hasUpgrade('k', 11)) gain = gain.times(10)
	if (hasUpgrade('k', 12)) gain = gain.times(upgradeEffect('k', 12))
	if (hasUpgrade('k', 13)) gain = gain.times(upgradeEffect('k', 13))
	if (hasUpgrade('k', 14)) gain = gain.times(upgradeEffect('k', 14))
	if (hasUpgrade('k', 15)) gain = gain.times(upgradeEffect('k', 15))
	if (hasUpgrade('r', 11)) gain = gain.times(10)
	if (hasUpgrade('r', 12)) gain = gain.times(upgradeEffect('r', 12))
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
	return player.points.gte(new Decimal(1e30))
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