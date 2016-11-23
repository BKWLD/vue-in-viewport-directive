// http://nightwatchjs.org/guide#settings-file

// Deps
path = require('path')

// Collect some vars
var TRAVIS_JOB_NUMBER = process.env.TRAVIS_JOB_NUMBER
	, SELENIUM_HOST = process.env.SELENIUM_HOST || 'localhost'
	, SELENIUM_PORT = process.env.SELENIUM_PORT || 4444
	, SAUCE_USERNAME = process.env.SAUCE_USERNAME || ''
	, SAUCE_ACCESS_KEY =  process.env.SAUCE_ACCESS_KEY || ''
;

// Export config
module.exports = {
	'src_folders': ['test/e2e/specs'],
	'output_folder': 'test/e2e/reports',

	'selenium': {
		'start_process': true,
		'server_path': 'node_modules/selenium-server/lib/runner/selenium-server-standalone-2.53.1.jar',
		'host': '127.0.0.1',
		'port': 4444,
		'cli_args': {
			'webdriver.chrome.driver': 'node_modules/chromedriver/lib/chromedriver/chromedriver'
		}
	},

	'test_settings': {
		'default': {
			'selenium_port': SELENIUM_PORT,
			'selenium_host': SELENIUM_HOST,
			'silent': true,
			'username' : SAUCE_USERNAME,
			'access_key' : SAUCE_ACCESS_KEY,
			'desiredCapabilities': {
				'build': `build-${TRAVIS_JOB_NUMBER}`,
				'tunnel-identifier': TRAVIS_JOB_NUMBER
			},
			'screenshots': {
				'enabled': true,
				'on_failure': true,
				'on_error': false,
				'path': 'test/e2e/screenshots'
			}
		},

		'chrome': {
			'desiredCapabilities': {
				'browserName': 'chrome',
				'javascriptEnabled': true,
				'acceptSslCerts': true
			}
		}

	}
}
