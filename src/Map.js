const MAP_WIDTH = 14;
const MAP_HEIGHT = 10;

function mod(n, m) {
    return ((n % m) + m) % m;
}

class Position {
    x = 0
    y = 0
    constructor(x, y) {
        if (x < 0 || x > MAP_WIDTH || y < 0 || y > MAP_HEIGHT) {
            throw RangeError(`Not valid position: ${x} ${y}`);
        }
        this.x = x;
        this.y = y;
    }


}

class Path {
    start = new Position(0, 0);
    end = new Position(0, 0);
    endTime = 0;
    pathFunction = null;
    constructor(start, end, endTime) {
        this.start = start;
        this.end = end;
        this.endTime = endTime;

        let xDist = this.end.x - this.start.x;
        let yDist = this.end.y - this.start.y;

        let xMult = xDist;
        let yMult = yDist;

        if (xDist > 0) {
            xMult -= MAP_WIDTH;
        } else {
            xMult += MAP_WIDTH;
        }

        if (yDist > 0) {
            yMult -= MAP_HEIGHT;
        } else {
            yMult += MAP_HEIGHT;
        }

        if (Math.abs(xDist) < MAP_WIDTH / 2) {
            xMult = xDist;
        }

        if (Math.abs(yDist) < MAP_HEIGHT / 2) {
            yMult = yDist;
        }

        this.pathFunction = (t) => {
            return new Position(mod((xMult * t) / (this.endTime) + start.x, MAP_WIDTH), mod((yMult * t) / this.endTime + start.y, MAP_HEIGHT))
        }
    }
    getPosition(timeDelta) {
        return this.pathFunction(timeDelta);
    }
}

function distance(position1, position2) {
    let xDist = Math.abs(position2.x - position1.x);
    let yDist = Math.abs(position2.y - position1.y);
    if (2 * xDist > MAP_WIDTH) {
        xDist = MAP_WIDTH - xDist;
    }
    if (2 * yDist > MAP_HEIGHT) {
        yDist = MAP_HEIGHT - yDist;
    }
    return Math.sqrt(xDist * xDist + yDist * yDist);
}



A = new Position(12, 8);
B = new Position(2, 2);
console.log(A);
console.log(B); A
console.log(distance(A, B));
MyPath = new Path(A, B, 10);
console.log(MyPath);
let out = ""
for (let i = 0; i <= 10; i++) {
    out += "(" + MyPath.getPosition(i).x + "," + MyPath.getPosition(i).y + "),"
}
console.log(out)

