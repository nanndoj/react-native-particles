/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { Vector } from 'react-native-particles/entities/Vector';
import BurstAndMoveEmitter from '../react-native-particles/BurstAndMoveEmitter';

const { width, height } = Dimensions.get('window');

type Props = {};
export default class StarsToTarget extends Component<Props> {
  render() {
    return (
      <BurstAndMoveEmitter
        autoStart={false}
        numberOfParticles={10}
        interval={100}
        emissionRate={3}
        particleLife={3000}
        fromPosition={Vector(width / 2, height / 2)}
        finalPoint={Vector(width / 2, 2)}
        ref={emitter => (this.emitter = emitter)}
        radius={100}
      >
        <Image
          style={styles.coin}
          source={require('../assets/star.png')}
          resizeMode="stretch"
        />
      </BurstAndMoveEmitter>
    );
  }

  start() {
    this.emitter.start();
  }

  stopEmitting() {
    this.emitter.stopEmitting();
  }
}

const styles = StyleSheet.create({
  emitter: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0
  },
  coin: {
    width: 24,
    height: 24
  }
});
