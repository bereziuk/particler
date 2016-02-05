interface IParticlerConfig {
    quantity: number;
    lineWidth: number;
    fillColor: string;
    minSize: number;
    maxSize: number;
    minimalLineLength: number;
    speed: number;
    framesPerSecond: number;
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
    framesPerSecond?: number;
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

class ParticlerDefaultConfig implements IParticlerConfig {
    quantity = 20;
    lineWidth = 0.05;
    fillColor = "#000000";
    minSize = 1;
    maxSize = 3;
    minimalLineLength = 250;
    speed = 25;
    framesPerSecond = 60;
    frameDuration = 20;
    backgroundColor = "transparent";
}

class Particler implements IParticler {
    wrapper: HTMLCanvasElement;
    canvas: CanvasRenderingContext2D;
    config: IParticlerConfig = new ParticlerDefaultConfig();
    dotsArray: Array<IDot> = [];

    constructor(public wrapperId: string, customConfig?: IParticlerCustomConfig) {
        this.wrapper = <HTMLCanvasElement> document.getElementById(wrapperId);
        this.canvas = <CanvasRenderingContext2D> this.wrapper.getContext("2d");
        this.setConfig(customConfig);
        this.wrapper.style.backgroundColor = this.config.backgroundColor;
        this.setWrapperSize();
        this.generateDotsArray();
        this.resizingHandler();
    }

    setConfig(customConfig: IParticlerCustomConfig): void {
        if (customConfig !== undefined) {
            (() => {
                var item: any;

                for (item in this.config) {
                    if (customConfig.hasOwnProperty(item) && this.config[item] !== undefined) {
                        this.config[item] = customConfig[item];
                    }
                }
            })();
        }
    };

    createDot(i: number, arr: Array<IDot>): void {
        let size;
        let vx;
        let vy;
        let posX;
        let posY;
        let angle = Math.random() * 360;
        let rads = angle * Math.PI / 180;

        // set radom size and position
        size = Math.floor(Math.random() * (this.config.maxSize - this.config.minSize + 1) + this.config.minSize);
        posX = Math.random() * this.wrapper.offsetWidth;
        posY = Math.random() * this.wrapper.offsetHeight;

        vx = Math.cos(rads) * (this.config.speed / this.config.frameDuration);
        vy = Math.sin(rads) * (this.config.speed / this.config.frameDuration);

        arr[i] = {
            size: size,
            posX: posX,
            posY: posY,
            vx: vx,
            vy: vy
        };
    }

    drawDots(): void {
        let i;
        let j = this.config.quantity;
        let k;
        let el;
        let getDistance = (x1: number, y1: number, x2: number, y2: number) => {
                return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
            };

        for (i = 0; i < j; i++) {
            // define dots positions
            el = this.dotsArray[i];
            el.posX += el.vx;

            if (el.posX < 0 || el.posX > this.wrapper.offsetWidth) {
                if (el.posX < 0) {
                    el.posX = 0;
                } else {
                    el.posX = this.wrapper.offsetWidth;
                }

                el.vx = -el.vx;
            }

            el.posY += el.vy;
            if (el.posY < 0 || el.posY > this.wrapper.offsetHeight) {
                el.vy = -el.vy;
            }

            // draw dots
            this.canvas.beginPath();
            this.canvas.fillStyle = this.config.fillColor;
            this.canvas.arc(el.posX, el.posY, el.size, 0, 2 * Math.PI);

            // draw lines between dots
            for (k = 0; k < j; k++) {
                if (k !== i) {

                    this.canvas.lineWidth = this.config.lineWidth;
                    this.canvas.strokeStyle = this.config.fillColor;
                    this.canvas.moveTo(el.posX, el.posY);

                    if (getDistance(el.posX, el.posY, this.dotsArray[k].posX, this.dotsArray[k].posY) < this.config.minimalLineLength) {
                        this.canvas.lineTo(this.dotsArray[k].posX, this.dotsArray[k].posY);
                        this.canvas.stroke();
                    }
                }
            }
            this.canvas.fill();
        }

        this.canvas.fillStyle = this.config.fillColor;

        setTimeout(() => {
            this.canvas.clearRect(0, 0, this.wrapper.width, this.wrapper.height);
            this.drawDots();
        }, this.config.frameDuration);
    }

    generateDotsArray(): void {
        var i: number = 0;

        for (i; i < this.config.quantity; i++) {
            this.createDot(i, this.dotsArray);
        }

        this.drawDots();
    }

    setWrapperSize() {
        this.canvas.canvas.width = this.wrapper.offsetWidth;
        this.canvas.canvas.height = this.wrapper.offsetHeight;
    }

    resizingHandler(): void {
        window.addEventListener('resize',() => {
            this.setWrapperSize();
        });
    }
}