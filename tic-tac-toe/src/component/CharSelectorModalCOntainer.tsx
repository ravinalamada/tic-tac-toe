import React from 'react';
import { selectGame, chooseCharFirstMove,  } from "../slices/gameSlice";
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { CharSelectModal } from '../pages/CharSelectModal';
import { XButton, OButton } from '../utils';

export function CharSelectorModalContainer() {
    const dispatch = useAppDispatch();
    const game = useAppSelector(selectGame);

    let modalVisible = !game.cpu ? true : false;
    
      return (
          <>
           {
               modalVisible ? <g>
               <CharSelectModal />
               <XButton onClick={()=>dispatch(chooseCharFirstMove('x'))} />
               <OButton onClick={()=>dispatch(chooseCharFirstMove('o'))} />
             </g>
             : null
           }
          </>
        
      )
}