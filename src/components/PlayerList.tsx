import React from 'react';
import Player from '../types/player';

const PlayerList = ({playerList, teamName}: {playerList: Player[], teamName: string}) => {
    const players : JSX.Element[] = playerList.map(player => <li key={player.id}>{player.name}</li>)

  return (
    <div className='bg-gray-200 mx-auto w-64 border border-black rounded-lg'>

        {/* Card Header */}
        <div className='text-center font-bold border-b border-black'>
            {teamName}
        </div>

        {/* Player List */}
        <ul className='text-center'>
            {players}

        </ul>
    
    </div>
  )
}

export default PlayerList