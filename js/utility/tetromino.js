/**
 *
 */
function buildTetrominoSquares(x, y, tetrominoType) {
    var squares = new Array(4);
    squares[0] = new Square(x, y, tetrominoType);
    switch(tetrominoType) {
        case LINESHP:
            squares[1] = new Square(x+1, y, tetrominoType);
            squares[2] = new Square(x+2, y, tetrominoType);
            squares[3] = new Square(x+3, y, tetrominoType);
            return squares;
        case SQUARESHP:
            squares[1] = new Square(x+1, y  , tetrominoType);
            squares[2] = new Square(x  , y+1, tetrominoType);
            squares[3] = new Square(x+1, y+1, tetrominoType);
            return squares;
        case TSHP:
            squares[1] = new Square(x+1, y  , tetrominoType);
            squares[2] = new Square(x+2, y  , tetrominoType);
            squares[3] = new Square(x+1, y+1, tetrominoType);
            return squares;
        case SSHP_R:
            squares[1] = new Square(x+1, y  , tetrominoType);
            squares[2] = new Square(x  , y+1, tetrominoType);
            squares[3] = new Square(x-1, y+1, tetrominoType);
            return squares;
        case SSHP_L:
            squares[1] = new Square(x-1, y  , tetrominoType);
            squares[2] = new Square(x  , y+1, tetrominoType);
            squares[3] = new Square(x+1, y+1, tetrominoType);
            return squares;
        case LSHP_R:
            squares[1] = new Square(x  , y+1, tetrominoType);
            squares[2] = new Square(x+1, y+1, tetrominoType);
            squares[3] = new Square(x+2, y+1, tetrominoType);
            return squares;
        case LSHP_L:
            squares[1] = new Square(x  , y+1, tetrominoType);
            squares[2] = new Square(x-1, y+1, tetrominoType);
            squares[3] = new Square(x-2, y+1, tetrominoType);
            return squares;
    }
    return squares;
}

/* EOF */
