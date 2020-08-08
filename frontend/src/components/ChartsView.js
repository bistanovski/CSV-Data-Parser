import React from 'react';
import queryString from 'query-string';

import '@blueprintjs/table/lib/css/table.css';
import { Cell, Column, Table } from "@blueprintjs/table";

import Select from 'react-select'
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

import Backend from '../Backend';

const dropDownOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
]

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
            userId: '',
            userName: '',
            clientNames: [],
            interactionDates: [],
            typeOfCalls: [],
            durations: [],
            filterType: { value: 'weekly', label: 'Weekly' }
        };

        this.dataSource = {
            chart: {
              caption: "Average Score - Total Call Duration",
              showhovereffect: "1",
              drawcrossline: "1",
              theme: "fusion"
            },
            categories: [
              {
                category:[]
              }
            ],
            dataset: [
              {
                seriesname: "Average Score",
                data: []
              },
              {
                seriesname: "Total Call Duration (Hours)",
                data: []
              }
            ]
          }
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

    resetStatistics = () => {
        this.dataSource.categories[0].category = [];
        this.dataSource.dataset[0].data = [];
        this.dataSource.dataset[1].data = [];
    };

    getUserStatistics = (userId) => {
        this.resetStatistics();
        Backend.getUserStatistics(userId, this.state.filterType.value, (response) => {
            response.data.forEach(element => {
                this.dataSource.categories[0].category.push({"label": element.date})
                this.dataSource.dataset[0].data.push({"value": element.average_score})
                this.dataSource.dataset[1].data.push({"value": element.total_call_duration})
            })
            
            this.forceUpdate();

        }, (error) => {
            console.log('Error Fetching Interactions:', error);
        });
    };

    componentDidMount() {
        let params = queryString.parse(this.props.location.search);
        this.setState((state) => ({ userName: params.userName }));
        this.setState((state) => ({ userId: params.userId }));
        this.getInteractions(params.userId);
        this.getUserStatistics(params.userId);
    };

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

    handleChange = selectedOption => {
        this.setState(
          { filterType: selectedOption },
          () => {
              this.getUserStatistics(this.state.userId);
          }
        );
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

                        <Select style={{width: '30%'}} options={dropDownOptions} styles={{option: styles => ({ ...styles, color: 'black' })}}
                            value={this.state.filterType}
                            onChange={this.handleChange}
                        />

                        <ReactFusioncharts
                            type="msline"
                            width="100%"
                            height="70%"
                            dataFormat="JSON"
                            dataSource={this.dataSource}
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