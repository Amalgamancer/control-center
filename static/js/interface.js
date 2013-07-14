const api_url = "http://amalgamancer.spectrumbranch.com:8777/"
var monstercache = null;

$("#drawbtn").click(function() {
	drawPair(function(err, pair) {
		$('#firstMonster').html('<a href="'+pair[0]+'" target="_blank">'+pair[0]+'</a>');
		$('#secondMonster').html('<a href="'+pair[1]+'" target="_blank">'+pair[1]+'</a>');
	});
});

var drawPair = function(callback) {
	getDeck(false, function(err, deck) {
		var first = randomFromInterval(0, deck.length);
		var second = randomFromInterval(0, deck.length);
		
		//silly dupe prevention, lol
		while (first == second) {
			second = randomFromInterval(0, deck.length);
		}
		
		var firstCard = deck[first];
		var secondCard = deck[second];
	
		callback(err, [firstCard, secondCard]);
	});
};

var getDeck = function(ignoreCache, callback) {
	if (monstercache == null || ignoreCache) {
		$.getJSON(api_url, function(data) {
			monstercache = data;
			callback(null, monstercache);
		});
	} else {
		callback(null, monstercache);
	}
};

var randomFromInterval = function(from,to) {
    return Math.floor(Math.random()*(to-from+1)+from);
};