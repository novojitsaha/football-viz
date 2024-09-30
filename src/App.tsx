import ScoreBoard from "./components/ScoreBoard";
import PlayerList from "./components/PlayerList";
import FootballField from "./components/FootballField";
import EventCard from "./components/EventCard";
import Player from "./types/player";
import { useEffect, useState } from "react";
import eventList from "./assets/15946.json";
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
  // Effect to run whenever the currentEventIndex changes
  useEffect(() => {
    console.log("current event index: ", currentEventIndex);

    console.log("current event: ", currentEvent);

    // Return to index 1 if currentEventIndex goes out of bounds
    if (currentEventIndex !== null && currentEventIndex > eventList.length) {
      setCurrentEventIndex(1);
    }

    controller(currentEvent);
  }, [currentEventIndex]);

  // Get the current object based on the currentEventIndex
  const currentEvent = eventList.find((e) => e.index === currentEventIndex);

  // Route props to the corresponding component based on event type
  const controller = (currentEvent: any | null) => {
    if (!currentEvent) return;

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
        } else {
          // change starting  x-coordinates to move players to other side of the field
          const updatedPlayerList = playerList.map((player) : Player => ({
            ...player,
            coordinates: [120 - player.coordinates[0], player.coordinates[1]]

          }));
          setLineupB(updatedPlayerList);
          setTeam([...team, currentEvent.team.name]);
        }
        break;

      case "Half Start":
        break;
    }
  };

  // Function to handle button click and iterate to the next event

  const handleNext = () => {
    if (currentEventIndex !== null) {
      setCurrentEventIndex(currentEventIndex + 1);
    } else {
      setCurrentEventIndex(1);
    }
  };

  return (
    <div className="m-4">
      <ScoreBoard teamA={team[0]}
                  teamB={team[1]} />

      <button
        className="border border-black p-6 bg-red-200"
        onClick={handleNext}
      >
        Press Me!
      </button>

      <div>
        {currentEvent ? (
          <p>{currentEvent.index}</p>
        ) : (
          <p>Press button to start iterating.</p>
        )}
      </div>

      <div className="flex items-center border border-black">
        <PlayerList teamName={team[0]}
                    playerList={lineupA} />

        <FootballField playerListA={lineupA} playerListB={lineupB} />

        <PlayerList teamName={team[1]}
                    playerList={lineupB} />
      </div>

      <div className="m-4">
        {currentEvent ? (
          <EventCard currentEvent={currentEvent}></EventCard>
        ) : (
          <p>Event not available yet. </p>
        )

        }
        
      </div>


    </div>
  );
}

export default App;
