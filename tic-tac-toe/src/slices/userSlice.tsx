import { createSlice } from '@reduxjs/toolkit';

 const userSlice = createSlice({
  name: 'player',
  initialState: {
    players: ["", ""],
    
  },
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
  },
});

export const { setPlayers } = userSlice.actions;

export const selectPlayers = (state:any) => state.players.players;

export default userSlice.reducer;