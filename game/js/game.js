/* overall model for a card game */
var Game = Backbone.Model.extend({
	defaults: {
		game: 'war',
		players: 2,
		ranks: ['A','K','Q','J',10,9,8,7,6,5,4,3,2],
		suits: ['C','D','H','S'],
		deck: []
	},
	initialize: function() {
		this.on('change:deck', function(model) {
			var deck = model.get('deck');
			console.log('Here is the new deck '+deck);
		});
		this.buildDeck();
	},
	buildDeck: function() {
		for(i = 0; i < this.defaults.suits.length; i++){
			for(j = 0; j < this.defaults.ranks.length; j++)
				this.defaults.deck.push(this.defaults.ranks[j]+this.defaults.suits[i]);
		}
	}
});

var war = new Game();

/* model for a player */
var Player = new Backbone.Model.extend({
	defaults: {
		name: 'anonymous',
		hand: []
	},
	initialize: function() {
		console.log('A new player joined');
	}
});

/* collection list of players */
var PlayerList = Backbone.Collection.extend({
	model: Player
});

/* set up the game view which currently just has a nice 'lets play', number of players, and the current deck*/
var GameView = Backbone.View.extend({
	events: {
		'click #shuffle' : 'shuffleDeck'
	},
	initialize: function() {
		this.render();
	},
	render: function() {
		var game = war.get('game');
		var deck = war.get('deck');
		var numPlayers = war.get('players');
		var variables = { gameLabel: 'Let\'s play a game of '+game, playersLabel: 'Players: '+numPlayers, deckLabel: 'Your current deck is '+deck};
		var template = _.template($('#gameTemplate').html(), variables );
		this.$el.html( template );
	},
	shuffleDeck: function() {
		var s = [];
		while (this.defaults.deck.length)
			s.push(this.defaults.deck.splice(Math.random() * this.defaults.deck.length, 1)[0]);
		while (s.length) 
			this.defaults.deck.push(s.pop());
			
		gameView.render();
		console.log(this.defaults.deck);
	},
	dealCards: function() {
		
	}
});

var gameView = new GameView({ el: $('#gameBoard')});

/* player view can have the players name and hand */
var PlayerView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},
	render: function() {
		
	}
});