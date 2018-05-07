import React from 'react';
import { shallow } from 'enzyme';
import Card from './Card';
import renderer from 'react-test-renderer';

describe('Card', () => {

  it('matches the snapshot when card is created in cardContainer section', () => {
    const cardSnapshot = renderer.create(
      <Card 
        selected={ false }
        section=''
        title='COLORADO'
        listOfData={[{ '2009': 1 }]}
        addCompareCard={ jest.fn() }
        removeCompareCard={ jest.fn() }
      />
    );

    expect(cardSnapshot).toMatchSnapshot();
  });

  it('matches the snapshot when card is created in compare section', () => {
    const cardSnapshot = renderer.create(
      <Card 
        selected={ false }
        section='compare'
        title='COLORADO'
        listOfData={[{ '2009': 1 }]}
        addCompareCard={ jest.fn() }
        removeCompareCard={ jest.fn() }
      />
    );

    expect(cardSnapshot).toMatchSnapshot();
  });

  it('matches the snapshot if a card is selected', () => {
    const cardSnapshot = renderer.create(
      <Card 
        selected={ true }
        section=''
        title='COLORADO'
        listOfData={[{ '2009': 1 }]}
        addCompareCard={ jest.fn() }
        removeCompareCard={ jest.fn() }
      />
    );

    expect(cardSnapshot).toMatchSnapshot();
  });

  it('calls removeCompareCard if card is clicked in the compare section', () => {
    const spy = jest.fn();
    const card = shallow(
      <Card 
        selected={ false }
        section='compare'
        title='COLORADO'
        listOfData={[{ '2009': 1 }]}
        addCompareCard={ jest.fn() }
        removeCompareCard={ spy }
      />
    );

    card.simulate('click');

    expect(spy).toHaveBeenCalled(); 
  });

  it('calls addCompareCard if card is clicked in the cardContainer section', () => {
    const spy = jest.fn();
    const card = shallow(
      <Card 
        selected={ false }
        section=''
        title='COLORADO'
        listOfData={[{ '2009': 1 }]}
        addCompareCard={ spy }
        removeCompareCard={ jest.fn() }
      />
    );

    card.simulate('click');

    expect(spy).toHaveBeenCalled(); 
  });

});
