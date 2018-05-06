import React, { Component } from 'react';
import './App.css';
import CardContainer from '../CardContainer/CardContainer.js';
import Search from '../Search/Search.js';
import Compare from '../Compare/Compare.js';
import DistrictRepository from '../../helper.js';
import data from '../../data/kindergartners_in_full_day_program.js';
const repoHelper = new DistrictRepository(data);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repo: repoHelper.findAllMatches(),
      compareCards: [],
      compareData: null
    };
  }

  updateRepoInState = (userInput) => {
    const filteredDistricts = repoHelper.findAllMatches(userInput);
    
    this.setState({ repo: filteredDistricts });
  }

  addCompareCard = (districtTitle) => {
    if(this.state.compareCards.length < 2) {
      const matchingDistrict = this.state.repo.find(district => {
        return Object.keys(district)[0] === districtTitle; 
      }); 

      this.setState({ compareCards: [...this.state.compareCards, matchingDistrict] }, this.getCompareData);
      this.changeSelectedInState(districtTitle);
    }
  }

  getCompareData = () => {
    if(this.state.compareCards.length === 2) {
      const district1Title = Object.keys(this.state.compareCards[0])[0];
      const district2Title = Object.keys(this.state.compareCards[1])[0];
      const compareData = repoHelper.compareDistrictAverages(district1Title, district2Title);

      this.setState({ compareData });
    }
  }

  changeSelectedInState = (districtTitle) => {
    const newRepo = this.state.repo.map(district => {
      if (Object.keys(district)[0] === districtTitle) {
        district.selected = !district.selected;
      }
      return district;
    });

    this.setState({ repo: newRepo });
  }

  removeCompareCard = (districtTitle) => {
    const newCompareCards = this.state.compareCards.filter(district => {
      return Object.keys(district)[0] !== districtTitle;
    });

    this.setState({ compareCards: newCompareCards });
    this.changeSelectedInState(districtTitle);
  }

  render() {
    return (
      <div className="page-background">
        <h1 className="header">Welcome To Headcount 2.0</h1>
        <Search updateRepoInState={ this.updateRepoInState } />
        <Compare  compareCards={ this.state.compareCards }
                  compareData={ this.state.compareData } 
                  removeCompareCard={ this.removeCompareCard }/>
        <CardContainer  repo={ this.state.repo } 
                        addCompareCard={ this.addCompareCard }
                        removeCompareCard={ this.removeCompareCard } /> 
      </div>
    );
  }

}

export default App;
