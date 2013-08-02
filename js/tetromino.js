/**
 *
 */

function getTetrominoSquares(x, y, tetrominoType) {
    var positions = new Array(4);
    positions[0] = new Square(x, y, tetrominoType);
    switch(tetrominoType) {
        case LINESHP:
            positions[1] = new Square(x+1, y, tetrominoType);
            positions[2] = new Square(x+2, y, tetrominoType);
            positions[3] = new Square(x+3, y, tetrominoType);
            return positions;
        case SQUARESHP:
            positions[1] = new Square(x+1, y  , tetrominoType);
            positions[2] = new Square(x  , y+1, tetrominoType);
            positions[3] = new Square(x+1, y+1, tetrominoType);
            return positions;
        case TSHP:
            positions[1] = new Square(x+1, y  , tetrominoType);
            positions[2] = new Square(x+2, y  , tetrominoType);
            positions[3] = new Square(x+1, y+1, tetrominoType);
            return positions;
        case SSHP_R:
            positions[1] = new Square(x+1, y  , tetrominoType);
            positions[2] = new Square(x  , y+1, tetrominoType);
            positions[3] = new Square(x-1, y+1, tetrominoType);
            return positions;
        case SSHP_L:
            positions[1] = new Square(x-1, y  , tetrominoType);
            positions[2] = new Square(x  , y+1, tetrominoType);
            positions[3] = new Square(x+1, y+1, tetrominoType);
            return positions;
        case LSHP_R:
            positions[1] = new Square(x  , y+1, tetrominoType);
            positions[2] = new Square(x+1, y+1, tetrominoType);
            positions[3] = new Square(x+2, y+1, tetrominoType);
            return positions;
        case LSHP_L:
            positions[1] = new Square(x  , y+1, tetrominoType);
            positions[2] = new Square(x-1, y+1, tetrominoType);
            positions[3] = new Square(x-2, y+1, tetrominoType);
            return positions;
    }
    return positions;
}

/* EOF */
