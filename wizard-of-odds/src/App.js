import './App.css';
import Board from './components/board.js'
import Keyboard from './components/keyboard';
import {createContext, useState} from 'react'
import { boardDefault } from './components/numbers';
import axios from 'axios';

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
      
    }

    const numberState =  correct? "correct": almost? "almost" : "wrong"
    const rowElements = document.getElementById(currAttempt.attempt)
    rowElements.setAttribute('id', numberState)
    
    currAttempt.attempt +=1
    currAttempt.numberPos=0
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
        setCorrectNumbers(num)
        console.log(boardDefault)
        // setBoard(Array(10).fill(null).map((()=>Array(4).fill(""))))
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

  return (
    <div className="App">
      {/* <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Modal Header</h4>
            </div>
            <div class="modal-body">
              <p>Some text in the modal.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
          </div>

        </div>
      </div> */}
      <nav>
        <h1>Mastermind: Wizard of Odd</h1>
        <button onClick={getRandomNumbers}>Play</button>
        <div className='hint'>Hint: 
          <p>🟩 if at least one correct number at correct position </p>
          <p>🟨 if at least one correct number</p>
          <p>🟥 if no correct numbers</p>
        </div>
      </nav>
      
      <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onDelete, onEnter, selectNumber, correctNumbers}}>
        <Board/>
        <Keyboard/>
      </AppContext.Provider>      
    </div>
  );
}

export default App;
