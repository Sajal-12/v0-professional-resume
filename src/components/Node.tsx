"use client"

import type React from "react"
import "./Node.css"

interface NodeProps {
  row: number
  col: number
  isStart: boolean
  isFinish: boolean
  isWall: boolean
  isWeight: boolean
  isBomb: boolean
  isVisited: boolean
  isPath: boolean
  mouseIsPressed: boolean
  onMouseDown: () => void
  onMouseEnter: () => void
  onMouseUp: () => void
}

const Node: React.FC<NodeProps> = ({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  isWeight,
  isBomb,
  isVisited,
  isPath,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) => {
  const getClassName = () => {
    if (isStart) return "node node-start"
    if (isFinish) return "node node-finish"
    if (isWall) return "node node-wall"
    if (isBomb) return "node node-bomb"
    if (isWeight) return "node node-weight"
    if (isPath) return "node node-shortest-path"
    if (isVisited) return "node node-visited"
    return "node"
  }

  return (
    <div
      id={`node-${row}-${col}`}
      className={getClassName()}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
      onMouseUp={onMouseUp}
    ></div>
  )
}

export default Node
