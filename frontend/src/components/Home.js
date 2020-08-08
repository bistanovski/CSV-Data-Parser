import React from 'react';

import { Button } from "@blueprintjs/core";
import Backend from '../Backend';
 
const Home = () => {
    return (
        <div className="App">

            <p>
                CSV-Data Parser
            </p>

            <Button 
                large="true"
                intent="primary"
                icon="document"
                onClick={() => {
                    document.getElementById("upload").click()
                }
            }
            >
                
                Upload CSV File
            
            </Button>

            <input type="file" id="upload" accept="text/csv" style={{display:'none'}} onChange={(event) => {
                const file = event.target.files[0];
                Backend.uploadCSVFile(file, (success) => {
                    console.log('Upload Success!', success)
                    }, 
                (error) => {
                    console.log('Upload errror:', error)
                });
            }}/>

        </div>
    );
}
 
export default Home;