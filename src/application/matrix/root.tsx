import React, { useRef, useEffect } from 'react';
import './root.scss';

const Root = () => {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        if (!canvas) throw new Error('Unexpected error');

        const context = canvas.getContext('2d');
        if (context === null) throw new Error('Unexpected error');

        const characterWidth = 10;
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        const columns = Math.floor(width / characterWidth) + 1;
        const yPositions = Array(columns).fill(0);

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        context.fillStyle = '#000';
        context.fillRect(0, 0, width, height);

        setInterval(() => {
            context.fillStyle = '#0001';
            context.fillRect(0, 0, width, height);
            context.fillStyle = '#0f0';
            context.font = `${characterWidth * 0.8}pt monospace`;

            yPositions.forEach((yPosition, index) => {
                const text = String.fromCharCode(Math.random() * 128);
                const xPosition = index * characterWidth;
                context.fillText(text, xPosition, yPosition);
                if (yPosition > 100 + Math.random() * 10000) {
                    yPositions[index] = 0;
                } else {
                    yPositions[index] = yPosition + characterWidth;
                }
            });
        }, 50);
    }, []);

    return <canvas ref={ref} className="application-matrix-root"></canvas>;
};

export default Root;
