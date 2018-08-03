//@flow
import React from 'react';
import debounce from 'lodash.debounce';
import { Vector } from './entities/Vector';
import { fromAngle, toRadians } from './utils/vector-helpers';
import { move } from './utils/move-particle';
import AnimatedParticle from './AnimatedParticle';
import emitParticle from './utils/emit-particle';

import type { Element } from 'react';
import type { VectorType } from './entities/Vector';
import type { ParticleType } from './entities/Particle';
import { View, Dimensions } from 'react-native';

const windowDimensions = Dimensions.get('window');

export type EmitterType = {
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
  /** The direction angle of the particle (in degrees) */
  direction: number,
  /** The spread angle where particles are allowed to be rendered (in degrees) */
  spread: number,
  /** The speed of each particle */
  speed?: number,
  /** Gravity force to be applied to the particle movement */
  gravity?: number,
  /** number of steps the animation will be divided ( more segments == more precise animation == slow performance) */
  segments?: number,
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
};

interface EmitterState {
  visibleParticles: ParticleConfig[];
}

type ParticleConfig = {
  particle: ParticleType,
  path: VectorType[]
};

class Emitter extends React.Component<EmitterType, EmitterState> {
  // All particles
  particles: ParticleConfig[] = [];
  // Particles scheduled to be destroyed
  particlesToDestroy: number[] = [];
  // Number of generated particles
  particlesCounter: number = 0;
  // Last time a bach of particles was emitted
  lastEmission: number;
  // Is emitting particles
  isEmitting: boolean = true;

  static defaultProps = {
    autoStart: true,
    width: windowDimensions.width,
    height: windowDimensions.height,
    fromPosition: Vector(0, 0),
    gravity: 0.2,
    segments: 10,
    speed: 5
  };

  constructor(props: EmitterType) {
    super(props);

    this.state = {
      // List of visible particles
      visibleParticles: []
    };

    (this: any)._loop = debounce(this._loop.bind(this), 100);
  }

  render() {
    const { particleLife, children, style } = this.props;
    const { visibleParticles } = this.state;

    const child = React.Children.only(children);

    // The job is done
    if (!this.isEmitting && !visibleParticles.length) return null;

    return (
      <View style={style}>
        {visibleParticles.map((obj, i) => (
          <AnimatedParticle
            key={obj.particle.id}
            path={obj.path}
            lifetime={particleLife}
            autoStart={true}
            onLifeEnds={this._destroyParticle(obj.particle)}
          >
            {child instanceof Function ? child(obj.particle) : child}
          </AnimatedParticle>
        ))}
      </View>
    );
  }

  componentDidMount() {
    const { autoStart } = this.props;
    autoStart && this.start();
  }

  shouldComponentUpdate(nextProps: EmitterType, nextState: EmitterState) {
    return this.state.visibleParticles.length !== nextState.visibleParticles.length;
  }

  stopEmitting() {
    const { particleLife } = this.props;
    this.isEmitting = false;

    // Schedule a final loop for when the last particles are done
    setTimeout(this._loop.bind(this), particleLife + 1);
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
    this.particles = this.particles.filter(p => !this.particlesToDestroy.includes(p.particle.id));
    this.particlesToDestroy = [];
  }

  _calculate() {
    const { numberOfParticles, emissionRate, direction, speed, spread, gravity, segments, interval } = this.props;
    if (!this.isEmitting) return;

    if (this.particlesCounter >= numberOfParticles) {
      // Stop emitting new particles
      return this.stopEmitting();
    }

    if (Date.now() - this.lastEmission < interval) return;

    // if we're at our max, stop emitting.
    const rate = Math.min(numberOfParticles, emissionRate);
    const newParticles = [];

    this.lastEmission = Date.now();

    // for [emissionRate], emit a particle
    for (let j = 0; j < rate; j++) {
      /*
          first step - Emit new particles
         */
      const particle = emitParticle(
        this._getInitialPosition(),
        fromAngle(toRadians(direction), speed),
        toRadians(spread),
        //Apply gravity to the vertical axis
        Vector(0, gravity),
        // Particle id
        this.particlesCounter++
      );

      // Calculate the particle path
      // TODO: Improve the performance currently O(n2)
      let path: VectorType[] = [];
      let particleMovement: ParticleType = particle;
      for (let j = 0; j < segments; j++) {
        path.push(particleMovement.position);
        particleMovement = move(particleMovement);
      }
      newParticles.push({
        particle,
        path
      });
    }

    // Add the new generated particles
    this.particles.push(...newParticles);
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
    requestAnimationFrame(() => this._loop());
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
    if (!this.isEmitting) {
      this._loop();
    }
  };
}

export default Emitter;
