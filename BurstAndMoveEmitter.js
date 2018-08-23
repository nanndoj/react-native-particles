// @flow
import React, { Component } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import type { VectorType } from './entities/Vector';
import { Vector } from './entities/Vector';
import { fromAngle, toRadians, add } from './utils/vector-helpers';
import BaseEmitter from './BaseEmitter';
import { Particle } from './entities/Particle';
import type { ParticleConfig, BaseEmitterType } from './BaseEmitter';

const { width, height } = Dimensions.get('window');

type IBurstAndMoveEmitter = BaseEmitterType & {
  finalPoint: VectorType,
  radius: number,
  burstTime: number,
  waitTime: number,
  moveTime: number,
  onCalculate?: () => ParticleConfig[],
  onAnimate?: (Animated.Value, Animated.Value) => void
};
export interface IBurstAndMoveEmitterState {
  particles: Array<Vector>[];
}

export default class BurstAndMoveEmitter extends Component<
  IBurstAndMoveEmitter,
  IBurstAndMoveEmitterState
> {
  static defaultProps = {
    finalPoint: Vector(width, height),
    burstTime: 300,
    waitTime: 1000,
    moveTime: 1000
  };

  emitter: BaseEmitter;
  _storeEmitterRef: BaseEmitter => void;

  constructor(props: IBurstAndMoveEmitter) {
    super(props);

    this._calculate = this._calculate.bind(this);
    this._animateParticle = this._animateParticle.bind(this);
    this._storeEmitterRef = emitter => (this.emitter = emitter);
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <BaseEmitter
        {...props}
        onCalculate={this._calculate}
        ref={this._storeEmitterRef}
        onAnimate={this._animateParticle}
      >
        {children}
      </BaseEmitter>
    );
  }

  _calculate = (initialPosition: VectorType, particlesCounter: number) => {
    const { numberOfParticles, radius, finalPoint, emissionRate } = this.props;

    const particles: ParticleConfig[] = [];

    const rate = Math.min(numberOfParticles, emissionRate);

    for (let i = 0; i < rate; i++) {
      // Generate a random magnitude lower than or equals the radius
      const magnitude = Math.round(Math.random() * radius);

      // Generate a random angle between 0 and 360
      const angle = Math.round(Math.random() * 360);

      // Calculate a vector based on the angle and magnitude.
      const burstPoint = add(
        initialPosition,
        fromAngle(toRadians(angle), magnitude)
      );

      // first step - Emit new particles
      const particle = Particle(
        Vector(0, 0),
        Vector(0, 0),
        particlesCounter + i,
        initialPosition
      );
      const path: VectorType[] = [initialPosition, burstPoint, finalPoint];

      particles.push({
        particle,
        path
      });
    }

    return particles;
  };

  _animateParticle = (path, transformValue, opacityValue) => {
    const { burstTime, moveTime, waitTime } = this.props;
    return Animated.parallel([
      Animated.sequence([
        Animated.timing(transformValue, {
          toValue: 1,
          duration: burstTime,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true
        }),
        Animated.timing(transformValue, {
          toValue: 2,
          duration: moveTime,
          delay: waitTime,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true
        }),
        Animated.timing(opacityValue, {
          toValue: 0,
          duration: moveTime * 0.5,
          useNativeDriver: true
        })
      ])
    ]);
  };

  start() {
    this.emitter.start();
  }
}
