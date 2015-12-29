/*\
title: $:/plugins/tobibeer/count/filter.js
type: application/javascript
module-type: filteroperator

a filter to count input titles or check a the count to be of a given value

@preserve
\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

/*
Export our filter function
*/
exports.count = function(source,operator,options) {
	try {
	var $,c,comp,ok,
		// Valid comparisons
		comps = ["eq","neq","lt","lte","gt","gte","is"],
		// Init results
		results = [],
		// Get value from operand
		val = operator.operand,
		// Get as number
		num = parseInt(val),
		// See if it actually is a number
		isNum = !isNaN(num),
		// Negating?
		neg = operator.prefix === "!";
	// Iterate
	$tw.utils.each(
		// Suffixes split by blanks
		(operator.suffix || "").toLowerCase().split(" "),
		// Check suffix
		function(s) {
			// Ignore blanks
			s = s.trim();
			// Only if non-empty
			if(s) {
				// If it's a $
				if(s === "$") {
					// Return input titles if comparison is true
					$ = 1;
				// Any other...
				} else {
					// Take as mode
					comp = s;
				}
			}
		}
	);
	// Not a valid comp?
	if(comp && comps.indexOf(comp) < 0) {
		// Throw error
		throw "invalid comparison `" + comp + "`, try any of: " + comps;
	// Single equals or no comp defined but a number in the operand
	} else if(!comp && isNum) {
		// Compare count for equality against operand
		comp = "eq";
	// Or we got a comparator but no operand
	} else if(comp && !val) {
		// Set num to 0
		num = 0;
		// And isNum to true
		isNum = 1;
	}
	// Got an operand but it ain't a number
	if(val && !isNum) {
		// Error
		throw "operand `" + val + "` is not a number";
	}
	// Iterate source titles
	source(function(tiddler,title) {
		// Add to results
		results.push(title);
	});
	// Get count
	c = results.length;
	// Comparison defined?
	if(comp) {
		// See if it checks out using eval
		switch(comp) {
			case "eq":
			case "is":
				ok = c === num;
				break;
			case "neq":
				ok = c !== num;
				break;
			case "lt":
				ok = c < num;
				break;
			case "lte":
				ok = c <= num;
				break;
			case "gt":
				ok = c > num;
				break;
			case "gte":
				ok = c >= num;
				break;
		}
		// If comparison is true and we're not negating OR
		// we are negating and it's false
		if(ok && !neg || !ok && neg) {
			// Add to results...
			results =
				// Pass titles?
				$ ?
				// Then pass them
				results :
				// Pass count?
				[c.toString()];
		// Otherwise...
		} else {
			// Nothing to return at all
			results = [];
		}
	// No comparison
	} else {
		// Just return the count (no negation)
		results = [c.toString()];
	}
	// Return output
	return results;
	// Catch errors
	} catch (e) {
		// Return error
		return ["count filter error: " + e];
	}
};

})();
