
function sumbitName() {
	RunEncounter("playerCreation_02");
}

function createInputBox() {
	$('<input>').attr({type: 'nameInputBox', id: 'setName', placeholder: 'Enter Name Here'}).appendTo('.optionStack');
}

// keyed by button id -> preview text
var previewTextLookup = {
	"button_human": "+ 1 STR<br>+ 1 CHA<br>Perk: Compatible",
	"button_elf": "- 2 STR<br>+ 2 DEX<br>+ 3 CHA<br>Perk: Ageless", 
	"button_dwarf": "+ 4 STR<br>Perk: Scottish Accent",
	"submitName": "Tell the ork your name.",
	"button_drider": "Drider",
	"drider_leave": "Return to the tavern.",
	"button_hoodedfigure": "Hooded Guy",
	"button_bartender": "The Bartender",
	"button_entertavern": "Enter the tavern.",
	"button_leavetavern": "Venture back into the storm."
}
//mouse preview creator
function mousePreviewEnter (event) { 
	$('.optionPreview').show();

	var buttonId = $(event.target).attr("id");
	if(previewTextLookup[buttonId]) {
		setPreviewText(previewTextLookup[buttonId]); 
	} else {
		setPreviewText("ERROR"); 
	}
}
//mouse preview setter
function setPreviewText(text) {
	document.getElementById("preview").innerHTML = text; 
}
//mouse preview destoryer
function mousePreviewLeave () {
	$( ".optionPreview" ).hide();
}


function chooseRace (event) {
	//Sets the player's gender
	playerCharacter.sex = $(".chooseSex:checked").val();
	//Sets data for playerCharacter which will be used when the encounter is run - TODO: Eventually this will also adds the stats/perks to playerData.js
	if ($(event.target).attr("id") === "button_human") {
		playerCharacter.race = "human";
	} else if ($(event.target).attr("id") === "button_elf") {
		playerCharacter.race = "elf";
	} else if ($(event.target).attr("id") === "button_dwarf") {
		playerCharacter.race = "dwarf";
	}
	//Clear Mouse Leave
	mousePreviewLeave();
	//Run the Encounter to find the next encounter.
	RunEncounter("playerCreation_01");
	//Get the Next Encounter
	GetNextEncounter("playerCreation_01", $(event.target).attr("id"));
}

//Make these for each button that runs a unique encounter
$("#button_drider").click(getOnClick("default_tavern"));


//So this takes the above list finds adds the encounter ID and then Runs whatever encounter is returned
function getOnClick (encounterID) {
	return function (event) {
		RunEncounter(GetNextEncounter(encounterID, $(event.target).attr("id")));	
	};
}


//Kasey's Code!

//WHAT A BUTON LOOKS LIKE http://screencast.com/t/VS38RzEqmLew
//Add specific things here when making a unique button thingy (like mouseleave, functions, etc)
function makeButton(params) {
	var newButton = $("<button/>");

	if(params.classes) {
		newButton.addClass(params.classes);
	}

	if(params.id) {
		newButton.attr("id", params.id)
	}

	if(params.text) {
		newButton.html(params.text);
	}

	if(params.click) {
		newButton.click(params.click);
	}

	if (params.mouseleave) {
		newButton.mouseleave(params.mouseleave)
	}

	if (params.mouseenter) {
		newButton.mouseenter(params.mouseenter)
	}
	return newButton;
}

// elementSelector is a jQuery selector (e.g. ".default_tavern")
//Example: createAndAddButton(".button_stack",{classes: "newButton",id: "button666",text: "JOHN EVANS"});
function createAndAddButton(elementSelector, params) {
	$(elementSelector).append(makeButton(params));
}

// sharedParams has normal params that are shared, idsToText is a dictionary of ids -> text
function createAndAddSetOfButtons(elementSelector, sharedParams, idsToText) {
	var currentParams = sharedParams;
	for (var id in idsToText) { // for every id in our idsToText
		currentParams.id = id;
		currentParams.text = idsToText[id];
		createAndAddButton(elementSelector, currentParams);
	}
}
//This function creates the default Tavern buttons
function createDefaultTavernButtons () {
	//Removes all buttons
	$(".newButton").remove();
	//Creates Names (if statement changes name of buttons)
	var tavernIds = {
		"button_bartender": "Bartender",
		"button_hoodedfigure": "Hooded Figure",
		"button_drider": "Drider"
	}
	//The if statement that changes the names	
	if(GetPlayerCounter("drider_intro_counter") == 1) {
		tavernIds["button_drider"] = "Cynthia";
	}
	//This is what to edit if you want to add more shared params to the set of buttons that's being created
	createAndAddSetOfButtons(".button_stack", {classes: "newButton", mouseleave:mousePreviewLeave, mouseenter:mousePreviewEnter, click:getOnClick("default_tavern")}, tavernIds);
}
//This function creates the default Setup buttons
function createDefaultSetupButtons () {
	//Removes all buttons
	$(".newButton").remove();
	//Creates Names (if statement changes name of buttons)
	var setupIds = {
		"button_human": "Human",
		"button_elf": "Elf",
		"button_dwarf": "Dwarf"
	}
	//This is what to edit if you want to add more shared params to the set of buttons that's being created
	createAndAddSetOfButtons(".button_stack", {classes: "newButton", mouseleave:mousePreviewLeave, mouseenter:mousePreviewEnter, click:chooseRace}, setupIds);
}