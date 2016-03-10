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



window.findNRooksSolution = function(n) {
  // Initialize a new board
  var board = new Board({'n': n});

  // Helper function that takes numRooks, currentRow, currentBoards
  var helper = function(numRooks, currentRow, currentBoards) {
    // Initiatlize a new currentBoards variables
    var newCurrentBoards = [];
    // Loop through all boards
    for (var i = 0; i < currentBoards.length; i++) {
      // Loop through currentRow
      for (var j = 0; j < currentBoards[i].rows()[currentRow].length; j++) {
        // Create a temp copy of the current board
        var tempBoardMatrix = function() {
          var arr = [];
          for (var k = 0; k < currentBoards[i].rows().length; k++) {
            arr.push(currentBoards[i].rows()[k].slice());
          }
          return arr;
        }();
        var tempBoard = new Board(tempBoardMatrix);
        // Check if rook can be placed
        if (tempBoard.isValidRookSquare(currentRow, j)) {
          // Place rook
          tempBoard.togglePiece(currentRow, j);
          if (numRooks === 1) {
            console.log('Single solution for ' + n + ' rooks:', JSON.stringify(tempBoard.rows()));
            return tempBoard.rows();
          } else {
            // Otherwise push to newCurrentBoards
            newCurrentBoards.push(tempBoard);
          }
        }
      }
    }
    if (numRooks !== 1) {
      return helper(numRooks - 1, currentRow + 1, newCurrentBoards);
    }
  }

  return helper(n, 0, [board]);
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  // Initialize a new board
  var board = new Board({'n': n});

  // Helper function that takes numRooks, currentRow, currentBoards
  var helper = function(numRooks, currentRow, currentBoards) {
    // Initiatlize a new currentBoards variables
    var newCurrentBoards = [];
    // Loop through all boards
    for (var i = 0; i < currentBoards.length; i++) {
      // Loop through currentRow
      for (var j = 0; j < currentBoards[i].rows()[currentRow].length; j++) {
        // Create a temp copy of the current board
        var tempBoardMatrix = function() {
          var arr = [];
          for (var k = 0; k < currentBoards[i].rows().length; k++) {
            arr.push(currentBoards[i].rows()[k].slice());
          }
          return arr;
        }();
        var tempBoard = new Board(tempBoardMatrix);
        // Check if rook can be placed
        if (tempBoard.isValidRookSquare(currentRow, j)) {
          // Place rook
          tempBoard.togglePiece(currentRow, j);
          if (numRooks === 1) {
            solutionCount++;
          } else {
            // Otherwise push to newCurrentBoards
            newCurrentBoards.push(tempBoard);
          }
        }
      }
    }
    if (numRooks !== 1) {
      helper(numRooks - 1, currentRow + 1, newCurrentBoards);
    }
  }

  helper(n, 0, [board]);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  } else if (n === 2 || n === 3) {
    return new Board({'n': n}).rows();
  }
  // Initialize a new board
  var board = new Board({'n': n});

  // Helper function that takes numQueens, currentRow, currentBoards
  var helper = function(numQueens, currentRow, currentBoards) {
    // Initiatlize a new currentBoards variables
    var newCurrentBoards = [];
    // Loop through all boards
    for (var i = 0; i < currentBoards.length; i++) {
      // Loop through currentRow
      for (var j = 0; j < currentBoards[i].rows()[currentRow].length; j++) {
        // Create a temp copy of the current board
        var tempBoardMatrix = function() {
          var arr = [];
          for (var k = 0; k < currentBoards[i].rows().length; k++) {
            arr.push(currentBoards[i].rows()[k].slice());
          }
          return arr;
        }();
        var tempBoard = new Board(tempBoardMatrix);
        if (tempBoard.isValidQueensSquare(currentRow, j)) {
          // Place queen
          tempBoard.togglePiece(currentRow, j);
          if (numQueens === 1) {
            console.log('Single solution for ' + n + ' queens:', JSON.stringify(tempBoard.rows()));
            return tempBoard.rows();
          } else {
            // Otherwise push to newCurrentBoards
            newCurrentBoards.push(tempBoard);
          } 
        }
      }
    }
    if (numQueens !== 1) {
      return helper(numQueens - 1, currentRow + 1, newCurrentBoards);
    }
  }

  return helper(n, 0, [board]);
};

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