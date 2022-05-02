import React from 'react'
import axios from 'axios'
import Guess from './guess';
import './board.css'

function Board(){

    const createRows = 
        Array(10).fill("").map((ele, index)=>{
            return(        
                <div className='row' id={index} key={index}>
                    {Array(4).fill("").map((ele,pos)=>{                       
                        return (
                            <Guess guessPos={pos} attemptNum= {index} key={index*10+pos}/>
                        )
                    })}
                </div>
            )
        })
    return(
        <div className='board'>
            {/* <button onClick={getRandomNumbers}>
                Start
            </button> */}
            {createRows}
        </div>
    )
}
export default Board