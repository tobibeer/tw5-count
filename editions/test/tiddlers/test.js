/*\
title: test-tobibeer/count-filter.js
type: application/javascript
tags: [[$:/tags/test-spec]]

Tests the count filter.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

describe("test count filter", function() {

	// Create a wiki
	var wiki = new $tw.Wiki(),
		fakeWidget = {getVariable: function() {return "foo";}};

	// Tests
	it("count 1", function() {
		expect(wiki.filterTiddlers(
			"[[a]count[]]"
		,fakeWidget).join(",")).toBe("1");
	});
	it("count 2", function() {
		expect(wiki.filterTiddlers(
			"a b +[count[]]"
		,fakeWidget).join(",")).toBe("2");
	});
	it("count 2 = 2", function() {
		expect(wiki.filterTiddlers(
			"a b +[count[2]]"
		,fakeWidget).join(",")).toBe("2");
	});
	it("count 2 = 1", function() {
		expect(wiki.filterTiddlers(
			"a b +[count[1]]"
		,fakeWidget).join(",")).toBe("");
	});
	it("count 2 = 2 AND negate", function() {
		expect(wiki.filterTiddlers(
			"a b +[!count[2]]"
		,fakeWidget).join(",")).toBe("");
	});
	it("count 2 = 1 AND negate", function() {
		expect(wiki.filterTiddlers(
			"a b +[!count[1]]"
		,fakeWidget).join(",")).toBe("2");
	});
	it("count 2 = 1 AND $", function() {
		expect(wiki.filterTiddlers(
			"a b +[count:$[1]]"
		,fakeWidget).join(",")).toBe("");
	});
	it("count 2 = 2 AND $", function() {
		expect(wiki.filterTiddlers(
			"a b +[count:$[2]]"
		,fakeWidget).join(",")).toBe("a,b");
	});
	it("count 2 eq 2", function() {
		expect(wiki.filterTiddlers(
			"a b +[count:eq[2]]"
		,fakeWidget).join(",")).toBe("2");
	});
	it("count 2 eq 2 AND negate", function() {
		expect(wiki.filterTiddlers(
			"a b +[!count:eq[2]]"
		,fakeWidget).join(",")).toBe("");
	});
	it("count 2 < 3 AND $", function() {
		expect(wiki.filterTiddlers(
			"a b +[count:$ lt[3]]"
		,fakeWidget).join(",")).toBe("a,b");
	});
	it("count 2 < 3 AND $ AND negate", function() {
		expect(wiki.filterTiddlers(
			"a b +[!count:$ lt[3]]"
		,fakeWidget).join(",")).toBe("");
	});
	it("count 2 > 1 AND $", function() {
		expect(wiki.filterTiddlers(
			"a b +[count:$ gt[1]]"
		,fakeWidget).join(",")).toBe("a,b");
	});
	it("count 2 > 1 AND $ AND negate", function() {
		expect(wiki.filterTiddlers(
			"a b +[!count:$ gt[1]]"
		,fakeWidget).join(",")).toBe("");
	});
	it("count operand error", function() {
		expect(wiki.filterTiddlers(
			"a b +[!count[foo]]"
		,fakeWidget).join(",").indexOf("count filter error:")).toBe(0);
	});
	it("count comparator error", function() {
		expect(wiki.filterTiddlers(
			"a b +[!count:equals[3]]"
		,fakeWidget).join(",").indexOf("count filter error:")).toBe(0);
	});
});

})();
