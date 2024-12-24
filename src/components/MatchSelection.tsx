import React, { useState } from "react";
import competitions from "../assets/data/competitions/competitions.json";
import Competition from "../types/competition";
import Match from "../types/match";

interface MatchSelectionProps {
  setSharedMatch: React.Dispatch<React.SetStateAction<Match | undefined>>;
}

const MatchSelection: React.FC<MatchSelectionProps> = ({ setSharedMatch }) => {
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

  // State to track match list
  const [matchList, setMatchList] = useState<Match[] | undefined>(undefined);

  // set of available competitions
  const competitionIdSet: number[] = Array.from(
    new Set(competitions.map((item: Competition) => item.competition_id))
  );

  // list of available season_id for each competition: {competition_id: [season_id]}
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

    setSeasonId(undefined);
    setSeasonIdArr(seasons[Number(event.target.value)]);

    setMatchId(undefined);
    setSharedMatch(undefined);
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
      const matchList: { default: Match[] } = await import(matchDirectory);

      const matchDataDefault: Match[] = matchList.default;

      setMatchList(matchDataDefault);

      matchDataDefault.forEach((match: Match) => {
        tempMatchIdArr.push(match.match_id);
      });
    } catch (error) {
      console.log(error);
    }

    setMatchId(undefined);
    setSharedMatch(undefined);
    setMatchIdArr(tempMatchIdArr);
  };

  const handleMatchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMatchId(Number(event.target.value));

    const match: Match | undefined = matchList?.find(
      (match) => match.match_id === Number(event.target.value)
    );

    setSharedMatch(match);

  };

  return (
    <>
      <div className="flex my-2 justify-center">
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
              const match = matchList?.find(
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
