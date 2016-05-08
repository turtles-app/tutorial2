app.controller("dataController", ['$rootScope', function($rootScope){
	var self = this;

	self.steps = 0;
	self.sigils = [];
	self.stones = [];
	self.runes = [];
	self.scroll = [];

	//Name Lists
	self.sigilNames = [	'&alpha;', '&beta;', '&gamma;'];
	self.sigilColors = ['green', 'blue', 'orange'];
	self.stoneNames = ["ruby", "sapphire", "emerald"];
	self.stoneColors = ["red", "blue", "green"];
	/////////////
	//Instances//
	/////////////
		//First Triad (sigil, stone, rune)
	self.alpha = new Set("sets", self.sigilNames.shift());
	self.alpha.groupIndex = 0;
	self.alpha.color = self.sigilColors[0];
	self.ruby = new Element(self.stoneNames.shift(), self.alpha);
	self.ruby.groupIndex = 0;
	self.ruby.color = self.stoneColors.shift();
	self.rune1 = new Fact(self.ruby.name, true, self.alpha.equivalents[0]);

	self.runes.push(self.rune1);
	self.stones.push(self.ruby);
	self.sigils.push(self.alpha);
	console.log(self.stones[0]);

	//Flash methods
		// These make a given object flash on screen
			//Flash stone methods//
	self.flashStones = function (arr) {
		$rootScope.$broadcast('flashStones', arr);
	};
	self.clearFlashStones = function () {
		$rootScope.$broadcast('clearFlashStones');
	};
	self.flashStoneArea = function () {
		$rootScope.$broadcast('flashStoneArea');
	};
	self.clearFlashStoneArea = function () {
		$rootScope.$broadcast('clearFlashStoneArea');
	};

		//Flash sigil methods//
	self.flashSigils = function (arr) {
		$rootScope.$broadcast('flashSigils', arr);
	};
	self.clearFlashSigils = function () {
		$rootScope.$broadcast('clearFlashSigils');
	};
	self.flashSigilArea = function () {
		$rootScope.$broadcast('flashSigilArea');
	};
	self.clearFlashSigilArea = function () {
		$rootScope.$broadcast('clearFlashSigilArea');
	};

		//Flash rune methods//
	self.flashRunes = function (arr) {
		$rootScope.$broadcast('flashRunes', arr);
	};
	self.clearFlashRunes = function () {
		$rootScope.$broadcast('clearFlashRunes');
	};
	self.flashRuneArea = function () {
		$rootScope.$broadcast('flashRuneArea');
	};
	self.clearFlashRuneArea = function () {
		$rootScope.$broadcast('clearFlashRuneArea');
	};
}]);