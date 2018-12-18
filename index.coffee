# Deps
import scrollMonitor from 'scrollmonitor'

# A dictionary for storing data per-element
counter = 0
monitors = {}

# Support toggling of global disabled state
disabled = false
export disable = -> disabled = true
export enable = -> 
	disabled = false
	update monitor for id, monitor of monitors

# Create scrollMonitor after the element has been added to DOM
addListeners = (el, binding) ->
	
	# If an indvidual instance is disabled, just add the in viewport classes so
	# to reveal the element
	if binding?.value?.disabled
		el.classList.add.apply el.classList, [ 'in-viewport', 'fully-in-viewport' ]
		return

	# Create and generate a unique id that will be store in a data value on
	# the element
	monitor = 
		el: el
		modifiers: binding.modifiers
		watcher: scrollMonitor.create el, offset binding.value
	id = 'i' + counter++
	el.setAttribute 'data-in-viewport', id
	monitors[id] = monitor

	# Start listenting for changes
	monitor.watcher.on 'stateChange', -> update monitor

	# Update intiial state, which also handles `once` prop
	update monitor unless disabled

# Parse the binding value into scrollMonitor offsets
offset = (value) ->
	if isNumeric value
	then return { top: value, bottom: value }
	else
		top: value?.top || directive.defaults.top
		bottom: value?.bottom || directive.defaults.bottom

# Test if var is a number
isNumeric = (n) -> !isNaN(parseFloat(n)) && isFinite(n)

# Update element classes based on current scrollMonitor state
update = ({ el, watcher, modifiers }) ->
	return if disabled

	# Init vars
	add = [] # Classes to add
	remove = [] # Classes to remove

	# Util to DRY up population of add and remove arrays
	toggle = (bool, klass) -> if bool then add.push klass else remove.push klass

	# Determine which classes to add
	toggle watcher.isInViewport, 'in-viewport'
	toggle watcher.isFullyInViewport, 'fully-in-viewport'
	toggle watcher.isAboveViewport, 'above-viewport'
	toggle watcher.isBelowViewport, 'below-viewport'

	# Apply classes to element
	el.classList.add.apply el.classList, add if add.length
	el.classList.remove.apply el.classList, remove if remove.length

	# If set to update "once", remove listeners if in viewport
	if (modifiers.once and not modifiers.fully and watcher.isInViewport) or
	(modifiers.once and modifiers.fully and watcher.isFullyInViewport)
		removeListeners el

# Compare two objects.  Doing JSON.stringify to conpare as a quick way to
# deep compare objects
objIsSame = (obj1, obj2) -> JSON.stringify(obj1) == JSON.stringify(obj2)

# Remove scrollMonitor listeners
removeListeners = (el) ->
	id = el.getAttribute 'data-in-viewport'
	if monitor = monitors[id]
		monitor.watcher?.destroy()
		delete monitors[id]

# Mixin definition
export default directive =

	# Define overrideable defaults
	defaults:
		top: 0
		bottom: 0
		disabled: false

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
