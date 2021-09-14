import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../redux/store';

export interface gameState {
  board: string[];
  status: string;
  winner: string | null;
  players: string[];
  turn: string;
  // handleClick: (index: number) => void;
  // handleRestart: () => void;
  // handleStart: (players: string[]) => void;
  time: number
}

const initialState: gameState = {
  board: Array(9).fill(""),
  status: 'new',
  winner: null,
  players: ['', ''],
  turn: 'X',
  time: 3
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
  },
  extraReducers: (builder) => {
   
  },
});

export const { setBoard, setPlayers, setStatus, setTime, setTurn, setWinner} = gameSlice.actions;

export const selectGame = (state: RootState) => state.game;

export default gameSlice.reducer;
