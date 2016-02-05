# Particler

Lightweight JavaScript canvas animation library for particles animation.

* Inspired by [https://github.com/VincentGarreau/particles.js](https://github.com/VincentGarreau/particles.js)
* Written in TypeScript
* Also available as [React component](https://github.com/bereziuk/react-particler)
* See [examples](http://bereziuk.com/particler.html)
 
 
## Usage

### Npm package

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
    var particlerExample = new Particler("first", particlerOptions);
</script>
```

### Configuration

prop        | type   | notes
----------- |------- | ----------
pin         | string | the id of the Pin to `repin`
media       | string | the image url of the Pin to create
url         | string | the link back of the Pin to create
description | string | the description of the Pin to create


 