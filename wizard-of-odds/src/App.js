import './App.css';
import Board from './components/board.js'
import Keyboard from './components/keyboard';
import {createContext, useState} from 'react'
import axios from 'axios';
import strange from './strange.png'
import wanda from './wanda.png'

export const AppContext = createContext();

function App() {
  //store board state in application context to allow access in all component
  //alternate solution would be pass it as prob which could be ugly
  const [board, setBoard] = useState(Array(10).fill(null).map((()=>Array(4).fill(""))))
  const [currAttempt, setCurrAttempt] = useState({attempt:0, numberPos: 0})
  const [correctNumbers, setCorrectNumbers]= useState()

  //deleting the number from the guess
  function onDelete(){
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.numberPos-1]= ""
    setBoard(newBoard)
    if(currAttempt.numberPos!==0){
        currAttempt.numberPos -=1
    }
    setCurrAttempt(currAttempt)
  }

  //when user press enter, it updates the board and change the board id to update
  //the color insdie the box
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
    }else{
      //depending on the input the update the id into the numberState to update
      //the color(green, yellow, red)
      const numberState =  correct? "correct": almost? "almost" : "wrong"
      const rowElements = document.getElementsByClassName(currAttempt.attempt)
      for(let i=0; i<rowElements.length; i++){
        rowElements[i].setAttribute('id', numberState)
      }    
      currAttempt.attempt +=1
      currAttempt.numberPos=0
      if(currAttempt.attempt>9){
        toggleScreen('lost', true)
        toggleScreen('game', false)
      }
      setCurrAttempt(currAttempt)
    }
    check(correctNumbers.split(""),newBoard[currAttempt.attempt-1])
  //on enter does not update the board but select number is updating the board
  }

  function check(correctNums, guesses){
    console.log('a',correctNums)
    console.log('b',guesses)
    let green = 0
    correctNums.forEach((ele,index)=>{
      if(ele === guesses[index]){
        green+=1
        correctNums[index]= 'x'
      }
    })
    let yellow =0
    correctNums.forEach((ele,index)=>{
      if(ele !== 'x' && guesses.includes(ele)){
        yellow+=1
        correctNums[index]= 'x'
      }
    })
    let red = 4-green-yellow
    alert(`${green} greens, ${yellow} yellows, ${red} reds`);
  }

  //handle the numbers that is clicked or pressed
  function selectNumber(keyVal){
    if(currAttempt.numberPos >3) return; 
      const newBoard =[...board]
      newBoard[currAttempt.attempt][currAttempt.numberPos] = keyVal
      setBoard(newBoard)
      currAttempt.numberPos+=1
      setCurrAttempt(currAttempt)
  }

  //handle start once the user click play by generate the random integer and
  //iterate through the board to ensure that the board is clean with empty string
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

        //hide the start button once play button clicked
        const bttn = document.getElementById("start")
        bttn.style.display ='none'
        
        toggleScreen("restart", true)
        toggleScreen("board",true)
        const newBoard = [...board]
        newBoard[0].forEach((ele, index)=>{
          newBoard[0][index]=""
        })
        setCurrAttempt({attempt:0, numberPos: 0})
  }

  //hide or show the element by id
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
          <img src={strange} width="150px" alt =""/>
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
          <img src={wanda} width="150px" alt =""/>
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


//correct 
//