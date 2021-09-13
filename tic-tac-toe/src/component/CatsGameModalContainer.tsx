import React from 'react'
import { useAppSelector } from '../redux/hooks';
import { selectGame } from "../slices/gameSlice";
import { CatsGameModal } from '../pages/CatsGameMoadal';
 
export function CatsGameModalContainer() {
  const game = useAppSelector(selectGame);

  return (
    <div>
      {game.catsGame ? <CatsGameModal /> : null}
    </div>
  )
}