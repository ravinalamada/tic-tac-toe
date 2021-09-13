import React from 'react'
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectGame } from "../slices/gameSlice";
import { WinModal } from '../pages/WinnerModal';

export function WinModalContainer() {
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame);
  let modalVisible = game.winner ? true : false;

  function displayWinner() {
    if (modalVisible) {
      let winner = game.winner.toUpperCase();
      return <WinModal value={winner} />
    }
    return null
  }

  return (
    <div>
      {displayWinner()}
  </div>

  )
}