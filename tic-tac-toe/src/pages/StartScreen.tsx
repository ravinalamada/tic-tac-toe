import { useState, useMemo, FormEvent, useEffect } from "react";
import styled from 'styled-components';
import ellipseIcon from '../icons/ellipse.svg'
import crossIcon from '../icons/cross.svg'
import { mediaQueries } from '../style/mediaQueries';

const Form= styled.form `
background: white;
height: 100vh;

  h2 {
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

  }

  p {
    font-family: Usuazi Hosomozi;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 48px;
    color: #000000;
    margin: 0;

    span {
      font-family: Usuazi Hosomozi;
      font-style: normal;
      font-weight: normal;
      font-size: 48px;
      line-height: 48px;
      color: #8B8585;
      padding-left: 16px;
      ${mediaQueries('md', 'lg')`
        font-size: 30px;
        line-height: 30px;
     `}
      ${mediaQueries(null, 'md')`
        font-size: 16px;
        line-height: 16px;
      `}
    }

    ${mediaQueries('md', 'lg')`
    font-size: 30px;
    line-height: 30px;
  `}
    ${mediaQueries(null, 'md')`
      font-size: 16px;
      line-height: 16px;
    `}

}
`

const FormWrapper =styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Fieldset = styled.fieldset`
  border-color: transparent;
  background-color: transparent;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 39px;
  width: 71%;
  margin-inline-start: auto;
  margin-inline-end: auto;
  ${mediaQueries('md', 'lg')`
    gap: 30px;
  `}
  ${mediaQueries(null, 'md')`
    gap: 16px
  `}
  
`;

const Icons= styled.img`
${mediaQueries('md', 'lg')`
    max-width: 40px;
    max-height:40px
  `}
  ${mediaQueries(null, 'md')`
     max-width: 25px;
    max-height:25px
  `}
`;

const Input= styled.input`
  outline:none;
  border-color: transparent;
  padding: 0;
  margin: 0;
  font-family: Usuazi Hosomozi;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 48px;
  color: #8B8585;
  width: 100%;
  
  ${mediaQueries('md', 'lg')`
    font-size: 30px;
    line-height: 30px;
  `}
  ${mediaQueries(null, 'md')`
    font-size: 16px;
    line-height: 16px;
  `}
`;

const Button = styled.button `
  border-color: transparent;
  background-color: transparent;
  font-family: Usuazi Hosomozi;
  font-style: normal;
  font-weight: normal;
  font-size: 72px;
  line-height: 72px;
  text-align: center;
  color: #000000;
  padding-block-start: 31px;
  margin-block-start: 0;

  ${mediaQueries('md', 'lg')`
    font-size: 40px;
    line-height: 40px;
  `}
  ${mediaQueries(null, 'md')`
    font-size: 19px;
    line-height: 19px;
  `}

`;

export interface FormProps{
   handleStart?:(players: string[]) => void
}





export const StartScreen=(props: FormProps)=> {
  const { handleStart } = props;
  const [players, setPlayers] = useState(["", ""]);
  const [time, setTime] = useState(3)
  const handleName = (event: FormEvent<HTMLInputElement>, index: number) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1, event.currentTarget.value);
    setPlayers(newPlayers);
  };
  const canStart = useMemo(
    () => players.every((player) => player && player.length > 0),
    [players]
  );
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canStart) return;
    handleStart && handleStart(players);
  };

  useEffect(() => {
    setTimeout(() => {
      if(time > 0) {
       setTime((prevTime) => prevTime - 1)
      }
    }, 1000)
  }, [time])
  
  return (
      <Form onSubmit={handleSubmit}>
        <h2>Tic tac toe</h2>
        <FormWrapper>
          <Fieldset>
            <Icons src={ellipseIcon} alt="ellipse" />
            <Input 
              type="text" 
              placeholder="leave empty to use AI or enter player name" 
              value={players[0]}
              onChange={(e) => handleName(e, 0)}/> 
          </Fieldset>
          <Fieldset>
            <Icons src={crossIcon} alt='cross'/>
            <Input type="text" 
              placeholder="leave empty to use AI or enter player name" 
              value={players[1]}
              onChange={(e) => handleName(e, 1)}/> 
          </Fieldset>
          <p>turn Time limit in seconds:
          <span>{time}s</span>
          </p>
        </FormWrapper>
        <Button type="submit" disabled={!canStart}>Start</Button>
      </Form>
  )
}

