
# Deps
Vue = require 'vue'

# Register the directive
import inViewport from 'vue-in-viewport-directive'
Vue.directive 'in-viewport', inViewport

# Component that will host the directive
import example from './example.vue'
Vue.component 'example', example

# Init root instance
window.App = new Vue
	el: '#app'

	data:
		firstOffset: -100
		secondOffsetTop: 100

	methods:

		# Reset offsets
		resetOffsets: ->
			@firstOffset = 0
			@secondOffsetTop = 0
