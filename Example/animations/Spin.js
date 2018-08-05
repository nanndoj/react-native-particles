import React, { Component } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';

export default class Spin extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0)
    };
  }
  render() {
    const { children, counterClockWise } = this.props;
    return (
      <Animated.View
        style={{
          transform: [
            {
              rotate: this.state.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: counterClockWise
                  ? ['0deg', '360deg']
                  : ['360deg', '0deg']
              })
            }
          ]
        }}
      >
        {children}
      </Animated.View>
    );
  }

  componentDidMount() {
    const { animatedValue } = this.state;
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: this.props.duration,
          useNativeDriver: true
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true
        })
      ])
    ).start();
  }
}
