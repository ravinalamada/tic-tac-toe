
import Square from "./Squares";
import styled from 'styled-components'
import GameBg from '../icons/GameBg.png'
interface Props {
  board: string[];
  player: string[];
  time: number;
  handleClick(index: number): void;
}
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 454px;
  margin-left: auto;
  margin-right: auto;
  background-image: url(${GameBg});
  background-repeat: no-repeat;
  margin-bottom: 100px;
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
`

const Game = (props: Props) => {
  const { board, handleClick, player, time } = props;

  return (
    <>
   <PlayerLabel>{player[0]}</PlayerLabel>
    <Wrapper >
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          index={index}
          handleClick={handleClick}
        />
      ))}
    </Wrapper>
    <PlayerLabel>Time left: {time} s</PlayerLabel>
    </>
  );
};
export default Game;
