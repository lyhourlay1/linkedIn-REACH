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
  return (
    <div className="App">
      <nav>
        <h1>Mastermind: Wizard of Odd</h1>
      </nav>
      <AppContext.Provider value={{board, setBoard}}>
        <Board/>
        <Keyboard/>
      </AppContext.Provider>      
    </div>
  );
}

export default App;
