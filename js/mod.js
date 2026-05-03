let modInfo = {
	name: "The Atomic Tree",
	author: "ThePrestigeTreeGuy/GamingAndWalkthoughs on discord",
	pointsName: "atomic particles",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.2",
	name: "Antimatter non-Dimensions",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.2</h3><br>
		- Added a new layer, antimatter.<br>
		- Added 5 upgrades, 9 milestones, 8 buyables, and 2 challenges.<br>
		- New total: 30 upgrades, 14 milestones, 12 buyables, and 4 challenges.<br>
		- Changed the upgrade names.<br>
		- Endgame: 1e610 atomic particles.<br>
	<h3>v0.1</h3><br>
		- Added the first 2 layers, hydrogen and helium.<br>
		- Added 25 upgrades, 5 milestones, 4 buyables, and 2 challenges.<br>
		- Endgame: 1e70 atomic particles.`

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
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	gain = gain.times(tmp['H'].challenges[11].rewardEffect)
	gain = gain.times(tmp['H'].challenges[12].rewardEffect)
	gain = gain.times(tmp['H'].effect)
	gain = gain.times(tmp['He'].effect)
	gain = gain.times(tmp['Li'].effect)
	if (hasUpgrade('H',11)) gain = gain.times(2)
	if (hasUpgrade('H',12)) gain = gain.times(upgradeEffect('H', 12))
	if (hasUpgrade('H',13)) gain = gain.times(upgradeEffect('H', 13))
	gain = gain.times(buyableEffect('H', 11))
	if (hasUpgrade('H',21)) gain = gain.times(2)
	if (hasMilestone('He',1)) gain = gain.times(2)
	if (hasUpgrade('H',22)) gain = gain.times(upgradeEffect('H', 22))
	gain = gain.times(buyableEffect('H', 12))
	if (hasUpgrade('H',31)) gain = gain.times(2.001)
	if (hasUpgrade('H',32)) gain = gain.times(2.002)
	if (hasUpgrade('H',33)) gain = gain.times(2.003)
	gain = gain.times(buyableEffect('H', 13))
	gain = gain.times(buyableEffect('H', 21))
	gain = gain.times(buyableEffect('am', 11))
	gain = gain.times(buyableEffect('H', 31))
	gain = gain.times(buyableEffect('H', 32))
	if (hasUpgrade('He',15)) gain = gain.times(upgradeEffect('He', 15))
	gain = gain.times(buyableEffect('He', 11))
	if (hasMilestone('He',18)) gain = gain.times(1e5)
	gain = gain.pow(tmp['Li'].milestones[1].effect)
	if (hasMilestone('am',1)) gain = gain.pow(1.01)
	gain = gain.pow(tmp['H'].challenges[22].rewardEffect)
	if (inChallenge('H',11)) gain = gain.pow(0.5)
	if (inChallenge('H',12)) gain = gain.pow(0.01)
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
	return player.points.gte(new Decimal("e610"))
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