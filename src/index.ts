interface IDotsConfig {
    quantity?: number;
    lineWidth?: number;
    fillColor?: string;
    minSize?: number;
    maxSize?: number;
    minimalLineLength?: number;
    speed?: number;
    framesPerSecond?: number;
    frameDuration?: number;
}

class MoleculesConfig {
    constructor() {
        var quantity = 20;
        var lineWidth = 0.05;
        var fillColor = "#000000";
        var minSize = 1;
        var maxSize = 3;
        var minimalLineLength = 250;
        var speed = 25;
        var framesPerSecond = 60;
        var frameDuration = 20;
    }
}

interface IMolecules {
    wrapperId: string;
    config?: IDotsConfig;
    wrapper: any;
    canvas: any;

}

class Molecules implements IMolecules {
    wrapperId: string;
    dotsArray = [];
    defaultConfig = new MoleculesConfig();
    config;
    wrapper;
    canvas;
    createDot;
    drawDots;
    generateDotsArray;

    constructor(id: string, settings: any) {

        this.wrapperId = id;
        this.wrapper = document.getElementById(this.wrapperId);
        this.canvas = this.wrapper.getContext("2d");

        if (settings !== undefined) {
            (() => {
                var item: any;

                for (item in settings) {
                    if (settings.hasOwnProperty(item) && this.config.dots[item] !== undefined) {
                        this.config.dots[item] = settings[item];
                    }
                }
            })();
        }

        createDot(i: any, arr: any): void {
            var size,
                vx,
                vy,
                posX,
                posY,
                angle = Math.random() * 360,
                rads = angle * Math.PI / 180;

            // setting size and position
            size = Math.floor(Math.random() * (this.config.dots.maxSize - this.config.dots.minSize + 1) + this.config.dots.minSize);
            posX = Math.random() * this.wrapper.offsetWidth;
            posY = Math.random() * this.wrapper.offsetHeight;

            vx = Math.cos(rads) * (this.config.dots.speed / this.config.dots.frameDuration);
            vy = Math.sin(rads) * (this.config.dots.speed / this.config.dots.frameDuration);

            // setting dot coordinates
            arr[i] = {
                size: size,
                posX: posX,
                posY: posY,
                vx: vx,
                vy: vy
            };
        }

        drawDots() {
            var i,
                j = this.config.dots.quantity,
                k,
                el,
                getDistance = (x1: number, y1: number, x2: number, y2: number) => {
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
                this.canvas.fillStyle = this.config.dots.fillColor;
                this.canvas.arc(el.posX, el.posY, el.size, 0, 2 * Math.PI);

                // draw lines between dots
                for (k = 0; k < j; k++) {
                    if (k !== i) {

                        this.canvas.lineWidth = this.config.dots.lineWidth;
                        this.canvas.strokeStyle = this.config.dots.fillColor;
                        this.canvas.moveTo(el.posX, el.posY);

                        if (getDistance(el.posX, el.posY, this.dotsArray[k].posX, this.dotsArray[k].posY) < this.config.dots.minimalLineLength) {
                            this.canvas.lineTo(this.dotsArray[k].posX, this.dotsArray[k].posY);
                            this.canvas.stroke();
                        }
                    }
                }
                this.canvas.fill();
            }

            this.canvas.fillStyle = this.config.dots.fillColor;

            setTimeout(() => {
                this.canvas.clearRect(0, 0, this.wrapper.width, this.wrapper.height);
                this.drawDots();
            }, this.config.dots.frameDuration);
        }

        generateDotsArray:() => {
            var i = 0;

            for (i; i < this.config.dots.quantity; i++) {
                this.createDot(i, this.dotsArray);
            }

            drawDots();
        }

        setWrapperSize() {
            this.canvas.canvas.width = this.wrapper.offsetWidth;
            this.canvas.canvas.height = this.wrapper.offsetHeight;
        }

        resizingHandler(): void {
            window.addEventListener('resize',() => {
                setWrapperSize();
            });
        }

        init(): void {
            setWrapperSize();
            generateDotsArray();
            resizingHandler();
        };

        init();
    }
}