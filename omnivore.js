class Omnivore {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
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
            matrix[newY][newX] = 4;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        var emptyCells = this.chooseCell([1, 2, 3]);
        var newCell = random(emptyCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];

            const eatenType = matrix[newY][newX];

            matrix[newY][newX] = 4;
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
                
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in omnivoreArr) {
            if (omnivoreArr[i].x === this.x && omnivoreArr[i].y === this.y) {
                omnivoreArr.splice(i, 1);
            }
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var emptyCell = random(emptyCells);

        if (emptyCell) {
            var newX = emptyCell[0];
            var newY = emptyCell[1];

            matrix[newY][newX] = 4;

            var newOmnivore = new Omnivore(newX, newY, 1);
            omnivoreArr.push(newOmnivore);
        }
    }
}