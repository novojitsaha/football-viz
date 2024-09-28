import Player from "./types/player";
import { positionCoordinates, positionCoordinatesKey } from "./utils/positionCoordinates";



export default function controller(currentEvent: any | null){

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
            jersey: object.jersey_number
          };
          playerList.push(temp);
        });

        if (lineupA.length === 0) {
          setLineupA(playerList);
          setTeam([...team, currentEvent.team.name]);  
        } else {
          setLineupB(playerList);
          setTeam([...team, currentEvent.team.name]); 
        }

        // Get team name from the event
        break;
      }

      

}