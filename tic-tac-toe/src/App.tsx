import Game from "./pages/Game";
import Finished from "./pages/Finished";
import useTickTackToe from "./pages/Handlers"
import { StartScreen } from "./pages/StartScreen";
import { mediaQueries } from "./style/mediaQueries";
import styled from 'styled-components';

const Heading = styled.h1`
    text-align: center;
    font-family: Usuazi Hosomozi;
    font-style: normal;
    font-weight: normal;
    font-size: 72px;
    line-height: 72px;
    color: #000000;
    padding-block-start: 40px;
    padding-block-end: 90px;
    margin:0;
  
  ${mediaQueries('md', 'lg')`
    font-size: 40px;
    line-height: 40px;
  `}
  ${mediaQueries(null, 'md')`
    font-size: 19px;
    line-height: 19px;
  `}

`;
const App =() =>  {
  const game = useTickTackToe();
  
  return (
    <div>
      <Heading>Tic tac toe</Heading>
      { game.status === "new" && <StartScreen time={game.time} handleStart={game.handleStart} /> }
      { game.status === "finished" && <Finished name={game.winner} handleRestart={game.handleRestart} /> }
      { game.status === "started" &&<Game time={game.time} player={game.players} board={game.board} handleClick={game.handleClick} /> }
    </div>
  );
}

export default App