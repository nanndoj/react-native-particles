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
import BurstAndMoveEmitter from '../BurstAndMoveEmitter';

const { width, height } = Dimensions.get('window');

type Props = {};
export default class CoinsExplosion extends Component<Props> {
  render() {
    return (
      <BurstAndMoveEmitter
        initialPoint={Vector(0, 0)}
        finalPoint={Vector(0, -height/2)}
        radius={100}
        autoStart={true}
        numberOfParticles={50}
      >
        <Image style={styles.coin} source={require('../assets/coin.png')} resizeMode="stretch" />
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
