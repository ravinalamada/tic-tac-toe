
interface DividerLineState {
    x: number
    y: number
    length: number,
    horizontal: boolean
}
export const XShape = (props:any) => {
    let cellId = props.id;
    let backslash = {
      x1: centerCell[cellId-1][0]+70,
      y1: centerCell[cellId-1][1]-70,
      x2: centerCell[cellId-1][0]-70,
      y2: centerCell[cellId-1][1]+70
    }
    let fwdslash = {
      x1: centerCell[cellId-1][0]-70,
      y1: centerCell[cellId-1][1]-70,
      x2: centerCell[cellId-1][0]+70,
      y2: centerCell[cellId-1][1]+70,
    }
    return (
      <g className="x-shape">
        <line {...backslash} />
        <line {...fwdslash} />
      </g>
    )
  }
  
  export const Cell = (props: any) => <rect {...props} />
  
 export const XButton = (props: any) => {
    return (
      <g className="char-select-btn x-button">
        <rect className="baseLayer" x={190} />
        <text x={215} y={245} fontFamily="Arial" fontSize="40" fill="red">X</text>
        <rect className="clickLayer" x={190} fillOpacity={0} onClick={props.onClick} />
      </g>
    )
  }
  
 export const OButton = (props:any) => {
    return (
      <g className="char-select-btn o-button">
        <rect className="baseLayer" x={330} />
        <text x={355} y={245} fontFamily="Arial" fontSize="40" fill="blue">O</text>
        <rect className = "clickLayer"x={330} fillOpacity={0} onClick={props.onClick} />
      </g>
    )
  }
  
export const DividerLine:React.FC<DividerLineState>  = ({x, y, length, horizontal}) => {
    let coords = { x1: x, y1: y, x2: x, y2: x }
    if (horizontal) {
      coords.x2 = coords.x1 + length;
      coords.y2 = coords.y1;
    } else {
      coords.x2 = coords.x1;
      coords.y2 = coords.y1 + length;
    }
    return <line {...coords} />
}

 export const centerCell = [
      [100,100],[300,100],[500,100],
      [100,300],[300,300],[500,300],
      [100,500],[300,500],[500,500]
    ]

export const OShape = (props: any) => {
  let cellId = props.id;
  return (<circle 
            className="o-shape" 
            cx={centerCell[cellId-1][0]} 
            cy={centerCell[cellId-1][1]} 
          />);
}  

export let cellCoords = [
    [5,5],[205,5],[405,5],
    [5,205],[205,205],[405,205],
    [5,405],[205,405],[405,405]
  ]

  