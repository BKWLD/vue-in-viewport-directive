# Deps
scrollMonitor = require 'scrollmonitor'

# A dictionary for storing data per-element
counter = 0
monitors = {}

# Parse the value into offsets
offset = (value) ->
	if isNumeric value
	then return { top: value, bottom: value }
	else { top: value?.top || 0, bottom: value?.bottom || 0 }

# Test if value is a number
isNumeric = (n) -> !isNaN(parseFloat(n)) && isFinite(n)

# Update classes based on current scrollMonitor state
update = (el, monitor) ->

	# Init vars
	add = [] # Classes to add
	remove = [] # Classes to remove

	# Util to DRY up population of add and remove arrays
	toggle = (bool, klass) -> if bool then add.push klass else remove.push klass

	# Determine which classes to add
	toggle monitor.isInViewport, 'in-viewport'
	toggle monitor.isFullyInViewport, 'fully-in-viewport'
	toggle monitor.isAboveViewport, 'above-viewport'
	toggle monitor.isBelowViewport, 'below-viewport'

	# Apply clases to element
	el.classList.add.apply el.classList, add if add.length
	el.classList.remove.apply el.classList, remove if remove.length

# Mixin definition
module.exports =

	# Create scrollMonitor after the element has been added to DOM
	inserted: (el, binding) ->

		# Create and generate a unique id that will be store in a data value on
		# the element
		monitor = scrollMonitor.create el, offset binding.value
		id = 'i' + counter++
		el.dataset.inViewport = id
		monitors[id] = monitor

		# Trigger an initial update and lisen for changes
		update el, monitor
		monitor.on 'stateChange', -> update el, monitor

	# Remove scroll monitor
	unbind: (el) ->
		id = el.dataset.inViewport
		monitor = monitors[id]
		monitor.destroy()
		delete monitors[id]		

	###
	# Public interface
	props:

		# Add listeners and check if in viewport immediately
		inViewportActive:
			type: Boolean
			default: true

		# Only update once by default. The assumption is that it will be used for
		# one-time buildins
		inViewportOnce:
			type: Boolean
			default: false

		# Shared offsets
		inViewportOffset:
			type: Number
			default: 0
		inViewportOffsetTop:
			type: Number
			default: null
		inViewportOffsetBottom:
			type: Number
			default: null

	# Bindings that are used by the host component
	data: -> inViewport:

		# Public props
		now: null   # Is in viewport
		fully: null # Is fully in viewport
		above: null # Is partially or fully above the viewport
		below: null # Is partially or fully below the viewport

		# Internal props
		listening: false

	# Use general offset if none are defined
	computed:
		inViewportOffsetTopComputed: -> @inViewportOffsetTop ? @inViewportOffset
		inViewportOffsetBottomComputed: -> @inViewportOffsetBottom ? @inViewportOffset
		inViewportOffsetComputed: ->
			top: @inViewportOffsetTopComputed
			bottom: @inViewportOffsetBottomComputed

	# Lifecycle hooks
	bind: (el, binding) -> @inViewportInit()
	unbind: (el, binding) -> @inViewportDestroy()

	# Watch props and data
	watch:

		# Add or remove event handlers handlers
		inViewportActive: (active) ->
			if active
			then @addInViewportHandlers()
			else @removeInViewportHandlers()

		# If the offsets change, need rebuild scrollMonitor instance because it
		# doesn't offer a way an API to update these values
		inViewportOffsetComputed:
			deep: true
			handler: ->
				@inViewportDestroy()
				@inViewportInit()

	# Public API
	methods:

		# Instantiate
		inViewportInit: ->
			@scrollMonitor = scrollMonitor.create @$el, @inViewportOffsetComputed
			@addInViewportHandlers() if @inViewportActive

		# Tear down
		inViewportDestroy: ->
			@scrollMonitor.destroy()
			@inViewport.listening = false

		# Add listeners
		addInViewportHandlers: ->

			# Don't add twice
			return if @inViewport.listening
			@inViewport.listening = true

			# Add appropriate listeners bacsed on `once` prop
			method = if @inViewportOnce then 'one' else 'on'
			@scrollMonitor[method] 'stateChange', @updateInViewport

			# Trigger an immediate update
			@updateInViewport()

		# Remove listeners
		removeInViewportHandlers: ->

			# Don't remove twice
			return unless @inViewport.listening
			@inViewport.listening = false

			# Remove listeners
			@scrollMonitor.off 'stateChange', @updateInViewport

		# Handle state changes from scrollMonitor
		updateInViewport: ->
			@inViewport.now   = @scrollMonitor.isInViewport
			@inViewport.fully = @scrollMonitor.isFullyInViewport
			@inViewport.above = @scrollMonitor.isAboveViewport
			@inViewport.below = @scrollMonitor.isBelowViewport

	###
