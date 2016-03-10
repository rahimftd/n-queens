// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return Math.max(colIndex - rowIndex, 0);
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return Math.min(colIndex + rowIndex, 3);
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    isValidRookSquare: function(rowIndex, colIndex) {
      return this.hasPieceOnRow(rowIndex) || this.hasPieceOnCol(colIndex);
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var count = 0;
      var board = this.rows();
      if (board !== undefined && board.length > 0) {
        for (var i = 0; i < board[rowIndex].length; i++) {
          if (board[rowIndex][i] === 1) {
            count++;
          }

          if (count > 1) {
            return true;
          }
        }
      }
      return false; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      if (this.get('n') === 1) {
        return false;
      } 
      var board = this.rows();
      if (board !== undefined && board.length > 0) {
        for (var i = 0; i < board.length; i++) {
          if (this.hasRowConflictAt(i)) {
            return true;
          }
        }
      }
      return false;
    },

    hasPieceOnRow: function(rowIndex) {
      var count = 0;
      var board = this.rows();
      if (board !== undefined && board.length > 0) {
        for (var i = 0; i < board[rowIndex].length; i++) {
          if (board[rowIndex][i] === 1) {
            count++;
          }

          if (count > 0) {
            return true;
          }
        }
      }
      return false; 
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var board = this.rows();
      var count = 0;
      if (board !== undefined && board.length > 0) {
        for (var i = 0; i < board.length; i++) {
          if (board[i][colIndex] === 1) {
            count++;
          }
          if (count > 1) {
            return true;
          }
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      if (this.get('n') === 1) {
        return false;
      } 
      var board = this.rows();
      if (board !== undefined && board.length > 0) {
        for (var i = 0; i < board[0].length; i++) {
          if (this.hasColConflictAt(i)) {
            return true;
          }
        }
      }
      return false;
    },

    hasPieceOnCol: function(colIndex) {
      var board = this.rows();
      var count = 0;
      if (board !== undefined && board.length > 0) {
        for (var i = 0; i < board.length; i++) {
          if (board[i][colIndex] === 1) {
            count++;
          }
          if (count > 0) {
            return true;
          }
        }
      }
      return false; 
    },

    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // Initialize board variable
      var board = this.rows();
      // Store column index
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      // Iterate through squares in the column
      for (var i = 0; i < board.length; i++) {
        // Create variable to store squares in diagonal
        var squaresInDiagonal = this.get('n') - i;
        // Initialize new count varaible
        var count = 0;
        // Iterate through squares in diagonal
        for (var j = 0; j < squaresInDiagonal; j++) {
          // Check if there is a diagonal conflict 
          if (board[i + j][colIndex + j] === 1) {
            // Increment count
            count++;
          }
          if (count > 1) {
            return true;
          }
        }
      }
      return false;
    },
    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      } 
      return false;
    },





    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // Initialize board variable
      var board = this.rows();
      // Store column index
      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      // Iterate through squares in the column
      for (var i = 0; i < board.length; i++) {
        // Create variable to store squares in diagonal
        var squaresInDiagonal = this.get('n') - i;
        // Initialize new count varaible
        var count = 0;
        // Variable to track current row
        var currentRow = 0;
        // Iterate through squares in diagonal
        for (var j = (squaresInDiagonal - 1); j >= 0; j--) {
          // Check if there is a diagonal conflict 
          if (board[i + currentRow][colIndex - currentRow] === 1) {
            // Increment count
            count++;
          }
          if (count > 1) {
            return true;
          }
          currentRow++;
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.rows();
      for (var i = 0; i < board.length; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      } 
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
