/**
 *
 */

import Point from './type/point';
import displacement from './displacement';

type T = (angle: number, initialVelocity: number, time: number) => Point;

const f: T = (angle, initialVelocity, time) => {
    const gravity = 800;
    const initialVelocityX = initialVelocity * Math.cos(angle);
    const initialVelocityY = initialVelocity * Math.sin(angle);
    const x = displacement(initialVelocityX, 0, time);
    const y = displacement(initialVelocityY, gravity, time);
    return { x, y };
};

export default f;
