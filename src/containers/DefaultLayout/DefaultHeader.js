import React, { Component } from 'react';
import { Badge, Button, DropdownItem,ButtonDropdown, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink,Col, Row  } from 'reactstrap';
import PropTypes from 'prop-types';
import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/gps.svg'
import sygnet from '../../assets/img/brand/sygnet.svg'
import Navigation from '../../../src/views/Navigation/Navigation'
import DateRangePicker from 'react-bootstrap-daterangepicker';
// you will need the css that comes with bootstrap@3. if you are using
// a tool like webpack, you can do the following:
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';
import {withRouter} from 'react-router-dom'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.goOHOHome = this.goOHOHome.bind(this)
    this.goDCOHome = this.goDCOHome.bind(this)
    this.state = {
      dropdownOpen: new Array(19).fill(false),
    };
  }

  goOHOHome() {
    this.props.history.push('/OHO/Home');
  }

  goDCOHome() {
    this.props.history.push('/DCO/Home');
  }


  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }
  
  toggleCalender(){


  }
  render() {

    document.body.addEventListener('nv-enter', function (event) {
      // logic
      console.log(event);
   });

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 25, height: 25, value:"submit" , alt: 'CoreUI Logo' }}
          minimized={{ src: logo, width: 30, height: 30, value:"submit", alt: 'CoreUI Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {/* <Col sm xs="12" className="text-center mt-3"> */}
                <Button color="primary active" aria-label="DCO" onClick={this.goDCOHome}>
                  <i size="lg" className="fa fa-lightbulb-o"></i>&nbsp;DCO
                </Button>
                &nbsp;&nbsp;&nbsp;&nbsp;
        {/* </Col> */}
                <Button color="secondary" aria-label="OHO" onClick={this.goOHOHome}>
                  <i size="lg" className="fa fa-lightbulb-o"></i>&nbsp;OHO
                </Button>

        {/* <ButtonDropdown icon="fa fa-map" className="btn btn-default" direction="down"  isOpen={this.state.dropdownOpen[17]} toggle={() => { this.toggle(17); }}>
                  <DropdownToggle caret color="primary">Navigation */}
                    
                  {/* <i className="cui-map icons font-1xl d-block mt-4">Navigation</i> */}
                  {/* </DropdownToggle>
                  <DropdownMenu> */}
                  {/* <ButtonDropdown direction="right" className="mr-1" isOpen={false} toggle={() => { this.toggle(17); }}>
                    <DropdownToggle caret size="lg">
                      Region
                    </DropdownToggle>
                    <DropdownMenu>                    
                    <Navigation/>  
                    </DropdownMenu>
                  </ButtonDropdown> */}
           
                    {/* <DropdownItem>Region  <Navigation/>     </DropdownItem>                    
                    <DropdownItem>Area</DropdownItem>
                    <DropdownItem>District</DropdownItem>
                    <DropdownItem>Office</DropdownItem>
                    <DropdownItem>Zip</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown> */}


                  <DateRangePicker startDate="7/31/2018" aria-label="daterange" endDate="8/30/2018" showDropdowns>
                  <ButtonDropdown  icon="fa fa-map" className="btn btn-default" isOpen={false} toggle={() => { this.toggleCalender(); }} direction="right">
                  <span className="cui-contrast"></span> 
                  <DropdownToggle caret color="secondary">
                  <i size="lg" className="fa fa-lightbulb-o"></i>&nbsp;Date
                  </DropdownToggle>
                  </ButtonDropdown>
                  </DateRangePicker>

                  
                

        {/* <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#/users">Users</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem>
        </Nav> */}
        <Nav className="ml-auto" navbar>
          {/* <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger">5</Badge></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-list"></i></NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-location-pin"></i></NavLink>
          </NavItem> */}
          <AppHeaderDropdown direction="down">
            {/* <DropdownToggle nav>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle> */}
            <DropdownMenu right style={{ right: 'auto' }}>
              {/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem> */}
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              {/* <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
              <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem> */}
              <DropdownItem><i className="fa fa-lock"></i> Logout</DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default withRouter(DefaultHeader);

