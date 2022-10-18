import imageNames from './images';

type T = () => Promise<HTMLImageElement[]>;

const f: T = () => {
    const images = imageNames.map(name => {
        const image = new Image();
        image.src = `/${name}.png`;
        return image;
    });

    const imagePromises = images.map(image => {
        return new Promise<HTMLImageElement>(resolve => {
            image.addEventListener('load', () => resolve(image));
        });
    });

    return Promise.all(imagePromises);
};

export default f;
