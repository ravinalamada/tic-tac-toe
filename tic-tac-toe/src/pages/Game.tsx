
import Square from "./Squares";
import styled from 'styled-components'
import GameBg from '../icons/GameBg.png'
import {Button} from './StartScreen'
import { mediaQueries } from '../style/mediaQueries';

interface Props {
  board: string[];
  player: string[];
  time: number;
  winner: string | null,
  status: string;
  players: string[]
  turn: string
  handleClick(index: number): void;
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
const Game = (props: Props) => {
  const { status, board, players, turn,time, winner,  handleClick, handleRestart } = props;

  
  function isFinished() {
    if(status === 'started' && time === 0) { 
      return(<PlayerLabel>time out - {turn === 'X' ? players[1]: players[0]}</PlayerLabel>)
    }else if(status === 'started') {
      return (<PlayerLabel>{turn === 'X' ? players[0] : players[1]}'s turn</PlayerLabel>)
    }else if(status === 'finished') {
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
              handleClick={handleClick}
            />
          ))}
        </Grid>
        {status === "finished" || time === 0
        ? <Button onClick={handleRestart}>Restart</Button>
        : <PlayerLabel>Time left: {time} s</PlayerLabel>
        }
    </Wrapper>
  );
};
export default Game;
