import React from 'react'
import axios from 'axios'
import Guess from './guess';
import './board.css'

function Board(){

    async function getRandomNumbers(){
        //add await wait for code to execute before going to the next line console.log(num)
        const num = await axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
            .then(response => {
                // console.log(response.data);
                let numArr = response.data.split("\n")
                return numArr.slice(0,-1).join('') 
            }, error => {
                console.log(error);
            });
        console.log(num)
        return num
        //alternate solution using fetch but has to deal with streaming  
        // fetch("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")            
        // .then(res => {
        //     //console.log(res)
        //     //response.text() takes res stream and reads it to completion
        //     return res.text()
        // })
        // .then(numbers => { 
        //     console.log(numbers)
        // })
    }
    const createRows = 
        Array(10).fill("").map((ele, index)=>{
            return(
                <div className='row'>
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
            <button onClick={getRandomNumbers}>
                Start
            </button>
            {createRows}
        </div>
    )
}
export default Board