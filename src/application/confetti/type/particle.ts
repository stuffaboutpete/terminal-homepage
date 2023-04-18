import Point from './point';

interface Particle {
    image: number;
    timeOfBirth: number;
    initialPosition: Point;
    initialVelocty: number;
    launchAngle: number;
    rotation: number;
    masked: boolean;
    endOfLife: boolean;
};

export default Particle;
