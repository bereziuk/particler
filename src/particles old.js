/**
 * Created by Adam on 01.01.2015.sadad
 */

Particles = function (settings) {
    'use strict';

    //window.onresize = function () {
    //    init();
    //};

    var config = {
            wrapperId: settings.id,
            dots: {
                length: settings.dotsLength || 20,
                lineWidth: settings.lineWidth || 0.02,
                fillColor: settings.fillColor || '#000000',
                minSize: 0.5,
                maxSize: 1.5,
                minLineLength: 250,
                speed: 25,
                framesPerSecond: 60,
                frameDuration: function () {
                    return 1000 / this.framesPerSecond
                }
            }
        },
        dotsArray = [],
        wrapper = document.getElementById(config.wrapperId),
        dot = wrapper.getContext("2d"),
        initDot = function (i, arr) {
            var size,
                vx,
                vy,
                posX,
                posY,
                angle = parseInt(Math.random() * 360, 10),
                rads = angle * Math.PI / 180;

            // set size and position
            size = Math.floor(Math.random() * (config.dots.maxSize - config.dots.minSize + 1 ) + config.dots.minSize);
            posX = parseInt(Math.random() * wrapper.offsetWidth, 10);
            posY = parseInt(Math.random() * wrapper.offsetHeight, 10);

            //vx = Math.cos(rads) * config.dots.speed / config.dots.framesPerSecond;
            vx = Math.cos(rads) * parseFloat(config.dots.speed / config.dots.frameDuration());
            vy = Math.sin(rads) * parseFloat(config.dots.speed / config.dots.frameDuration());

            //set dots coordinates
            arr[i] = {
                size: size,
                posX: posX,
                posY: posY,
                vx: vx,
                vy: vy
            };
        },
        drawDots = function () {
            var i,
                j = config.dots.length,
                k,
                el,
                getDistance = function (x1, y1, x2, y2) {
                    return parseInt(Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1-y2), 2)), 10);
                };


            for (i = 0; i < j; i++) {
                // define dots positions
                el = dotsArray[i];
                el.posX += el.vx;
                if (el.posX < 0 || el.posX > wrapper.offsetWidth) {
                    el.vx = 0 - el.vx;
                }

                el.posY += el.vy;
                if (el.posY < 0 || el.posY > wrapper.offsetHeight) {
                    el.vy = 0 - el.vy;
                }

                // draw dots
                dot.beginPath();
                dot.fillStyle = config.dots.fillColor;
                dot.arc(el.posX, el.posY, el.size, 0, 2 * Math.PI);

                // draw lines between dots
                for (k = 0; k < j; k++) {
                    if (k !== i) {

                        dot.lineWidth = config.dots.lineWidth;
                        dot.strokeStyle = config.dots.fillColor;
                        dot.moveTo(el.posX, el.posY);

                        if (getDistance(el.posX, el.posY, dotsArray[k].posX, dotsArray[k].posY) < config.dots.minLineLength) {
                            dot.lineTo(dotsArray[k].posX, dotsArray[k].posY);
                            dot.stroke();
                        }
                    }
                }
                dot.fill();
            }

            if (config.dots.fillAlpha) {
                dot.fillStyle = config.dots.fillColor;
            } else {
                dot.fillStyle = config.dots.fillColor;
            }

            setTimeout(function () {
                dot.clearRect(0, 0, wrapper.width, wrapper.height);
                drawDots();
            }, config.dots.frameDuration());
        },
        generateDotsArray = function () {
            var i = 0;
            for (i; i < config.dots.length; i++) {
                initDot(i, dotsArray);
            }
            drawDots();
        },
        setWrapperSize = function (isResized) {
            dot.canvas.width = wrapper.offsetWidth;
            dot.canvas.height = wrapper.offsetHeight;
            if (isResized) {
                // TODO - redraw canvas
            }
        },
        init = function () {
            setWrapperSize();
            generateDotsArray();
        };

    //window.onresize = function () {
    //    setWrapperSize(true);
    //};

    init();

};

var firstExample = new Particles({
        id: 'particles_1',
        lineWidth: 0.25,
        fillColor: '#46ecd4',
        dotsLength: 25
    }),
    secondExample = new Particles({
        id: 'particles_2',
        fillColor: '#fff',
        lineWidth: 0.5,
        dotsLength: 25
    });