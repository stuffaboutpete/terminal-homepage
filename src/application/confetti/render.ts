import CanvasToolkit from '../../model/application/type/canvas-toolkit';
import State from './type/state';
import loadImages from './load-images';
import createParticle from './create-particle';
import projectile from './projectile';
import circleIsInsideRectangle from './circle-is-inside-rectangle';

let images: HTMLImageElement[] | undefined = undefined;
loadImages().then(loadedImages => images = loadedImages);

type T = (canvasToolkit: CanvasToolkit<State>) => State;

const f: T = ({ canvas, context, canvasState, globalState, deactivateCanvas }) => {
    if (!images) return canvasState;

    // TODO Surely should be able to access current window position
    const terminal = globalState.windowPositions[0];

    const window = {
        position: { x: terminal.x, y: terminal.y },
        size: { width: terminal.width, height: terminal.height }
    };

    const playground = globalState.browserSize;
    const safeOffset = 200;

    let { futureParticleCount, particles } = canvasState;

    if (futureParticleCount > 0 && Math.random() < 0.9) {
        particles = [
            ...particles,
            createParticle(
                window,
                14,
                3,
                safeOffset
            )
        ];
        futureParticleCount--;
    }

    canvas.width = playground.width;
    canvas.height = playground.height;

    const now = performance.now();

    for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        const image = images[particle.image];

        let { x, y } = projectile(
            particle.launchAngle,
            particle.initialVelocty,
            (now - particle.timeOfBirth) / 1000
        );

        x += particle.initialPosition.x;
        y += particle.initialPosition.y;
        x -= image.width / 2;
        y -= image.height / 2;

        context.save();

        if (particle.masked) {
            // TODO pythag
            const imageRadius = Math.sqrt(image.width * image.width + image.height * image.height) / 2;
            const canLeaveWindow = circleIsInsideRectangle(
                {
                    position: { x, y },
                    radius: imageRadius
                },
                window
            );

            if (canLeaveWindow) particle.masked = false;
        }

        if (particle.masked) {
            context.beginPath();
            context.moveTo(window.position.x, window.position.y);
            context.lineTo(window.position.x + window.size.width, window.position.y);
            context.lineTo(window.position.x + window.size.width, window.position.y + window.size.height);
            context.lineTo(window.position.x, window.position.y + window.size.height);
            context.closePath();
            context.clip();
        }

        context.translate(x, y);
        context.rotate(particle.rotation * Math.PI / 180); // TODO Degrees to radians function
        context.drawImage(image, image.width / -2, image.height / -2);
        context.restore();

        if (y > playground.height + safeOffset) particle.endOfLife = true;
    }

    particles = particles.filter(particle => particle.endOfLife !== true);

    if (particles.length === 0 && futureParticleCount === 0) {
        deactivateCanvas();
    }

    return {
        futureParticleCount,
        particles
    };
};

export default f;
