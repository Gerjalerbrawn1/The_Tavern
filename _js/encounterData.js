//The Encounter Engine that basically runs the game.
//Code Name: The Humpfy iMAX 2.0


/*
Remminder how this works:
So when you run the START ENCOUNTER block as soon as you start the encounter, BUT you run the encounter AGAIN to move to the next encounter.
*/


//This is used when moving between encounters if an NPC or player has a response going into the next scene.
function PrintResponseText(newText) {
	$("#response_text").html(newText);
}
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
	PrintResponseText("");
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
		startEncounter: function (playerData) {
			PrintHeaderText("On Stormy Nights");
			PrintGameText('"Walking down the side ally as the night air howls. You hear sounds from a tavern up ahead and as you approach the doorway.<br> Before you can say anything two hands grab you and drag you into the entrance. This ork bouncer was huge and looks you over.<br>What do we have here? he snorts. <br>You remove your hood revealing a..."');
			//This creates the buttons
			createDefaultSetupButtons();
		},
		endEncounter: function (buttonID) {
			return "playerCreation_01"
		}
	},
	playerCreation_01: {
		startEncounter: function (playerData) {
			$('.form1').remove();
			$(".newButton").remove();
			createInputBox();
			createAndAddButton('.button_stack', {classes: 'newButton', id: 'submitName', text: 'Submit', click: getOnClick("playerCreation_01"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
			if(playerData.race == "human" && playerData.sex == "male") {
				PrintGameText("MALE HUMAN TEXT");
			} else if(playerData.race == "human" && playerData.sex == "female") {
				PrintGameText("FEMALE HUMAN TEXT");
			} else if(playerData.race == "elf" && playerData.sex == "male") {
				PrintGameText("MALE ELF TEXT")
			} else if(playerData.race == "elf" && playerData.sex == "female") {
				PrintGameText("FEMALE ELF TEXT")
			} else if(playerData.race == "dwarf" && playerData.sex == "male") {
				PrintGameText("MALE DWARF TEXT")
			} else if(playerData.race == "dwarf" && playerData.sex == "female") {
				PrintGameText("FEMALE DWARF TEXT")
			} else {
				PrintGameText("I AM ERROR")
			}
			$("#setName").val('');
		},
		endEncounterAndGetNext: function (buttonID) {
			return "playerCreation_02"
		}
	},
	playerCreation_02: {
		startEncounter: function (playerData) {
			var setName = document.getElementById("setName").value;
			if (setName === "") {
				PrintGameText('"I&#39;ve always hated ' + playerCharacter.race +'&#39;s who think they&#39;re all mysterious when they say nothing.<br>Saying nothing won&#39;t get you far inside friend. Now what&#39;s your name?"');
				createAndAddButton('.button_stack', {classes: 'newButton', id: 'submitName', text: 'Submit', click: getOnClick("playerCreation_01"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
			} else if (setName === "Hercule") {
				PrintGameText('"The greatest fighting chapion the world has ever known?! I think not friend. He is far above drinking at places such as this. For what he drinks is reserved for gods and ancient folk.<br>Who are you really?"');
				createAndAddButton('.button_stack', {classes: 'newButton', id: 'submitName', text: 'Submit', click: getOnClick("playerCreation_01"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
			} else if (setName === "Dequietus") {
				PrintGameText('"The necromancer? I thought him dead, but can you ever really kill a necromancer?<br>Either way, you ain&#39;t scaly enough.<br>Now how are you?"');
				createAndAddButton('.button_stack', {classes: 'newButton', id: 'submitName', text: 'Submit', click: getOnClick("playerCreation_01"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
			} else {
				playerCharacter.name = setName;
				PrintGameText('"<i>' + playerCharacter.name +'</i>, welcome to The Sentinal. We serve drinks and broken dreams but no edibles."<br>He nods and pushes the door open.');
				PrintHeaderText('Welcome to The Sentinal');
				$('#setName').remove();
				$(".newButton").remove();
				createAndAddButton('.button_stack', {classes: 'newButton', id: 'button_entertavern', text: 'Enter', click: getOnClick("playerCreation_02"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
				createAndAddButton('.button_stack', {classes: 'newButton', id: 'button_leavetavern', text: 'Leave', click: getOnClick("playerCreation_02"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
			}
		},
		endEncounterAndGetNext: function (buttonID) {
			if (buttonID == "button_entertavern") {
				return "default_tavern"
			} else if (buttonID == "button_leavetavern") {
				return "leave_tavern"
			} else {
				PrintGameText('ERROR');
				return
			}
		}
	},
	default_tavern: {
		startEncounter: function (playerData) {
			createDefaultTavernButtons();
			PrintGameText('Tavern Default Description');
		},
		endEncounterAndGetNext: function (buttonID) {
			if (buttonID == "button_bartender") {
				return "default_tavern"
			} else if (buttonID == "button_hoodedfigure") {
				return "default_tavern"
			} else if (buttonID == "button_drider") {
				return "drider_intro"
			} else {
				PrintGameText('ERROR');
				return
			}
		}
	},
	leave_tavern: {
		startEncounter: function (playerData) {
			$("#button_leavetavern").remove();
			PrintGameText('Seeing as you turn to go the ork holds his muscular arm across your chest, thoroughly blocking your exit.<br>He shakes his head.<br>"You go in, you buy a drink, and you reflect your life."<br>"People don&#39;t arrive at The Sentinal by accident."<br>It seems you have little choice in the matter.');
			createAndAddButton('.button_stack', {classes: 'newButton', id: 'button_entertavern', text: 'Enter', click: getOnClick("leave_tavern"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
		},
		endEncounterAndGetNext: function (buttonID) {
			if (buttonID == "button_entertavern") {
				return "default_tavern"
			} else {
				PrintGameText('ERROR');
				return
			}
		}
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
