import styled from 'styled-components'

interface Props {
    index: number;
    value: string;
    time: number
    handleClick(index: number): void;
  }

const Button = styled.button`
  background-color: transparent;
  width: calc(454px / 3);
  height: calc(421px / 3);
  font-size: 85px;
  line-height: 81px;
  border-color: transparent;
`  
  const Square = (props: Props) => {
    const { index, value, handleClick, time } = props;
    return (
      <Button onClick={() => time > 0 && handleClick(index)}>
        {value}
      </Button>
    );
  };
  export default Square;
  