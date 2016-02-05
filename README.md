# Particler

Lightweight JavaScript canvas animation library for particles animation.

* Inspired by [https://github.com/VincentGarreau/particles.js](https://github.com/VincentGarreau/particles.js)
* Written in TypeScript
* Also available as [React component](https://github.com/bereziuk/react-particler)
* See [examples](http://bereziuk.com/particler.html)
 
 
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

prop        | type   | notes
----------- |------- | ----------
backgroundColor | string | Canvas background color
fillColor   | string | Dots and lines color
frameDuration | number | Amount of frames rendered per second
framesPerSecond | number | Amount of frames rendered per second
lineWidth   | number | Width of lines
minimalLineLength | number | Minimal distance between dots occures connecting line drawing
minSize     | number | Minimal dot size
maxSize     | number | Maximal dot size
quantity    | number | Amount of dots
speed       | number | Dots speed