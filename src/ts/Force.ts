import {VectorValue} from "./VectorValue";

export class Force extends VectorValue {
    static net (first: Force, second: Force): Force {
        let net = new Force;
        let relativeAngle = first.direction - second.direction;
        net.amount = Math.abs(Math.sqrt(Math.pow(first.amount, 2) + Math.pow(second.amount, 2) + 2 * first.amount * second.amount * Math.cos(relativeAngle)));
        let angleBetweenFirstAndNet = Math.asin(second.amount * Math.sin(relativeAngle) / net.amount);
        net.direction = first.direction - angleBetweenFirstAndNet;
        return net;
    }
}
