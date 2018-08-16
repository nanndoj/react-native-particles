
## react-native-particles
[![npm version](https://badge.fury.io/js/react-native-particles.svg)](https://badge.fury.io/js/react-native-particles)

*Anything can be a particle!*

Declarative particle system for react native. Works on iOS and Android. It uses `Animated` api and `useNativeDriver:true` to get 60 FPS particles animation

## Add it to your project

1. Run `npm install react-native-particles --save`
2. `import { Emitter } from 'react-native-particles'`

## Demo

![](https://raw.githubusercontent.com/nanndoj/react-native-particles/master/Example/screenshosts/particles.gif)

## Basic usage

```javascript
import { Emitter } from 'react-native-particles';

const App = React.createClass({
  render() {
    return (
      <Emitter
        numberOfParticles={50}
        emissionRate={5}
        interval={200}
        particleLife={1500}
        direction={-90}
        spread={360}
        fromPosition={{ x: 200, y: 200 }}
      >
        <Text>Particle</Text>
      </Emitter>
    );
  }
});
```

## Examples

## Props

### Emitter

Basically, the `children` of emmiter is clonned and transformed into a particle.

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
