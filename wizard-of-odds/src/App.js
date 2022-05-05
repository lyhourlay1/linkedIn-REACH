import './App.css';
import Board from './components/board.js'
import Keyboard from './components/keyboard';
import {createContext, useState} from 'react'
import { boardDefault } from './components/numbers';
import axios from 'axios';
import strange from './strange.png'
import wanda from './wanda.png'

export const AppContext = createContext();

function App() {
  //store board state in application context to allow access in all component
  //alternate solution would be pass it as prob which could be ugly
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({attempt:0, numberPos: 0})
  const [correctNumbers, setCorrectNumbers]= useState()
  function onDelete(){
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.numberPos-1]= ""
    setBoard(newBoard)
    if(currAttempt.numberPos!==0){
        currAttempt.numberPos -=1
    }
    setCurrAttempt(currAttempt)
  }
  function onEnter(){
    if(currAttempt.numberPos!==4) return;
    
    const newBoard = [...board]
    let correct = false
    let almost = false
    newBoard[currAttempt.attempt].forEach((ele,index)=>{
      if(ele=== correctNumbers[index]) correct= true
      if(correctNumbers.includes(ele)) almost = true
    })
    if(newBoard[currAttempt.attempt].join("")=== correctNumbers){
      toggleScreen("won", true)
      toggleScreen("game", false)
    }

    const numberState =  correct? "correct": almost? "almost" : "wrong"
    // const rowElements = document.getElementById(currAttempt.attempt)
    const rowElements = document.getElementsByClassName(currAttempt.attempt)
    for(let i=0; i<rowElements.length; i++){
      rowElements[i].setAttribute('id', numberState)
    }
    // rowElements.setAttribute('class', numberState)
    
    currAttempt.attempt +=1
    currAttempt.numberPos=0
    if(currAttempt.attempt>9){
      toggleScreen('lost', true)
      toggleScreen('game', false)
    }
    setCurrAttempt(currAttempt)
  }
  function selectNumber(keyVal){
    if(currAttempt.numberPos >3) return; 
      const newBoard =[...board]
      newBoard[currAttempt.attempt][currAttempt.numberPos] = keyVal
      setBoard(newBoard)
      currAttempt.numberPos+=1
      setCurrAttempt(currAttempt)
  }
  async function handleStart(){
        //add await wait for code to execute before going to the next line console.log(num)
        const num = await axios.get("https://www.random.org/integers/?num=4&min=0&max=7&col=1&base=10&format=plain&rnd=new")
            .then(response => {
                // console.log(response.data);
                let numArr = response.data.split("\n")
                return numArr.slice(0,-1).join('') 
            }, error => {
                console.log(error);
            });
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
        console.log(num)
        setCorrectNumbers(num)
        const bttn = document.getElementById("start")
        bttn.style.display ='none'

        const restartBttn = document.getElementById('restart');
        restartBttn.style.display = 'flex';
        restartBttn.style.marginLeft = 'auto';
        restartBttn.style.marginRight = 'auto';

        toggleScreen("board",true)
        const newBoard = [...board]
        newBoard[0].forEach((ele, index)=>{
          newBoard[0][index]=""
        })
        setCurrAttempt({attempt:0, numberPos: 0})
  }

  function toggleScreen(id, toggle){
    let ele = document.getElementById(id)
    let display = toggle ? 'block': 'none'
    ele.style.display = display
  }

  return (
    <div className="App">
      <div id="lost" >
        <h1>
          Game Over: You lost! 
        </h1>
        <button onClick={()=>window.location.reload()}>Restart</button>
      </div>
      <div id="won">
        <h1>
          Game Over: You Won! 
        </h1>
        <button onClick={()=>window.location.reload()}>Restart</button>
      </div>
      <div id ="game">
        <nav className='nav-container'>
          <img src={strange} width="150px"/>
          <div>
            <h1>Mastermind: Wizard of Odds</h1>
            <button onClick={handleStart} id="start">Play</button>
            <button id = "restart" onClick={()=>window.location.reload()}> Restart </button>
            <div className='hint'>Hint: 
              <p>🟩 if at least one correct number at correct position </p>
              <p>🟨 if at least one correct number</p>
              <p>🟥 if no correct numbers</p>
            </div>
          </div>
          <img src={wanda} width="150px"/>
        </nav>
        
        <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onDelete, onEnter, selectNumber, correctNumbers}}>
          <Keyboard/>
          <Board/>
        </AppContext.Provider>      

      </div>
    </div>
  );
}

export default App;
