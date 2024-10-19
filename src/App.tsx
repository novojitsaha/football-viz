import ScoreBoard from "./components/ScoreBoard";
import PlayerList from "./components/PlayerList";
import FootballField from "./components/FootballField";
import EventCard from "./components/EventCard";
import Player from "./types/player";
import MatchSelection from "./components/MatchSelection";
import MatchHistory from "./components/MatchHistory";
import { useEffect, useState } from "react";
import eventList from "./assets/data/events/15946.json";
import {
  positionCoordinatesKey,
  positionCoordinates,
} from "./utils/positionCoordinates";
import Match from "./types/match";

function App() {
  // State to track matchId
  const [sharedMatch, setSharedMatch] = useState<Match | undefined>(undefined);

  // State to track the eventArr
  const [eventArr, setEventArr] = useState<any[] | undefined>(undefined);

  // // State to track the current event index
  const [eventIndex, setEventIndex] = useState<number | undefined>(undefined);

  const fetchEventArr = async (
    sharedMatch: Match | undefined,
    eventFileDir: string | undefined
  ): Promise<any[] | undefined> => {
    const eventDir: string = `./assets/data/events/${eventFileDir}.json`;

    if (!sharedMatch) return;

    try {
      const getEventFile: { default: any[] } = await import(eventDir);

      setEventArr(getEventFile.default);

      return getEventFile.default;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };

  // Route props to the corresponding component based on event type
  const controller = (eventArr: any[] | undefined) => {
    if (!eventArr) return; // return if eventFile is undefined
  };

  // Fetch new eventArr and reset currentEventIndex to 1 whenever sharedMatch changes
  useEffect(() => {
    // Get event file id from sharedMatch match_id
    const eventFileDir: string | undefined = sharedMatch?.match_id.toString();

    fetchEventArr(sharedMatch, eventFileDir); // reset eventArr state when sharedMatch changes

    setEventIndex(1); // reset event index when match is reset
  }, [sharedMatch]);

  // Effect to run whenever the currentEventIndex changes
  useEffect(() => {
    // Return to index 1 if currentEventIndex goes out of bounds
    if (eventIndex !== undefined && eventIndex > eventList.length) {
      setEventIndex(1);
    }

    controller(eventArr);
  }, [eventIndex]);

  // Function to handle button click and iterate to the next event

  const handleNext = () => {
    if (!eventIndex) {
      setEventIndex(eventIndex! + 1);
    } else {
      setEventIndex(1); // if index is undefined, it's set to 1
    }
  };

  const handlePrevious = () => {
    if (eventIndex === 1 || eventIndex === undefined) {
      return;
    }
    setEventIndex(eventIndex! - 1);
  };

  return (
    <div className="m-4">
      {/* SCOREBOARD */}
      {/* <ScoreBoard teamA={team[0]} teamB={team[1]} /> */}
      {/* MATCH SELECTION */}
      <MatchSelection setSharedMatch={setSharedMatch} />
      {/* MATCH HISTORY */}
      <MatchHistory sharedMatch={sharedMatch} />

      {/* BUTTONS */}
      <div className="flex border border-black justify-center">
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
      {/* <div className="border border-black text-center text-3xl">
        {currentEvent ? (
          <p>{currentEvent.index}</p>
        ) : (
          <p>Press button to start iterating.</p>
        )}
      </div> */}

      <div className="flex items-center border border-black">
        {/* PLAYER LIST A */}
        {/* <PlayerList teamName={team[0]} playerList={lineupA} /> */}

        {/* FOOTBALL FIELD */}
        {/* <FootballField playerListA={lineupA} playerListB={lineupB} /> */}

        {/* PLAYER LIST B */}
        {/* <PlayerList teamName={team[1]} playerList={lineupB} /> */}
      </div>

      <div className="m-4">
        {/* EVENT CARD */}
        {/* {currentEvent ? (
          <EventCard currentEvent={currentEvent}></EventCard>
        ) : (
          <p>Event not available yet. </p>
        )} */}
      </div>
    </div>
  );
}

export default App;
