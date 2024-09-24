import ScoreBoard from "./components/ScoreBoard";
import PlayerList from "./components/PlayerList";
import FootballField from "./components/FootballField";
import Player from "./types/Player";
import { useEffect, useState } from "react";
import eventList from './assets/15946.json';

import useEvents from "./hooks/useEvents";


function App() {
  // const {startingTeams, events} = useEvents(allEvents as any[]);

  // State to track the current event index
  const [currentEventIndex, setCurrentEventIndex] = useState<null | number>(null);


  // Effect to run whenever the currentEventIndex changes
  useEffect(() => {
    console.log(currentEventIndex);




    // Return to index 1 if currentEventIndex goes out of bounds
    if (currentEventIndex !== null && currentEventIndex > eventList.length) {
      setCurrentEventIndex(1);
    }
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

  }


  // useEffect(() => {
  //   if (currentEventIndex === null) return;
  //   // event has changed

  //   // get new event
  //   const newEvent = exampleEventSim[currentEventIndex!];
  //   // if the event is null or undefined then return
  //   if (!newEvent) return;
  //   console.log("newEvent: ", newEvent)
  //   // find player who needs to be changed
  //   const newPlayers = players.map(p => {
  //     if (p.id === newEvent.id) {
  //       p.x = newEvent.x;
  //       p.y = newEvent.y;
  //     }
  //     return p;
  //   })
  //   // set New players
  //   setPlayers(newPlayers)
  // }, [currentEventIndex])

  // console.log('starting teams: ', startingTeams)



  return (
    <div className="">
      <ScoreBoard />

      <button className="border border-black p-6 bg-red-200" onClick={handleNext}>Press Me!</button>

      <div>
        {currentEvent ? (
          <p>{currentEvent.index}</p>
        ) : (
          <p>Press button to start iterating.</p>
        )}
      </div>

      <div className="flex items-center border border-black">

        <PlayerList
          teamName="X"
        />

        <FootballField
          currentEvent={currentEvent}
        />



        <PlayerList
          teamName="Y"
        />
      </div>

    </div>


  )
}

export default App
