import React, { Component } from 'react';
import { Alert, Card, CardBody, CardHeader, Col, Row, Button } from 'reactstrap';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BusSchoolIcon, AccessPointIcon  } from 'mdi-react';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

//http://storymaps.esri.com/stories/2014/nuclear-moonscape/
//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_timeline
//https://codepen.io/bcarvalho/pen/RZqmZX

const line = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const bar = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const doughnut = {
  labels: [
    'Red',
    'Green',
    'Yellow',
  ],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};

const radar = {
  labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(179,181,198,0.2)',
      borderColor: 'rgba(179,181,198,1)',
      pointBackgroundColor: 'rgba(179,181,198,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(179,181,198,1)',
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      pointBackgroundColor: 'rgba(255,99,132,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255,99,132,1)',
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};

const pie = {
  labels: [
    'Red',
    'Green',
    'Yellow',
  ],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
      ],
    }],
};

const polar = {
  datasets: [
    {
      data: [
        11,
        16,
        7,
        3,
        14,
      ],
      backgroundColor: [
        '#FF6384',
        '#4BC0C0',
        '#FFCE56',
        '#E7E9ED',
        '#36A2EB',
      ],
      label: 'My dataset' // for legend
    }],
  labels: [
    'Red',
    'Green',
    'Yellow',
    'Grey',
    'Blue',
  ],
};

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
}

class Demographics extends Component {
  constructor(props) {
    super(props);


    this.state = {
      visible: true,
    };

    this.onDismiss = this.onDismiss.bind(this);    
  }
  
  componentDidMount() {
    let sampleIconClick = function(){
      alert("i click");
    }
   
  }
 
  
  
  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <div className="animated fadeIn">        
	
      <VerticalTimeline>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        animate={ true }
        date="2011 - present"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        iconOnClick={ this.sampleIconClick }
        icon={<AccessPointIcon />} 
      >
        <h3 className="vertical-timeline-element-title">Demographics</h3>
        <h4 className="vertical-timeline-element-subtitle">2011-present</h4>        
        <Alert color="info" isOpen={this.state.visible} >
                  I am an alert and I can be dismissed!
                </Alert>        
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2010 - 2011"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<AccessPointIcon />} 
      >
        <h3 className="vertical-timeline-element-title">Demographics</h3>
        <h4 className="vertical-timeline-element-subtitle">2010 - 2011</h4>        
        <Card>
            <CardHeader>
              Line Chart
              <div className="card-header-actions">               
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Line data={line} options={options} />
              </div>
            </CardBody>
          </Card>      
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2008 - 2010"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<BusSchoolIcon />} 
      >
        <h3 className="vertical-timeline-element-title">Demographics</h3>
        <h4 className="vertical-timeline-element-subtitle">2008 - 2010</h4>
   
        <Alert color="info" isOpen={this.state.visible} >
                  I am an alert and I can be dismissed!
                </Alert>
   
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2006 - 2008"
        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
        icon={<BusSchoolIcon />}
      >
        <h3 className="vertical-timeline-element-title">Demographics</h3>
        <h4 className="vertical-timeline-element-subtitle">2006 - 2008</h4>

        <Alert color="info" isOpen={this.state.visible} >
                  I am an alert and I can be dismissed!
                </Alert>
   
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="April 2013"
        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
        icon={<BusSchoolIcon />}
      >
        <h3 className="vertical-timeline-element-title">Demographics</h3>
        <h4 className="vertical-timeline-element-subtitle">April 2013"</h4>
       
        <Alert color="info" isOpen={this.state.visible} >
                  I am an alert and I can be dismissed!
                </Alert>
        
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="November 2012"
        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
        icon={<BusSchoolIcon />}
      >
        <h3 className="vertical-timeline-element-title">Demographics</h3>
        <h4 className="vertical-timeline-element-subtitle">November 2012</h4>
        
        <Alert color="info" isOpen={this.state.visible} >
                  I am an alert and I can be dismissed!
                </Alert>
        
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="2002 - 2006"
        iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
        icon={<BusSchoolIcon />}
      >
        <h3 className="vertical-timeline-element-title">Demographics</h3>
        <h4 className="vertical-timeline-element-subtitle">2002 - 2006</h4>
       
        <Card>
            <CardHeader>
              Pie Chart
              <div className="card-header-actions">                
              </div>
            </CardHeader>
            <CardBody>
              <div className="chart-wrapper">
                <Pie data={pie} />
              </div>
            </CardBody>
          </Card>
        
      </VerticalTimelineElement>
      <VerticalTimelineElement
        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
        icon={<BusSchoolIcon />}
      />
    </VerticalTimeline>

    </div>
    );
  }
}

export default Demographics;
