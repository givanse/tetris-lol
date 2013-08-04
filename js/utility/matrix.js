
function isValidMatrix(matrix) {
    if(!(matrix instanceof Array))
        return false;
    if(matrix.length == 0)
        return false;
    return true;
}

/**
 *
 */
function transposeMatrix(matrix) {

    if(!isValidMatrix(matrix))
        return matrix;

    var width = matrix.length;
    var height = matrix[0].length;
    if(width != height)
        return matrix;

    /**
      * Iterate under the diagonal of the matrix.
      */
    for(var x = 0; x < width; x++) {
        /* (x + 1) don't step on the diagonal */
        for(var y = (x + 1); y < height; y++) { 

            var newX = y;
            var newY = x;

            /* The usual 3 steps swap. */

            // 1.- save to tmp from 1st
            var currentVal = matrix[x][y];

            if(matrix[newX] == undefined) { 
                // 2.- write over 1st with 2nd
                matrix[x].splice(y, 1);
                // 3.- write over 2nd with tmp
                matrix.splice(newX, 0, new Array(0));
                matrix[newX].splice(newY, 0, currentVal);
            } else {
                // 2.- write over 1st with 2nd
                matrix[x][y] = matrix[newX][newY];
                // 3.- write over 2nd with tmp
                matrix[newX][newY] = currentVal;
            }
        }
    }
    return matrix;
}

function invertMatrixCols(matrix) {

    if(!isValidMatrix(matrix))
        return matrix;

    var firstCol = 0;
    var lastCol = matrix.length - 1;
    
    while(firstCol < lastCol) {
        var tmpCol = matrix[firstCol];
        matrix[firstCol] = matrix[lastCol];
        matrix[lastCol] = tmpCol; 

        firstCol++;
        lastCol--;
    }
    
    return matrix;
}

function rotateMatrix(matrix) {
    matrix = transposeMatrix(matrix);              
    matrix = invertMatrixCols(matrix);             
    return matrix;
}

/* EOF */
