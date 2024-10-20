import Player from "./player";

type Team = {
    name?: string,
    formation?: number,
    players?: Player[],
    manager?: {
        name?: string,
        country?: string
    }
}

export default Team;