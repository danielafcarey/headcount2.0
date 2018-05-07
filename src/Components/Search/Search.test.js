import React from 'react';
import Search from './search';
import renderer from 'react-test-renderer';

describe('Search', () => {

  it('matches the snapshot', () => {
    const searchSnapshot = renderer.create(
      <Search updateRepoInState={ jest.fn() } />
    );
    
    expect(searchSnapshot).toMatchSnapshot();
  });

});
