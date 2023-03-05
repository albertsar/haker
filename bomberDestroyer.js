class BomberDestroyer  {
    
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 8;
        this.index = index;
        this.directions = [];
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

    
    destroy() {
        let bombCells = this.chooseCell(7);
        if (bombCells.length != 0) {
            this.energy+=2;
            let randomCell = random(bombCells);

            let x = randomCell[0];
            let y = randomCell[1];

            matrix[y][x] = 8;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            for (let i in BomberArr) {
                if (this.x == BomberArr[i].x && this.y == BomberArr[i].y) {
                    BomberArr.splice(i, 1);
                    break;
                }
            }
        }
        else this.move();
    }

    
    move() {
        if (this.energy >= 50) this.die();
        else {
            this.energy++;
            let emptyCells = this.chooseCell(0);
            if (emptyCells.length != 0) {
                var randomCell = random(emptyCells);

                let x = randomCell[0];
                let y = randomCell[1];

                matrix[y][x] = 8;
                matrix[this.y][this.x] = 0;

                this.x = x;
                this.y = y;
            }
        }
    }

    
    die() {
        matrix[this.y][this.x] = 0;
        for (let i in BomberDestroyerArr) {
            if (this.x == BomberDestroyerArr[i].x && this.y == BomberDestroyerArr[i].y) {
                BomberDestroyerArr.splice(i, 1);
                break;
            }
        }
    }
}