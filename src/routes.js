import React from 'react'
import LeaderBoard from "./components/leaderboard/LeaderBoard"
import { Switch, Route } from 'react-router-dom'
import io from 'socket.io-client'
import ScoreTracker from './components/ScoreTracker/ScoreTracker';

const socket = io('http://localhost:4000')

export default (
    <Switch>
        <Route path='/admin' render={() => <ScoreTracker socket={socket}/>}/>
        <Route path='/' render={()=> <LeaderBoard socket={socket}/> } />
    </Switch>
)
