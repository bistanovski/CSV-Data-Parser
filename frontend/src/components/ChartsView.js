import React from 'react';
import queryString from 'query-string';

import '@blueprintjs/table/lib/css/table.css';
import { Cell, Column, Table } from "@blueprintjs/table";
 
const cellRenderer = (rowIndex) => {
    return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
};

class ChartsView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            userId: '',
        };
    }

    componentDidMount() {
        let params = queryString.parse(this.props.location.search)
        this.setState((state) => ({userName: params.userName}))
        this.setState((state) => ({userId: params.userId}))
    }

    render() {
        return (
            <div className="App">
                <p style={{margin: '50px'}}>
                    {this.state.userName}
                </p>

            <div style={{display: 'inline-flex', flexDirection: 'row', flexWrap: 'wrap', gap: '50px'}}>
                <Table numRows={10}>
                    <Column name="Dollars" cellRenderer={cellRenderer}/>
                 </Table>

                <Table numRows={10}>
                    <Column name="Dollars" cellRenderer={cellRenderer}/>
                </Table>
            </div>
            

            </div>
        );
    }
}
 
export default ChartsView;