import React, { useContext, useState} from "react";
import './App.css'
import { DataContext, DisplayContext, CardState } from "./App";
import Table from 'react-bootstrap/Table'





function Table2(){



    const [displayInfo, setDisplayInfo] = useContext(DisplayContext);
    // console.log(displayInfo)
    const [usePage,setUsePage] = useState(0)
    const [selected,setSelected] = useContext(CardState);
    const tableSize = 10;

    function highlighted(id){
        setSelected(id)
        console.log(id)
    }

    function renderTableData(){
        return displayInfo.slice(usePage, usePage+tableSize).map((team, index) => {
          const { id, full_name, city, abbreviation, conference, division} = team
          if (id == selected) {

            return (
                <tr className="specialRow" key={id} onClick={() => highlighted(id)}>
                   <td>{id}</td>
                   <td>{full_name}</td>
                   <td>{city}</td>
                   <td>{abbreviation}</td>
                   <td>{conference}</td>
                   <td>{division}</td>
                </tr>
            )

          }
          return (
             <tr key={id} onClick={() => highlighted(id)}>
                <td>{id}</td>
                <td>{full_name}</td>
                <td>{city}</td>
                <td>{abbreviation}</td>
                <td>{conference}</td>
                <td>{division}</td>
             </tr>
          )
       })
      };
    
    function goBack(){
        if (0 < usePage){
            setUsePage(usePage => usePage - tableSize)
            }    }

    function goForward(){
        if (displayInfo.length - tableSize > usePage){
        setUsePage(usePage => usePage + tableSize)
        }
    }

    return(
        <div>
    <Table >
      <thead>
        <tr>
          <th>#</th>
          <th>Team Name</th>
          <th>City</th>
          <th>Abbreviation</th>
          <th>Conference</th>
          <th>Division</th>
        </tr>
      </thead>
      <tbody>
        {renderTableData()}
        
      </tbody>
    </Table>
    <button id="back" onClick={goBack}>BACK</button>
    <button id="forward" onClick={goForward}>FORWARD</button>
    </div>
    )
}

export default Table2