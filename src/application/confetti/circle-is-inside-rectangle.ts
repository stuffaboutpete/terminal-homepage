import Rectangle from './type/rectangle';
import Point from './type/point';

type T = (
    circle: { position: Point, radius: number },
    rectangle: { position: Point, size: Rectangle }
) => boolean;

const f: T = (circle, rectangle) => {
    if (circle.position.x - circle.radius < rectangle.position.x) return false;
    if (circle.position.x + circle.radius > rectangle.position.x + rectangle.size.width) return false;
    if (circle.position.y - circle.radius < rectangle.position.y) return false;
    if (circle.position.y + circle.radius > rectangle.position.y + rectangle.size.height) return false;
    return true;
};

export default f;
