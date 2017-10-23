export class Position {
    constructor (
        public x: number = 0,
        public y: number= 0
    ) {}

    static distance (from: Position, to: Position = new Position(0, 0)) {
        return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
    }

    static direction (from: Position, to: Position = null) {
        if (to === null) {
            to = from;
            from = new Position(0, 0);
        }
        let ordinateCatheter = to.y - from.y;
        let abscissaCatheter = to.x - from.x;
        if (ordinateCatheter == 0) {
            return abscissaCatheter >= 0 ? 0 : Math.PI;
        }
        if (abscissaCatheter == 0) {
            return ordinateCatheter >= 0 ? Math.PI / 2 : Math.PI * 1.5;
        }
        let relativeAngle = Math.abs(Math.atan(ordinateCatheter / abscissaCatheter));
        switch (Position.quarter(to, from)) {
            case 1:
                return relativeAngle;
            case 2:
                return Math.PI - relativeAngle;
            case 3:
                return Math.PI + relativeAngle;
            case 4:
                return Math.PI * 2 - relativeAngle;
        }
    }

    static quarter (point: Position, startingPosition: Position = new Position(0, 0)): 1|2|3|4 {
        if (point.x > startingPosition.x) {
            if (point.y > startingPosition.y) {
                return 1;
            } else {
                return 4;
            }
        } else {
            if (point.y >= startingPosition.y) {
                return 2;
            } else {
                return 3;
            }
        }
    }
}
