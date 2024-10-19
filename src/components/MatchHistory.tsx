import React from "react";
import Match from "../types/match";

interface MatchHistoryProps {
  sharedMatch: Match | undefined;
}

const MatchHistory: React.FC<MatchHistoryProps> = ({ sharedMatch }) => {
  return (
    <>
      <div className=" my-2 p-2">
        <div className="font-bold text-center text-xl">Match History</div>
        {sharedMatch ? (
          <div className="bg-gray-200 rounded-xl">
            <div className="text-center p-2">
              {/* TIME AND LOCATION */}
              <div>
                <span className="font-bold">Time and Location:</span>{" "}
                {sharedMatch.kick_off} at {sharedMatch.match_date} in{" "}
                {sharedMatch.stadium.name} ({sharedMatch.stadium.country.name})
              </div>
              {/* REFEREE */}
              <div>
                <span className="font-bold">Referee:</span>{" "}
                {sharedMatch.referee.name} ({sharedMatch.referee.country.name})
              </div>
              {/* FINAL SCORE */}
              <div>
                <span className="font-bold">Final Score: </span>
                {sharedMatch.home_team.home_team_name} ({sharedMatch.home_score}{" "}
                - {sharedMatch.away_score}){" "}
                {sharedMatch.away_team.away_team_name}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center italic">Select match to view details.</p>
        )}
      </div>
    </>
  );
};

export default MatchHistory;
