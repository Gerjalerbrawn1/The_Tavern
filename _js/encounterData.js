//The Encounter Engine that basically runs the game.
//Code Name: The Humpfy iMAX 2.0

/*
Remminder how this works:
So when you run the START ENCOUNTER block as soon as you start the encounter, BUT you run the encounter AGAIN to move to the next encounter.
*/
var encounters = {
	playerCreation_00: {
		//See e_playerSetup.js
	},
	playerCreation_01: {
		//See e_playerSetup.js
	},
	playerCreation_02: {
		//See e_playerSetup.js
	},
	default_tavern: {
		//See encounter_tavern.js
	},
	leave_tavern: {
		//See encounter_tavern.js
	},
	drider_intro: {
		//See encounter_tavern.js
	},
	drider_talk_01: {
		//See encounter_tavern.js
	},
	drider_talk_02: {
		//See encounter_tavern.js
	},
	drider_quest_01: {
		//See encounter_tavern.js
	},
	tavern_random_01: {
		//See encounter_tavern.js
	},	
	tavern_random_02: {
		//See encounter_tavern.js
	},
	tavern_random_03: {
	//See encounter_tavern.js
	}
}

//Prints game text to the div.
function PrintGameText(newText) {
	$("#output_text").html(newText);
}
//Changes the title next div.
function PrintHeaderText(newText) {
	$("#title_name").html(newText);
}

//Clears old encounter and preps for the new one.
function SetupEncounter() {
	$(".newButton").remove();
	mousePreviewLeave();
	PrintGameText("");
}

//Does what it says on the box.
function GetPlayerCounter (counterName) {
	return playerCharacter.counters[counterName];
}
//Does what it says on the box.
function SetPlayerCounter (counterName, value) {
	playerCharacter.counters[counterName] = value;
}

// to show the text in this encounter, pass it the id like "playerCreation_01"
function RunEncounter(encounterId) {
	SetupEncounter();
	encounters[encounterId].startEncounter(playerCharacter); // assume playerData is defined elsewhere and has your player data
}
// for use with your onclick, where you pass it the decision text and it gives you the next encounter
function GetNextEncounter(encounterId, decision) {
	return encounters[encounterId].endEncounterAndGetNext(decision);
}
function GetRandomArrayElement(array) {
	// Math.random provides a random decimal number between 0 and 1 (can be 0, but won't be 1)
	// By multiplying by the length of the array, we extend the random range to be 0 to the length (so 0-4 if the array length is 4)
	// Math.floor ensures that this number is an integer by rounding down. Indicies can only be integers. 
	// So, at the end, we have any number from 0 to array.length - 1 (because the random doesn't ever produce 1)
	// (In our 4 element example, this yields a random in range 0 to 3, which captures all valid indicies!)
	var randomNum = Math.floor(Math.random() * array.length);
	return array[randomNum];
}
//So this sets up the initiaization of the game.
$(document).ready(function () {
	RunEncounter("playerCreation_00");
})
