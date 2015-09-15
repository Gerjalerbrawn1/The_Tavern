encounters.drider_intro = {
	startEncounter: function (playerData) {
		//Button Removal and Addition
		createAndAddButton('.button_stack', {classes: 'newButton', id: 'drider_talk_01', text: 'Talk', click:getOnClick("drider_intro"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
		if (playerData.sex == "female" && !GetPlayerCounter("drider_quest_accepted_counter") || GetPlayerCounter("drider_quest_accepted_counter") === 0) {
			createAndAddButton('.button_stack', {classes: 'newButton', id: 'drider_quest_01', text: 'Get Quest', click:getOnClick("drider_intro"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
		};
		createAndAddButton('.button_stack', {classes: 'newButton', id: 'drider_leave', text: 'Back', click:getOnClick("drider_intro"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
		//Change Header Text
		PrintHeaderText('Will you walk into my parlour?');
		//This Modifies text based on quest
		var quest_desc = "";
		if (GetPlayerCounter("drider_quest_accepted_counter") === 0) {
			quest_desc += "Quest Declined<br>"  
		} else if (GetPlayerCounter("drider_quest_accepted_counter") === 1) {
			quest_desc += "Quest Accepted<br>"  
		} else {
			quest_desc
		};
		//Default description and modification
		var drider_desc = "Drider Description Goes Here";
		if (playerData.sex == "male") {
			drider_desc += '<br>Male Addition' + "<br>" + playerCharacter.race;
		} else {
			drider_desc += '<br>Female Addition' + "<br>" + playerCharacter.race;
		};

		//This Prints the changed text above into the game
		PrintGameText(quest_desc + drider_desc);
		//Sets the counter
		if (GetPlayerCounter("drider_intro_counter") != 1) {
			SetPlayerCounter("drider_intro_counter", 1);
		};
	},
	endEncounterAndGetNext: function (buttonID) {
		if (buttonID == "drider_talk_01") {
			var playercounter = GetPlayerCounter("drider_talk_counter")
			if (playercounter === 0 || playercounter === 1 || !playercounter) {
				return "drider_talk_01";			
			} else if (playercounter === 2) {
				return "drider_talk_02";
			} else if (playercounter === 3) {
				return "drider_talk_03";
			};
		} else if (buttonID == "drider_quest_01") {
			return "drider_quest_01";
		} else if (buttonID == "drider_leave") {
			return "default_tavern";
		} else {
			return "default_tavern";
		}
	}
},
encounters.drider_talk_01 = {
	startEncounter: function (playerData) {
		createAndAddButton('.button_stack', {classes: 'newButton', id: 'drider_talk_02', text: 'Continue', click:getOnClick("drider_talk_01"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
		createAndAddButton('.button_stack', {classes: 'newButton', id: 'drider_leave', text: 'Leave', click:getOnClick("drider_talk_01"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
		//Change Header Text
		PrintHeaderText('Said the Drider to the ' + playerCharacter.race + ".");
		//Change Body Text (Inital Description)
		var drider_chat_01 = "Drider Chat Text 1";
		PrintGameText(drider_chat_01);
		//This resets the counter so that this chat isn't seen more than once a 'talk' scene.
		SetPlayerCounter("drider_talk_counter", 2);
	},
	endEncounterAndGetNext: function (buttonID) {
		if (buttonID == "drider_talk_02") {
			return "drider_talk_02";
		} else if (buttonID == "drider_leave") {
			return "default_tavern"
		} else {
			return "default_tavern";
		}
	}
},
encounters.drider_talk_02 = {
	startEncounter: function (playerData) {
		createAndAddButton('.button_stack', {classes: 'newButton', id: 'drider_talk_03', text: 'Continue', click:getOnClick("drider_talk_02"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
		createAndAddButton('.button_stack', {classes: 'newButton', id: 'drider_leave', text: 'Leave', click:getOnClick("drider_talk_02"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
		//Change Header Text
		PrintHeaderText('Said the Drider to the ' + playerCharacter.race + ".");
		//Change Body Text (Inital Description)
		var drider_chat_01 = "Drider Chat Text 2";
		PrintGameText(drider_chat_01);
		//This resets the counter so that this chat isn't seen more than once a 'talk' scene.
		SetPlayerCounter("drider_talk_counter", 3);
	},
	endEncounterAndGetNext: function (buttonID) {
		if (buttonID == "drider_talk_03") {
			return "drider_talk_03";
		} else if (buttonID == "drider_leave") {
			return "default_tavern"
		}
	}
},

encounters.drider_talk_03 = {
	startEncounter: function (playerData) {
		createAndAddButton('.button_stack', {classes: 'newButton', id: 'drider_talk_04', text: 'Back', click:getOnClick("drider_talk_03"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
		createAndAddButton('.button_stack', {classes: 'newButton', id: 'drider_leave', text: 'Leave', click:getOnClick("drider_talk_03"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
		//Change Header Text
		PrintHeaderText('Said the Drider to the ' + playerCharacter.race + ".");
		//Change Body Text (Inital Description)
		var drider_chat_01 = "Drider Chat Text 3";
		PrintGameText(drider_chat_01);
		//This resets the counter so that this chat isn't seen more than once a 'talk' scene.
		SetPlayerCounter("drider_talk_counter", 1);

	},
	endEncounterAndGetNext: function (buttonID) {
		if (buttonID == "drider_talk_04") {
			return "drider_intro";
		} else if (buttonID == "drider_leave") {
			return "default_tavern"
		}
	}
},


encounters.drider_quest_01 = {
	startEncounter: function (playerData) {
		createAndAddButton('.button_stack', {classes: 'newButton', id: 'button_q_accept', text: 'Accept', click:getOnClick("drider_quest_01"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
		createAndAddButton('.button_stack', {classes: 'newButton', id: 'button_q_decline', text: 'Decline', click:getOnClick("drider_quest_01"), mouseenter: mousePreviewEnter, mouseleave: mousePreviewLeave});
		//Change Header Text
		PrintHeaderText('Said the Drider to the ' + playerCharacter.race + ".");
		//Change Body Text (Inital Description)
		var drider_chat_02 = "Drider Quest Text";
		SetPlayerCounter("drider_quest_seen_counter", 1);
		PrintGameText(drider_chat_02);
	},
	endEncounterAndGetNext: function (buttonID) {
		if (buttonID == "button_q_accept") {
			SetPlayerCounter("drider_quest_accepted_counter", 1);
			return "drider_intro";
		} else if (buttonID == "button_q_decline") {
			SetPlayerCounter("drider_quest_accepted_counter", 0);
			return "drider_intro"
		}
	}
}