import React from 'react';
import CardContainer from './CardContainer.js';
import renderer from 'react-test-renderer';

describe('CardContainer', () => {

  it('should match the snapshot with no cards', () => {
    const cardContainerSnapshot = renderer.create(
      <CardContainer 
        repo={ [] }
        addCompareCard={ jest.fn() }
        removeCompareCard={ jest.fn() }
      />
    ).JSON;

    expect(cardContainerSnapshot).toMatchSnapshot();
  });

  it('should match the snapshot with cards', () => {
    const mockProp = [
      { 'DISTRICT': [{ "2009": 0.986 }],
        selected: false 
      }
    ];
    const cardContainerSnapshot = renderer.create(
      <CardContainer 
        repo={ mockProp }
        addCompareCard={ jest.fn() }
        removeCompareCard={ jest.fn() }
      />
    ).JSON;

    expect(cardContainerSnapshot).toMatchSnapshot();
  }); 

});
