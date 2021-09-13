import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../redux/store';

export interface GameState {
    availableCells: number[],
    xCells: [],
    oCells: [],
    activePlayer: string,
    winner: any,
    catsGame: boolean,
    cpu: any
  }
  
  const initialState: GameState = {
    availableCells: [1,2,3,4,5,6,7,8,9],
    xCells: [],
    oCells: [],
    activePlayer: 'x',
    winner: null,
    catsGame: false,
    cpu: null
  };
  


export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setClaimCell: (state:any, action:PayloadAction<any>) => {
      let cellToAdd = action.payload.cellId;
      // 1--- pop cellToAdd from availableCells
      let currAvailableCells = [...state.availableCells];
      let availableCellIndex = currAvailableCells.indexOf(cellToAdd)
      let nextPlayer = ''

      if (availableCellIndex > -1) {
        currAvailableCells.splice(availableCellIndex, 1);
        state.activePlayer === 'x' ? nextPlayer = 'o' : nextPlayer = 'x';
      } else {
        // TODO: popup message "duplicate, try again"
        console.log('duplicate cell try again');
        return state;
      }

      let newAvailableCells = [...currAvailableCells]

      // 3. Append new cell to xCells or oCells
      if (state.activePlayer === "x") {
        return {
          ...state, 
          availableCells: newAvailableCells,
          xCells: [...state.xCells, cellToAdd],
          activePlayer: nextPlayer
        };
      }

      return {
        ...state,
        availableCells: newAvailableCells,
        oCells: [...state.oCells, cellToAdd],
        activePlayer: nextPlayer
      };
    },
    checkWinner: (state:any) => {
        const winCheck = (winArr:any) => {
            let player = state.activePlayer;
            let playerCellsSorted = state[player+'Cells'].sort()
            for(var i = 0; i < winArr.length; i++){
                if(playerCellsSorted.indexOf(winArr[i]) === -1)
                return false;
            }
            return true
            }
            
            if (winCheck([1,2,3]) || winCheck([4,5,6]) || winCheck([7,8,9]) ||
                winCheck([1,4,7]) || winCheck([2,5,8]) || winCheck([3,6,9]) ||
                winCheck([1,5,9]) || winCheck([3,5,7])) {
            return {...state, winner: state.activePlayer}
            }
            return state;
   
    },
    checkCatsGame: (state) => {
        if (!state.winner) {
            return {...state, catsGame: true}
          }
          return state;  
    },
    resetGame: (state) => {
        return {
            ...state,
            availableCells: [1,2,3,4,5,6,7,8,9],
            xCells: [],
            oCells: [],
            activePlayer: 'x',
            winner: null,
            catsGame: false,
            cpu: null
          };
    },
    chooseChar: (state, action: any) => {
      let char = action.payload.char;
      let cpu;
      char === 'x' ? cpu = 'o' : cpu = 'x';
      return {...state, cpu};
    }

  },
});

export const { setClaimCell, checkWinner, checkCatsGame, resetGame, chooseChar, } = gameSlice.actions;

export const selectGame = (state:RootState) => state.game;

export const claimCellIfAvailable = (cellId: number) : AppThunk =>(dispatch, getState)  =>{
  // 1. claim cell
  dispatch(claimCell(cellId));
  
  { 
    // 2-a check winner 
    let { xCells, oCells } = selectGame(getState());
    if ([...xCells, ...oCells].length >= 5) {
      dispatch(checkWinner());
    }
  }
  
  {// 2-b check cat's game
    let { availableCells } = selectGame(getState());
    if (availableCells.length === 0) {
      dispatch(checkCatsGame());
    }
  }
  
  // 3. if cpu turn, dispatch cpuTurn
  let { cpu, activePlayer, availableCells } = selectGame(getState());
  if (cpu === activePlayer && availableCells.length !== 0) {
    dispatch(cpuTurn(availableCells))
  }
};

export const chooseCharFirstMove = (char:string): AppThunk=>(dispatch, getState) => {
  console.log(char);
    
  dispatch(chooseChar(char));
    let { cpu, activePlayer } = selectGame(getState());
    if (cpu === activePlayer) {
      let randomIndex = Math.floor(Math.random() * 9);
      let randomUnclaimed = [1,2,3,4,5,6,7,8,9][randomIndex];
      dispatch(claimCellIfAvailable(randomUnclaimed));
    }
  
}


export default gameSlice.reducer;

