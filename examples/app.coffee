
# Deps
Vue = require 'vue'

# Register the directive
Vue.directive 'in-viewport', require 'vue-in-viewport-directive'

# Component that will host the directive
Vue.component 'example', require './example.vue'

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
