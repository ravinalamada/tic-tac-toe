import React from "react";
import { useSelector } from "react-redux";
import { selectGame } from "../slices/gameSlice";
import { CatsGameModal } from "./CatsGameMoadal";

export default function WinnerModal() {
    const game = useSelector(selectGame);
    console.log(game.catsGame);
    
    return (
        <>
          {game.catsGame ? <CatsGameModal /> : null}
        </>
    )
}