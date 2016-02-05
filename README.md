# Particler

Lightweight JavaScript canvas animation library for particles animation.

* Inspired by [https://github.com/VincentGarreau/particles.js](https://github.com/VincentGarreau/particles.js)
* Written in TypeScript
* Also available as [React component](https://github.com/bereziuk/react-particler)
* See [examples on website](http://bereziuk.com/particler.html) or in `examples/index.html`

## Installation

```
npm install particler --save
```

```html
<!-- create canvas tag -->
<canvas id="particler-instance"></canvas>

<!-- include particler.js library -->
<script src="node_modules/particler/dist/particler.js"></script>

<script type="text/javascript">
    // define your configuration (optional)
    var particlerOptions = {
        quantity: 50,
        fillColor: "#000"
    };

    // create particler instance
    var particlerExample = new Particler("particler-instance", particlerOptions);
</script>
```

## Configuration

properties        | type   | default value | notes
----------------- |------- | ------------- | --------
backgroundColor   | string | "transparent" | Canvas background color
fillColor         | string | "#000000"     | Dots and lines color
frameDuration     | number | 20            | Frame update time
lineWidth         | number | 0.05          | Lines width
minimalLineLength | number | 250           | The minimum height to draw lines beetwen dots
minSize           | number | 1             | Minimal dot size
maxSize           | number | 3             | Maximal dot size
quantity          | number | 20            | Amount of dots in animation
speed             | number | 25            | Distance of dot movement during frames