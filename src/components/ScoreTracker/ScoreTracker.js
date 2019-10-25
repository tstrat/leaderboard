import React, { useState, useEffect } from 'react';

const ScoreTracker = ({socket}) => {
    const [ addPersonInput, setAddPersonInput ] = useState('')
    const [ playerName, setPlayerName ] = useState('')
    const [ points, setPoints ] = useState(0)
    const [leaderBoard, setLeaderBoard] = useState(null)

    socket.on('update', newBoard => setLeaderBoard(newBoard))
    useEffect(() => {
        if(!leaderBoard) {
            socket.emit('requestScores')
        }
    })
    const addPerson = () => {
        socket.emit('addPerson', { name: addPersonInput })
        setAddPersonInput('')
    }
    const updateScore = (name) => {
        socket.emit('updateScore', { name, score: points })
        setPoints(0)
    }
    if (!leaderBoard) {
        return <>Loading...</>
    }
    return (
        <div>
            <div className='leaderboard-addForm'>
                <h2>Add new person</h2>
                <label>Name: </label>
                <input value={addPersonInput} onChange={e => setAddPersonInput(e.target.value)} />
                <button onClick={addPerson}>Add Person</button>
            </div>
            { leaderBoard ? leaderBoard.length?
            <div className='leaderboard-updateScore'>
                <h2>UpdateScore</h2>
                <select className='leaderboard-updateScore_players' onChange={e => setPlayerName(e.target.value)}>
                    <option value="" selected disabled hidden>Choose here</option>
                    { leaderBoard.map((player, index) => <option key={player.name+index}>{player.name}</option>) }
                </select>
                <label>+ </label>
                <input type='number' value={points} onChange={e => setPoints(+e.target.value)}/>
                <button onClick={()=> updateScore(playerName)}>Add to Score</button>
            </div>
            : null:null
            }
        </div>
    );
};

export default ScoreTracker;
