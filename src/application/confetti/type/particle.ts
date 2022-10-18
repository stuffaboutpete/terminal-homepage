interface Particle {
    image: number;
    x: number;
    y: number;
    xVelocity: number;
    yVelocity: number;
    rotation: number;
    rotationVelocity: number;
    masked: boolean;
};

export default Particle;
