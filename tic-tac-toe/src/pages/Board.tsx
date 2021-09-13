import React from "react";
import { CharSelectorModalContainer } from "../component/CharSelectorModalCOntainer";
import { DividerLine } from "../utils";
import { Shapes } from "../component/Shapes";
import { Cells } from "../component/Cells";
import { WinModalContainer } from "../component/WindowModalContainer";
import { CatsGameModalContainer } from "../component/CatsGameModalContainer";

export const GameBoard = () => {
    return (
      <div>
        <svg viewBox={"0 0 600 600"} >
          <g >
            <DividerLine x={200} y={0} length={600} horizontal={false} />
            <DividerLine x={400} y={0} length={600} horizontal={false} />
            <DividerLine x={0} y={200} length={600} horizontal={true} />
            <DividerLine x={0} y={400} length={600} horizontal={true} />
          </g>
          <Shapes />
          <Cells />
          < CharSelectorModalContainer />
          <WinModalContainer />
          <CatsGameModalContainer />
        </svg>
      </div>
    )
  }