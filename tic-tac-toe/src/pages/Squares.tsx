import styled from 'styled-components'

interface Props {
    index: number;
    value: string;
    handleClick(index: number): void;
  }

const Button = styled.button`
  background-color: transparent;
  width: calc(454px / 3);
  height: calc(421px / 3);
  font-size: 46px;
  border-color: transparent;
`  
  const Square = (props: Props) => {
    const { index, value, handleClick } = props;
    return (
      <Button onClick={() => handleClick(index)}>
        {value}
      </Button>
    );
  };
  export default Square;
  