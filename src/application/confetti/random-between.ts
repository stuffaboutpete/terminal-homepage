type T = (minimum: number, maximum: number) => number;

const f: T = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export default f;
