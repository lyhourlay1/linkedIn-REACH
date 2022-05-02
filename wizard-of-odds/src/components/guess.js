import React, { useContext } from 'react' 
import {AppContext} from "../App"

function Guess({guessPos, attemptNum}){
    const {board}= useContext(AppContext)
    const guess = board[attemptNum][guessPos]
    return(
        <div className='guess'>{guess}</div>
    )
}
export default Guess