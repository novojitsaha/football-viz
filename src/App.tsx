import ScoreBoard from "./components/ScoreBoard";
import PlayerList from "./components/PlayerList";
import FootballField from "./components/FootballField";
import EventCard from "./components/EventCard";
import Player from "./types/player";
import MatchSelection from "./components/MatchSelection";
import { useEffect, useState } from "react";
import eventList from "./assets/events/15946.json";
import {
  positionCoordinatesKey,
  positionCoordinates,
} from "./utils/positionCoordinates";

function App() {
  // State to track team names
  const [team, setTeam] = useState<string[]>([]);

  // State to track player coordinates of team A
  const [lineupA, setLineupA] = useState<Player[]>([]);

  // State to track player coordinates of team B
  const [lineupB, setLineupB] = useState<Player[]>([]);

  // State to track the current event index
  const [currentEventIndex, setCurrentEventIndex] = useState<null | number>(
    null
  );

  // State to track ball possession
  const [possession, setPossession] = useState<null | any>(null);



    // Route props to the corresponding component based on event type
    const controller = (currentEvent: any | null) => {
      if (!currentEvent) return;
      setPossession(currentEvent.possession_team.name)
      switch (currentEvent.type.name) {
        case "Starting XI":
          
          // Get player list from the event
          const playerList: Player[] = [];
          currentEvent.tactics.lineup.forEach((object: any) => {
            const temp: Player = {
              id: object.player.id,
              name: object.player.name,
              position: object.position.name,
              coordinates:
                positionCoordinates[
                  object.position.name as positionCoordinatesKey
                ],
              jersey: object.jersey_number,
            };
            playerList.push(temp);
          });
  
          if (lineupA.length === 0) {
            setLineupA(playerList);
            setTeam([...team, currentEvent.team.name]);
          } else if (lineupB.length === 0) {
            // change starting  x-coordinates to move players to other side of the field
            const updatedPlayerList = playerList.map(
              (player): Player => ({
                ...player,
                coordinates: [120 - player.coordinates[0], player.coordinates[1]],
              })
            );
            setLineupB(updatedPlayerList);
            setTeam([...team, currentEvent.team.name]);
          }
          break;
  
        case "Half Start":
  
  
          break;
  
        case "Pass":
          
          
          break;
      }
    };

  // Effect to run whenever the currentEventIndex changes
  useEffect(() => {
    console.log("current event: ", currentEvent);
    console.log('posession team: ', possession);

    // Return to index 1 if currentEventIndex goes out of bounds
    if (currentEventIndex !== null && currentEventIndex > eventList.length) {
      setCurrentEventIndex(1);
    }

    controller(currentEvent);
  }, [currentEventIndex]);

  // Get the current object based on the currentEventIndex
  const currentEvent = eventList.find((e) => e.index === currentEventIndex);


  // Function to handle button click and iterate to the next event

  const handleNext = () => {
    if (currentEventIndex !== null) {
      setCurrentEventIndex(currentEventIndex + 1);
    } else {
      setCurrentEventIndex(1);
    }
  };

  const handlePrevious = () => {
    if (currentEventIndex === 1 || currentEventIndex === null) {
      return;
    } 
    setCurrentEventIndex(currentEventIndex - 1);
    
  };

  return (
    <div className="m-4">

      {/* SCOREBOARD */}
      <ScoreBoard teamA={team[0]} teamB={team[1]} />
      {/* MATCH SELECTION */}
      <MatchSelection/>

      {/* BUTTONS */}
      <div className='flex border border-black justify-center'>
        <button
          className="border border-black p-6 bg-red-200"
          onClick={handlePrevious}
        >
          Previous
        </button>

        <button
          className="border border-black p-6 bg-red-200"
          onClick={handleNext}
        >
          Next
        </button>
      </div>

      {/* EVENT INDEX */}
      <div className="border border-black text-center text-3xl m-2">
        {currentEvent ? (
          <p>{currentEvent.index}</p>
        ) : (
          <p>Press button to start iterating.</p>
        )}
      </div>


      <div className="flex items-center border border-black">
        {/* PLAYER LIST A */}
        <PlayerList teamName={team[0]} playerList={lineupA} />

        {/* FOOTBALL FIELD */}
        <FootballField playerListA={lineupA} playerListB={lineupB} />

        {/* PLAYER LIST B */}
        <PlayerList teamName={team[1]} playerList={lineupB} />
      </div>

      <div className="m-4">
        {/* EVENT CARD */}
        {currentEvent ? (
          <EventCard currentEvent={currentEvent}></EventCard>
        ) : (
          <p>Event not available yet. </p>
        )}
      </div>
    </div>
  );
}

export default App;
