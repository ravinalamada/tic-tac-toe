import { useMemo, FormEvent} from "react";
import styled from 'styled-components';
import ellipseIcon from '../icons/ellipse.svg'
import crossIcon from '../icons/cross.svg'
import { mediaQueries } from '../style/mediaQueries';
import { setPlayers} from "../redux/slices/gameSlice";
import { useAppDispatch } from '../redux/hooks';

export const Form= styled.form `
background: white;
height: 100vh;
text-align: center;

  fieldset:nth-of-type(1){
   margin-bottom: 24px;
  }

  fieldset:nth-of-type(2){
   margin-bottom: 32px;
  }
`

export const Time = styled.p `
    font-family: Usuazi Hosomozi;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 48px;
    color: #000000;
    margin: 0;
    text-align: left;

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


`

export const FormWrapper =styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-inline-start: auto;
`;

export const Fieldset = styled.fieldset`
  border-color: transparent;
  background-color: transparent;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 39px;
  width: 100%;
  ${mediaQueries('md', 'lg')`
    gap: 30px;
  `}
  ${mediaQueries(null, 'md')`
    gap: 16px
  `}
  
`;

export const Icons= styled.img`
${mediaQueries('md', 'lg')`
    max-width: 40px;
    max-height:40px
  `}
  ${mediaQueries(null, 'md')`
     max-width: 25px;
    max-height:25px
  `}
`;

export const Input= styled.input`
  outline:none;
  border-color: transparent;
  padding: 0;
  margin: 0;
  font-family: Usuazi Hosomozi;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  line-height: 48px;
  color: #000000;
  width: 100%;

  &::placeholder {
    color: #8B8585;
   
  }
  
  ${mediaQueries('md', 'lg')`
    font-size: 30px;
    line-height: 30px;
  `}
  ${mediaQueries(null, 'md')`
    font-size: 16px;
    line-height: 16px;
  `}
`;

export const Button = styled.button `
  border-color: transparent;
  background-color: transparent;
  font-family: Usuazi Hosomozi;
  font-style: normal;
  font-weight: normal;
  font-size: 72px;
  line-height: 72px;
  text-align: center;
  color: #000000;
  margin-block-start: 0;
  outline: none;

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
   handleStart?:(players: string[]) => void;
   time: number
   players: string[]
}

export const StartScreen=(props: FormProps)=> {
  const { handleStart, time, players } = props;
  const dispatch = useAppDispatch();
  
  const handleName = (event: FormEvent<HTMLInputElement>, index: number) => {
    const newPlayers = [...players];
    newPlayers.splice(index, 1, event.currentTarget.value);
    dispatch(setPlayers(newPlayers))
  };

  const canStart = useMemo(
    () => players.every((player: string) => player && player.length > 0),
    [players]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!canStart) return;
    handleStart && handleStart(players)
  };
  
  return (
      <Form onSubmit={handleSubmit}>
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
          <Time>turn Time limit in seconds:
          <span>{time}s</span>
          </Time>
        </FormWrapper>
        <Button type="submit" >Start</Button>
      </Form>

  )
}

