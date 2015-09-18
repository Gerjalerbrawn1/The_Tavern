encounters.playerCreation_00 = {
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
encounters.playerCreation_01 = {
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
encounters.playerCreation_02 = {
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
}