import React from 'react';
import { useAppSelector} from '../redux/hooks';
import { selectGame } from "../slices/gameSlice";
import { XShape, OShape } from '../utils';
export function Shapes() {  
     const game = useAppSelector(selectGame)
      let xCells = game.xCells;
      let oCells = game.oCells;
      
      return (
        <g className="shapes">
          {xCells.map((cellId, i) => <XShape id={cellId} key={i} /> )}
          {oCells.map((cellId, i) => <OShape id={cellId} key={i} /> )}
        </g>
      )
    
  }