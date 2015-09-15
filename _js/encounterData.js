//The Encounter Engine that basically runs the game.
//Code Name: The Humpfy iMAX 2.0

/*
Remminder how this works:
So when you run the START ENCOUNTER block as soon as you start the encounter, BUT you run the encounter AGAIN to move to the next encounter.
*/

//Prints game text to the div.
function PrintGameText(newText) {
	$("#output_text").html(newText);
}
//Changes the title next div.
function PrintHeaderText(newText) {
	$("#title_name").html(newText);
}

function SetupEncounter() {
	$(".newButton").remove();
	mousePreviewLeave();
	PrintGameText("");
}

function GetPlayerCounter (counterName) {
	return playerCharacter.counters[counterName];
}
function SetPlayerCounter (counterName, value) {
	playerCharacter.counters[counterName] = value;
}


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
		//See e_tavern.js
	},
	leave_tavern: {
		//See e_tavern.js
	},
	drider_intro: {
		//See drider_encounter.js
	},
	drider_talk_01: {
		//See drider_encounter.js
	},
	drider_talk_02: {
		//See drider_encounter.js
	},
	drider_quest_01: {
		//See drider_encounter.js
	}
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

//So this sets up the initiaization of the game.
$(document).ready(function () {
	RunEncounter("playerCreation_00");
})
