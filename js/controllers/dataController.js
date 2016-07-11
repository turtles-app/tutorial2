app.controller("dataController", ['$rootScope', function($rootScope){
	var self = this;

	self.steps = 0;
	self.sigils = [];
	self.stones = [];
	self.runes = [];
	self.scroll = [];
	self.leftSigil = null;
	self.rightSigil = null;
	self.selectedStones = [];

	//Name Lists
	self.sigilNames = [	'&alpha;', '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', '&eta;', '&theta;', '&lota;', '&kappa;', '&lambda;', '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', '&sigma;', '&tau;', '&upsilon;', '&phi;', '&chi;', '&psi', '&psi;', '&omega;'];
	self.sigilTypes = ['sigil', 'fuse', 'trim', 'cleave', 'core'];
	self.stoneNames = ["ruby", "topaz", "sapphire", "emerald", "amethyst", "quartz"];
	self.tools = ['forge', 'crafter', 'fuser'];

	/* 
	*****Instances*****
	*/
	//Initialize sigils
	self.alpha = new Set("sets", self.sigilNames.shift());
	self.alpha.groupIndex = 0;
	self.alpha.type = self.sigilTypes[0];
	self.beta = new Set("sets", self.sigilNames.shift());
	self.beta.groupIndex = 1;
	self.omega = new Set("sets", "&omega;");

	//Intitialize stones
	self.ruby = new Element(self.stoneNames.shift(), self.omega);
	self.ruby.groupIndex = 0;
	self.topaz = new Element(self.stoneNames.shift(), self.omega);
	self.topaz.groupIndex = 1;
	self.sapphire = new Element(self.stoneNames.shift(), self.omega);
	self.sapphire.groupIndex = 2;
	self.emerald = new Element(self.stoneNames.shift(), self.omega);
	self.emerald.groupIndex = 3;
	self.amethyst = new Element(self.stoneNames.shift(), self.omega);
	self.amethyst.groupIndex = 4;		
	self.quartz = new Element(self.stoneNames.shift(), self.omega);
	self.quartz.groupIndex = 5;

	//Initialize Runes
	self.rune1 = new Fact(self.ruby.name, true, self.alpha.equivalents[0]);

	//Put stones in sigils
	self.alpha.putIn(self.ruby);
	self.beta.putIn(self.amethyst);

	//Create union
	self.gamma = union(self.sigilNames.shift(),self.alpha, self.beta);
	self.gamma.groupIndex = 2;

	self.runes.push(self.rune1);
	self.stones.push(self.ruby);
	self.sigils.push(self.alpha);
	self.sigils.push(self.beta);
	self.sigils.push(self.gamma);

	//Unused data
	self.stones.push(self.topaz, self.sapphire, self.emerald, self.amethyst, self.quartz);

	/* 
	*****Flash Methods*****
	***	These make a given object flash on screen
	*/
		//Flash stone methods
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

		//Flash sigil methods
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

		//Flash rune methods
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

//recieve broadcast from the workspace controller upon trashing selected tool
	$rootScope.$on('trashTool', function (ev, data){ 
		self.tools.push(data.tool);
		self.stones = self.stones.concat(self.selectedStones.splice(0, self.selectedStones.length));
		self.stones.sort(sortGroup);		
	});

	// clear workspace after trashing, or creating new sigil
	$rootScope.$on("clearWorkspace", function (ev, data) {
		console.log("clearing workspace");
		self.leftSigil = null;
		self.rightSigil = null;
		self.stones = self.stones.concat(self.selectedStones.splice(0, self.selectedStones.length));
		self.stones.sort(sortGroup);
	});
}]);