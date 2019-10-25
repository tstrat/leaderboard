import React, { useState, useEffect } from 'react'
import ScoreBoard from './ScoreBoard'
import './leaderboard.scss'


const LeaderBoard = ({socket}) => {

    const [leaderBoard, setLeaderBoard] = useState(null)
    //      ^  Obj      ^ "setState"
    socket.on('update', newBoard => setLeaderBoard(newBoard))
    useEffect(() => {
        if(!leaderBoard) {
            socket.emit('requestScores')
        }
    })


    const leaders = leaderBoard ? <ScoreBoard scores={leaderBoard}/>: null
    return (
        <div className='leaderboard'>
            {leaders}
        </div>
    );
};

export default LeaderBoard;
