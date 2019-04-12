// Storybook deps
import { storiesOf, addDecorator } from '@storybook/vue'
import { 
  withKnobs, 
  number, 
  text, 
  boolean, 
  object,
} from '@storybook/addon-knobs'

// Simple component to test with
import 'intersection-observer' // For IE
import Always from './box/Always'
import Once from './box/Once'
import Shorthand from './box/Shorthand'

// Shared props
const props = ({
  marginTop = '100vh',
  marginBottom = '100vh',
  height = '',
  disabled = false,
  margin = '0px 0px -1px 0px',
}) => { return {
  marginTop: { default: text('CSS margin-top', marginTop) },
  marginBottom: { default: text('CSS margin-bottom', marginBottom) },
  height: { default: text('CSS height', height) },
  
  disabled: { default: boolean('disabled', disabled) },
  margin: { default: text('margin', margin) },
}}

// Shared box template.  I had to make an artifical viewport box because
// I couldn't set the iframe that Storybook uses as the viewport but the
// without that, the viewport of the parent document was getting measured,
// which was too tall
// https://github.com/w3c/IntersectionObserver/issues/283
const box = `
  <div class='viewport' style='
    width: 100vw; height: 100vh;
    top: 0; left: 0;
    position: fixed;
    overflow: auto;
  '>
    <box 
      :style='{ 
        marginTop: marginTop,
        marginBottom: marginBottom,
        height: height,
      }'
      :disabled='disabled'
      :margin='margin'
    />
  </div>`

// Scroll down to box
const initiallyHiddenBox = `
  <div>
    <p>👇👇👇👇👇👇👇👇👇</p>
    ${box}
  </div>`

// Create a bucket of stories
addDecorator(withKnobs)
storiesOf('Examples', module)
  
  .add('Initially visible', () => ({
    components: { box: Always },
    props: props({ marginTop: '0vh' }),
    template: box,
  }))
  
  .add('Scroll to reveal', () => ({
    components: { box: Always },
    props: props({}),
    template: initiallyHiddenBox,
  }))
  
  .add('Trigger once', () => ({
    components: { box: Once },
    props: props({}),
    template: initiallyHiddenBox,
  }))
  
  .add('Initially inactive', () => ({
    components: { box: Always },
    props: props({ disabled: true }),
    template: initiallyHiddenBox,
  }))
  
  .add('Trigger late (px)', () => ({
    components: { box: Always },
    props: props({ margin: '-20px 0px' }),
    template: initiallyHiddenBox,
  }))
  
  .add('Trigger late (%, shorthand)', () => ({
    components: { box: Shorthand },
    props: props({ margin: '-20% 0%' }),
    template: initiallyHiddenBox,
  }))
  
  .add('Trigger early', () => ({
    components: { box: Always },
    props: props({ margin: '200px 0px' }),
    template: initiallyHiddenBox,
  }))


