import React from 'react';
import { shallow, mount } from 'enzyme';
import CardContainer from './CardContainer.js';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';
import Card from '../Card/Card.js';

describe('CardContainer', () => {
  let cardContainer;
  const mockProp = [{ 'DISTRICT': [{ "2009": 0.986 }],
                      selected: false 
                   }];

  beforeEach(() => {
    cardContainer = shallow(<CardContainer repo={ mockProp }
                                           addCompareCard={ jest.fn() }
                                           removeCompareCard={ jest.fn() }
                            />)
  })

  it('should render correct amount of card based on the props passed', () => {
    expect(cardContainer.find(Card).length).toEqual(1);
  })

  it('should render a card coponent with the correct props', () => {
    const expected = { 
      title: 'DISTRICT', 
      listOfData: [{ "2009": 0.986 }], 
      selected: false,
      removeCompareCard: jest.fn(),
      addCompareCard: jest.fn()
    };

    expect(cardContainer.find(Card).props()).toMatchObject(expected);
  })

})
