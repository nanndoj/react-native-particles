//@flow
import React from 'react';

import { StyleSheet, Animated, Easing } from 'react-native';
import type { InterpolationConfigType } from 'react-native/Libraries/Animated/src/nodes/AnimatedInterpolation';

import type { Element } from 'react';
import type { VectorType } from './entities/Vector';

export interface IAnimatedParticle {
  /** Number of particles to emit */
  path: VectorType[];

  /** The position from where the particles should be generated */
  lifetime: number;

  /** Function triggered when the particle reaches the lifetime */
  onLifeEnds: () => any;

  /** Start the animation on the initialization */
  autoStart: boolean;

  children: Element<any>;
}

interface IAnimatedParticleState {
  animatedValue: Animated.Value;
  opacityValue: Animated.Value;
  translateX: InterpolationConfigType;
  translateY: InterpolationConfigType;
}

type InterpolationConfig = {
  translateX: InterpolationConfigType,
  translateY: InterpolationConfigType
};

export default class AnimatedParticle extends React.Component<
  IAnimatedParticle,
  IAnimatedParticleState
> {
  static defaultProps = {};

  constructor(props: IAnimatedParticle) {
    super(props);

    this.state = {
      animatedValue: new Animated.Value(0),
      opacityValue: new Animated.Value(1),
      ...this._createInterpolations(props.path)
    };
  }

  render() {
    const { children } = this.props;
    const { animatedValue, translateX, translateY, opacityValue } = this.state;

    const animatedStyle = {
      opacity: opacityValue,
      transform: [
        {
          translateX: animatedValue.interpolate(translateX)
        },
        {
          translateY: animatedValue.interpolate(translateY)
        }
      ]
    };

    return (
      <Animated.View style={[styles.particle, animatedStyle]}>
        {children}
      </Animated.View>
    );
  }

  componentDidMount() {
    const { autoStart } = this.props;
    autoStart && this.start();
  }

  start = () => {
    const { path, lifetime, onLifeEnds } = this.props;
    const { animatedValue, opacityValue } = this.state;

    Animated.parallel([
      Animated.timing(animatedValue, {
        toValue: path.length,
        duration: lifetime,
        useNativeDriver: true
      }),
      Animated.timing(opacityValue, {
        toValue: 0,
        ease: Easing.inOut(Easing.quad),
        delay: lifetime * 0.8,
        duration: lifetime * 0.2,
        useNativeDriver: true
      })
    ]).start(() => {
      onLifeEnds && onLifeEnds();
    });
  };

  _createInterpolations = (path: VectorType[]): InterpolationConfig => {
    const segments = path.length;

    const inputRange: number[] = new Array(segments);
    const outputRangeX: number[] = new Array(segments);
    const outputRangeY: number[] = new Array(segments);

    for (let i = 0; i < path.length; i++) {
      inputRange[i] = i;
      outputRangeX[i] = path[i].x;
      outputRangeY[i] = path[i].y;
    }

    return {
      translateX: {
        inputRange,
        outputRange: outputRangeX
      },
      translateY: {
        inputRange,
        outputRange: outputRangeY
      }
    };
  };
}

const styles = StyleSheet.create({
  stage: {
    position: 'relative',
    overflow: 'hidden',
    flex: 1
  },
  particle: {
    position: 'absolute'
  }
});
