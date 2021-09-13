import { selectGame } from "../slices/gameSlice";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { resetGame } from "../slices/gameSlice";

export const CatsGameModal = () => {
    const dispatch = useAppDispatch();
    const game = useAppSelector(selectGame);

    return (
      <g className="win-modal modal">
        <rect className='cover' onClick={() => dispatch(resetGame())} />
        <text 
          x={200}
          y={320}
          fontFamily="Arial" 
          fontSize="40"
          fill="gray"
        > CAT'S GAME! </text>
      </g>
    )
  }