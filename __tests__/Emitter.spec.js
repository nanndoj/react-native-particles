//@flow

import React from 'react';
import { Image } from 'react-native';
import renderer from 'react-test-renderer';
import Emitter from '../Emitter';

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

describe('Emitter', () => {
  it('should consider child prop as a particle', () => {
    const component = renderer.create(
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
        width={500}
        height={500}
        fromPosition={{ x: 200, y: 200 }}
        gravity={0.2}
        ref={emitter => (this.emitter = emitter)}
      >
        <Image
          source={require('./../Example/assets/coin.png')}
          resizeMode="stretch"
        />
      </Emitter>
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('should throw an error when trying to render more than one child', () => {
    expect(() =>
      renderer.create(
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
          width={500}
          height={500}
          fromPosition={{ x: 200, y: 200 }}
          gravity={0.2}
          ref={emitter => (this.emitter = emitter)}
        >
          <Image
            source={require('./../Example/assets/coin.png')}
            resizeMode="stretch"
          />
          <Image
            source={require('./../Example/assets/coin.png')}
            resizeMode="stretch"
          />
        </Emitter>
      )
    ).toThrowError();
  });
});
