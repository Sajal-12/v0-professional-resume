"use client"

import type React from "react"
import { NodeType } from "../types"
import "./Legend.css"

interface LegendProps {
  setNodeType: (type: NodeType) => void
  currentNodeType: NodeType
}

const Legend: React.FC<LegendProps> = ({ setNodeType, currentNodeType }) => {
  return (
    <div className="legend">
      <div
        className={`legend-item ${currentNodeType === NodeType.START ? "selected" : ""}`}
        onClick={() => setNodeType(NodeType.START)}
      >
        <div className="node-example node-start"></div>
        <span>Start Node</span>
      </div>

      <div
        className={`legend-item ${currentNodeType === NodeType.FINISH ? "selected" : ""}`}
        onClick={() => setNodeType(NodeType.FINISH)}
      >
        <div className="node-example node-finish"></div>
        <span>Target Node</span>
      </div>

      <div
        className={`legend-item ${currentNodeType === NodeType.BOMB ? "selected" : ""}`}
        onClick={() => setNodeType(NodeType.BOMB)}
      >
        <div className="node-example node-bomb"></div>
        <span>Bomb Node</span>
      </div>

      <div
        className={`legend-item ${currentNodeType === NodeType.WEIGHT ? "selected" : ""}`}
        onClick={() => setNodeType(NodeType.WEIGHT)}
      >
        <div className="node-example node-weight"></div>
        <span>Weight Node</span>
      </div>

      <div className="legend-item">
        <div className="node-example"></div>
        <span>Unvisited Node</span>
      </div>

      <div className="legend-item">
        <div className="node-example node-visited"></div>
        <span>Visited Nodes</span>
      </div>

      <div className="legend-item">
        <div className="node-example node-shortest-path"></div>
        <span>Shortest-path Node</span>
      </div>

      <div
        className={`legend-item ${currentNodeType === NodeType.WALL ? "selected" : ""}`}
        onClick={() => setNodeType(NodeType.WALL)}
      >
        <div className="node-example node-wall"></div>
        <span>Wall Node</span>
      </div>
    </div>
  )
}

export default Legend
