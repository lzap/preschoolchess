var positionCount;

var minimaxRoot = function (depth, game, isMaximisingPlayer) {
	var newGameMoves = game.moves();
	var bestMove = -9999;
	var bestMoveFound;
	positionCount = 0;

	for (var i = 0; i < newGameMoves.length; i++) {
		var newGameMove = newGameMoves[i]
		game.move(newGameMove);
		var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
		game.undo();
		if (value >= bestMove) {
			bestMove = value;
			bestMoveFound = newGameMove;
		}
	}
	return bestMoveFound;
};

var minimax = function (depth, game, alpha, beta, isMaximisingPlayer) {
	positionCount++;
	if (depth === 0) {
		return (isMaximisingPlayer ? evaluateBoard(game.board()) : -evaluateBoard(game.board()));
	}

	var newGameMoves = game.moves();

	if (isMaximisingPlayer) {
		var bestMove = -9999;
		for (var i = 0; i < newGameMoves.length; i++) {
			game.move(newGameMoves[i]);
			bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
			game.undo();
			alpha = alpha > bestMove ? alpha : bestMove;
			if (beta <= alpha) {
				return bestMove;
			}
		}
		return bestMove;
	} else {
		var bestMove = 9999;
		for (var i = 0; i < newGameMoves.length; i++) {
			game.move(newGameMoves[i]);
			bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
			game.undo();
			beta = beta < bestMove ? beta : bestMove;
			if (beta <= alpha) {
				return bestMove;
			}
		}
		return bestMove;
	}
};

var evaluateBoard = function (board) {
	var totalEvaluation = 0;
	for (var i = 0; i < 8; i++) {
		for (var j = 0; j < 8; j++) {
			totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i, j);
		}
	}
	return totalEvaluation;
};

var reverseArray = function(array) {
	return array.slice().reverse();
};

var pawnEvalWhite = [
[5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
[5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
[1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
[0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
[0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
[0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
[0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
[5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0]
];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval = [
[-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
[-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
[-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
[-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
[-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
[-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
[-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
[-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
];

var bishopEvalWhite = [
[ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
[ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
[ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
[ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
[ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
[ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
[ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
[ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
[  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
[  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
[ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
[  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen = [
[ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
[ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
[ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
[ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
[  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
[ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
[ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
[ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [
[ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
[ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
[ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
[ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
[ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
[ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
[  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0],
[  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0]
];

var kingEvalBlack = reverseArray(kingEvalWhite);

var getPieceValue = function (piece, x, y) {
	if (piece === null) {
		return 0;
	}
	var isWhite = piece.color === 'w';
	var absVal;
	if (piece.type === 'p') {
		absVal = 10 + (isWhite ? pawnEvalWhite[x][y] : pawnEvalBlack[x][y]);
	} else if (piece.type === 'b') {
		absVal = 30 + (isWhite ? bishopEvalWhite[x][y] : bishopEvalBlack[x][y]);
	} else if (piece.type === 'n') {
		absVal = 30 + knightEval[x][y];
	} else if (piece.type === 'r') {
		absVal = 50 + (isWhite ? rookEvalWhite[x][y] : rookEvalBlack[x][y]);
	} else if (piece.type === 'q') {
		absVal = 90 + evalQueen[x][y];
	} else if (piece.type === 'k') {
		absVal = 900 + (isWhite ? kingEvalWhite[x][y] : kingEvalBlack[x][y]);
	}
	return (isWhite ? absVal : -absVal);
};
