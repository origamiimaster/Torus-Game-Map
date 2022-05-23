const MAP_WIDTH = 500;
const MAP_HEIGHT = 500;

function mod(n, m) {
    return ((n % m) + m) % m;
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
    toObj() {
        return { x: this.x, y: this.y }
    }
    static fromObj(obj) {
        return new Position(obj.x, obj.y)
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
    toObj() {
        return { start: this.start.toObj(), end: this.end.toObj(), time: this.endTime }
    }
    static fromObj(obj) {
        return new Path(Positin.fromObj(obj.start), Position.fromObj(obj.end), obj.time)
    }
}

class Map {
    MAP_WIDTH;
    MAP_HEIGHT;
    bases = []
    paths = []
    subs = []
    constructor(w, h) {
        if (w <= 0 || h <= 0) {
            throw RangeError(`Not valid dimensions: (${w}, ${h})`);
        }
        this.MAP_WIDTH = w;
        this.MAP_HEIGHT = h;
    }
    addBase(position) {
        this.bases.push(position)
    }
    addPath(path) {
        this.paths.push(path)
    }
    oldAddPath(x1, y1, x2, y2) {
        let tmp = new Path(new Position(x1, y1), new Position(x2, y2), 10);
        let tmpArray = []
        for (let i = 0; i < 10 + 1; i++) {
            tmpArray.push(tmp.getPosition(i))
        }
        this.paths.push(tmpArray);
    }
    toObj() {
        return {
            bases: this.bases.map(base => base.toObj()),
            paths: this.paths.map(path => path.toObj()),
            subs: [],
            w: MAP_WIDTH,
            h: MAP_HEIGHT
        }
    }
    static fromObj(obj) {
        let temp = new Map(obj.w, obj.h);
        obj.bases.forEach(base => {
            temp.addBase(Position.fromObj(base))
        })
        obj.paths.forEach(path => {
            temp.addPath(Path.fromObj(path))
        })
        // TODO: Add inflation for subs and other future stuff...
    }
}


function testPathWithDesmos() {
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
}



exports.Map = Map;
exports.Path = Path;
exports.Position = Position;
