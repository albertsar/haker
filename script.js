
var matrix = [

];

var grassArr = [];
var grassEaterArr = [];
var wildArr = [];
var omnivoreArr = [];
var fireArr = [];
var iceArr = [];
let bomberArr = [];
let bomberDestroyerArr = [];

var side = 40;


function setup() {

    for (let i = 0; i < 35; i++) {
        matrix[i] = [];
        for (let j = 0; j < 35; j++) {
            matrix[i].push(random([0, 1, 2, 3, 4, 5, 6, 7]))
        }
    }

    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                const gr = new Grass(j, i, 1);
                grassArr.push(gr);
            } else if (matrix[i][j] === 2) {
                const grEt = new GrassEater(j, i, 2);
                grassEaterArr.push(grEt);
            } else if (matrix[i][j] === 3) {
                const wi = new Wild(j, i, 3);
                wildArr.push(wi);

            } else if (matrix[i][j] === 4) {
                const omn = new Omnivore(j, i, 4);
                omnivoreArr.push(omn);
            } else if (matrix[i][j] === 5) {
                const fi = new Fire(j, i, 5);
                fireArr.push(fi);
            } else if (matrix[i][j] === 6) {
                const ic = new Ice(j, i, 6);
                iceArr.push(ic);
            } else if (matrix[i][j] === 7) {
                const bomb = new Bomber(j, i, 7);
                bomberArr.push(bomb);
            }
        }
    }

}

function mouseClicked(event) {
    
    console.log(Math.floor(mouseY/side),Math.floor(mouseX/side))
    if(event.target?.className !== "p5Canvas")return

    const canvas = event.target
   
    
  }


function draw() {



    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] === 2) {
                fill("yellow");
            }
            else if (matrix[y][x] === 3) {
                fill("purple");
            } else if (matrix[y][x] === 4) {
                fill("blue");
            } else if (matrix[y][x] === 5) {
                fill("red");
            } else if (matrix[y][x] === 6) {
                fill("white");
            } else if (matrix[y][x] === 7) {
                fill("black");
            }

            rect(x * side, y * side, side, side);
        }

    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }

    for (var i in grassEaterArr) {
        grassEaterArr[i].move();

        if (grassEaterArr[i].energy > 0) {
            grassEaterArr[i].eat();

            if (grassEaterArr[i].energy > 12) {
                grassEaterArr[i].mul();
            }
        } else {
            grassEaterArr[i].die();
        }
    }

    for (var i in wildArr) {
        wildArr[i].move();

        if (wildArr[i].energy > 0) {
            wildArr[i].eat();

            if (wildArr[i].energy > 12) {
                wildArr[i].mul();
            }
        } else {
            wildArr[i].die();
        }
    }

    for (var i in omnivoreArr) {
        omnivoreArr[i].move();

        if (omnivoreArr[i].energy > 0) {
            omnivoreArr[i].eat();

            if (omnivoreArr[i].energy > 12) {
                omnivoreArr[i].mul();
            }
        } else {
            omnivoreArr[i].die();
        }
    }
    for (var i in fireArr) {
        fireArr[i].move();

        if (fireArr[i].energy > 0) {
            fireArr[i].eat();

            if (fireArr[i].energy > 1) {
                fireArr[i].mul();
            }
        } else {
            fireArr[i].die();
        }
    }

    for (var i in iceArr) {
        iceArr[i].move();

        if (iceArr[i].energy > 0) {
            iceArr[i].eat();

            if (iceArr[i].energy > 1) {
                iceArr[i].mul();
            }
        } else {
            iceArr[i].die();
        }
    }
    for (var i in bomberArr) {
        bomberArr[i].move();

        if (bomberArr[i].energy > 0) {
            bomberArr[i].eat();

            if (bomberArr[i].energy > 12) {
                bomberArr[i].mul();
            }
        } else {
            bomberArr[i].die();
        }
    }



}



