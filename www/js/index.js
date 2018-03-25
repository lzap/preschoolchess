var app = {
	initialize: function () {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},

	onDeviceReady: function () {
		// maximize board UI
		size = Math.min($(window).width(), $(window).height());
		document.getElementById("board").setAttribute("style", "width:"+size+"px;height:"+size+"px");
		start_position = '8/pppppppp/8/8/8/8/PPPPPPPP/8 w';
		
		var board, game = new Chess(start_position);

		var removeGreySquares = function () {
			$('#board .square-55d63').css('background', '');
		};

		var greySquare = function (square) {
			var squareEl = $('#board .square-' + square);

			var background = '#a9a9a9';
			if (squareEl.hasClass('black-3c85d') === true) {
				background = '#696969';
			}

			squareEl.css('background', background);
		};

		var onDragStart = function (source, piece, position, orientation) {
			if (game.moves().length === 0 || piece.search(/^b/) !== -1) {
				return false;
			}
		};

		var checkGameOver = function (possibleMoves) {
			if (possibleMoves.length === 0) {
				alert('Game over');
			}
		};

		var updateBoard = function () {
			board.position(game.fen());
			console.log(game.fen() + ' (' + evaluateBoard(game.board()) + ') ' + game.moves());
		};

		var makeRandomMove = function () {
			var possibleMoves = game.moves();
			checkGameOver(possibleMoves);
			var randomIndex = Math.floor(Math.random() * possibleMoves.length);
			game.move(possibleMoves[randomIndex]);
			updateBoard();
		};

		var makeBestMove = function () {
			var possibleMoves = game.moves();
			checkGameOver(possibleMoves);
			var depth = 4;
			var d = new Date().getTime();
			var bestMove = minimaxRoot(depth, game, false);
			var d2 = new Date().getTime();
			var moveTime = (d2 - d);
			var positionsPerS = ( positionCount * 1000 / moveTime) / 1000;
			console.log("ENGINE: " + positionCount + " in " + moveTime + "ms (" + positionsPerS + " kn/s)");
			game.move(bestMove);
			updateBoard();
		};

		var onDrop = function (source, target) {
			removeGreySquares();

			// see if the move is legal
			var move = game.move({
				from: source,
				to: target,
				promotion: 'p'
			});

			// illegal move
			if (move === null) return 'snapback';

			window.setTimeout(makeBestMove, 250);
			//window.setTimeout(makeRandomMove, 250);
		};

		var onSnapEnd = function () {
			updateBoard();
		};

		var onMouseoverSquare = function (square, piece) {
			// get list of possible moves for this square
			var moves = game.moves({
				square: square,
				verbose: true
			});

			// exit if there are no moves available for this square
			if (moves.length === 0) return;

			greySquare(square);

			for (var i = 0; i < moves.length; i++) {
				greySquare(moves[i].to);
			}
		};

		var onMouseoutSquare = function (square, piece) {
			removeGreySquares();
		};

		var cfg = {
			draggable: true,
			position: start_position,
			onDragStart: onDragStart,
			onDrop: onDrop,
			onMouseoutSquare: onMouseoutSquare,
			onMouseoverSquare: onMouseoverSquare,
			onSnapEnd: onSnapEnd
		};
		board = ChessBoard('board', cfg);
	},
};

app.initialize();