
interface Props {
    name: string | null;
    handleRestart(): void;
  }
  const Finished = (props: Props) => {
    const { name, handleRestart } = props;
    return (
      <div>
        <h1>
          {name && `${name} !`}
          {!name && "Draw !"}
        </h1>
        <button onClick={handleRestart}>Restart</button>
      </div>
    );
  };
  export default Finished;
