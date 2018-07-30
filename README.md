
## react-native-particles
[![npm version](https://badge.fury.io/js/react-native-particles.svg)](https://badge.fury.io/js/react-native-particles)

Declarative particle system for react native. Works on iOS and Android.

## Add it to your project

1. Run `npm install react-native-particles --save`
2. `import { Emitter } from 'react-native-particles`

## Demo

![](https://raw.githubusercontent.com/nanndoj/react-native-particles/master/Example/screenshosts/particles.gif)

## Basic usage

```javascript
import { Emitter } from 'react-native-particles';

const App = React.createClass({
  render() {
    return (
      <Emitter
        autoStart={false}
        numberOfParticles={50}
        emissionRate={5}
        interval={200}
        particleLife={1500}
        direction={-90}
        spread={360}
        width={500}
        height={500}
        segments={15}
        speed={6}
        gravity={0.2}
        fromPosition={() => ({ x: width / 2 - 50, y: height / 2 - 160 })}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 999, backgroundColor: 'red' }}
      >
        <Image
          source={require('../assets/images/large_star.png')}
          resizeMode="stretch"
          style={{ width: 100, height: 100 }}
        />
      </Emitter>
    );
  }
});
```

## Injecting a custom tab bar

Suppose we had a custom tab bar called `CustomTabBar`, we would inject
it into our `ScrollableTabView` like this:

```javascript
var ScrollableTabView = require('react-native-scrollable-tab-view');
var CustomTabBar = require('./CustomTabBar');

var App = React.createClass({
  render() {
    return (
      <ScrollableTabView renderTabBar={() => <CustomTabBar someProp={'here'} />}>
        <ReactPage tabLabel="React" />
        <FlowPage tabLabel="Flow" />
        <JestPage tabLabel="Jest" />
      </ScrollableTabView>
    );
  }
});
```
To start you can just copy [DefaultTabBar](https://github.com/skv-headless/react-native-scrollable-tab-view/blob/master/DefaultTabBar.js).

## Examples

## Props

### Emitter

 /**  */
  
  /** */
  segments: number,
  /** Width of the emitter */
  width: number,
  /** Height of the emitter */
  height: number,
  /** Style of the emitter */
  style?: any,
  /** The particle content to be rendered */
  children: Element<any>,
  /** Reference to the Emiter  */
  ref: EmitterType => void

- **`numberOfParticles`** _(number)_ - The total of particles to be emitted
- **`interval`** _(number)_ - Interval between emitting a new bunch of particles
- **`fromPosition`** _(VectorType | (() => VectorType))_ - The position from where the particles should be generated
- **`emissionRate`** _(number)_ - Number of particles to be be emitted on each cycle
- **`particleLife`** _(number)_ - The particle life time (ms)
- **`direction`** _(number)_ - The direction angle of the particle (in degrees)
- **`spread`** _(number)_ - The spread angle where particles are allowed to be rendered (in degrees)
- **`speed`** _(number)_ - The speed of each particle
- **`gravity`** _(number)_ - Gravity force to be applied to the particle movement
- **`segments`** _(number)_ -  number of steps the animation will be divided ( more segments == more precise animation == slow performance)
- **`width`** _(number)_ -  Width of the emitter area
- **`height`** _(number)_ - Height of the emitter area
- **`autoStart`** _(boolean)_ - Start emitting particles right after initialization
- **`style`** _(Object)_ -  Style of the container view
- **`children`** _(ReactElement)_ - Particle content

## Contribution
**Issues** are welcome. Please add a screenshot of bug and code snippet. Quickest way to solve issue is to reproduce it on one of the examples.

**Pull requests** are welcome. If you want to change API or making something big better to create issue and discuss it first. Before submiting PR please run ```prettier```.

---

**MIT Licensed**
