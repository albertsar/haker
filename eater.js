class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];


    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
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
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        var grassCells = this.chooseCell(1);
        var newCell = random(grassCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            this.energy += 2;

            this.x = newX;
            this.y = newY;

            for (let i in grassArr) {
                if (
                    grassArr[i].x === this.x
                    && grassArr[i].y === this.y
                ) {
                    grassArr.splice(i, 1);
                }
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in grassEaterArr) {
            if (grassEaterArr[i].x === this.x && grassEaterArr[i].y === this.y) {
                grassEaterArr.splice(i, 1);
            }
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var emptyCell = random(emptyCells);

        if (emptyCell) {
            var newX = emptyCell[0];
            var newY = emptyCell[1];

            matrix[newY][newX] = 2;

            var newGrassEater = new GrassEater(newX, newY, 1);
            grassEaterArr.push(newGrassEater);
        }
    }
}
