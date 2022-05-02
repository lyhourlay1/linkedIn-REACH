import React, { useContext } from 'react' 
import {AppContext} from "../App"

function Guess({guessPos, attemptNum}){
    const {board, correctNumbers, currAttempt}= useContext(AppContext)
    const guess = board[attemptNum][guessPos]
    // const correct = correctNumber[guessPos]=== guess
    // const almost = !correct && guess !=="" && correctNumber.includes(guess) 
    // 
    return(
        <div className='guess' >{guess}</div>
    )
}
export default Guess