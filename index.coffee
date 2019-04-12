# A dictionary for storing data per-element
counter = 0
instances = {}

# Support toggling of global disabled state
disabled = false
export disable = -> disabled = true
export enable = -> 
	disabled = false
	update instance for id, instance of instances

# Create instance after the element has been added to DOM
startObserving = (el, binding) ->
	
	# If an indvidual instance is disabled, just add the in viewport classes
	# to reveal the element
	if binding?.value?.disabled || directive.defaults.disabled || disabled
		el.classList.add.apply el.classList, [ 'in-viewport' ]
		return

	# Create the instance object 
	instance = 
		el: el
		observer: makeObserver el, binding
	
	# Generate a unique id that will be store in a data value on the element
	id = 'i' + counter++
	el.setAttribute 'data-in-viewport', id
	instances[id] = instance

# Make the instance
makeObserver = (el, { value = {}, modifiers }) ->
	
	# Make make default root
	root = value.root || directive.defaults.root
	root = switch typeof root
		when 'function' then root()
		when 'string' then document.querySelector root
		when 'object' then root # Expects to be a DOMElement
	
	# Maek default margin
	margin = if typeof value == 'string' then value
	else value.margin || directive.defaults.margin
	
	# Make the observer callback
	callback = ([entry]) -> update { el, entry, modifiers }
		
	# Make the observer instance
	console.log margin
	observer = new IntersectionObserver callback,
		root: root
		rootMargin: margin
		threshold: [0,1]
		
	# Start observing the element and return the observer
	observer.observe el
	return observer

# Update element classes based on current intersection state
update = ({ el, entry, modifiers }) ->
	
	# Destructure the entry to just what's needed
	{ boundingClientRect: target, rootBounds: root } = entry
	console.log target, root

	# Init vars
	add = [] # Classes to add
	remove = [] # Classes to remove

	# Util to DRY up population of add and remove arrays
	toggle = (bool, klass) -> if bool then add.push klass else remove.push klass

	# Determine viewport status, see vue-in-viewport-mixin for more info:
	# https://github.com/BKWLD/vue-in-viewport-mixin/blob/master/index.coffee
	inViewport = target.top <= root.bottom and target.bottom > root.top
	above = target.top < root.top
	below = target.bottom > root.bottom + 1

	# Determine which classes to add
	toggle inViewport, 'in-viewport'
	toggle above, 'above-viewport'
	toggle below, 'below-viewport'

	# Apply classes to element
	el.classList.add.apply el.classList, add if add.length
	el.classList.remove.apply el.classList, remove if remove.length

	# If set to update "once", remove listeners if in viewport
	removeObserver el if modifiers.once and inViewport

# Compare two objects.  Doing JSON.stringify to conpare as a quick way to
# deep compare objects
objIsSame = (obj1, obj2) -> JSON.stringify(obj1) == JSON.stringify(obj2)

# Remove scrollMonitor listeners
removeObserver = (el) ->
	id = el.getAttribute 'data-in-viewport'
	if instance = instances[id]
		instance.observer?.disconnect()
		delete instances[id]

# Mixin definition
export default directive =

	# Define overrideable defaults
	defaults:
		root: undefined
		margin: '0px 0px -1px 0px'
		disabled: false

	# Init
	inserted: (el, binding) -> startObserving el, binding

	# If the value changed, re-init observer
	componentUpdated: (el, binding) ->
		return if objIsSame binding.value, binding.oldValue
		removeObserver el
		startObserving el, binding

	# Cleanup
	unbind: (el) -> removeObserver el
