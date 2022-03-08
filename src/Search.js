import React, { useContext, useState} from "react";
import './App.css'
import { DataContext, DisplayContext, PlayerContext } from "./App";

function Search(){

    const [teamInfo, setTeamInfo] = useContext(DataContext);
    const [displayInfo, setDisplayInfo] = useContext(DisplayContext);
    const playerInfo = useContext(PlayerContext)
    const [name, setName] = useState("");

    let inputHandler = (input) => {

        input = input.toLowerCase()
        if (input != "") {
            const playerResults = playerInfo.filter((element) => element["first_name"].toLowerCase().includes(input) || element["last_name"].toLowerCase().includes(input))
            const results = teamInfo.filter((element) => element["id"] == (input) || element["full_name"].toLowerCase().includes(input) || element["abbreviation"].toLowerCase().includes(input) || element["conference"].toLowerCase().includes(input) || element["division"].toLowerCase().includes(input))
            for (let i = 0; i < playerResults.length; i++) {
                results.push(playerResults[i]["team"])
            }

            // remove duplicates
            if (results.length > 0) {
                setDisplayInfo([...new Set(results)])
                console.log(results)
                return
            }
        }

        setDisplayInfo(teamInfo)
        
    }
    return (        
        <div>
        <p>Search works! It works for all fields, and also players! Try "Ike". To reset, cancel clear input and hit enter</p>
        <input
      onKeyPress={(ev) => {
        if (ev.key === "Enter") {
          ev.preventDefault();
        //   console.log(ev.target.value);
          inputHandler(ev.target.value)
        }
      }}
    />
    </div>
     );
    
}

export default Search