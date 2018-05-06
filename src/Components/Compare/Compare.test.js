import React from 'react';
import { shallow, mount } from 'enzyme';
import Compare from './Compare.js';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';

describe('Compare', () => {
  let compare;

  beforeEach(() => {
    compare = shallow(<Compare compareCards={[]} 
                     compareData={{}}
                     removeCompareCard={jest.fn()}
            />);
  })

  it('matches the snapshot with no cards', () => {
    const compareSnapshot = renderer.create(<Compare compareCards={[]} 
                                                     compareData={{}}
                                                     removeCompareCard={jest.fn()} 
                            />).JSON;
    expect(compareSnapshot).toMatchSnapshot();
  })

  it('matches the snapshot when one card is in compareCards prop', () => {
    const mockCompareCards = [
      { 'COLORADO': [{'2009': 1}], 
        selected: false 
      }
    ];
    const compareSnapshot = renderer.create(<Compare compareCards={ mockCompareCards } 
                                                     compareData={{}}
                                                     removeCompareCard={jest.fn()} 
                            />).JSON;
    expect(compareSnapshot).toMatchSnapshot();

  })

  it('matches the snapshot when two cards in compareCards prop', () => {
    const mockCompareCards = [
      { 'COLORADO': [{'2009': 1}], 
        selected: true 
      },
      { 'AGATE 300': [{'2010': 0}], 
        selected: true 
      }
    ];
    const mockCompareData = {
      'COLORADO': 1,
      'AGATE 300': 0,
      compared: 1
    };
    const compareSnapshot = renderer.create(<Compare compareCards={ mockCompareCards } 
                                                     compareData={ mockCompareData }
                                                     removeCompareCard={jest.fn()} 
                            />).JSON;
    
    expect(compareSnapshot).toMatchSnapshot();
  })

})
