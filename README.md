# Vue In Viewport Directive [![Build Status](https://travis-ci.org/BKWLD/vue-in-viewport-directive.svg?branch=master)](https://travis-ci.org/BKWLD/vue-in-viewport-directive)

Vue 2 directive that sets CSS classes on its host element based on the elements current position in the viewport.  These classes are:

- `in-viewport` - Some part of the element is within the viewport
- `above-viewport` - Some part of the element is above the viewport
- `below-viewport` - Some part of the element is below the viewport


You may want to check out the mixin vesion of this package: [vue-in-viewport-mixin](https://github.com/BKWLD/vue-in-viewport-mixin).

Demo: https://bkwld.github.io/vue-in-viewport-directive


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
	<div class='box' v-in-viewport.once='-100px 0px'></div>
	<div class='box' v-in-viewport.once='{ margin: "-10% 0%" }'></div>
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
inViewportDirective.defaults.margin = '-10% 0%'
Vue.directive('in-viewport', inViewportDirective)
```

*	*Compatibility note*: This package requires IE >= 10 because it uses `classList`.  [Polyfill classList](https://github.com/eligrey/classList.js) if you need to support older browsers.
*	*Compatibility note*: This package a [polyfill for IntersectionObserver](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) in browsers like IE.

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


#### Value

- Set the value to a string in the style of [IntersectionObserver rootMargin](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver#Parameters) to apply an offset to when the in viewport classes get added.
	```html
	<div v-in-viewport='-100px 0px'></div>
	```

- Or, set it via an option:
	```html
	<div v-in-viewport='{ margin: "-100px 0px" }'></div>
	```
	
- Conditionally disable with `disabled`:
	```html
	<div v-in-viewport='{ disabled: true }'></div>
	```


## Tests

1. Start Storybook: `yarn storybook`
2. Open Cypress: `yarn cypress open`

The Travis tests that run on deploy run against [the demo site](https://bkwld.github.io/vue-in-viewport-mixin) which gets updated as part of the `npm version` 