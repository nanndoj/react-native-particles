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
    const { ref } = this.props;
    return (
      <Emitter
        autoStart={true}
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
        style={styles.emitter}
        gravity={0.2}
        ref={emitter => (this.emitter = emitter)}
      >
        {particle =>
          particle.id % 2 === 0 ? (
            <Image
              style={styles.coin}
              source={require('../assets/coin.png')}
              resizeMode="stretch"
            />
          ) : (
            <Image
              style={styles.coin}
              source={require('../assets/star.png')}
              resizeMode="stretch"
            />
          )
        }
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
