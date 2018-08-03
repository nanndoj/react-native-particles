/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import CoinsExplosion from './examples/CoinsExplosion';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <CoinsExplosion ref={emitter => (this.coinsExplosion = emitter)} />

        <Button
          title={'Coins explosion'}
          onPress={() => this.coinsExplosion.start()}
        />
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
  }
});
