import React, { useState } from "react";
import competitions from "./assets/competitions/competitions.json";

const MatchSelection = () => {

    const competitionList: string[] = Array.from(new Set(competitions.map((item: any) => item.competition_name)));
    
    const [competition, setCompetition] = useState<string>("");

    const handleCompetition = (event: any) => {
        setCompetition(event.target.value);
    }
    
    return (
    <>
      <div className="flex border border-black m-2 justify-center">
        <label className="m-2 font-bold">Select match:</label>
        <div className="">
          <select id="competitions" className="m-2" value={competition} onChange={handleCompetition}>
            <option value="" disabled>Select Competition</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
          </select>

          <select id="competitions" className="m-2">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
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
