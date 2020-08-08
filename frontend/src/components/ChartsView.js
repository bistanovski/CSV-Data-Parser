import React from 'react';
import queryString from 'query-string';

import '@blueprintjs/table/lib/css/table.css';
import { Cell, Column, Table } from "@blueprintjs/table";

import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

import Backend from '../Backend';

const ChartsViewStyle = {
    textAlign: 'center',
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    gap: '50px'
}

const ChartTitleStyle = {
    textAlign: 'center',
    backgroundColor: '#282c34',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '30px'
}

// Resolves charts dependancy
charts(FusionCharts);

const dataSource = {
  chart: {
    caption: "Average Score",
    yaxisname: "Score",
    subcaption: "2012-2016",
    showhovereffect: "1",
    numbersuffix: "%",
    drawcrossline: "1",
    plottooltext: "<b>$dataValue</b> of youth were on $seriesName",
    theme: "fusion"
  },
  categories: [
    {
      category: [
        {
          label: "2012"
        },
        {
          label: "2013"
        },
        {
          label: "2014"
        },
        {
          label: "2015"
        },
        {
          label: "2016"
        }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "First",
      data: [
        {
          value: "62"
        },
        {
          value: "64"
        },
        {
          value: "64"
        },
        {
          value: "66"
        },
        {
          value: "78"
        }
      ]
    },
    {
      seriesname: "Second",
      data: [
        {
          value: "16"
        },
        {
          value: "28"
        },
        {
          value: "34"
        },
        {
          value: "42"
        },
        {
          value: "54"
        }
      ]
    },
    {
      seriesname: "Third",
      data: [
        {
          value: "20"
        },
        {
          value: "22"
        },
        {
          value: "27"
        },
        {
          value: "22"
        },
        {
          value: "29"
        }
      ]
    },
    {
      seriesname: "Fourth",
      data: [
        {
          value: "18"
        },
        {
          value: "19"
        },
        {
          value: "21"
        },
        {
          value: "21"
        },
        {
          value: "24"
        }
      ]
    }
  ]
};


const tableCellStyle = {
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
};

class ChartsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            clientNames: [],
            interactionDates: [],
            typeOfCalls: [],
            durations: [],
        };
    }

    resetInteractions = () => {
        this.setState((state) => ({ clientNames: []}));
        this.setState((state) => ({ interactionDates: []}));
        this.setState((state) => ({ typeOfCalls: []}));
        this.setState((state) => ({ durations: []}));
    };

    getInteractions = (userId) => {
        this.resetInteractions();

        Backend.getUserInteractions(userId, (response) => {
            this.setState((state) => ({ clientNames: response.data.map(interaction => interaction.client.client_name)}));
            this.setState((state) => ({ interactionDates: response.data.map(interaction => interaction.date)}));
            this.setState((state) => ({ typeOfCalls: response.data.map(interaction => interaction.type_of_call)}));
            this.setState((state) => ({ durations: response.data.map(interaction => interaction.duration)}));
        }, (error) => {
            console.log('Error Fetching Interactions:', error);
        });
    };

    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        this.setState((state) => ({ userName: params.userName }));
        this.getInteractions(params.userId);
    }

    cellClientRenderer = (rowIndex) => {
        return <Cell style={tableCellStyle}> {this.state.clientNames[rowIndex]} </Cell>
    };
    
    cellDateRenderer = (rowIndex) => {
        return <Cell style={tableCellStyle}> {this.state.interactionDates[rowIndex]} </Cell>
    };

    cellTypeRenderer = (rowIndex) => {
        return <Cell style={tableCellStyle}> {this.state.typeOfCalls[rowIndex]} </Cell>
    };

    cellDurationRenderer = (rowIndex) => {
        return <Cell style={tableCellStyle}> {this.state.durations[rowIndex]} </Cell>
    };

    render() {
        return (
            <div style={{backgroundColor: '#282c34'}}>
                <p style={ChartTitleStyle}>
                    {this.state.userName}
                </p>

                <div style={ChartsViewStyle}>

                    <div style={{width: '50%', display: 'flex', flexDirection: 'column'}}>

                        <p style={{fontSize: '20px'}}> Average User Score </p>

                        <ReactFusioncharts
                            type="msline"
                            width="100%"
                            height="70%"
                            dataFormat="JSON"
                            dataSource={dataSource}
                        />
                    </div>

                    <Table numRows={5} defaultRowHeight={40} selectionModes={'NONE'}>
                        <Column name="Client" cellRenderer={this.cellClientRenderer}/>
                        <Column name="Date" cellRenderer={this.cellDateRenderer}/>
                        <Column name="Type Of Call" cellRenderer={this.cellTypeRenderer}/>
                        <Column name="Duration" cellRenderer={this.cellDurationRenderer}/>
                    </Table>
                </div>

            </div>
        );
    }
}
 
export default ChartsView;