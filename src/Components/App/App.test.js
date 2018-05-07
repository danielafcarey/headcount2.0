import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import renderer from 'react-test-renderer';
import DistrictRepository from '../../helper.js';
import kinderData from '../../data/kindergartners_in_full_day_program.js';
const repoHelper = new DistrictRepository(kinderData);

describe('App', () => {

  it('it should have a default state of repo that includes all district data, compareCards as empty array, and compareData as null', () => {
    const app = shallow(<App />);

    expect(app.state('repo')).toEqual(repoHelper.findAllMatches());
    expect(app.state('compareCards')).toEqual([]);
    expect(app.state('compareData')).toEqual(null);
  });
  
  it('should match the snapshot', () => {
    const appSnapshot = renderer.create(<App />).JSON;

    expect(appSnapshot).toMatchSnapshot();
  });

  it('updates the repo in state when given a new search value', () => {
    const mockValue = 'MEEKER RE1';
    const expectedRepoState = [
      { 'MEEKER RE1': [
          {2007:0},
          {2006:0},
          {2005:0},
          {2004:0},
          {2008:0},
          {2009:0},
          {2010:0.875},
          {2011:0},
          {2012:0},
          {2013:0},
          {2014:0}
        ],
        selected: false
      }
    ]; 
    const app = shallow(<App />);

    app.instance().updateRepoInState(mockValue);

    expect(app.state('repo')).toEqual(expectedRepoState);
  });

  it('updates the compareData in state when two cards have been added to compareCards', () => {
    const app = shallow(<App />);
    const mockCompareCards = [
      { 'MEEKER RE1': [
          {2007:0},
          {2006:0},
          {2005:0},
          {2004:0},
          {2008:0},
          {2009:0},
          {2010:0.875},
          {2011:0},
          {2012:0},
          {2013:0},
          {2014:0}
        ],
        selected: false
      },
      { 'AGUILAR REORGANIZED 6': [
          {2007:1},
          {2006:1},
          {2005:1},
          {2004:1},
          {2008:1},
          {2009:1},
          {2010:1},
          {2011:1},
          {2012:1},
          {2013:1},
          {2014:1}
        ],
        selected: false
      }
    ];
    const expectedCompareData = {
      'MEEKER RE1': 0.08,
      'AGUILAR REORGANIZED 6': 1,
      compared: 0.08
    };

    app.setState({ compareCards: mockCompareCards });
    app.instance().getCompareData();

    expect(app.state('compareData')).toEqual(expectedCompareData);
  });

  it('updates compareCards in state when a card has been selected', () => {
    const app = shallow(<App />);
    const expectedCompareCards = [ 
      { 'AGUILAR REORGANIZED 6': [
          {2007:1},
          {2006:1},
          {2005:1},
          {2004:1},
          {2008:1},
          {2009:1},
          {2010:1},
          {2011:1},
          {2012:1},
          {2013:1},
          {2014:1}
        ],
        selected: true 
      }
    ];

    app.instance().addCompareCard('AGUILAR REORGANIZED 6');

    expect(app.state('compareCards')).toEqual(expectedCompareCards);
  });

  it('updates selected value on card in repo in state when a card has been selected', () => {
    const app = shallow(<App />);
    const selectedTitle = 'AGUILAR REORGANIZED 6';
    const matchingCard = app.state('repo').find(card => card[selectedTitle]);

    expect(matchingCard.selected).toEqual(false);
    
    app.instance().changeSelectedInState(selectedTitle);

    expect(matchingCard.selected).toEqual(true);
  });

  it('removes a card from compareCards in state', () => {
    const app = shallow(<App />);
    const expectedResult = [];
    const compareCardsInitialState = [ 
      { 'AGUILAR REORGANIZED 6': [
          {2007:1},
          {2006:1},
          {2005:1},
          {2004:1},
          {2008:1},
          {2009:1},
          {2010:1},
          {2011:1},
          {2012:1},
          {2013:1},
          {2014:1}
        ],
        selected: true 
      }
    ];

    app.setState({ compareCards: compareCardsInitialState });

    app.instance().removeCompareCard('AGUILAR REORGANIZED 6');

    expect(app.state('compareCards')).toEqual(expectedResult);
  });

});

