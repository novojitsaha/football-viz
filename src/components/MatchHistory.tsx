import React from "react";
import Match from "../types/match";

interface MatchHistoryProps {
  sharedMatch: Match | undefined;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ sharedMatch }) => {
  return (
    <>
      <div className="border border-black my-2 p-2">
        <div className="font-bold text-center text-xl">Match History</div>
        {sharedMatch ? (
          <>
            <div className="text-center p-2">
              <span className="font-bold">Time and Location:</span> {sharedMatch.kick_off} at{" "}
              {sharedMatch.match_date} in {sharedMatch.stadium.name} (
              {sharedMatch.stadium.country.name})
              <div>
                <span className="font-bold">Referee:</span> {sharedMatch.referee.name} (
                {sharedMatch.referee.country.name})
              </div>
            </div>
            <div className="flex justify-center">
              <div className="p-2">
                {sharedMatch.home_team.home_team_name} (
                {sharedMatch.home_team.country.name})
              </div>
              <div className="p-2">
                {sharedMatch.away_team.away_team_name} (
                {sharedMatch.away_team.country.name})
              </div>
            </div>
          </>
        ) : (
          <p>Select Match to view details.</p>
        )}
      </div>
    </>
  );
};

export default MatchHistory;
