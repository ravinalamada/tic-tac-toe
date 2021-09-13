
export const CharSelectModal = () => {
    return (
      <g className="char-modal modal">
        <rect className = 'cover' />
        <rect className = 'dialog-box' 
          x={150}
          y={120}
          width={300}
          height={230}
        />
        <text
          x={162}
          y={155}
          fontFamily="Arial" 
          fontSize={24}
          fill="gray"
        > SELECT YOUR SYMBOL </text>
        <text 
          x={210}
          y={320}
          fontFamily="Arial" 
          fontSize={24}
          fill="gray" 
        > 'X' GOES FIRST </text>
      </g>
    )
  }
  