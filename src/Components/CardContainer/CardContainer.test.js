import React from 'react';
import { shallow, mount } from 'enzyme';
import CardContainer from './CardContainer.js';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import Card from '../Card/Card.js';

describe('CardContainer', () => {
  it('should match the snapshot with no cards', () => {
    const cardContainerSnapshot = renderer.create(<CardContainer repo={ [] }
                                           addCompareCard={ jest.fn() }
                                           removeCompareCard={ jest.fn() }
                                         />).JSON;

    expect(cardContainerSnapshot).toMatchSnapshot();
  })

  it('should match the snapshot with cards', () => {
    const mockProp = [{ 'DISTRICT': [{ "2009": 0.986 }],
                      selected: false 
                   }];
    const cardContainerSnapshot = renderer.create(<CardContainer repo={ mockProp }
                                           addCompareCard={ jest.fn() }
                                           removeCompareCard={ jest.fn() }
                                         />).JSON;

    expect(cardContainerSnapshot).toMatchSnapshot();
  }) 

})
