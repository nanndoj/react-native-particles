/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Image } from 'react-native';

import { Emitter } from 'react-native-particles';

const { width, height } = Dimensions.get('window');

type Props = {};
export default class CoinsExplosion extends Component<Props> {
  render() {
    return (
      <Emitter
        autoStart={false}
        numberOfParticles={50}
        interval={200}
        emissionRate={25}
        particleLife={3000}
        direction={-90}
        spread={150}
        speed={8}
        segments={100}
        width={width}
        height={height}
        fromPosition={{ x: width / 2, y: height / 2 }}
        particleStyle={styles.emitter}
        gravity={0.2}
        ref={emitter => (this.emitter = emitter)}
      >
        <Image
          style={styles.coin}
          source={require('../assets/coin.png')}
          resizeMode="stretch"
        />
      </Emitter>
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
  coin: {
    width: 24,
    height: 24
  }
});
