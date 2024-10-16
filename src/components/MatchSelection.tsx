import React, { useState } from "react";
import competitions from "../assets/data/competitions.json";

type Competition = {
  competition_id: number;
  season_id: number;
  country_name: string;
  competition_name: string;
  competition_gender: string;
  competition_youth: boolean;
  competition_international: boolean;
  season_name: string;
  match_updated: string;
  match_updated_360: string | null;
  match_available_360: string | null;
  match_available: string;
};

type Match = {
  match_id: number;
  match_date: string; // "YYYY-MM-DD"
  kick_off: string; // "HH:mm:ss.SSS"
  competition: {
    competition_id: number;
    country_name: string;
    competition_name: string;
  };
  season: {
    season_id: number;
    season_name: string;
  };
  home_team: HomeTeam;
  away_team: AwayTeam;
  home_score: number;
  away_score: number;
  match_status: string;
  match_status_360: string | null;
  last_updated: string; // ISO 8601 format
  last_updated_360: string | null;
  metadata: {
    data_version: string;
    shot_fidelity_version: string;
    xy_fidelity_version: string;
  };
  match_week: number;
  competition_stage: {
    id: number;
    name: string;
  };
  stadium: {
    id: number;
    name: string;
    country: Country;
  };
  referee: {
    id: number;
    name: string;
    country: Country;
  };
};

type HomeTeam = {
  home_team_id: number;
  home_team_name: string;
  home_team_gender: string;
  home_team_group: string | null;
  country: Country;
  managers: Manager[];
};

type AwayTeam = {
  away_team_id: number;
  away_team_name: string;
  away_team_gender: string;
  away_team_group: string | null;
  country: Country;
  managers: Manager[];
};

type Manager = {
  id: number;
  name: string;
  nickname: string | null;
  dob: string; // "YYYY-MM-DD"
  country: Country;
};

type Country = {
  id: number;
  name: string;
};

const MatchSelection: React.FC = () => {
  // State to track competition
  const [competitionId, setCompetitionId] = useState<number | undefined>(
    undefined
  );

  // State to track available seasons for the selected competition
  const [seasonIdArr, setSeasonIdArr] = useState<number[] | undefined>(
    undefined
  );

  // State to track season_name for each competition
  const [seasonId, setSeasonId] = useState<number | undefined>(undefined);

  // State to track match ID
  const [matchId, setMatchId] = useState<number | undefined>(undefined);

  // State to track available matches for a competition season
  const [matchIdArr, setMatchIdArr] = useState<number[] | undefined>(undefined);

  // State to track match file
  const [matchFile, setMatchFile] = useState<Match[] | undefined>(undefined);

  // set of available competitions
  const competitionIdSet: number[] = Array.from(
    new Set(competitions.map((item: Competition) => item.competition_id))
  );

  // list of available season_id for each competition: {competition_name: [season_name]}
  const seasons: { [key: number]: number[] } = {};
  competitionIdSet.forEach((competitionId) => {
    const seasonIds = competitions
      .filter((c: Competition) => c.competition_id === competitionId)
      .map((c: Competition) => c.season_id);
    seasons[competitionId] = seasonIds;
  });

  // competition change handler
  const handleCompetitionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCompetitionId(Number(event.target.value));

    setSeasonId(undefined)
    setSeasonIdArr(seasons[Number(event.target.value)]);
    
    
    setMatchId(undefined);
    setMatchIdArr(undefined);

  };

  // season change handler
  const handleSeasonChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const seasonIdChange = Number(event.target.value);
    setSeasonId(seasonIdChange);

    const matchDirectory: string = `../assets/data/matches/${competitionId}/${seasonIdChange}.json`;

    const tempMatchIdArr: number[] = [];

    try {
      const matchDataObject: { default: Match[] } = await import(
        matchDirectory
      );

      const matchDataDefault: Match[] = matchDataObject.default;

      setMatchFile(matchDataDefault);

      matchDataDefault.forEach((match: Match) => {
        tempMatchIdArr.push(match.match_id);
      });
    } catch (error) {
      console.log(error);
    }

    setMatchIdArr(tempMatchIdArr);
  };

  const handleMatchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMatchId(Number(event.target.value));
  };

  return (
    <>
      <div className="flex border border-black m-2 justify-center">
        <label className="m-2 font-bold">Select match:</label>
        <div className="">
          <select
            id="competitionIdSelection"
            className="m-2"
            value={competitionId ?? ""}
            onChange={handleCompetitionChange}
          >
            <option value="" disabled>
              Select Competition
            </option>
            {competitionIdSet.map((competitionId: number) => (
              <option value={competitionId} key={competitionId}>
                {
                  competitions.find(
                    (item: Competition) => item.competition_id === competitionId
                  )?.competition_name
                }
              </option>
            ))}
          </select>

          <select
            id="seasonIdSelection"
            className="m-2"
            value={seasonId ?? ""}
            onChange={handleSeasonChange}
          >
            <option value="" disabled>
              Select Season
            </option>
            {seasonIdArr?.map((seasonId: number) => (
              <option value={seasonId} key={seasonId}>
                {
                  competitions.find(
                    (item: Competition) => item.season_id === seasonId
                  )?.season_name
                }
              </option>
            ))}
          </select>

          <select
            id="matchSelection"
            className="m-2"
            value={matchId ?? ""}
            onChange={handleMatchChange}
          >
            <option value="" disabled>
              Select Match
            </option>
            {matchIdArr?.map((matchId: number) => {
              const match = matchFile?.find(
                (match: Match) => match.match_id === matchId
              );

              return (
                <option value={matchId} key={matchId}>
                  {match?.home_team.home_team_name} -{" "}
                  {match?.away_team.away_team_name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
    </>
  );
};

export default MatchSelection;
