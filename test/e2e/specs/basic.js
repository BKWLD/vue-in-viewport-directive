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
		.assert.cssClassPresent(first, 'visible')
		.assert.cssClassPresent(first, 'fully')
		.assert.cssClassNotPresent(first, 'above')
		.assert.cssClassNotPresent(first, 'below')

    // The second example should be hidden
    .assert.cssClassNotPresent(second, 'visible')
    .assert.cssClassNotPresent(second, 'fully')
		.assert.cssClassNotPresent(second, 'above')
    .assert.cssClassPresent(second, 'below')

	}, 'should no longer be fully visible after 1px of scroll': function (browser) { browser

		// Scroll 1px down
    .execute('scrollTo(0, 1)')

    // First is now partially visible
    .assert.cssClassPresent(first, 'visible')
		.assert.cssClassNotPresent(first, 'fully')
		.assert.cssClassPresent(first, 'above')
		.assert.cssClassNotPresent(first, 'below')

    // And second one is partially visible
		.assert.cssClassPresent(second, 'visible')
    .assert.cssClassNotPresent(second, 'fully')
		.assert.cssClassNotPresent(second, 'above')
    .assert.cssClassPresent(second, 'below')

	}, 'should be not be visible after scrolling past it': function (browser) { browser

		// Scroll past first example
		.execute('scrollTo(0, window.innerHeight)')

		// First is now hidden
    .assert.cssClassNotPresent(first, 'visible')
		.assert.cssClassNotPresent(first, 'fully')
		.assert.cssClassPresent(first, 'above')
		.assert.cssClassNotPresent(first, 'below')

    // And second one is fully visible
		.assert.cssClassPresent(second, 'visible')
    .assert.cssClassPresent(second, 'fully')
		.assert.cssClassNotPresent(second, 'above')
    .assert.cssClassNotPresent(second, 'below')

  }, 'should be visible again after scrolling back to top': function (browser) { browser

		// Scroll back up to top
		.execute('scrollTo(0, 0)')

		// The first example should be fully visible again
		.assert.cssClassPresent(first, 'visible')
		.assert.cssClassPresent(first, 'fully')
		.assert.cssClassNotPresent(first, 'above')
		.assert.cssClassNotPresent(first, 'below')

    // The second example should be hidden again
    .assert.cssClassNotPresent(second, 'visible')
    .assert.cssClassNotPresent(second, 'fully')
		.assert.cssClassNotPresent(second, 'above')
    .assert.cssClassPresent(second, 'below')

		// All tests done
		.end();
  },
}
