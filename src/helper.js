export default class DistrictRepository {
  constructor(dataSet) {
    this.stats = this.cleanData(dataSet);
  }

  cleanData = (dataSet) => {
    return dataSet.reduce((cleanData, dataObj) => {
      const upperCaseLocation = dataObj.Location.toUpperCase();

      if (!cleanData[upperCaseLocation]) {
        cleanData[upperCaseLocation] = [];
      }

      let dataNum;
      if (typeof dataObj.Data === 'string') {
        dataNum = 0; 
      } else {
        dataNum = parseFloat(dataObj.Data.toFixed(3));
      }

      const newDataObj = { [dataObj.TimeFrame]: dataNum };
      cleanData[upperCaseLocation] = [
        ...cleanData[upperCaseLocation], 
        newDataObj
      ];

      return cleanData;
    }, {});
  }

  findByName = (district) => {
    if (!district) {
      return undefined;
    }

    const upperCaseDistrict = district.toUpperCase();
    if (!this.stats[upperCaseDistrict]) {
      return undefined;
    } 

    const dataObj = Object.assign({}, 
      ...this.stats[upperCaseDistrict].map(districtObj => districtObj)
    );
    return Object.assign({}, {stats: dataObj, location: upperCaseDistrict}); 
  }

  findAllMatches = (userInput) => {
    const statsKeys = Object.keys(this.stats);
    const allDistrictData = statsKeys.map(district => {
      return { 
        [district]: this.stats[district], 
        selected: false         
      };
    });

    if (!userInput) {
      return allDistrictData; 
    } else {
      const upperCaseDistrict = userInput.toUpperCase();
      return allDistrictData.filter(districtObj => {
        return Object.keys(districtObj)[0].includes(upperCaseDistrict);
      });
    }

  }

  findAverage = (district) => {
    const districtData = this.findByName(district); 
    const dataValues = Object.values(districtData.stats);
    const dataSum = dataValues.reduce((dataSum, num) => dataSum + num, 0);
    const average = parseFloat((dataSum / dataValues.length).toFixed(3));

    return average; 
  }

  compareDistrictAverages = (district1, district2) => {
    const district1Average = this.findAverage(district1);
    const district2Average = this.findAverage(district2);
    const compared = parseFloat(
      (district1Average / district2Average).toFixed(3)
    );

    return { 
      [district1.toUpperCase()]: district1Average,
      [district2.toUpperCase()]: district2Average,
      compared
    };
  }
}


