import React, { useState, useEffect } from "react"
import './App.css'
import Table2 from "./Table";
import Search from "./Search"
import DrawerComp from "./DrawerComp"




    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //
    //
    // Hello! 
    // Please checkout my React Native iPhone App!
    // It is not complete, but it is a better showcase of my skills.
    // Even if it is (currently) a little unorganized 
    // ( it could defintely use more organized data structures)
    // Soon I will apply to the Apple App Store

    // Github link: https://github.com/chrisphum/iPhoneAppForAlkira
    // Youtube demonstration: https://www.youtube.com/watch?v=1ft7Od9pDUw 
    //
    // Please also read the Readme.md on the github repo! Thanks for the 
    // chance to interview at Alkira!
    //
    //
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~














var list = []

export const DataContext = React.createContext();
export const DisplayContext = React.createContext()
export const PlayerContext = React.createContext()
export const CardState = React.createContext()

function App() {

  let [teamInfo, setTeamInfo] = useState(list)
  let [displayInfo, setDisplayInfo] = useState(list)
  let [players,setPlayers] = useState(list)
  let [card,setCard] = useState(null)

  function cardDisplay() {
    if (card!=null){
      return (<DrawerComp/>)
    }
    else return (<div></div>)
  }

  useEffect(() => {
  
    fetch('https://www.balldontlie.io/api/v1/teams')
    .then(response => response.json())
    .then(function(data){
      setDisplayInfo(data["data"])
      setTeamInfo(data["data"])
    })

    fetch('https://www.balldontlie.io/api/v1/players')
    .then(response => response.json())
    .then(function(data){
      setPlayers(data["data"])
    })
  }, []);


   return ( 
    <div className="App-header">
    <DataContext.Provider value={[teamInfo, setTeamInfo]}> 
    <DisplayContext.Provider value={[displayInfo, setDisplayInfo]}> 
    <PlayerContext.Provider value={players}> 
    <CardState.Provider value={[card,setCard]}>
    <Search/> 
    <Table2/>
    {cardDisplay()}
    </CardState.Provider>
   </PlayerContext.Provider>
    </DisplayContext.Provider>
    </DataContext.Provider>
    </div>


   )
   
 }

export default App;
