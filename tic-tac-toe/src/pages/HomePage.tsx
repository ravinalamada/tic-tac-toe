import { useEffect } from "react";
import Game from "./Game";
import { StartScreen } from "./StartScreen";
import { mediaQueries } from "../style/mediaQueries";
import { setAIScore,setScore1, setScore2, setPlayers, setTime,setTurn, setStatus, selectGame, setBoard, setWinner, setAI_X, setAI_O } from "../redux/slices/gameSlice";
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
  const {players, turn, winner, board, time, status, score1, score2, AIScore, AI_O, AI_X} = useAppSelector(selectGame)
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
      dispatch(setWinner(winner === "X" ? players[0] === '' ? players[0] === '' && players[1] ? 'AI' : 'AI_X': players[0] : players[1] === '' ?  players[0] === '' && players[1] ? 'AI' : 'AI_O': players[1]));
      dispatch(setStatus("finished"));
      return;
    }
    dispatch(setStatus(board.filter((value) => !value).length ? "started" : "finished"));
  }, [board, players, status]);
 
useEffect(() => {
    if(!winner && time > 0 && status === 'started') {
      setTimeout(() => {
        if(turn === 'X') {
          dispatch(setTime(time - 1))  
        }else if(turn === 'O'){ 
            dispatch(setTime(time - 1))
        }

      }, 1000)
    }
    
  }, [winner, turn, time])
  
  const handleClick = (index: number): void => {
    if (index < 0 || index > 9  || winner) return;
    const newBoard = [...board];
    newBoard.splice(index, 1, turn);
    dispatch(setBoard(newBoard));
    const newTurn = turn === "X" ? "O" : "X";
    dispatch(setTurn(newTurn));
    dispatch(setTime(time > 0 && 5))
  };

    useEffect(() => {
    if(players[0] !== '' && players[1] === '' || players[0] === '' && players[1] !== '') {
        const newBoard = [...board];
        const firstBoard = newBoard[0] === 'X'
        const secBoard = newBoard[1] === 'X'
        const thirdBoard = newBoard[2] === 'X'
        const fourthBoard = newBoard[3] === 'X'
        const fithBoard = newBoard[4] === 'X'
        const sixthBoard = newBoard[6] === 'X'
        const seventhBoard = newBoard[7] === 'X'
        const eightBoard = newBoard[8] === 'X'
        if(firstBoard  && newBoard[4] === '') {
          setTimeout(() => {
            newBoard.splice(4, 1, turn)
            dispatch(setBoard(newBoard))
            dispatch(setTurn('X'))
            dispatch(setTime(5))
          }, 100)
        }else if(secBoard && newBoard[2] === '') { 
            setTimeout(() => {
              newBoard.splice(2, 1, turn)
              dispatch(setBoard(newBoard))
            dispatch(setTime(5))
            dispatch(setTurn('X'))
            }, 200)
        }else if(thirdBoard && newBoard[5] === '') {
          setTimeout(() => {
            newBoard.splice(5, 1, turn)
            dispatch(setBoard(newBoard))
            dispatch(setTurn('X'))
            dispatch(setTime(5))

          }, 200)
        }else if(fourthBoard && newBoard[6] === '') {
          setTimeout(() => {
            newBoard.splice(6, 1, turn)
            dispatch(setBoard(newBoard))
            dispatch(setTurn('X'))
            dispatch(setTime(5))

          }, 200)
        }else if(fithBoard && newBoard[8] === '') {
          setTimeout(() => {
            newBoard.splice(8, 1, turn)
            dispatch(setBoard(newBoard))
            dispatch(setTurn('X'))
            dispatch(setTime(5))

          }, 200)
        }else if(sixthBoard && newBoard[7] === '') {
          setTimeout(() => {
            newBoard.splice(7, 1, turn)
            dispatch(setBoard(newBoard))
            dispatch(setTurn('X'))
            dispatch(setTime(5))

          }, 200)
        }
        else if(seventhBoard && newBoard[6] === '') {
          setTimeout(() => {
            newBoard.splice(66, 1, turn)
            dispatch(setBoard(newBoard))
            dispatch(setTurn('X'))
            dispatch(setTime(5))

          }, 200)
        }
        else if(eightBoard && newBoard[3] === '') {
          setTimeout(() => {
            newBoard.splice(3, 1, turn)
            dispatch(setBoard(newBoard))
            dispatch(setTurn('X'))
            dispatch(setTime(5))

          }, 200)
        }
    }

  }, [players, turn])


  const handleStart = (players: string[]) => {
    dispatch(setPlayers(players));
    dispatch(setTurn("X"));
    dispatch(setStatus("started"));
  };

  const handleRestart = () => {
    dispatch(setBoard(Array(9).fill("")));
    dispatch(setStatus("consecutive"));
    dispatch(setTime(5))
  };

  const startAgain = () => {
    dispatch(setBoard(Array(9).fill("")));
    dispatch(setWinner(""));
    dispatch(setStatus("started"));
    dispatch(setTime(5))
  } 

 useEffect(() => {
   if(time === 0 && turn === 'X') {
     dispatch(setWinner(players[1] === '' ? 'AI' : players[1]))
     dispatch(setStatus('finished'))
   }else if(time === 0 && turn === 'O') {
    dispatch(setWinner(players[0]  === '' ? 'AI' : players[0]))
    dispatch(setStatus('finished'))
 
   }
  }, [time, turn])

 useEffect(() => {

    if(winner && winner === players[0]) {
       dispatch(setScore1(score1 + 1))
     }else if(winner && winner === players[1]){
       dispatch(setScore2(score2 + 1))
   }else if(winner && winner === 'AI') {
      dispatch(setAIScore(AIScore + 1))
   }else if(winner && winner === 'AI_X') {
    dispatch(setAI_X(AI_X + 1))
 }else if(winner && winner === 'AI_O') {
  dispatch(setAI_O(AI_O + 1))
 
}
   },[winner, players])

   useEffect(() => {
      if(status === 'started' && players[0] === '' && players[1] === '') {
          for(let i=0; i<board.length; i++) {
            if(i< 0 || i> 9 || winner) return;  
             const newBoard = [...board]
               if(newBoard[i] === '') {
                 setTimeout(() => {
                  newBoard.splice(i, 1, turn)
                  dispatch(setBoard(newBoard))
                  dispatch(setTime(8))
                  const newTurn = turn === "X" ? "O" : "X";
                  dispatch(setTurn(newTurn));

                 }, 500)
                  
                }
          }
       }
      }, [status,players, turn])

  const rebootGame = () => {
    dispatch(setBoard(Array(9).fill("")));
    dispatch(setWinner(""));
    dispatch(setPlayers(['', '']))
    dispatch(setStatus("new"));
    dispatch(setTime(5))
    dispatch(setScore1(0))
    dispatch(setScore2(0))
    dispatch(setAIScore(0))
  }
    
  return (
    <div>
      <Heading>Tic tac toe</Heading>
      { status === "new" && <StartScreen players={players} time={time} handleStart={handleStart} /> }
      { status === "consecutive" && <ConsecutiveGame AI_X={AI_X} AI_O={AI_O} AIScore={AIScore}  score2={score2} score1={score1} time={time} players={players} startAgain={startAgain} rebootGame={rebootGame}/> }
      { status === "finished" && <Game players={players} turn={turn} winner={winner} time={time} status={status}  board={board} handleClick={handleClick} handleRestart={handleRestart} /> }
      { status === "started" && <Game players={players} turn={turn} winner={winner} time={time} status={status} board={board} handleClick={handleClick} handleRestart={handleRestart}/> }
    </div>
  );
}

export default Home