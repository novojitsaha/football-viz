import MatchSelection from "./components/MatchSelection";
import MatchHistory from "./components/MatchHistory";
import { useEffect, useState } from "react";
import Team from "./types/team";
import LineUpCard from "./components/LineUpCard";
import Match from "./types/match";
import EventCard from "./components/EventCard";
import FootballField from "./components/FootballField";
import { positionCoordinates } from "./utils/positionCoordinates";
import controller from "./utils/controller";

function App() {
  // State to track matchId
  const [sharedMatch, setSharedMatch] = useState<Match | undefined>(undefined);

  // State to track the eventArr
  const [eventArr, setEventArr] = useState<any[] | undefined>(undefined);

  // State to track the current event index
  const [eventIndex, setEventIndex] = useState<number>(0);

  // State to track Home Team
  const [homeTeam, setHomeTeam] = useState<Team | undefined>(undefined);

  // State to track Away Team
  const [awayTeam, setAwayTeam] = useState<Team | undefined>(undefined);

  const fetchEventArr = async (
    sharedMatch: Match | undefined,
    eventFileDir: string | undefined
  ): Promise<any[] | undefined> => {
    const eventDir: string = `./assets/data/events/${eventFileDir}.json`;

    if (!sharedMatch) return;

    try {
      const getEventFile: { default: any[] } = await import(eventDir);

      setEventArr(getEventFile.default);
      console.log(eventDir)

      return getEventFile.default;
    } catch (e) {
      console.log(e);
      return undefined;
    }
  };



  // Fetch new eventArr and reset currentEventIndex to 1 whenever sharedMatch changes
  useEffect(() => {
    // Get event file id from sharedMatch match_id
    const eventFileDir: string | undefined = sharedMatch?.match_id.toString();
    setEventArr(undefined); // clear eventArr when sharedMatch is updated
    fetchEventArr(sharedMatch, eventFileDir); // reset eventArr state when sharedMatch changes
  }, [sharedMatch]);

  // Effect to run when eventArr is updated
  useEffect(() => {
    if (!eventArr) return;
    // set home team
    const homeTeam: Team = {
      name: sharedMatch?.home_team.home_team_name,
      formation: eventArr[0].tactics.formation,
      players: Array.from(
        eventArr[0].tactics.lineup.map((o: any) => ({
          id: o.player.id,
          name: o.player.name,
          position: o.position.name,
          coordinates: positionCoordinates[o.position.name],
          jersey: o.jersey_number,
        }))
      ),
      manager: {
        name: sharedMatch?.home_team.managers?.[0]?.name || "Unknown Manager",
        country: sharedMatch?.home_team.managers?.[0]?.country.name || "",
      },
    };
    setHomeTeam(homeTeam);

    // set away team
    const awayTeam: Team = {
      name: sharedMatch?.away_team.away_team_name,
      formation: eventArr![1].tactics.formation,
      players: Array.from(
        eventArr![1].tactics.lineup.map((o: any) => ({
          id: o.player.id,
          name: o.player.name,
          position: o.position.name,
          coordinates: positionCoordinates[(o.position.name).replace(/Left|Right/g, (match) => ( match === "Left" ? "Right" : "Left"))],
          jersey: o.jersey_number,
        }))
      ),
      manager: {
        name: sharedMatch?.away_team.managers?.[0]?.name || "Unknown Manager",
        country: sharedMatch?.away_team.managers?.[0]?.country.name || "",
      },
    };
    setAwayTeam(awayTeam);
    setEventIndex(0); // reset event index when match is reset
  }, [eventArr]);

  // Effect to run whenever the currentEventIndex changes
  useEffect(() => {
    if (!eventArr) return; // return if eventArr is undefined
    // Reset to index 1 if currentEventIndex goes out of bounds
    if (eventIndex > eventArr!.length) {
      setEventIndex(0);
    }

    controller(eventArr);


  }, [eventIndex]);

  // Function to handle button click and iterate to the next event

  const handleNext = () => {
    if (!eventArr) return; // return if eventArr is not set yet

    setEventIndex(eventIndex + 1);
  };

  const handlePrevious = () => {
    if (!eventArr) return; // return if eventArr is not set yet
    if (eventIndex === 0) {
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
      <div className="border border-black text-center text-3xl">
        {eventArr ? (
          <p>Index: {eventIndex}</p>
        ) : (
          <p className="italic">Select Match to start iterating.</p>
        )}
      </div>

      <div className="flex items-center border border-black">
        {/* HOME TEAM CARD*/}

        {sharedMatch ? (
          <LineUpCard team={homeTeam} />
        ) : (
          <p>Select match first</p>
        )}

        {/* FOOTBALL FIELD */}
        {eventArr ? (
          <FootballField
            homePlayers={homeTeam?.players}
            awayPlayers={awayTeam?.players}
            event={eventArr}
            eventIndex={eventIndex}
          />
        ) : (
          <p>Event not available yet. </p>
        )}

        {/* AWAY TEAM CARD */}
        {sharedMatch ? <LineUpCard team={awayTeam} /> : <p></p>}
      </div>

      <div className="m-4">
        {/* EVENT CARD */}
        {eventArr ? (
          <EventCard currentEvent={eventArr[eventIndex]}></EventCard>
        ) : (
          <p>Event not available yet. </p>
        )}
      </div>
    </div>
  );
}

export default App;
