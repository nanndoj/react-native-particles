/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Button
} from 'react-native';

import { Emitter } from 'react-native-particles';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu'
});

const { width, height } = Dimensions.get('window');

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Emitter
          autoStart={false}
          numberOfParticles={1000}
          emissionRate={20}
          interval={750}
          particleLife={1000}
          direction={-90}
          spread={360}
          width={width}
          height={height}
          segments={20}
          speed={8}
          gravity={0.2}
          fromPosition={() => ({ x: width / 2 - 50, y: height / 2 - 160 })}
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 999 }}
          ref={emitter => (this.emitter = emitter)}
        >
          <Image
            source={require('./assets/star.png')}
            resizeMode="stretch"
            style={{ width: 100, height: 100 }}
          />
        </Emitter>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button title={'Click me'} onPress={() => this.emitter.start()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
