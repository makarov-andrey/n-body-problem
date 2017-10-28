import {RadiusVector} from "./RadiusVector";

export class VectorValue extends RadiusVector {
    /**
     * @see getDistance
     * @returns {number}
     */
    getModuloValue () {
        return this.getDistance();
    }

    /**
     * @see setDistance
     * @returns {number}
     */
    setModuloValue (val: number) {
        this.setDistance(val);
    }
}
