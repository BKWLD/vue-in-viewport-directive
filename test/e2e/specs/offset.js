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
		.assert.cssClassPresent(first, 'visible')
		.assert.cssClassPresent(first, 'fully')
		.assert.cssClassNotPresent(first, 'above')
		.assert.cssClassNotPresent(first, 'below')

    // The second example should be visible because it has a top of 100
    .assert.cssClassPresent(second, 'visible')
    .assert.cssClassNotPresent(second, 'fully')
		.assert.cssClassNotPresent(second, 'above')
    .assert.cssClassPresent(second, 'below')

	}, 'after 100px first becomes partially visible': function (browser) { browser

		// Scroll a page height down
    .execute('scrollTo(0, 100)')

		// First is stilly fully visible
		.assert.cssClassPresent(first, 'visible')
		.assert.cssClassPresent(first, 'fully')
		.assert.cssClassNotPresent(first, 'above')
		.assert.cssClassNotPresent(first, 'below')

		// Scroll 1 more pixel
    .execute('scrollTo(0, 101)')

		// First is now partially visible
		.assert.cssClassPresent(first, 'visible')
		.assert.cssClassNotPresent(first, 'fully')
		.assert.cssClassPresent(first, 'above')
		.assert.cssClassNotPresent(first, 'below')

	}, 'when first has 100px left, it becomes invisible': function (browser) { browser

		// Scroll past first example
		.execute('scrollTo(0, window.innerHeight - 100 - 49)') // Include margin

		// First is now hidden
    .assert.cssClassNotPresent(first, 'visible')
		.assert.cssClassNotPresent(first, 'fully')
		.assert.cssClassPresent(first, 'above')
		.assert.cssClassNotPresent(first, 'below')

  }, 'when second is 100px from top, it becomes fully visible': function (browser) { browser

		// Scroll back up to top.  Not sure why scrollMonitor required this
		// fudging to 98 rather than 100...
		.execute('scrollTo(0, window.innerHeight - 98)')

		// The second example should be fully visible.  It has above and below
		// because the offsets mean that it's "bigger" than the the viewport.
		.assert.cssClassPresent(second, 'visible')
		.assert.cssClassPresent(second, 'fully')
		.assert.cssClassPresent(second, 'above')
		.assert.cssClassPresent(second, 'below')

	}, 'clearing the offsets resets to the "basic" state ': function (browser) { browser

		// Scroll past first example
		.execute('scrollTo(0, 0)')
		.execute('window.App.resetOffsets()')

		/// The first example should be fully visible initialy
		.assert.cssClassPresent(first, 'visible')
		.assert.cssClassPresent(first, 'fully')
		.assert.cssClassNotPresent(first, 'above')
		.assert.cssClassNotPresent(first, 'below')

    // The second example should be hidden
    .assert.cssClassNotPresent(second, 'visible')
    .assert.cssClassNotPresent(second, 'fully')
		.assert.cssClassNotPresent(second, 'above')
    .assert.cssClassPresent(second, 'below')

		// All tests done
		.end();
	}
}
