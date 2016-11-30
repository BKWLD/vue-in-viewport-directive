// DRYing up vars w/o getting into page objects
shared = require('../shared/app');
first = shared.first;
second = shared.second;

/**
 * Test the fundental operation, like the scrolLMonitor integration
 */
module.exports = {

	'second starts off visible': function (browser) { browser
		.url('http://localhost:8080/offset/')
		.waitForElementVisible('#app', 1000)

		// Intially fully vsible
		.assert.cssClassPresent(first, 'in-viewport')
		.assert.cssClassPresent(first, 'fully-in-viewport')
		.assert.cssClassNotPresent(first, 'above-viewport')
		.assert.cssClassNotPresent(first, 'below-viewport')

		// The second example should be visible because it has a top of 100
		.assert.cssClassPresent(second, 'in-viewport')
		.assert.cssClassNotPresent(second, 'fully-in-viewport')
		.assert.cssClassNotPresent(second, 'above-viewport')
		.assert.cssClassPresent(second, 'below-viewport')

	}, 'after 100px first becomes partially visible': function (browser) { browser

		// Scroll a page height down
		.execute('scrollTo(0, 100)')

		// First is stilly fully visible
		.assert.cssClassPresent(first, 'in-viewport')
		.assert.cssClassPresent(first, 'fully-in-viewport')
		.assert.cssClassNotPresent(first, 'above-viewport')
		.assert.cssClassNotPresent(first, 'below-viewport')

		// Scroll 1 more pixel
		.execute('scrollTo(0, 101)')

		// First is now partially visible
		.assert.cssClassPresent(first, 'in-viewport')
		.assert.cssClassNotPresent(first, 'fully-in-viewport')
		.assert.cssClassPresent(first, 'above-viewport')
		.assert.cssClassNotPresent(first, 'below-viewport')

	}, 'when first has 100px left, it becomes invisible': function (browser) { browser

		// Scroll past first example
		.execute('scrollTo(0, window.innerHeight - 100 - 50)') // Include margin

		// First is now hidden
		.assert.cssClassNotPresent(first, 'in-viewport')
		.assert.cssClassNotPresent(first, 'fully-in-viewport')
		.assert.cssClassPresent(first, 'above-viewport')
		.assert.cssClassNotPresent(first, 'below-viewport')

	}, 'when second is 100px from top, it becomes fully visible': function (browser) { browser

		// Scroll to when the second is 100px from the top with an extra 1px needed
		// to account since the second is 1px after the bottom of the first.
		.execute('scrollTo(0, window.innerHeight - 100 + 1)')

		// The second example should be fully visible.  It has above and below
		// because the offsets mean that it's "bigger" than the the viewport.
		.assert.cssClassPresent(second, 'in-viewport')
		.assert.cssClassPresent(second, 'fully-in-viewport')
		.assert.cssClassPresent(second, 'above-viewport')
		.assert.cssClassPresent(second, 'below-viewport')

	}, 'clearing the offsets resets to the "basic" state ': function (browser) { browser

		// Scroll back to top
		.execute('scrollTo(0, 0)')
		.execute('window.App.resetOffsets()')

		/// The first example should be fully visible initialy
		.assert.cssClassPresent(first, 'in-viewport')
		.assert.cssClassPresent(first, 'fully-in-viewport')
		.assert.cssClassNotPresent(first, 'above-viewport')
		.assert.cssClassNotPresent(first, 'below-viewport')

		// The second example should be hidden
		.assert.cssClassNotPresent(second, 'in-viewport')
		.assert.cssClassNotPresent(second, 'fully-in-viewport')
		.assert.cssClassNotPresent(second, 'above-viewport')
		.assert.cssClassPresent(second, 'below-viewport')

		// All tests done
		.end();
	}
}
