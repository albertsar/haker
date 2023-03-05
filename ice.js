class Ice {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 3;
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
            matrix[newY][newX] = 6;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;
        }
    }

    eat() {
        var grassCells = this.chooseCell(5);
        var newCell = random(grassCells);

        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;

            this.energy--;

            this.x = newX;
            this.y = newY;

            for (let i in fireArr) {
                if (
                    fireArr[i].x === this.x
                    && fireArr[i].y === this.y
                ) {
                    fireArr.splice(i, 1);
                }
            }
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in iceArr) {
            if (iceArr[i].x === this.x && iceArr[i].y === this.y) {
                iceArr.splice(i, 1);
            }
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var emptyCell = random(emptyCells);

        if (emptyCell) {
            var newX = emptyCell[0];
            var newY = emptyCell[1];

            matrix[newY][newX] = 6;

            var newice = new Ice(newX, newY, 1);
            iceArr.push(newice);
        }
    }
}
