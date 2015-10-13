var characterSprite = {
	"drider":"_images/tavern_drider.png",
	"bartender": "_images/tavern_golem.png",
	"hooded_figure": "_images/tavern_orc.png"
}

function spriteShow (sprite) {
	$('.spriteSlot').fadeIn(400)[0].src;
	$('.spriteSlot').attr("src", characterSprite[sprite]);
}