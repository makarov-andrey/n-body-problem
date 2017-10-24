export class RadiusVector {
    constructor (
        public x: number = 0,
        public y: number= 0
    ) {}

    getDistance (to: RadiusVector = new RadiusVector(0, 0)) {
        return Math.sqrt(Math.pow(to.x - this.x, 2) + Math.pow(to.y - this.y, 2));
    }

    getDirection (to: RadiusVector = null) {
        let from;
        if (to === null) {
            from = new RadiusVector(0, 0);
            to = this;
        } else {
            from = this;
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
        switch (to.getQuarter(from)) {
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

    getQuarter (startingPosition: RadiusVector = new RadiusVector(0, 0)): 1|2|3|4 {
        if (this.x > startingPosition.x) {
            if (this.y > startingPosition.y) {
                return 1;
            } else {
                return 4;
            }
        } else {
            if (this.y >= startingPosition.y) {
                return 2;
            } else {
                return 3;
            }
        }
    }

    getAmount () {
        return this.getDistance();
    }

    setAmount (val: number) {
        let direction = this.getDirection();
        this.x = val * Math.sin(direction);
        this.y = val * Math.cos(direction);
    }

    setDirection (val: number) {
        let amount = this.getAmount();
        this.x = amount * Math.sin(val);
        this.y = amount * Math.cos(val);
    }

    add (another: RadiusVector) {
        this.x += another.x;
        this.y += another.y;
    }

    deduct (another: RadiusVector) {
        this.x -= another.x;
        this.y -= another.y;
    }
}
