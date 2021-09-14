
import styled from 'styled-components';
import ellipseIcon from '../icons/ellipse.svg'
import crossIcon from '../icons/cross.svg'
import {Form, Fieldset, FormWrapper, Icons, Button, Time} from './StartScreen'
import {mediaQueries} from '../style/mediaQueries'

interface Props {
    players: string[]
    time: number
    rebootGame(): void;
    startAgain:() => void;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 47px;
  gap: 25px;
`

const Name = styled.p`
    font-family: Usuazi Hosomozi;
    font-style: normal;
    font-weight: normal;
    font-size: 48px;
    line-height: 48px;
    color: #000000;
    margin: 0;

    ${mediaQueries('md', 'lg')`
    font-size: 30px;
    line-height: 30px;
  `}
  ${mediaQueries(null, 'md')`
    font-size: 16px;
    line-height: 16px;
  `}
`;
export const ConsecutiveGame =(props: Props)=> {
    const {rebootGame, startAgain, time, players} = props
  return (
    <Form>
        <FormWrapper>
          <Fieldset>
            <Icons src={ellipseIcon} alt="ellipse" />
            <Name>{players[0]}</Name> 
          </Fieldset>
          <Fieldset>
            <Icons src={crossIcon} alt='cross'/>
            <Name>{players[1]}</Name>
          </Fieldset>
          <Time>turn Time limit in seconds:
          <span>{time}s</span>
          </Time>
        </FormWrapper>
        <Wrapper>
        <Button onClick={startAgain}>Play again</Button>
        <Button onClick={rebootGame}>Reboot</Button>
        </Wrapper>
        
    </Form>

  )
}

