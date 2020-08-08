import React from 'react';

import '@blueprintjs/table/lib/css/table.css';

import { useHistory } from "react-router-dom";
import { Button } from "@blueprintjs/core";
import { Cell, Column, Table } from "@blueprintjs/table";
import Backend from '../Backend';

function ViewButton(props) {
    const history = useHistory();

    var userId = props.userId;
    var userName = props.userName;
  
    function handleClick() {
      history.push("/chartsview?userId=" + userId + '&userName=' + userName);
    }
  
    return (
        <Button onClick={handleClick} > View </Button>
    );
  }

const tableCellStyle = {
    display: 'flex', 
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
};

class TableView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userIDs: [],
            numOfUsers: 0
        };
    }

    resetUsers = () => {
        this.setState((state) => ({ numOfUsers: 0}));
        this.setState((state) => ({ users: []}));
        this.setState((state) => ({ userIDs: []}));
    };

    getUsers = () => {
        this.resetUsers();

        Backend.getUsers((response) => {
            this.setState((state) => ({ numOfUsers: response.data.length}));
            this.setState((state) => ({ users: response.data.map(user => user.user_name)}));
            this.setState((state) => ({ userIDs: response.data.map(user => user.id)}));
        }, (error) => {
            console.log('Error Fetching Users:', error);
        });
    };
    
    cellRenderer = (rowIndex) => {
        return <Cell style={tableCellStyle}> {this.state.users[rowIndex]} </Cell>
    };

    cellButtonRenderer = (rowIndex) => {
        return <Cell style={tableCellStyle}> <ViewButton userId={this.state.userIDs[rowIndex]} userName={this.state.users[rowIndex]}/> </Cell>;
    };

    componentDidMount() {
        this.getUsers();
    }

    render() {return (
        <div className="App">
            <Button intent="success" style={{margin: '20px'}} onClick={() => {
                    this.getUsers();
                }} > 
                
                Refresh
            </Button>

            <Table numRows={this.state.numOfUsers} defaultRowHeight={40} selectionModes={'NONE'} columnWidths={[300,200]}>
                <Column name="User" cellRenderer={this.cellRenderer}/>
                <Column name="Details" cellRenderer={this.cellButtonRenderer}/>
            </Table>
        </div>
        );
    }
}
 
export default TableView;