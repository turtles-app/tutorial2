////////////////////
// Configurations //
////////////////////
// Inspector Network //
var inspectorContainer = document.getElementById("inspectorContainer");
var inspectorOptions = {
	nodes: {physics: false},
	layout: {hierarchical: {enabled: true, direction: 'RL'}},
	// interaction: {dragView: false}
};
// Rune Tree Network //
var runeTreeContainer = document.getElementById("runeTreeContainer");
var runeTreeOptions = {
	nodes: {physics: false},
	layout: {hierarchical: {enabled: true, direction: 'UD'}}
}

//////////////////////////////
// Data Formating Functions //
//////////////////////////////
// Inspector Network //
var sigilTreeData = function (set, initialLevel, occurances) {
	var nodes = [];
	var edges = [];
	var id = set.groupIndex;
	var setName = set.strEquivalents[set.eqActiveIndex];

	if (_.hasIn(occurances, setName)) {
		id += 100*occurances[setName];
		occurances[setName]++;
	} else {
		occurances[setName] = 1;
	}
	var initialNode = {
		'id'   : id, 
		'title': setName,
		'level': initialLevel,
		'shape': 'image',
		'image': './img/inspector-img/inspector-' + set.type + '.png'
	};
	nodes.push(initialNode);
	// Draw edges and recurse if sigil is composite
	if (!set.simple) {
		var leftId = set.components[0].groupIndex;
		var rightId = set.components[1].groupIndex;
		var leftName = set.components[0].strEquivalents[set.components[0].eqActiveIndex];
		var rightName = set.components[1].strEquivalents[set.components[1].eqActiveIndex];
		// If components are repeated nodes,
		// adjust the IDs used to draw edges to them
		// Objects to store deeper levels of nodes and edges
		var leftData = {'nodes': [], 'edges': [], 'occurances': occurances};
		var rightData = {'nodes': [], 'edges': [], 'occurances': occurances};
		// Recurse for component sigils' nodes and edges 
		leftData = sigilTreeData(set.components[0], initialLevel+1, occurances);
		// Capture any reoccuring nodes from previous recursion
		occurances = leftData.occurances;
		if ( occurances[leftName] > 1) {
			// Adjust id of child sigil for edge (in repeat case)
			leftId += 100*(occurances[leftName] - 1);
			occurances[leftName]++;
		}
		rightData = sigilTreeData(set.components[1], initialLevel+1, occurances);
		occurances = rightData.occurances;
		
		if ( occurances[rightName] > 1) {
			// Adjust id of child sigil for edge (in repeat case)
			rightId += 100*(occurances[rightName] - 1);
			occurances[rightName]++;
		}
		// Edges to direct children
		var leftEdge = {'from': id, 'to': leftId};
		var rightEdge = {'from': id, 'to': rightId};
		edges.push(leftEdge, rightEdge);
		// Compile data
		nodes = nodes.concat(leftData.nodes, rightData.nodes);
		edges = edges.concat(leftData.edges, rightData.edges);
	}

	var res = {
		nodes: nodes,
		edges: edges,
		occurances: occurances
	};

	return res;
}

// Returns raw-formatted node from runicKey
function linearRunicKeyData (nodes) {
	return {
		node: {
			'id' : 1337,
			'title': 'Runic Key',
			'shape': 'image',
			'image': './img/runicKey.png',
			'level': nodes.length
		},
		edge: {
			'from': nodes[nodes.length -1].id,
			'to': 1337,
			'dashes': true,
			'color': {
				color: '#484849'
			}

		}

	}
};

// Returns raw-formatted node for completed runicKey
function linearCompleteKeyData (nodes) {
	return {
		node: {
			'id' : 1337,
			'title': 'Crafted Runic Key',
			'shape': 'image',
			'image': './img/completeKey-sigil.png',
			'level': nodes.length
		},
		edge: {
			'from': nodes[nodes.length -1].id,
			'to': 1337,
		}
	}
};


// Rune Tree Network //

// Returns obj with nodes and edges for Network
//from linear array of rune objects
var linearRuneTreeData = function (runes) {
	var nodes = [];
	var edges = [];
	var res   = [];
	runes.forEach(function (rune, index) {
		nodes.push(
			{
				'id': index,
				'title': rune.str,
				'level': index,
				'shape': 'image',
				'image': "./img/rune-"+ rune.setType + "-" + rune.elementName + ".png",
			}
		); //end nodes push

		if (nodes.length > 1) {
			edges.push(
				{
					'from': nodes[index - 1].id, 
					'to'  : nodes[index].id
				}
			)
		}
	}); //end forEach rune
	res = {
		data: { //used to draw network
			'nodes': new vis.DataSet(nodes),
			'edges': new vis.DataSet(edges)
		},
		rawData: { //used for calculation
			'nodes': nodes,
			'edges': edges
		}
	};
	// console.log(res);
	return res;
};

// Selects node from rune tree (called on click)
var linearFindRuneFromNode = function (nodeId, runes) {
	var res = {runicKey: false, data: null};
	// Check if user clicked runic key
	if (nodeId === 1337) return {runicKey: true, data: null};
	runes.forEach(function (rune) {
		if (nodeId === rune.groupIndex) res.data = rune;
	});
	return res;
};