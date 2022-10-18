import Particle from './type/particle';
import Rectangle from './type/rectangle';
import Point from './type/point';
import randomBetween from './random-between';

type T = (
    playground: Rectangle,
    emitter: { size: Rectangle, position: Point },
    smallImageCount: number,
    largeImageCount: number,
    safeOffset: number
) => Particle;

const f: T = (playground, emitter, smallImageCount, largeImageCount, safeOffset) => {
    const x = randomBetween(
        emitter.position.x + 100,
        emitter.position.x + emitter.size.width - 100
    );
    const y = emitter.position.y + emitter.size.height + safeOffset;
    let vectorToCenterOfEmitter = {
        x: emitter.position.x + (emitter.size.width / 2) - x,
        y: emitter.position.y + (emitter.size.height / 2) - y
    };
    const vectorMagnitude = Math.sqrt(
        vectorToCenterOfEmitter.x * vectorToCenterOfEmitter.x
        +
        vectorToCenterOfEmitter.y * vectorToCenterOfEmitter.y
    );
    vectorToCenterOfEmitter.x /= vectorMagnitude;
    vectorToCenterOfEmitter.y /= vectorMagnitude;
    vectorToCenterOfEmitter.x *= 80;
    vectorToCenterOfEmitter.y *= 80;
    return {
        image: Math.random() < 0.95
            ? randomBetween(0, smallImageCount - 1)
            : randomBetween(smallImageCount, smallImageCount + largeImageCount - 1),
        x,
        y,
        xVelocity: vectorToCenterOfEmitter.x,
        yVelocity: vectorToCenterOfEmitter.y,
        rotation: randomBetween(-30, 30),
        rotationVelocity: randomBetween(-1, 1),
        masked: true
    };
};

export default f;
