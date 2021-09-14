import { useEffect } from "react";
import Game from "./Game";
import { StartScreen } from "./StartScreen";
import { mediaQueries } from "../style/mediaQueries";
import { setPlayers, setTime,setTurn, setStatus, selectGame, setBoard, setWinner } from "../redux/slices/gameSlice";
import styled from 'styled-components';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { ConsecutiveGame } from "./ConsecutiveGame";

const Heading = styled.h1`
    text-align: center;
    font-family: Usuazi Hosomozi;
    font-style: normal;
    font-weight: normal;
    font-size: 72px;
    line-height: 72px;
    color: #000000;
    padding-block-start: 40px;
    padding-block-end: 48px;
    margin:0;
  
  ${mediaQueries('md', 'lg')`
    font-size: 40px;
    line-height: 40px;
  `}
  ${mediaQueries(null, 'md')`
    font-size: 29px;
    line-height: 29px;
    padding-block-end: 50px;
  `}

`;
const Home =() =>  {
  const dispatch = useAppDispatch()
  const {players, turn, winner, board, time, status} = useAppSelector(selectGame)
  let winningPositionsIndex = 0;
   
  useEffect(() => {
    if (status !== "started") return;
    const winningPositions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let winner: string | null = null;
    while (winningPositionsIndex < winningPositions.length && !winner) {
      const boardPositionsToCheck = winningPositions[winningPositionsIndex];
      const boardValuesToCkeck = boardPositionsToCheck.map(
        (index) => board[index]
      );
      const checkingValue = boardValuesToCkeck[0];
      const isFinished = boardValuesToCkeck.every(
        (value) => value === checkingValue && checkingValue
      );
      winner = !isFinished ? null : checkingValue;
      winningPositionsIndex++;
    }
    if (winner) {
      dispatch(setWinner(winner === "X" ? players[0] : players[1]));
      dispatch(setStatus("finished"));
      return;
    }
    dispatch(setStatus(board.filter((value) => !value).length ? "started" : "finished"));
  }, [board, players, status]);

  useEffect(() => {
    setTimeout(() => {
            if(status === 'started' && time > 0 && turn === 'X') {
              dispatch(setTime(time - 1))  
            }else if(status === 'started' && time > 0 && turn === 'O'){ 
                dispatch(setTime(time - 1))
            }

       }, 1000)
  }, [ turn, time])

  const handleClick = (index: number): void => {
    if (index < 0 || index > 9 || winner) return;
    const newBoard = [...board];
    newBoard.splice(index, 1, turn);
    dispatch(setBoard(newBoard));
    const newTurn = turn === "X" ? "O" : "X";
    dispatch(setTurn(newTurn));
    dispatch(setTime(3))
  };
  
  const handleStart = (players: string[]) => {
    dispatch(setPlayers(players));
    dispatch(setTurn("X"));
    dispatch(setStatus("started"));
  };

  const handleRestart = () => {
    dispatch(setBoard(Array(9).fill("")));
    dispatch(setWinner(""));
    dispatch(setStatus("consecutive"));
    dispatch(setTime(3))
  };

  const startAgain = () => {
    dispatch(setBoard(Array(9).fill("")));
    dispatch(setWinner(""));
    dispatch(setStatus("started"));
    dispatch(setTime(3))
  } 

  const rebootGame = () => {
    dispatch(setBoard(Array(9).fill("")));
    dispatch(setWinner(""));
    dispatch(setPlayers(['', '']))
    dispatch(setStatus("new"));
    dispatch(setTime(3))
  }
         
  return (
    <div>
      <Heading>Tic tac toe</Heading>
      { status === "new" && <StartScreen players={players} time={time} handleStart={handleStart} /> }
      { status === "consecutive" && <ConsecutiveGame time={time} players={players} startAgain={startAgain} rebootGame={rebootGame}/> }
      { status === "finished" && <Game players={players} turn={turn} winner={winner} time={time} status={status} player={players} board={board} handleClick={handleClick} handleRestart={handleRestart} /> }
      { status === "started" && <Game players={players} turn={turn} winner={winner} time={time} status={status} player={players} board={board} handleClick={handleClick} handleRestart={handleRestart}/> }
    </div>
  );
}

export default Home