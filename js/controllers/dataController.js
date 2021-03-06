app.controller("dataController", ['$rootScope', "$scope", function($rootScope, $scope){
	var self = this;

	self.steps = 0;
	self.sigils = [];
	self.stones = [];
	self.runes = [];
	self.runicKey = null;
	self.scroll = [];
	self.leftSigil = null;
	self.rightSigil = null;
	self.selectedSigils = [];
	self.selectedStones = [];
	self.selectedRunes = [];

	//Name Lists
	self.sigilNames = [	'&alpha;', '&beta;', '&gamma;', '&delta;', '&epsilon;', '&zeta;', '&eta;', '&theta;', '&lota;', '&kappa;', '&lambda;', '&mu;', '&nu;', '&xi;', '&omicron;', '&pi;', '&rho;', '&sigma;', '&tau;', '&upsilon;', '&phi;', '&chi;', '&psi', '&psi;', '&omega;'];
	self.sigilTypes = ['sigil', 'fuse', 'trim', 'cleave', 'core'];
	self.stoneNames = ['ruby', 'topaz', 'sapphire', 'emerald', 'amethyst', 'quartz'];
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
	self.topaz = new Element(self.stoneNames.shift(), self.omega);
	self.sapphire = new Element(self.stoneNames.shift(), self.omega);
	self.emerald = new Element(self.stoneNames.shift(), self.omega);
	self.amethyst = new Element(self.stoneNames.shift(), self.omega);
	self.quartz = new Element(self.stoneNames.shift(), self.omega);
	self.ruby.groupIndex = 0;
	self.topaz.groupIndex = 1;
	self.sapphire.groupIndex = 2;
	self.emerald.groupIndex = 3;
	self.amethyst.groupIndex = 4;		
	self.quartz.groupIndex = 5;

	//Initialize Runes
	self.rune1 = new Fact(self.ruby.name, true, self.alpha.equivalents[0]);
	self.rune2 = new Fact(self.topaz.name, true, self.beta.equivalents[0]);
	self.rune1.groupIndex = 0;
	self.rune2.groupIndex = 1;
	self.rune1.setType = 'sigil';
	self.rune2.setType = 'sigil';

	// Runic Key instantiations
		// First Runic Key (any Stone, Sigil not alpha)
			self.sigilRequirements = new sigilRequirements(true, [], ["&alpha;",], null, null, null);
			self.stoneRequirements = new stoneRequirements(false, [], []);
		// Second Runic Key ()
			// self.sigilRequirements = new sigilRequirements(false, [], [], null, null, null);
			// self.stoneRequirements = new stoneRequirements(true, ["emerald"], []);
		// Third Runic Key
			// self.sigilRequirements = new sigilRequirements(false, [], [], null, null, null);
			// self.stoneRequirements = new stoneRequirements(true, [], ["ruby", "topaz", "emerald"]);
	//Initialize Runic Key(redone at trashInspector)
	self.runicKey = new runicKey(self.sigilRequirements, self.stoneRequirements);
	//Put stones in sigils
	self.alpha.putIn(self.ruby);
	self.beta.putIn(self.topaz, self.sapphire, self.emerald, self.amethyst);

	//Create union
	self.gamma = union(self.sigilNames.shift(),self.alpha, self.beta);
	self.gamma.groupIndex = 2;
	// Push data to controller arrays
	self.runes.push(self.rune1, self.rune2);
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
		self.selectedStones = [];
		self.selectedSigils = [];
		$scope.$apply();
		// self.stones = self.stones.concat(self.selectedStones.splice(0, self.selectedStones.length));
		// self.stones.sort(sortGroup);		
	});

	// clear workspace after trashing, or creating new sigil
	$rootScope.$on("clearWorkspace", function (ev, data) {
		self.leftSigil = null;
		self.rightSigil = null;
		self.selectedSigils = [];
		self.selectedStones = [];
		// self.stones = self.stones.concat(self.selectedStones.splice(0, self.selectedStones.length));
		// self.stones.sort(sortGroup);
	});

}]);