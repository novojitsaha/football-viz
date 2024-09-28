import React from 'react'

const ScoreBoard = ({teamA, teamB}: {teamA: string, teamB: string}) => {
  return (
    <div className='bg-gray-200 flex w-4/5 justify-between items-center mx-auto p-2 my-2 h-32 border-2 border-black rounded-full'>
        
        <div className='border border-black p-6'>
            Score 1
        </div>

        <div className='border border-black flex-1 text-center p-6'>
            {teamA} - {teamB}
        </div>

        <div className='border border-black p-6'>
            Score 2
        </div>
        
    </div>
  )
}

export default ScoreBoard