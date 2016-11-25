# Vue In Viewport Directive [![Build Status](https://travis-ci.org/BKWLD/vue-in-viewport-mixin.svg?branch=2.x)](https://travis-ci.org/BKWLD/vue-in-viewport-mixin)

Vue 2 directive that sets CSS classes on its host element based on the elements current position in the viewport.  These classes are:

- `in-viewport` - Some part of the element is within the viewport
- `fully-viewport` - The element is fully in viewport or is taller than the viewport and currently fills it
- `above-viewport` - Some part of the element is above the viewport
- `below-viewport` - Some part of the element is below the viewport

This package wraps [scrollMonitor](https://github.com/stutrek/scrollMonitor) to make registering event listeners light and to do the in viewport calculations.


## Usage

* Register the directive:
	```js
	import Vue from 'vue'
	import inViewportDirective from 'vue-in-viewport-directive'
	Vue.directive('in-viewport', inViewportDirective)
	```

* Use the classes to trigger CSS transitions (for instance):
	```html
	<div class='box' v-directive></div>
	<div class='box' v-directive.once='100'></div>
	<div class='box' v-directive.once='{ bottom: -100 }'></div>
	```
	```css
	.box {
		opacity: 0;
		transition: opacity .3s;
	}
	.box.in-viewport {
		opacity: 1;
	}
	```

*	*Compatibility note*: This package requires IE >= 10 because it uses `classList`.  [Polyfill classList](https://github.com/eligrey/classList.js) if you need to spport older browsers.


## Arguments

#### Modifiers

- `once` - Whether to remove listeners once the component enters viewport.  If the component is in viewport when mounted, listeners are never added.

#### Value

- Set the value to a positive or negative integer to set offset values for the top and bottom of the element.  Offsets are used to artificially expand how the top or bottom of an element is detected.  A positive `top` number will make the element trigger being in the viewport early, before it's actually scrolls into position.  In other words.  A negative value will do the opposite. For example:
	```html
	<div v-in-viewport='100'></div>
	```

- Or, set the value to an object to set the top and the bottom to different values. For example:
	```html
	<div v-in-viewport='{ top: 100, bottom: 50 }'></div>
	```


## Contributing

- Run the examples server with `PORT=3000 node ./server` and go to an example to see the source for the E2E tests.  Like http://localhost:3000/basic/.
- Run `yarn test` to run E2E tests.
