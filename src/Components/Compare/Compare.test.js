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
            />
    );
  })

  it('renders without crashing', () => {

  })

})
