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

	}, 'should not update again if scrolling back to top': function (browser) { browser

		// Scroll back to top
		.execute('scrollTo(0, 0)')

		// All of the settings from the previous step
    .assert.cssClassPresent(first, 'in-viewport')
		.assert.cssClassNotPresent(first, 'fully-in-viewport')
		.assert.cssClassPresent(first, 'above-viewport')
		.assert.cssClassNotPresent(first, 'below-viewport')

		// All of the settings from the previous step
		.assert.cssClassPresent(second, 'in-viewport')
    .assert.cssClassNotPresent(second, 'fully-in-viewport')
		.assert.cssClassNotPresent(second, 'above-viewport')
    .assert.cssClassPresent(second, 'below-viewport')

		// All tests done
		.end();
  },
}
