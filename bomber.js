class Bomber {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 1;
        this.index = index;
        this.directions = [];


    }
    chooseCell(characters) {
        const chars = Array.isArray(characters) ? characters : [characters];

        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (chars.includes(matrix[y][x])) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],

            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],

            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],

            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],

            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }



    getNewsmallCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    move() {
        this.energy--;

        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 7;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        var emptyCells = this.chooseCell([1, 2, 3, 4, 5, 6]);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            const eatenType = matrix[newY][newX];

            matrix[newY][newX] = 7;
            matrix[this.y][this.x] = 0;

            this.energy += 2;

            this.x = newX;
            this.y = newY;

            if (eatenType === 2) {
                for (let i in grassEaterArr) {
                    if (
                        grassEaterArr[i].x === this.x
                        && grassEaterArr[i].y === this.y
                    ) {
                        grassEaterArr.splice(i, 1);
                    }
                }
            } else if (eatenType === 1) {
                for (let i in grassArr) {
                    if (
                        grassArr[i].x === this.x
                        && grassArr[i].y === this.y
                    ) {
                        grassArr.splice(i, 1);
                    }
                }
            } else if (eatenType === 3) {
                for (let i in wildArr) {
                    if (
                        wildArr[i].x === this.x
                        && wildArr[i].y === this.y
                    ) {
                        wildArr.splice(i, 1);
                    }
                }
            } else if (eatenType === 4) {

                for (let i in omnivoreArr) {
                    if (
                        omnivoreArr[i].x === this.x
                        && omnivoreArr[i].y === this.y
                    ) {
                        omnivoreArr.splice(i, 1);
                    }
                }

            }
        

         else if (eatenType === 5) {

            for (let i in fireArr) {
                if (
                    fireArr[i].x === this.x
                    && fireArr[i].y === this.y
                ) {
                    fireArr.splice(i, 1);
                }
            }

        } else if (eatenType === 6) {

            for (let i in iceArr) {
                if (
                    iceArr[i].x === this.x
                    && iceArr[i].y === this.y
                ) {
                    iceArr.splice(i, 1);
                }
            }

        }
    }
    }



    explode() {
        if (this.energy > 1) this.move();

        else if (this.energy <= 0) this.die();

        else {
            this.energy--;
            var allCells = this.killCell();


            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

                if (matrix[y][x] == 0) matrix[y][x] = 0;
                else if (matrix[y][x] == 1) {
                    matrix[y][x] == 0;
                    for (let i in grassArr) {
                        if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                            grassArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (matrix[y][x] == 2) {
                    matrix[y][x] == 0;
                    for (let i in grassEaterArr) {
                        if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (matrix[y][x] == 3) {
                    matrix[y][x] == 0;
                    for (let i in wildArr) {
                        if (this.x == wildArr[i].x && this.y == wildArr[i].y) {
                            wildArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (matrix[y][x] == 4) {
                    matrix[y][x] == 0;
                    for (let i in omnivoreArr) {
                        if (this.x == omnivoreArr[i].x && this.y == omnivoreArr[i].y) {
                            omnivoreArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (matrix[y][x] == 5) {
                    matrix[y][x] == 0;
                    for (let i in fireArr) {
                        if (this.x == fireArr[i].x && this.y == fireArr[i].y) {
                            fireArr.splice(i, 1);
                            break;
                        }
                    }
                }
                else if (matrix[y][x] == 6) {
                    matrix[y][x] == 0;
                    for (let i in iceArr) {
                        if (this.x == iceArr[i].x && this.y == iceArr[i].y) {
                            iceArr.splice(i, 1);
                            break;
                        }
                    }
                }
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
            }
        }
    }





    die() {
        matrix[this.y][this.x] = 0;
        for (var i in bomberArr) {
            if (bomberArr[i].x === this.x && bomberArr[i].y === this.y) {
                bomberArr.splice(i, 1);
            }
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var emptyCell = random(emptyCells);

        if (emptyCell) {
            var newX = emptyCell[0];
            var newY = emptyCell[1];

            matrix[newY][newX] = 7;

            var newBomber = new Bomber(newX, newY, 1);
            bomberArr.push(newBomber);
        }
    }
}