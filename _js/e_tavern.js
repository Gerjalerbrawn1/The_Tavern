encounters.default_tavern = {
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
encounters.leave_tavern = {
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
}