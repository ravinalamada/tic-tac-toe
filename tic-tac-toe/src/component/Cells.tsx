import React from "react"
import {cellCoords, Cell} from '../utils'
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectGame, checkWinner, setClaimCell, checkCatsGame} from "../slices/gameSlice";


export function Cells() {
    
  const dispatch = useAppDispatch();
  const game = useAppSelector(selectGame)

  const claimCellIfAvailable = (cellId: number) => {
    return () => {
      // 1. claim cell
      dispatch(setClaimCell(cellId));
      
      { 
        // 2-a check winner 
        let { xCells, oCells } = game;
        if ([...xCells, ...oCells].length >= 5) {
          dispatch(checkWinner());
        }
      }
      
      {// 2-b check cat's game
        let { availableCells } = game;
        if (availableCells.length === 0) {
          dispatch(checkCatsGame());
        }
      }
      
      // 3. if cpu turn, dispatch cpuTurn
      let { cpu, activePlayer, availableCells } = game;
      if (cpu === activePlayer && availableCells.length !== 0) {
        dispatch(cpuTurn(availableCells))
      }
    };
  }

  const cpuTurn = (availableCells:any) => {
    return () => {
      // CPU turn logic: if cpu's turn, choose a random unclaimed cell, recurse 
      let randomIndex = Math.floor(Math.random() * (availableCells.length));
      let randomAvailable = availableCells[randomIndex];
      dispatch(claimCellIfAvailable(randomAvailable));
    }
  }
  
      
      return (
        <g className="cells">
          {cellCoords.map((curr, i) =>
            <Cell
              x = {curr[0]}
              y = {curr[1]}
              id = {i+1}
              key = {"cell"+i+1}
              onClick = {() => dispatch(claimCellIfAvailable(i+1))}
            />
          )}
        </g>
      )
    
  }
  