/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { Vector } from 'react-native-particles/';
import { BurstAndMoveEmitter } from 'react-native-particles';

const { width, height } = Dimensions.get('window');

type Props = {};
export default class StarsToTarget extends Component<Props> {
  render() {
    return (
      <BurstAndMoveEmitter
        autoStart={false}
        numberOfParticles={10}
        interval={100}
        emissionRate={4}
        particleContainerStyle={styles.particleContainer}
        particleLife={2000}
        fromPosition={Vector(width / 2, height / 2)}
        finalPoint={Vector(width / 2, 2)}
        ref={emitter => (this.emitter = emitter)}
        radius={100}
      >
        <Image style={styles.star} source={require('../assets/star.png')} resizeMode="stretch" />
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
  particleContainer: {
    elevation: 2,
    zIndex: 2,
  },
  star: {
    width: 24,
    height: 24
  }
});
