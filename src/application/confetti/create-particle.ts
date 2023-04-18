import Particle from './type/particle';
import Rectangle from './type/rectangle';
import Point from './type/point';
import randomBetween from './random-between';

type T = (
    emitter: { size: Rectangle, position: Point },
    smallImageCount: number,
    largeImageCount: number,
    safeOffset: number
) => Particle;

const f: T = (emitter, smallImageCount, largeImageCount, safeOffset) => {
    const x = randomBetween(
        emitter.position.x + 100,
        emitter.position.x + emitter.size.width - 100
    );

    const y = emitter.position.y + emitter.size.height + safeOffset;

    let vectorToCenterOfEmitter = {
        x: emitter.position.x + (emitter.size.width / 2) - x,
        y: emitter.position.y + (emitter.size.height / 2) - y
    };

    const launchAngle = Math.atan(vectorToCenterOfEmitter.x / vectorToCenterOfEmitter.y);

    return {
        image: Math.random() < 0.95
            ? randomBetween(0, smallImageCount - 1)
            : randomBetween(smallImageCount, smallImageCount + largeImageCount - 1),
        masked: true,
        timeOfBirth: performance.now(), // TODO Should be passed in?
        initialPosition: { x, y },
        initialVelocty: -1200,
        launchAngle: (Math.PI / 2) - launchAngle,
        rotation: randomBetween(-30, 30),
        endOfLife: false
    };
};

export default f;
