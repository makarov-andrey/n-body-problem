export class RadiusVector {
    constructor (
        public x: number = 0,
        public y: number= 0
    ) {}

    /**
     * Возвращает расстояние от текущей точки до точки to (по умолчанию - до начала координат)
     *
     * @param {RadiusVector} to
     * @returns {number}
     */
    getDistance (to: RadiusVector = new RadiusVector(0, 0)) {
        return Math.sqrt(Math.pow(to.x - this.x, 2) + Math.pow(to.y - this.y, 2));
    }

    /**
     * Удлиняет вектор в том же направлении (устанавливая новые координаты)
     *
     * @param {number} val
     */
    setDistance (val: number) {
        let direction = this.getDirection();
        this.x = val * Math.sin(direction);
        this.y = val * Math.cos(direction);
    }

    /**
     * Возвращает угол вектора в радианах относительно оси абсцисс в соответствии с математическими стандартами
     *          ∧ PI * 0.5
     *          |
     *          |
     *          |      0 (PI * 2)
     * <----------------->
     * PI       |
     *          |
     *          |
     *          ∨ PI * 1.5
     *
     * @param {RadiusVector} to
     * @returns {number}
     */
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

    /**
     * Возвращает четверть, в которой лежит радиус-вектор, в соответствии с математическими стандартами
     *          ∧
     *          |
     *    2     |    1
     *          |
     * <----------------->
     *          |
     *    3     |    4
     *          |
     *          ∨
     *
     * @param {RadiusVector} startingPosition
     * @returns {number} 1|2|3|4
     */
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

    /**
     * @see this.getDistance
     * @returns {number}
     */
    getAmount () {
        return this.getDistance();
    }

    /**
     * @see this.setDistance
     * @param {number} val
     */
    setAmount (val: number) {
        this.setDistance(val);
    }

    /**
     * Устанавливает координаты вектора, не меняя значения
     *
     * @param {number} val - угол относительно оси абсцисс в радианах
     */
    setDirection (val: number) {
        let amount = this.getAmount();
        this.x = amount * Math.sin(val);
        this.y = amount * Math.cos(val);
    }

    /**
     * Прибавляет вектор к текущему вектору
     *
     * @param {RadiusVector} another
     */
    add (another: RadiusVector) {
        this.x += another.x;
        this.y += another.y;
    }

    /**
     * Вычитает вектор из текущего вектора
     *
     * @param {RadiusVector} another
     */
    deduct (another: RadiusVector) {
        this.x -= another.x;
        this.y -= another.y;
    }
}
