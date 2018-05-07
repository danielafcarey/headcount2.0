import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = (props) => {
  const { 
    section, 
    title, 
    listOfData, 
    addCompareCard, 
    removeCompareCard 
  } = props; 
  let { selected } = props;
  const listItems = listOfData.map((dataObj, index) => {
    const year = Object.keys(dataObj)[0];
    const dataNum = Object.values(dataObj)[0];
    const listItem = `${year}: ${dataNum}`;

    let dataStyle; 
    dataNum >= 0.5 ? dataStyle = 'above' : dataStyle = 'below';

    return ( 
      <li className={ dataStyle } key={ `listItem${index}` }>
        { listItem }
      </li>
    );
  });

  let clickFunc;
  if (section === 'compare' || selected) {
    clickFunc = () => {
      removeCompareCard(title); 
    };
  } else {
    clickFunc = () => {
      selected ? selected = false : selected = true;
      addCompareCard(title);
    };
  }

  let selectClass;
  selected ? selectClass = 'selected' : selectClass = '';

  return (
    <div 
      className={ `card ${selectClass}` } 
      onClick={ clickFunc }
    >
      <h3 className='title'>{ title }</h3>
      <ul className='list-items'>{ listItems }</ul>
    </div>
  );

};

Card.propTypes = {
  selected: PropTypes.bool,
  section: PropTypes.string,
  title: PropTypes.string.isRequired, 
  listOfData: PropTypes.array.isRequired,
  addCompareCard: PropTypes.func,
  removeCompareCard: PropTypes.func.isRequired
};

export default Card;
