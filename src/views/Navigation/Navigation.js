import React, { Component } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const options = [
  { value: 'ATLANTA', label: 'ATLANTA' },
  { value: 'BOSTON', label: 'BOSTON' },
  { value: 'CHICAGO', label: 'CHICAGO' },
  { value: 'DALLAS', label: 'DALLAS' },
  { value: 'DENVER', label: 'DENVER' },
  { value: 'KANSAS CITY', label: 'KANSAS CITY' },
  { value: 'NEW YORK', label: 'NEW YORK' },
  { value: 'PHILADELPHIA', label: 'PHILADELPHIA' },
  { value: 'SAN FRANCISCO', label: 'SAN FRANCISCO' },
  { value: 'SEATTLE', label: 'SEATTLE' }
];

const propTypes = {
    children: PropTypes.node,
  };
  
const defaultProps = {};

export default class Navigation extends Component {
    constructor(props) {
        super(props);

        this.handleChanges = this.handleChanges.bind(this);
        this.state  = {
            selectedOption: null,
            }

        //this.onDismiss = this.onDismiss.bind(this);    

    }

    getInitialState () {
      return {
        navExpanded: false
      }
    }

    setNavExpanded(expanded) {
      this.setState({ navExpanded: expanded });
    }
  
    closeNav() {
      this.setState({ navExpanded: false });
    }

    handleChanges(selectedOption) {
        this.setState({ selectedOption });
      }


  render() {
    const { selectedOption } = this.state;

    return (      
      <Select className="w-10 p-3" style="background-color: #eee;"
        value={selectedOption}
        placeholder={" Please choose a region"}
        autoBlur={true}
        onToggle={this.setNavExpanded}
        expanded={this.state.navExpanded}
        onChange={this.handleChanges}
        options={options}
      />
    );
  }

}


Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;
//export default Navigation;