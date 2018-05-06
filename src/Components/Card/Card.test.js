import React from 'react';
import { shallow, mount } from 'enzyme';
import Card from './Card';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';

describe('Card', () => {
  let card;

  beforeEach(() => {
    const mockTitleProp = 'DISTRICT';
    const mockDataProp = [{ "2009": 0.986 }];

    card = shallow(<Card title={ mockTitleProp } 
                         listOfData={ mockDataProp } 
                         removeCompareCard={ jest.fn() }
                   />);

  })

  it('matches the snapshot when card is created in cardContainer section', () => {

  })

  it('matches the snapshot when card is created in compare section', () => {

  })
})
