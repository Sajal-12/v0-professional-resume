"use client"

import type React from "react"
import Node from "./Node"
import type { GridNode } from "../types"
import "./Grid.css"

interface GridProps {
  grid: GridNode[][]
  mouseIsPressed: boolean
  onMouseDown: (row: number, col: number) => void
  onMouseEnter: (row: number, col: number) => void
  onMouseUp: () => void
}

const Grid: React.FC<GridProps> = ({ grid, mouseIsPressed, onMouseDown, onMouseEnter, onMouseUp }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="grid-row">
          {row.map((node, nodeIdx) => {
            const { row, col, isStart, isFinish, isWall, isWeight, isBomb, isVisited, isPath } = node

            return (
              <Node
                key={nodeIdx}
                row={row}
                col={col}
                isStart={isStart}
                isFinish={isFinish}
                isWall={isWall}
                isWeight={isWeight}
                isBomb={isBomb}
                isVisited={isVisited}
                isPath={isPath}
                mouseIsPressed={mouseIsPressed}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={onMouseUp}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default Grid
