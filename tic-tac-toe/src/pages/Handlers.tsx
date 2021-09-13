
import { useState, useEffect } from "react";
interface ReturnValue {
  board: string[];
  status: string;
  winner: string | null;
  players: string[];
  handleClick: (index: number) => void;
  handleRestart: () => void;
  handleStart: (players: string[]) => void;
  time: number
}
export default (): ReturnValue => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [status, setStatus] = useState("new");
  const [players, setPlayers] = useState(["", ""]);
  const [time, setTime] = useState(3)

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
    let winningPositionsIndex = 0;
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
      setWinner(winner === "X" ? players[0] : players[1]);
      setStatus("finished");
      return;
    }
    setStatus(board.filter((value) => !value).length ? "started" : "finished");
  }, [board, players, status]);
const handleClick = (index: number): void => {
    if (index < 0 || index > 9 || winner) return;
    const newBoard = [...board];
    newBoard.splice(index, 1, turn);
    setBoard(newBoard);
    const newTurn = turn === "X" ? "O" : "X";
    setTurn(newTurn);
  };
  const handleStart = (players: string[]) => {
    setPlayers(players);
    setTurn("X");
    setStatus("started");
  };

  useEffect(() => {
     setTimeout(() => {
      if(status === 'started' && time > 0) {
        setTime((prevTime) => prevTime - 1)
      }
     }, 1000)
   
  }, [status,time])
  const handleRestart = () => {
    setBoard(Array(9).fill(""));
    setWinner("");
    setStatus("new");
  };
return { board, status, time,winner, players, handleClick, handleRestart, handleStart };
};
