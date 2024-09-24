type Type = BallReceipt | BallRecovery | Dispossessed | Duel | CameraOn | Block | Offside | Clearance | Interception | Dribble | Shot |
    Pressure | HalfStart

type BallReceipt = {
    id: 42,
    name: 'Ball Receipt',
    description: 'The receipt or intended receipt of a pass.'
}

type BallRecovery = {
    id: 2,
    name: 'Ball Recovery',
    description: 'An attempt to recover a loose ball.'
}

type Dispossessed = {
    id: 3,
    name: 'Dispossessed',
    description: 'Player loses ball to an opponent as a result of being tackled by a defender without attempting a dribble.'
}

type Duel = {
    id: 4,
    name: 'Duel',
    description: 'A duel is an 50-50 contest between two players of opposing sides in the match.'
}

type CameraOn = {
    id: 5,
    name: 'Camera On',
    description: 'Signals the stop of the camera to capture gameplay for a replay/video cut.'
}

type Block = {
    id: 6,
    name: 'Block',
    description: 'Blocking the ball by standing in its path.'
}

type Offside = {
    id: 8,
    name: 'Offside',
    description: 'Offside infringement. Cases resulting from a shot or clearance (non-pass). For passes resulting in an offside check pass outcomes section.'
}

type Clearance = {
    id: 9,
    name: 'Clearance',
    description: 'Action by a defending player to clear the danger without an intention to deliver it to a teammate.'
}

type Interception = {
    id: 10,
    name: 'Interception',
    description: 'Preventing an opponent\'s pass from reaching their teammates by moving to the passing lane/reacting to intercept it.'
}

type Dribble = {
    id: 14,
    name: 'Dribble',
    description: 'An attempt by a player to beat an opponent.'
}

type Shot = {
    id: 16,
    name: 'Shot',
    description: 'An attempt to score a goal, made with any (legal) part of the body.'
}

type Pressure = {
    id: 17,
    name: 'Pressure',
    description: 'Applying pressure to an opposing player who\'s receiving, carrying or releasing the ball.'
}

type HalfStart = {
    id: 18,
    name: 'Half Start'
}




export default Type;