//@flow
import React from 'react';
import type { Element } from 'react';
import debounce from 'lodash.debounce';
import { Vector } from './entities/Vector';
import AnimatedParticle from './AnimatedParticle';
import type { VectorType } from './entities/Vector';
import type { ParticleType } from './entities/Particle';
import { Dimensions, View, StyleSheet, Animated } from 'react-native';

const windowDimensions = Dimensions.get('window');

export type BaseEmitterType = {
  /** Start emitting particles after initialization */
  autoStart?: boolean,
  /** The total of particles to be emitted */
  numberOfParticles: number,
  /** Interval between emitting a new batch of particles */
  interval: number,
  /** The position from where the particles should be generated */
  fromPosition?: VectorType | (() => VectorType),
  /** Number of particles to be be emitted on each cycle */
  emissionRate: number,
  /** The particle life time (ms) */
  particleLife: number,
  /** Width of the emitter */
  width?: number,
  /** Height of the emitter */
  height?: number,
  /** Style of the particle container */
  particleContainerStyle?: any,
  /** The particle content to be rendered */
  children: Element<any>,
  /** Reference to the Emiter  */
  ref: BaseEmitterType => void,
  /** Function to calculate a new bunch of particles */
  onCalculate: (position: VectorType, count: number) => ParticleConfig[],
  /** Function used to animate particles */
  onAnimate: (Animated.Value, Animated.Value) => void
};

type BaseEmitterState = {
  visibleParticles: ParticleConfig[]
};

export type ParticleConfig = {
  particle: ParticleType,
  path: VectorType[]
};

class BaseEmitter extends React.Component<BaseEmitterType, BaseEmitterState> {
  // All particles
  particles: ParticleConfig[] = [];
  // Particles scheduled to be destroyed
  particlesToDestroy: number[] = [];
  // Number of generated particles
  particlesCounter: number = 0;
  // Last time a bunch of particles was emitted
  lastEmission: number;
  // Is emitting particles
  isEmitting: boolean = true;

  // Request animation frame callback reference
  _raf: AnimationFrameID;
  _timeout: TimeoutID;

  // Component is mounted
  _isMounted: boolean = false;

  static defaultProps = {
    autoStart: true,
    width: windowDimensions.width,
    height: windowDimensions.height,
    fromPosition: Vector(0, 0)
  };

  constructor(props: BaseEmitterType) {
    super(props);

    this.state = {
      // List of visible particles
      visibleParticles: []
    };

    (this: any)._loop = debounce(this._loop.bind(this), 100);
  }

  render() {
    const {
      particleLife,
      children,
      particleContainerStyle,
      onAnimate
    } = this.props;
    const { visibleParticles } = this.state;

    // The job is done
    if (!this.isEmitting && !visibleParticles.length) return null;

    const child = React.Children.only(children);

    return visibleParticles.map((obj, i) => (
      <AnimatedParticle
        style={particleContainerStyle}
        key={obj.particle.id}
        path={obj.path}
        lifetime={particleLife}
        autoStart={true}
        onLifeEnds={this._destroyParticle(obj.particle)}
        onAnimate={onAnimate}
      >
        {child}
      </AnimatedParticle>
    ));
  }

  componentDidMount() {
    this._isMounted = true;
    const { autoStart } = this.props;
    autoStart && this.start();
  }

  shouldComponentUpdate(
    nextProps: BaseEmitterType,
    nextState: BaseEmitterState
  ) {
    return (
      this.state.visibleParticles.length !== nextState.visibleParticles.length
    );
  }

  componentWillUnmount() {
    this._isMounted = false;
    this._raf && cancelAnimationFrame(this._raf);
    this._timeout && clearTimeout(this._timeout);
  }

  stopEmitting() {
    const { particleLife } = this.props;
    this.isEmitting = false;

    // Schedule a final loop for when the last particles are done
    this._timeout = setTimeout(this._loop.bind(this), particleLife + 1);
  }

  start() {
    this.isEmitting = true;
    this.particlesCounter = 0;
    this.particles = [];
    this._loop();
  }

  _loop() {
    this._cleanUp();
    this._calculate();
    this._draw();
    this._queue();
  }

  _cleanUp() {
    // Remove particles scheduled to be destroyed
    this.particles = this.particles.filter(
      p => !this.particlesToDestroy.includes(p.particle.id)
    );
    this.particlesToDestroy = [];
  }

  _calculate() {
    const { onCalculate, numberOfParticles, interval } = this.props;

    if (!this.isEmitting) return;

    if (this.particlesCounter >= numberOfParticles) {
      // Stop emitting new particles
      return this.stopEmitting();
    }

    if (Date.now() - this.lastEmission < interval) return;

    this.lastEmission = Date.now();

    const newParticles = onCalculate(
      this._getInitialPosition(),
      this.particlesCounter
    );

    // Add the new generated particles
    this.particles.push(...newParticles);
    this.particlesCounter = this.particlesCounter + newParticles.length;
  }

  _draw() {
    const { width, height } = this.props;
    // Filter the visible particles
    this.setState({
      visibleParticles: this.particles
        // Remove the particles out of bounds
        .filter(p => {
          const { x, y } = p.particle.position;
          return x >= 0 && x <= width && y >= 0 && y <= height;
        })
    });
  }

  _queue() {
    if (!this.isEmitting) return;
    this._raf = requestAnimationFrame(() => this._loop());
  }

  _getInitialPosition(): VectorType {
    const { fromPosition } = this.props;

    if (!fromPosition) return Vector(0, 0);

    if (typeof fromPosition === 'function') {
      return fromPosition();
    }

    if (Object.prototype.toString.apply(fromPosition) === '[object Object]') {
      return fromPosition;
    }

    return Vector(0, 0);
  }

  _destroyParticle = (particle: ParticleType): Function => (): void => {
    this.particlesToDestroy.push(particle.id);
    if (!this.isEmitting && this._isMounted) {
      this._loop();
    }
  };
}

export default BaseEmitter;
