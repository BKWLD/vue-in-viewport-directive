(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("scrollmonitor"));
	else if(typeof define === 'function' && define.amd)
		define(["scrollmonitor"], factory);
	else if(typeof exports === 'object')
		exports["vue-in-viewport-directive"] = factory(require("scrollmonitor"));
	else
		root["vue-in-viewport-directive"] = factory(root["scrollmonitor"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var addListeners, counter, isNumeric, monitors, objIsSame, offset, removeListeners, scrollMonitor, update;

	scrollMonitor = __webpack_require__(1);

	counter = 0;

	monitors = {};

	addListeners = function(el, binding) {
	  var id, monitor;
	  monitor = scrollMonitor.create(el, offset(binding.value));
	  id = 'i' + counter++;
	  el.dataset.inViewport = id;
	  monitors[id] = monitor;
	  monitor.on('stateChange', function() {
	    return update(el, monitor, binding.modifiers);
	  });
	  return update(el, monitor, binding.modifiers);
	};

	offset = function(value) {
	  if (isNumeric(value)) {
	    return {
	      top: value,
	      bottom: value
	    };
	  } else {
	    return {
	      top: (value != null ? value.top : void 0) || module.exports.defaults.top,
	      bottom: (value != null ? value.bottom : void 0) || module.exports.defaults.bottom
	    };
	  }
	};

	isNumeric = function(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	};

	update = function(el, monitor, modifiers) {
	  var add, remove, toggle;
	  add = [];
	  remove = [];
	  toggle = function(bool, klass) {
	    if (bool) {
	      return add.push(klass);
	    } else {
	      return remove.push(klass);
	    }
	  };
	  toggle(monitor.isInViewport, 'in-viewport');
	  toggle(monitor.isFullyInViewport, 'fully-in-viewport');
	  toggle(monitor.isAboveViewport, 'above-viewport');
	  toggle(monitor.isBelowViewport, 'below-viewport');
	  if (add.length) {
	    el.classList.add.apply(el.classList, add);
	  }
	  if (remove.length) {
	    el.classList.remove.apply(el.classList, remove);
	  }
	  if (modifiers.once && monitor.isInViewport) {
	    return removeListeners(el);
	  }
	};

	objIsSame = function(obj1, obj2) {
	  return JSON.stringify(obj1) === JSON.stringify(obj2);
	};

	removeListeners = function(el) {
	  var id, monitor;
	  id = el.dataset.inViewport;
	  monitor = monitors[id];
	  monitor.destroy();
	  return delete monitors[id];
	};

	module.exports = {
	  defaults: {
	    top: 0,
	    bottom: 0
	  },
	  inserted: function(el, binding) {
	    return addListeners(el, binding);
	  },
	  componentUpdated: function(el, binding) {
	    if (objIsSame(binding.value, binding.oldValue)) {
	      return;
	    }
	    removeListeners(el);
	    return addListeners(el, binding);
	  },
	  unbind: function(el) {
	    return removeListeners(el);
	  }
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;