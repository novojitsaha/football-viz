import React from 'react'

const PlayerList = ({teamName = 'X'}) => {
  return (
    <div className='bg-gray-200 mx-auto w-64 border border-black rounded-lg'>

        {/* Card Header */}
        <div className='text-center font-bold border-b border-black'>
            {teamName}
        </div>

        {/* Player List */}
        <ul className='text-center'>
            <li>
                Player 1
            </li>

            <li>
                Player 2
            </li>

        </ul>
    
    </div>
  )
}

export default PlayerList