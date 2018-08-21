/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { Emitter } from 'react-native-particles';

import Spin from '../animations/Spin';

const { width, height } = Dimensions.get('window');

type Props = {
  colors: string[],
  ref: ConfettiEmitter => void
};

export default class ConfettiEmitter extends Component<Props> {
  render() {
    const { colors } = this.props;
    return (
      <Emitter
        autoStart={false}
        numberOfParticles={60}
        interval={100}
        emissionRate={3}
        particleLife={10000}
        direction={90}
        spread={120}
        speed={8}
        segments={60}
        width={width}
        height={height}
        fromPosition={() => ({ x: Math.round(Math.random() * width), y: 0 })}
        style={styles.emitter}
        gravity={0.3}
        ref={emitter => (this.emitter = emitter)}
      >
        <Confetti colors={colors} />
      </Emitter>
    );
  }

  start() {
    this.emitter.start();
  }
}

class Confetti extends Component<Props> {
  static defaultProps = {
    colors: ['red', 'blue', 'green']
  };

  constructor(props) {
    super(props);
    const random = Math.random();
    this.duration = Math.max(random * 10000, 5000);
    this.counterClockWise = random > 0.5;
    this.color =
      props.colors[Math.round((random * 10) % (props.colors.length - 1))];
  }

  render() {
    return (
      <Spin duration={this.duration} counterClockWise={this.counterClockWise}>
        <View style={[styles.confetti, { backgroundColor: this.color }]} />
      </Spin>
    );
  }
}

const styles = StyleSheet.create({
  emitter: {
    position: 'absolute',
    left: 0,
    top: -10,
    bottom: 0,
    right: 0
  },
  confetti: {
    width: 4,
    height: 8,
    backgroundColor: 'red'
  }
});
