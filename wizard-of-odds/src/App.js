import './App.css';
import Board from './components/board.js'
import Keyboard from './components/keyboard';
import {createContext, useState} from 'react'
import { boardDefault } from './components/numbers';

export const AppContext = createContext();

function App() {
  //store board state in application context to allow access in all component
  //alternate solution would be pass it as prob which could be ugly
  const [board, setBoard] = useState(boardDefault)
  const [currAttempt, setCurrAttempt] = useState({attempt:0, numberPos: 0})
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
    if(currAttempt.numberPos!==5) return;
    currAttempt.attempt +=1
    currAttempt.numberPos=0
    setCurrAttempt(currAttempt)
  }
  function selectNumber(keyVal){
    if(currAttempt.numberPos >4) return; 
      const newBoard =[...board]
      newBoard[currAttempt.attempt][currAttempt.numberPos] = keyVal
      setBoard(newBoard)
      currAttempt.numberPos+=1
      setCurrAttempt(currAttempt)
  }
  return (
    <div className="App">
      <nav>
        <h1>Mastermind: Wizard of Odd</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onDelete, onEnter, selectNumber}}>
        <Board/>
        <Keyboard/>
      </AppContext.Provider>      
    </div>
  );
}

export default App;
