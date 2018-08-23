//@flow
import type { Element } from 'react';
import React from 'react';
import { Animated, Easing } from 'react-native';
import { Vector } from './entities/Vector';
import { fromAngle, toRadians } from './utils/vector-helpers';
import { move } from './utils/move-particle';
import emitParticle from './utils/emit-particle';
import type { VectorType } from './entities/Vector';
import type { ParticleType } from './entities/Particle';
import type { BaseEmitterType } from './BaseEmitter';
import BaseEmitter from './BaseEmitter';

export type EmitterType = BaseEmitterType & {
  /** The direction angle of the particle (in degrees) */
  direction: number,
  /** The spread angle where particles are allowed to be rendered (in degrees) */
  spread: number,
  /** The speed of each particle */
  speed?: number,
  /** Gravity force to be applied to the particle movement */
  gravity?: number,
  /** number of steps the animation will be divided ( more segments == more precise animation == slow performance) */
  segments?: number
};

export class Emitter extends React.Component<EmitterType> {
  emitter: BaseEmitter;

  static defaultProps = {
    gravity: 0.2,
    segments: 10,
    speed: 5
  };

  _storeEmitterRef: any => void;

  constructor(props: EmitterType) {
    super(props);
    this._calculate = this._calculate.bind(this);
    this._animateParticle = this._animateParticle.bind(this);
    this._storeEmitterRef = emitter => (this.emitter = emitter);
  }

  render() {
    return (
      <BaseEmitter
        {...this.props}
        onCalculate={this._calculate}
        ref={this._storeEmitterRef}
        onAnimate={this._animateParticle}
      />
    );
  }

  _calculate = (initialPosition: VectorType, particlesCounter: number) => {
    const {
      numberOfParticles,
      emissionRate,
      direction,
      speed,
      spread,
      gravity,
      segments
    } = this.props;

    // if we're at our max, stop emitting.
    const rate = Math.min(numberOfParticles, emissionRate);
    const newParticles = [];
    // for [emissionRate], emit a particle
    for (let j = 0; j < rate; j++) {
      /*
                      first step - Emit new particles
                     */
      const particle = emitParticle(
        initialPosition,
        fromAngle(toRadians(direction), speed),
        toRadians(spread),
        //Apply gravity to the vertical axis
        Vector(0, gravity),
        // Particle id
        particlesCounter + j
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

    return newParticles;
  };

  _animateParticle = (path, transformValue, opacityValue) => {
    const { particleLife } = this.props;
    return Animated.parallel([
      Animated.timing(transformValue, {
        toValue: path.length,
        duration: particleLife,
        useNativeDriver: true
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        ease: Easing.inOut(Easing.quad),
        delay: particleLife * 0.8,
        duration: particleLife * 0.2,
        useNativeDriver: true
      })
    ]);
  };

  start() {
    this.emitter.start();
  }
}

export default Emitter;
