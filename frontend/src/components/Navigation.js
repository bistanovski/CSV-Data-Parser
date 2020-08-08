import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div style={{display: 'flex', fontSize: '20px', backgroundColor: '#1f2329'}}>
            <div style={{marginRight: '20px'}}>
                <NavLink to="/">Home</NavLink>
            </div>
            <div style={{marginRight: '20px'}}>
                <NavLink to="/tableview">Table View</NavLink>
            </div>
            <div style={{marginRight: '20px'}}>
                <NavLink to="/chartsview">Chart View</NavLink>
            </div>
       </div>
    );
}
 
export default Navigation;