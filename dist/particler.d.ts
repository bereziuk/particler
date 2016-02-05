interface IParticlerConfig {
    quantity: number;
    lineWidth: number;
    fillColor: string;
    minSize: number;
    maxSize: number;
    minimalLineLength: number;
    speed: number;
    frameDuration: number;
    backgroundColor: string;
}
interface IParticlerCustomConfig {
    quantity?: number;
    lineWidth?: number;
    fillColor?: string;
    minSize?: number;
    maxSize?: number;
    minimalLineLength?: number;
    speed?: number;
    frameDuration?: number;
    backgroundColor?: string;
}
interface IDot {
    size: number;
    posX: number;
    posY: number;
    vx: number;
    vy: number;
}
interface IParticler {
    wrapperId: string;
    wrapper: HTMLCanvasElement;
    canvas: CanvasRenderingContext2D;
    config: IParticlerConfig;
    dotsArray: Array<IDot>;
}
declare class ParticlerDefaultConfig implements IParticlerConfig {
    quantity: number;
    lineWidth: number;
    fillColor: string;
    minSize: number;
    maxSize: number;
    minimalLineLength: number;
    speed: number;
    frameDuration: number;
    backgroundColor: string;
}
declare class Particler implements IParticler {
    wrapperId: string;
    wrapper: HTMLCanvasElement;
    canvas: CanvasRenderingContext2D;
    config: IParticlerConfig;
    dotsArray: Array<IDot>;
    constructor(wrapperId: string, customConfig?: IParticlerCustomConfig);
    setConfig(customConfig: IParticlerCustomConfig): void;
    createDot(i: number, arr: Array<IDot>): void;
    drawDots(): void;
    generateDotsArray(): void;
    setWrapperSize(): void;
    resizingHandler(): void;
}
