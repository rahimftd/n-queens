/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.countNRooksSolutions = function(n) {
  var board = [];
  for (var i = 0; i < n; i++) {
    board[i] = 1;
  }
  var count = 0;
  var helper = function(currBoard, numRooks, currentRow) {
    if (numRooks === 0 && n !== 0) {
      count++;
    } else {
      for (var i = 0; i < n; i++) {
        currBoard[currentRow] = currBoard[currentRow] << 1;
        if (!checkForInvalidCols(currBoard)) {
          helper(currBoard.slice(), numRooks - 1, currentRow + 1);
        }
      }
    }
  };
  helper(board.slice(), n, 0);
  return count;
};

window.findNRooksSolution = function(n) {
  var output;
  var board = [];
  for (var i = 0; i < n; i++) {
    board[i] = 1;
  }
  var helper = function(currBoard, numRooks, currentRow) {
    if (numRooks === 0) {
      output = convertBitwiseToBoard(currBoard, n);
      return;
    } else {
      for (var i = 0; i < n; i++) {
        currBoard[currentRow] = currBoard[currentRow] << 1;
        if (!checkForInvalidCols(currBoard)) {
          helper(currBoard.slice(), numRooks - 1, currentRow + 1);
        }
      }
    }
  };
  helper(board.slice(), n, 0);
  return output || convertBitwiseToBoard(board, n);
};

window.countNQueensSolutions = function(n) {
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

window.findNQueensSolution = function(n) {
  var output;
  var board = [];
  for (var i = 0; i < n; i++) {
    board[i] = 1;
  }
  var helper = function(currBoard, numQueens, currentRow) {
    if (numQueens === 0) {
      output = convertBitwiseToBoard(currBoard, n);
      return;
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
  return output || convertBitwiseToBoard(board, n);
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

var convertBitwiseToBoard = function(bitwiseBoard, n) {
  var output = [];
  for (var i = 0; i < n; i++) {
    var tempRow = [];
    for (var j = 0; j < n; j++) {
      tempRow.push(0);
    }
    output.push(tempRow);
  }

  for (var i = 0; i < bitwiseBoard.length; i++) {
    var queenColumn = Math.log2(bitwiseBoard[i]) - 1;
    output[i][queenColumn] = 1;
  }

  return output;
};