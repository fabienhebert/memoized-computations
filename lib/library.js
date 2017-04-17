(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["library"] = factory();
	else
		root["library"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	exports.shallowEqual = shallowEqual;
	exports.shallowComparator = shallowComparator;
	exports.createSelector = createSelector;
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	// Memoization
	var mainMemoization = {};
	
	// Utils
	var defaultSource = {
	    compareMethod: null
	};
	
	// Compare methods
	function shallowEqual(a, b) {
	    if (!Array.isArray(a) || a !== Object(a) || !Array.isArray(b) || b !== Object(b)) {
	        return a === b;
	    }
	
	    var aKeys = Object.keys(a);
	    var bKeys = Object.keys(b);
	    if (bKeys.length !== aKeys.length) {
	        return false;
	    }
	    for (var i = 0, l = bKeys.length; i < l; i++) {
	        if (a[bKeys[i]] !== b[bKeys[i]]) {
	            return false;
	        }
	    }
	    return true;
	}
	
	// Handler
	function shallowComparator(sourceFunc) {
	    return {
	        input: sourceFunc,
	        compareMethod: shallowEqual
	    };
	}
	
	function createSource(refSource) {
	    if (typeof refSource === "function") {
	        return _extends({}, defaultSource, {
	            input: refSource
	        });
	    }
	    return _extends({}, defaultSource, refSource);
	}
	
	function createSelector(sources, outputFunc) {
	
	    if (!Array.isArray(sources)) {
	        throw new Error("Expected sources to be an array.");
	    }
	
	    if (typeof outputFunc !== "function") {
	        throw new Error("Expected the outputFunc to be a function.");
	    }
	
	    var finalSources = sources.map(function (source) {
	        return createSource(source);
	    });
	
	    var memoization = null;
	
	    return function (state, parameters, memoizationKey) {
	
	        var finalMemoization = memoizationKey ? mainMemoization[memoizationKey] : memoization;
	
	        var useMemoizedValue = finalMemoization ? true : false;
	
	        // Sources values
	        var sourcesValues = finalSources.map(function (source, index) {
	            // Calc value
	            var sourceValue = source.input(state, parameters, memoizationKey);
	
	            // If necessary, check if the source value is different from memoized one
	            if (useMemoizedValue) {
	                if (source.compareMethod) {
	                    useMemoizedValue = source.compareMethod(finalMemoization.sourcesValues[index], sourceValue);
	                } else {
	                    useMemoizedValue = finalMemoization.sourcesValues[index] === sourceValue;
	                }
	            }
	
	            return sourceValue;
	        });
	
	        if (useMemoizedValue) {
	            return finalMemoization.result;
	        } else {
	            var result = outputFunc.apply(undefined, _toConsumableArray(sourcesValues));
	            var memoizedData = {
	                sourcesValues: sourcesValues,
	                result: result
	            };
	            if (memoizationKey) {
	                mainMemoization[memoizationKey] = memoizedData;
	            } else {
	                memoization = memoizedData;
	            }
	            return result;
	        }
	    };
	}

/***/ })
/******/ ])
});
;
//# sourceMappingURL=library.js.map