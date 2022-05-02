import React, {useContext, useEffect } from 'react'
import { AppContext } from '../App'
import Key from './key'

function Keyboard(){

    const {onEnter, onDelete, selectNumber} = useContext(AppContext)
    const arr = Array(8).fill(0).map((num,index)=> index.toString())
    arr.push('DELETE')
    arr.unshift('ENTER')

    const handleKeyBoard = ((event)=>{
        if(event.key === "Enter"){
            onEnter()

        }else if(event.key === 'Backspace'){
            onDelete()
        }
        else{
            if(arr.includes(event.key)){
                selectNumber(event.key)
            }
        }
    })
    //useEffect create effects that run after every completed render
    //add event listener to listen to when use press key
    useEffect(() => {
        document.addEventListener("keydown", handleKeyBoard);
        // remove the event listener so it only listens to one of the guess
        // otherwise it will fill up the entire row
        return ()=>{
            document.removeEventListener('keydown', handleKeyBoard);
        };
    })

    return(
        <div className='keyboard' onKeyDown={handleKeyBoard}>
            {arr.map((num, index)=>{
                return <Key keyVal ={num} key={index}/>
            })}
        </div>
    )
}

export default Keyboard