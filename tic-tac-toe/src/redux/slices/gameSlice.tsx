import { createSlice, } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';

export interface gameState {
  board: any[];
  status: string;
  winner: string | null;
  players: string[];
  turn: string;
  score1: number;
  score2: number
  AIScore: number
  time: number
  AI_X: number
  AI_O: number
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
  AIScore: 0,
  AI_X: 0,
  AI_O: 0
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
    setAIScore: (state, action) => {
      state.AIScore = action.payload;
    },
    setAI_X: (state, action) => {
      state.AI_X = action.payload;
    },setAI_O: (state, action) => {
      state.AI_O = action.payload;
    },
  },
  extraReducers: (builder) => {
   
  },
});

export const {setAI_X, setAI_O, setScore1, setScore2,setBoard, setPlayers, setStatus, setTime, setTurn, setWinner, setAIScore} = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
