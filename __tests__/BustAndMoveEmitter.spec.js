//@flow

import React from 'react';
import { Image } from 'react-native';
import renderer from 'react-test-renderer';
import Emitter from '../Emitter';
import { Vector } from 'react-native-particles/entities/Vector';

jest.useFakeTimers();
Date.now = jest.fn(() => 1503187200000);

jest.mock('Animated', () => {
  const ActualAnimated = require.requireActual('Animated');
  return {
    ...ActualAnimated,
    timing: (value, config) => {
      return {
        start: callback => {
          value.setValue(config.toValue);
          callback && callback();
        }
      };
    }
  };
});

describe('BostAndMoveEmitter', () => {
  it('should consider child prop as a particle', () => {
    const component = renderer.create(
      <BostAndMoveEmitter
        autoStart={true}
        numberOfParticles={10}
        interval={100}
        emissionRate={3}
        particleLife={3000}
        fromPosition={Vector(width / 2, height / 2)}
        finalPoint={Vector(width / 2, 2)}
        ref={emitter => (this.emitter = emitter)}
        radius={100}
      >
        <Image source={require('./../Example/assets/coin.png')} resizeMode="stretch" />
      </BostAndMoveEmitter>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should throw an error when trying to render more than one child', () => {
    expect(() =>
      renderer.create(
        <BostAndMoveEmitter
          autoStart={true}
          numberOfParticles={10}
          interval={100}
          emissionRate={3}
          particleLife={3000}
          fromPosition={Vector(width / 2, height / 2)}
          finalPoint={Vector(width / 2, 2)}
          ref={emitter => (this.emitter = emitter)}
          radius={100}
        >
          <Image source={require('./../Example/assets/coin.png')} resizeMode="stretch" />
          <Image source={require('./../Example/assets/coin.png')} resizeMode="stretch" />
        </BostAndMoveEmitter>
      )
    ).toThrowError();
  });
});
