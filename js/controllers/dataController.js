app.controller("dataController", [function(){
	var self = this;

	self.steps = 0;
	self.sigils = [];
	self.stones = [];
	self.runes = [];
	self.scroll = [];

	//Name Lists
	self.sigilNames = [	'&alpha;', '&beta;', '&gamma;'];
	self.stoneNames = ["ruby", "sapphire", "emerald"];
	/////////////
	//Instances//
	/////////////
		//First Triad (sigil, stone, rune)
	self.a = new Set("sets", self.sigilNames.pop());
	self.a.groupIndex = 0;
	self.x = new Element("x", self.a);
	self.x.groupIndex = 0;
	self.rune1 = new Fact(self.x.name, true, self.a.equivalents[0]);

	self.runes.push(self.rune1);
}]);