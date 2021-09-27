
import Square from "./Squares";
import styled from 'styled-components'
import GameBg from '../icons/GameBg.png'
import {Button} from './StartScreen'
import { mediaQueries } from '../style/mediaQueries';

interface Props {
  board: string[];
  time: number;
  winner: string | null,
  status: string;
  players: string[]
  turn: string
  handleClick: any;
  handleRestart(): void;

}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 454px;
  margin-left: auto;
  margin-right: auto;
  background-image: url(${GameBg});
  background-repeat: no-repeat;
  margin-bottom: 68px;
`

const PlayerLabel = styled.p`
   font-family: Usuazi Hosomozi;
   font-style: normal;
   font-weight: normal;
   font-size: 48px;
   line-height: 48px;
   color: #000000;
   text-align: center;
   padding-bottom: 93px;
   margin: 0;

   ${mediaQueries('md', 'lg')`
    font-size: 40px;
    line-height: 40px;
  `}
  ${mediaQueries(null, 'md')`
    font-size: 29px;
    line-height: 29px;
  `}
`

const Wrapper = styled.div `
  text-align: center;
  padding-bottom: 186px;
`

const LineLeft = styled.div`
  position: absolute;
  -webkit-transform: none;
  -ms-transform: none;
  transform: rotate(
-90deg);
  top: 509px;
  left: 309px;
  width: 429px;
  background-color: black;
  height: 5px;
`
const RightLine = styled.div`
  position: absolute;
  -webkit-transform: none;
  -ms-transform: none;
  transform: rotate(
 90g);
  top: 507px;
  left: 609px;
  width: 430px;
  background-color: black;
  height: 5px;
`;
const MiddleLine = styled.div`
  position: absolute;
  -webkit-transform: none;
  -ms-transform: none;
  transform: rotate(89deg);
  top: 505px;
  left: 459px;
  width: 435px;
  background-color: black;
  height: 5px;
`;
const TopLine = styled.div`
    position: absolute;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
    top: 364px;
    left: 451px;
    width: 415px;
    background-color: black;
    height: 5px;
`;
const BoottomLine = styled.div`
  position: absolute;
  transform: none;
  top: 644px;
  left: 4;
  left: 506px;
  width: 400px;
  background-color: black;
  height: 5px;
`;
const HoriMiddleLine = styled.div`
position: absolute;
      transform: none;
      top: 508px;
      left: 455px;
      width: 455px;
      background-color: black;
      height: 5px;

`;
const LeftDiagonal = styled.div`
  position: absolute;
  transform: rotate(42deg);
    top: 506px;
    left: 404px;
    width: 538px;
  background-color: black;
  height: 5px;
`;
const RightDiagonal = styled.div`
  position: absolute;
  -webkit-transform: none;
  -ms-transform: none;
  transform: rotate(
  -45deg);
  top: 513px;
  left: 403px;
  width: 546px;
  background-color: black;
  height: 5px;
`;

const Game = (props: Props) => {
  const { status, board, players, turn,time, winner,  handleClick, handleRestart } = props;
  
  const leftLine = board[0] === 'X' && board[3] === 'X' && board[6] === 'X' || board[0] === 'O' && board[3] === 'O' && board[6] === 'O'
  const rightLine = board[2] === 'X' && board[5] === 'X' && board[8] === 'X' || board[2] === 'O' && board[5] === 'O' && board[8] === 'O' 
  const verMiddleLine = board[1] === 'X' && board[4] === 'X' && board[7] === 'X' || board[1] === 'O' && board[4] === 'O' && board[7] === 'O' 
  const topLine = board[0] === 'X' && board[1] === 'X' && board[2] === 'X' || board[0] === 'O' && board[1] === 'O' && board[2] === 'O' 
  const boottomLine = board[6] === 'X' && board[7] === 'X' && board[8] === 'X' || board[6] === 'O' && board[7] === 'O' && board[8] === 'O' 
  const horiMiddleLine = board[3] === 'X' && board[4] === 'X' && board[5] === 'X' || board[3] === 'O' && board[4] === 'O' && board[5] === 'O' 
  const leftDiagonal = board[0] === 'X' && board[4] === 'X' && board[8] === 'X' || board[0] === 'O' && board[4] === 'O' && board[8] === 'O' 
  const rightDiagonal = board[2] === 'X' && board[4] === 'X' && board[6] === 'X' || board[2] === 'O' && board[4] === 'O' && board[6] === 'O' 
  
  function getStrikethroughStyles () {
    if(leftLine) {
       return (<LineLeft />)
    }else if(rightLine) {
      return (<RightLine />)
    }else if(verMiddleLine) {
      return (<MiddleLine />)
    }else if(topLine) {
      return(<TopLine />)
    }else if(boottomLine){
      return(<BoottomLine />)
    }else if(horiMiddleLine) {
      return(<HoriMiddleLine />)
    }else if(leftDiagonal){
      return(<LeftDiagonal />)
    }else if(rightDiagonal){
      return(<RightDiagonal />)
    }

  } 

  const isTimeOut = !leftLine && !rightDiagonal && !rightLine && !boottomLine && !topLine && !horiMiddleLine && !verMiddleLine && !leftDiagonal
  
  function isFinished() {    
     if(status === 'started') {
      return (<PlayerLabel>{turn === 'X' ? players[0] === '' ? 'Computer' : players[0] : players[1] === '' ? 'Computer' : players[1]}'s turn</PlayerLabel>)
    }else if(isTimeOut &&  status === 'finished' ) {
      return (
        <PlayerLabel>
          timeout - {winner} won !
        </PlayerLabel>
      )
    }else if(status === 'finished' && time !== 0) {
        return (      
        <PlayerLabel>
          {winner && `${winner} won !`}
          {!winner && "Draw !"}
        </PlayerLabel>)
    } 
  
  }

  return (
    <Wrapper> 
        {isFinished()}
        <Grid>
          {board.map((value, index) => (
            <Square
              key={index}
              value={value}
              index={index}
              winner={winner}
              handleClick={handleClick}
            />
          ))}
        </Grid>
        {status === "finished" || time === 0
        ? <Button onClick={handleRestart}>Restart</Button>
        : <PlayerLabel>Time left: {time} s</PlayerLabel>
        }
        {
         status === 'finished' && getStrikethroughStyles()
        }
    </Wrapper>
  );
};
export default Game;
