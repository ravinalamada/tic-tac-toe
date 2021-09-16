import { createSlice, } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface gameState {
  board: string[];
  status: string;
  winner: string | null;
  players: string[];
  turn: string;
  score1: number;
  score2: number
  time: number
}

const initialState: gameState = {
  board: Array(9).fill(""),
  status: 'new',
  winner: null,
  players: ['', ''],
  turn: 'X',
  time: 5,
  score1: 0,
  score2: 0,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setTurn: (state, action) => {
      state.turn = action.payload;
    },
    setBoard: (state, action) => {
      state.board = action.payload;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setScore1: (state, action) => {
      state.score1 = action.payload ;
    },
    setScore2: (state, action) => {
      state.score2 = action.payload;
    },
  },
  extraReducers: (builder) => {
   
  },
});

export const { setScore1, setScore2,setBoard, setPlayers, setStatus, setTime, setTurn, setWinner} = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
