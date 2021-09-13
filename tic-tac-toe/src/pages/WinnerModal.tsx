import React from "react"
import { useAppDispatch } from '../redux/hooks';
import { resetGame } from "../slices/gameSlice";

export const WinModal = (props:any) => {
    const dispatch = useAppDispatch();
    return (
      <g className="win-modal modal">
        <rect className='cover' onClick={()=>dispatch(resetGame())} />
        <rect className = 'dialog-box' 
          x={125}
          y={225}
          width={355}
          height={140}
        />
        <text
          x={150}
          y={320}
          fontFamily="Arial" 
          fontSize="80"
          fill="black" 
        > {props.value} WINS! </text>
      </g>
    )
  }
  