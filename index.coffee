# Deps
scrollMonitor = require 'scrollmonitor'

# A dictionary for storing data per-element
counter = 0
monitors = {}

# Create scrollMonitor after the element has been added to DOM
addListeners = (el, binding) ->

	# Create and generate a unique id that will be store in a data value on
	# the element
	monitor = scrollMonitor.create el, offset binding.value
	id = 'i' + counter++
	el.setAttribute 'data-in-viewport', id
	monitors[id] = monitor

	# Start listenting for changes
	monitor.on 'stateChange', -> update el, monitor, binding.modifiers

	# Update intiial state, which also handles `once` prop
	update el, monitor, binding.modifiers

# Parse the binding value into scrollMonitor offsets
offset = (value) ->
	if isNumeric value
	then return { top: value, bottom: value }
	else
		top: value?.top || module.exports.defaults.top
		bottom: value?.bottom || module.exports.defaults.bottom

# Test if var is a number
isNumeric = (n) -> !isNaN(parseFloat(n)) && isFinite(n)

# Update element classes based on current scrollMonitor state
update = (el, monitor, modifiers) ->

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

	# Apply classes to element
	el.classList.add.apply el.classList, add if add.length
	el.classList.remove.apply el.classList, remove if remove.length

	# If set to update "once", remove listeners if in viewport
	removeListeners el if modifiers.once and monitor.isInViewport

# Compare two objects.  Doing JSON.stringify to conpare as a quick way to
# deep compare objects
objIsSame = (obj1, obj2) -> JSON.stringify(obj1) == JSON.stringify(obj2)

# Remove scrollMonitor listeners
removeListeners = (el) ->
	id = el.getAttribute 'data-in-viewport'
	if monitor = monitors[id]
		monitor.destroy()
		delete monitors[id]

# Mixin definition
module.exports =

	# Define overrideable defaults
	defaults:
		top: 0
		bottom: 0

	# Init
	inserted: (el, binding) -> addListeners el, binding

	# If the value changed, re-init scrollbar since scrollMonitor doesn't provide
	# an API to update the offsets.
	componentUpdated: (el, binding) ->
		return if objIsSame binding.value, binding.oldValue
		removeListeners el
		addListeners el, binding

	# Cleanup
	unbind: (el) -> removeListeners el
