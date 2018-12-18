# Vue In Viewport Directive [![Build Status](https://travis-ci.org/BKWLD/vue-in-viewport-directive.svg?branch=master)](https://travis-ci.org/BKWLD/vue-in-viewport-directive)

Vue 2 directive that sets CSS classes on its host element based on the elements current position in the viewport.  These classes are:

- `in-viewport` - Some part of the element is within the viewport
- `fully-in-viewport` - The element is fully in viewport or is taller than the viewport and currently fills it
- `above-viewport` - Some part of the element is above the viewport
- `below-viewport` - Some part of the element is below the viewport


You may want to check out the mixin vesion of this package: [vue-in-viewport-mixin](https://github.com/BKWLD/vue-in-viewport-mixin).

This package wraps [scrollMonitor](https://github.com/stutrek/scrollMonitor) to make registering event listeners light and to do the in viewport calculations.


## Usage

Note, this should not be applied to elements / components that are setting a dynamic class through Vue.  See [this issue](https://github.com/BKWLD/vue-in-viewport-directive/issues/4).

* Register the directive:
	```js
	import Vue from 'vue'
	import inViewportDirective from 'vue-in-viewport-directive'
	Vue.directive('in-viewport', inViewportDirective)
	```

* Use the classes to trigger CSS transitions (for instance):
	```html
	<div class='box' v-in-viewport></div>
	<div class='box' v-in-viewport.once='100'></div>
	<div class='box' v-in-viewport.once='{ bottom: -100 }'></div>
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

* Set default offsets:
```js
import inViewportDirective from 'vue-in-viewport-directive'
inViewportDirective.defaults.top = -200
Vue.directive('in-viewport', inViewportDirective)
```

*	*Compatibility note*: This package requires IE >= 10 because it uses `classList`.  [Polyfill classList](https://github.com/eligrey/classList.js) if you need to support older browsers.

#### Global methods

You can disable all updates and re-enable them globally:

```js
import { enable, disable } from 'vue-in-viewport-directive'
disable()
setTimeout(enable, 500)
```

This can be used during full page transitions to trigger all the in viewport transitions
only once the page transition finishes.

## Arguments

#### Modifiers

- `once` - Whether to remove listeners once the element enters viewport.  If the element is in viewport when mounted, listeners are never added.

- `fully` - Used in conjunction with `once`, removes the listeners once the element is *fully* in the viewport.

#### Value

- Set the value to a positive or negative integer to set offset values for the top and bottom of the element.  Offsets are used to artificially expand how the top or bottom of an element is detected.  A positive `top` number will make the element trigger being in the viewport early, before it's actually scrolls into position.  In other words.  A negative value will do the opposite. For example:
	```html
	<div v-in-viewport='100'></div>
	```

- Or, set the value to an object to set the top and the bottom to different values. For example:
	```html
	<div v-in-viewport='{ top: 100, bottom: 50 }'></div>
	```
	
- Conditionally disable with `disabled`:
	```html
		<div v-in-viewport='{ disabled: true }'></div>
	```


## Contributing

- Run the examples server with `PORT=3000 node ./server` and go to an example to see the source for the E2E tests.  Like http://localhost:3000/basic/.
- Run `yarn test` to run E2E tests.
