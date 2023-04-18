/**
 *
 */

type T = (initalVelocity: number, acceleration: number, time: number) => number;

const f: T = (initialVelocity, acceleration, time) => {
    return initialVelocity * time + 0.5 * acceleration * time * time;
};

export default f;
