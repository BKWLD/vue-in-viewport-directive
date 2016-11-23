// DRYing up vars w/o getting into page objects
shared = require('../shared/app');
first = shared.first;
second = shared.second;

/**
 * Test the `once` prop
 */
module.exports = {

  'should have initial state': function (browser) { browser
	  .url('http://localhost:8080/once/')
    .waitForElementVisible('#app', 1000)

		// The first example should be visible initialy
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

	}, 'should not update again if scrolling back to top': function (browser) { browser

		// Scroll back to top
		.execute('scrollTo(0, 0)')

		// All of the settings from the previous step
    .assert.cssClassPresent(first, 'visible')
		.assert.cssClassNotPresent(first, 'fully')
		.assert.cssClassPresent(first, 'above')
		.assert.cssClassNotPresent(first, 'below')

		// All of the settings from the previous step
		.assert.cssClassPresent(second, 'visible')
    .assert.cssClassNotPresent(second, 'fully')
		.assert.cssClassNotPresent(second, 'above')
    .assert.cssClassPresent(second, 'below')

		// All tests done
		.end();
  },
}
