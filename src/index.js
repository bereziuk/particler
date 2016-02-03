var ParticlerDefaultConfig = (function () {
    function ParticlerDefaultConfig() {
        this.quantity = 20;
        this.lineWidth = 0.05;
        this.fillColor = "#000000";
        this.minSize = 1;
        this.maxSize = 3;
        this.minimalLineLength = 250;
        this.speed = 25;
        this.framesPerSecond = 60;
        this.frameDuration = 20;
    }
    return ParticlerDefaultConfig;
})();
var Particler = (function () {
    function Particler(wrapperId, customConfig) {
        this.wrapperId = wrapperId;
        this.config = new ParticlerDefaultConfig();
        this.dotsArray = [];
        this.wrapper = document.getElementById(wrapperId);
        this.canvas = this.wrapper.getContext("2d");
        this.setConfig(customConfig);
        this.setWrapperSize();
        this.generateDotsArray();
        this.resizingHandler();
    }
    Particler.prototype.setConfig = function (customConfig) {
        var _this = this;
        if (customConfig !== undefined) {
            (function () {
                var item;
                for (item in _this.config) {
                    if (customConfig.hasOwnProperty(item) && _this.config[item] !== undefined) {
                        _this.config[item] = customConfig[item];
                    }
                }
            })();
        }
    };
    ;
    Particler.prototype.createDot = function (i, arr) {
        var size;
        var vx;
        var vy;
        var posX;
        var posY;
        var angle = Math.random() * 360;
        var rads = angle * Math.PI / 180;
        // setting size and position
        size = Math.floor(Math.random() * (this.config.maxSize - this.config.minSize + 1) + this.config.minSize);
        posX = Math.random() * this.wrapper.offsetWidth;
        posY = Math.random() * this.wrapper.offsetHeight;
        vx = Math.cos(rads) * (this.config.speed / this.config.frameDuration);
        vy = Math.sin(rads) * (this.config.speed / this.config.frameDuration);
        // setting dot coordinates
        arr[i] = {
            size: size,
            posX: posX,
            posY: posY,
            vx: vx,
            vy: vy
        };
    };
    Particler.prototype.drawDots = function () {
        var _this = this;
        var i, j = this.config.quantity, k, el, getDistance = function (x1, y1, x2, y2) {
            return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
        };
        for (i = 0; i < j; i++) {
            // define dots positions
            el = this.dotsArray[i];
            el.posX += el.vx;
            if (el.posX < 0 || el.posX > this.wrapper.offsetWidth) {
                if (el.posX < 0) {
                    el.posX = 0;
                }
                else {
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
        setTimeout(function () {
            _this.canvas.clearRect(0, 0, _this.wrapper.width, _this.wrapper.height);
            _this.drawDots();
        }, this.config.frameDuration);
    };
    Particler.prototype.generateDotsArray = function () {
        var i = 0;
        for (i; i < this.config.quantity; i++) {
            this.createDot(i, this.dotsArray);
        }
        this.drawDots();
    };
    Particler.prototype.setWrapperSize = function () {
        this.canvas.canvas.width = this.wrapper.offsetWidth;
        this.canvas.canvas.height = this.wrapper.offsetHeight;
    };
    Particler.prototype.resizingHandler = function () {
        var _this = this;
        window.addEventListener('resize', function () {
            _this.setWrapperSize();
        });
    };
    return Particler;
})();
