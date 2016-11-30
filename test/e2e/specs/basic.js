// DRYing up vars w/o getting into page objects
shared = require('../shared/app');
first = shared.first;
second = shared.second;

/**
 * Test the fundental operation, like the scrolLMonitor integration
 */
module.exports = {

	'should have initial state': function (browser) { browser
		.url('http://localhost:8080/basic/')
		.waitForElementVisible('#app', 1000)

		// The first example should be fully visible initialy
		.assert.cssClassPresent(first, 'in-viewport')
		.assert.cssClassPresent(first, 'fully-in-viewport')
		.assert.cssClassNotPresent(first, 'above-viewport')
		.assert.cssClassNotPresent(first, 'below-viewport')

		// The second example should be hidden
		.assert.cssClassNotPresent(second, 'in-viewport')
		.assert.cssClassNotPresent(second, 'fully-in-viewport')
		.assert.cssClassNotPresent(second, 'above-viewport')
		.assert.cssClassPresent(second, 'below-viewport')

	}, 'should no longer be fully visible after 1px of scroll': function (browser) { browser

		// Scroll 1px down
		.execute('scrollTo(0, 1)')

		// First is now partially visible
		.assert.cssClassPresent(first, 'in-viewport')
		.assert.cssClassNotPresent(first, 'fully-in-viewport')
		.assert.cssClassPresent(first, 'above-viewport')
		.assert.cssClassNotPresent(first, 'below-viewport')

		// And second one is partially visible
		.assert.cssClassPresent(second, 'in-viewport')
		.assert.cssClassNotPresent(second, 'fully-in-viewport')
		.assert.cssClassNotPresent(second, 'above-viewport')
		.assert.cssClassPresent(second, 'below-viewport')

	}, 'should be not be visible after scrolling past it': function (browser) { browser

		// Scroll past first example
		.execute('scrollTo(0, window.innerHeight)')

		// First is now hidden
		.assert.cssClassNotPresent(first, 'in-viewport')
		.assert.cssClassNotPresent(first, 'fully-in-viewport')
		.assert.cssClassPresent(first, 'above-viewport')
		.assert.cssClassNotPresent(first, 'below-viewport')

		// And second one is fully visible
		.assert.cssClassPresent(second, 'in-viewport')
		.assert.cssClassPresent(second, 'fully-in-viewport')
		.assert.cssClassNotPresent(second, 'above-viewport')
		.assert.cssClassNotPresent(second, 'below-viewport')

	}, 'should be visible again after scrolling back to top': function (browser) { browser

		// Scroll back up to top
		.execute('scrollTo(0, 0)')

		// The first example should be fully visible again
		.assert.cssClassPresent(first, 'in-viewport')
		.assert.cssClassPresent(first, 'fully-in-viewport')
		.assert.cssClassNotPresent(first, 'above-viewport')
		.assert.cssClassNotPresent(first, 'below-viewport')

		// The second example should be hidden again
		.assert.cssClassNotPresent(second, 'in-viewport')
		.assert.cssClassNotPresent(second, 'fully-in-viewport')
		.assert.cssClassNotPresent(second, 'above-viewport')
		.assert.cssClassPresent(second, 'below-viewport')

		// All tests done
		.end();
	},
}
