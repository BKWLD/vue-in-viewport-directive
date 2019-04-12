import { configure, addParameters } from '@storybook/vue';

// Option defaults:
addParameters({
  options: {
    name: 'in-viewport-directive',
    url: 'https://github.com/BKWLD/vue-in-viewport-directive',
  }
})

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
