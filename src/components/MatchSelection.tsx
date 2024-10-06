import React, { useState } from "react";
import competitions from "../assets/competitions/competitions.json";

const MatchSelection = () => {
  // State to track competition
  const [competition, setCompetition] = useState<string>("");

  // State to track available seasons for the selected competition
  const [seasonArr, setSeasonArr] = useState<string[]>([]);

  // State to track season_name for each competition
  const [season, setSeason] = useState<string[]>([]);

  // set of available competition names
  const competitionList: string[] = Array.from(
    new Set(competitions.map((item: any) => item.competition_name))
  );

  // list of available season_id for each competition: {competition_name: [season_name]}
  const competitionSeasons: { [key: string]: string[] } = {};

  // initialize the keys for competitionSeasons
  competitionList.map(
    (competition_name) => (competitionSeasons[competition_name] = [])
  );

  // populate competitionSeasons
  competitions.forEach((item: any) => {
    const competitionName: string = item.competition_name;
    const seasonName: string = item.season_name;
    competitionSeasons[competitionName].push(seasonName);
  });

  // competition handler
  const handleCompetition = (event: any) => {
    setCompetition(event.target.value);

    setSeasonArr(competitionSeasons[event.target.value]);
  };

  // season handler
  const handleSeason = (event: any) => {
    setSeason(event.target.value);
  };

  return (
    <>
      <div className="flex border border-black m-2 justify-center">
        <label className="m-2 font-bold">Select match:</label>
        <div className="">
          <select
            id="competitionSelection"
            className="m-2"
            value={competition}
            onChange={handleCompetition}
          >
            <option value="" disabled>
              Select Competition
            </option>
            {competitionList.map((c) => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            id="seasonSelection"
            className="m-2"
            value={season}
            onChange={handleSeason}
          >
            <option value="" disabled>
              Select Season
            </option>
            {seasonArr.map((s) => (
              <option value={s} key={s}>
                {s}
              </option>
            ))}
          </select>

          <select id="competitions" className="m-2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default MatchSelection;
