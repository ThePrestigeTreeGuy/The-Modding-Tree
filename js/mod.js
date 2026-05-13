let modInfo = {
	name: "Universe Expander",
	author: "ThePrestigeTreeGuy/GamingAndWalkthoughs on discord",
	pointsName: "m^3",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (4.23e-105), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.21",
	name: "hotfix",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.21</h3><br>
		- Fixed a bug.<br>
		- Changed some other things.<br>
	<h3>v0.2</h3><br>
		- Added 2 types of matter.<br>
		- Added upgrades.<br>
		- Endgame: 1e-72 m^3 (1 yoctometre wide).<br>
	<h3>v0.1</h3><br>
		- Added 3 types of matter.<br>
		- Added upgrades and the Volume Level.<br>
		- Endgame: 1e-90 m^3 (1 quectometre wide).`

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

	let gain = new Decimal(0)
	gain = gain.add(buyableEffect('M',11))
	gain = gain.add(buyableEffect('M',12))
	gain = gain.add(buyableEffect('M',13))
	gain = gain.add(buyableEffect('M',21))
	gain = gain.add(buyableEffect('M',22))
	gain = gain.times(new Decimal(1.05).pow(new Decimal(player.points).mul(1e100).log(2).floor().add(1).max(0)).mul(new Decimal(player.points).mul(1e100).log(2).floor().add(2).max(1)).floor())
	if (hasUpgrade('M',134)) gain = gain.times(2)
	if (hasUpgrade('M',222)) gain = gain.times(upgradeEffect('M',222))
	if (hasUpgrade('M',323)) gain = gain.times(4)
	if (hasUpgrade('M',421)) gain = gain.times(upgradeEffect('M',421))
	if (hasUpgrade('M',422)) gain = gain.times(2)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
	function () { 
		if (new Decimal(player.points).gte(1e90)) return `You are ` + formatSmall(player.points.cbrt().div(1e30)) + ` quettametres wide`
		else if (new Decimal(player.points).lte(1e-81)) return `You are ` + formatSmall(player.points.cbrt().mul(1e30)) + ` quectometres wide`
		else if (new Decimal(player.points).lte(1e-72)) return `You are ` + formatSmall(player.points.cbrt().mul(1e27)) + ` rontometres wide`
		else if (new Decimal(player.points).lte(1e-63)) return `You are ` + formatSmall(player.points.cbrt().mul(1e24)) + ` yoctometres wide`
		else if (new Decimal(player.points).lte(1e-54)) return `You are ` + formatSmall(player.points.cbrt().mul(1e21)) + ` zeptometres wide`
		else if (new Decimal(player.points).lte(1e-45)) return `You are ` + formatSmall(player.points.cbrt().mul(1e18)) + ` attometres wide`
		else if (new Decimal(player.points).lte(1e-36)) return `You are ` + formatSmall(player.points.cbrt().mul(1e15)) + ` femtometres wide`
		else if (new Decimal(player.points).lte(1e-27)) return `You are ` + formatSmall(player.points.cbrt().mul(1e12)) + ` picometres wide`
		else if (new Decimal(player.points).lte(1e-18)) return `You are ` + formatSmall(player.points.cbrt().mul(1e9)) + ` nanometres wide`
		else if (new Decimal(player.points).lte(1e-9)) return `You are ` + formatSmall(player.points.cbrt().mul(1e6)) + ` micrometres wide`
		else if (new Decimal(player.points).lte(1)) return `You are ` + formatSmall(player.points.cbrt().mul(1e3)) + ` millimetres wide`
		else if (new Decimal(player.points).lte(1e9)) return `You are ` + formatSmall(player.points.cbrt()) + ` metres wide`
		else if (new Decimal(player.points).lte(1e18)) return `You are ` + formatSmall(player.points.cbrt().div(1e3)) + ` kilometres wide`
		else if (new Decimal(player.points).lte(1e27)) return `You are ` + formatSmall(player.points.cbrt().div(1e6)) + ` megametres wide`
		else if (new Decimal(player.points).lte(1e36)) return `You are ` + formatSmall(player.points.cbrt().div(1e9)) + ` gigametres wide`
		else if (new Decimal(player.points).lte(1e45)) return `You are ` + formatSmall(player.points.cbrt().div(1e12)) + ` terametres wide`
		else if (new Decimal(player.points).lte(1e54)) return `You are ` + formatSmall(player.points.cbrt().div(1e15)) + ` petametres wide`
		else if (new Decimal(player.points).lte(1e63)) return `You are ` + formatSmall(player.points.cbrt().div(1e18)) + ` exametres wide`
		else if (new Decimal(player.points).lte(1e72)) return `You are ` + formatSmall(player.points.cbrt().div(1e21)) + ` zettametres wide`
		else if (new Decimal(player.points).lte(1e81)) return `You are ` + formatSmall(player.points.cbrt().div(1e24)) + ` yottametres wide`
		else if (new Decimal(player.points).lte(1e90)) return `You are ` + formatSmall(player.points.cbrt().div(1e27)) + ` ronnametres wide`
	}
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e-72"))
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