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
        var self = this;

        self.wrapperId = id;
        self.wrapper = document.getElementById(self.wrapperId);
        self.canvas = self.wrapper.getContext("2d");

        if (settings !== undefined) {
            (() => {
                var item: any;

                for (item in settings) {
                    if (settings.hasOwnProperty(item) && self.config.dots[item] !== undefined) {
                        self.config.dots[item] = settings[item];
                    }
                }
            })();
        }

        self.createDot = (i: any, arr: any) => {
            var size,
                vx,
                vy,
                posX,
                posY,
                angle = Math.random() * 360,
                rads = angle * Math.PI / 180;

            // setting size and position
            size = Math.floor(Math.random() * (self.config.dots.maxSize - self.config.dots.minSize + 1) + self.config.dots.minSize);
            posX = Math.random() * self.wrapper.offsetWidth;
            posY = Math.random() * self.wrapper.offsetHeight;

            vx = Math.cos(rads) * (self.config.dots.speed / self.config.dots.frameDuration);
            vy = Math.sin(rads) * (self.config.dots.speed / self.config.dots.frameDuration);

            // setting dot coordinates
            arr[i] = {
                size: size,
                posX: posX,
                posY: posY,
                vx: vx,
                vy: vy
            };
        };

        self.drawDots = () => {
            var i,
                j = self.config.dots.quantity,
                k,
                el,
                getDistance = (x1: number, y1: number, x2: number, y2: number) => {
                    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
                };

            for (i = 0; i < j; i++) {
                // define dots positions
                el = self.dotsArray[i];
                el.posX += el.vx;

                if (el.posX < 0 || el.posX > self.wrapper.offsetWidth) {
                    if (el.posX < 0) {
                        el.posX = 0;
                    } else {
                        el.posX = self.wrapper.offsetWidth;
                    }

                    el.vx = -el.vx;
                }

                el.posY += el.vy;
                if (el.posY < 0 || el.posY > self.wrapper.offsetHeight) {
                    el.vy = -el.vy;
                }

                // draw dots
                self.canvas.beginPath();
                self.canvas.fillStyle = self.config.dots.fillColor;
                self.canvas.arc(el.posX, el.posY, el.size, 0, 2 * Math.PI);

                // draw lines between dots
                for (k = 0; k < j; k++) {
                    if (k !== i) {

                        self.canvas.lineWidth = self.config.dots.lineWidth;
                        self.canvas.strokeStyle = self.config.dots.fillColor;
                        self.canvas.moveTo(el.posX, el.posY);

                        if (getDistance(el.posX, el.posY, self.dotsArray[k].posX, self.dotsArray[k].posY) < self.config.dots.minimalLineLength) {
                            self.canvas.lineTo(self.dotsArray[k].posX, self.dotsArray[k].posY);
                            self.canvas.stroke();
                        }
                    }
                }
                self.canvas.fill();
            }

            self.canvas.fillStyle = self.config.dots.fillColor;

            setTimeout(() => {
                self.canvas.clearRect(0, 0, self.wrapper.width, self.wrapper.height);
                self.drawDots();
            }, self.config.dots.frameDuration);
        };

        generateDotsArray:() => {
            var i = 0;

            for (i; i < self.config.dots.quantity; i++) {
                self.createDot(i, self.dotsArray);
            }

            drawDots();
        }

        private setWrapperSize() => {
            self.canvas.canvas.width = self.wrapper.offsetWidth;
            self.canvas.canvas.height = self.wrapper.offsetHeight;
        }

        resizingHandler: void () => {
            window.addEventListener('resize',() => {
                setWrapperSize();
            });
        }

        private init: void () => {
            setWrapperSize();
            generateDotsArray();
            resizingHandler();
        };

        init();
    }
}