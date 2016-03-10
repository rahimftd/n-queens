var countNQueensSolutions = function(n) {
  debugger;
  var board = [];
  for (var i = 0; i < n; i++) {
    board[i] = 1;
  }
  var count = 0;
  var helper = function(currBoard, numQueens, currentRow) {
    if (numQueens === 0 && n !== 0) {
      count++;
    } else {
      for (var i = 0; i < n; i++) {
        currBoard[currentRow] = currBoard[currentRow] << 1;
        if (!checkForInvalidCols(currBoard) && !checkForInvalidDiagonals(currBoard)) {
          helper(currBoard.slice(), numQueens - 1, currentRow + 1);
        }
      }
    }
  };
  helper(board.slice(), n, 0);
  return count;
};

var checkForInvalidCols = function(board) {
  for (var i = 0; i < board.length; i++) {
    var currRow = board[i];
    for (var j = i + 1; j < board.length; j++) {
      if (currRow === board[j] && currRow !== 1) {
        return true;
      }
    }
  }
  return false;
};

var checkForInvalidDiagonals = function(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = i + 1; j < board.length; j++) {
      if ((board[j] / board[i] === Math.pow(2, j - i) || board[i] / board[j] === Math.pow(2, j - i)) && board[i] !== 1 && board[j] !== 1) {
        return true;
      }
    }
  }
  return false;
};