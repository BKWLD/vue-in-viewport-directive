# Deps
scrollMonitor = require 'scrollmonitor'

# Mixin definition
module.exports =

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
	mounted: -> @inViewportInit()
	destroyed: -> @inViewportDestroy()

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
