import React from 'react';
import { shallow, mount } from 'enzyme';
import Search from './search';
import PropTypes from 'prop-types';
import renderer from 'react-test-renderer';

describe('Search', () => {

  it('matches the snapshot', () => {
    const searchSnapshot = renderer.create(<Search updateRepoInState={ jest.fn() } />);
    
    expect(searchSnapshot).toMatchSnapshot();
  })
})
