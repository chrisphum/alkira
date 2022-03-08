import React, { useContext, useEffect, useState, Card} from "react";
import './App.css'
import { DataContext, DisplayContext, PlayerContext, CardState } from "./App";
import CloseButton from 'react-bootstrap/CloseButton'


function DrawerComp () {

   const [card,setCard] = useContext(CardState)
   const [teamInfo, setTeamInfo] = useContext(DataContext);
   const [teamData, setTeamData] = useState(null)
   const [gameData, setGameData] = useState([])

   useEffect(() => {

      fetch('https://www.balldontlie.io/api/v1/teams/' + card)
      .then(response => response.json())
      .then(function(data){
         setTeamData(data["full_name"])
      })

      fetch('https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=' + card)
      .then(response => response.json())
      .then(function(data){
         setGameData(data["data"])
      })

    }, [card] )

   if (gameData.length < 1){
      console.log("loading")
      return (<div></div>)
   }
   else{
   return(
      <div className="card">
      <div className="topcard"><h1>{teamData}</h1>
      </div>
      <p>Team Full Name: {teamData}</p>
      <p>Total Games in 2021: {gameData.length}</p>
      </div> 
   )
   }
}

export default DrawerComp